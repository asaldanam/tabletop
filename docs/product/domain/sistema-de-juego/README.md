## Sistema de juego

El sistema de juego es un conjunto de reglas, mecánicas y elementos que definen cómo se desarrolla la experiencia de juego en el producto.

Este contexto cubre la aplicación de tablero de juegos TTRPG (Tabletop Role-Playing Game), que permite a los jugadores crear y gestionar personajes, así como interactuar con otros jugadores en un entorno de juego de mesa.

El tablero debe ser agnóstico al sistema de juego y solo proporcionará herramientas fundamentales para la gestión de personajes y la interacción entre jugadores en un entorno de tablero de cuadrícula.

## Sistema de reglas abierto por diseño

La idea es que `los jugadores no necesiten definir cada atributo, característica o habilidad de sus personajes`. Por ejemplo:

- En vez de definir la distancia de movimiento del personaje, el tablero dejará mover al personaje a cualquier distancia, pedirá confirmar la acción indicando la distancia y el jugador decidirá si es válida o no según las reglas de su sistema de juego.
- En vez de definir la cantidad de daño que un personaje puede recibir, el tablero irá registrando el daño que recibe cada personaje. Será responsabilidad de los jugadores decidir si el daño recibido es válido o no según las reglas de su sistema de juego.
- En vez de limitar la cantidad de acciones que un personaje puede realizar en un turno, el tablero permitirá que los jugadores realicen cualquier cantidad de acciones. En todo momento podrán indicar que han terminado su turno.

Sin embargo la aplicación permitirá definir algunos parámetros tanto para los mapas como los personajes que permitan resolver más fácilmente las interacciones entre jugadores y el tablero.

## Histórico auditable de la partida

Cada modificación del estado de los personajes y del tablero quedará registrada durante la partida, permitiendo a los jugadores auditar el histórico de la partida y verificar que las acciones realizadas por los jugadores son válidas según las reglas de su sistema de juego.
