# 🧪 Taller 21- Texturizado Creativo: Materiales Dinámicos con Shaders y Datos

📅 Fecha 

2025-05-12 – Fecha de asignación

2025-05-25 – Fecha de realización

2025-05-26 – Fecha de entrega

----------

## 🎯 Objetivo del Taller

Crear materiales que cambien en tiempo real en respuesta a entrada del usuario, paso del tiempo o sensores simulados. Además, se integrarán efectos de partículas para complementar visualmente el comportamiento del material, simulando fenómenos como fuego, agua, electricidad o portales.

----------

## 🧠 Conceptos Aprendidos

- Materiales dinámicos con shaders (modificación de color, mapas normales y emisivos)  
- Uso de variables uniformes en shaders para animaciones (uTime, interacción mouse)  
- Sistemas de partículas básicos con Three.js y React Three Fiber  
- Sincronización de efectos visuales (shader + partículas) para mejorar la experiencia  
- Interacción visual en tiempo real basada en input del usuario  

----------

## 🔧 Herramientas y Entornos

- **Three.js / React Three Fiber**  
- **ShaderMaterial** para crear shaders personalizados  
- **@react-three/particles** para sistema básico de partículas  
- **JavaScript / React** para integración e interacción  

📌 Las librerías se instalaron con `npm` según la guía oficial.

----------

## 📁 Estructura del Proyecto

```
2025-05-12_taller_texturizado_dinamico_shaders_particulas/
├── unity/
├── threejs/
├── resultados/
├── README.md

```


----------

## 🧪 Implementación

## ThreeJS

### 🔹 Etapas realizadas

1. **Creación de material dinámico**  
   - Implementación de un shader personalizado que cambia color y emisividad con el paso del tiempo (`uTime`) y posición del mouse.  
   - Combinación de mapas: color base + normal map + emissive map para mayor realismo.

2. **Sistema de partículas**  
   - Uso de `@react-three/particles` para generar partículas cerca del objeto principal.  
   - Las partículas varían en tamaño y color dependiendo de la interacción (hover, clic).  
   - Se simula un efecto de energía o fuego alrededor del objeto.

3. **Interacción en tiempo real**  
   - El usuario puede influir en los parámetros del shader y partículas mediante movimientos del mouse y clics.  
   - Se implementaron animaciones fluidas y reactivas para crear un efecto visual atractivo.

----------

### 🔹 Código relevante

### Material dinámico usando shaderMaterial
```jsx
// Definimos el material dinámico usando shaderMaterial

const  DynamicMaterial = shaderMaterial(
{
uTime:  0,
uMouse:  new  THREE.Vector2(),
uHover:  0,

colorA:  new  THREE.Color("#ff0000"), // rojo
colorB:  new  THREE.Color("#800080"), // morado

},

// Vertex shader, transforma las coordenadas de los vértices
// Fragment shader, define el color final del fragmento
// Esta parte es donde se define la lógica de mezcla de colores
`

varying vec2 vUv;
void main() {
vUv = uv;
vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
gl_Position = projectionMatrix * modelViewPosition;

}

`,

`
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;
uniform vec3 colorA;
uniform vec3 colorB;
varying vec2 vUv;
  
void main() {

float mixVal = 0.5 + 0.5 * sin(uTime + vUv.x * 10.0 + vUv.y * 10.0);
mixVal = mixVal * (1.0 - uHover) + uHover;
vec3 color = mix(colorA, colorB, mixVal);
gl_FragColor = vec4(color, 1.0);

}

`

);
```

### Definir el material dinámico usando shaderMaterial

```jsx
export function Particles({ count = 500, explode = false }) {
  const meshRef = useRef();
  const explosionStart = useRef(null);

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const radius = THREE.MathUtils.randFloat(1.8, 3.5);
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(THREE.MathUtils.randFloat(-1, 1));
      const heightOffset = Math.random() * Math.PI * 2;
      const speed = THREE.MathUtils.randFloat(0.2, 1);
      // Dirección de explosión aleatoria
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      ).normalize();
      data.push({ radius, theta, phi, heightOffset, speed, dir });
    }
    return data;
  }, [count]);
```


