# Tabletop

Este proyecto tiene como objetivo crear una aplicación de tablero de juegos TTRPG (Tabletop Role-Playing Game) que permita a los jugadores crear y gestionar personajes, así como interactuar con otros jugadores en un entorno de juego de mesa.

Este tablero debe ser agnóstico al sistema de juego y solo proporcionará herramientas fundamentales para la gestión de personajes y la interacción entre jugadores en un entorno de tablero de cuadrícula.

## Características principales 

### Sistema de reglas abierto por diseño
La idea es que `los jugadores no necesiten definir cada atributo, característica o habilidad de sus personajes`. Por ejemplo:

- En vez de definir la distancia de movimiento del personaje, el tablero dejará mover al personaje a cualquier distancia, pedirá confirmar la acción indicando la distancia y el jugador decidirá si es válida o no según las reglas de su sistema de juego.

- En vez de definir la cantidad de daño que un personaje puede recibir, el tablero irá registrando el daño que recibe cada personaje. Será responsabilidad de los jugadores decidir si el daño recibido es válido o no según las reglas de su sistema de juego.

- En vez de limitar la cantidad de acciones que un personaje puede realizar en un turno, el tablero permitirá que los jugadores realicen cualquier cantidad de acciones. En todo momento podrán indicar que han terminado su turno.

Sin embargo la aplicación permitirá definir algunos parámetros tanto para los mapas como los personajes que permitan resolver más fácilmente las interacciones entre jugadores y el tablero (se describirán a continuación en cada sección)


### Histórico auditable de la partida
Cada modificación del estado de los personajes y del tablero quedará registrada durante la partida, permitiendo a los jugadores auditar el histórico de la partida y verificar que las acciones realizadas por los jugadores son válidas según las reglas de su sistema de juego.

## Usuario (User)
Un `Usuario` es una persona que ha accedido a la aplicación:

- Crear, consultar, modificar o eliminar `Personajes` que podrá controlar en la `Partida`.
- Crear, consultar, modificar o eliminar `Mapas` que podrán ser añadidos a una `Partida` (solo el `GM` podrá añadir mapas a la partida).
- Crear o unirse a una `Partida`. Esto lo convertirá en un `Jugador` respecto a esa `Partida`.

## Tiradas (Rolls)
Una tirada corresponde a un lanzamiento de dados que puede incluir modificadores y que se utiliza para determinar un valor numérico.

Las tiradas pueden ser utilizadas para determinar el éxito o fracaso de una acción, el daño recibido por un personaje, la iniciativa de un personaje, entre otros.

Una tirada debe poder seguir la fórmula **Σ(XᵢD Yᵢ) + ΣMⱼ**, donde:
- **Xᵢ** es la cantidad de dados del grupo i. Puede ser cualquier número entero positivo.
- **Yᵢ** número de caras de los dados del grupo i. Sólo los siguientes valores: **4**, **6**, **8**, **10**, **12**, **20** y **100**.
- **Σ** indica que se suman todos los grupos de dados definidos.
- **Mⱼ** es el modificador j que se sumará al resultado de la tirada. Puede ser cualquier número entero positivo o negativo.

Ejemplos de tirada válidos:
- **1D20 + 5**
- **2D6 + 3D8 - 2**
- **1D100 + 2D4 + 1D6 + 10 - 4**
- **2D6 + 1D8 + 3D10 + 5**

Ejemplos de tirada inválidos:
- **1D3 + 5** (el dado de 3 caras no es válido)
- **2D6 + 1D7 + 3D10 + 5** (el dado de 7 caras no es válido)
- **1D20 + 0.5** (el modificador no puede ser un número decimal)

## Partida (Game)
Una `Partida` es una sesión de juego donde varios `Jugadores` interactúan entre sí y con el tablero. Una `Partida` tiene un `GM` (Game Master) que es el jugador que creó la partida y tiene privilegios especiales para gestionar la partida.

Una partida tendrá:
- `Jugadores`: Un conjunto de `Jugadores` que participan en la partida y controlan uno o más `Personajes`.
- `GM`: Un `Jugador` que tiene privilegios especiales para gestionar la partida, como agregar o eliminar jugadores, personajes y mapas.
- `Personajes`: Un conjunto de `Personajes` que representan a los jugadores en la partida y que interactúan entre sí y con el tablero.
- `Mapa`: Un `Mapa` que representa el terreno de juego donde los `Personajes` y otros elementos del juego interactúan.
- `Orden de Iniciativa`: Lista de `Personajes` ordenados según su `Tirada` de iniciativa.
- `Turno de Personaje`: El `Personaje` que tiene el turno de realizar acciones y movimientos en la partida.

### Iniciativa (Initiative)
La iniciativa es un valor numérico que determina el orden de turno de los personajes en la partida. Cada `Personaje` deberá realizar una `Tirada` de iniciativa al entrar en la partida para determinar su posición en la lista de turnos. 

Como resultado de todas las `Tiradas` de iniciativa, se generará un `Orden de Iniciativa` que será utilizado para determinar el orden de turno de los personajes en la partida.

