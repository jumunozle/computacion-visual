import cv2
import mediapipe as mp
import numpy as np
import speech_recognition as sr
import threading
import datetime
import os

# --- Configuración inicial ---
drawing = False
color = (0, 0, 255)  # Rojo
canvas = np.ones((480, 640, 3), dtype=np.uint8) * 255

# --- Crear carpeta obras si no existe ---
output_folder = "../obras"
os.makedirs(output_folder, exist_ok=True)

# --- Inicializar MediaPipe y reconocimiento de manos ---
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1)
mp_drawing = mp.solutions.drawing_utils

# --- Reconocedor de voz ---
recognizer = sr.Recognizer()

# --- Cambia el color según comando ---
def cambiar_color(comando):
    global color, canvas
    comando = comando.lower()
    if "rojo" in comando:
        color = (0, 0, 255)
    elif "verde" in comando:
        color = (0, 255, 0)
    elif "azul" in comando:
        color = (255, 0, 0)
    elif "limpiar" in comando:
        canvas[:] = 255
    elif "guardar" in comando:
        filename = datetime.datetime.now().strftime("obra_%Y%m%d_%H%M%S.png")
        cv2.imwrite(os.path.join(output_folder, filename), canvas)
        print(f"[✔] Obra guardada como {filename}")

# --- Función para escuchar comandos por voz en segundo plano ---
def escuchar_voz():
    global color
    while True:
        try:
            with sr.Microphone() as source:
                print("[🎤] Escuchando comando de voz...")
                audio = recognizer.listen(source, timeout=5)
                comando = recognizer.recognize_google(audio, language="es-ES")
                print(f"[🔈] Comando reconocido: {comando}")
                cambiar_color(comando)
        except Exception as e:
            pass  # Ignorar errores para mantener el loop

# --- Hilo para reconocimiento de voz ---
threading.Thread(target=escuchar_voz, daemon=True).start()

# --- Webcam principal ---
cap = cv2.VideoCapture(0)
prev_x, prev_y = None, None

while True:
    ret, frame = cap.read()
    if not ret:
        break
    frame = cv2.flip(frame, 1)
    h, w, _ = frame.shape
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Detección de manos
    result = hands.process(rgb)
    if result.multi_hand_landmarks:
        for hand in result.multi_hand_landmarks:
            index_finger = hand.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
            x, y = int(index_finger.x * w), int(index_finger.y * h)

            # Dibujo continuo
            if prev_x is not None and prev_y is not None:
                cv2.line(canvas, (prev_x, prev_y), (x, y), color, 5)
            prev_x, prev_y = x, y

            # Dibujar la mano sobre el frame
            mp_drawing.draw_landmarks(frame, hand, mp_hands.HAND_CONNECTIONS)
    else:
        prev_x, prev_y = None, None

    # Fusionar lienzo y frame
    combo = cv2.addWeighted(frame, 0.5, canvas, 0.5, 0)

    # Mostrar color activo
    cv2.rectangle(combo, (10, 10), (60, 60), color, -1)
    cv2.putText(combo, "Presiona 'q' para salir", (70, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,0,0), 2)

    cv2.imshow("🎨 Pintura Interactiva", combo)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break


cap.release()
cv2.destroyAllWindows()
