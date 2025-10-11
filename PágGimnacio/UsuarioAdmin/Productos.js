const form = document.getElementById("producto-form");
const container = document.getElementById("productos-container");
const filtro = document.getElementById("filtroTipo");
const template = document.getElementById("producto-template").content;

let productos = [
  { nombre: "Proteína Whey", tipo: "Suplemento", precio: 120, descripcion: "Proteína en polvo sabor chocolate, 1kg." },
  { nombre: "Shaker GymFlow", tipo: "Accesorio", precio: 25, descripcion: "Vaso mezclador de 600ml resistente y ergonómico." },
  { nombre: "Camiseta DryFit", tipo: "Ropa", precio: 60, descripcion: "Camiseta deportiva transpirable para entrenamiento." },
  { nombre: "Energético NitroX", tipo: "Bebida", precio: 10, descripcion: "Bebida energética para potenciar tu rendimiento." }
];

// 💾 Guardar y cargar productos
function guardarProductos() {
  localStorage.setItem("productosGym", JSON.stringify(productos));
}
function cargarProductos() {
  const data = localStorage.getItem("productosGym");
  if (data) productos = JSON.parse(data);
}

// 🧱 Renderizar productos
function renderProductos() {
  container.innerHTML = "";

  const filtrados = filtro.value
    ? productos.filter(p => p.tipo === filtro.value)
    : productos;

  filtrados.forEach((p, index) => {
    const card = template.cloneNode(true);
    const nombreEl = card.querySelector(".nombre");
    const tipoEl = card.querySelector(".tipo");
    const precioEl = card.querySelector(".precio");
    const descEl = card.querySelector(".descripcion");

    const editarBtn = card.querySelector(".editar-btn");
    const guardarBtn = card.querySelector(".guardar-btn");
    const cancelarBtn = card.querySelector(".cancelar-btn");
    const eliminarBtn = card.querySelector(".eliminar-btn");

    nombreEl.textContent = p.nombre;
    tipoEl.textContent = p.tipo;
    precioEl.textContent = p.precio;
    descEl.textContent = p.descripcion;

    // 🗑️ Eliminar producto
    eliminarBtn.addEventListener("click", () => {
      productos.splice(index, 1);
      guardarProductos();
      renderProductos();
    });

    // ✏️ Editar producto dentro del mismo contenedor
    editarBtn.addEventListener("click", () => {
      editarBtn.classList.add("oculto");
      eliminarBtn.classList.add("oculto");
      guardarBtn.classList.remove("oculto");
      cancelarBtn.classList.remove("oculto");

      // Inputs editables
      const inputPrecio = document.createElement("input");
      inputPrecio.type = "number";
      inputPrecio.value = p.precio;
      inputPrecio.classList.add("edit-input");

      const inputDesc = document.createElement("textarea");
      inputDesc.value = p.descripcion;
      inputDesc.classList.add("edit-input");

      // Reemplazar texto por los inputs
      precioEl.parentElement.replaceChild(inputPrecio, precioEl);
      descEl.parentElement.replaceChild(inputDesc, descEl);

      // Guardar cambios
      guardarBtn.addEventListener("click", () => {
        p.precio = parseFloat(inputPrecio.value);
        p.descripcion = inputDesc.value;
        guardarProductos();
        renderProductos();
      });

      // Cancelar edición
      cancelarBtn.addEventListener("click", renderProductos);
    });

    // 🔒 Asegurar que por defecto solo se muestren Editar y Eliminar
    guardarBtn.classList.add("oculto");
    cancelarBtn.classList.add("oculto");
    editarBtn.classList.remove("oculto");
    eliminarBtn.classList.remove("oculto");

    container.appendChild(card);
  });
}

// ➕ Agregar nuevo producto
form.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const tipo = document.getElementById("tipo").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const descripcion = document.getElementById("descripcion").value;

  productos.push({ nombre, tipo, precio, descripcion });
  guardarProductos();
  form.reset();
  renderProductos();
});

filtro.addEventListener("change", renderProductos);

// 🚀 Inicializar
cargarProductos();
renderProductos();
