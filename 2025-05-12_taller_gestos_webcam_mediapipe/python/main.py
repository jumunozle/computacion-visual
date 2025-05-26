import cv2
import mediapipe as mp
import numpy as np

# Inicialización de MediaPipe Hands
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(max_num_hands=2, min_detection_confidence=0.5, min_tracking_confidence=0.5)

# Inicializa captura de video desde webcam
cap = cv2.VideoCapture(0)

# Escena actual
scene_id = 0
total_scenes = 5
menu_selected = False  # Para evitar múltiples selecciones seguidas


# Función para contar dedos levantados (pulgar + 4 dedos)
def count_fingers(hand_landmarks):
    fingers = []
    # Pulgar: compara x del dedo 4 con el 3 (especial porque está de lado)
    if hand_landmarks.landmark[4].x < hand_landmarks.landmark[3].x:
        fingers.append(1)
    else:
        fingers.append(0)

    # Otros dedos: compara y del tip con la articulación previa
    for tip_id in [8, 12, 16, 20]:
        if hand_landmarks.landmark[tip_id].y < hand_landmarks.landmark[tip_id - 2].y:
            fingers.append(1)
        else:
            fingers.append(0)

    return sum(fingers)


# Detecta en qué sección vertical del menú se encuentra el dedo
def detect_menu_selection(y, height):
    if y < height // 4:
        return 1
    elif y < height // 2:
        return 2
    elif y < 3 * height // 4:
        return 3
    elif y < height:
        return 4
    else:
        return None


# Detecta si el dedo está sobre el botón de volver
def is_finger_on_button(ix, iy):
    return 10 < ix < 90 and 10 < iy < 60


