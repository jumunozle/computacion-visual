#Importar las librerías necesarias
from pythonosc.udp_client import SimpleUDPClient # Esta librería se utiliza para enviar mensajes OSC a través de UDP.

import speech_recognition as sr #Esta librería se utiliza para el reconocimiento de voz.
import pyttsx3 #Esta librería se utiliza para convertir texto a voz.
import pygame #Esta librería se utiliza para crear la interfaz gráfica y manejar eventos.
import sys #Esta librería se utiliza para salir del programa.
import math  # Librería para funciones trigonométricas



# Crear cliente OSC para enviar a Processing (Puerto 12000)
osc_client = SimpleUDPClient("127.0.0.1", 12000)

# Inicializar pygame para visualización
pygame.init()
screen = pygame.display.set_mode((400, 300))
pygame.display.set_caption("Reconocimiento de Voz - Taller 23") # Titulo de la ventana.

# Inicializar pyttsx3 (texto a voz)
engine = pyttsx3.init()

# Inicializar speech recognition
recognizer = sr.Recognizer()
mic = sr.Microphone()



# Comandos válidos

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

# Agregar comandos de rotación
COMMANDS.update({
    "girar izquierda": "rotate_left",
    "girar derecha": "rotate_right"
})

color_actual = (200, 200, 200) #Empezamos con un color gris claro.
#color_actual = (255, 0, 0)

angle = 0  # Ángulo de rotación del cubo
cube_size = 80
cube_center = (200, 150)

def speak(text): #Función para convertir texto a voz.
    engine.say(text)
    engine.runAndWait()

# Función para reconocer el comando de voz
def reconocer_comando():
    with mic as source: #Usamos el micrófono como fuente de audio.
        print("🎤 Escuchando...")
        recognizer.adjust_for_ambient_noise(source) #Ajustamos el ruido ambiental.
        audio = recognizer.listen(source)   #Escuchamos el audio.

    try:
        #comando = recognizer.recognize_google(audio) #Inglés
        comando = recognizer.recognize_google(audio, language="es-ES") #Español

        #nSphinx es un motor de reconocimiento de voz que funciona offline, pero requiere un modelo de lenguaje específico.
        #Usarlo de este modo no funcionó porque no se reconocia con claridad las palabras.

        #comando = recognizer.recognize_sphinx(audio) 
        #comando = recognizer.recognize_sphinx(audio, language='es-ES')
        print(f"🔍 Comando detectado: {comando}")
        return comando.lower()
    
    except sr.UnknownValueError: #Error si no se entiende el comando.
        print("❌ No se entendió.")
        speak("No entendí eso.")
        return None
    except sr.RequestError as e: #Error si hay un problema con el motor de reconocimiento.
        print(f"⚠️ Error con el motor de reconocimiento: {e}")
        return None

# Función para dibujar el cubo rotado en 2D
def draw_cube(surface, angle):
    cx, cy = cube_center
    size = cube_size

    offset = size / 2
    sin_a = math.sin(angle)
    cos_a = math.cos(angle)

    # Coordenadas base del cubo
    points = [
        (-offset, -offset),
        (offset, -offset),
        (offset, offset),
        (-offset, offset)
    ]

    # Transformar puntos frontales
    front = [(cx + x * cos_a - y * sin_a, cy + x * sin_a + y * cos_a) for x, y in points]

    # Fondo del cubo desplazado en x, y
    depth = 30
    back = [(x - depth, y - depth) for x, y in front]

    # Dibujar líneas
    for i in range(4):
        pygame.draw.line(surface, (0, 0, 0), front[i], front[(i + 1) % 4], 2) # Líneas frontales
        pygame.draw.line(surface, (0, 0, 0), back[i], back[(i + 1) % 4], 2) # Líneas traseras
        pygame.draw.line(surface, (0, 0, 0), front[i], back[i], 2)  # Líneas de conexión

def main():
    global color_actual, angle

    # Dicemos el mensaje inicial:
    speak("Hola, di un color para cambiar la pantalla o di salir para terminar.")

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        comando = reconocer_comando()

        # Comprobamos si el comando es válido
        if comando in COMMANDS:
            accion = COMMANDS[comando]
            if accion == "exit":
                speak("Hasta luego..")
                running = False
            elif accion == "rotate_left":
                angle -= math.radians(15)
                speak("Girando a la izquierda")
            elif accion == "rotate_right":
                angle += math.radians(15)
                speak("Girando a la derecha")
            else: # Cambiamos el color de la pantalla
                color_actual = accion
                speak(f"Color cambiado a {comando}")
            
            # Enviar comando OSC a Processing
            osc_client.send_message("/comando", comando)

        elif comando is not None: # Si el comando no es válido, se dice que no se reconoce ese comando.
            speak("Comando no reconocido")

        screen.fill(color_actual)
        draw_cube(screen, angle)
        pygame.display.flip()

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
