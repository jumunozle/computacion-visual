# 🧪 Taller 65 - Colisiones y Partículas: Reacciones Visuales Interactivas en Unity y Three.js

## 📅 Fecha
2025-05-26

---

## 🎯 Objetivo del Taller

Explorar cómo conectar eventos de colisión física con respuestas visuales usando herramientas del ecosistema de React Three Fiber (R3F). En este caso, implementar una escena donde objetos con físicas cambian de color aleatoriamente al colisionar.

---

## 🧠 Conceptos Aprendidos

- Uso de `@react-three/fiber` para renderizar escenas 3D con React.
- Integración de físicas con `@react-three/cannon`.
- Detección de colisiones con el evento `onCollide`.
- Cambio dinámico de estado visual (color) al detectar colisiones.
- Renderizado dinámico de objetos usando `useState` y `setInterval`.

---

## 🔧 Herramientas y Entornos

- React + Vite
- @react-three/fiber
- @react-three/cannon
- @react-three/drei
- Three.js

---

## 📁 Estructura del Proyecto

```
2025-05-25_taller_colisiones_y_particulas/
├── threejs
├── resultados/
├── README.md
```

---

## 🧪 Implementación

### 🔹 Etapas realizadas
1. Configuración del entorno con R3F y Cannon.
2. Creación de un plano base con físicas.
3. Generación continua de cubos con físicas.
4. Aplicación del evento `onCollide` para detectar colisiones.
5. Cambio de color aleatorio al colisionar.

### 🔹 Código relevante

```jsx
const [ref] = useBox(() => ({
  mass: 1,
  position,
  onCollide: () => {
    const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    setColor(`#${randomColor.getHexString()}`);
  },
}));
```

---
## 📊 Resultados Visuales

![colisiones_y_particulas](https://github.com/user-attachments/assets/60b15ccc-e4b4-4038-89cf-8e41307a9c6d)

---

## 🧩 Prompts Usados

Crea una escena interactiva donde caigan objetos cada segundo

Como detecto cuando una colision entre objetos?

Como hago para que los objetos cambien de color cuando colisionen?

---

## 💬 Reflexión Final
Durante este taller aprendí a manejar eventos de colisión dentro de una escena 3D usando R3F y Cannon. Pude ver cómo eventos físicos se pueden conectar fácilmente a efectos visuales mediante el uso de hooks como useBox.

---

## 👥 Integrantes
Sebastián Muñoz → jumunozle@unal.edu.co

Carlos Camacho → cacamacho@unal.edu.co

Juan Daniel Ramírez → juaramriezmo@unal.edu.co

Cristian Medina → crmedinab@unal.edu.co

---


## 👥 Contribuciones

- 💻 Desarrollo de la escena interactiva
- 📹 Capturas y documentación visual
- 📄 Redacción del README y estructura del taller

---


## ✅ Criterios de Evaluación

✅ Escena con colisiones funcionales

✅ Partículas o efectos visuales activados correctamente

✅ GIFs o capturas que demuestren el comportamiento

✅ Código bien organizado

✅ README completo con descripción clara y reflexión

✅ Commits descriptivos en inglés



