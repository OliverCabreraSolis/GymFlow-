const form = document.getElementById("formMembresia");
const container = document.getElementById("membresiasContainer");
const filtro = document.getElementById("filtroDuracion");
const template = document.getElementById("membresia-template").content;

let membresias = [
  { nombre: "Plan Mensual", duracion: "1 mes", precio: 50, descripcion: "Acceso básico por un mes." },
  { nombre: "Plan Trimestral", duracion: "3 meses", precio: 130, descripcion: "Ideal para compromisos a corto plazo." },
  { nombre: "Plan Semestral", duracion: "6 meses", precio: 240, descripcion: "Ahorra más al pagar por seis meses." },
  { nombre: "Plan Anual", duracion: "1 año", precio: 400, descripcion: "Acceso completo durante todo el año." }
];

// Guardar y cargar
function guardarMembresias() {
  localStorage.setItem("membresiasGym", JSON.stringify(membresias));
}
function cargarMembresias() {
  const data = localStorage.getItem("membresiasGym");
  if (data) membresias = JSON.parse(data);
}

// Renderizar membresías
function renderMembresias() {
  container.innerHTML = "";

  const filtradas = filtro.value
    ? membresias.filter(m => m.duracion === filtro.value)
    : membresias;

  filtradas.forEach((m, index) => {
    const card = template.cloneNode(true);
    const nombreEl = card.querySelector(".nombre");
    const duracionEl = card.querySelector(".duracion");
    const precioEl = card.querySelector(".precio");
    const descEl = card.querySelector(".texto-descripcion");

    const editarBtn = card.querySelector(".editar-btn");
    const guardarBtn = card.querySelector(".guardar-btn");
    const cancelarBtn = card.querySelector(".cancelar-btn");
    const eliminarBtn = card.querySelector(".eliminar-btn");

    nombreEl.textContent = m.nombre;
    duracionEl.textContent = m.duracion;
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

      // Inputs de edición
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

      // Cancelar
      cancelarBtn.addEventListener("click", renderMembresias);
    });

    container.appendChild(card);
  });
}

// Agregar nueva membresía
form.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const duracion = document.getElementById("duracion").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const descripcion = document.getElementById("descripcion").value;

  membresias.push({ nombre, duracion, precio, descripcion });
  guardarMembresias();
  form.reset();
  renderMembresias();
});

filtro.addEventListener("change", renderMembresias);

// Inicializar
cargarMembresias();
renderMembresias();
