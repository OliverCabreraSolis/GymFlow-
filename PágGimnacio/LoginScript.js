const container = document.getElementById("container");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

showRegister.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.add("right-panel-active");
});

showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.remove("right-panel-active");
});

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-container form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // evita que recargue la página

    // ⚡ Aquí normalmente iría la validación con backend
    // por ahora simulamos un login correcto:
    const user = loginForm.querySelector('input[type="text"]').value;
    const pass = loginForm.querySelector('input[type="password"]').value;

    if (user && pass) {
      // Redirigir al main
      window.location.href = "Main.html";
    } else {
      alert("Por favor, ingresa usuario y contraseña");
    }
  });
});
