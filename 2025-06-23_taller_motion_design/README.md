# Taller - Motion Design Interactivo: Acciones Visuales según Eventos del Usuario

📅 Fecha  
2025-06-23 

---

## 🎯 Objetivo del Taller

El objetivo del taller fue crear una escena interactiva donde un modelo humanoide animado responde en tiempo real a eventos del usuario, como clics de botones, pulsaciones de teclado y eventos del puntero. Se buscó aplicar los principios de motion design a la visualización 3D usando animaciones esqueléticas provenientes de Mixamo e integradas en entornos web con React Three Fiber.

---

## 🧠 Conceptos Aprendidos

- Transformaciones geométricas (escala, rotación, traslación)  
- Animaciones esqueléticas (rigs, clips, mezcladores)  
- Interacción por eventos ( `keydown`)
- Control manual de transiciones de animación con `.fadeIn()` / `.stop()`  
- Uso del loader `FBXLoader` para modelos con texturas  
- Motion design aplicado a visualizaciones web interactivas  

---

## 🔧 Herramientas y Entornos

- **Three.js / React Three Fiber**  
- **React (Vite)**  
- **FBXLoader**  
- **Mixamo (modelos .fbx)**  

---

## 📁 Estructura del Proyecto


```
2025-06-22_motion_design_interactivo/
├── threejs/
├── resultados/
└── README.md
```
---

## 🧪 Implementación

### 🔹 Etapas realizadas

1. **Preparación del modelo 3D humanoide en Mixamo**, exportado en formato `.fbx` con animaciones separadas (Idle, Wave, Run, Jump).
2. **Carga del modelo en React Three Fiber** usando `FBXLoader` y animaciones controladas por `AnimationMixer`.
3. **Implementación de eventos de interacción**: teclado y botones en pantalla.
4. **Transición suave entre animaciones** usando `.fadeIn()` y `.stop()` en cada acción.

### 🔹 Código relevante

```jsx
// Cambio de animación según acción seleccionada
useEffect(() => {
  if (!mixer.current || !actionName) return
  const action = mixer.current.clipAction(anims[actionName].animations[0])
  mixer.current.stopAllAction()
  action.reset().fadeIn(0.3).play()
}, [actionName])

//eventos de interaccion
const [action, setAction] = useState('idle')

  const handleKey = (e) => {
    if (e.code === 'Space') setAction('jump')
    if (e.key.toLowerCase() === 'r') setAction('run')
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)

```

---

## 🎭 Descripción del Modelo Mixamo Usado

Animaciones incluidas:

Idle.fbx: postura neutral.

Wave.fbx: saludo con la mano.

Run.fbx: carrera en bucle.

Jump.fbx: salto con anticipación y caída.

---

## 🧩 Prompts Usados 

"¿Cómo usar FBXLoader para cargar un modelo con animaciones en Three.js?"

"Ejemplo de cómo cambiar entre varias animaciones .fbx usando AnimationMixer"

"Implementa botones en React que disparen animaciones en un modelo 3D"

---

## 📊 Resultados Visuales

![botonesanim](https://github.com/user-attachments/assets/a79f325f-b272-49b3-8347-50c17a2f509e)

![teclanim](https://github.com/user-attachments/assets/8e5f5d56-a691-44e3-800c-97b9e9373da7)


**Con la tecla espacio el personaje salta y con la tecla r el personaje corre**
---

## 💬 Reflexión Final
Este taller permitió entender cómo conectar la lógica de eventos en la interfaz con el sistema de animaciones esqueléticas de un modelo 3D, lo cual resulta clave en experiencias inmersivas. La combinación de React, Three.js y FBXLoader ofrece un entorno flexible para la creación de interfaces animadas.
La experiencia visual mejora significativamente cuando la interacción genera una respuesta animada coherente en el personaje.

---

## 👥 Contribuciones al Taller

Implementación del loader FBXLoader.

Integración de animaciones Mixamo individuales y control por AnimationMixer.

Lógica de interacción con eventos keydown.

Documentación y estructura del proyecto.

---

## 👥 Integrantes
Sebastián Muñoz → jumunozle@unal.edu.co

Carlos Camacho → cacamacho@unal.edu.co

Juan Daniel Ramírez → juaramriezmo@unal.edu.co

Cristian Medina → crmedinab@unal.edu.co

---

## ✅ Checklist de Entrega

✅ Uso de un modelo animado de Mixamo.

✅ Implementación funcional de al menos tres tipos de evento (clic, teclado, cursor).

✅ Activación de animaciones relevantes según la interacción.

✅ Transiciones claras entre estados animados.

✅ Código organizado y bien comentado.

✅ README completo con explicación, evidencias visuales (GIF) y prompts.

✅ Commits descriptivos en inglés.
