document.querySelectorAll(".membership-card button").forEach(button => {
  button.addEventListener("click", () => {
    const plan = button.parentElement.querySelector("h2").textContent;
    const precio = button.parentElement.querySelector(".precio").textContent;

    // Guardar plan en localStorage
    const seleccion = { plan, precio };
    localStorage.setItem("membresiaSeleccionada", JSON.stringify(seleccion));

    // Redirigir a Pagos.html
    window.location.href = "Pagos.html";
  });
});
