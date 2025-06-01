import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture, Stats } from "@react-three/drei";
import { useControls, Leva } from "leva";

// Configuración global de Leva para evitar el amontonamiento
const levaTheme = {
  sizes: {
    rootWidth: "300px",
    controlWidth: "100%",
  },
  space: {
    sm: "6px",
    md: "10px",
    lg: "15px",
  },
  fontSizes: {
    root: "12px",
  }
};

function PBRObject() {
  const textures = useTexture({
    map: "/textures/albedo.jpg",
    normalMap: "/textures/normal.jpg",
    roughnessMap: "/textures/roughness.jpg"
  });

  const { roughness, metalness, normalScale } = useControls('PBR Controls', {
    roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    metalness: { value: 0, min: 0, max: 1, step: 0.01 },
    normalScale: { value: 1, min: 0, max: 2, step: 0.01 }
  }, { collapsed: true });

  return (
    <mesh position={[-1.5, 1, 0]} castShadow>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        {...textures}
        roughness={roughness}
        metalness={metalness}
        normalScale={[normalScale, normalScale]}
      />
    </mesh>
  );
}

function BasicObject() {
  const { color } = useControls('Basic Material', {
    color: '#ff7b00'
  }, { collapsed: true });

  return (
    <mesh position={[1.5, 1, 0]} castShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#f0f0f0" roughness={0.8} />
    </mesh>
  );
}

export default function App() {
  const { intensity, positionX, positionY, positionZ } = useControls('Light', {
    intensity: { value: 1, min: 0, max: 5, step: 0.1 },
    positionX: { value: 5, min: -10, max: 10, step: 0.5 },
    positionY: { value: 5, min: 0, max: 10, step: 0.5 },
    positionZ: { value: 5, min: -10, max: 10, step: 0.5 }
  }, { collapsed: true });

  return (
    <>
      <Leva theme={levaTheme} title={{ position: 'top-right' }} />
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight
          intensity={intensity}
          position={[positionX, positionY, positionZ]}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        <Suspense fallback={null}>
          <PBRObject />
          <BasicObject />
          <Floor />
        </Suspense>
        
        <OrbitControls makeDefault />
        <Stats />
      </Canvas>
    </>
  );
}