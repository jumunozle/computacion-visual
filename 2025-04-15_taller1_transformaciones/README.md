Python

Se genera una animación 2D de una figura (triángulo) que se transforma en el tiempo aplicando escala, rotación y traslación, utilizando matrices de transformación homogéneas. La animación se exporta como un archivo GIF utilizando la librería imageio.

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

![transformacion](https://github.com/user-attachments/assets/96f12f06-c28d-443f-9a58-57eb229b6902)

React Three Fiber y Vite


Se implemento un cubo animado que:

Se traslada en una trayectoria circular usando Math.sin y Math.cos, y rota sobre su propio eje en cada frame.

Se escala dinámicamente con una función senoidal basada en el tiempo (Math.sin(clock.elapsedTime)), se aplicaron OrbitControls para permitir al usuario navegar la escena con el mouse.


![Untitled ‑ Made with FlexClip](https://github.com/user-attachments/assets/bf09d34a-542a-416d-a6e5-5cad69d633e2)



Processing 

Se implemento un cubo que se transforma dinámicamente en función del tiempo, se aplican varias transformaciones utilizando las funciones translate(), rotate(), y scale(), junto con pushMatrix() y popMatrix() para aislar las transformaciones del cubo respecto al resto del entorno.

El cubo:
-Gira continuamente sobre los ejes X, Y y Z.
-Se traslada en una trayectoria ondulada mediante funciones seno que afectan su posición en los ejes X e Y.
-Cambia de tamaño de forma cíclica usando una función sin() para escalarlo dinámicamente.


![Untitled ‑ Made with FlexClip (1)](https://github.com/user-attachments/assets/605d55ca-1310-47be-aa80-33c7a8590bdd)


