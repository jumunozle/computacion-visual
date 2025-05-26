// Este componente crea una esfera con un material dinámico que cambia de color
// y reacciona al movimiento del mouse y al hover.


import { useRef, useState } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";


// Definimos el material dinámico usando shaderMaterial
const DynamicMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(),
    uHover: 0,
    colorA: new THREE.Color("#ff0000"), // rojo
    colorB: new THREE.Color("#800080"), // morado
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


// Registramos el material para que pueda ser usado en JSX
extend({ DynamicMaterial });


// Componente que usa el material dinámico para crear una esfera
export function DynamicShaderSphere({ mouse, onClick }) {
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Actualizamos el material en cada frame
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
      materialRef.current.uMouse = mouse;
      materialRef.current.uHover = hovered ? 1 : 0;
    }
  });

  return (
    // Creamos una esfera con el material dinámico
    <mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
      scale={1}
    >
      <sphereGeometry args={[1.5, 64, 64]} />
      <dynamicMaterial ref={materialRef} />
    </mesh>
  );
}