# Producto
Este directorio contiene la documentación del producto. Aquí encontrarás información detallada sobre las características, funcionalidades y guías de uso del producto.

El diseño del producto se organiza en niveles. Un nivel más alto representa una definición más abstracta del producto, mientras que un nivel más bajo representa una definición más concreta. 

## Roles y responsabilidades
Todo el proceso de definición del producto involucra a varios roles, cada uno con responsabilidades específicas. Estos roles podrán ser desempeñados por personas o por agentes de inteligencia artificial, pero deberán estar claramente identificados.

A continuación se describen los roles clave:

- **Stakeholders**: Personas o grupos que tienen interés en el producto y pueden influir en su desarrollo. Pueden incluir clientes, usuarios finales, inversores y otros miembros del equipo.

- **Product Manager (PM)**: Responsable de la visión del producto, la estrategia y la priorización de características. Toma decisiones clave sobre el producto y asegura que se cumplan los objetivos del negocio. Es el rol central y que en última instancia toma las decisiones sobre el producto.

- **Product Owner (PO)**: Responsable de la gestión del backlog del producto, la definición de historias de usuario y la colaboración con el equipo de desarrollo para garantizar que se entreguen las características correctas.

- **Product Designer (PD)**: Responsable del diseño de la experiencia del usuario, la interfaz y la interacción del producto. Trabaja en estrecha colaboración con el PM y el PO para garantizar que el producto sea intuitivo y atractivo para los usuarios.

- **Product Engineer (PE)**: Responsable de la implementación técnica del producto, asegurando que las características se desarrollen de acuerdo con los requisitos y estándares de calidad.

## Estructura: niveles del producto
1. [Constitución](./charter/README.md): Estrategia, visión y objetivos del producto. Repreenta la definición más abstracta del producto, pero al mismo tiempo la más importante, ya que define el rumbo y los objetivos del producto. Tiene el ciclo de vida más largo, idealmente no debería cambiar a lo largo de la vida del producto. Es redactada por el **Product Manager** y aprobada por los **Stakeholders**.

2. [Decisiones](./decisions/README.md): Registro de decisiones clave tomadas durante el desarrollo del producto. Define la dirección del producto y proporciona un historial de las decisiones tomadas, incluyendo el contexto, las opciones evaluadas y las razones detrás de cada decisión. Su ciclo de actualización es más corto que el de la constitución, ya que las decisiones pueden cambiar a medida que se obtiene nueva información o se ajustan los objetivos del producto. Es redactada y aprobada por el **Product Manager**, pero puede invitar a colaborar a otros roles como el **Product Designer** o el **Product Engineer**.

3. [Dominio](./domain/README.md): Contextos, conceptos del negocio y sus reglas y relaciones. Proporciona una comprensión funcional del producto agnóstica a la implementación y las fases de construcción. Su ciclo de actualización es más corto que el de las decisiones, ya que los conceptos del negocio pueden evolucionar con el tiempo. Es redactada por el **Product Owner** y aprobada por el **Product Manager**, pero puede invitar a colaborar a otros roles como el **Product Designer** o el **Product Engineer**.

4. [Características](./features/README.md): Funcionalidades, especificaciones, diseños y criterios de aceptación. Describen cómo se implementarán las características del producto y cómo se espera que funcionen. Su ciclo de actualización es más corto que el del dominio, ya que las características pueden cambiar a medida que se desarrollan y prueban. Es redactada por el **Product Owner** y aprobada por el **Product Manager**, pero puede invitar a colaborar a otros roles como el **Product Designer** o el **Product Engineer**.

## Reglas no negociables
- Un nivel inferior no puede contradecir un nivel superior.
- Un nivel superior no puede hacer referencia a un nivel inferior.
- Cada nivel debe construirse sobre el nivel inmediatamente superior, sin saltarse niveles.
