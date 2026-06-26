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

### Convenciones algebraicas de las áreas
Las `Áreas` se calculan sobre coordenadas enteras `(x, y)`, donde `x` aumenta hacia la derecha e `y` aumenta hacia abajo. Para una `Casilla inicial` o `Casilla central` `(x0, y0)`, se define:
- `vx = x - x0`
- `vy = y - y0`

Las `Direcciones` se representan como vectores `(dx, dy)`:
- arriba: `(0, -1)`
- abajo: `(0, 1)`
- izquierda: `(-1, 0)`
- derecha: `(1, 0)`
- diagonal superior izquierda: `(-1, -1)`
- diagonal superior derecha: `(1, -1)`
- diagonal inferior izquierda: `(-1, 1)`
- diagonal inferior derecha: `(1, 1)`

Una casilla solo podrá formar parte de un `Área` si está dentro de los límites de la `Cuadrícula`.

### Área radial (Radial Area)
`Área` circular aproximada sobre la `Cuadrícula`, definida por un `Diámetro` impar y una `Casilla central`.

Para calcular las casillas del `Área radial`, se define:
- `radio = (Diámetro - 1) / 2`
- `distancia = sqrt(vx^2 + vy^2)`

Una casilla pertenecerá al `Área radial` si:
- `distancia <= radio + 0.5`

El margen de `0.5` produce la aproximación discreta del círculo sobre casillas.

Parámetros de un `Área radial`:
- `Diámetro`: Entero positivo e impar.
- `Casilla central`: Casilla `(x0, y0)` dentro de la `Cuadrícula`.

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
`Área` en forma de banda rellena, definida por una `Longitud`, un `Ancho`, una `Casilla inicial` y una `Dirección`.

Parámetros de un `Área rectangular`:
- `Longitud`: Entero positivo.
- `Ancho`: Entero positivo e impar.
- `Casilla inicial`: Casilla `(x0, y0)` dentro de la `Cuadrícula`.
- `Dirección`: Una de las 8 direcciones definidas.

Para calcular sus casillas, se define:
- `divisor = abs(dx) + abs(dy)`
- `nx = -dy`
- `ny = dx`
- `avance = (vx * dx + vy * dy) / divisor`
- `desplazamiento = (vx * nx + vy * ny) / divisor`
- `mitadAncho = (Ancho - 1) / 2`

Una casilla pertenecerá al `Área rectangular` si:
- `0 <= avance <= Longitud - 1`
- `-mitadAncho <= desplazamiento <= mitadAncho`

En direcciones diagonales, esta fórmula genera una banda diagonal rellena.

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
`Área` en forma de cono de 90°, definida por una `Longitud`, una `Casilla inicial` y una `Dirección`. La `Casilla inicial` es el vértice del cono.

Parámetros de un `Área triangular`:
- `Longitud`: Entero positivo.
- `Casilla inicial`: Casilla `(x0, y0)` dentro de la `Cuadrícula`.
- `Dirección`: Una de las 8 direcciones definidas.

En direcciones cardinales, el cono se abre a ambos lados de la dirección. En direcciones diagonales, queda delimitado por las dos direcciones cardinales adyacentes; por ejemplo, diagonal superior derecha abre entre arriba y derecha.

Para calcular las casillas del `Área triangular` en una dirección cardinal, se define:
- `nx = -dy`
- `ny = dx`
- `avance = vx * dx + vy * dy`
- `desplazamiento = vx * nx + vy * ny`

Una casilla pertenecerá al `Área triangular` cardinal si:
- `0 <= avance <= Longitud - 1`
- `abs(desplazamiento) <= avance`

Para calcular las casillas del `Área triangular` en una dirección diagonal, se usan las dos direcciones cardinales adyacentes que delimitan el cono. Como en una dirección diagonal `dx` y `dy` nunca son 0, se define:
- `avanceHorizontal = vx * dx`
- `avanceVertical = vy * dy`

Una casilla pertenecerá al `Área triangular` diagonal si:
- `avanceHorizontal >= 0`
- `avanceVertical >= 0`
- `avanceHorizontal + avanceVertical <= Longitud - 1`

Por ejemplo, para una `Dirección` hacia la diagonal superior derecha, una casilla `(x, y)` pertenece al área si:
- `x - x0 >= 0`
- `y0 - y >= 0`
- `(x - x0) + (y0 - y) <= Longitud - 1`

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