# Bucle principal de captura de video
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.flip(frame, 1)  # Espejo horizontal
    height, width, _ = frame.shape
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb)

    finger_count = 0
    if results.multi_hand_landmarks:
        finger_count = count_fingers(results.multi_hand_landmarks[0])

    # Escena 0: Pantalla de inicio, muestra ambas manos para comenzar
    if scene_id == 0:
        frame[:] = (20, 20, 20)
        if results.multi_hand_landmarks:
            total_fingers = sum(count_fingers(h) for h in results.multi_hand_landmarks)
            for h in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(frame, h, mp_hands.HAND_CONNECTIONS)
            if total_fingers >= 9:  # Al menos 9 dedos para pasar
                scene_id = 1
        cv2.putText(frame, "Muestra ambas manos para empezar", (40, height // 2),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)
        cv2.imshow("Gesture Control", frame)
        if cv2.waitKey(1) & 0xFF == 27:
            break
        continue

    # Escena 1: Menú de selección de escena
    if scene_id == 1:
        cv2.putText(frame, "Selecciona la escena:", (20, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 0), 2)

        # Dibuja menú en el lado derecho
        menu_width = 150
        cv2.rectangle(frame, (width - menu_width, 0), (width, height), (255, 255, 255), -1)
        options = ["Escena 1", "Escena 2", "Escena 3", "Escena 4"]
        for i, text in enumerate(options):
            y = (i + 0.5) * height // len(options)
            cv2.putText(frame, text, (width - menu_width + 10, int(y)),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 2)

        # Detecta si el dedo índice selecciona una escena
        if results.multi_hand_landmarks:
            hand = results.multi_hand_landmarks[0]
            mp_drawing.draw_landmarks(frame, hand, mp_hands.HAND_CONNECTIONS)
            ix = int(hand.landmark[8].x * width)
            iy = int(hand.landmark[8].y * height)
            cv2.circle(frame, (ix, iy), 10, (255, 0, 0), -1)

            if ix > width - menu_width:
                selection = detect_menu_selection(iy, height)
                if selection and not menu_selected:
                    scene_id = selection + 1  # Escena 2–5
                    menu_selected = True
            else:
                menu_selected = False

    else:
        # Escena 2: Fondo cambia según cantidad de dedos levantados
        if scene_id == 2:
            finger_count = 0
            if results.multi_hand_landmarks:
                hand = results.multi_hand_landmarks[0]
                finger_count = count_fingers(hand)

            # Colores según número de dedos
            colores = {
                0: (50, 50, 50),
                1: (0, 0, 255),
                2: (0, 128, 255),
                3: (0, 255, 255),
                4: (0, 255, 0),
                5: (255, 255, 255)
            }
            color_fondo = colores.get(finger_count, (30, 30, 30))
            frame[:] = color_fondo

            if results.multi_hand_landmarks:
                hand = results.multi_hand_landmarks[0]
                mp_drawing.draw_landmarks(frame, hand, mp_hands.HAND_CONNECTIONS)

            # Texto informativo
            cv2.putText(frame, "Escena 1: Fondo cambia por dedos", (30, 100),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 0), 2)
            cv2.putText(frame, f"Dedos extendidos: {finger_count}", (30, 150),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 0), 2)

        # Escena 3: Dedo índice mueve un círculo
        elif scene_id == 3:
            frame[:] = (30, 30, 30)
            cv2.putText(frame, "Escena 2: Mover circulo con indice", (30, 100),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)

            if results.multi_hand_landmarks:
                hand = results.multi_hand_landmarks[0]
                mp_drawing.draw_landmarks(frame, hand, mp_hands.HAND_CONNECTIONS)
                ix = int(hand.landmark[8].x * width)
                iy = int(hand.landmark[8].y * height)
                cv2.circle(frame, (ix, iy), 30, (0, 255, 255), -1)

        # Escena 4: Detectar gesto de pellizco (índice y pulgar)
        elif scene_id == 4:
            frame[:] = (30, 30, 30)
            cv2.putText(frame, "Escena 3: Acerca indice y pulgar", (20, 100),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)

            if results.multi_hand_landmarks:
                hand = results.multi_hand_landmarks[0]
                mp_drawing.draw_landmarks(frame, hand, mp_hands.HAND_CONNECTIONS)
                thumb_tip = hand.landmark[4]
                index_tip = hand.landmark[8]
                dist = np.linalg.norm(
                    np.array([thumb_tip.x, thumb_tip.y]) - np.array([index_tip.x, index_tip.y])
                ) * width

                # Si están cerca, cambia el fondo y muestra mensaje
                if dist < 40:
                    frame[:] = (255, 0, 255)
                    cv2.putText(frame, "Bien hecho!", (30, 140),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)

        # Escena 5: Juego de atrapar el cuadrado con el dedo
        elif scene_id == 5:
            if 'score' not in globals():
                score = 0
                target_pos = (np.random.randint(100, width - 100), np.random.randint(100, height - 100))

            frame[:] = (20, 20, 50)
            cv2.putText(frame, "Escena 4: Atrapa el cuadrado con el dedo", (30, 80),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, (200, 200, 200), 2)
            cv2.putText(frame, f"Puntaje: {score}", (30, 130),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)

            # Dibujar cuadrado objetivo
            cx, cy = target_pos
            cv2.rectangle(frame, (cx - 25, cy - 25), (cx + 25, cy + 25), (0, 255, 0), -1)

            if results.multi_hand_landmarks:
                hand = results.multi_hand_landmarks[0]
                mp_drawing.draw_landmarks(frame, hand, mp_hands.HAND_CONNECTIONS)

                # Posición del índice
                ix = int(hand.landmark[8].x * width)
                iy = int(hand.landmark[8].y * height)
                cv2.circle(frame, (ix, iy), 10, (255, 0, 0), -1)

                # Detecta si toca el cuadrado
                if cx - 25 < ix < cx + 25 and cy - 25 < iy < cy + 25:
                    score += 1
                    target_pos = (np.random.randint(100, width - 100), np.random.randint(100, height - 100))

            # Botón para volver al menú
            cv2.rectangle(frame, (10, 10), (90, 60), (0, 0, 0), -1)
            cv2.putText(frame, "<-", (20, 45), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 255, 255), 3)

            # Si el dedo está en el botón, volver al menú y reiniciar score
            if results.multi_hand_landmarks:
                hand = results.multi_hand_landmarks[0]
                ix = int(hand.landmark[8].x * width)
                iy = int(hand.landmark[8].y * height)
                if is_finger_on_button(ix, iy):
                    scene_id = 1
                    del score
                    del target_pos
                    continue

        # Botón de regresar para cualquier escena
        cv2.rectangle(frame, (10, 10), (90, 60), (0, 0, 0), -1)
        cv2.putText(frame, "<-", (20, 45), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 255, 255), 3)

        if results.multi_hand_landmarks:
            hand = results.multi_hand_landmarks[0]
            ix = int(hand.landmark[8].x * width)
            iy = int(hand.landmark[8].y * height)
            cv2.circle(frame, (ix, iy), 10, (255, 0, 0), -1)
            if is_finger_on_button(ix, iy):
                scene_id = 1
                continue

    # Texto que muestra la escena actual
    cv2.putText(frame, f"Scene: {scene_id}", (10, height - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (150, 150, 150), 2)

    # Mostrar el frame
    cv2.imshow("Gesture Control", frame)
    if cv2.waitKey(1) & 0xFF == 27:
        break  # Salir con ESC

# Liberar recursos
cap.release()
cv2.destroyAllWindows()
