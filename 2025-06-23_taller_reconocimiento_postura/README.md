# 🧪 Taller - Reconocimiento de Acciones Simples con Detección de Postura

📅 Fecha  
2025-06-23

---

## 🎯 Objetivo del Taller

Implementar un sistema que reconozca acciones humanas simples (como levantar brazos, sentarse o cruzar los brazos) usando la detección de postura corporal proporcionada por MediaPipe Pose. El propósito es explorar cómo los puntos clave del cuerpo (landmarks) pueden usarse para inferir comportamientos o gestos y visualizar estas acciones en tiempo real usando OpenCV.

---

## 🧠 Conceptos Aprendidos

- Transformaciones geométricas (coordenadas relativas del cuerpo)
- Detección de postura con MediaPipe Pose
- Comunicación por gestos (interpretación de poses)
- Visualización de acciones en pantalla
- Uso de condiciones lógicas para clasificación en tiempo real

---

## 🔧 Herramientas y Entornos

- **Python (Colab)**  
  Librerías: `mediapipe==0.10.9`, `opencv-python`, `numpy`

---
## 📁 Estructura del Proyecto

```
2025-06-23_reconocimiento_postura_mediapipe/
├── python/
├── resultados/
├── README.md
```

---

## 🧪 Implementación
### 🔹 Etapas realizadas
Captura de video desde webcam usando OpenCV.

Inicialización del modelo de pose con MediaPipe.

Extracción de landmarks clave (muñecas, caderas, rodillas, hombros).

Clasificación de acciones con reglas lógicas basadas en posiciones relativas.

Visualización en tiempo real con cv2.putText.

## 🔹 Código relevante
```python
if left_wrist_y < nose_y and right_wrist_y < nose_y:
    action = "¡Brazos arriba!"
elif left_hip_y > left_knee_y and right_hip_y > right_knee_y:
    action = "Persona sentada"
elif (
    abs(left_wrist_y - right_wrist_y) < 60 and
    abs(left_wrist_x - right_wrist_x) < 80 and
    shoulder_y < left_wrist_y < hip_y and
    shoulder_y < right_wrist_y < hip_y
):
    action = "Brazos cruzados"
```

---

## 📊 Resultados Visuales

![testbrazosarriba](https://github.com/user-attachments/assets/aa40f1df-56f1-4ca6-9cf7-2064297c4a8c)

![testsentado](https://github.com/user-attachments/assets/a0333eff-fa5a-4758-8e21-38998102e693)

![testbrazoscruzados](https://github.com/user-attachments/assets/5906e63f-3244-4d7d-bc7a-f91626bfc867)

---

## 🧩 Prompts Usados

"Implementar un sistema que detecte si una persona está sentada o con los brazos levantados usando MediaPipe Pose."

"Definir reglas condicionales para identificar la postura corporal a partir de los puntos clave del esqueleto."

"¿Cómo puedo visualizar en pantalla el nombre de la acción detectada en tiempo real con OpenCV?"

---

## 💬 Reflexión Final

Este taller me permitió reforzar el uso de MediaPipe para interpretar acciones humanas simples a partir de la postura corporal. Aprendí cómo trabajar con coordenadas relativas del cuerpo y cómo transformarlas en reglas lógicas que definen comportamientos reconocibles.

La acción más fácil de detectar fue “¡Brazos arriba!”, ya que su condición es muy clara (muñecas por encima de la nariz). La más sensible a errores fue “Brazos cruzados”, ya que puede generar falsos positivos si la persona junta las manos al centro sin cruzarlas realmente, el sistema también se confunde si hay movimiento o poses ambiguas.

---

## 👥 Contribuciones al Taller

Programé el detector de postura en MediaPipe.

Definí las condiciones lógicas para detectar acciones.

Implementé la visualización con OpenCV.

Realicé la documentación y pruebas locales en Colab.

---

## 👥 Integrantes
Sebastián Muñoz → jumunozle@unal.edu.co

Carlos Camacho → cacamacho@unal.edu.co

Juan Daniel Ramírez → juaramriezmo@unal.edu.co

Cristian Medina → crmedinab@unal.edu.co

---
 
## ✅ Checklist de entrega

✅ Captura de pose humana con landmarks funcionales.

✅ Al menos dos acciones correctamente reconocidas.

✅ Retroalimentación visual o sonora inmediata.

✅ Código organizado, comentado y reutilizable.

✅ README completo con explicación, evidencia visual (GIF) y prompts.

✅ Commits descriptivos en inglés.
