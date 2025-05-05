# 🧪 Taller: Análisis y Conversión de Modelos 3D con Trimesh

## 📅 Fecha
2025-05-04

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

- Google Colab (Python 3)
- `trimesh`
- `open3d`
- `numpy`
- `json`

---

## 📁 Estructura del Proyecto
2025-05-05_taller_trimesh_gltf/
├── entorno/ # colab/
├── datos/ # modelo.obj, modelo.stl, modelo.gltf
├── resultados/ # modelo_convertido.gltf, capturas
├── README.md

---

## 🧪 Implementación Python

### 🔹 Etapas realizadas
1. Carga de modelos `.obj`, `.stl`, `.gltf`.
2. Inspección de vértices, caras, normales y duplicados.
3. Visualización interactiva.
4. Conversión de cualquier formato a `.gltf`,etc.

### 🔹 Código relevante

```python
import trimesh
import numpy as np
import json
import open3d as o3d

# Cargar modelo
mesh = trimesh.load("modelo.obj", force='mesh')

# Inspección
print(f"Vértices: {len(mesh.vertices)}")
print(f"Caras: {len(mesh.faces)}")
print(f"Normales: {'Sí' if mesh.vertex_normals is not None else 'No'}")
print(f"Duplicados: {'Sí' if len(mesh.vertices) != len(np.unique(mesh.vertices, axis=0)) else 'No'}")

# Visualización
mesh.show()

# Conversión a GLTF (.gltf, no binario)
gltf_dict = trimesh.exchange.gltf.export_gltf(mesh)
with open("modelo_convertido.gltf", "w") as f:
    json.dump(gltf_dict, f)

```

--

## 📊 Resultados Visuales

### 📌 Este taller **requiere explícitamente un GIF animado**:


---

## 🧩 Prompts Usados

``text
Cargar modelos en formatos .OBJ, .STL, .GLTF con trimesh 
Comparar cantidad de vértices, caras, normales, y si hay duplicados.
Visualizar cada modelo y sus propiedades.
Realizar conversiones entre formatos usando trimesh.exchange o assimp.
``
---

## 🧪 Implementación Threejs

### 🔹 Etapas realizadas
1. **Preparación de datos o escena**: Se prepararon los modelos 3D en los formatos `.OBJ`, `.STL` y `.GLTF` y se colocaron en la carpeta `public/models/`.
2. **Aplicación de modelo o algoritmo**: Se cargaron los modelos en React usando `useLoader` y `useGLTF` de React Three Fiber. Se implementó la funcionalidad para alternar entre los modelos.
3. **Visualización o interacción**: Se integraron los `OrbitControls` para permitir al usuario explorar los modelos 3D.
4. **Guardado de resultados**: Se generó un GIF o captura de pantalla para mostrar los resultados visuales de la interacción.


### 🔹 Código relevante

```jsx
// App.jsx
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelSwitcher from './ModelSwitcher';

export default function App() {
  const [selectedModel, setSelectedModel] = useState('gltf');

  return (
    <>
      <div style={{ position: 'absolute', zIndex: 1, padding: 10 }}>
        <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
          <option value="gltf">GLTF</option>
          <option value="obj">OBJ</option>
          <option value="stl">STL</option>
        </select>
      </div>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <ModelSwitcher type={selectedModel} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
}
```

--

## 📊 Resultados Visuales

### 📌 Este taller **requiere explícitamente un GIF animado**:


---

## 🧩 Prompts Usados

``text
Genera un modelo 3D de una esfera, una silla y un automóvil en formato GLTF, OBJ y STL.
``
---

## 💬 Reflexión Final

En este taller reforcé el conocimiento sobre estructuras de mallas 3D y cómo manipularlas desde Python usando trimesh. La conversión entre formatos, especialmente al .gltf, fue interesante porque implicó entender cómo trimesh.exchange.gltf genera un diccionario JSON que debe serializarse correctamente.

Lo más complejo fue garantizar que el archivo .gltf se guarde correctamente en formato JSON textual y no binario. En el futuro, aplicaría esta técnica para preparar modelos ligeros y compatibles para entornos WebGL (como Three.js), y automatizar la conversión en pipelines de visualización 3D.
---

## ✅ Checklist de Entrega

- [x] Carpeta `2025-05-05_taller_conversion_formatos_3d`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---
