# Producto
Este directorio contiene la documentación del producto. Aquí encontrarás información detallada sobre las características, funcionalidades y guías de uso del producto.

El diseño del producto se organiza en niveles. Un nivel más alto representa una definición más abstracta del producto, mientras que un nivel más bajo representa una definición más concreta.

## Estructura: niveles del producto
1. [Concepto](./concept/README.md): Estrategia, visión y objetivos del producto.
2. [Decisiones](./decisions/README.md): Registro de decisiones clave tomadas durante el desarrollo del producto.
3. [Dominio](./domain/README.md): Contexto, modelos, sus relaciones y reglas de negocio del producto.
4. [Características](./features/README.md): Descripción de las funcionalidades principales del producto.

## Reglas no negociables
- Un nivel inferior no puede contradecir un nivel superior.
- Un nivel superior no puede hacer referencia a un nivel inferior.
- Cada nivel debe construirse sobre el nivel inmediatamente superior, sin saltarse niveles.