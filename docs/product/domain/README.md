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

### Entidades y objetos de negocio (Entities)
Las entidades son objetos del dominio que tienen una identidad única y persisten a lo largo del tiempo.

Cada entidad deben:
- Estar contenidas en un directorio `/entities` dentro de la carpeta del contexto correspondiente.
- Ser un fichero único, en `.md` dentro de la carpeta del contexto correspondiente.
- Debe tener un nombre único, descriptivo y consistente (Lenguaje Ubicuo).
- Debe describir un modelo, (propiedades, relaciones, reglas de negocio, etc.) y no un caso de uso o funcionalidad.
- Debe disponer unas reglas de negocio claras y concisas, que definan cómo se comporta la entidad dentro del dominio.
- Debe indicar sus relaciones de dependencia con otras entidades, si las tiene.

Las entidades no tienen por qué tener una estructura o plantilla específica mientras cumplan con los criterios anteriores. Pueden además estar agrupadas a dentro de subdirectorios dentro de `/entities`, en tantos niveles como sea necesario, siempre que se mantenga la consistencia y claridad en la organización del dominio.