#### Tirada de iniciativa
Cuando un `Personaje` entra en la partida, el jugador deberá realizar una `Tirada` de iniciativa para determinar el orden de turno de los personajes en la partida. El sistema colocará automáticamente al personaje en la lista de turnos según el resultado de la tirada.

En cualquier momento (sea o no su `Turno`), el jugador podrá volver a realizar la `Tirada` de iniciativa para su personaje y el sistema actualizará automáticamente la posición del personaje en la lista de turnos según el resultado de la nueva tirada.

#### Actualización dinámica del orden de iniciativa
El `Orden de Iniciativa` es dinámico y podrá cambiar en cualquier momento durante el transcurso de la `Ronda` si un `Personaje` realiza una nueva `Tirada` de iniciativa. El sistema actualizará automáticamente la posición del `Personaje` en la lista de turnos según el resultado de la nueva tirada.

Por ejemplo, supongamos que tenemos los siguientes personajes. A raiz de sus `Tiradas` de iniciativa, el `Orden de Iniciativa` será el siguiente:
- **Personaje A**: 15
- **Personaje B**: 12
- **Personaje C**: 18
- **Personaje D**: 10

## Ronda (Round)
Una `Ronda` es un ciclo completo de turnos donde cada `Personaje` tiene la oportunidad de realizar acciones y movimientos. 

Una `Partida` tendrá tantas `Rondas` como sea necesario hasta que los `Jugadores` decidan finalizar la partida o se cumpla una condición de victoria o derrota definida por el `GM`.

## Jugador (Player)
Un `Jugador` representa a una persona que participa en la partida y controla uno o más `Personajes`.

- Toda `Partida` debe tener al menos un `Jugador`.
- El `Jugador` que cree la `Partida` será tratado como el Game Master (`GM`) y tendrá privilegios especiales para gestionar la partida, como agregar o eliminar jugadores, personajes y mapas.
- Un `Jugador` podrá controlar uno o más `Personajes` en la partida, pero cada `Personaje` solo podrá ser controlado por un `Jugador` a la vez.
- Un `Jugador` podrá abandonar la partida en cualquier momento. Si el `GM` abandona la partida, el sistema otorgará el rol de `GM` al siguiente `Jugador` en la lista de jugadores. Si no hay más jugadores, la partida finalizará automáticamente.
- Cuando un `Jugador` abandona la partida, todos los `Personajes` que controlaba serán eliminados de la partida. Si el `GM` abandona la partida, todos los `Personajes` que controlaba serán eliminados de la partida.
- Un `Jugador` podrá añadir o eliminar `Personajes` de la partida en cualquier momento bajo su propio control sin necesidad de la aprobación del `GM`.
- Un `Jugador` dentro de una partida podrá ver a todos los demás `Jugadores` y sus `Personajes`, pero no podrá ver los `Personajes` de otros `Jugadores` que no estén en la misma partida.

### Game master (GM)
- El `GM` podrá ceder el rol de `GM` a otro `Jugador` en cualquier momento.
- El `GM` podrá eliminar a cualquier `Jugador` de la partida en cualquier momento.
- El `GM` podrá eliminar a cualquier `Personaje` de la partida en cualquier momento.
- El `GM` podrá reemplazar el mapa actual de la partida por otro mapa en cualquier momento.

## Personaje (Character)
<!-- TODO: Complete definition -->

- `Nombre`: Nombre del personaje que él y otros jugadores podrán ver.
- `Avatar`: Imagen que se usará para el token del personaje en el tablero.
- `Tirada` de iniciativa: Se definirá como una tirada con los siguientes parámetros
  - Dados: **XD Y**, es decir, el jugador podrá configurar tantos dados de cualquier cara como le plazca, permitiendo combinaciones de dados de diferentes caras, por ejemplo: **2D6 + 1D8 + 3D10** (dos dados de seis caras, un dado de ocho caras y tres dados de diez caras).
  - Modificadores: el jugador podrá definir un modificador que se sumará al resultado de la tirada, por ejemplo: **+3** o **-2**.
- `Acciones`: los jugadores deberán definir las acciones que su personaje podrá realizar cuando le toque su turno.
- `Reacciones:` las reacciones corresponderán a acciones que el personaje podrá realizar fuera de su turno, por ejemplo: un ataque de oportunidad o una reacción a un hechizo.

### Movimiento
<!-- TODO: Complete definition -->

### Acciones (Actions)
Durante el transcurso del turno de un personaje, el jugador podrá realizar tantas acciones como desee. Las acciones representan las actividades que un personaje puede realizar durante su turno, como atacar, lanzar un hechizo, interactuar con objetos, entre otras.

- El jugador deberá definir al menos una acción para su personaje antes de comenzar la partida.
- El jugador podrá definir tantas acciones como desee para su personaje.
- El jugador podrá modificar o eliminar las acciones de su personaje en cualquier momento, incluso durante la partida.

Cada acción deberá tener los siguientes parámetros:

