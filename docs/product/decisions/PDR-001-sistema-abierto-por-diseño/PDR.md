---
code: PDR-001
name: Sistema abierto por diseño
---

## 🎯 1. Contexto y Problema

La mayotía de los VTT (Virtual Tabletop) se pueden separar en dos tipos:

- Con sistemas de reglas complejos como **Roll20** y **Foundry VTT**, que permiten a los jugadores jugar a juegos de rol de mesa en línea con sistemas de juego específicos, pero requieren un setup complejo y son poco flexibles.

- Demasiado minimalistas, como **Owlbear Rodeo**, que ofrecen solo un tablero pero casi todo lo que sucede durante la partida sucede fuera de la aplicación, por tanto no hay una experiencia de juego completa ni un histórico de lo que sucede durante la partida.

## 📋 2. Opciones Evaluadas

No hubo una evaluación formal de opciones.

## 🚀 3. Decisión Tomada

La idea es que la aplicación sea **suficientemente flexible para permitir a los jugadores jugar a cualquier sistema de juego**, sin tener que preocuparse por la complejidad de la interfaz ni por las limitaciones de los sistemas de juego específicos.

Por ejemplo:

- En vez de definir la distancia de movimiento del personaje, el tablero dejará mover al personaje a cualquier distancia, pedirá confirmar la acción indicando la distancia y el jugador decidirá si es válida o no según las reglas de su sistema de juego.

- En vez de definir la cantidad de daño que un personaje puede recibir, el tablero irá registrando el daño que recibe cada personaje. Será responsabilidad de los jugadores decidir si el daño recibido es válido o no según las reglas de su sistema de juego.

- En vez de limitar la cantidad de acciones que un personaje puede realizar en un turno, el tablero permitirá que los jugadores realicen cualquier cantidad de acciones. En todo momento podrán indicar que han terminado su turno.

Se contemplarán aun así definir algunos parámetros, por ejemplo los relacionados con el tablero o algunos parámetros básicos de los personajes.
