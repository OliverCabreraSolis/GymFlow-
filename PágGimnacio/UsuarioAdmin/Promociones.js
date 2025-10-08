const form = document.getElementById("formPromocion");
const container = document.getElementById("promocionesContainer");
const filtro = document.getElementById("filtroMembresia");

let promociones = [
  { 
    titulo: "💪 Dios Griego", 
    descripcion: "25% de descuento en todas las membresías Premium para alcanzar tu mejor versión este verano.", 
    membresia: "Premium", 
    descuento: 25 
  }
];

form.addEventListener("submit", e => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const membresia = document.getElementById("membresia").value;
  const descuento = document.getElementById("descuento").value;

  promociones.push({ titulo, descripcion, membresia, descuento });
  form.reset();
  renderPromociones();
});

filtro.addEventListener("change", renderPromociones);

function renderPromociones() {
  container.innerHTML = "";

  const filtradas = filtro.value
    ? promociones.filter(p => p.membresia === filtro.value)
    : promociones;

  filtradas.forEach((p, index) => {
    const card = document.createElement("div");
    card.classList.add("promocion-card");
    card.innerHTML = `
      <h3>${p.titulo}</h3>
      <p class="descripcion">${p.descripcion}</p>
      <div class="membresia">Membresía: ${p.membresia}</div>
      <div class="descuento">Descuento: -${p.descuento}%</div>
      <button class="editar-btn">Editar</button>
      <button class="eliminar-btn">Eliminar</button>
    `;

    // Botón eliminar
    card.querySelector(".eliminar-btn").addEventListener("click", () => {
      promociones.splice(index, 1);
      renderPromociones();
    });

    // Botón editar (solo descripción y descuento)
    card.querySelector(".editar-btn").addEventListener("click", () => {
      const nuevaDescripcion = prompt("Nueva descripción:", p.descripcion);
      const nuevoDescuento = prompt("Nuevo descuento (%):", p.descuento);

      if (nuevaDescripcion !== null && nuevoDescuento !== null) {
        p.descripcion = nuevaDescripcion;
        p.descuento = nuevoDescuento;
        renderPromociones();
      }
    });

    container.appendChild(card);
  });
}

// Inicializar renderizado
renderPromociones();
