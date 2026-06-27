# Realizar acción

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
