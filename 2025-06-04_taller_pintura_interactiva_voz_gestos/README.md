# 🖌️ Taller 42- Pintura Interactiva: Voz y Gestos


### 📅 Fecha  

2025-06-04 – Fecha de asignación

2025-06-23 – Fecha de realización

2025-06-24 – Fecha de entrega


---

## 🎯 Objetivo del Taller

Crear una obra digital controlada por **voz** y **gestos**, permitiendo dibujar sin teclado ni mouse. El cuerpo y la voz se convierten en herramientas artísticas.

---

## 🛠️ Herramientas Utilizadas

- `Python`
- `MediaPipe` (detección de mano)
- `OpenCV` (visualización y dibujo)
- `speech_recognition` + `PyAudio` (voz)
- `NumPy`

---

## 🧠 Flujo de Trabajo

```plaintext
🎙️ Voz: Cambia color / limpia / guarda
🖐️ Gesto (índice): Controla el trazo del pincel
          ↓
     Dibujo en tiempo real
          ↓
   Exportación de imagen final
```


## 🖼️ Evidencias Visuales


### 🎬 Proceso de dibujo (GIF)
![GIF del proceso](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-06-04_taller_pintura_interactiva_voz_gestos/obras/0626.gif)



### 🖼️ Obra final exportada
![Obra final](./obras/obra_20250625_105447.png)


---



## 🔹 Fragmento de código relevante:

```python
# --- Webcam principal ---
cap = cv2.VideoCapture(0)
prev_x, prev_y = None, None

while True:
    ret, frame = cap.read()
    if not ret:
        break
    frame = cv2.flip(frame, 1)
    h, w, _ = frame.shape
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Detección de manos
    result = hands.process(rgb)
    if result.multi_hand_landmarks:
        for hand in result.multi_hand_landmarks:
            index_finger = hand.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
            x, y = int(index_finger.x * w), int(index_finger.y * h)

            # Dibujo continuo
            if prev_x is not None and prev_y is not None:
                cv2.line(canvas, (prev_x, prev_y), (x, y), color, 5)
            prev_x, prev_y = x, y

            # Dibujar la mano sobre el frame
            mp_drawing.draw_landmarks(frame, hand, mp_hands.HAND_CONNECTIONS)
    else:
        prev_x, prev_y = None, None

    # Fusionar lienzo y frame
    combo = cv2.addWeighted(frame, 0.5, canvas, 0.5, 0)

    # Mostrar color activo
    cv2.rectangle(combo, (10, 10), (60, 60), color, -1)
    cv2.putText(combo, "Presiona 'q' para salir", (70, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,0,0), 2)

    cv2.imshow("🎨 Pintura Interactiva", combo)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break
```


--- 


## 🧪 Cómo ejecutar

Abre terminal en la carpeta python

Ejecuta:

- python main.py
- Usa tu dedo índice y comandos de voz.
- Presiona "q" para salir.

---

## 📁 Estructura del proyecto

```
2025-06-25_taller_pintura_interactiva_voz_gestos/
├── python/
│   └── main.py
├── obras/
│   ├── resultado_final.png
│   └── ejemplo_proceso.gif
└── README.md
```


## 👥 Integrantes

- Sebastián Muñoz → jumunozle@unal.edu.co
- Carlos Camacho → cacamacho@unal.edu.co  
- Juan Daniel Ramírez → juaramriezmo@unal.edu.co
- Sergio David López → slopezpa@unal.edu.co 


---

## Reflexión 

Pintar con el cuerpo fue una experiencia nueva. Me sentí libre, como si pudiera expresarme sin barreras físicas. Coordinar la voz y el movimiento tomó algo de práctica, pero el resultado fue muy gratificante. Esta forma de interacción podría tener gran impacto en educación o accesibilidad.