### Explosión
```jsx
    if (explode && explosionStart.current === null) {
      explosionStart.current = t;
    }
    // Resetear la explosión
    if (!explode && explosionStart.current !== null) {
      explosionStart.current = null;
    }

    // Si la explosión ha comenzado, calcular el progreso
    let explosionProgress = 0;
    if (explode && explosionStart.current !== null) {
      explosionProgress = Math.min((t - explosionStart.current) / 1.2, 1); // 1.2s de animación
    }


    // Actualizar la posición de las partículas
    // y aplicar la explosión
    for (let i = 0; i < count; i++) {
      const { radius, theta, phi, heightOffset, speed, dir } = particles[i];
      const animatedTheta = theta + t * speed;
      const x = radius * Math.sin(phi) * Math.cos(animatedTheta);
      const y = radius * Math.cos(phi) + Math.sin(t * 2 + heightOffset);
      const z = radius * Math.sin(phi) * Math.sin(animatedTheta);

      // Si explota, mueve la partícula hacia afuera
      let pos = new THREE.Vector3(x, y, z);
      if (explode && explosionStart.current !== null) {
        pos = pos.add(dir.clone().multiplyScalar(explosionProgress * 6)); // 6 = fuerza de explosión
      }

```

## Unity

### 🔹 Etapas realizadas

1. Creación del proyecto base con URP
Se creó un proyecto nuevo en Unity usando la plantilla Universal Render Pipeline (URP) para aprovechar las capacidades avanzadas de renderizado y shaders personalizados.

2. Escena básica y configuración inicial
Se eliminó la cámara principal predeterminada y se agregó una nueva Main Camera con configuración estándar.
Se añadió un objeto 3D simple (esfera) y una luz direccional para iluminar la escena.

3. Desarrollo del shader dinámico con Shader Graph

Se creó un shader con Shader Graph que modifica el color base usando la variable de tiempo (Time), generando oscilaciones suaves en el color.

Se integraron dos mapas: textura base (BaseMap) y normal map para dar detalle y realismo a la superficie.

Se añadió un desplazamiento UV controlado por funciones seno y tiempo para simular una distorsión fluida en la textura.

Se incorporó un parámetro externo (MouseControl), que puede ser controlado desde un slider en la UI para modificar la intensidad de los efectos.

4. Material y aplicación al objeto
Se creó un material con el shader dinámico y se asignó al objeto 3D en la escena para visualizar los efectos en tiempo real.

5. Implementación del sistema de partículas

Se añadió un Particle System que emula un efecto de fuego o energía alrededor de la esfera.

Se desarrolló un script en C# que controla dinámicamente la tasa de emisión de partículas (rateOverTime) utilizando una función PingPong para generar un efecto pulsante.

6. Interfaz de usuario para control dinámico

Se creó un script C# que vincula el slider con el shader, facilitando la interacción del usuario para controlar visualmente la intensidad del efecto.


----------

### 🔹 Código relevante

### Modificar la propiedad color en unity usando el slider
```c#
using UnityEngine;
using UnityEngine.UI;

public class ShaderSliderControl : MonoBehaviour
{
    public Material mat;
    public Slider slider;

    void Update()
    {
        // Obtenemos el color actual del material
        Color color = mat.GetColor("_Color");

        // Modificamos el canal rojo con el valor del slider
        color.r = slider.value;

        // Aplicamos el nuevo color al material
        mat.SetColor("_Color", color);
    }
}

```


## 📊 Resultados Visuales

## Threejs

### Animación Inicial

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-05-12_taller_texturizado_dinamico_shaders_particulas/results/GifThreejs.gif?raw=true)


###  Diferente Número de Partículas

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-05-12_taller_texturizado_dinamico_shaders_particulas/results/GifThreejs2.gif?raw=true)


