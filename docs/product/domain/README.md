# Dominio
este directorio contiene la documentación del dominio del producto. Aquí encontrarás información detallada sobre los diferentes contextos, modelos, sus relaciones y reglas de negocio que definen el dominio del producto.

## TBD
Aunque este directorio es puramente funcional, adopta algunos de los principios de *strategic design* de *Domain Driven Design* (DDD) para organizar y estructurar la información del dominio:

- **Contextos delimitados (Bounded Contexts)**: Cada contexto delimitado representa un área específica del dominio del producto, con su propio modelo de negocio y lenguaje ubicuo. Los contextos delimitados ayudan a organizar y estructurar el dominio, facilitando la comprensión y el desarrollo del producto.

- **Entidades de negocio (Entities)**: Las entidades son objetos del dominio que tienen una identidad única y persisten a lo largo del tiempo. Cada entidad debe tener un nombre único, descriptivo y consistente (Lenguaje Ubicuo), y debe describir un modelo, (propiedades, relaciones, reglas de negocio, etc.) y no un caso de uso o funcionalidad.

- **Reglas de negocio (Business Rules)**: Las reglas de negocio definen cómo se comporta el dominio y sus entidades, estableciendo restricciones, validaciones y relaciones entre ellas. Estas reglas son fundamentales para garantizar la coherencia y consistencia del modelo de negocio.

- **Lenguaje Ubicuo (Ubiquitous Language)**: El lenguaje ubicuo es un conjunto de términos y conceptos compartidos entre los miembros del equipo de desarrollo y los expertos en el dominio. Este lenguaje común facilita la comunicación, la comprensión y la colaboración entre todas las partes involucradas en el desarrollo del producto.

- **Mapeo de Contextos (Context Mapping)**: El mapeo de contextos es una técnica utilizada para identificar y visualizar las relaciones entre los diferentes contextos delimitados del dominio. Este mapeo ayuda a comprender cómo interactúan los contextos, qué dependencias existen entre ellos y cómo se pueden gestionar de manera efectiva.

## Estructura

### Contextos (Contexts)
Un `Contexto` representa un área específica del dominio del producto. Los contextos pretenden delimitar partes del dominio que tienen un lenguaje y modelo de negocio propio, y que pueden evolucionar de manera independiente.

Cada contexto debe:

- Ser una carpeta única, con un nombre descriptivo y consistente (*Ubicuous Language*) que refleje su propósito y relación con el dominio del producto.
- Tener un `README.md` que describa el contexto.
- Debe describirse su propósito y justifique su existencia en base al concepto del producto o alguna decisión
- Debe definirse claramente los límites del contexto y su relación con otros contextos (*Context Mapping*).

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

### Casos de uso (Use Cases)
Los casos de uso representan descripciones de procesos que involucran a uno o más conceptos de negocio dentro de un contexto delimitado. Los casos de uso deben estar encapsulados dentro de un contexto delimitado y deben ser consistentes con el lenguaje ubicuo del dominio.

Cada caso de uso debe:
- Estar contenido dentro de una carpeta `/use-cases` dentro del contexto correspondiente.
- Ser un fichero único, en `.md` dentro de la carpeta del contexto correspondiente.
- Debe tener un nombre único, descriptivo y consistente (Lenguaje Ubicuo).
- Debe describir un proceso, (actores, pasos, condiciones, resultados, etc.) y no un modelo de negocio o entidad.
