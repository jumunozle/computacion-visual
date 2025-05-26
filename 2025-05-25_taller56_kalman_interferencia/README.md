# 🧪 Taller 56 - Filtro de Kalman e Inferencia de Variables Ocultas

## 📅 Fecha
2025-05-26 – Fecha de entrega
---

## 🎯 Objetivo del Taller

Aprender a implementar el filtro de Kalman para estimar una variable oculta (como la posición real de un objeto) a partir de observaciones ruidosas. Se busca introducir conceptos de inferencia estadística y procesamiento secuencial de señales, aplicables en visión por computador, robótica y predicción de series temporales.

---

## 🧠 Conceptos Aprendidos

- Filtro de Kalman 1D (estimación de una sola variable).
- Filtro de Kalman 2D (posición y velocidad).
- Inferencia de variables ocultas en un modelo secuencial.
- Procesamiento de señales con ruido.
- Visualización de señales reales, observadas y estimadas.
- Análisis de error en estimaciones.

---

## 🔧 Herramientas y Entornos

- Python 3.11
- Librerías: `numpy`, `matplotlib`
- Entorno de ejecución: Jupyter Notebook / Google Colab

---

## 📁 Estructura del Proyecto

```
2025-05-26_taller56_kalman_inferencia/
├── kalman_filter.ipynb
├── grafico_resultado.png
├── README.md
```

---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. Generación de datos sintéticos con ruido para simular observaciones ruidosas de una posición.
2. Implementación del filtro de Kalman en 1D y 2D.
3. Estimación de la variable oculta (posición real) y visualización.
4. Comparación visual entre las señales: real, observada y estimada.

### 🔹 Código relevante

```python
# Filtro de Kalman 1D
K = P_prior / (P_prior + R)
x_hat = x_hat_prior + K * (z - x_hat_prior)
P = (1 - K) * P_prior
# Filtro de Kalman 2D
x_prior = F @ x
P_prior = F @ P @ F.T + Q
K = P_prior @ H.T @ np.linalg.inv(H @ P_prior @ H.T + R)
x = x_prior + K @ (z - H @ x_prior)
P = (I - K @ H) @ P_prior
```
---

## 📊 Resultados Visuales

![grafico_resultado1](https://github.com/user-attachments/assets/17f227dd-8a6a-4dc9-a905-1dc53900a1c3)
![grafico_resultado2](https://github.com/user-attachments/assets/c922b29c-78f8-4dcf-843d-af54ff3ac78a)
![grafico_resultado3](https://github.com/user-attachments/assets/84da6102-7636-4892-b271-c2aed242f2a9)

---
## 🧩 Prompts Usados

Como implementar el modelo de Kalman 1D y 2D?

Como genero datos sintéticos con ruido que simulen observaciones incompletas?

Aplicar el filtro para estimar la variable oculta.

---

## 📐 Ecuaciones del Filtro de Kalman (texto plano)

Inferencia: se infiere la variable oculta (posición real) mediante un modelo de transición y la medición ruidosa.

Análisis de error: la señal estimada converge a la real conforme se acumulan observaciones, dependiendo del nivel de ruido y la calidad del modelo.

### 🔹 Etapa de Predicción

Se estima el próximo estado y su incertidumbre:

- Estado predicho:
  
  x_hat_prior = F · x_hat

- Covarianza predicha:

  P_prior = F · P · Fᵗ + Q

Donde:
- x_hat_prior: estimación del estado antes de la medición.
- F: matriz de transición (modelo de movimiento).
- P: matriz de covarianza de la estimación.
- Q: matriz de covarianza del ruido de proceso.

---

### 🔹 Etapa de Corrección

Se ajusta la predicción con la observación z:

- Ganancia de Kalman:

  K = P_prior · Hᵗ · inv(H · P_prior · Hᵗ + R)

- Estado corregido:

  x_hat = x_hat_prior + K · (z - H · x_hat_prior)

- Covarianza corregida:

  P = (I - K · H) · P_prior

Donde:
- H: matriz que proyecta el estado al espacio de mediciones.
- R: matriz de covarianza del ruido de medición.
- I: matriz identidad.
- z: medición observada.

---

## 💬 Reflexión Final

Con este taller aprendí a implementar un filtro de Kalman desde cero, comprendiendo sus dos etapas principales: la predicción y la corrección. Me permitió ver cómo puede inferirse una variable que no es directamente observable utilizando solo señales ruidosas, lo que resulta esencial en sistemas de navegación, visión por computador y robótica.

Lo más interesante fue extender el modelo a 2D, lo que permitió estimar no solo posición sino también velocidad. 

---

## 👥 Integrantes
Sebastián Muñoz → jumunozle@unal.edu.co

Carlos Camacho → cacamacho@unal.edu.co

Juan Daniel Ramírez → juaramriezmo@unal.edu.co

Cristian Medina → crmedinab@unal.edu.co

---

## 👤 Contribuciones al Taller

- Implementación completa del filtro de Kalman en 1D para estimar posición a partir de observaciones ruidosas.
- Generación de datos sintéticos simulando mediciones con ruido gaussiano.
- Visualización comparativa entre datos reales, observados y estimados.
- Documentación del proceso en formato estructurado con secciones técnicas y matemáticas.

---

## ✅ Criterios de Evaluación
✅ Implementación funcional del filtro de Kalman

✅ Visualización clara de resultados

✅ Explicación matemática en el README.md

✅ Estructura del proyecto organizada

✅ Código comentado correctamente

✅ Comparación entre variable real, observada y estimada
