document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("producto-form");
  const nombreInput = document.getElementById("nombre");
  const precioInput = document.getElementById("precio");
  const descripcionInput = document.getElementById("descripcion");
  const productosContainer = document.getElementById("productos-container");

  // ---- Agregar producto ----
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = nombreInput.value;
    const precio = precioInput.value;
    const descripcion = descripcionInput.value;

    if (!nombre || !precio) return alert("Completa todos los campos");

    // Crear tarjeta manualmente
    const card = document.createElement("div");
    card.className = "producto-card";
    card.innerHTML = `
      <h3>${nombre}</h3>
      <p>Precio: S/ ${parseFloat(precio).toFixed(2)}</p>
      <p>${descripcion}</p>
      <button class="eliminar-btn">Eliminar</button>
    `;

    // Botón eliminar
    card.querySelector(".eliminar-btn").addEventListener("click", () => {
      card.remove();
    });

    // Añadir al contenedor
    productosContainer.appendChild(card);

    // Limpiar formulario
    form.reset();
  });

  // ---- Botones eliminar de productos simulados ----
  document.querySelectorAll(".eliminar-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  });
});
