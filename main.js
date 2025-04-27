/**
 * PhoneHub - Main JavaScript File
 * 
 * Este archivo maneja toda la funcionalidad interactiva del sitio web
 * de PhoneHub, incluyendo navegación móvil, carrito de compras, 
 * y animaciones de elementos.
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // =================== Variables globales ===================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const cartButtons = document.querySelectorAll('.btn-primary');
    const cartCount = document.createElement('span');
    let cartItems = 0;
    
    // =================== Menú móvil ===================
    /**
     * Maneja la funcionalidad del menú móvil (hamburguesa)
     */
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Accesibilidad - Aria expanded
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
        
        // Cierra el menú al hacer clic en un enlace
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', false);
            });
        });
    }
    
    // =================== Carrito de compras ===================
    /**
     * Configuración inicial del contador del carrito
     */
    function setupCart() {
        // Crear y configurar el indicador del carrito
        cartCount.className = 'cart-count';
        cartCount.textContent = cartItems;
        cartCount.style.display = 'none';
        
        // Estilos en línea para el contador del carrito
        cartCount.style.position = 'absolute';
        cartCount.style.top = '-8px';
        cartCount.style.right = '-8px';
        cartCount.style.backgroundColor = '#FF4B55';
        cartCount.style.color = 'white';
        cartCount.style.borderRadius = '50%';
        cartCount.style.width = '20px';
        cartCount.style.height = '20px';
        cartCount.style.display = 'flex';
        cartCount.style.alignItems = 'center';
        cartCount.style.justifyContent = 'center';
        cartCount.style.fontSize = '12px';
        cartCount.style.fontWeight = 'bold';
        
        // Crear un botón de carrito en la barra de navegación
        const cartButton = document.createElement('button');
        cartButton.className = 'cart-button';
        cartButton.innerHTML = '🛒';
        cartButton.setAttribute('aria-label', 'Carrito de compras');
        cartButton.style.position = 'relative';
        cartButton.style.background = 'none';
        cartButton.style.border = 'none';
        cartButton.style.fontSize = '1.5rem';
        cartButton.style.marginLeft = '1rem';
        cartButton.style.cursor = 'pointer';
        
        // Añadir el contador al botón
        cartButton.appendChild(cartCount);
        
        // Añadir el botón a la barra de navegación
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            authButtons.appendChild(cartButton);
        }
        
        // Añadir funcionalidad de clic para mostrar el carrito
        cartButton.addEventListener('click', function() {
            showCartModal();
        });
    }
    
    /**
     * Maneja la funcionalidad de añadir productos al carrito
     */
    function setupAddToCartButtons() {
        // Añadir evento click a todos los botones "Añadir al carrito"
        cartButtons.forEach(button => {
            if (button.textContent.includes('Añadir al carrito')) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Obtener información del producto
                    const productCard = button.closest('.product-card');
                    const productName = productCard.querySelector('.product-name').textContent;
                    const productPrice = productCard.querySelector('.product-price').textContent;
                    
                    // Aumentar contador de carrito
                    cartItems++;
                    cartCount.textContent = cartItems;
                    cartCount.style.display = 'flex';
                    
                    // Animación del botón
                    button.textContent = '✓ Añadido';
                    button.style.backgroundColor = '#4CAF50';
                    
                    // Restaurar el texto original después de un tiempo
                    setTimeout(() => {
                        button.textContent = 'Añadir al carrito';
                        button.style.backgroundColor = '';
                    }, 2000);
                    
                    // Mostrar notificación
                    showNotification(`¡${productName} añadido al carrito!`);
                    
                    // Guardar en localStorage
                    saveCartToLocalStorage(productName, productPrice);
                });
            }
        });
    }
    
    /**
     * Muestra una notificación temporal cuando se añade un producto al carrito
     * @param {string} message - El mensaje a mostrar en la notificación
     */
    function showNotification(message) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Estilos para la notificación
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--primary)';
        notification.style.color = 'white';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        notification.style.transition = 'all 0.3s ease';
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            
            // Eliminar del DOM después de la animación
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    /**
     * Guarda la información del carrito en localStorage
     * @param {string} productName - Nombre del producto
     * @param {string} productPrice - Precio del producto
     */
    function saveCartToLocalStorage(productName, productPrice) {
        let cart = JSON.parse(localStorage.getItem('phoneHubCart')) || [];
        
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1,
            date: new Date().toISOString()
        });
        
        localStorage.setItem('phoneHubCart', JSON.stringify(cart));
    }
    
    /**
     * Recupera los datos del carrito de localStorage al cargar la página
     */
    function loadCartFromLocalStorage() {
        const cart = JSON.parse(localStorage.getItem('phoneHubCart')) || [];
        cartItems = cart.length;
        
        if (cartItems > 0) {
            cartCount.textContent = cartItems;
            cartCount.style.display = 'flex';
        }
    }
    
    /**
     * Muestra una ventana modal con el contenido del carrito
     */
    function showCartModal() {
        // Obtener datos del carrito
        const cart = JSON.parse(localStorage.getItem('phoneHubCart')) || [];
        
        // Crear modal
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';
        modalOverlay.style.zIndex = '9999';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.backgroundColor = 'white';
        modalContent.style.borderRadius = '8px';
        modalContent.style.padding = '20px';
        modalContent.style.maxWidth = '500px';
        modalContent.style.width = '90%';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.overflow = 'auto';
        
        // Crear encabezado del modal
        const modalHeader = document.createElement('div');
        modalHeader.style.display = 'flex';
        modalHeader.style.justifyContent = 'space-between';
        modalHeader.style.alignItems = 'center';
        modalHeader.style.marginBottom = '20px';
        
        const modalTitle = document.createElement('h3');
        modalTitle.textContent = 'Tu carrito';
        modalTitle.style.margin = '0';
        
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        modalContent.appendChild(modalHeader);
        
        // Contenido del carrito
        const cartItems = document.createElement('div');
        cartItems.className = 'cart-items';
        
        if (cart.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Tu carrito está vacío';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.color = 'var(--gray)';
            emptyMessage.style.padding = '20px 0';
            cartItems.appendChild(emptyMessage);
        } else {
            let total = 0;
            
            // Crear lista de productos
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.style.display = 'flex';
                cartItem.style.justifyContent = 'space-between';
                cartItem.style.alignItems = 'center';
                cartItem.style.padding = '10px 0';
                cartItem.style.borderBottom = '1px solid #eee';
                
                const itemDetails = document.createElement('div');
                
                const itemName = document.createElement('p');
                itemName.textContent = item.name;
                itemName.style.margin = '0 0 5px 0';
                itemName.style.fontWeight = 'bold';
                
                const itemPrice = document.createElement('p');
                itemPrice.textContent = item.price;
                itemPrice.style.margin = '0';
                itemPrice.style.color = 'var(--primary)';
                
                itemDetails.appendChild(itemName);
                itemDetails.appendChild(itemPrice);
                
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Eliminar';
                removeButton.style.padding = '5px 10px';
                removeButton.style.backgroundColor = '#f44336';
                removeButton.style.color = 'white';
                removeButton.style.border = 'none';
                removeButton.style.borderRadius = '4px';
                removeButton.style.cursor = 'pointer';
                
                // Evento para eliminar producto
                removeButton.addEventListener('click', function() {
                    cart.splice(index, 1);
                    localStorage.setItem('phoneHubCart', JSON.stringify(cart));
                    cartItems.removeChild(cartItem);
                    
                    // Actualizar contador
                    updateCartCount();
                    
                    // Actualizar total
                    calculateTotal();
                    
                    // Mostrar mensaje de carrito vacío si no hay productos
                    if (cart.length === 0) {
                        const emptyMessage = document.createElement('p');
                        emptyMessage.textContent = 'Tu carrito está vacío';
                        emptyMessage.style.textAlign = 'center';
                        emptyMessage.style.color = 'var(--gray)';
                        emptyMessage.style.padding = '20px 0';
                        cartItems.appendChild(emptyMessage);
                    }
                });
                
                cartItem.appendChild(itemDetails);
                cartItem.appendChild(removeButton);
                cartItems.appendChild(cartItem);
                
                // Sumar al total (eliminar el símbolo $ y convertir a número)
                const price = parseFloat(item.price.replace('$', ''));
                total += price;
            });
            
            // Mostrar total
            const totalContainer = document.createElement('div');
            totalContainer.style.marginTop = '20px';
            totalContainer.style.textAlign = 'right';
            totalContainer.style.fontWeight = 'bold';
            totalContainer.style.fontSize = '18px';
            totalContainer.innerHTML = `Total: <span id="cart-total">$${total.toFixed(2)}</span>`;
            cartItems.appendChild(totalContainer);
            
            // Botón de compra
            const checkoutButton = document.createElement('button');
            checkoutButton.textContent = 'Proceder al pago';
            checkoutButton.className = 'btn btn-primary btn-full';
            checkoutButton.style.marginTop = '20px';
            
            checkoutButton.addEventListener('click', function() {
                alert('¡Gracias por tu compra simulada! Este es un proyecto educativo.');
                localStorage.removeItem('phoneHubCart');
                modalOverlay.remove();
                updateCartCount();
            });
            
            cartItems.appendChild(checkoutButton);
        }
        
        modalContent.appendChild(cartItems);
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        // Función para calcular el total actual
        function calculateTotal() {
            const currentCart = JSON.parse(localStorage.getItem('phoneHubCart')) || [];
            let total = 0;
            
            currentCart.forEach(item => {
                const price = parseFloat(item.price.replace('$', ''));
                total += price;
            });
            
            const totalElement = document.getElementById('cart-total');
            if (totalElement) {
                totalElement.textContent = `$${total.toFixed(2)}`;
            }
        }
        
        // Función para actualizar el contador del carrito
        function updateCartCount() {
            const updatedCart = JSON.parse(localStorage.getItem('phoneHubCart')) || [];
            cartItems = updatedCart.length;
            
            if (cartItems > 0) {
                cartCount.textContent = cartItems;
                cartCount.style.display = 'flex';
            } else {
                cartCount.style.display = 'none';
            }
        }
        
        // Manejar cierre del modal
        closeButton.addEventListener('click', function() {
            modalOverlay.remove();
        });
        
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.remove();
            }
        });
    }
    
    // =================== Animaciones de scroll ===================
    /**
     * Aplica animaciones al hacer scroll
     */
    function setupScrollAnimations() {
        // Seleccionar elementos para animar
        const elementsToAnimate = document.querySelectorAll('.product-card, .feature-card, .testimonial-card');
        
        // Configurar opciones para el observador
        const options = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% del elemento visible
        };
        
        // Callback del observador
        const handleIntersection = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Añadir clase para aplicar animación
                    entry.target.classList.add('animated');
                    // Dejar de observar el elemento
                    observer.unobserve(entry.target);
                }
            });
        };
        
        // Crear observador
        const observer = new IntersectionObserver(handleIntersection, options);
        
        // Añadir estilos para la animación
        const style = document.createElement('style');
        style.textContent = `
            .product-card, .feature-card, .testimonial-card {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
            
            .animated {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
        
        // Observar cada elemento
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }
    
    // =================== Inicialización ===================
    /**
     * Inicializa todas las funcionalidades
     */
    function init() {
        setupCart();
        setupAddToCartButtons();
        loadCartFromLocalStorage();
        setupScrollAnimations();
        
        // Mejorar la accesibilidad
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            if (!link.getAttribute('aria-label') && !link.textContent.trim()) {
                const href = link.getAttribute('href');
                link.setAttribute('aria-label', `Enlace a ${href}`);
            }
        });
    }
    
    // Iniciar aplicación
    init();
});