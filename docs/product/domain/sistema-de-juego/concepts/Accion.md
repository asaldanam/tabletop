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

Cuando un jugador realice una acción, deberán ocurrir los siguientes pasos:

1. El jugador seleccionará la `Acción` que desea realizar por su `Nombre` y confirmará la acción.
2. El jugador seleccionará el `Objetivo` de la acción y confirmará la acción.
3. El sistema realizará la `Tirada` descrita según la acción.

Si la tirada `Umbral de éxito` está definida y el resultado de la tirada es menor al umbral:
4. El sistema notificará al jugador que la acción ha fallado y no se aplicará ningún efecto.

Si no hay `Umbral de éxito` definido o el resultado de la tirada es mayor o igual al umbral:
4. El sistema notificará del `Efecto` a los `Objetivos` afectados, pero no los aplicará automáticamente.
5. El sistema permitirá a los jugadores cuyos personajes hayan sido afectados por la acción realizar `Reacciones` si las tienen definidas, antes de aplicar el efecto de la acción.

Si un personaje afectado fracasa en su reacción:
6. El sistema aplicará el `Efecto` de la acción al `Objetivo`.

Si un personaje afectado tiene éxito en su reacción:
6. El sistema notificará al jugador que la acción ha sido contrarrestada y no se aplicará ningún efecto.

Llegado a este punto, el jugador cuyo personaje realizó la acción podrá decidir si desea realizar otra acción o finalizar su turno.

## Tiradas de acción
Toda `Acción` deberá tener definida una `Tirada` (ver fórmula en la sección de `Tiradas`) que podrá ser usado para determinar el éxito o fracaso de la acción o compararlo con la `Tirada de reacción` de un personaje afectado por la acción.

## Objetivo de acción
<!-- TODO: Complete definition -->

## Efectos de acción
<!-- TODO: Complete definition -->

