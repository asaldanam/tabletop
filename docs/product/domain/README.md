# Dominio

Este nivel describe el negocio: sus conceptos, reglas, relaciones e interacciones. Su objetivo es crear una wiki compartida entre negocio, diseno y desarrollo, no una especificacion tecnica ni un backlog.

El dominio debe poder alimentar a `features`, pero no depender de ellas. Las funcionalidades cambian con frecuencia; el lenguaje y las reglas centrales del negocio deben ser mas estables.

## Principios

### Lenguaje ubicuo

Todo concepto de negocio debe escribirse siempre entre backticks.

Ejemplos:

* `Usuario`
* `Cuenta`
* `Pedido`
* `Sesion`
* `Pago`

Un concepto debe tener un solo nombre. Si dos areas usan la misma palabra con significados distintos, hay que explicitarlo o separarlo en contextos diferentes.

### Contextos delimitados

Un contexto delimita una parte del negocio donde el lenguaje y las reglas tienen sentido propio.

Crea o separa contextos cuando:

* El mismo termino significa cosas distintas segun el area.
* Las reglas de negocio cambian claramente entre areas.
* Un cambio en una parte del producto suele bloquear o tensionar a otra.
* Hay equipos, pantallas, procesos o responsabilidades claramente distintas.

Los contextos no son modulos tecnicos. Son fronteras funcionales del negocio.

### Mapas del dominio

Usa archivos `MAP.md` para visualizar relaciones.

Hay dos usos principales:

* En la raiz de `domain`, `MAP.md` representa el mapa entre contextos del dominio.
* Dentro de un contexto, `MAP.md` representa modelos, reglas, eventos o flujos relevantes de ese contexto.

Los mapas deben estar escritos en Mermaid para que puedan revisarse desde Markdown.

### Modelos, reglas y flujos

No uses terminos cercanos a implementacion como Aggregate, Entity, Value Object o Repository. En este nivel hablamos de:

* `Modelo` o `Entidad de negocio`: concepto relevante del negocio.
* `Regla de negocio`: condicion que debe cumplirse.
* `Flujo` o `Interaccion`: proceso que coordina varios modelos o reglas.
* `Evento de negocio`: hecho relevante que ocurre en el dominio.

Si una explicacion necesita mas de un modelo para entenderse, probablemente debe estar en `rules/` o `flows/`, no solo en `models/`.

## Estructura recomendada

```text
docs/product/domain/
  README.md
  GLOSSARY.md
  MAP.md
  @template/
    README.md
    MAP.md
    models/
      MODEL_TEMPLATE.md
    rules/
      RULE_TEMPLATE.md
    flows/
      FLOW_TEMPLATE.md
```

Esta estructura es una guia, no una obligacion. Si el dominio es pequeno, puede empezar con `GLOSSARY.md`, `MAP.md` y un unico contexto. Si crece, divide por contextos.

## Como construir un dominio

1. Lee el concepto, decisiones y material de producto disponible.
2. Extrae los conceptos de negocio y normaliza sus nombres en `GLOSSARY.md`.
3. Agrupa conceptos por contextos delimitados.
4. Crea un `MAP.md` raiz para mostrar como se relacionan los contextos.
5. Para cada contexto, define sus modelos principales en `models/`.
6. Extrae reglas que deban cumplirse siempre y documentalas en `rules/`.
7. Documenta procesos que conecten varios modelos o reglas en `flows/`.
8. Actualiza el mapa del contexto cuando aparezcan relaciones relevantes.

## Plantilla de contexto

Usa esta plantilla en `[nombre-del-contexto]/README.md`.

```md
# [Nombre del contexto]

## Proposito

[Que parte del negocio describe este contexto y por que existe.]

## Lenguaje propio

* `[Concepto]`: [Definicion corta dentro de este contexto]
* `[Concepto]`: [Definicion corta dentro de este contexto]

## Responsabilidades

* [Responsabilidad funcional del contexto]
* [Responsabilidad funcional del contexto]

## Fuera del contexto

* [Concepto, regla o proceso que pertenece a otro contexto]
* [Concepto, regla o proceso que pertenece a otro contexto]

## Relaciones con otros contextos

* `[Otro contexto]`: [Como se relaciona y que informacion cruza la frontera]

## Documentos

* [Mapa del contexto](./MAP.md)
* [Modelos](./models/)
* [Reglas](./rules/)
* [Flujos](./flows/)
```

## Plantilla de modelo

Usa esta plantilla en `[contexto]/models/[modelo].md`.

```md
# `[Modelo]`

## Definicion

[Que representa este modelo dentro del negocio.]

## Responsabilidad

[Que sabe o representa este modelo desde el punto de vista funcional.]

## Datos funcionales relevantes

* `[Dato]`: [Descripcion funcional, no tecnica]
* `[Dato]`: [Descripcion funcional, no tecnica]

## Estados relevantes

* `[Estado]`: [Que significa para negocio]
* `[Estado]`: [Que significa para negocio]

## Relaciones

* `[Otro modelo]`: [Tipo de relacion funcional]

## Reglas asociadas

* [Enlace a regla relacionada](../rules/RULE_TEMPLATE.md)

## Dudas abiertas

* [Decision pendiente o ambiguedad detectada]
```

## Plantilla de regla

Usa esta plantilla en `[contexto]/rules/[regla].md`.

```md
# [Nombre de la regla]

## Regla

[Condicion que debe cumplirse siempre, escrita de forma clara y verificable.]

## Motivo

[Por que existe esta regla desde el punto de vista del negocio.]

## Aplica a

* `[Modelo]`
* `[Modelo]`

## Ejemplos validos

* [Caso que cumple la regla]

## Ejemplos invalidos

* [Caso que incumple la regla]

## Consecuencias

[Que debe ocurrir si la regla se cumple o se incumple.]

## Dudas abiertas

* [Decision pendiente o excepcion por aclarar]
```

## Plantilla de flujo

Usa esta plantilla en `[contexto]/flows/[flujo].md`.

```md
# [Nombre del flujo]

## Objetivo

[Que proceso de negocio describe este flujo.]

## Participantes

* `[Modelo o actor]`: [Rol dentro del flujo]
* `[Modelo o actor]`: [Rol dentro del flujo]

## Precondiciones

* [Condicion necesaria antes de empezar]

## Flujo principal

1. [Paso funcional]
2. [Paso funcional]
3. [Paso funcional]

## Variantes y excepciones

* [Variante o caso alternativo]
* [Error o excepcion funcional]

## Resultado

[Estado final o evento de negocio que produce el flujo.]

## Reglas relacionadas

* [Enlace a regla relacionada](../rules/RULE_TEMPLATE.md)
```

## Plantilla de evento de negocio

Los eventos pueden documentarse dentro de `flows/` o como seccion propia si el contexto lo necesita.

```md
# `[Evento]`

## Definicion

[Hecho relevante que ha ocurrido en el negocio.]

## Cuando ocurre

[Condicion o flujo que produce este evento.]

## Informacion relevante

* `[Dato]`: [Descripcion funcional]

## Consecuencias

* [Cambio, notificacion o regla que se dispara a partir del evento]
```
