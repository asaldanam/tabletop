# Instrucciones

Instrucciones que todos los agentes de código deben tener en cuenta

# Estructura

- [DESIGN.md](/DESIGN.md): especificación de diseño de la UI y UX.
- [product/README.md](/docs/product/README.md): documentación del producto.

## Separación de responsabilidades

- Las páginas estáticas como la home y otras landing pages se desarrollarán en Astro, en el paquete [main](/apps/main)

- La aplicación del tablero será de tipo SPA (Single Page Application) y se desarrollará en el paquete [tabletop](/packages/tabletop).

- Mantén el dominio lo más puro posible, en el paquete [core](/packages/core) y totalmente separado de la parte frontend.
