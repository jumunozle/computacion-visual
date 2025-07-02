# 🧪 Taller  47 - Detección de Objetos en Tiempo Real con YOLO y Webcam

📅 Fecha

2025-06-04 – Fecha de asignación

2025-06-15 – Fecha de realización

2025-06-24 – Fecha de entrega

----------

### 🔍 Objetivo del taller

Implementar detección de objetos en tiempo real utilizando un modelo **YOLOv5 o YOLOv8** preentrenado, capturando la señal de la cámara web del computador.  
Se busca explorar la eficiencia y precisión del modelo, así como medir el desempeño del sistema en vivo (FPS).

Este taller combina técnicas de visión artificial junto con el modelo de detección de objetos, aumentando así el interés pedagógico y el aprendizaje de nuevos métodos de análisis de video en tiempo real.

----------

### 🔹 Actividades por entorno

Este taller se desarrolla **exclusivamente en Python (entorno local)**, utilizando:

-   `opencv-python`
    
-   `ultralytics` (o `torch`)
    
-   `numpy`
    

----------

## 💻 Python (Ejecución local con webcam)

**Herramientas necesarias:**

-   opencv-python
    
-   ultralytics
    
-   torch
    
-   numpy
    

----------

### Pasos a implementar:
-   Instalar las dependencias necesarias:
`pip install ultralytics opencv-python` 

-   Importar librerías y cargar el modelo:

``` python
from ultralytics import YOLO import cv2, time
model = YOLO('yolov8n.pt')` 
```

-   Capturar video en tiempo real:
    
```python
cap = cv2.VideoCapture(0)` 
```
-   En cada frame:
    
    -   Medir el inicio del fotograma.
        
    -   Realizar detección con `model.predict(source=frame, stream=False)`.
        
    -   Filtrar opcionalmente según el modo vigente.
        
    -   Dibujar las cajas, nombre de la detección y puntajes de confianza.
        
    -   Calcular e imprimir el **FPS**.
        
    -   Mostrar el nombre del filtro vigente junto con el FPS.
        
-   Visualizar el resultado con `cv2.imshow()`.
    
-   Utilizar teclas:
    
    -   **q** → salir
        
    -   **f** → cambiar el filtro de detección (sin filtro, person, cat, cell phone)

----------

## **Resultado:**

-   Ventana en vivo mostrando detección de objetos junto a cajas, nombre de la detección y puntajes de confianza.
    
-   Aplicaciones de filtros según el modo vigente.
    
-   Conteo en vivo de las detecciones de Persona u otros objetos presentes en el fotograma.
    

### **Gif Sin Filtros:**

![Imagen GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-06-04_taller_yolo_deteccion_webcam_tiempo_real/resultados/SinFiltro.gif?raw=true)


### **Gif Filtro Personas:**

![Imagen GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-06-04_taller_yolo_deteccion_webcam_tiempo_real/resultados/FiltroPersonas.gif?raw=true)


### **Gif Filtro Gatos:**

![Imagen GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-06-04_taller_yolo_deteccion_webcam_tiempo_real/resultados/FiltroGatos.gif?raw=true)



### **Gif Filtro Celular:**

![Imagen GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-06-04_taller_yolo_deteccion_webcam_tiempo_real/resultados/FiltroCelular.gif?raw=true)



### **Gif Completo:**
![Imagen GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-06-04_taller_yolo_deteccion_webcam_tiempo_real/resultados/CompletoTodosLosFiltros.gif?raw=true)  



----------
## 🌟 Bonus

✅ Implementamos un modo dinámico:

-   La aplicación permitirá **alternar** con F el modo de filtrado de detecciones:
    
    -   Sin Filtro
        
    -   Filtrar Persona
        
    -   Filtrar Gato
        
    -   Filtrar Celular
        
-   Por cada fotograma se muestran:
    
    -   El número de detecciones.
        
    -   El nombre del filtro vigente.
        
    -   El **FPS**.
        

Este bonus proporciona una capa de interactividad y análisis en vivo, aumentando así el interés pedagógico y el aprendizaje de las Técnicas de Visión Artificial junto con el modelo de detección de objetos.

----------

## 🔹 Fragmento de código relevante:

