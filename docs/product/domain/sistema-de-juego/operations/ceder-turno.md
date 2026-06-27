# Ceder turno

Durante su turno, el jugador también podra ceder el turno de su `Personaje` a otro `Personaje` del tablero, aunque no sea controlado por el mismo jugador.

1. El jugador seleccionará el `Personaje` al que desea ceder el turno y confirmará la acción.
2. El sistema notificará al jugador cuyo `Personaje` ha recibido el turno que es su turno. El turno del `Personaje` que cedió el turno finalizará automáticamente y no podrá realizar más acciones hasta que le toque su turno nuevamente.
3. El jugador cuyo `Personaje` ha recibido el turno podrá realizar acciones y movimientos como si fuera su propio turno.

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
