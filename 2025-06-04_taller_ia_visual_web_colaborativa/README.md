# Taller - IA Visual Colaborativa: Comparte tus Resultados en Web



### 📅 Fecha  

2025-06-04 – Fecha de asignación

2025-06-23 – Fecha de realización

2025-06-24 – Fecha de entrega


## 🎯 Objetivo del taller

Desarrollar una solución donde los resultados de un modelo visual de IA (detecciones, métricas o imágenes) puedan compartirse en una página web sencilla. Esto permite que otros usuarios o compañeros vean y comprendan visualmente qué fue detectado, cómo se comportó el sistema y qué resultados produjo.

---

## 🧠 Parte 1 - Captura y Exportación (Python)

Utilicé **MediaPipe** para detectar rostros en una imagen y generar:

- `deteccion.png`: imagen con la detección visual.
- `deteccion.json`: archivo con bounding boxes, clase (`face`) y confianza.
- Carpeta: `/resultados`

---

### 📸 Imagen procesada:
- Se utilizó una imagen estática (`persona.jpg`) ubicada en `resultados/`.
- Se exportaron las coordenadas del rostro detectado y se dibujó un rectángulo verde.

---

### 🧪 Herramientas utilizadas:
- `opencv-python`
- `mediapipe`
- `json`
- `datetime`
- `os`

---

## 🌐 Parte 2 - Visualización en Web (HTML + JS)

La visualización se realizó en `web/index.html`, mostrando:

- La imagen `deteccion.png`.
- Los datos cargados desde `deteccion.json`.
- Detecciones dibujadas directamente sobre el canvas.
- Las clases y confianzas como etiquetas flotantes.

## 👁️ Evidencia visual

### 🔹 GIF - Interfaz Web

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-06-04_taller_ia_visual_web_colaborativa/0625.gif?raw=true)


---


### Imagen Detección Persona

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-06-04_taller_ia_visual_web_colaborativa/resultados/deteccion.png?raw=true)



---

## 💾 Estructura del proyecto

```
2025-06-24_taller_ia_visual_web_colaborativa/
├── python/
│ └── exportar_deteccion.py
├── web/
│ ├── index.html
│ ├── script.js
│ └── style.css
├── resultados/
│ ├── persona.jpg
│ ├── deteccion.png
│ └── deteccion.json
├── 0625.gif
└── README.md
```

## 🔹 Fragmento de código relevante:

```python
# Leer imagen
image = cv2.imread(input_image_path)
if image is None:
    print(f"❌ No se pudo cargar la imagen en '{input_image_path}'")
    exit()

# Inicializar MediaPipe
mp_face = mp.solutions.face_detection
face_detection = mp_face.FaceDetection(model_selection=0, min_detection_confidence=0.5)

# Procesar detección
rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
results = face_detection.process(rgb)

# Datos a exportar
export_data = {
    "timestamp": datetime.now().isoformat(),
    "objects": []
}

# Dibujar detecciones y recolectar datos
if results.detections:
    for detection in results.detections:
        bbox = detection.location_data.relative_bounding_box
        ih, iw, _ = image.shape
        x = int(bbox.xmin * iw)
        y = int(bbox.ymin * ih)
        w = int(bbox.width * iw)
        h = int(bbox.height * ih)
        conf = float(detection.score[0])

        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

        export_data["objects"].append({
            "class": "face",
            "confidence": round(conf, 2),
            "x": x,
            "y": y,
            "w": w,
            "h": h
        })

```

--- 

## 👥 Integrantes

- Sebastián Muñoz → jumunozle@unal.edu.co
- Carlos Camacho → cacamacho@unal.edu.co  
- Juan Daniel Ramírez → juaramriezmo@unal.edu.co
- Sergio David López → slopezpa@unal.edu.co 

---

## Reflexión
Compartir visualmente los resultados ayuda enormemente a validar el funcionamiento del modelo, comunicar los hallazgos y fomentar la colaboración entre desarrolladores y usuarios. Tener una interfaz sencilla pero clara permite que cualquier persona entienda qué está pasando, incluso sin saber programar.

✅ Criterios cumplidos

✅ Captura funcional y exportación desde Python.

✅ Visualización clara con imagen y JSON.

✅ Web simple y navegable.

✅ Código modular y comentado.

✅ Evidencias visuales (GIF incluido).

✅ README completo.
