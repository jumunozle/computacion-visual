# 🧪 Escenas parametricas

## 📅 Fecha
2025-05-05
---

## 🎯 Objetivo del Taller

El objetivo de este taller es explorar la creación de figuras geométricas 3D (esferas, cubos, cilindros) en posiciones aleatorias en el espacio 3D, y luego exportarlas en formatos comunes como `.obj`, `.stl`, `.glb` utilizando herramientas como **vedo**, **trimesh** y **open3d**. Se busca trabajar con colores y transformaciones de las figuras de forma aleatoria, lo que permite una visualización variada de la escena generada.

---

## 🧠 Conceptos Aprendidos

- Generación de figuras 3D (esferas, cubos, cilindros) con posiciones aleatorias.
- Uso de bibliotecas como **vedo**, **trimesh**, y **open3d** para manipulación y exportación de mallas 3D.
- Pintura de mallas con colores aleatorios y exportación de escenas 3D en varios formatos.
- Aplicación de transformaciones (traslación, rotación) a objetos en el espacio 3D.

---

## 🔧 Herramientas y Entornos

- **Entorno**: Google Colab, Python
- **Bibliotecas**:
  - **vedo**: Para crear y visualizar objetos 3D.
  - **trimesh**: Para manipulación y exportación de mallas 3D.
  - **open3d**: Para operaciones avanzadas en geometría 3D y exportación a formatos 3d
  - React con Vite
- @react-three/fiber
- @react-three/drei
- Leva (panel de control)
- Navegador Web para visualización

---

## 📁 Estructura del Proyecto
```
2025-05-05_taller_escenas_parametricos/
├── python/
├── threejs/               
├── resultados/         
├── README.md
```
---

## 🧪 Implementación Python

### 🔹 Etapas realizadas
1. **Generación de puntos aleatorios** en el espacio 3D utilizando `numpy`.
2. **Creación de figuras geométricas** (esferas, cubos, cilindros) en esos puntos con tamaño, color y forma aleatoria.
3. **Aplicación de transformaciones** para colocar y colorear las figuras.
4. **Exportación** de la escena 3D generada a formatos `.obj`, `.stl`, `.glb` usando las bibliotecas mencionadas.

### 🔹 Código relevante

```python

# Paso 1: Crear puntos aleatorios
num_puntos = 10
puntos = np.random.uniform(-5, 5, size=(num_puntos, 3))

# Listas para cada sistema
objetos_vedo = []
trimesh_objs = []
open3d_meshes = []

# Colores aleatorios (R,G,B)
def color_rgb():
    return [random.random() for _ in range(3)]

# === EXPORTACIÓN ===
# vedo
from vedo import merge
merged = merge(objetos_vedo)
vedo.write(merged, "scene_vedo.gltf")  # .obj/.stl también válidos

# trimesh
scene_trimesh = trimesh.Scene(trimesh_objs)
scene_trimesh.export("scene_trimesh.glb")  # glTF soporta color

scene_o3d = open3d_meshes[0]
for m in open3d_meshes[1:]:
    scene_o3d += m
o3d.io.write_triangle_mesh("scene_open3d.obj", scene_o3d) 
```
--

## 📊 Resultados Visuales

![escenas_p_python_munoz](https://github.com/user-attachments/assets/69a741a0-d889-4403-8376-945646261d0a)

---

## 🧩 Prompts Usados

```text
Generar un conjunto de figuras 3D aleatorias (esferas, cubos, cilindros) con colores aleatorios en diferentes posiciones del espacio 3D.
```
---

## 🧪 Implementación Threejs

### 🔹 Etapas realizadas
1. Preparación del array de datos con tipos, posiciones, escalas y colores.
2. Creación del entorno 3D con cámara, luces y controles de órbita.
3. Uso de `map()` y condicionales para renderizar distintas geometrías.
4. Uso de Leva para modificar color, escala y rotación de los objetos.
5. Prueba de la interacción dinámica con sliders.

### 🔹 Código relevante

```jsx
 <Canvas camera={{ position: [5, 5, 5] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {globalParams.showAll &&
        objectsData.map((obj) => {
          const scale = cubeParams.scale * obj.scale;
          const rotationY = obj.rotationY * globalParams.rotationMultiplier;

          return (
            <mesh
              key={obj.id}
              position={obj.position}
              rotation={[0, rotationY, 0]}
              scale={scale}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={cubeParams.color || obj.color} />
            </mesh>
          );
        })}
    </Canvas>
```
--

## 📊 Resultados Visuales

![escenas_p_threejs_munoz](https://github.com/user-attachments/assets/b452ec2c-ccea-4345-b11a-d0214546661e)

---

## 🧩 Prompts Usados

```text
"Three.js con React Three Fiber: crear una escena y mapear un array de objetos 3D."

"Usar map() y condicionales para representar estructuras adaptativas."

"Usar leva para controlar los parámetros dinámicamente desde la interfaz."

"Quiero que giren todas cuando yo mueva la barra de rotación."
```
---
## 💬 Reflexión Final

Este taller me permitió explorar de manera práctica cómo generar escenas 3D aleatorias usando Python y bibliotecas como vedo, trimesh y open3d. Fue interesante ver cómo, a pesar de que las tres bibliotecas realizan tareas similares, cada una tiene sus propias ventajas para la visualización y exportación de datos 3D.

Lo más desafiante fue manejar las transformaciones de las mallas en diferentes entornos (vedos, trimesh, open3d) y asegurarme de que las figuras no se duplicaran en las exportaciones. A futuro, aplicaría este enfoque para crear visualizaciones más interactivas o para aplicaciones donde la creación de escenas 3D de manera dinámica sea necesaria.
---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-05-05_taller_escenas_parametricas`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---
