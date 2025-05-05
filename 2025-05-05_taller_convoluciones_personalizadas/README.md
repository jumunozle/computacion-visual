# 🧪 Convoluciones Personalizadas

## 📅 Fecha
2025-05-05

---

## 🎯 Objetivo del Taller

Explorar e implementar manualmente la operación de convolución 2D en imágenes en escala de grises, aplicar distintos kernels (enfocar, suavizar y detectar esquinas), y comparar los resultados visualmente con los obtenidos mediante funciones integradas de OpenCV.

---

## 🧠 Conceptos Aprendidos

- Convolución 2D desde cero con NumPy.
- Diseño y uso de kernels personalizados: sharpening, blur, Sobel.
- Detección de bordes y esquinas mediante derivadas cruzadas.
- Comparación de implementaciones manuales vs. librerías optimizadas.
- Visualización de imágenes con Matplotlib.

---

## 🔧 Herramientas y Entornos

- Google Colab (o Jupyter Notebook)
- Python 3
- Librerías: `opencv-python`, `numpy`, `matplotlib`

---

## 📁 Estructura del Proyecto
```
2025-05-05_convoluciones_personalizadas/
├── python/
├── resultados/
├── README.md
```
---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. Carga de imagen en escala de grises con OpenCV.
2. Implementación manual de la convolución 2D.
3. Aplicación de 3 tipos de kernels: enfoque, suavizado y esquinas.
4. Comparación visual de resultados manuales vs OpenCV.

### 🔹 Código relevante

```python
def convolve2d(image, kernel):
    h, w = kernel.shape
    pad_h, pad_w = h // 2, w // 2
    padded = np.pad(image, ((pad_h, pad_h), (pad_w, pad_w)), mode='constant')
    output = np.zeros_like(image)

    for i in range(image.shape[0]):
        for j in range(image.shape[1]):
            region = padded[i:i+h, j:j+w]
            output[i, j] = np.clip(np.sum(region * kernel), 0, 255)
    return output.astype(np.uint8)

# Detección de esquinas (Ix * Iy)
Ix = convolve2d(img, sobel_x).astype(np.float32)
Iy = convolve2d(img, sobel_y).astype(np.float32)
Ixy = Ix * Iy
corner_response = np.clip(np.abs(Ixy) / np.max(np.abs(Ixy)) * 255, 0, 255).astype(np.uint8)

```

---

## 📊 Resultados Visuales

![convoluciones_python_munoz](https://github.com/user-attachments/assets/e1b38f00-3dea-4c40-a658-d9acd7e5e593)
https://colab.research.google.com/drive/1PLCZEsZMQaQn5_mbh_OqYva9DnufzRwL?usp=sharing
---

## 🧩 Prompts Usados

```text
- Cargar una imagen en escala de grises.
- Implementar manualmente una convolución 2D desde cero con NumPy.
- Diseñar y aplicar 3 kernels: sharpening, blur y esquinas (Sobel + derivadas cruzadas).
- Comparar visualmente con cv2.filter2D().
- Mostrar imágenes en paralelo.
```

---

## 💬 Reflexión Final

Este taller permitió reforzar el entendimiento práctico del proceso de convolución en imágenes y cómo pequeñas matrices (kernels) pueden alterar significativamente la percepción visual de una imagen. Implementar la convolución manualmente ayudó a comprender cómo se realiza el barrido píxel a píxel y el efecto del padding.

La parte más interesante fue la detección de esquinas utilizando derivadas cruzadas, ya que conecta con conceptos más avanzados como la matriz de Harris. Para mejorar, se podría extender esta base hacia detección de esquinas en tiempo real o comparar con algoritmos más complejos como Harris o Shi-Tomasi en OpenCV.
---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-05-05_taller_convoluciones_personalizadas`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---
