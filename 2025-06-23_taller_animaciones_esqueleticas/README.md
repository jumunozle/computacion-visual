# 🧪 Taller - Animaciones por Esqueleto: Importando y Reproduciendo Animaciones

📅 Fecha  
2025-06-23

---

## 🎯 Objetivo del Taller

Explorar el uso de animaciones esqueléticas importadas desde archivos `.FBX`, reproducirlas e integrarlas en una escena interactiva usando React Three Fiber. Se busca entender cómo controlar clips de animación, gestionar eventos sincronizados y permitir la interacción visual con el usuario.

---

## 🧠 Conceptos Aprendidos

- Transformaciones geométricas (escala, rotación, traslación)
- Visualización de modelos 3D animados
- Carga y control de animaciones esqueléticas
- Sincronización de animación con eventos del usuario
- Interacción mediante teclado y visual feedback

---

## 🔧 Herramientas y Entornos

- Three.js / React Three Fiber
- React + Vite
- Mixamo (exportación FBX animado)

---

## 📁 Estructura del Proyecto

```
2025-06-23_taller_animaciones_esqueleto_fbx_gltf/
├── threejs/
├── README.md
├── resultados/
```

---

## 🦴 Sistema de Animación por Esqueleto

Las animaciones esqueléticas funcionan a través de un **rig** (esqueleto de huesos) que se asocia a un modelo 3D. Cada animación (clip) consiste en una secuencia de transformaciones (rotación, posición) aplicadas a esos huesos a lo largo del tiempo.

- El `.fbx` descargado desde Mixamo incluye el modelo con esqueleto + clips (Idle, Run, Jump, etc.).
- En Three.js, los huesos son nodos jerárquicos (`Bone`) y las animaciones se controlan mediante `AnimationAction` usando `AnimationMixer`.
- Con `@react-three/drei`, usamos el hook `useAnimations()` que facilita acceder a los clips embebidos y reproducirlos.

---


## 🧪 Implementación

### 🔹 Etapas realizadas

1. Preparación de modelo `.fbx` animado desde Mixamo.
2. Importación y renderizado del modelo en React Three Fiber.
3. Control de clips de animación con `useAnimations()` de `@react-three/drei`.
4. Integración de controles por botones y teclado.
5. Sincronización de eventos visuales con la reproducción de animaciones.

### 🔹 Código relevante

```js
useEffect(() => {
  if (actions && actions[animation]) {
    actions[animation].reset().fadeIn(0.2).play();
    return () => actions[animation].fadeOut(0.2);
  }
}, [animation]);
```

```js
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      setCurrentAnim('Take 001');
      setShowText(true);
    }
  };
  const handleKeyUp = () => {
    setCurrentAnim('mixamo.com');
    setShowText(false);
  };
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  };
}, []);
```

---

## 📊 Resultados Visuales



---

## 🧩 Prompts Usados


---

## 💬 Reflexión Final
Este taller me permitió reforzar el entendimiento de cómo funcionan las animaciones esqueléticas y cómo integrarlas en escenas interactivas. Aprendí a controlar clips de animación desde código, a detectar sus nombres correctamente, y a reproducirlos con transiciones suaves.
La parte más compleja fue la sincronización entre teclado, animación y la interfaz gráfica, especialmente cuando las animaciones no tenían nombres convencionales. Me gustaría en el futuro integrar también sonidos o movimientos físicos del modelo para lograr una experiencia más inmersiva.

---

## 👥 Contribuciones al Taller
Integré el modelo FBX desde Mixamo

Implementé el control de animaciones con useAnimations

Sincronización del mensaje en pantalla con el estado de animación

Preparé el GIF y la documentación

---

## 👥 Integrantes
Sebastián Muñoz → jumunozle@unal.edu.co

Carlos Camacho → cacamacho@unal.edu.co

Juan Daniel Ramírez → juaramriezmo@unal.edu.co

Cristian Medina → crmedinab@unal.edu.co

---

## ✅ Checklist de Entrega

✅ Importación correcta de modelo con animación esquelética.

✅ Reproducción y control funcional de animaciones.

✅ Transiciones suaves o respuesta a eventos.

✅ Escena clara, interactiva y sin errores de rigging.

✅ Código limpio, organizado y comentado.

✅ README completo con explicación, evidencias visuales (GIF) y prompts.

✅ Commits descriptivos en inglés.