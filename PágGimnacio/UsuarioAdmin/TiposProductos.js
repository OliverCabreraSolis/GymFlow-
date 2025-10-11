const form = document.getElementById("tipo-form");
const container = document.getElementById("tipos-container");
const template = document.getElementById("tipo-template").content;

// 🔹 Tipos iniciales
let tipos = JSON.parse(localStorage.getItem("tiposProductos")) || [
  { nombre: "Suplemento", descripcion: "Productos nutricionales para mejorar el rendimiento y recuperación." },
  { nombre: "Bebida", descripcion: "Energizantes e hidratantes ideales para entrenar." },
  { nombre: "Accesorio", descripcion: "Guantes, muñequeras y más artículos deportivos." },
  { nombre: "Ropa", descripcion: "Prendas cómodas y transpirables para entrenamiento." }
];

// 💾 Guardar / Cargar
function guardarTipos() {
  localStorage.setItem("tiposProductos", JSON.stringify(tipos));
}
function cargarTipos() {
  const data = localStorage.getItem("tiposProductos");
  if (data) tipos = JSON.parse(data);
}

// 🎨 Renderizar
function renderTipos() {
  container.innerHTML = "";

  tipos.forEach((t, index) => {
    const card = template.cloneNode(true);
    const nombreEl = card.querySelector(".nombre-tipo");
    const descEl = card.querySelector(".descripcion-tipo");
    const editarBtn = card.querySelector(".editar-btn");
    const guardarBtn = card.querySelector(".guardar-btn");
    const cancelarBtn = card.querySelector(".cancelar-btn");
    const eliminarBtn = card.querySelector(".eliminar-btn");

    nombreEl.textContent = t.nombre;
    descEl.textContent = t.descripcion;

    // Mostrar solo editar y eliminar por defecto
    guardarBtn.style.display = "none";
    cancelarBtn.style.display = "none";

    // Eliminar tipo
    eliminarBtn.addEventListener("click", () => {
      tipos.splice(index, 1);
      guardarTipos();
      renderTipos();
    });

    // Editar tipo
    editarBtn.addEventListener("click", () => {
      editarBtn.style.display = "none";
      eliminarBtn.style.display = "none";
      guardarBtn.style.display = "inline-block";
      cancelarBtn.style.display = "inline-block";

      const inputDesc = document.createElement("textarea");
      inputDesc.value = t.descripcion;
      inputDesc.classList.add("edit-input");
      descEl.parentElement.replaceChild(inputDesc, descEl);

      guardarBtn.addEventListener(
        "click",
        () => {
          t.descripcion = inputDesc.value.trim();
          guardarTipos();
          renderTipos();
        },
        { once: true }
      );

      cancelarBtn.addEventListener("click", renderTipos, { once: true });
    });

    container.appendChild(card);
  });
}

// ➕ Agregar nuevo tipo
form.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById("nombreTipo").value.trim();
  const descripcion = document.getElementById("descripcionTipo").value.trim();

  if (!nombre) return alert("Por favor, ingresa el nombre del tipo.");

  tipos.push({ nombre, descripcion });
  guardarTipos();
  form.reset();
  renderTipos();
});

// 🚀 Inicializar
cargarTipos();
renderTipos();
