// src/App.jsx
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stats } from "@react-three/drei";
import SceneModels from "./SceneModels";
import DebugInfo from "./DebugInfo";

export default function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 6], fov: 50 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[5, 5, 5]}
          intensity={1}
        />
        <SceneModels />
        <Environment preset="sunset" />
        <OrbitControls />
        <Stats />
        <DebugInfo />
      </Suspense>
    </Canvas>
  );
}
