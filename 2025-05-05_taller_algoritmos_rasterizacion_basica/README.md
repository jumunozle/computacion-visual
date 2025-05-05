# 🧪 Rasterizacion desde Cero

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
```
2025-05-05_taller_algoritmos_rasterizacion_basica/
├── python/
├── resultados/
│   ├── linea.png
│   ├── circulo.png
│   ├── triangulo.png
├── README.md
```
---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. Preparación del lienzo con PIL.
2. Implementación de algoritmos: línea (Bresenham), círculo (punto medio) y triángulo (scanline).
3. Visualización final con Matplotlib.
4. Posibilidad de guardar las imágenes generadas.

---

## 📊 Resultados Visuales
![Circulo](https://github.com/user-attachments/assets/02017e8c-4f49-45f2-8a1e-5212217efcde)

![Linea](https://github.com/user-attachments/assets/a088dcb0-be42-4378-b7e3-6654669283ec)

![Triangulo](https://github.com/user-attachments/assets/b105364b-6e4e-49c6-9980-fb05251e7683)

![Figuras juntas](https://github.com/user-attachments/assets/f7e93fe5-d22c-4b11-9b09-5a4236222129)
---

---

## 💬 Reflexión Final

Los métodos difieren en su propósito y eficiencia. Bresenham y el círculo de punto medio son rápidos y precisos porque usan solo enteros, ideales para líneas y curvas simples. El relleno por scanline es más versátil para áreas, aunque requiere más cálculo. En general, los primeros son más veloces; el último es más flexible para formas complejas.

---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-05-05_taller_algoritmos_rasterizacion_basica`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---
