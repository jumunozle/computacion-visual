# 🧪 Taller - Interfaces Multimodales: Uniendo Voz y Gestos

## 📅 Fecha
2025-05-26 – Fecha de entrega
---

## 🎯 Objetivo del Taller

Explorar y construir una interfaz interactiva que combine reconocimiento de voz y detección de gestos para realizar acciones en tiempo real dentro de una escena visual. Se busca mejorar la naturalidad en la interacción humano-computadora mediante entradas multimodales.

---

## 🧠 Conceptos Aprendidos

- Detección de gestos de mano con MediaPipe.
- Reconocimiento de voz con SpeechRecognition.
- Procesamiento concurrente con hilos en Python.
- Coordinación de entradas multimodales.
- Visualización gráfica en tiempo real con Pygame.
- Sincronización entre canales de entrada.

---

## 🔧 Herramientas y Entornos

- **Lenguaje**: Python 3.x
- **Bibliotecas**:
  - `mediapipe`
  - `opencv-python`
  - `speech_recognition`
  - `pyaudio`
  - `pygame`
- **Entorno**: Local

---

## 📁 Estructura del Proyecto

```
2025-05-26_taller_interfaces_multimodales_voz_gestos/
├── python/
├── resultados      
├── README.md
```


---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. **Captura de entrada visual y de voz**: webcam para gestos y micrófono para comandos hablados.
2. **Procesamiento simultáneo** con `threading` para voz y cámara.
3. **Lógica multimodal condicional** que actúa solo si se cumplen combinaciones específicas de gesto + comando.
4. **Visualización reactiva** en `pygame`, con retroalimentación textual y gráfica.

### 🔹 Código relevante

```python
# Fragmento central del procesamiento multimodal
if estado_gesto["mano_abierta"]:
    if "cambiar" in ultimo_comando:
        color = (0, 0, 255)
    elif "rojo" in ultimo_comando:
        color = (255, 0, 0)
    elif "verde" in ultimo_comando:
        color = (0, 255, 0)

if estado_gesto["dos_dedos"]:
    if "mover" in ultimo_comando:
        x = (x + 5) % 800
    elif "ocultar" in ultimo_comando:
        mostrar = False
    elif "mostrar" in ultimo_comando:
        mostrar = True
```
```python
  # Detección simple basada en landmarks
 if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

                dedos_arriba = 0
                if hand_landmarks.landmark[8].y < hand_landmarks.landmark[6].y:
                    dedos_arriba += 1  # Índice
                if hand_landmarks.landmark[12].y < hand_landmarks.landmark[10].y:
                    dedos_arriba += 1  # Medio
                if hand_landmarks.landmark[16].y < hand_landmarks.landmark[14].y:
                    dedos_arriba += 1  # Anular
                if hand_landmarks.landmark[20].y < hand_landmarks.landmark[18].y:
                    dedos_arriba += 1  # Meñique
                if hand_landmarks.landmark[4].x < hand_landmarks.landmark[3].x:
                    dedos_arriba += 1  # Pulgar (posición relativa)

                estado_gesto["mano_abierta"] = dedos_arriba >= 4
                estado_gesto["dos_dedos"] = dedos_arriba == 2
```
---

## 📊 Resultados Visuales

### Resultados en HD en carpeta resultados

![interfaces_multimodales_resultado1](https://github.com/user-attachments/assets/6eac899a-7c3b-44a8-aac4-236ea4f7e5a2)
![interfaces_multimodales_resultado2](https://github.com/user-attachments/assets/30b03d89-a903-4061-92d1-5c9a165d6c33)
![interfaces_multimodales_resultado3](https://github.com/user-attachments/assets/3ffae73a-39f7-4c1a-ba2a-a95c1c12ec3d)
![interfaces_multimodales_resultado4](https://github.com/user-attachments/assets/8b094e35-c73e-4123-9bb1-b3667b46df4d)
![interfaces_multimodales_resultado5](https://github.com/user-attachments/assets/048b0cc3-c49f-46c1-a2ca-38bc0d34e66e)
![interfaces_multimodales_resultado6](https://github.com/user-attachments/assets/af2ea1a1-b7d8-4144-827d-c0afade8be8d)

---

## 🧭 Tabla de Combinaciones Multimodales

| Gesto Detectado        | Comando de Voz  | Acción Realizada                         |
|------------------------|-----------------|------------------------------------------|
| Mano abierta           | "cambiar"       | Cambia el color del círculo a azul       |
| Mano abierta           | "rojo"          | Cambia el color del círculo a rojo       |
| Mano abierta           | "verde"         | Cambia el color del círculo a verde      |
| Dos dedos extendidos   | "mover"         | Desplaza el círculo horizontalmente      |
| Dos dedos extendidos   | "ocultar"       | Oculta el círculo de la pantalla         |
| Dos dedos extendidos   | "mostrar"       | Vuelve a mostrar el círculo              |

📝 **Nota**:  
Las acciones solo se ejecutan cuando **coinciden simultáneamente** el gesto y el comando de voz.  
Por ejemplo, decir “rojo” sin la mano abierta no genera ningún cambio.

---

## 🧩 Prompts Usados

- ¿Cómo puedo detectar gestos de la mano en tiempo real usando MediaPipe y OpenCV en Python?
- ¿Qué necesito para capturar comandos de voz como “cambiar”, “rojo” o “mover” desde el micrófono en vivo?
- ¿Cómo puedo hacer que el sistema reconozca comandos hablados solo cuando también se detecta un gesto específico?
- ¿Puedes darme una tabla clara que relacione gestos + comandos de voz con las acciones que deben ejecutarse?

---

## 💬 Reflexión Final
Este taller permitió comprender en profundidad cómo se pueden coordinar múltiples entradas humanas (voz + gestos) para construir interfaces más naturales e intuitivas. Aprendí a detectar gestos con MediaPipe, reforce el manejar hilos en Python y realizar reconocimiento de voz con speech_recognition.
Lo más desafiante fue sincronizar correctamente los comandos y gestos sin generar conflictos o respuestas erróneas, especialmente debido a la latencia.

---

## 👥 Integrantes
Sebastián Muñoz → jumunozle@unal.edu.co

Carlos Camacho → cacamacho@unal.edu.co

Juan Daniel Ramírez → juaramriezmo@unal.edu.co

Cristian Medina → crmedinab@unal.edu.co

---

## 🤝 Contribuciones al Taller

- Integración de detección de gestos con MediaPipe.
- Reconocimiento de comandos de voz en español con SpeechRecognition.
- Diseño de lógica condicional multimodal (voz + gesto).
- Implementación de visualización interactiva en Pygame.
- Sincronización de entradas concurrentes usando `threading`.
- Documentación completa con estructura de proyecto y reflexión técnica.

---

## 🛠️ Criterios de evaluación


✅ Captura funcional de voz y gestos.

✅ Integración lógica clara entre ambas entradas.

✅ Acción visual combinada coherente y efectiva.

✅ Escena visual atractiva o informativa.

✅ Código limpio, modular y comentado.

✅ README completo con explicación, evidencias visuales (GIF) y prompts.

✅ Commits descriptivos en inglés.


