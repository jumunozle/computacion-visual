# 🧪 Importando el Mundo: Conversion de formatos 3d

## 📅 Fecha
2025-05-05

---

## 🎯 Objetivo del Taller

Explorar el manejo de modelos 3D en formatos `.OBJ`, `.STL`, y `.GLTF` usando Python y la librería `trimesh`. El objetivo principal es cargar modelos, compararlos en cuanto a geometría, visualizarlos y realizar una conversión directa a formato `.gltf` (no binario) utilizando `trimesh.exchange`.

---

## 🧠 Conceptos Aprendidos

- Carga de modelos 3D con `trimesh`.
- Análisis de vértices, caras, normales y duplicados.
- Visualización con `trimesh` y `open3d`.
- Conversión a formato `.gltf` (JSON).
- Escritura de archivos JSON exportados.

---

## 🔧 Herramientas y Entornos

- `Google Colab (Python 3)`
- `trimesh`
- `open3d`
- `numpy`
- `json`

---
```
## 📁 Estructura del Proyecto
2025-05-05_taller_conversion_formatos_3d/
├── python/
├── threejs/
├── resultados/
├── README.md
```
---

## 🧪 Implementación Python

### 🔹 Etapas realizadas
1. Carga de modelos `.obj`, `.stl`, `.gltf`.
2. Inspección de vértices, caras, normales y duplicados.
3. Visualización interactiva.
4. Conversión de cualquier formato a `.gltf`,etc.

### 🔹 Código relevante

```python
# Cargar modelo
mesh = trimesh.load("modelo.obj", force='mesh')

# Inspección
print(f"Vértices: {len(mesh.vertices)}")
print(f"Caras: {len(mesh.faces)}")
print(f"Normales: {'Sí' if mesh.vertex_normals is not None else 'No'}")
print(f"Duplicados: {'Sí' if len(mesh.vertices) != len(np.unique(mesh.vertices, axis=0)) else 'No'}")

# Usando trimesh.exchange
mesh_obj.export("convertido.gltf")      # A glTF (binario)
mesh_stl.export("convertido.obj")      # A OBJ
mesh_gltf.export("convertido.stl")     # A STL

```

--

## 📊 Resultados Visuales

![conversion_3d_python_munoz](https://github.com/user-attachments/assets/eca6b065-bbbe-4d28-a5c1-af26b23c54de)

---

## 🧩 Prompts Usados

```text
Cargar modelos en formatos .OBJ, .STL, .GLTF con trimesh 
Comparar cantidad de vértices, caras, normales, y si hay duplicados.
Visualizar cada modelo y sus propiedades.
Realizar conversiones entre formatos usando trimesh.exchange o assimp.
```
---

## 🧪 Implementación Threejs

### 🔹 Etapas realizadas
1. **Preparación de datos o escena**: Se prepararon los modelos 3D en los formatos `.OBJ`, `.STL` y `.GLTF` y se colocaron en la carpeta `public/models/`.
2. **Aplicación de modelo o algoritmo**: Se cargaron los modelos en React usando `useLoader` y `useGLTF` de React Three Fiber. Se implementó la funcionalidad para alternar entre los modelos.
3. **Visualización o interacción**: Se integraron los `OrbitControls` para permitir al usuario explorar los modelos 3D.
4. **Guardado de resultados**: Se generó un GIF  para mostrar los resultados visuales de la interacción.


### 🔹 Código relevante

```jsx
if (type === 'gltf') {
    const { scene } = useGLTF('/models/model.glb');
    return (
      <group scale={1} position={[0, 0, 0]}> 
      <primitive object={scene} scale={1} />;
      </group>
    );
  } 

  if (type === 'obj') {
    const obj = useLoader(OBJLoader, '/models/model.obj');
    return (
      <group scale={0.020} position={[0, 0, 0]}>
        <primitive object={obj} />
      </group>
    );
  }
  


  if (type === 'stl') {
    const geometry = useLoader(STLLoader, '/models/model.stl');
    return (
      <mesh geometry={geometry} scale={1}>
        <meshStandardMaterial color="default" metalness={0.2} roughness={0.5} />
      </mesh>
    );
  }
```

--

## 📊 Resultados Visuales

![conversion_3d_threejs_munoz](https://github.com/user-attachments/assets/e62c8984-cb74-467e-b07d-5f38c32b34d2)

---

## 💬 Reflexión Final

En este taller reforcé el conocimiento sobre estructuras de mallas 3D y cómo manipularlas desde Python usando trimesh. 
Fue complicado mostrar los modelos en pantalla, ya que no consegui mostrar a la totalidad las texturas de los modelos exportados.
---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-05-05_taller_conversion_formatos_3d`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---
