
// navigation.js - Script para manejar el menú activo del sidebar

document.addEventListener('DOMContentLoaded', function() {
    // Obtener la página actual del URL
    const currentPage = window.location.pathname.split('/').pop();
    
    // Seleccionar todos los enlaces del menú de navegación
    const navItems = document.querySelectorAll('.nav-item');
    
    // Remover la clase 'active' de todos los elementos
    navItems.forEach(item => {
        item.classList.remove('active');
        
        // Obtener el href del enlace
        const itemHref = item.getAttribute('href');
        
        // Si el href coincide con la página actual, agregar 'active'
        if (itemHref === currentPage) {
            item.classList.add('active');
        }
    });
    
    // Caso especial: Si estamos en la página principal o index
    if (currentPage === '' || currentPage === 'index.html' || currentPage === '/') {
        const principalLink = document.querySelector('a[href="index.html"], a[href="principal.html"]');
        if (principalLink) {
            principalLink.classList.add('active');
        }
    }
});