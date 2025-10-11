// ====== Función para alternar el menú lateral en dispositivos móviles ======
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ====== Función para filtrar productos por categoría ======
function filtrarProductos(categoria) {
  const productos = document.querySelectorAll('.producto-card');
  const botones = document.querySelectorAll('.filter-btn');
  
  // Actualizar botones activos (remover clase active de todos)
  botones.forEach(btn => btn.classList.remove('active'));
  
  // Agregar clase active al botón clickeado
  event.target.closest('.filter-btn').classList.add('active');
  
  // Filtrar y mostrar/ocultar productos según la categoría
  productos.forEach(producto => {
    if (categoria === 'todos') {
      // Mostrar todos los productos
      producto.style.display = 'block';
    } else {
      // Mostrar solo productos de la categoría seleccionada
      if (producto.dataset.categoria === categoria) {
        producto.style.display = 'block';
      } else {
        producto.style.display = 'none';
      }
    }
  });
}

// ====== Funcionalidad para los botones de comprar ======
document.addEventListener('DOMContentLoaded', function() {
  const botonesComprar = document.querySelectorAll('.comprar-btn');
  
  botonesComprar.forEach(boton => {
    boton.addEventListener('click', function() {
      // Obtener información del producto
      const card = this.closest('.producto-card');
      const nombreProducto = card.querySelector('h3').textContent;
      const precioProducto = card.querySelectorAll('p')[0].textContent;
      
      // Mostrar alerta (puedes reemplazar esto con tu lógica de carrito)
      alert('¡Producto agregado al carrito!\n\n' + nombreProducto + '\n' + precioProducto);
      
    });
  });
  
  // Cerrar sidebar al hacer click fuera de él en móviles
  document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    // Verificar si el click fue fuera del sidebar y del botón de menú
    if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
      if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    }
  });
});
