# 🧪 Taller 13- Gestos con Cámara Web: Control Visual con MediaPipe

📅 Fecha  

2025-05-12 – Fecha de asignación

2025-05-26 – Fecha de entrega

----------

## 🎯 Objetivo del Taller

Explorar el uso de interfaces naturales mediante la detección de gestos de mano con MediaPipe y OpenCV. El objetivo fue crear una visualización interactiva en tiempo real, controlada solo con las manos frente a la cámara, sin necesidad de periféricos adicionales.

----------

## 🧠 Conceptos Aprendidos

-   Procesamiento en tiempo real de video desde la webcam.
    
-   Uso del modelo MediaPipe Hands para detección de manos y dedos.
    
-   Lógica de interpretación de gestos mediante landmarks (dedos extendidos, distancia entre dedos).
    
-   Interacción visual dinámica con OpenCV basada en gestos.
    
-   Diseño de interfaces interactivas controladas por visión por computador.
    

----------

## 🔧 Herramientas y Entornos

-   **Python 3**
    
-   Librerías:
    
    -   `opencv-python`
        
    -   `mediapipe`
        
    -   `numpy`
        

📌 Todas las librerías fueron instaladas mediante `pip`.

----------

## 📁 Estructura del Proyecto


```
`2025-05-25_taller_gestos_webcam_mediapipe/
├── python/
│   └── main.py
│   └── fondo_color.gif
│   └── mover_objeto.mp4
├── README.md` 
```
----------

## 🧪 Implementación

### 🔹 Etapas realizadas


1.  **Activación de cámara y captura de video**
    
    -   Se utilizó OpenCV para acceder a la webcam y procesar cada frame en tiempo real.
        
2.  **Detección de manos con MediaPipe**
    
    -   Se implementó el modelo `Hands` de MediaPipe, que detecta hasta 2 manos con 21 puntos de referencia (landmarks) por mano.
        
3.  **Interpretación de gestos**
    
    -   Se definieron condiciones específicas como:
        
        -   Número de dedos extendidos.
            
        -   Distancia entre el pulgar e índice.
            
        -   Detección de palma abierta.
            
    -   Estas condiciones fueron traducidas en acciones visuales.
        
4.  **Acciones visuales interactivas**
    
    -   **Cambiar color de fondo:** Según el número de dedos extendidos.
        
    -   **Mover un objeto (círculo):** El objeto se mueve siguiendo la punta del dedo índice.
        
    -   **Cambiar de escena:** Una nueva "escena" se muestra al detectar una palma completamente abierta.
        
5.  **Bonus: Mini escena interactiva**
    
    -   Se diseñó una escena donde un círculo es controlado únicamente con el dedo índice, a modo de "puntero".
        

----------

### 🔹 Código relevante

### Función para contar dedos levantados (pulgar + 4 dedos)

```python
def  count_fingers(hand_landmarks):

fingers = []

# Pulgar: compara x del dedo 4 con el 3 (especial porque está de lado)

if hand_landmarks.landmark[4].x < hand_landmarks.landmark[3].x:

fingers.append(1)

else:

fingers.append(0)

  

# Otros dedos: compara y del tip con la articulación previa

for tip_id in [8, 12, 16, 20]:

if hand_landmarks.landmark[tip_id].y < hand_landmarks.landmark[tip_id - 2].y:

fingers.append(1)

else:

fingers.append(0)

  

return  sum(fingers)
```

### Escena 2: Fondo cambia según cantidad de dedos levantados

```python
if  scene_id == 2:
	finger_count = 0

if  results.multi_hand_landmarks:
	hand = results.multi_hand_landmarks[0]
	finger_count = count_fingers(hand)

  

# Colores según número de dedos
colores = {
	0: (50, 50, 50),
	1: (0, 0, 255),
	2: (0, 128, 255),
	3: (0, 255, 255),
	4: (0, 255, 0),
	5: (255, 255, 255)
}

color_fondo = colores.get(finger_count, (30, 30, 30))

frame[:] = color_fondo

  

if  results.multi_hand_landmarks:

hand = results.multi_hand_landmarks[0]

mp_drawing.draw_landmarks(frame, hand, mp_hands.HAND_CONNECTIONS)

  

# Texto informativo

cv2.putText(frame, "Escena 1: Fondo cambia por dedos", (30, 100),

cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 0), 2)

cv2.putText(frame, f"Dedos extendidos: {finger_count}", (30, 150),

cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 0), 2)
```


###   Escena 4: Detectar distancia entre índice y pulgar
```python
elif  scene_id == 4:

frame[:] = (30, 30, 30)

cv2.putText(frame, "Escena 3: Acerca indice y pulgar", (20, 100),

cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)

  

if  results.multi_hand_landmarks:

hand = results.multi_hand_landmarks[0]

mp_drawing.draw_landmarks(frame, hand, mp_hands.HAND_CONNECTIONS)

thumb_tip = hand.landmark[4]

index_tip = hand.landmark[8]

dist = np.linalg.norm(

np.array([thumb_tip.x, thumb_tip.y]) -  np.array([index_tip.x, index_tip.y])

) *  width

  

# Si están cerca, cambia el fondo y muestra mensaje

if  dist < 40:

frame[:] = (255, 0, 255)

cv2.putText(frame, "Bien hecho!", (30, 140),

cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)
```



### Escena 5: Juego de atrapar el cuadrado con el dedo

