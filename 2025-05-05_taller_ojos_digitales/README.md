# 🧪 Taller de Filtros Convolucionales y Detección de Bordes en Imágenes

## 📅 Fecha
2025-05-03

---

## 🎯 Objetivo del Taller

Explorar y aplicar filtros convolucionales sobre imágenes en escala de grises para suavizado, realce y detección de bordes utilizando OpenCV. Además, comparar visualmente los resultados y permitir la interacción dinámica mediante sliders.

---

## 🧠 Conceptos Aprendidos

- Conversión de imágenes a escala de grises.
- Aplicación de filtros convolucionales: blur, sharpen.
- Detección de bordes con filtros de Sobel y Laplaciano.
- Visualización en tiempo real con OpenCV.
- Uso de trackbars (`cv2.createTrackbar`) para ajuste dinámico de parámetros.
- Comparación visual entre distintos métodos de filtrado.

---

## 🔧 Herramientas y Entornos

- Lenguaje: Python 3.x  
- Entorno de desarrollo: Visual Studio Code con soporte Jupyter  
- Librerías utilizadas:
  - `opencv-python`
  - `numpy`
  - `matplotlib` (opcional)

---

## 📁 Estructura del Proyecto


2025-05-05_visualizador_3d/
├── public/  
│   └── model.obj  
├── src/  
│   ├── App.jsx  
│   └── main.jsx  
├── index.html  
├── package.json  
├── resultados/  
│   └── captura.gif  
├── README.md  

---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. Carga de una imagen a color y conversión a escala de grises.
2. Aplicación de filtros blur y sharpen.
3. Cálculo de bordes con Sobel y Laplaciano.
4. Visualización en ventanas redimensionadas y trackbar para ajustar el tamaño del kernel en vivo.

### 🔹 Código relevante

```python
# Aplicación de Sobel y Laplaciano con trackbar para kernel dinámico
sobelx = cv2.Sobel(imagen_gris, cv2.CV_64F, 1, 0, ksize=kernel_size)
sobely = cv2.Sobel(imagen_gris, cv2.CV_64F, 0, 1, ksize=kernel_size)
sobel = cv2.magnitude(sobelx, sobely)
laplacian = cv2.Laplacian(imagen_gris, cv2.CV_64F, ksize=kernel_size)
```

---

## 📊 Resultados Visuales




---

## 🧩 Prompts Usados

```text
“Python (Visual studio code con jupyter)”

“Cargar una imagen a color y convertirla a escala de grises”

“Aplicar filtros convolucionales simples (blur, sharpening)”

“Implementar detección de bordes con filtro de Sobel y Laplaciano”

“Visualizar con cv2.imshow() o matplotlib”

“Agregar sliders con cv2.createTrackbar”
```

---

## 💬 Reflexión Final

Este taller me permitió comprender de forma práctica cómo se aplican filtros convolucionales sobre imágenes y cómo se pueden ajustar sus parámetros para observar diferentes efectos visuales, especialmente al trabajar con bordes y realces.

La parte más interesante fue la detección de bordes con Sobel y Laplaciano, especialmente al visualizar los resultados en tiempo real con sliders. En el futuro, podría aplicar estos conocimientos en preprocesamiento de imágenes para visión por computadora, y mejoraría la interfaz visual usando frameworks más completos como OpenCV GUI o integración con widgets de Jupyter.