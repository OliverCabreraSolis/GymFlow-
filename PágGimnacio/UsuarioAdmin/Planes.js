const form = document.getElementById("formPlan");
const container = document.getElementById("productos-container");
const filtro = document.getElementById("filtroDuracion");
const template = document.getElementById("plan-template").content;

let planes = [
  { nombre: "Plan Básico", duracion: "1 mes", precio: 50, descripcion: "Acceso al gimnasio y clases grupales básicas." },
  { nombre: "Plan Premium", duracion: "6 meses", precio: 270, descripcion: "Incluye asesoramiento nutricional y entrenador personal." },
  { nombre: "Plan Elite", duracion: "1 año", precio: 480, descripcion: "Acceso total, invitados gratis y sesiones de masajes mensuales." }
];

function guardarPlanes() {
  localStorage.setItem("planesGym", JSON.stringify(planes));
}

function cargarPlanes() {
  const data = localStorage.getItem("planesGym");
  if (data) planes = JSON.parse(data);
}

function renderPlanes() {
  container.innerHTML = "";

  const filtrados = filtro.value
    ? planes.filter(p => p.duracion === filtro.value)
    : planes;

  filtrados.forEach((p, index) => {
    const card = template.cloneNode(true);
    const nombreEl = card.querySelector(".nombre");
    const duracionEl = card.querySelector(".duracion");
    const precioEl = card.querySelector(".precio");
    const descEl = card.querySelector(".texto-descripcion");

    const editarBtn = card.querySelector(".editar-btn");
    const guardarBtn = card.querySelector(".guardar-btn");
    const cancelarBtn = card.querySelector(".cancelar-btn");
    const eliminarBtn = card.querySelector(".eliminar-btn");

    nombreEl.textContent = p.nombre;
    duracionEl.textContent = p.duracion;
    precioEl.textContent = p.precio;
    descEl.textContent = p.descripcion;

    eliminarBtn.addEventListener("click", () => {
      planes.splice(index, 1);
      guardarPlanes();
      renderPlanes();
    });

    editarBtn.addEventListener("click", () => {
      editarBtn.classList.add("oculto");
      eliminarBtn.classList.add("oculto");
      guardarBtn.classList.remove("oculto");
      cancelarBtn.classList.remove("oculto");

      // === Crear inputs de edición ===
      const selectDuracion = document.createElement("select");
      ["1 mes", "3 meses", "6 meses", "1 año"].forEach(op => {
        const option = document.createElement("option");
        option.value = op;
        option.textContent = op;
        if (op === p.duracion) option.selected = true;
        selectDuracion.appendChild(option);
      });
      selectDuracion.classList.add("edit-input");

      const inputPrecio = document.createElement("input");
      inputPrecio.type = "number";
      inputPrecio.value = p.precio;
      inputPrecio.classList.add("edit-input");

      const inputDesc = document.createElement("textarea");
      inputDesc.value = p.descripcion;
      inputDesc.classList.add("edit-input");

      // === Reemplazar los elementos originales ===
      duracionEl.parentElement.replaceChild(selectDuracion, duracionEl);
      precioEl.parentElement.replaceChild(inputPrecio, precioEl);
      descEl.parentElement.replaceChild(inputDesc, descEl);

      // === Guardar cambios ===
      guardarBtn.addEventListener("click", () => {
        p.duracion = selectDuracion.value;
        p.precio = parseFloat(inputPrecio.value);
        p.descripcion = inputDesc.value;
        guardarPlanes();
        renderPlanes();
      });

      cancelarBtn.addEventListener("click", renderPlanes);
    });

    container.appendChild(card);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const duracion = document.getElementById("duracion").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const descripcion = document.getElementById("descripcion").value;

  planes.push({ nombre, duracion, precio, descripcion });
  guardarPlanes();
  form.reset();
  renderPlanes();
});

filtro.addEventListener("change", renderPlanes);

cargarPlanes();
renderPlanes();