```python
 
# Escena 5: Juego de atrapar el cuadrado con el dedo

elif  scene_id == 5:

if  'score'  not  in  globals():

score = 0

target_pos = (np.random.randint(100, width - 100), np.random.randint(100, height - 100))

  

frame[:] = (20, 20, 50)

cv2.putText(frame, "Escena 4: Atrapa el cuadrado con el dedo", (30, 80),

cv2.FONT_HERSHEY_SIMPLEX, 0.9, (200, 200, 200), 2)

cv2.putText(frame, f"Puntaje: {score}", (30, 130),

cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)

  

# Dibujar cuadrado objetivo

cx, cy = target_pos

cv2.rectangle(frame, (cx - 25, cy - 25), (cx + 25, cy + 25), (0, 255, 0), -1)

  

if  results.multi_hand_landmarks:

hand = results.multi_hand_landmarks[0]

mp_drawing.draw_landmarks(frame, hand, mp_hands.HAND_CONNECTIONS)

  

# Posición del índice

ix = int(hand.landmark[8].x * width)

iy = int(hand.landmark[8].y * height)

cv2.circle(frame, (ix, iy), 10, (255, 0, 0), -1)

  

# Detecta si toca el cuadrado

if  cx - 25 < ix < cx + 25  and  cy - 25 < iy < cy + 25:

score += 1

target_pos = (np.random.randint(100, width - 100), np.random.randint(100, height - 100))

  

# Botón para volver al menú

cv2.rectangle(frame, (10, 10), (90, 60), (0, 0, 0), -1)

cv2.putText(frame, "<-", (20, 45), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 255, 255), 3)

  

# Si el dedo está en el botón, volver al menú y reiniciar score

if  results.multi_hand_landmarks:

hand = results.multi_hand_landmarks[0]

ix = int(hand.landmark[8].x * width)

iy = int(hand.landmark[8].y * height)

if  is_finger_on_button(ix, iy):

scene_id = 1

del  score
del  target_pos

```
----------

## 📊 Resultados Visuales

### 🎨 Cambio de color con número de dedos:

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-05-12_taller_gestos_webcam_mediapipe/python/GifEscena1.gif?raw=true)

----------

### 🖱️ Movimiento de objeto con dedo índice:

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-05-12_taller_gestos_webcam_mediapipe/python/GifEscena2.gif?raw=true)

----------

### 🔄 Detectar distancia entre dedos:

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-05-12_taller_gestos_webcam_mediapipe/python/GifEscena3.gif?raw=true)

----------

### 🔄 Bonus: Minijuego:

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-05-12_taller_gestos_webcam_mediapipe/python/GifEscena4.gif?raw=true)



### Completo:

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-05-12_taller_gestos_webcam_mediapipe/python/GifCompleto.gif?raw=true)

----------

## 🧩 Prompts Usados

-   "Cómo detectar cuántos dedos están extendidos con MediaPipe?"

-   "Cómo calcular distancia entre pulgar e índice con OpenCV?"

-   "Ideas de interacciones visuales simples con gestos"

-   Refactoriza este código: "" y mejora los comentarios.

- Mejora la redacción de este párrafo: 
----------

## 💬 Reflexión Final

Este taller fue una excelente introducción al control visual por gestos. Aprendí a trabajar con la biblioteca MediaPipe y a interpretar los landmarks de forma útil y práctica. Fue interesante ver cómo, con solo la webcam, es posible implementar interfaces intuitivas y sin contacto.

Me llamó la atención lo preciso que puede ser MediaPipe en condiciones de buena iluminación, pero también noté que puede haber falsos positivos con múltiples manos o fondos complejos. Para mejorar el sistema, podría implementarse una lógica de historial de gestos para filtrar eventos erróneos o usar redes neuronales para gestos personalizados.

----------


## 👥 Integrantes

- Sebastián Muñoz → jumunozle@unal.edu.co
- Carlos Camacho → cacamacho@unal.edu.co  
- Juan Daniel Ramírez → juaramriezmo@unal.edu.co
- Cristian Medina → crmedinab@unal.edu.co 

## 👥 Contribuciones Grupales

-   **Implementación base del sistema de detección con MediaPipe Hands**
    
    -   Activación de la cámara con OpenCV y lectura en tiempo real.
        
    -   Integración de la solución `mp.solutions.hands` para el seguimiento de manos.
        
-   **Lógica de interpretación de gestos personalizados**
    
    -   Cálculo del número de dedos extendidos mediante comparación de posiciones `landmark`.
        
    -   Detección de gestos específicos como:
        
        -   Palma abierta (cambiar color de fondo).
            
        -   Pulgar e índice juntos (activar modo "cambiar escena").
            
        -   Cierre de puño (reiniciar o mover elemento a posición inicial).
            
-   **Desarrollo de acciones visuales interactivas**
    
    -   Visualización del cambio de color del fondo según el gesto detectado.
        
    -   Movimiento de un círculo en pantalla con la posición de la palma.
        
    -   Renderizado de una "escena alternativa" al hacer pinza con los dedos.
        
-   **Registro visual del funcionamiento del sistema**
    
    -   Grabación de GIFs en tiempo real desde Python (`imageio`, `cv2.VideoWriter`, etc.).
        
    -   Documentación visual de ejemplos de cada gesto.
        
-   **Estructuración de carpetas y documentación**
    
    -   Organización del código en `python/`.
        
    -   Elaboración del archivo `README.md` con:
        
        -   Explicación técnica de MediaPipe y los gestos programados.
            
        -   Capturas GIF y enlaces de evidencia visual.
            
        -   Reflexión sobre precisión, errores y mejoras posibles.

----------

## ✅ Checklist de Entrega

-   Carpeta `2025-05-25_taller_gestos_webcam_mediapipe/`
    
-   Código funcional con detección y lógica de gestos
    
-   Visualización interactiva clara (color, movimiento, escena)
    
-   GIFs demostrativos incluidos
    
-   README completo con explicación, prompts y reflexión
    
-   Commits descriptivos en inglés
