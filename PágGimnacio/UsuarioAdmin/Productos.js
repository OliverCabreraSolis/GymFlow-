const form = document.getElementById("producto-form");
const container = document.getElementById("productos-container");
const filtro = document.getElementById("filtroTipo");

let productos = [
  { nombre: "Proteína Whey", precio: 120, descripcion: "Proteína en polvo sabor chocolate, 1kg.", tipo: "Suplemento" }
];

// ➕ Agregar producto
form.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const descripcion = document.getElementById("descripcion").value;
  const tipo = document.getElementById("tipo").value;

  productos.push({ nombre, precio, descripcion, tipo });
  form.reset();
  renderProductos();
});

// 🎛️ Filtro
filtro.addEventListener("change", renderProductos);

// 🧱 Renderizar productos
function renderProductos() {
  container.innerHTML = "";

  const filtrados = filtro.value
    ? productos.filter(p => p.tipo === filtro.value)
    : productos;

  filtrados.forEach((p, index) => {
    const card = document.createElement("div");
    card.classList.add("producto-card");

    card.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>Precio: S/ ${p.precio.toFixed(2)}</p>
      <p>${p.descripcion}</p>
      <p><strong>Tipo:</strong> ${p.tipo}</p>
      <button class="editar-btn">Editar</button>
      <button class="eliminar-btn">Eliminar</button>
    `;

    // Botón eliminar
    card.querySelector(".eliminar-btn").addEventListener("click", () => {
      productos.splice(index, 1);
      renderProductos();
    });

    // Botón editar (solo precio y descripción)
    card.querySelector(".editar-btn").addEventListener("click", () => {
      const nuevoPrecio = prompt("Nuevo precio (S/):", p.precio);
      const nuevaDescripcion = prompt("Nueva descripción:", p.descripcion);

      if (nuevoPrecio !== null && nuevaDescripcion !== null) {
        p.precio = parseFloat(nuevoPrecio);
        p.descripcion = nuevaDescripcion;
        renderProductos();
      }
    });

    container.appendChild(card);
  });
}

// Inicializar
renderProductos();
