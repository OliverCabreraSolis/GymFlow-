// ====== Función para alternar el menú lateral en dispositivos móviles ======
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ====== Función para cambiar la cantidad de productos ======
function cambiarCantidad(boton, cambio) {
  const card = boton.closest('.producto-card');
  const display = card.querySelector('.cantidad-display');
  
  // Obtener cantidad actual
  let cantidadActual = parseInt(display.textContent);
  let nuevaCantidad = cantidadActual + cambio;
  
  // Validar que la cantidad esté entre 1 y 99
  if (nuevaCantidad >= 1 && nuevaCantidad <= 99) {
    display.textContent = nuevaCantidad;
    
    // Agregar animación al número
    display.style.transform = 'scale(1.3)';
    setTimeout(() => {
      display.style.transform = 'scale(1)';
    }, 200);
  }
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
      const precioTexto = card.querySelector('.precio').textContent;
      const precioNumero = parseFloat(precioTexto.replace('S/ ', '').replace(',', ''));
      
      // Obtener la cantidad del display
      const cantidadDisplay = card.querySelector('.cantidad-display');
      const cantidad = parseInt(cantidadDisplay.textContent);
      
      const total = (precioNumero * cantidad).toFixed(2);
      
      // Mostrar alerta con detalles de la compra
      alert(
        'Producto agregado al carrito!\n\n' + 
        'Producto: ' + nombreProducto + '\n' + 
        'Precio unitario: S/ ' + precioNumero.toFixed(2) + '\n' + 
        'Cantidad: ' + cantidad + '\n' + 
        'Total: S/ ' + total + '\n\n' +
        'Gracias por tu compra!'
      );
      
      // Resetear cantidad a 1 después de agregar al carrito
      cantidadDisplay.textContent = 1;
      
      // Animación del botón al agregar al carrito
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
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
