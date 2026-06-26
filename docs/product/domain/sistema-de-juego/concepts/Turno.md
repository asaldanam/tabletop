# Turno (Turn)
<!-- TODO: Complete definition -->

Flujo de un turno:

1. El sistema notificará al jugador cuyo personaje tiene el turno que es su turno y le permitirá realizar acciones. Para el resto de jugadores, el personaje que tiene el turno será claramente identificado en el tablero y no podrán realizar acciones hasta que el turno de ese personaje finalice.

2. Durante el turno, el personaje podrá realizar tantas veces como desee y en cualquier orden:
  - Tantas `Acciones` como desee.
  - Tantos `Movimientos` como desee.

## Movimiento
Un `Personaje` podrá moverse a cualquier `Casilla` del `Mapa` contigua a su posición actual, siempre y cuando la `Casilla` no esté ocupada por otro `Personaje` o por un `Obstáculo`.

El `Jugador` podrá describir una ruta de movimiento para su `Personaje` que pase por varias `Casillas` siempre y cuando no incumpla la regla anterior. 

El `Jugador` deberá confirmar la ruta de movimiento antes de que el sistema consolide el movimiento del `Personaje`. El `Jugador` podrá cancelar la ruta

## Cesión del turno
Durante su turno, el jugador también podra ceder el turno de su `Personaje` a otro `Personaje` del tablero, aunque no sea controlado por el mismo jugador.

Este turno cedido no afecta al orden de iniciativa. Es decir, el personaje que cedió el turno podrá volver a tener su turno cuando le toque según el orden de iniciativa.

Ejemplo, dada una `Ronda` con los siguientes `Personajes` y orden de iniciativa:
1. Personaje A
2. Personaje B
3. Personaje C

Si el `Personaje A` cede su turno al `Personaje C`, el orden de iniciativa de la `Ronda` será:
1. Personaje A inicia turno propio
2. Personaje A cede turno a Personaje C
3. Personaje C finaliza el turno cedido
4. Personaje B inicia y finaliza su turno propio
5. Personaje C inicia y finaliza su turno propio

## Finalización del turno
El `Jugador` cuyo `Personaje` tiene el turno podrá finalizar su turno en cualquier momento, incluso si no ha realizado ninguna acción o movimiento.

Una vez finalizado el turno, el sistema notificará al siguiente `Personaje` en la lista de turnos que es su turno y comenzará el siguiente turno.
