# Taller 67 - Avatares Virtuales en Unity y Three.js

📅 Fecha  
2025-06-23

---

## 🎯 **Objetivo del Taller**  
Aprender a integrar avatares 3D en entornos interactivos utilizando Unity y Threejs, permitiendo su visualización, personalización básica y activación de animaciones mediante entradas del usuario.

---

## 🧠 **Conceptos Aprendidos**

- Transformaciones geométricas (escala, rotación, traslación)  
- Animación básica de personajes  
- Integración de esqueleto y control de Animator en Unity  
- Uso de React Three Fiber y Drei para escenas 3D

---

## 🔧 **Herramientas y Entornos**

- Unity 2022.3 LTS  
- Mixamo (descarga de avatares animados en formato .fbx)  
- Three.js / React Three Fiber  
- Vite + React  
- @react-three/drei (useAnimations, OrbitControls, Environment)  
- FBXLoader desde `three-stdlib`  


---

## 📁 **Estructura del Proyecto**
```
2025-06-22_taller_avatares_virtuales/
├── unity/
├── threejs/
├── resultados/
├── README.md
```

---

## 🧪 **Implementación en Unity**


🔹 **Etapas realizadas**

1. **Importación del modelo**: Se descargó un avatar desde Mixamo con la animación `Wave`, en formato `.fbx` con esqueleto.
2. **Configuración de escena**: Se creó una escena básica con plano y luz direccional.
3. **Animator Controller**: Se creó un Animator para que el modelo automaticamente inicie con su animacion.
4. **Captura visual**: Se generó un GIF demostrando la interacción.



## 📊 Resultados Visuales

![avatarunity](https://github.com/user-attachments/assets/2182d37f-bf14-445e-9c70-85a5f4a25ee5)

---

## 🧪 **Implementación en Threejs**


🔹 **Etapas realizadas:**

1. Preparación del entorno React + Three.js con Vite.  
2. Carga de un modelo `.fbx` animado exportado desde Mixamo.  
3. Implementación de `useAnimations` para activar movimientos.  
4. Personalización de materiales del avatar mediante color picker.  
5. Visualización 3D con OrbitControls.

🔹 **Código relevante**

```jsx
// Reproducción de animación y personalización del color
useEffect(() => {
  if (playAnimation && actions && actions[animations[0]?.name]) {
    actions[animations[0].name].reset().fadeIn(0.5).play()
  }

  avatar.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material = child.material.clone()
      child.material.color = new THREE.Color(color)
      child.material.needsUpdate = true
    }
  })
}, [playAnimation, color])

```

## 📊 Resultados Visuales

![avatarthreejs](https://github.com/user-attachments/assets/eaf0b0fa-8de2-49b8-8eed-f2a27b3d098d)

---

## 🧩 Prompts Usados

"Como cargo un archivo .fbx animado en Three.js y React Three Fiber?"

"Ayudame a incluir una opción para personalizar el color del avatar usando un input de color"

"Ayudame a iniciar en Unity para cargar un modelo fbx con animacion"

---

## 💬 Reflexión Final

Este taller reforzó mis conocimientos en animaciones esqueléticas y un poco en el uso del sistema de Animator en Unity. Tambier permitió reforzar el conocimiento en integración de modelos animados con React Three Fiber, algo esencial para proyectos interactivos modernos. La carga de modelos .fbx con animaciones predefinidas y el control mediante useAnimations fue particularmente enriquecedor, ya que permite un control detallado sin necesidad de escribir código para esqueleto o rigging.

---

## 🧍‍♂️ Detalles del Avatar

Exportado desde Mixamo.com

Formato: .fbx (con esqueleto y animación integrada)

Animación Aplicada: Capoeira

---

## 👥 Contribuciones al Taller

Configuré la escena y el avatar en Unity.

Implementación completa en React Three Fiber

Carga y control del avatar .fbx

Configuración de entorno visual y materiales

Generación del GIF de interacción

---

## 👥 Integrantes
Sebastián Muñoz → jumunozle@unal.edu.co

Carlos Camacho → cacamacho@unal.edu.co

Juan Daniel Ramírez → juaramriezmo@unal.edu.co

Cristian Medina → crmedinab@unal.edu.co

---

## ✅ Checklist de Entrega

✅ Avatar correctamente integrado en la escena

✅ Animación reproducida (automática o controlada)

✅ Algún nivel de personalización aplicado

✅ Evidencias visuales en README

✅ Carpeta organizada y código funcional

✅ Commits descriptivos en inglés
