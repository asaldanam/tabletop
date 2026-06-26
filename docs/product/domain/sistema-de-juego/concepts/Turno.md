# Turno (Turn)
<!-- TODO: Complete definition -->

Flujo de un turno:

1. El sistema notificará al jugador cuyo personaje tiene el turno que es su turno y le permitirá realizar acciones. Para el resto de jugadores, el personaje que tiene el turno será claramente identificado en el tablero y no podrán realizar acciones hasta que el turno de ese personaje finalice.

2. Durante el turno, el personaje podrá realizar tantas veces como desee y en cualquier orden:
  - Tantas `Acciones` como desee.
  - Tantos `Movimientos` como desee.

### Movimiento
Un `Personaje` podrá moverse a cualquier `Casilla` del `Mapa` contigua a su posición actual, siempre y cuando la `Casilla` no esté ocupada por otro `Personaje` o por un `Obstáculo`.

El `Jugador` podrá describir una ruta de movimiento para su `Personaje` que pase por varias `Casillas` siempre y cuando no incumpla la regla anterior. 

El `Jugador` deberá confirmar la ruta de movimiento antes de que el sistema consolide el movimiento del `Personaje`. El `Jugador` podrá cancelar la ruta