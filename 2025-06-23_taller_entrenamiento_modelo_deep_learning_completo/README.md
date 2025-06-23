# 🧠 Taller - Entrenamiento de un Modelo de Deep Learning de Inicio a Fin
### 📅 Fecha  
2025-06-23

---
## 🎯 Objetivo del Taller  

Explorar la clasificación de imágenes usando redes neuronales profundas. Se comparan dos enfoques: un modelo secuencial entrenado desde cero y un modelo preentrenado (ResNet18) adaptado mediante fine-tuning. El objetivo es evaluar el impacto del reuso de conocimiento previo en la precisión y generalización del modelo.

---

## 🧠 Conceptos Aprendidos

- Transformaciones geométricas (redimensionado, conversión de canales)
- Entrenamiento de modelos IA desde cero
- Fine-Tuning de modelos preentrenados
- Validación hold-out y comparación de métricas
- Visualización de métricas (f1-score, precisión, recall)

---

## 🔧 Herramientas y Entornos

- Python (torch, torchvision, matplotlib, scikit-learn)
- Google Colab 
- Librerías adicionales: seaborn, numpy
---

## 📁 Estructura del Proyecto
```
2025-06-23_taller_entrenamiento_modelo_deep_learning_completo/
├── python/
├── modelos/
├── resultados/
├── README.md
```
---

## 🧪 Implementación

🔹 Etapas realizadas

1. Carga y visualización del dataset MNIST.
2. Preparación de los datos y transformaciones necesarias para ambos modelos.
3. Definición de un modelo secuencial simple (3 capas densas con ReLU y Dropout).
4. Carga de `resnet18(pretrained=True)` y reemplazo de la capa final (`fc`) por una con 10 salidas.
5. Fine-tuning parcial de la red (solo se entrenó la capa `fc`).
6. Evaluación con métricas estándar (`classification_report`, `confusion_matrix`).
7. Visualización comparativa de f1-score, precisión y recall por clase.

### 🔹 Código relevante

```python
# Carga de modelo preentrenado con fine-tuning de la capa final
from torchvision import models
model_ft = models.resnet18(pretrained=True)

for param in model_ft.parameters():
    param.requires_grad = False

model_ft.fc = nn.Linear(model_ft.fc.in_features, 10)  # 10 clases para MNIST

# Entrenamiento solo de la capa fc
optimizer = optim.Adam(model_ft.fc.parameters(), lr=1e-4)
```

---

## 📊 Resultados Visuales

![confuision_matriz_resnet](https://github.com/user-attachments/assets/ea0e54e9-617c-4108-953a-5a20effaf2b0)
![confusion_matrix](https://github.com/user-attachments/assets/9d4be0b4-1f2d-45e8-8a7f-d82fb1396dae)
![curva_loss](https://github.com/user-attachments/assets/de77956c-d1c6-4a2a-ba85-74b0bc07d98f)
![secuencial vs finetuning](https://github.com/user-attachments/assets/e582da28-b471-4eef-947c-66bc34086621)

---

## 📁 Breve descripción del dataset y arquitectura
Dataset: MNIST contiene 70,000 imágenes en escala de grises (60k entrenamiento, 10k prueba) de dígitos escritos a mano (clases 0–9).
Arquitecturas:

Modelo secuencial: red de 3 capas densas con ReLU y Dropout.

ResNet18: red convolucional preentrenada en ImageNet, con su capa final reemplazada por una capa lineal de 10 salidas.

---

## 🧠 Justificación del fine-tuning y validación usada
El fine-tuning se utilizó para aprovechar los filtros convolucionales ya entrenados en ResNet18, evitando un entrenamiento completo desde cero. Solo se entrenó la capa final (fc) para adaptar la salida a las 10 clases de MNIST.
Se usó validación tipo hold-out, dividiendo el conjunto de entrenamiento en un 80% para entrenamiento y 20% para validación, permitiendo evaluar el rendimiento en cada época sin afectar el conjunto de prueba.

---

## 🧩 Prompts Usados

"Convierte imágenes en escala de grises a RGB y redimensionalas a 224x224 para que funcionen con ResNet18 preentrenada."

"Explica por qué una capa final no entrenada en ResNet18 da malos resultados al evaluar en MNIST."

---

## 💬 Reflexión Final
Este taller permitió comprender cómo un modelo secuencial bien entrenado puede alcanzar niveles de precisión muy altos en tareas simples como MNIST. Sin embargo, también se evidenció que un modelo preentrenado como ResNet18, aún sin haber sido optimizado completamente para dígitos, puede aproximarse al rendimiento de modelos entrenados desde cero si se ajusta correctamente la salida y se aplica fine-tuning parcial.

El fine-tuning impacta significativamente cuando se adapta correctamente la arquitectura de entrada (canales, tamaño) y se entrena al menos la capa final. La técnica de validación hold-out fue suficiente para obtener métricas fiables.

---

## 👥 Contribuciones al Taller

Programación y entrenamiento del modelo secuencial.

Adaptación y fine-tuning de la red ResNet18.

Generación de gráficas comparativas.

Documentación completa y análisis de resultados.

---

## 👥 Integrantes
Sebastián Muñoz → jumunozle@unal.edu.co

Carlos Camacho → cacamacho@unal.edu.co

Juan Daniel Ramírez → juaramriezmo@unal.edu.co

Cristian Medina → crmedinab@unal.edu.co

---

## ✅ Checklist de entrega

✅ Entrenamiento completo y funcional.

✅ Aplicación de técnicas de validación (hold-out y K-Fold).

✅ Comparación clara con fine-tuning.

✅ Visualización de métricas.

✅ Código limpio y comentado.

✅ README bien estructurado con resultados y reflexión.

✅ Commits descriptivos en inglés.
