# 🧪 Taller

**Taller segmentacion formas**

## 📅 Fecha
2025-05-05 

---

## 🎯 Objetivo del Taller

Explorar técnicas básicas de segmentación binaria con OpenCV y analizar formas detectadas en una imagen mediante contornos, centros de masa y bounding boxes. Además, calcular métricas como área y perímetro promedio.

---

## 🧠 Conceptos Aprendidos

Carga y visualización de imágenes en escala de grises.

Segmentación por umbral fijo y umbral adaptativo.

Detección de contornos con cv2.findContours().

Cálculo de momentos y centroide con cv2.moments().

Dibujo de contornos, centros y cajas delimitadoras.

Cálculo de métricas geométricas (área, perímetro).
---

## 🔧 Herramientas y Entornos

Python (Colab o Jupyter Notebook)

OpenCV

NumPy

Matplotlib
---

## 📁 Estructura del Proyecto

```
2025-05-05_taller_segmentacion_formas/
├── python/  
├── resultados/  
├── README.md

```


---

## 🧪 Implementación Threejs

### 🔹 Etapas realizadas
Carga de imagen en escala de grises.

Aplicación de umbral fijo y umbral adaptativo.

Detección y dibujo de contornos.

Cálculo de centros de masa y bounding boxes.

Cálculo de métricas de formas detectadas.

Visualización de resultados con Matplotlib.
### 🔹 Código relevante

```python
# Dibujar contornos, centros de masa y bounding boxes
for cnt in contours:
    cv2.drawContours(img_contours, [cnt], -1, (0,255,0), 2)
    M = cv2.moments(cnt)
    if M['m00'] != 0:
        cx = int(M['m10']/M['m00'])
        cy = int(M['m01']/M['m00'])
        cv2.circle(img_contours, (cx, cy), 5, (0,0,255), -1)
    x, y, w, h = cv2.boundingRect(cnt)
    cv2.rectangle(img_contours, (x, y), (x+w, y+h), (255,0,0), 2)
```

---

## 📊 Resultados Visuales

![segmentacion_formas_munoz](https://github.com/user-attachments/assets/f649ce24-e778-4b54-aac1-de7898acd6fe)
https://colab.research.google.com/drive/1S6VLN0lnvKT-27qh--2O8cNb2vdT152f?usp=sharing

---

## 🧩 Prompts Usados

```text
"Cargar imagen en escala de grises y aplicar umbral fijo y adaptativo con OpenCV"
"Detectar contornos y calcular centros de masa"
"Cómo dibujar bounding boxes y calcular área y perímetro en Python"
```

---
## 💬 Reflexión Final

Este taller permitió reforzar el uso práctico de OpenCV para segmentación y análisis de formas básicas. Fue interesante observar cómo distintos métodos de umbralado afectan los resultados de la detección de contornos. Además, el uso de momentos para encontrar el centro de masa dio un enfoque más analítico al problema.
La parte más compleja fue ajustar correctamente los parámetros del umbral adaptativo para obtener segmentaciones limpias. En futuros proyectos, se podría mejorar este análisis combinándolo con aprendizaje automático o redes neuronales para segmentaciones más robustas.
---
## ✅ Checklist de Entrega

- [x] Carpeta `2025-05-05_taller_segmentacion_formas`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo 
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés
---