- `Nombre`: Nombre de la acción que el jugador y otros jugadores podrán ver.
- `Descripción`: Descripción de la acción que el jugador y otros jugadores podrán ver.
- `Objetivo`: El objetivo de la acción, que puede ser un personaje, un objeto o un área del mapa.
- `Tirada`: Tirada para determinar el éxito o fracaso de la acción, que puede incluir dados y modificadores.
- `Umbral de éxito (opcional)`: Valor mínimo que debe obtenerse en la tirada para que la acción tenga éxito.
- `Efecto`: Efecto de la acción, que puede incluir daño, curación, estado alterado, entre otros.

Cuando un jugador realice una acción, deberán ocurrir los siguientes pasos:

1. El jugador seleccionará la `Acción` que desea realizar por su `Nombre` y confirmará la acción.
2. El jugador seleccionará el `Objetivo` de la acción y confirmará la acción.
3. El sistema realizará la `Tirada` descrita según la acción.

Si la tirada `Umbral de éxito` está definida y el resultado de la tirada es menor al umbral:
4. El sistema notificará al jugador que la acción ha fallado y no se aplicará ningún efecto.

Si no hay `Umbral de éxito` definido o el resultado de la tirada es mayor o igual al umbral:
4. El sistema notificará del `Efecto` a los `Objetivos` afectados, pero no los aplicará automáticamente.
5. El sistema permitirá a los jugadores cuyos personajes hayan sido afectados por la acción realizar `Reacciones` si las tienen definidas, antes de aplicar el efecto de la acción.

Si un personaje afectado fracasa en su reacción:
6. El sistema aplicará el `Efecto` de la acción al `Objetivo`.

Si un personaje afectado tiene éxito en su reacción:
6. El sistema notificará al jugador que la acción ha sido contrarrestada y no se aplicará ningún efecto.

Llegado a este punto, el jugador cuyo personaje realizó la acción podrá decidir si desea realizar otra acción o finalizar su turno.

#### Tiradas de acción
Toda `Acción` deberá tener definida una `Tirada` (ver fórmula en la sección de `Tiradas`) que podrá ser usado para determinar el éxito o fracaso de la acción o compararlo con la `Tirada de reacción` de un personaje afectado por la acción.

#### Objetivo de acción
<!-- TODO: Complete definition -->

#### Efectos de acción
<!-- TODO: Complete definition -->

### Reacciones (Reactions)
<!-- TODO: Complete definition -->



<!-- TODO: Complete definition -->

## Turno (Turn)
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

### Cesión del turno
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

### Finalización del turno
El `Jugador` cuyo `Personaje` tiene el turno podrá finalizar su turno en cualquier momento, incluso si no ha realizado ninguna acción o movimiento. 

Una vez finalizado el turno, el sistema notificará al siguiente `Personaje` en la lista de turnos que es su turno y comenzará el siguiente turno

## Mapa (Map)
El `Mapa` es el espacio donde los `Personajes` y otros elementos del juego interactúan. El `Mapa` está compuesto por una cuadrícula de casillas que representan el terreno del juego.

Los mapas podrán ser diseñados fuera de una `Partida` y luego ser añadidos a una `Partida` por el `GM`. Los mapas podrán ser reutilizados en diferentes partidas.

### Diseño del mapa
Un `Mapa` podrá ser diseñado por cualquier `Usuario` fuera de una `Partida` y luego ser añadido a una `Partida` por el `GM`. 

El diseño del mapa incluirá
- `Nombre`: Nombre del mapa que el `GM` y los `Jugadores` podrán ver.
- `Cuadrícula`: Una cuadrícula de casillas que representará el terreno del juego.
- `Obstáculos`: Elementos del mapa que representarán obstáculos que los `Personajes` no podrán atravesar, como paredes, ríos, árboles, entre otros.
- `Imagen`: Imagen que se usará como fondo del mapa.

### Cuadrícula (Grid)
Una `Cuadrícula` es un conjunto de `Casillas` cuadradas que representan el terreno del juego. Al crear el `Mapa`, el `Usuario` deberá definir el tamaño de la cuadrícula, es decir, la cantidad de `Casillas` que tendrá el `Mapa` en cada dimensión:

- `Ancho`: Entero positivo que representa la cantidad de `Casillas` en la dimensión horizontal del `Mapa`.
- `Alto`: Entero positivo que representa la cantidad de `Casillas` en la dimensión vertical del `Mapa`.

Consideraciones de las `Cuadrículas`:

- Las `Cuadrículas` podrán ser de cualquier proporción rectangular.

### Casilla (Tile)
Una `Casilla` es un cuadrado de la `Cuadrícula` que representa una unidad de terreno del juego. Cada `Casilla` se define dentro de la `Cuadrícula` por sus coordenadas **(x, y)**, donde **x** es la posición horizontal y **y** es la posición vertical de la `Casilla` dentro de la `Cuadrícula`.

En una `Casilla` podrá ser ocupada por o bien un único `Personaje`, o bien un `Obstáculo`, pero no ambos al mismo tiempo.

### Obstáculo (Obstacle)
<!-- TODO: Complete definition -->

### Area (Area)
Un `Area` es un espacio del mapa cuyas casillas están delimitadas por un polígono. Cada `Area` puede tener un nombre y una descripción que los jugadores podrán ver.