```python
# Real-time Object Detection with YOLOv8 and OpenCV
import  cv2  # Se usa OpenCV para la captura de video y visualización
import  time  # Se usa time para calcular el FPS
from ultralytics import YOLO #Se usa la librería ultralytics para cargar el modelo YOLOv8

# Carga el modelo (YOLOv8n)
model = YOLO("yolov8n.pt")

# Filtra opcionalmente según las clases que deseas detectar
filter_labels = [None, "person", "cat", "cell phone"]

# Inicializa la captura de video
cap = cv2.VideoCapture(0)

if  not  cap.isOpened():
print("Error: no se pudo acceder a la cámara.")
cap.release()
exit(1)


print("Presiona 'q' para salir")
print("Presiona 'f' para cambiar el modo de filtrado")

# Filtrado activado o desactivado
filter_index = 0

# Loop principal
try:
	while  True:
		inicio = time.time()
		ret, frame = cap.read()
		if  not  ret:
			print("Error: no se pudo leer el fotograma.")
			break

		# Realiza detección de objetos en el fotograma
		resultados = model.predict(source=frame, stream=False)
		detections = resultados[0]

		# Filtra según el modo vigente
		if  filter_labels[filter_index] is  not  None:
			filter_name = filter_labels[filter_index]
			filtered_boxes = []
			for  box  in  detections.boxes:
				class_id = int(box.cls.item()) # el id de la detección
				class_name = model.names[class_id] # nombre de la detección

				if  class_name == filter_name:
					filtered_boxes.append(box)
			detections.boxes = filtered_boxes

		# Dibuja las detecciones en el fotograma
		annotated = detections.plot()

		# Calcula el FPS
		fin = time.time()
		fps = 1.0 / (fin - inicio)
		fps_text = f"FPS: {fps:.2f}"
		
		# Muestra el modo de filtrado
		modo = filter_labels[filter_index]
		modo_txt = f"Filtro: {modo  or  'Sin Filtro'}"  

		color = (0, 255, 0) if  filter_index == 0  else (0, 0, 255)
		cv2.putText(annotated, modo_txt, (20, 30),
			fontFace=cv2.FONT_HERSHEY_SIMPLEX,
			fontScale=1, color=color, thickness=2)

		cv2.putText(annotated, fps_text, (20, 60),
			fontFace=cv2.FONT_HERSHEY_SIMPLEX,
			fontScale=1, color=color, thickness=2)

		# Muestra el resultado
		cv2.imshow("Deteccion en Tiempo Real", annotated)
		# Control con teclado
		key = cv2.waitKey(1) & 0xFF
		if  key == ord('q'): # presiona q para salir
			break
		elif  key == ord('f'): # f para cambiar el filtro
			filter_index = (filter_index + 1) % len(filter_labels)
			print(f"Filtro cambiado a: {filter_labels[filter_index] or  'Sin Filtro'}")

finally:
	cap.release()
	cv2.destroyAllWindows()
```

### 🧩 Prompts Usados

- _Refactoriza este código "...."_
-  "Mejora la redacción de estos parrafos: ".."
- ¿Cómo mido el desmepeño del programa?
 
----------

## 📚 Entrega
```
2025-06-04_taller_yolo_deteccion_webcam_tiempo_real/
 └── python/
 └── resultados/
 └── README.md` 
```
----------

## 💬 Reflexión Final


En el taller implementamos la detección de objetos en vivo junto con el procesamiento de imágenes en tiempo real.  
Combinamos tanto técnicas de visión artificial clásica como el poder de los modelos de detección basados en aprendizaje profundo (YOLOv8).

Durante las pruebas, el modelo fue capaz de detectar con seguridad algunos de los objetos presentes en el lugar, como personas, animales o teléfonos, dibujándoles un marco junto con el nombre de la clase y el puntaje de confianza.  
Además, implementamos un modo dinámico que nos permitió filtrar las detecciones según el objeto deseado (persona, gato o celular) y así concentrarnos en lo que más nos interesa en cada momento.

Este taller fue una experiencia muy enriquecedora, ya que proporciona una aplicación práctica en el análisis de video en entornos dinámicos.  
Sin embargo, también aparecieron algunos retos, como detecciones erróneas o poca estabilidad en determinados fotogramas, que muestran que el modelo puede confundir grupos de píxeles o tener un rendimiento más bajo en entornos de poca luz o con muchos movimientos.   Este problema pone en evidencia que el modelo tiene limitaciones y que el resultado final puede optimizarse aumentando el conjunto de datos de entrenamiento, modificando los umbrales de detección o aumentando la resolución de la cámara.

----------

## 👥 Integrantes

-   Sebastián Muñoz → jumunozle@unal.edu.co
    
-   Carlos Camacho → cacamacho@unal.edu.co
    
-   Juan Daniel Ramírez → juaramriezmo@unal.edu.co
    
-   Sergio David López → slopezpa@unal.edu.co
    

----------

## 👥 Contribuciones Grupales

-   Implementación de la captura de video en tiempo real con `cv2.VideoCapture`.
    
-   Aplicación de filtros de procesamiento de imágenes en vivo.
    
-   Integración del modelo de detección de objetos **YOLOv8** de Ultralytics.
    
-   Dibujo de cajas junto con nombre de la detección y puntajes de confianza.
    
- Dibujar gráficamente los FPS en una esquina del frame.        
-   Filtra según la selección del teclado: Persona, Gato o Celular              
-   Creación de un `README.md` junto con el proyecto.
    

----------

## 🛠 Criterios de evaluación

✅ Carga funcional de YOLOv5 o YOLOv8.  
✅ Captura en tiempo real desde la cámara web.  
✅ Detección visual con cajas, nombre de clases y puntajes de confianza.  
✅ Cálculo de tiempo de inferencia por frame (FPS).  
✅ Bonus.
✅ Código limpio, modular y adecuadamente comentado.  
✅ `README.md` completo con explicación, evidencias visuales (GIF) y prompts.  
✅ Commits descriptivos en Inglés.

