# Jugador (Player)

Un `Jugador` representa a una persona que participa en la partida y controla uno o más `Personajes`.

- Toda `Partida` debe tener al menos un `Jugador`.
- El `Jugador` que cree la `Partida` será tratado como el Game Master (`GM`) y tendrá privilegios especiales para gestionar la partida, como agregar o eliminar jugadores, personajes y mapas.
- Un `Jugador` podrá controlar uno o más `Personajes` en la partida, pero cada `Personaje` solo podrá ser controlado por un `Jugador` a la vez.
- Un `Jugador` podrá abandonar la partida en cualquier momento. Si el `GM` abandona la partida, el sistema otorgará el rol de `GM` al siguiente `Jugador` en la lista de jugadores. Si no hay más jugadores, la partida finalizará automáticamente.
- Cuando un `Jugador` abandona la partida, todos los `Personajes` que controlaba serán eliminados de la partida. Si el `GM` abandona la partida, todos los `Personajes` que controlaba serán eliminados de la partida.
- Un `Jugador` podrá añadir o eliminar `Personajes` de la partida en cualquier momento bajo su propio control sin necesidad de la aprobación del `GM`.
- Un `Jugador` dentro de una partida podrá ver a todos los demás `Jugadores` y sus `Personajes`, pero no podrá ver los `Personajes` de otros `Jugadores` que no estén en la misma partida.

## Game master (GM)

- El `GM` podrá ceder el rol de `GM` a otro `Jugador` en cualquier momento.
- El `GM` podrá eliminar a cualquier `Jugador` de la partida en cualquier momento.
- El `GM` podrá eliminar a cualquier `Personaje` de la partida en cualquier momento.
- El `GM` podrá reemplazar el mapa actual de la partida por otro mapa en cualquier momento.
