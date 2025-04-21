"Python 2D
Este proyecto genera una animación 2D de una figura (triángulo) que se transforma en el tiempo aplicando escala, rotación y traslación, utilizando matrices de transformación homogéneas. La animación se exporta como un archivo GIF utilizando la librería imageio.

Herramientas utilizadas
numpy: para manejo de matrices y vectores

matplotlib: para dibujar y guardar cada frame

imageio: para crear el GIF animado

Transformaciones aplicadas

Escalado proporcional

Rotación alrededor del origen

Traslación en el plano XY

Las transformaciones se aplican en el siguiente orden:
M = Traslación × Rotación × Escala

Cada punto de la figura se transforma usando matrices 3x3 en coordenadas homogéneas.

Resultado
Se genera un archivo llamado transformacion.gif que muestra la evolución continua de la figura a lo largo del tiempo.



React Three Fiber y Vite
Este proyecto crea una escena 3D interactiva usando React Three Fiber con Vite. Se implementa un cubo animado que:

Se traslada en una trayectoria circular usando Math.sin y Math.cos.

Rota sobre su propio eje en cada frame.

Se escala dinámicamente con una función senoidal basada en el tiempo (Math.sin(clock.elapsedTime)).

Usa OrbitControls para permitir al usuario navegar la escena con el mouse.

Además, el lienzo 3D ocupa toda la pantalla para que el objeto se mantenga visible en todo momento.



Processing 

(modo P3D) crea una figura geométrica tridimensional (un cubo) que se transforma dinámicamente en función del tiempo. Se aplican varias transformaciones utilizando las funciones translate(), rotate(), y scale(), junto con pushMatrix() y popMatrix() para aislar las transformaciones del cubo respecto al resto del entorno.

El cubo:

Gira continuamente sobre los ejes X, Y y Z.

Se traslada en una trayectoria ondulada mediante funciones seno que afectan su posición en los ejes X e Y.

Cambia de tamaño de forma cíclica usando una función sin() para escalarlo dinámicamente.

Además, se utiliza frameCount para obtener el tiempo transcurrido en fotogramas y generar animaciones suaves sincronizadas con el tiempo de ejecución del sketch.
"