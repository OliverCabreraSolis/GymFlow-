document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".pago-form");
  const pagosGrid = document.querySelector(".pagos-grid");
  const membresiaSelect = document.getElementById("membresia");
  const nombreInput = document.getElementById("nombre");
  const emailInput = document.getElementById("email");

  // ✅ Prellenar nombre y email del usuario logueado
  const clienteActivo = JSON.parse(localStorage.getItem("clienteActivo"));
  if (clienteActivo) {
    nombreInput.value = clienteActivo.nombre;
    emailInput.value = clienteActivo.email;
    nombreInput.disabled = true;
    emailInput.disabled = true;
  }

  // ✅ Si viene un plan desde Membresías, lo preseleccionamos
  const planSeleccionado = localStorage.getItem("planSeleccionado");
  if (planSeleccionado) {
    membresiaSelect.value = planSeleccionado;
    localStorage.removeItem("planSeleccionado");
  }

  // ✅ Cargar pagos temporales (se borran después de 1 hora de inactividad)
  let pagos = JSON.parse(localStorage.getItem("pagosTemporales")) || [];
  
  // Limpiar pagos antiguos (más de 1 hora)
  const ahora = Date.now();
  pagos = pagos.filter(pago => {
    if (pago.timestamp) {
      return (ahora - pago.timestamp) < 3600000; // 1 hora en milisegundos
    }
    return true;
  });

  // ✅ Procesar compra de producto si existe
  const compraActual = localStorage.getItem("compraActual");
  if (compraActual) {
    const compra = JSON.parse(compraActual);
    
    // Crear pago automático para el producto
    const nuevoPago = {
      nombre: clienteActivo ? clienteActivo.nombre : "Cliente",
      email: clienteActivo ? clienteActivo.email : "cliente@gmail.com",
      tipo: "Producto",
      membresia: compra.nombre,
      estado: "Completado",
      fecha: new Date().toLocaleDateString(),
      esProducto: true,
      cantidad: compra.cantidad,
      precioUnitario: compra.precio,
      total: compra.total,
      timestamp: Date.now()
    };

    // Agregar el nuevo pago
    pagos.push(nuevoPago);
    localStorage.setItem("pagosTemporales", JSON.stringify(pagos));
    
    // Limpiar la compra actual
    localStorage.removeItem("compraActual");
  }

  // Guardar pagos actualizados
  localStorage.setItem("pagosTemporales", JSON.stringify(pagos));

  // Renderizar pagos
  renderPagos();

  // Manejar envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevoPago = {
      nombre: nombreInput.value,
      email: emailInput.value,
      tipo: document.getElementById("tipo").value,
      membresia: membresiaSelect.value,
      estado: "Completado",
      fecha: new Date().toLocaleDateString(),
      esProducto: false,
      timestamp: Date.now()
    };

    // Guardar en localStorage temporal
    pagos.push(nuevoPago);
    localStorage.setItem("pagosTemporales", JSON.stringify(pagos));

    // Mostrar en la interfaz
    renderPagos();

    // Resetear formulario (solo los campos que no están bloqueados)
    membresiaSelect.value = "";
    document.getElementById("tipo").value = "";
  });

  // Función para renderizar pagos
  function renderPagos() {
    pagosGrid.innerHTML = "";
    
    // Mostrar todos los pagos guardados
    pagos.forEach((pago) => {
      const card = document.createElement("div");
      card.classList.add("pago-card");
      
      // Mostrar diferente información si es producto o membresía
      if (pago.esProducto) {
        card.innerHTML = `
          <h3>${pago.nombre}</h3>
          <p>Email: <a href="mailto:${pago.email}">${pago.email}</a></p>
          <p><strong>Producto:</strong> ${pago.membresia}</p>
          <p><strong>Cantidad:</strong> ${pago.cantidad}</p>
          <p><strong>Precio unitario:</strong> S/ ${pago.precioUnitario.toFixed(2)}</p>
          <p><strong>Total:</strong> S/ ${pago.total.toFixed(2)}</p>
          <p>Tipo: ${pago.tipo}</p>
          <span class="status completado">${pago.estado}</span>
          <small>${pago.fecha}</small>
        `;
      } else {
        card.innerHTML = `
          <h3>${pago.nombre}</h3>
          <p>Email: <a href="mailto:${pago.email}">${pago.email}</a></p>
          <p>Membresía: ${pago.membresia}</p>
          <p>Pago: ${pago.tipo}</p>
          <span class="status completado">${pago.estado}</span>
          <small>${pago.fecha}</small>
        `;
      }
      
      pagosGrid.appendChild(card);
    });
  }

  // ✅ Botón para limpiar pagos manualmente (opcional)
  const btnLimpiar = document.createElement("button");
  btnLimpiar.textContent = "Limpiar Historial de Pagos";
  btnLimpiar.style.cssText = `
    margin: 20px 0;
    padding: 10px 20px;
    background: #e11d48;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  `;
  btnLimpiar.addEventListener("click", () => {
    if (confirm("¿Estás seguro de limpiar todo el historial?")) {
      localStorage.removeItem("pagosTemporales");
      pagos = [];
      renderPagos();
    }
  });
  
  // Insertar botón después del título "Pagos Recientes"
  const pagosContainer = document.querySelectorAll(".pagos-container")[1];
  if (pagosContainer) {
    pagosContainer.querySelector("h2").after(btnLimpiar);
  }
});
