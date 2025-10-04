const form = document.getElementById("formPromocion");
const container = document.getElementById("promocionesContainer");
const filtro = document.getElementById("filtroTemporada");

let promociones = [];

form.addEventListener("submit", e => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const temporada = document.getElementById("temporada").value;
    const descuento = document.getElementById("descuento").value;

    promociones.push({ titulo, descripcion, temporada, descuento });
    form.reset();
    renderPromociones();
});

filtro.addEventListener("change", renderPromociones);

function renderPromociones() {
    container.innerHTML = "";

    const filtradas = filtro.value
        ? promociones.filter(p => p.temporada === filtro.value)
        : promociones;

    filtradas.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("promocion-card");
        card.innerHTML = `
            <h3>${p.titulo}</h3>
            <p>${p.descripcion}</p>
            <div class="temporada">${p.temporada}</div>
            <div class="descuento">-${p.descuento}%</div>
        `;
        container.appendChild(card);
    });
}
