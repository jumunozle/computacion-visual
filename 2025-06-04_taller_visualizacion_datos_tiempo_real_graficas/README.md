# 🧪 Taller 45 - Visualización de Datos en Tiempo Real: Gráficas en Movimiento

📅 Fecha

2025-06-04 – Fecha de asignación  
2025-06-15 – Fecha de realización  
2025-06-24 – Fecha de entrega

----------

## 🔍 Objetivo del taller

Capturar o simular datos en tiempo real (conteo de objetos, sin(r), etc) y visualizarlos en un gráfica dinámica.  
Este taller busca explorar cómo enlazar datos numéricos con representaciones visuales en vivo, así como el manejo de diferentes tipos de fuente de datos (simulados o de un flujo de detección en un video) y exportarlos posteriormente.

----------

## 🔹 Actividades por entorno

Este taller se realiza **exclusivamente en Python (local)**, utilizando:

-   `matplotlib`
    
-   `numpy`
    
-   `opencv-python`
    
-   `ultralytics`
    

Este taller proporciona varias alternativas de fuente de datos:

✅ Simulados con números aleatorios  
✅ Detección de número de personas en un video de la cámara  
✅ Temperatura simulated (función sinusoidal)

Además, se muestran tanto el flujo de video como el gráfico en paralelo.

----------

## 💻 Python (Ejecución local)

**Herramientas necesarias:**

-   `matplotlib`
    
-   `numpy`
    
-   `opencv-python`
    
-   `ultralytics`
    

**Comandos de instalación (ejemplo):**


```python
pip install matplotlib numpy opencv-python ultralytics` 
```

----------

## Pasos a implementar:

-   Implementar un script que genere o capture nuevos datos en tiempo real.
    
-   Visualizar el flujo de datos en un `animation.FuncAnimation`.
    
-   Utilizar diferentes tipos de fuente de datos:
    
    -   Números aleatorios
        
    -   Detección de personas en el video de la cámara
        
    -   Función sinusoidal que simula una señal de temperatura
        
-   Cambiar el modo de fuente de datos presionando `f`.
    
-   Exportar los resultados tanto en CSV como en PNG junto con el video opcional de la detección.
    

----------

## **Resultados:**

-   Gráfico en movimiento mostrando el flujo de nuevos datos.
    
-   Imagen PNG guardada automáticamente junto con el CSV de resultados.
    
-   La fuente de datos se puede cambiar en vivo (aleatoria, detección, sinusoidal).
     

### **Gif Completo:**
![Imagen GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-06-04_taller_visualizacion_datos_tiempo_real_graficas/resultados/resultadoCompleto.gif?raw=true)  


----------

## 🌟 Bonus

-   Exportar el CSV junto con el PNG de la gráfica.
    
-   Implementar el cambio de fuente de datos en vivo.
    


![Imagen GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-06-04_taller_visualizacion_datos_tiempo_real_graficas/resultados/bonusExportarResultados.gif?raw=true)


### **Gráfica exportada al finalizar el programa:**


![Imagen GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-06-04_taller_visualizacion_datos_tiempo_real_graficas/resultados/grafica.png?raw=true)


Link al csv con los resultados: [computacion-visual/2025-06-04_taller_visualizacion_datos_tiempo_real_graficas/resultados/resultados.csv at main · JuanDanielRamirezMojica/computacion-visual](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-06-04_taller_visualizacion_datos_tiempo_real_graficas/resultados/resultados.csv)

----------

## 🔹 Fragmento de código relevante:

``` python
def  update(frame):
	"""Función que se llama en cada frame de la animación."""
	global  modo, datos, text

	inicio = time.time()

	if  modo == 0:

		# Simulamos nuevos datos
		nuevo_dato = np.random.randint(0, 20) # Dato aleatorio entre 0 y 20 para simular datos
		modo_text = "Dato aleatorio"

	elif  modo == 1:
	
		# Detectamos con YOLO el número de personas en el frame de la cámara
		ret, video_frame = cap.read()

		if  not  ret:
			print("Error: no se pudo leer el fotograma.")
			nuevo_dato = 0
		else:
			resultados = model(video_frame)
			detections = resultados[0]

			# Filtramos solamente detecciones de Persona
			nuevo_dato = sum(1  for  box  in  detections.boxes if  int(box.cls.item()) == 0) # 0 = person
			 
			# También podemos mostrar el video en una ventana aparte

			annotated = resultados[0].plot()
			cv2.imshow("Camara - deteccion de personas", annotated)
		if  cv2.waitKey(1) == ord('q'):
			cap.release()
			cv2.destroyAllWindows()
			return  line, text
		modo_text = "Detectar número de personas"

	elif  modo == 2:
		nuevo_dato = np.sin(time.time()) # Temperatura simulated
		modo_text = "Temperatura (sin)"
		# Agregar nuevo dato
		datos.append(nuevo_dato)
		# Actualizamos gráfica
		line.set_data(range(len(datos)), datos)
		ax.relim()
		ax.autoscale_view()

	  

	# También podemos guardar CSV opcional
	with  open("resultados.csv", "a", newline='') as  f:
		writer = csv.writer(f)
		writer.writerow([len(datos), nuevo_dato])

	# Medir FPS sin division por cero
	fin = time.time()
	duracion = fin - inicio
	fps = 1.0 / (duracion + 1e-6)
	fps_text = f"FPS: {fps:.2f}"

	# Actualizamos texto
	text.set_text(f'{fps_text}\nValor actual: {nuevo_dato}\nModo: {modo_text}')
	
	return  line, text
```

### 🧩 Prompts Usados

- _Refactoriza este código "...."_
-  "Mejora la redacción de estos parrafos: "..".


----------

## 📚 Entrega

```
2025-06-04_taller_visualizacion_datos_tiempo_real_graficas/
 └── python/
 └── resultados/
 └── README.md 
```

----------

## 💬 Reflexión Final

Este taller pone en práctica el manejo de diferentes tipos de fuente de datos en vivo, así como el despliegue dinámico de ellos en un gráfica en actualización.  
Además, proporciona una aplicación práctica tanto en el análisis de video como en el manejo de signals o de otras métricas en entornos de seguimiento en tiempo real.

----------

## 👥 Integrantes

-   Sebastián Muñoz → jumunozle@unal.edu.co
    
-   Carlos Camacho → cacamacho@unal.edu.co
    
-   Juan Daniel Ramírez → juaramriezmo@unal.edu.co
    
-   Sergio David López → slopezpa@unal.edu.co
    

## 👥 Contribuciones Grupales

-   Implementación del flujo de detección junto con el video.
    
-   Implementación de la gráfica en vivo junto con la actualización de los datos.
    
-   Creación del script principal, exportaciones CSV y PNG.
    
-   Redacción del README.md junto con el proyecto.


----------

## 🛠 Criterios de evaluación

✅ Visualización dinámica de datos en tiempo real.  
✅ Gráfico funcional (líneas, barras o puntos).  
✅ Fuente de datos conectada al gráfico (real o simulada).  
✅ Código modular, limpio y comentado.  
✅ Exportación opcional de resultados.  
✅ README completo con explicación, evidencia visual (GIF) y prompts.  
✅ Commits descriptivos en inglés.

---------
