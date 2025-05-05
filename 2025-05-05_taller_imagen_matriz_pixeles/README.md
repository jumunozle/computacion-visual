# 🧪 Taller de Procesamiento de Imágenes con OpenCV y NumPy

## 📅 Fecha  
2025-05-05

---

## 🎯 Objetivo del Taller

Explorar técnicas básicas de procesamiento de imágenes digitales utilizando Python y OpenCV: carga de imágenes, manipulación de regiones, visualización de canales, ajuste de brillo/contraste y análisis de histogramas.

---

## 🧠 Conceptos Aprendidos

- Lectura y visualización de imágenes en OpenCV.
- Separación y análisis de canales de color (RGB, HSV).
- Modificación de regiones específicas de una imagen con slicing.
- Cálculo de histogramas con `cv2.calcHist()` y `plt.hist()`.
- Ajuste manual y automático de brillo y contraste.

---

## 🔧 Herramientas y Entornos

- 💻 Python (Google Colab)
- 📦 Librerías: `opencv-python`, `numpy`, `matplotlib`

---

## 📁 Estructura del Proyecto
2025-05-05_taller_opencv/
├── colab/ # Notebook ejecutado en Google Colab
├── datos/ # image.png
├── resultados/ # capturas de imágenes modificadas, histograma, gif
├── README.md

---

## 🧪 Implementación

### 🔹 Etapas realizadas

1. Carga de imagen en color.
2. Visualización de canales RGB y HSV.
3. Modificación de regiones mediante slicing (coloración y sustitución).
4. Cálculo y graficado de histograma.
5. Ajuste de brillo y contraste manual y con OpenCV.

### 🔹 Código relevante

```python
# Ajuste de brillo y contraste con OpenCV
alpha = 1.2  # Contraste
beta = 30    # Brillo

adjusted = cv2.convertScaleAbs(image_rgb, alpha=alpha, beta=beta)
plt.imshow(adjusted)
plt.title("Ajuste con OpenCV")
plt.axis('off')
plt.show()

```

---

## 📊 Resultados Visuales




---

## 🧩 Prompts Usados

```text
"Acceder y mostrar los canales RGB y HSV por separado con matplotlib."

"Cambiar el color de una región rectangular usando slicing en NumPy."

"Crear un histograma de intensidades con cv2.calcHist y matplotlib."

"Aplicar ajuste de brillo y contraste manual y con OpenCV."
```

---

## 💬 Reflexión Final

Con este taller reforcé los fundamentos del procesamiento digital de imágenes, en especial el manejo directo de matrices NumPy para modificar regiones específicas. Además, aprendí las diferencias prácticas entre cv2.calcHist() y plt.hist(), lo que me permitió seleccionar la herramienta más adecuada según el análisis requerido.

La parte más interesante fue la manipulación de regiones por slicing, ya que muestra el poder del acceso directo a los datos de imagen. Para próximos proyectos, aplicaría estos conceptos a tareas más avanzadas como detección de objetos o segmentación.

---


## ✅ Checklist de Entrega

- [x] Carpeta `2025-05-05_taller_imagen_matriz_pixeles`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---