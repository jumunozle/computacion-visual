# 🧪 Taller 22 – BCI Simulado: Señales Mentales Artificiales para Control Visual

📅 Fecha  

2025-05-12 – Fecha de asignación

2025-05-25 – Fecha de realización

2025-05-26 – Fecha de entrega

----------

## 🎯 Objetivo del Taller

El objetivo fue crear una interfaz visual que simule un sistema BCI (Brain-Computer Interface) utilizando datos EEG reales cargados desde un archivo `.arff`. Se buscó filtrar las señales EEG, visualizar la actividad de un canal, y generar una respuesta visual (como cambio de color o movimiento) al superar un umbral de activación cerebral, emulando un control mental básico.
 
El archivo se obtuvo de acá: [Eye State Classification EEG Dataset](https://www.kaggle.com/datasets/robikscube/eye-state-classification-eeg-dataset)
 
----------

## 🧠 Conceptos Aprendidos

-   Lectura de archivos `.arff` y preprocesamiento de señales.
    
-   Aplicación de filtros digitales (filtro pasa banda tipo Butterworth).
    
-   Visualización de señales EEG en tiempo real con matplotlib embebido en Tkinter.
    
-   Detección de eventos cerebrales mediante umbrales personalizados.
    
-   Diseño de interfaces gráficas con interacción y control desde datos EEG.
    

----------

## 🔧 Herramientas y Entornos

-   **Python 3**
    
-   Librerías:
    
    -   `numpy`
        
    -   `scipy`
        
    -   `pandas`
        
    -   `matplotlib`
        
    -   `tkinter`
        
    -   `scipy.io.arff`
        

📌 Todas las dependencias fueron instaladas con `pip`, sin necesidad de entornos externos.

----------

## 📁 Estructura del Proyecto


```
2025-05-12_taller_bci_simulado/
├── python/
│   ├── main.py
|   ├── eeg_data.arff
│   └── GifPython.gif 
├── README.md` 
```

----------

## 🧪 Implementación

### 🔹 Etapas realizadas

1.  **Carga de archivo EEG (.arff)**
    
    -   Se utilizó `scipy.io.arff` para leer el dataset `EEG Eye State`.
        
    -   Se limpiaron valores nulos y se convirtieron los datos a tipo `float`.
        
2.  **Visualización de señales**
    
    -   Se graficó la señal EEG seleccionada por el usuario desde un `ComboBox`.
        
    -   Se integró `matplotlib` con `Tkinter` para la visualización embebida.
        
3.  **Filtrado y umbral**
    
    -   Se implementó un filtro pasa banda (Alpha: 8–12 Hz) usando `scipy.signal.butter` y `filtfilt`.
        
    -   Se añadió un botón para detectar picos de activación superiores a un umbral.
        
4.  **Respuesta visual**
    
    -   Si la señal supera el umbral, se cambia el color de fondo en la interfaz.
        
    -   Se simula así una "activación mental" como señal de control.
        

----------

### 🔹 Código relevante

#### Filtro Alpha y activación:

```python
# Filtro tipo Butterworth 8–12 Hz (Alpha)
fs = 250  # Frecuencia de muestreo (Hz)
nyq = 0.5 * fs
low = 8 / nyq
high = 12 / nyq
b, a = signal.butter(4, [low, high], btype='band')

senal_filtrada = signal.filtfilt(b, a, senal)
energia = np.sum(senal_filtrada ** 2)

# Si la energía supera el umbral, cambiar el fondo
if energia > UMBRAL:
    canvas.config(bg="green")
else:
    canvas.config(bg="gray")
```
## 📊 Resultados Visuales

### 🧠 Activación cerebral con EEG Eye State

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-05-12_taller_bci_simulado_control_visual/python/GifPython.gif?raw=true)





## 🧩 Prompts Usados

-   Cómo aplicar un filtro pasa banda en señales EEG con SciPy?
    
-   Cómo simular un sistema BCI con datos EEG reales?
    
-   Interfaz gráfica en Tkinter con control visual según datos

-   Refactoriza este código: "".

- Redáctame mejor este párrafo.

## 💬 Reflexión Final

Este taller me permitió comprender cómo un sistema BCI puede construirse desde componentes simples: una interfaz, una señal EEG pregrabada, y un mecanismo de respuesta a patrones cerebrales. El uso del filtro en la banda Alpha permitió simular de forma efectiva una activación mental relacionada con atención o concentración.

Lo más interesante fue lograr que el sistema reaccionara automáticamente a un estado "mental" medido por la energía de la señal EEG filtrada. Aunque se trabajó con datos simulados, la experiencia abre puertas a explorar señales reales en tiempo real. En el futuro, sería interesante incorporar otros tipos de respuestas visuales o incluso sonido.

----------

## 👥 Integrantes

-   Sebastián Muñoz → jumunozle@unal.edu.co
    
-   Carlos Camacho → cacamacho@unal.edu.co
    
-   Juan Daniel Ramírez → juaramriezmo@unal.edu.co
    
-   Cristian Medina → crmedinab@unal.edu.co
    

----------

## 👥 Contribuciones Grupales

-   **Carga y preprocesamiento del archivo EEG**
    
    -   Limpieza y transformación de los datos `.arff` a DataFrame usable.
        
    -   Identificación de columnas y variables de interés.
        
-   **Diseño de la interfaz gráfica**
    
    -   Implementación de `Tkinter` con `Canvas`, `ComboBox`, botones y etiquetas.
        
    -   Embebido del gráfico con `matplotlib`.
        
-   **Filtrado y lógica BCI**
    
    -   Implementación de filtro pasa banda.
        
    -   Cálculo de energía y comparación con umbral.
        
    -   Cambio de color de fondo como respuesta visual.
        
-   **Visualización y documentación**
    
    -   Generación de GIF mostrando la interacción.
        
    -   Estructuración del proyecto.
        
    -   Elaboración del README con explicación clara.
        

----------

## ✅ Checklist de Entrega

-   Carpeta `2025-05-12_taller_bci_simulado_control_visual/`
    
-   Código funcional con filtrado, visualización y lógica de activación
    
-   GIF incluido (`GifPython.gif`)
- **Bonus:** Crear una animación interactiva con `pygame` o `tkinter` que responda en tiempo real a la señal filtrada
    
-   README completo con explicación, prompts y reflexión
    
-   Commits descriptivos en inglés
