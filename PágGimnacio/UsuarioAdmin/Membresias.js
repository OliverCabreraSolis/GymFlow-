const form = document.getElementById("formMembresia");
const container = document.getElementById("membresiasContainer");
const filtro = document.getElementById("filtroTipo");
const template = document.getElementById("membresia-template").content;

let membresias = [
  { nombre: "Plan Básico", tipo: "Básica", precio: 50, descripcion: "Acceso a máquinas y área de cardio." },
  { nombre: "Plan Intermedio", tipo: "Intermedia", precio: 80, descripcion: "Incluye clases grupales y asesoría técnica." },
  { nombre: "Plan Élite", tipo: "Premium", precio: 120, descripcion: "Acceso total con entrenador personal y sauna." }
];

// Guardar datos
function guardarMembresias() {
  localStorage.setItem("membresiasGym", JSON.stringify(membresias));
}
function cargarMembresias() {
  const data = localStorage.getItem("membresiasGym");
  if (data) membresias = JSON.parse(data);
}

// Renderizar
function renderMembresias() {
  container.innerHTML = "";

  const filtradas = filtro.value
    ? membresias.filter(m => m.tipo === filtro.value)
    : membresias;

  filtradas.forEach((m, index) => {
    const card = template.cloneNode(true);
    const nombreEl = card.querySelector(".nombre");
    const tipoEl = card.querySelector(".tipo");
    const precioEl = card.querySelector(".precio");
    const descEl = card.querySelector(".texto-descripcion");

    const editarBtn = card.querySelector(".editar-btn");
    const guardarBtn = card.querySelector(".guardar-btn");
    const cancelarBtn = card.querySelector(".cancelar-btn");
    const eliminarBtn = card.querySelector(".eliminar-btn");

    nombreEl.textContent = m.nombre;
    tipoEl.textContent = m.tipo;
    precioEl.textContent = m.precio;
    descEl.textContent = m.descripcion;

    // Eliminar
    eliminarBtn.addEventListener("click", () => {
      membresias.splice(index, 1);
      guardarMembresias();
      renderMembresias();
    });

    // Editar dentro del contenedor
    editarBtn.addEventListener("click", () => {
      editarBtn.classList.add("oculto");
      eliminarBtn.classList.add("oculto");
      guardarBtn.classList.remove("oculto");
      cancelarBtn.classList.remove("oculto");

      // Cambiar a modo edición
      const inputPrecio = document.createElement("input");
      inputPrecio.type = "number";
      inputPrecio.value = m.precio;
      inputPrecio.classList.add("edit-input");

      const inputDesc = document.createElement("textarea");
      inputDesc.value = m.descripcion;
      inputDesc.classList.add("edit-input");

      precioEl.parentElement.replaceChild(inputPrecio, precioEl);
      descEl.parentElement.replaceChild(inputDesc, descEl);

      // Guardar cambios
      guardarBtn.addEventListener("click", () => {
        m.precio = parseFloat(inputPrecio.value);
        m.descripcion = inputDesc.value;

        guardarMembresias();
        renderMembresias();
      });

      // Cancelar edición
      cancelarBtn.addEventListener("click", () => {
        renderMembresias();
      });
    });

    container.appendChild(card);
  });
}

// Agregar membresía
form.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const tipo = document.getElementById("tipo").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const descripcion = document.getElementById("descripcion").value;

  membresias.push({ nombre, tipo, precio, descripcion });
  guardarMembresias();
  form.reset();
  renderMembresias();
});

filtro.addEventListener("change", renderMembresias);

// Inicializar
cargarMembresias();
renderMembresias();
