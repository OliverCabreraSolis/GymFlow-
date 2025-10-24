// ====== Datos de productos ======
const productos = [
  // Suplementos
  { nombre: 'Proteína Whey', precio: 120, categoria: 'suplementos', desc: 'Proteína en polvo sabor chocolate, 1kg.' },
  { nombre: 'Creatina Monohidrato', precio: 85, categoria: 'suplementos', desc: 'Creatina pura micronizada, 300g.' },
  { nombre: 'Pre-Workout', precio: 95, categoria: 'suplementos', desc: 'Energía explosiva para tus entrenamientos, 30 porciones.' },
  { nombre: 'BCAA 2:1:1', precio: 75, categoria: 'suplementos', desc: 'Aminoácidos ramificados, 60 porciones.' },
  // Equipamiento
  { nombre: 'Guantes de Boxeo', precio: 80, categoria: 'equipamiento', desc: 'Guantes profesionales para entrenamiento y sparring.' },
  { nombre: 'Mancuernas Ajustables', precio: 250, categoria: 'equipamiento', desc: 'Set de mancuernas de 2.5kg a 25kg por lado.' },
  { nombre: 'Banda Elástica Set', precio: 45, categoria: 'equipamiento', desc: 'Set de 5 bandas con diferentes resistencias.' },
  { nombre: 'Colchoneta Yoga', precio: 60, categoria: 'equipamiento', desc: 'Colchoneta antideslizante de 6mm de grosor.' },
  // Accesorios
  { nombre: 'Botella Deportiva', precio: 25, categoria: 'accesorios', desc: 'Botella de 1 litro, material resistente y libre de BPA.' },
  { nombre: 'Guantes de Gimnasio', precio: 35, categoria: 'accesorios', desc: 'Guantes acolchados para proteger tus manos.' },
  { nombre: 'Toalla Deportiva', precio: 30, categoria: 'accesorios', desc: 'Toalla de microfibra absorbente, 80x40cm.' },
  { nombre: 'Cinturón de Levantamiento', precio: 90, categoria: 'accesorios', desc: 'Cinturón de cuero para soporte lumbar.' },
  // Nutrición
  { nombre: 'Barras Proteicas', precio: 55, categoria: 'nutricion', desc: 'Caja de 12 barras, 20g de proteína cada una.' },
  { nombre: 'Mantequilla de Maní', precio: 28, categoria: 'nutricion', desc: '100% natural, sin azúcar añadida, 500g.' },
  { nombre: 'Avena Instantánea', precio: 20, categoria: 'nutricion', desc: 'Avena en hojuelas, lista para preparar, 1kg.' },
  { nombre: 'Galletas Proteicas', precio: 35, categoria: 'nutricion', desc: 'Paquete de 6 galletas, 15g de proteína cada una.' }
];

// ====== Toggle del sidebar en móvil ======
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

// ====== Renderizar productos ======
function renderizarProductos() {
  const container = document.getElementById('productos-container');
  container.innerHTML = '';
  
  productos.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.setAttribute('data-categoria', prod.categoria);
    card.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p class="precio">S/ ${prod.precio.toFixed(2)}</p>
      <p class="descripcion">${prod.desc}</p>
      <div class="cantidad-control">
        <button class="btn-menos" onclick="cambiarCantidad(this, -1)">
          <i class="fas fa-minus"></i>
        </button>
        <span class="cantidad-display">1</span>
        <button class="btn-mas" onclick="cambiarCantidad(this, 1)">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <button class="comprar-btn">Agregar al Carrito</button>
    `;
    container.appendChild(card);
  });
}

// ====== Filtrar productos por categoría ======
function filtrarProductos(categoria) {
  const productos = document.querySelectorAll('.producto-card');
  const botones = document.querySelectorAll('.filter-btn');
  
  // Actualizar estado activo de los botones
  botones.forEach(btn => btn.classList.remove('active'));
  event.target.closest('.filter-btn').classList.add('active');
  
  // Mostrar/ocultar productos con animación
  productos.forEach(producto => {
    if (categoria === 'todos') {
      producto.style.display = 'block';
      setTimeout(() => {
        producto.style.opacity = '1';
        producto.style.transform = 'scale(1)';
      }, 10);
    } else {
      if (producto.dataset.categoria === categoria) {
        producto.style.display = 'block';
        setTimeout(() => {
          producto.style.opacity = '1';
          producto.style.transform = 'scale(1)';
        }, 10);
      } else {
        producto.style.opacity = '0';
        producto.style.transform = 'scale(0.8)';
        setTimeout(() => {
          producto.style.display = 'none';
        }, 300);
      }
    }
  });
}

// ====== Control de cantidad ======
function cambiarCantidad(boton, cambio) {
  const cantidadDisplay = boton.parentElement.querySelector('.cantidad-display');
  let cantidad = parseInt(cantidadDisplay.textContent);
  
  cantidad += cambio;
  
  // No permitir valores menores a 1 ni mayores a 99
  if (cantidad < 1) cantidad = 1;
  if (cantidad > 99) cantidad = 99;
  
  cantidadDisplay.textContent = cantidad;
  
  // Animación de feedback
  cantidadDisplay.style.transform = 'scale(1.2)';
  setTimeout(() => {
    cantidadDisplay.style.transform = 'scale(1)';
  }, 200);
}

// ====== Función para mostrar notificaciones ======
function mostrarNotificacion(mensaje) {
  const notificacion = document.createElement('div');
  notificacion.className = 'notificacion';
  notificacion.textContent = mensaje;
  notificacion.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    z-index: 10000;
    font-weight: 600;
  `;
  
  document.body.appendChild(notificacion);
  
  setTimeout(() => {
    notificacion.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notificacion.remove(), 300);
  }, 3000);
}

// ====== Inicialización cuando carga el DOM ======
document.addEventListener('DOMContentLoaded', () => {
  // ✅ IMPORTANTE: Generar sessionId si no existe
  if (!sessionStorage.getItem("sessionId")) {
    sessionStorage.setItem("sessionId", Date.now().toString());
  }
  
  // Renderizar productos al cargar la página
  renderizarProductos();
  
  // Usar event delegation para los botones de compra
  document.getElementById('productos-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('comprar-btn')) {
      const card = e.target.closest('.producto-card');
      const nombre = card.querySelector('h3').textContent;
      const precioTexto = card.querySelector('.precio').textContent;
      const precio = parseFloat(precioTexto.replace('S/', '').trim());
      const cantidad = parseInt(card.querySelector('.cantidad-display').textContent);
      
      // Crear objeto de compra
      const compra = {
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
        total: precio * cantidad,
        tipo: 'producto',
        fecha: new Date().toISOString()
      };
      
      // ✅ Guardar en localStorage
      localStorage.setItem('compraActual', JSON.stringify(compra));
      
      // Animación de éxito
      e.target.textContent = '✓ Procesando...';
      e.target.style.background = '#10b981';
      
      // Mostrar notificación y redirigir
      mostrarNotificacion(`Redirigiendo a pagos...`);
      
      setTimeout(() => {
        window.location.href = 'Pagos.html';
      }, 1500);
    }
  });
  
  // Animación de entrada para las tarjetas
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.producto-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
  });
});

// ====== Cerrar sidebar al hacer clic fuera en móvil ======
document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  
  if (window.innerWidth <= 768 && 
      sidebar.classList.contains('open') && 
      !sidebar.contains(e.target) && 
      !menuBtn.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});
