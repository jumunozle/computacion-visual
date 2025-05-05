# 🧪 Taller De Pixels a Coordenadas

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
```
## 📁 Estructura del Proyecto
2025-05-05_taller_iamgen_matriz_pixeles/
├── python/
├── resultados/
├── README.md
```
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

```
#Cargar imagen en color
image = cv2.imread('image.png') 
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convertir de BGR a RGB

# Separar canales RGB
R, G, B = cv2.split(image_rgb)

# Convertir a HSV y separar canales
image_hsv = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2HSV)
H, S, V = cv2.split(image_hsv)
---

## 📊 Resultados Visuales

![taller_imagen_matriz_munoz](https://github.com/user-attachments/assets/b091ea1a-02e2-448a-b291-76f285d8ce6b)

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
- [x] GIF incluido con nombre descriptivo
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---
