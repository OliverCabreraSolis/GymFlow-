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

  // ---- REGISTRO DE CLIENTE ----
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = registerForm.querySelector('input[placeholder="Nombre completo"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const pass = registerForm.querySelector('input[placeholder="Contraseña"]').value;

    if (nombre && email && pass) {
      const user = { nombre, email, pass, rol: "cliente" };
      localStorage.setItem("usuarioRegistrado", JSON.stringify(user));

      alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
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

    const userData = JSON.parse(localStorage.getItem("usuarioRegistrado"));

    // 🧠 Datos del administrador fijo
    const admin = {
      nombre: "Administrador",
      email: "admin1",
      pass: "123",
      rol: "administrador"
    };

    let usuarioActivo = null;

    if (usuario === admin.email && pass === admin.pass) {
      usuarioActivo = admin;
    } else if (userData && (usuario === userData.email || usuario === userData.nombre) && pass === userData.pass) {
      usuarioActivo = userData;
    }

    if (usuarioActivo) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

      alert(`👋 Bienvenido ${usuarioActivo.nombre}`);

      // 🔀 Redirección según el rol
      if (usuarioActivo.rol === "administrador") {
        window.location.href = "../UsuarioAdmin/Gestion.html"; // ✅ corregido
      } else {
        window.location.href = "../UsuarioClientes/Main.html"; // ✅ corregido
      }
    } else {
      alert("❌ Usuario o contraseña incorrectos.");
    }
  });
});
