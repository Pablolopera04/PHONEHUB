# PhoneHub - Tienda de Smartphones

Este proyecto es una tienda en línea inspirada en el diseño de Stripe.com para la venta de celulares. Ha sido desarrollado como un proyecto educativo para el taller final.

## Estructura del Proyecto

```
phonehub/
│
├── index.html                  # Archivo HTML principal
├── css/
│   ├── normalize.css           # Reseteo CSS para consistencia entre navegadores
│   └── styles.css              # Estilos principales
├── js/
│   └── main.js                 # JavaScript para la interactividad
|
├── iphone-15.html              #pagina producto
|
├── iphone-16.html              #pagina producto
|
├── iphone-16e.html             #pagina producto
|
├── terminos-y-condiciones.html #pagina producto
|
└── README.md                   # Este archivo
```

## Características

- Diseño responsivo para todos los dispositivos
- Navegación intuitiva
- Carrito de compras funcional con almacenamiento local
- Secciones de productos destacados
- Características del servicio
- Testimonios de clientes
- Footer con enlaces e información relevante

## Tecnologías Utilizadas

- HTML5 semántico
- CSS3 (con variables CSS para una fácil personalización)
- JavaScript vanilla (sin frameworks)
- LocalStorage para persistencia de datos del carrito

## Buenas Prácticas Implementadas

### HTML
- Uso de etiquetas semánticas (header, nav, main, section, article, footer)
- Atributos de accesibilidad (aria-labels, roles)
- Estructura organizada y jerárquica

### CSS
- Organización por componentes
- Variables CSS para una fácil personalización
- Uso de flexbox y grid para layouts modernos

### JavaScript
- Código modular y comentado
- Manejo de eventos eficiente
- Animaciones de scroll
- Gestión de carrito de compras

## Guía de Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/phonehub.git
   cd phonehub
   ```

2. **Configura un servidor local:**

   - **VSCode:** Instala la extensión "Live Server" y haz clic en "Go Live".

3. **Accede al sitio:**
   Abre tu navegador y ve a `http://localhost:8000` (o el puerto que esté usando tu servidor).

## Personalización

### Colores
Para cambiar la paleta de colores, modifica las variables CSS en el archivo `css/styles.css`:

```css
:root {
    --primary: #635BFF; /* Color principal */
    --primary-light: #7A73FF; /* Versión más clara del color principal */
    --primary-dark: #4B44E2; /* Versión más oscura del color principal */
    /* ... otras variables de color ... */
}
```

### Fuentes
Para cambiar las fuentes:

1. Modifica el enlace a Google Fonts en `index.html`
2. Actualiza la variable `--font-family` en `css/styles.css`

### Productos
Para añadir o modificar productos, edita la sección "Productos Destacados" en `index.html`.
