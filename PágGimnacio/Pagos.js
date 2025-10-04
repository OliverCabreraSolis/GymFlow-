document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".pago-form");
  const pagosGrid = document.querySelector(".pagos-grid");
  const membresiaSelect = document.getElementById("membresia");

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
      nombre: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      tipo: document.getElementById("tipo").value,
      membresia: document.getElementById("membresia").value,
      estado: "Completado", // Podrías manejar "Pendiente" según lógica de pagos
      fecha: new Date().toLocaleDateString()
    };

    // Guardar en localStorage
    pagos.push(nuevoPago);
    localStorage.setItem("pagos", JSON.stringify(pagos));

    // Mostrar en la interfaz
    renderPagos();

    // Resetear formulario
    form.reset();
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
