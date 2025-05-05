# 🧪 Analisis de figuras geometricas

## 📅 Fecha  
2025-05-05

---

## 🎯 Objetivo del Taller

Aplicar técnicas de procesamiento de imágenes en Python usando OpenCV para detectar contornos de figuras en una imagen binarizada mediante el detector de bordes Canny, calcular métricas geométricas básicas de cada figura (área, perímetro y centroide) y visualizar los resultados con etiquetas en la imagen.

---

## 🧠 Conceptos Aprendidos

- Conversión de imágenes a escala de grises.
- Detección de bordes usando el algoritmo Canny.
- Detección de contornos con `cv2.findContours`.
- Cálculo de área y perímetro de contornos.
- Cálculo del centroide utilizando momentos.
- Visualización de contornos y anotaciones sobre la imagen.
- Uso de Matplotlib para mostrar imágenes procesadas.

---

## 🔧 Herramientas y Entornos

- 🐍 Python (Jupyter Notebook / Google Colab)  
- 📦 Librerías: `opencv-python`, `numpy`, `matplotlib`

---

## 📁 Estructura del Proyecto
```
2025-05-05_taller_analisis_figuras_geometricas/
├── python/
├── resultados/ 
├── README.md
```
---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. Cargar la imagen original a color.
2. Convertirla a escala de grises.
3. Aplicar detección de bordes con Canny.
4. Encontrar los contornos.
5. Calcular métricas geométricas por figura.
6. Dibujar los contornos y etiquetar con un ID.
7. Imprimir métricas por consola.
8. Visualizar la imagen procesada con Matplotlib.

### 🔹 Código relevante

```python
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Cargar imagen
image = cv2.imread('image.png')

# Escala de grises y Canny
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
edged = cv2.Canny(gray, 30, 200)

# Encontrar contornos
contours, _ = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
output = image.copy()

# Procesar cada figura
for i, cnt in enumerate(contours):
    area = cv2.contourArea(cnt)
    if area < 50:
        continue
    perimeter = cv2.arcLength(cnt, True)
    M = cv2.moments(cnt)
    cx = int(M["m10"] / M["m00"]) if M["m00"] != 0 else 0
    cy = int(M["m01"] / M["m00"]) if M["m00"] != 0 else 0
    cv2.drawContours(output, [cnt], -1, (0, 255, 0), 2)
    cv2.putText(output, f"ID:{i+1}", (cx - 10, cy), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)
    print(f"Figura {i+1}: Área = {area:.2f}, Perímetro = {perimeter:.2f}, Centroide = ({cx}, {cy})")

```

---

## 📊 Resultados Visuales

![analisis_figuras_geometrias_munoz](https://github.com/user-attachments/assets/fbf897a1-1e05-4d51-b25c-a760a86f2099)

---

## 🧩 Prompts Usados

``text
"Detectar contornos usando OpenCV y etiquetar cada figura con su ID."

"Calcular área, perímetro y centroide de cada figura usando momentos y funciones de OpenCV."

"Adaptar detección de contornos con Canny en lugar de umbralado."
``

---

## 💬 Reflexión Final

Este taller me permitió consolidar conocimientos sobre el procesamiento básico de imágenes con OpenCV, particularmente en la detección de contornos y análisis geométrico. Fue muy útil comprender cómo convertir imágenes, detectar bordes y aplicar análisis con momentos para obtener centroides.

Lo más interesante fue ver cómo cada figura puede ser identificada, medida y etiquetada automáticamente. Para futuros proyectos, me gustaría aplicar segmentación más avanzada para separar objetos que estén tocándose o usar técnicas como watershed para mejorar la separación de contornos complejos.
---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-05-05_taller_analisis_figuras_geometricas`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---
