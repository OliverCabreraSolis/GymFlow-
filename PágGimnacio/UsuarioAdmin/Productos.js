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
      <p><strong>Nombre:</strong> ${p.nombre}</p>
      <p><strong>Precio:</strong> S/ <span>${p.precio.toFixed(2)}</span></p>
      <p><strong>Descripción:</strong> <span>${p.descripcion}</span></p>
      <p><strong>Tipo:</strong> ${p.tipo}</p>
      <button class="editar-btn">Editar</button>
      <button class="eliminar-btn">Eliminar</button>
    `;

    const btnEditar = card.querySelector(".editar-btn");
    const btnEliminar = card.querySelector(".eliminar-btn");

    // 🗑️ Eliminar producto
    btnEliminar.addEventListener("click", () => {
      productos.splice(index, 1);
      renderProductos();
    });

    // ✏️ Editar producto dentro del mismo contenedor
    btnEditar.addEventListener("click", () => {
      card.innerHTML = `
        <p><strong>Nombre:</strong> ${p.nombre}</p>
        <p><strong>Precio:</strong> 
          <input type="number" id="edit-precio" value="${p.precio}" min="0" step="0.01">
        </p>
        <p><strong>Descripción:</strong><br>
          <textarea id="edit-descripcion">${p.descripcion}</textarea>
        </p>
        <p><strong>Tipo:</strong> ${p.tipo}</p>
        <button class="guardar-btn">Guardar</button>
        <button class="cancelar-btn">Cancelar</button>
      `;

      // Guardar cambios
      card.querySelector(".guardar-btn").addEventListener("click", () => {
        const nuevoPrecio = parseFloat(card.querySelector("#edit-precio").value);
        const nuevaDescripcion = card.querySelector("#edit-descripcion").value;

        p.precio = nuevoPrecio;
        p.descripcion = nuevaDescripcion;
        renderProductos();
      });

      // Cancelar edición
      card.querySelector(".cancelar-btn").addEventListener("click", () => {
        renderProductos();
      });
    });

    container.appendChild(card);
  });
}

// Inicializar
renderProductos();
