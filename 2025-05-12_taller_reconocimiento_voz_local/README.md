# 🧪 Taller 23- Voz al Código: Comandos por Reconocimiento de Voz Local

📅 Fecha  

2025-05-12 – Fecha de asignación

2025-05-26 – Fecha de entrega

---

## 🎯 Objetivo del Taller  
Explorar la integración de reconocimiento de voz en tiempo real con visualización 3D interactiva, mediante comunicación OSC entre Python y Processing. El objetivo es controlar el color y rotación de una figura 3D (cubo) utilizando comandos de voz simples.

---

## 🧠 Conceptos Aprendidos

- Comunicación por voz y procesamiento de audio en tiempo real
- Comunicación entre entornos mediante protocolo OSC
- Visualización 3D básica en Processing
- Control de animación e interacción a través de comandos hablados

---

## 🔧 Herramientas y Entornos

- **Python**: `speech_recognition`, `pyttsx3`, `pygame`, `python-osc`
- **Processing (Java mode)**: `oscP5`, `netP5`

📌 Todas las librerías fueron instaladas usando `pip` y el gestor de librerías de Processing.

---

## 📁 Estructura del Proyecto

```
2025-05-12_taller_voz_osc/
├── python/
│ └── main.py
│ └── requirements.txt
│ └── pythonVoz.gif
├── processing/
│ └── visualizador_osc_pde.pde
│ └── processingVoz.gif
│ └── requirements.txt
│ └── Taller_23_voz.mp4
│ └── sketch.properties
├── README.md
```
---

## 🧪 Implementación

### 🔹 Etapas realizadas

1.   **Captura de voz y reconocimiento con Google Speech Recognition**  
    Se utilizó el servicio en la nube de Google por su alta precisión y facilidad de integración. La voz fue capturada en tiempo real mediante un micrófono y procesada para obtener texto.
    
    > Se intentó con nSphinx (PocketSphinx): 
    > Inicialmente se intentó usar el motor de reconocimiento de voz `nSphinx` (PocketSphinx), que funciona completamente **offline**, pero no se logró una correcta identificación de las palabras. La falta de claridad en el reconocimiento hizo inviable su uso en esta etapa.
    
2.   **Conversión de texto a voz con `pyttsx3`**  
    Una vez reconocido el comando por voz, se implementó una retroalimentación hablada usando `pyttsx3`, que permite síntesis de voz local y multiplataforma sin conexión a internet.
    
3.  **Visualización local con `pygame`**  
    Se diseñó una interfaz básica en `pygame` para mostrar en pantalla los comandos reconocidos, así como el estado de comunicación entre los módulos.
    
4.   **Envío del comando por OSC a Processing**  
    Se estableció un canal de comunicación entre Python y Processing utilizando el protocolo OSC (Open Sound Control), permitiendo transmitir los comandos reconocidos de forma robusta y en tiempo real.
    
5.  **Renderizado 3D con rotación y cambio de color en Processing**  
    En el entorno de Processing, se interpretaron los comandos recibidos para aplicar transformaciones visuales sobre un objeto 3D. Según la instrucción, el objeto rotaba o cambiaba de color dinámicamente.

### 🔹 Código relevante

A continuación se muestra el código principal en Python con los comentarios incluidos en el desarrollo:

```python
#Importar las librerías necesarias
import speech_recognition as  sr  #Esta librería se utiliza para el reconocimiento de voz.
import pyttsx3 #Esta librería se utiliza para convertir texto a voz.
import  pygame  #Esta librería se utiliza para crear la interfaz gráfica y manejar eventos.
import  sys  #Esta librería se utiliza para salir del programa.
import  math  # Librería para funciones trigonométricas

  

# Inicializar pygame para visualización
pygame.init()
screen = pygame.display.set_mode((400, 300))
pygame.display.set_caption("Reconocimiento de Voz - Taller 23") # Titulo de la ventana.

# Inicializar pyttsx3 (texto a voz)
engine = pyttsx3.init()

# Inicializar speech recognition
recognizer = sr.Recognizer()
mic = sr.Microphone()

 

#PARA COMANDOS EN ESPAÑOL:

COMMANDS = {
"rojo": (255, 0, 0),
"azul": (0, 0, 255),
"verde": (0, 255, 0),
"amarillo": (255, 255, 0),
"blanco": (255, 255, 255),
"negro": (0, 0, 0),
"salir": "exit"
}


COMMANDS.update({
"girar izquierda": "rotate_left",
"girar derecha": "rotate_right"

})

color_actual = (200, 200, 200) #Empezamos con un color gris claro.

angle = 0  # Ángulo de rotación del cubo
cube_size = 80
cube_center = (200, 150)

...
...
...
...

def  main():
	global  color_actual, angle

	# Dicemos el mensaje inicial
	speak("Hola, di un color para cambiar la pantalla o di salir para terminar.")
	  

	running = True

	while  running:
		
		for  event  in  pygame.event.get():
		if  event.type == pygame.QUIT:
			running = False
			comando = reconocer_comando()
		  

		# Comprobamos si el comando es válido
		if  comando  in  COMMANDS:

		accion = COMMANDS[comando]

		if  accion == "exit":
			speak("Hasta luego..")
			running = False

		elif  accion == "rotate_left":
			angle -= math.radians(15)
			speak("Girando a la izquierda")

		elif  accion == "rotate_right":

			angle += math.radians(15)
			speak("Girando a la derecha")

		else: # Cambiamos el color de la pantalla

			color_actual = accion
			speak(f"Color cambiado a {comando}")

		elif  comando  is  not  None: # Si el comando no es válido, se dice que no se reconoce ese comando.
			speak("Comando no reconocido")


	screen.fill(color_actual)
	draw_cube(screen, angle)
	pygame.display.flip()

	pygame.quit()
	sys.exit()
```


