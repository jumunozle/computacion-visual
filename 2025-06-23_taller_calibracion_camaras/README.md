# Taller 68 – Calibración de Cámaras (Una y Dos Cámaras) con Python

📅 Fecha  
2025-06-23

---

## 🎯 Objetivo del Taller

Aprender los fundamentos de la calibración de cámaras en visión por computador utilizando imágenes de tableros de ajedrez. El objetivo es obtener los parámetros intrínsecos y extrínsecos de una o dos cámaras, lo cual es fundamental para tareas de reconstrucción 3D, visión estéreo y realidad aumentada.

---

## 🧠 Conceptos Aprendidos

- Transformaciones geométricas (rotación, traslación)
- Estimación de parámetros intrínsecos y extrínsecos
- Reproyección de puntos 3D
- Rectificación estéreo
- Estimación de profundidad y baseline
-  Validación con error de reproyección

---

## 🔧 Herramientas y Entornos

- Python (opencv-python)
- Jupyter / Google Colab  

---

## 📁 Estructura del Proyecto

```
2025-06-22_taller_calibracion_camaras/
├── python/
├── resultados/
├── README.md
```

---

## 🧪 Implementación

### 🔹 Etapas realizadas

**Parte 1 – Calibración de una cámara**
1. Descarga de imágenes monoculares desde diferentes ángulos.
2. Detección de esquinas con `cv2.findChessboardCorners`.
3. Estimación de la matriz de cámara y coeficientes de distorsión con `cv2.calibrateCamera`.
4. Validación mediante reproyección con `cv2.projectPoints`.
5. Visualización de esquinas detectadas vs reproyectadas.

**Parte 2 – Calibración estéreo**
1. Detección de esquinas en pares de imágenes (izquierda-derecha).
2. Estimación de rotación y traslación entre cámaras con `cv2.stereoCalibrate`.
3. Rectificación estéreo con `cv2.stereoRectify`.
4. Visualización de rectificación con líneas horizontales.

### 🔹 Código relevante

```python
pattern_size = (9, 6)
square_size = 0.025  # metros
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)

objp = np.zeros((pattern_size[0]*pattern_size[1], 3), np.float32)
objp[:, :2] = np.mgrid[0:pattern_size[0], 0:pattern_size[1]].T.reshape(-1, 2)
objp *= square_size

objpoints = []
imgpoints = []

images = sorted(os.listdir("cam1"))

for fname in images:
    img = cv2.imread(os.path.join("cam1", fname))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, corners = cv2.findChessboardCorners(gray, pattern_size, None)
    if ret:
        corners2 = cv2.cornerSubPix(gray, corners, (11, 11), (-1, -1), criteria)
        imgpoints.append(corners2)
        objpoints.append(objp)
        # Mostrar esquinas
        img = cv2.drawChessboardCorners(img, pattern_size, corners2, ret)
        plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        plt.title(fname)
        plt.axis("off")
        plt.show()

ret, mtx, dist, rvecs, tvecs = cv2.calibrateCamera(objpoints, imgpoints, gray.shape[::-1], None, None)
# Validación: reproyección de los puntos
total_error = 0
for i in range(len(objpoints)):
    imgpoints_proj, _ = cv2.projectPoints(objpoints[i], rvecs[i], tvecs[i], mtx, dist)
    error = cv2.norm(imgpoints[i], imgpoints_proj, cv2.NORM_L2) / len(imgpoints_proj)
    total_error += error

```
```python
# Obtener puntos de ambas cámaras
imgpoints1 = []
imgpoints2 = []
objpoints_stereo = []

left_images = sorted([f for f in os.listdir("cam1") if "left" in f])
right_images = sorted([f for f in os.listdir("cam2") if "right" in f])

for lf, rf in zip(left_images, right_images):
    imgL = cv2.imread(f"cam1/{lf}")
    imgR = cv2.imread(f"cam2/{rf}")
    grayL = cv2.cvtColor(imgL, cv2.COLOR_BGR2GRAY)
    grayR = cv2.cvtColor(imgR, cv2.COLOR_BGR2GRAY)

    retL, cornersL = cv2.findChessboardCorners(grayL, pattern_size, None)
    retR, cornersR = cv2.findChessboardCorners(grayR, pattern_size, None)

    if retL and retR:
        cornersL2 = cv2.cornerSubPix(grayL, cornersL, (11, 11), (-1, -1), criteria)
        cornersR2 = cv2.cornerSubPix(grayR, cornersR, (11, 11), (-1, -1), criteria)
        objpoints_stereo.append(objp)
        imgpoints1.append(cornersL2)
        imgpoints2.append(cornersR2)

# Calibración estéreo
flags = cv2.CALIB_FIX_INTRINSIC
ret, _, _, _, _, R, T, E, F = cv2.stereoCalibrate(
    objpoints_stereo, imgpoints1, imgpoints2,
    mtx, dist, mtx, dist, grayL.shape[::-1],
    criteria=criteria, flags=flags)
```
---

## 📊 Resultados Visuales

---

## 🧩 Prompts Usados

"Explícame cómo hacer la calibración de una cámara con OpenCV y Python."


"¿Cómo se hace la calibración estéreo con dos cámaras usando Python?"

"¿Cómo valido que la calibración está bien hecha?"

---

## 💬 Reflexión Final
Este taller permitió entender en profundidad cómo se obtienen los parámetros intrínsecos de una cámara y cómo validar que son correctos mediante reproyección. La calibración monocular fue relativamente sencilla usando imágenes desde distintos ángulos. Uno de los aspectos más interesantes fue ver cómo las reproyecciones encajaban perfectamente sobre las esquinas reales, validando el modelo.

En contraste, la calibración estéreo implicó un nivel mayor de precisión: detectar correctamente esquinas en pares sincronizados, resolver la geometría relativa entre cámaras y aplicar rectificación. Ver las imágenes alineadas tras la rectificación fue una validación visual clara del proceso. Estos conceptos son claves para aplicaciones como visión estéreo, reconstrucción 3D y realidad aumentada, donde conocer con precisión la geometría de las cámaras es indispensable.

---

## 👥 Contribuciones al Taller

Programación del notebook en Google Colab

Descarga automática de imágenes públicas de calibración

Visualización de resultados y reproyecciones

Generación del README.md y documentación

## 👥 Integrantes
Sebastián Muñoz → jumunozle@unal.edu.co

Carlos Camacho → cacamacho@unal.edu.co

Juan Daniel Ramírez → juaramriezmo@unal.edu.co

Cristian Medina → crmedinab@unal.edu.co

---

## ✅ Checklist de entrega 

✅ Criterios de Evaluación

✅ Detección correcta del patrón en las imágenes

✅ Generación de parámetros de calibración

✅ Validación visual del resultado (reproyección / alineación)

✅ Comparación entre calibración simple y estéreo

✅ README explicativo, con imágenes

✅ Organización clara del proyecto y entregables
