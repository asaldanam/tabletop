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

## Área (Area)
Un `Área` es un espacio del mapa de varias casillas contiguas entre sí que puede ser utilizado para: 
- Representar zonas de efecto `Acciones` o `Reacciones` de los `Personajes`.

### Área radial (Radial Area)
Se trata de un `Área` que se define por un radio de casillas alrededor de una `Casilla` central. Todas las `Casillas` dentro del radio definido forman parte del `Área`.

Parámetros de un `Área radial`:
- `Diámetro`: Un número entero positivo e impar que representa la cantidad de casillas que forman el diámetro del `Área`.
- `Casilla central`: Casilla desde la que se extenderá el radio del `Área`. Esta casilla deberá estar dentro de la `Cuadrícula` del `Mapa`.

Ejemplo de un `Área radial` con un `Diámetro` de 7 casillas y una `Casilla central` en la posición (5, 5):

```
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ █ █ █ ░ ░ ░ ░
░ ░ ░ █ █ █ █ █ ░ ░ ░
░ ░ █ █ █ █ █ █ █ ░ ░
░ ░ █ █ █ █ █ █ █ ░ ░
░ ░ █ █ █ █ █ █ █ ░ ░
░ ░ ░ █ █ █ █ █ ░ ░ ░
░ ░ ░ ░ █ █ █ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
```

### Área rectangular (Rectangular Area)
Se trata de un `Área` que se define por una línea de casillas contiguas entre sí con una forma rectangular. La línea se extiende desde una `Casilla inicial` en una `Dirección` determinada y tiene un `Ancho` definido.

Parámetros de un `Área rectangular`:
- `Longitud`: Un número entero positivo que representa la cantidad de casillas que forman la línea del `Área`.
- `Ancho`: Un número entero positivo e impar que representa la cantidad de casillas que forman el ancho de la línea del `Área`.
- `Casilla inicial`: Casilla desde la que se extenderá la línea del `Área`. Esta casilla deberá estar dentro de la `Cuadrícula` del `Mapa`.
- `Dirección`: Dirección en la que se extenderá la línea del `Área` desde la `Casilla inicial`. Podrá haber 8 direcciones posibles: arriba, abajo, izquierda, derecha, diagonal superior izquierda, diagonal superior derecha, diagonal inferior izquierda y diagonal inferior derecha.

Ejemplo de un `Área rectangular` con una `Longitud` de 5 casillas, un `Ancho` de 3 casillas, una `Casilla inicial` en la posición (5, 5) y una `Dirección` hacia la derecha:

```
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ █ █ █ █ █ ░
░ ░ ░ ░ ░ █ █ █ █ █ ░
░ ░ ░ ░ ░ █ █ █ █ █ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
```

Ejemplo de un `Área rectangular` con una `Longitud` de 5 casillas, un `Ancho` de 3 casillas, una `Casilla inicial` en la posición (5, 5) y una `Dirección` hacia la diagonal superior derecha:

```
░ ░ ░ ░ ░ ░ ░ ░ █ ░ ░
░ ░ ░ ░ ░ ░ ░ █ █ █ ░
░ ░ ░ ░ ░ ░ █ █ █ █ █
░ ░ ░ ░ ░ █ █ █ █ █ ░
░ ░ ░ ░ █ █ █ █ █ ░ ░
░ ░ ░ ░ ░ █ █ █ ░ ░ ░
░ ░ ░ ░ ░ ░ █ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
```

### Área triangular (Triangle Area)
Se trata de un `Área` que se define por un ángulo de casillas contiguas entre sí con una forma triangular. El cono se extiende desde una `Casilla inicial` en una `Dirección` determinada y tiene un `Ángulo` definido.

Parámetros de un `Área triangular`:
- `Longitud`: Un número entero positivo que representa la cantidad de casillas que forman la línea del `Área`.
- `Dirección`: Dirección en la que se extenderá el cono del `Área` desde la `Casilla inicial`. Podrá haber 8 direcciones posibles: arriba, abajo, izquierda, derecha, diagonal superior izquierda, diagonal superior derecha, diagonal inferior izquierda y diagonal inferior derecha.
- `Casilla inicial`: Casilla desde la que se extenderá el cono del `Área`. Esta casilla deberá estar dentro de la `Cuadrícula` del `Mapa` y será el vértice del cono.

El ángulo será siempre de 90° y se definirá por la `Dirección` del `Área triangular`. Por ejemplo, si la `Dirección` es hacia arriba, el ángulo se abrirá hacia la izquierda y derecha de la `Casilla inicial`.

Ejemplo de un `Área triangular` con una `Longitud` de 5 casillas, una `Casilla inicial` en la posición (5, 5) y una `Dirección` hacia arriba:

```
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ █ █ █ █ █ █ █ █ █ ░
░ ░ █ █ █ █ █ █ █ ░ ░
░ ░ ░ █ █ █ █ █ ░ ░ ░
░ ░ ░ ░ █ █ █ ░ ░ ░ ░
░ ░ ░ ░ ░ █ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
```

Ejemplo de un `Área triangular` con una `Longitud` de 5 casillas, una `Casilla inicial` en la posición (5, 5) y una `Dirección` hacia la diagonal superior derecha:

```
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ █ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ █ █ ░ ░ ░ ░
░ ░ ░ ░ ░ █ █ █ ░ ░ ░
░ ░ ░ ░ ░ █ █ █ █ ░ ░
░ ░ ░ ░ ░ █ █ █ █ █ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░
```