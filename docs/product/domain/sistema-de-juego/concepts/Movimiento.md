## Movimiento

El `Movimiento` representa la distancia que un personaje recorre en el `Mapa` durante su `Turno`.

Cada `Casilla` del `Mapa` recorrida de forma diagonal u horizontal representa una unidad de `Distancia` equivalente a **1.5 metros** en el sistema métrico decimal o **5 pies** en el sistema imperial.

En caso de ser recorrida de forma diagonal, las casillas pares tienen el mismo coste que las casillas horizontales, mientras que las casillas impares cuestan **el doble**

Por ejemplo, dado un `Mapa` con una `Cuadrícula` de 3x3 casillas, un `Personaje` que se encuentre en la casilla (1, 1) y se mueva a la casilla (3, 3) recorrerá las siguientes casillas:

```
(1, 1) -> (2, 2) -> (3, 3)
```

Esto implica que se recorrerán 2 casillas, pero la casilla (2, 2) es una casilla diagonal impar, por lo que el `Personaje` se habrá desplzado **4,5 metros** o **15 pies**.
