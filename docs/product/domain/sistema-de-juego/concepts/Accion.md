# Acción (Action)

Durante el transcurso del turno de un personaje, el jugador podrá realizar tantas acciones como desee. Las acciones representan las actividades que un personaje puede realizar durante su turno, como atacar, lanzar un hechizo, interactuar con objetos, entre otras.

- El jugador deberá definir al menos una acción para su personaje antes de comenzar la partida.
- El jugador podrá definir tantas acciones como desee para su personaje.
- El jugador podrá modificar o eliminar las acciones de su personaje en cualquier momento, incluso durante la partida.

Cada acción deberá tener los siguientes parámetros:

- `Nombre`: Nombre de la acción que el jugador y otros jugadores podrán ver. Máximo 32 caracteres.
- `Descripción`: Descripción en texto de la acción que el jugador y otros jugadores podrán ver. máximo 256 caracteres.
- `Tipo de objetivo`: El objetivo de la acción, que puede ser un personaje o un área del mapa.
- `Tirada (opcional)`: Tirada para determinar el éxito o fracaso de la acción, que puede incluir dados y modificadores.
- `Umbral de éxito (opcional)`: Valor mínimo que debe obtenerse en la tirada para que la acción tenga éxito.
- `Efecto`: Efecto de la acción, que puede incluir daño, curación, estado alterado, entre otros.

## Tiradas de acción

Toda `Acción` _podrá_ tener definida una `Tirada` (ver fórmula en la sección de `Tiradas`) que sea usada para determinar el éxito o fracaso de la acción o compararlo con la `Tirada de reacción` de un personaje afectado por la acción.

En caso de no definirse una `Tirada` para la acción, el sistema asumirá que la acción siempre tiene éxito y se aplicará el `Efecto` de la acción al `Objetivo`.

## Tipo de objetivo de acción

Todas las `Acciones` _deberán_ tener definido un `Tipo de objetivo`, que puede ser:

- `Objetivos`: La acción afectará uno (o varios) `Personaje`s (incluído uno mismo) que el `Jugador` _deberá_ seleccionar al realizar la `Acción`. Si la `Acción` se configura según este `Tipo de objetivo`, el `Jugador` _deberá_ configurar también la `cantidad de objetivos` (entero positivo) que podrá seleccionar al realizar la `Acción`.

- `Área`: Si al configurar la `Acción` el `Jugador` selecciona este tipo de objetivo, _deberá_ seleccionar un tipo de `Área` definidos en [Mapa.md](/docs/product/domain/sistema-de-juego/concepts/Mapa.md). En función del área elegida, _deberá_ además configurar:
    - Los parámetros que definene el **tamaño** del `Área`. (`Longitud`, `Ancho`, `Diámetro`).
    - Si la `Casilla central` corresponde a la ubicación del `Personaje` o bien a una `Casilla` seleccionada por el `Jugador` al realizar la `Acción`.

## Efectos de acción

Los efectos de una `Acción` representan los cambios que ocurren en el `Objetivo` de la acción al ser afectado por la misma. El `Jugador` _deberá_ definir el `Efecto` de la acción al configurarla, que puede incluir:

- `Daño`: Añadiendo `Puntos de daño` al `Objetivo` de la acción. El `Jugador` además _deberá_ definir la cuantía de `Puntos de daño` que se aplicarán al `Objetivo` al realizar la acción o un `Tirada` que determine la cantidad de `Puntos de daño` a aplicar al `Objetivo`.

- `Curación`: Eliminado `Puntos de daño` al `Objetivo` de la acción. El `Jugador` además _deberá_ definir la cuantía de `Puntos de curación` que se aplicarán al `Objetivo` al realizar la acción o un `Tirada` que determine la cantidad de `Puntos de curación` a aplicar al `Objetivo`.

- Aplicar `Estado alterado`: Añadiendo un `Estado alterado` al `Objetivo` de la acción. Los estados alterados funcionarán como tags (etiquetas) sin más impacto que el de aparecer sobre el token del `Personaje` afectado durante el tiempo que dure el `Estado alterado`.

El `Jugador` además _deberá_ configurar - El nombre del `Estado alterado` que se aplicará al `Objetivo` al realizar la acción y - La `duración` (opcional) del mismo como número de rondas (entero positivo) que durará el `Estado alterado` sobre el `Objetivo` de la acción. Si no se define una duración, el `Estado alterado` permanecerá indefinidamente sobre el `Objetivo` hasta que sea eliminado por otra acción. - El `umbral` (opcional) que deberá superar el `Objetivo` de la acción en su `Tirada de reacción` para evitar que se le aplique el `Estado alterado`. Si no se define un umbral, el `Estado alterado` se aplicará automáticamente al `Objetivo` de la acción.
