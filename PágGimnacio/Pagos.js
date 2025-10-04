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
    localStorage.removeItem("planSeleccionado"); // Limpio para evitar persistencia innecesaria
  }

  // Cargar pagos guardados al iniciar
  let pagos = JSON.parse(localStorage.getItem("pagos")) || [];
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
      fecha: new Date().toLocaleDateString()
    };

    // Guardar en localStorage
    pagos.push(nuevoPago);
    localStorage.setItem("pagos", JSON.stringify(pagos));

    // Mostrar en la interfaz
    renderPagos();

    // Resetear formulario (solo los campos que no están bloqueados)
    membresiaSelect.value = "";
    document.getElementById("tipo").value = "";
  });

  // Función para renderizar pagos
  function renderPagos() {
    pagosGrid.innerHTML = ""; // limpiar antes de volver a pintar
    pagos.forEach((pago) => {
      const card = document.createElement("div");
      card.classList.add("pago-card");
      card.innerHTML = `
        <h3>${pago.nombre}</h3>
        <p>Email: <a href="mailto:${pago.email}">${pago.email}</a></p>
        <p>Membresía: ${pago.membresia}</p>
        <p>Pago: ${pago.tipo}</p>
        <span class="status completado">${pago.estado}</span>
        <small>${pago.fecha}</small>
      `;
      pagosGrid.appendChild(card);
    });
  }
});