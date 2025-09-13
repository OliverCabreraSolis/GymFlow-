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
