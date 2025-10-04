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
  const registerForm = document.querySelector(".register-container form");

  // ---- REGISTRO ----
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = registerForm.querySelector('input[placeholder="Nombre completo"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const pass = registerForm.querySelector('input[placeholder="Contraseña"]').value;

    if (nombre && email && pass) {
      // Guardamos usuario en localStorage (simulación de base de datos)
      const user = { nombre, email, pass };
      localStorage.setItem("usuarioRegistrado", JSON.stringify(user));

      alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
      
      // Limpiamos formulario
      registerForm.reset();
    } else {
      alert("⚠️ Completa todos los campos para registrarte.");
    }
  });

  // ---- LOGIN ----
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = loginForm.querySelector('input[placeholder="Usuario"]').value;
    const pass = loginForm.querySelector('input[placeholder="Contraseña"]').value;

    // Recuperamos usuario registrado
    const userData = JSON.parse(localStorage.getItem("usuarioRegistrado"));

    if (!userData) {
      alert("⚠️ No hay usuarios registrados. Regístrate primero.");
      return;
    }

    // Validamos usuario y contraseña
    if ((usuario === userData.email || usuario === userData.nombre) && pass === userData.pass) {
      alert(`👋 Bienvenido ${userData.nombre}`);
      window.location.href = "Main.html"; // Redirigir al main
    } else {
      alert("❌ Usuario o contraseña incorrectos.");
    }
  });
});