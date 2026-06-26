# Acción (Action)
Durante el transcurso del turno de un personaje, el jugador podrá realizar tantas acciones como desee. Las acciones representan las actividades que un personaje puede realizar durante su turno, como atacar, lanzar un hechizo, interactuar con objetos, entre otras.

- El jugador deberá definir al menos una acción para su personaje antes de comenzar la partida.
- El jugador podrá definir tantas acciones como desee para su personaje.
- El jugador podrá modificar o eliminar las acciones de su personaje en cualquier momento, incluso durante la partida.

Cada acción deberá tener los siguientes parámetros:

- `Nombre`: Nombre de la acción que el jugador y otros jugadores podrán ver.
- `Descripción`: Descripción de la acción que el jugador y otros jugadores podrán ver.
- `Objetivo`: El objetivo de la acción, que puede ser un personaje, un objeto o un área del mapa.
- `Tirada`: Tirada para determinar el éxito o fracaso de la acción, que puede incluir dados y modificadores.
- `Umbral de éxito (opcional)`: Valor mínimo que debe obtenerse en la tirada para que la acción tenga éxito.
- `Efecto`: Efecto de la acción, que puede incluir daño, curación, estado alterado, entre otros.

## Tiradas de acción
Toda `Acción` deberá tener definida una `Tirada` (ver fórmula en la sección de `Tiradas`) que podrá ser usado para determinar el éxito o fracaso de la acción o compararlo con la `Tirada de reacción` de un personaje afectado por la acción.

## Objetivo de acción
<!-- TODO: Complete definition -->

## Efectos de acción
<!-- TODO: Complete definition -->