###  Bonus: Efecto de explosión

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-05-12_taller_texturizado_dinamico_shaders_particulas/results/GifThreejs3.gif?raw=true)


## Unity


### Shader Graph Aplicada

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-05-12_taller_texturizado_dinamico_shaders_particulas/results/Shader%20Graph.png?raw=true)

### Resultado con el slider.

![Imagen  GIF animado](https://github.com/JuanDanielRamirezMojica/computacion-visual/blob/main/2025-05-12_taller_texturizado_dinamico_shaders_particulas/results/GifUnity.gif?raw=true)

----------

## 🧩 Prompts Usados

- Refactoriza este código: "".
- Cómo puedo añadirle un efecto de explosión a estas partículas, mira este código que tengo "".
- Redáctame mejor este párrafo.

## 💬 Reflexión Final

Este taller me permitió profundizar en la creación de materiales dinámicos mediante shaders personalizados y su interacción con sistemas de partículas, todo en un entorno web con React Three Fiber. Fue interesante entender cómo las variables uniformes como el tiempo y la posición del mouse pueden alterar visualmente un objeto en tiempo real, mejorando la inmersión.

La parte más compleja fue coordinar el sistema de partículas con el shader para que respondieran de forma coherente a la interacción del usuario, manteniendo un rendimiento aceptable. En futuros proyectos, me gustaría explorar efectos más complejos y optimizaciones para soportar escenas con muchos objetos interactivos.


El desarrollo en Unity permitió profundizar en la creación de materiales dinámicos usando Shader Graph, facilitando la construcción visual y modular de shaders complejos que reaccionan al tiempo y a parámetros externos. Integrar mapas normales y desplazamientos UV añadió un nivel de realismo importante, mientras que el sistema de partículas aportó una capa adicional de dinamismo visual para simular fenómenos como fuego o energía.

La sincronización entre el shader y el sistema de partículas mediante scripts de C# facilitó el control en tiempo real de los efectos, demostrando cómo la interacción del usuario puede modificar el ambiente gráfico de manera fluida. Además, la incorporación de UI con sliders permitió una experimentación sencilla y directa con los parámetros del material.


## 👥 Integrantes

- Sebastián Muñoz → jumunozle@unal.edu.co
- Carlos Camacho → cacamacho@unal.edu.co  
- Juan Daniel Ramírez → juaramriezmo@unal.edu.co
- Cristian Medina → crmedinab@unal.edu.co 


##  👥 Contribuciones Grupales

- Desarrollo del shader dinámico en Three.js / React Three Fiber para modificar colores y texturas en tiempo real.

- Implementación del sistema básico de partículas utilizando points y bufferGeometry para generar efectos visuales alrededor del objeto.

- Integración de la interacción con el mouse para controlar parámetros del shader y las partículas (hover, clic).

- Desarrollo en Unity de un proyecto base con URP, incluyendo:

	- Creación de un shader dinámico con Shader Graph que combina mapas base, normales y desplazamiento UV controlado por tiempo y parámetros externos.

	- Implementación de un sistema de partículas usando Particle System, con emisión dinámica controlada mediante scripts en C#.

	- Diseño de una interfaz con sliders para controlar parámetros del shader en tiempo real desde la UI.

	- Sincronización y comunicación entre shaders, partículas y UI para un control interactivo optimizado.

- Documentación, organización y estructuración del repositorio, incluyendo la elaboración del README.md con explicaciones, prompts usados, código relevante y resultados visuales en ambos entornos (Three.js y Unity).

- Realización de capturas y creación de GIFs demostrativos para evidenciar el comportamiento y efectos logrados en ambos frameworks.


## ✅ Checklist de Entrega

-   Carpeta `2025-05-12_taller_texturizado_dinamico_shaders_particulas/`
    
-   Código limpio, modular y funcional en Three.js, React Three Fiber y Unity.
    
-   GIFs animados demostrativos incluidos
    
-   README completo con explicación, prompts y reflexión
    
-   Commits descriptivos en inglés
