# 🧪 Nombre del Taller

**Construyendo el mundo 3D**

## 📅 Fecha
2025-05-05 

---

## 🎯 Objetivo del Taller

Explorar la visualización dinámica de estructuras geométricas 3D mediante React Three Fiber y Colab, cargando un modelo y ofreciendo representaciones visuales de vértices, aristas y caras. El objetivo es construir una herramienta interactiva que permita alternar entre vistas y entender la geometría interna de un modelo 3D.


---

## 🧠 Conceptos Aprendidos

- Uso de React Three Fiber para renderizado WebGL.
- Carga y visualización de modelos `.glb` usando `useGLTF`.
- Representación de geometría: puntos (`Points`), aristas (`Edges`, `Wireframe`), caras (`StandardMaterial`).
- Control de cámara con `OrbitControls`.
- Creación de interfaz con `leva` para interacción en tiempo real.
- Estructura de geometría en buffer: vértices, índices, normales.

---

## 🔧 Herramientas y Entornos

- **Three.js / React Three Fiber**
- **@react-three/drei**
- **Leva (UI sliders/buttons)**
- **Vite + React 18**
- **GLTF Loader**
- **Navegador moderno (WebGL2)**
- **Google Colab**
- **Python 3**
- **Bibliotecas:**
  - `vedo`
  - `trimesh`
  - `imageio`
  - `ipywidgets`
  - `numpy`

---

## 📁 Estructura del Proyecto

```
2025-05-05_taller_estructuras_3d/
├── threejs/
├── threejs/
├── README.md
```


---

## 🧪 Implementación Threejs

### 🔹 Etapas realizadas
1. Preparación de escena con cámara, luces y modelo `.glb` ubicado en `/public`.
2. Implementación de componente `ModelViewer` que interpreta `mode` para mostrar puntos, aristas o caras.
3. Integración de controles con `leva` para cambiar la vista en tiempo real.
4. Exportación de resultados visuales como GIFs animados.

### 🔹 Código relevante

```jsx
<Canvas camera={{ position: [0, 0, 5] }}>
  <ambientLight />
  <Suspense fallback={null}>
    <ModelViewer mode={mode} />
  </Suspense>
  <OrbitControls />
</Canvas>
```

---

## 📊 Resultados Visuales




---

## 🧩 Prompts Usados

Enumera los prompts utilizados:

```text
Ayudame Crear un proyecto con Vite y React Three Fiber.
-Necesito cargar un modelo 3D en formato .OBJ, .STL o .GLTF usando @react-three/drei.
-Necesito visualizar el modelo con OrbitControls.
-Necesito resaltar vértices, aristas o caras usando efectos visuales como líneas (Edges, Wireframe) o puntos (Points).
```

---

## 🧪 Implementación Colab

### 🔹 Etapas realizadas
1. Carga del archivo `.OBJ` y análisis estructural con `trimesh`.
2. Visualización en Colab de vértices, aristas, caras y combinación usando `vedo`.
3. Interfaz interactiva con `ipywidgets` para cambiar el modo de visualización.
4. Renderizado de múltiples vistas rotadas y generación de `.GIF` con `imageio`.

### 🔹 Código relevante

```python
# Generación de animación rotatoria usando vedo + imageio
def generar_gif(nombre, objetos, n_frames=36):
    plotter = vedo.Plotter(offscreen=True, size=(600, 600))
    plotter.show(*objetos, axes=0, interactive=False)
    
    imgs = []
    for i in range(n_frames):
        plotter.camera.Azimuth(360 / n_frames)
        plotter.show(*objetos, resetcam=False)
        img = plotter.screenshot(asarray=True)
        imgs.append(img)

    gif_path = f"/content/rotacion_{nombre}.gif"
    imageio.mimsave(gif_path, imgs, duration=0.05)
    plotter.close()
    return gif_path
```

---

## 📊 Resultados Visuales




---

## 🧩 Prompts Usados

```text
Ayudame a cargar modelos .OBJ usando trimesh o vedo.
-Visualizar malla 3D con colores distintos para vértices, aristas y caras.
-Mostrar información estructural del modelo: número de vértices, aristas y caras.
-Opcional: Poder rotar la malla

Como hago para cambiar entre visualizacion de vertices, aristas y caras?

Necesito generar una animacion de la rotacion .gif de la malla en cada visualizacion con imageIO

```

---

## 💬 Reflexión Final

Este taller me permitió aplicar técnicas de visualización 3D en un entorno limitado como Google Colab, superando las restricciones típicas mediante el uso de renderizado offscreen y exportación de imágenes. Reforcé el uso de bibliotecas como vedo y aprendí cómo manipular la cámara para crear animaciones rotatorias fluidas.

La parte más interesante fue generar los .GIFs directamente desde múltiples capturas y controlar el renderizado manual de cada frame.

Tambien me permitió comprender cómo manipular estructuras de geometría en tiempo real usando Three.js y su integración con React a través de React Three Fiber. Aprendí a trabajar con distintos tipos de visualización de modelos 3D, lo cual es clave para inspección de geometría y prototipos interactivos.

Lo más desafiante fue identificar cómo extraer correctamente la geometría de un modelo .glb y adaptarla a diferentes visualizaciones (puntos, bordes, caras). La interfaz con leva facilitó el control dinámico y realzó la experiencia de usuario. En futuros proyectos aplicaría esta base para permitir interacción más compleja, como selección de vértices o exportación de vistas personalizadas.

---


## ✅ Checklist de Entrega

- [x] Carpeta `2025-05-05_taller_estructuras_3d`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---