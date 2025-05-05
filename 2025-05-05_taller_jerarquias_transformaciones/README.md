# 🧪 Taller
Transformaciones Jerárquicas con React Three Fiber

## 📅 Fecha
2025-05-05

---

## 🎯 Objetivo del Taller

Aplicar estructuras jerárquicas y árboles de transformación para organizar escenas y simular movimiento relativo entre objetos. Se busca comprender cómo las transformaciones afectan a los nodos hijos en una estructura padre-hijo y cómo visualizar estos efectos en tiempo real con control interactivo.

---

## 🧠 Conceptos Aprendidos

- Jerarquía de objetos 3D (padre-hijo-nieto)
- Transformaciones relativas (rotación y traslación)
- Visualización interactiva con `leva`
- Uso de `React Three Fiber` para manipular escenas 3D
- Encadenamiento de transformaciones en tiempo real

---

## 🔧 Herramientas y Entornos

- Vite
- React Three Fiber (`@react-three/fiber`)
- Drei (`@react-three/drei`)
- Leva (`leva`)
- Navegador web (Chrome/Firefox)
- Editor de código (VS Code)

---

## 📁 Estructura del Proyecto

2025-05-05_taller_jerarquias_transformaciones/
├── threejs
├── resultados
├── README.md

---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. Configuración de proyecto con Vite y React Three Fiber.
2. Creación de jerarquía padre → hijo → nieto usando `<group>`.
3. Aplicación de transformaciones dinámicas (rotación y traslación) al grupo padre.
4. Visualización interactiva con sliders usando `leva`.

### 🔹 Código relevante

```jsx
// Scene.jsx
import { useControls } from 'leva'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Scene() {
  const parentRef = useRef()
  const childRef = useRef()
  const grandChildRef = useRef()

  const { posX, posY, rotY, rotX } = useControls('Parent Transform', {
    posX: { value: 0, min: -5, max: 5, step: 0.1 },
    posY: { value: 0, min: -5, max: 5, step: 0.1 },
    rotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  })

  useFrame(() => {
    parentRef.current.rotation.set(rotX, rotY, 0)
    parentRef.current.position.set(posX, posY, 0)
  })

  return (
    <group ref={parentRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <group ref={childRef} position={[2, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="skyblue" />
        </mesh>
        <group ref={grandChildRef} position={[1.5, 0, 0]}>
          <mesh>
            <coneGeometry args={[0.3, 1, 16]} />
            <meshStandardMaterial color="pink" />
          </mesh>
        </group>
      </group>
    </group>
  )
}
```

---

## 📊 Resultados Visuales

![jerarquias_munoz](https://github.com/user-attachments/assets/d7a59fa7-0f04-425a-892f-418f36eaa334)

---

## 🧩 Prompts Usados

```text
"Crear una escena en React Three Fiber con una jerarquía padre-hijo-nieto"

"Controlar transformaciones en tiempo real con leva"

"Simular rotación y traslación encadenadas en 3D"
```

---

## 💬 Reflexión Final

Este taller me ayudó a comprender cómo las transformaciones en 3D no son absolutas, sino relativas a su jerarquía. Visualizar cómo un objeto "nieto" se mueve al rotar su abuelo (el grupo padre) fue clave para entender cómo se propagan los cambios en una estructura jerárquica.

Lo más interesante fue implementar controles en tiempo real con leva, lo que facilitó la exploración interactiva. En el futuro, podría agregar animaciones automáticas y más niveles jerárquicos, o incluir coordenadas locales visibles para cada grupo.

---


## ✅ Checklist de Entrega

- [x] Carpeta `2025-05-05_taller_jerarquias_transformaciones`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés

---
