# Dominio

este directorio contiene la documentación del dominio del producto. Aquí encontrarás información detallada sobre los diferentes contextos, modelos, sus relaciones y reglas de negocio que definen el dominio del producto.

## TBD

Aunque este directorio es puramente funcional, adopta algunos de los principios de _strategic design_ de _Domain Driven Design_ (DDD) para organizar y estructurar la información del dominio:

- **Contextos delimitados (Bounded Contexts)**: Cada contexto delimitado representa un área específica del dominio del producto, con su propio modelo de negocio y lenguaje ubicuo. Los contextos delimitados ayudan a organizar y estructurar el dominio, facilitando la comprensión y el desarrollo del producto.

- **Entidades de negocio (Entities)**: Las entidades son objetos del dominio que tienen una identidad única y persisten a lo largo del tiempo. Cada entidad debe tener un nombre único, descriptivo y consistente (Lenguaje Ubicuo), y debe describir un modelo, (propiedades, relaciones, reglas de negocio, etc.) y no un caso de uso o funcionalidad.

- **Reglas de negocio (Business Rules)**: Las reglas de negocio definen cómo se comporta el dominio y sus entidades, estableciendo restricciones, validaciones y relaciones entre ellas. Estas reglas son fundamentales para garantizar la coherencia y consistencia del modelo de negocio.

- **Lenguaje Ubicuo (Ubiquitous Language)**: El lenguaje ubicuo es un conjunto de términos y conceptos compartidos entre los miembros del equipo de desarrollo y los expertos en el dominio. Este lenguaje común facilita la comunicación, la comprensión y la colaboración entre todas las partes involucradas en el desarrollo del producto.

- **Mapeo de Contextos (Context Mapping)**: El mapeo de contextos es una técnica utilizada para identificar y visualizar las relaciones entre los diferentes contextos delimitados del dominio. Este mapeo ayuda a comprender cómo interactúan los contextos, qué dependencias existen entre ellos y cómo se pueden gestionar de manera efectiva.

## Estructura

### Contextos (Contexts)

Un `Contexto` representa un área específica del dominio del producto. Los contextos pretenden delimitar partes del dominio que tienen un lenguaje y modelo de negocio propio, y que pueden evolucionar de manera independiente.

Cada contexto debe:

- Ser una carpeta única, con un nombre descriptivo y consistente (_Ubicuous Language_) que refleje su propósito y relación con el dominio del producto.
- Tener un `README.md` que describa el contexto.
- Debe describirse su propósito y justifique su existencia en base al concepto del producto o alguna decisión
- Debe definirse claramente los límites del contexto y su relación con otros contextos (_Context Mapping_).

### Conceptos de negocio (Concepts)

Los conceptos de negocio son elementos del dominio que representan ideas, procesos o entidades que son relevantes para el producto. Estos conceptos deben estar encapsulados dentro de un contexto delimitado y deben ser consistentes con el lenguaje ubicuo del dominio.

Cada concepto debe:

- Estar contenido dentro de una carpeta `/concepts` dentro del contexto correspondiente.
- Ser un fichero único, en `.md` dentro de la carpeta del contexto correspondiente.
- Debe tener un nombre único, descriptivo y consistente (Lenguaje Ubicuo).
- Debe describir un modelo, (propiedades, relaciones, reglas de negocio, etc.) y no un caso de uso o funcionalidad.
- Debe disponer unas reglas de negocio claras y concisas, que definan cómo se comporta la entidad dentro del dominio.
- Debe indicar sus relaciones de dependencia con otras entidades, si las tiene.

Los conceptos no tienen por qué tener una estructura o plantilla específica mientras cumplan con los criterios anteriores. Pueden además estar agrupados a dentro de subdirectorios dentro de `/concepts`, en tantos niveles como sea necesario, siempre que se mantenga la consistencia y claridad en la organización del dominio.

### Operaciones (Operations)

Las operaciones representan acciones o procesos que se pueden realizar dentro del dominio del producto. Estas operaciones pueden involucrar la interacción entre diferentes conceptos de negocio y contextos delimitados, y deben estar claramente definidas y documentadas.

Cada operación debe:

- Estar contenida dentro de una carpeta `/operations` dentro del contexto correspondiente.
- Ser un fichero único, en `.md` dentro de la carpeta del contexto correspondiente.
- Debe tener un nombre único, descriptivo y consistente (Lenguaje Ubicuo).
- Debe describir un caso de uso o funcionalidad, y no un modelo de negocio
- Debe indicar los conceptos de negocio involucrados en la operación y cómo interactúan entre sí
- Debe indicar qué (o quién) inicia la operación, qué pasos se realizan y cuál es el resultado esperado.
- Debe indicar las reglas de negocio que se aplican durante la operación.

Las operaciones no tienen por qué tener una estructura o plantilla específica mientras cumplan con los criterios anteriores. Pueden además estar agrupadas a dentro de subdirectorios dentro de `/operations`, en tantos niveles como sea necesario, siempre que se mantenga la consistencia y claridad en la organización del dominio.
