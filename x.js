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
    // MODIFICADO: Cambiado el selector para los botones de añadir al carrito
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
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
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // =================== Carrito de compras ===================
    /**
     * Configura el contador del carrito en la barra de navegación
     */
    function setupCart() {
        cartCount.classList.add('cart-count');
        cartCount.textContent = cartItems.toString();
        // Buscar el botón de "Registrarse" o el último elemento en auth-buttons para insertar el contador antes
        const authButtonsDiv = document.querySelector('.auth-buttons');
        if (authButtonsDiv) {
            const registerBtn = authButtonsDiv.querySelector('.btn-primary');
            if (registerBtn) {
                authButtonsDiv.insertBefore(cartCount, registerBtn);
            } else {
                authButtonsDiv.appendChild(cartCount); // En caso de que solo exista el de iniciar sesión
            }
        }
    }

    /**
     * Actualiza el contador del carrito en la interfaz
     */
    function updateCartCount() {
        cartCount.textContent = cartItems.toString();
        saveCartToLocalStorage();
    }

    /**
     * Añade un producto al carrito
     */
    function addItemToCart() {
        cartItems++;
        updateCartCount();
        alert('Producto añadido al carrito!'); // Puedes reemplazar esto con una notificación más elegante
    }

    /**
     * Configura los event listeners para los botones "Añadir al carrito"
     */
    function setupAddToCartButtons() {
        // MODIFICADO: Itera sobre los botones seleccionados por la nueva constante
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addItemToCart);
        });
    }

    /**
     * Carga el estado del carrito desde el almacenamiento local
     */
    function loadCartFromLocalStorage() {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            cartItems = parseInt(storedCartItems);
            updateCartCount();
        }
    }

    /**
     * Guarda el estado del carrito en el almacenamiento local
     */
    function saveCartToLocalStorage() {
        localStorage.setItem('cartItems', cartItems.toString());
    }

    // =================== Animaciones al hacer scroll ===================
    /**
     * Maneja las animaciones de los elementos al hacer scroll
     */
    function setupScrollAnimations() {
        // Seleccionar todos los elementos a animar
        const elementsToAnimate = document.querySelectorAll('.product-card, .feature-card, .testimonial-card');

        // Opciones del Intersection Observer
        const options = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // el 10% del elemento debe ser visible para activar
        };

        // Callback para el observador
        const handleIntersection = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target); // Dejar de observar una vez que se ha animado
                }
            });
        };

        // Crear el observador
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
        setupAddToCartButtons(); // Asegúrate de que esta función se llame después de definir addToCartButtons
        loadCartFromLocalStorage();
        setupScrollAnimations();

        // Mejorar la accesibilidad para enlaces sin aria-label explícito
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            // Solo si no tiene aria-label y su contenido de texto está vacío o es solo whitespace
            if (!link.getAttribute('aria-label') && link.textContent.trim() === '') {
                const href = link.getAttribute('href');
                let ariaLabelText = `Enlace a ${href}`; // Etiqueta por defecto

                // Mejora para enlaces específicos
                if (href.includes('wa.me')) {
                    ariaLabelText = 'Contactar por WhatsApp';
                } else if (href.includes('facebook.com')) {
                    ariaLabelText = 'Visitar Facebook';
                } else if (href.includes('linkedin.com')) {
                    ariaLabelText = 'Visitar LinkedIn';
                } else if (href.includes('instagram.com')) {
                    ariaLabelText = 'Visitar Instagram';
                } else if (href.includes('twitter.com')) {
                    ariaLabelText = 'Visitar Twitter';
                } else if (href.includes('.html') && href !== 'index.html') {
                    // Intenta hacer una etiqueta más amigable para archivos HTML locales
                    const fileName = href.split('/').pop().replace('.html', '');
                    ariaLabelText = `Ir a la página de ${fileName.replace(/-/g, ' ')}`;
                } else if (link.parentElement.classList.contains('logo')) {
                    ariaLabelText = 'Ir a la página de inicio de PhoneHub';
                }
                
                link.setAttribute('aria-label', ariaLabelText);
            }
        });
    }

    // Iniciar aplicación
    init();
});