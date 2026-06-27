# Iniciativa (Initiative)

La iniciativa es un valor numérico que determina el orden de turno de los personajes en la partida.

Cada `Personaje` deberá realizar una `Tirada` de iniciativa al entrar en la partida para determinar su posición en la lista de turnos.

Como resultado de todas las `Tiradas` de iniciativa, se generará un `Orden de Iniciativa` que será utilizado para determinar el orden de turno de los personajes en la partida.

## Tirada de iniciativa

Cuando un `Personaje` entra en la partida, el jugador deberá realizar una `Tirada` de iniciativa para determinar el orden de turno de los personajes en la partida. El sistema colocará automáticamente al personaje en la lista de turnos según el resultado de la tirada.

En cualquier momento (sea o no su `Turno`), el jugador podrá volver a realizar la `Tirada` de iniciativa para su personaje y el sistema actualizará automáticamente la posición del personaje en la lista de turnos según el resultado de la nueva tirada.

## Actualización dinámica del orden de iniciativa

El `Orden de Iniciativa` es dinámico y podrá cambiar en cualquier momento durante el transcurso de la `Ronda` si un `Personaje` realiza una nueva `Tirada` de iniciativa. El sistema actualizará automáticamente la posición del `Personaje` en la lista de turnos según el resultado de la nueva tirada.

Por ejemplo, supongamos que tenemos los siguientes personajes. A raiz de sus `Tiradas` de iniciativa, el `Orden de Iniciativa` será el siguiente:

- **Personaje A**: _18_
- **Personaje B**: _15_
- **Personaje C**: _12_
- **Personaje D**: _10_

Durante el transcurso del `Turno` del `Personaje B`, el `Jugador` que controla al `Personaje D` realiza una nueva `Tirada` de iniciativa para su personaje y obtiene un resultado de _20_.

El sistema actualizará automáticamente el `Orden de Iniciativa` de la siguiente manera para la `Ronda` actual:

Personajes que ya han tenido su turno en la `Ronda` actual:

- **Personaje A**: _18_

Personajes que aún no han tenido su turno en la `Ronda` actual:

- **Personaje D**: _20_
- **Personaje B**: _15_
- **Personaje C**: _12_

Aunque el `Personaje D` ahora tiene un valor de iniciativa más alto que el `Personaje A`, este último ya ha tenido su turno en la `Ronda` actual. El `Personaje D` será el siguiente en tener su turno por tener el valor de iniciativa más alto entre los personajes que aún no han tenido su turno en la `Ronda` actual.

Para la siguiente `Ronda`, el `Orden de Iniciativa` será el siguiente:

- **Personaje D**: _20_
- **Personaje A**: _18_
- **Personaje B**: _15_
- **Personaje C**: _12_

En resumen, aunque un `Personaje` pueda cambiar su posición en el `Orden de Iniciativa` durante una `Ronda`, no afecta retroactivamente a los `Personajes` que ya han tenido su turno en la `Ronda` actual.

El `Orden de Iniciativa` se actualizará dinámicamente para la siguiente `Ronda`.
