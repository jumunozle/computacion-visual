# 🧪 Nombre del Taller
Rasterización de Figuras Geométricas con Algoritmos Clásicos

## 📅 Fecha
2025-05-05

---

## 🎯 Objetivo del Taller

Explorar e implementar algoritmos clásicos de rasterización para generar gráficos básicos (líneas, círculos y triángulos) mediante operaciones a nivel de píxel. Este taller busca comprender el funcionamiento de bajo nivel del renderizado en gráficos por computadora.

---

## 🧠 Conceptos Aprendidos

- **Algoritmo de Bresenham para líneas:** Técnica eficiente para rasterizar líneas entre dos puntos utilizando sólo operaciones enteras.
- **Algoritmo de punto medio para círculos:** Método simétrico que dibuja un círculo evaluando solo un octante y reflejando los puntos.
- **Relleno de triángulos por scanline:** Técnica de rasterización que llena un triángulo ordenando sus vértices y generando líneas horizontales entre bordes interpolados.

---

## 🔧 Herramientas y Entornos

- **Lenguaje:** Python 3
- **Librerías:** PIL (Pillow), Matplotlib
- **Entorno de ejecución:** Jupyter Notebook / Colab / Entorno local con soporte gráfico

---

## 📁 Estructura del Proyecto

2025-05-05_rasterizacion/
├── entorno/ # python/
├── datos/ # imágenes generadas (opcional)
├── resultados/ # capturas .png, .gif del renderizado
├── README.md

---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. Preparación del lienzo con PIL.
2. Implementación de algoritmos: línea (Bresenham), círculo (punto medio) y triángulo (scanline).
3. Visualización final con Matplotlib.
4. Posibilidad de guardar las imágenes generadas.

### 🔹 Código relevante

```python
# Dibujar una línea con el algoritmo de Bresenham
def bresenham(x0, y0, x1, y1):
    dx = abs(x1 - x0)
    dy = abs(y1 - y0)
    sx = 1 if x0 < x1 else -1
    sy = 1 if y0 < y1 else -1
    err = dx - dy
    while True:
        pixels[x0, y0] = (255, 0, 0)
        if x0 == x1 and y0 == y1:
            break
        e2 = 2 * err
        if e2 > -dy:
            err -= dy
            x0 += sx
        if e2 < dx:
            err += dx
            y0 += sy
```
---

## 📊 Resultados Visuales




---

---

## 💬 Reflexión Final

Los métodos difieren en su propósito y eficiencia. Bresenham y el círculo de punto medio son rápidos y precisos porque usan solo enteros, ideales para líneas y curvas simples. El relleno por scanline es más versátil para áreas, aunque requiere más cálculo. En general, los primeros son más veloces; el último es más flexible para formas complejas.

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-05-05_taller_algoritmos_rasterizacion_basica`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---
