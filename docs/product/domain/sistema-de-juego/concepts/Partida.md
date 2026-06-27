# Partida (Game)

Una `Partida` es una sesión de juego donde varios `Jugadores` interactúan entre sí y con el tablero. Una `Partida` tiene un `GM` (Game Master) que es el jugador que creó la partida y tiene privilegios especiales para gestionar la partida.

Una partida tendrá:

- `Jugadores`: Un conjunto de `Jugadores` que participan en la partida y controlan uno o más `Personajes`.

- `GM`: Un `Jugador` que tiene privilegios especiales para gestionar la partida, como agregar o eliminar jugadores, personajes y mapas.

- `Personajes`: Un conjunto de `Personajes` que representan a los jugadores en la partida y que interactúan entre sí y con el tablero. Además, debe tener una relación `Personaje` con un `Jugador` que lo controla.

- `Mapa`: Un `Mapa` activo que representa el terreno de juego donde los `Personajes` y otros elementos del juego interactúan.

- `Orden de Iniciativa`: Lista de `Personajes` ordenados según su `Tirada` de iniciativa.

- `Turno de Personaje`: El `Personaje` que tiene el turno de realizar acciones y movimientos en la partida.
