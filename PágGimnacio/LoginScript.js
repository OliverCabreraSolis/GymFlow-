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

// =========================
// REGISTRO DE CLIENTE
// =========================
document.getElementById("formRegister").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("regNombre").value;
  const correo = document.getElementById("regCorreo").value;
  const clave = document.getElementById("regClave").value;

  let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

  // Verificar que el correo no esté registrado
  if (clientes.some(c => c.correo === correo)) {
    alert("❌ Este correo ya está registrado.");
    return;
  }

  // Guardar cliente
  clientes.push({ nombre, correo, clave });
  localStorage.setItem("clientes", JSON.stringify(clientes));

  alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
  e.target.reset();
  container.classList.remove("right-panel-active"); // vuelve al login
});

// =========================
// LOGIN DE CLIENTE
// =========================
document.getElementById("formLogin").addEventListener("submit", (e) => {
  e.preventDefault();

  const correoLogin = document.getElementById("loginCorreo").value;
  const claveLogin = document.getElementById("loginClave").value;

  let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

  const cliente = clientes.find(c => c.correo === correoLogin && c.clave === claveLogin);

  if (cliente) {
    alert("🎉 Bienvenido " + cliente.nombre + " a GymFlow.");
    // Guardamos la sesión activa
    localStorage.setItem("sesionActiva", JSON.stringify(cliente));
    // Ejemplo: redirigir a inicio
    // window.location.href = "index.html";
  } else {
    alert("❌ Correo o contraseña incorrectos.");
  }
});