Ademas de esto, se adicionó el siguiente código para poder conectarse a processing:



```python
from pythonosc.udp_client import SimpleUDPClient

# Crear cliente OSC para enviar a Processing (Puerto 12000)
osc_client = SimpleUDPClient("127.0.0.1", 12000)

#SE ADICIONA ESTO EN EL MAIN
if comando in COMMANDS:
    accion = COMMANDS[comando]
    if accion == "exit":
        speak("Hasta luego..")
        running = False
    else:
        color_actual = accion
        speak(f"Color cambiado a {comando}")
        osc_client.send_message("/comando", comando)  # Enviar comando a Processing

```


El código de processing es el sigueinte:

```java

// Librerías para recibir mensajes OSC
import oscP5.*;
import netP5.*;

// Variables globales
OscP5 osc;
String comando = "";
color currentColor = color(200, 200, 200);  // Color inicial de fondo
float angulo = 0;  // Ángulo de rotación para el cubo

void setup() {
  size(600, 400, P3D);  // Ventana 3D
  osc = new OscP5(this, 12000);  // 📡 Iniciar receptor OSC en el puerto 12000 (debe coincidir con Python)
  println("Esperando comandos OSC en puerto 12000...");
}

void draw() {
  background(currentColor);  // Cambiar el color de fondo según el comando

  // Dibujar cubo 3D en el centro rotando
  pushMatrix();
  translate(width / 2, height / 2, 0);
  rotateY(angulo);
  rotateX(angulo * 0.5);
  fill(255);
  stroke(0);
  box(150);
  popMatrix();
}

// Manejar recepción de mensajes OSC
void oscEvent(OscMessage msg) {
  if (msg.checkAddrPattern("/comando")) {
    comando = msg.get(0).stringValue();  // Obtener el texto del comando
    println("Comando recibido:", comando);
    actualizarVisual(comando);  // Aplicar el efecto visual correspondiente
  }
}

// Aplicar efectos visuales según el comando recibido
void actualizarVisual(String cmd) {
  switch(cmd) {
    case "rojo":
      currentColor = color(255, 0, 0);
      break;
    case "azul":
      currentColor = color(0, 0, 255);
      break;
    case "verde":
      currentColor = color(0, 255, 0);
      break;
    case "amarillo":
      currentColor = color(255, 255, 0);
      break;
    case "blanco":
      currentColor = color(255);
      break;
    case "negro":
      currentColor = color(0);
      break;
    case "girar izquierda":
      angulo -= 0.2;
      break;
    case "girar derecha":
      angulo += 0.2;
      break;
  }
}


```





## 📊 Resultados Visuales

### Gif Implementación Python: 


![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-05-12_taller_reconocimiento_voz_local/python/pythonVoz.gif?raw=true)


### Gif Implementación con Processing: 

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-05-12_taller_reconocimiento_voz_local/processing/processingVoz.gif?raw=true)



### Video con sonido: 
https://youtu.be/itYNc8Qfmwk

----------

## 🧩 Prompts Usados

- Refactoriza este código: "".
- Cómo conecto este código de python con processing?
- Redáctame mejor este párrafo.
## 💬 Reflexión Final

Este taller me permitió integrar múltiples tecnologías en un flujo coherente: reconocimiento de voz, síntesis de voz, gráficos 2D y 3D, y comunicación en red. Reforcé conceptos de control interactivo y manejo de eventos, así como el protocolo OSC como puente entre diferentes entornos creativos.

La parte más interesante fue lograr una sincronización efectiva entre Python y Processing usando OSC. Fue retador manejar la precisión del reconocimiento de voz, sobre todo en ambientes con ruido. En el futuro, me gustaría aplicar esta misma arquitectura en Unity o en entornos VR, donde el control por voz puede tener aún más aplicaciones.

----------

## 👥 Integrantes

- Sebastián Muñoz → jumunozle@unal.edu.co
- Carlos Camacho → cacamacho@unal.edu.co  
- Juan Daniel Ramírez → juaramriezmo@unal.edu.co
- Cristian Medina → crmedinab@unal.edu.co 


## 👥 Contribuciones Grupales



-   Código de Python y Porcessing,  incluyendo:
    
    -   Reconocimiento de voz con `speech_recognition`
        
    -   Síntesis de voz con `pyttsx3`
        
    -   Visualización interactiva con `pygame`
        
    -   Envío de comandos OSC con `python-osc`
        
-   Comentarios explicativos en el código de Processing.
    

----------

## ✅ Checklist de Entrega

-   Carpeta `2025-05-12_taller_voz_osc/`
    
-   Código limpio y funcional
    
-   GIF incluido con nombre descriptivo
    
-   Visualización sincronizada entre entornos
    
-   README completo y claro
    
-   Commits descriptivos en inglés
