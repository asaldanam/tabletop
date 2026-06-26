# Mapa (Map)
El `Mapa` es el espacio donde los `Personajes` y otros elementos del juego interactúan. El `Mapa` está compuesto por una cuadrícula de casillas que representan el terreno del juego.

Los mapas podrán ser diseñados fuera de una `Partida` y luego ser añadidos a una `Partida` por el `GM`. Los mapas podrán ser reutilizados en diferentes partidas.

## Diseño del mapa
Un `Mapa` podrá ser diseñado por cualquier `Usuario` fuera de una `Partida` y luego ser añadido a una `Partida` por el `GM`. 

El diseño del mapa incluirá
- `Nombre`: Nombre del mapa que el `GM` y los `Jugadores` podrán ver.
- `Cuadrícula`: Una cuadrícula de casillas que representará el terreno del juego.
- `Obstáculos`: Elementos del mapa que representarán obstáculos que los `Personajes` no podrán atravesar, como paredes, ríos, árboles, entre otros.
- `Imagen`: Imagen que se usará como fondo del mapa.

## Cuadrícula (Grid)
Una `Cuadrícula` es un conjunto de `Casillas` cuadradas que representan el terreno del juego. Al crear el `Mapa`, el `Usuario` deberá definir el tamaño de la cuadrícula, es decir, la cantidad de `Casillas` que tendrá el `Mapa` en cada dimensión:

- `Ancho`: Entero positivo que representa la cantidad de `Casillas` en la dimensión horizontal del `Mapa`.
- `Alto`: Entero positivo que representa la cantidad de `Casillas` en la dimensión vertical del `Mapa`.

Consideraciones de las `Cuadrículas`:

- Las `Cuadrículas` podrán ser de cualquier proporción rectangular.

## Casilla (Tile)
Una `Casilla` es un cuadrado de la `Cuadrícula` que representa una unidad de terreno del juego. Cada `Casilla` se define dentro de la `Cuadrícula` por sus coordenadas **(x, y)**, donde **x** es la posición horizontal y **y** es la posición vertical de la `Casilla` dentro de la `Cuadrícula`.

En una `Casilla` podrá ser ocupada por o bien un único `Personaje`, o bien un `Obstáculo`, pero no ambos al mismo tiempo.

## Obstáculo (Obstacle)
Un `Obstáculo` representa un elemento del mapa que impide que los `Personajes` puedan situarse en la `Casilla` que ocupa o moverse a través de ellos, como por ejemplo paredes, ríos, árboles, entre otros.

Los `Obstáculos` podrán ser definidos por cualquier `Usuario` fuera de una `Partida` durante el diseño del `Mapa`, después de haber definido el tamaño de la `Cuadrícula` y haber añadido una `Imagen` de fondo al `Mapa`.

## Area (Area)
Un `Area` es un espacio del mapa de varias casillas contiguas entre sí que puede ser utilizado para: 
- Representar zonas de efecto `Acciones` o `Reacciones` de los `Personajes`.

<!-- TODO: Definir tipos de área: radial, cónica, rectangular -->