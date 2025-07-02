# 🧠 Taller - Realidad Aumentada Web con AR.js y Marcadores

📅 Fecha  

2025-06-04 – Fecha de asignación

2025-06-23 – Fecha de realización

2025-06-24 – Fecha de entrega


---

## 🎯 Objetivo

Implementar una experiencia de realidad aumentada en el navegador, usando marcadores con **AR.js** y **Three.js**, para proyectar un modelo 3D y activar animaciones al detectar un patrón visual.

---

## ⚙️ Herramientas Utilizadas

- AR.js v2.3.1 con A-Frame
- Three.js vía A-Frame
- Modelo `.glb` personalizado
- Marcador `hiro` o `.patt` generado

## 🧪 ¿Cómo funciona AR.js?

AR.js utiliza marcadores (`.patt`) para detectar patrones en la cámara del navegador. Cuando el patrón se reconoce:

- Se posiciona una escena 3D en ese lugar.
- Se pueden usar primitivas o modelos externos como `.glb`, `.gltf` o `.obj`.
- Todo ocurre en tiempo real, directamente en el navegador, sin necesidad de apps nativas.

---

## 🎞️ Demostración visual

🔽 GIF de la experiencia en acción:  
![GIF de la experiencia](./0628.gif)

---

## 🧩 Código relevante (`index.html`)

```html
<a-scene embedded arjs="sourceType: webcam;">
  <a-marker type="pattern" url="markers/marcador.patt">
    <a-entity gltf-model="models/modelo.glb"
              scale="0.5 0.5 0.5"
              position="0 0 0"
              rotation="0 180 0"
              animation="property: rotation; to: 0 360 0; loop: true; dur: 4000;">
    </a-entity>
  </a-marker>
  <a-entity camera></a-entity>
</a-scene>
```




## 📚 Entrega

```
2025-06-04_taller_arjs_realidad_aumentada_marcadores_web/
 └── index.html/
 └── 0628.gif/
 └── README.md 
```

---


## 👥 Integrantes

- Sebastián Muñoz → jumunozle@unal.edu.co
- Carlos Camacho → cacamacho@unal.edu.co  
- Juan Daniel Ramírez → juaramriezmo@unal.edu.co
- Sergio David López → slopezpa@unal.edu.co 


---


## Reflexión 

¿Qué limitaciones tiene la realidad aumentada basada en marcadores?
Requiere impresiones físicas o imágenes claras con buena iluminación.

No es robusta frente a movimiento rápido o ángulos extremos.

Solo funciona bien si hay una buena cámara y luz.


¿Cómo podría usarse esto en educación o arte?

👩‍🏫 En educación: mostrar moléculas 3D, mapas geográficos, piezas mecánicas.

🎨 En arte: activar esculturas digitales al detectar pósters, catálogos o flyers.

👨‍💻 En tecnología: crear tarjetas interactivas, portafolios con animaciones, etc.

