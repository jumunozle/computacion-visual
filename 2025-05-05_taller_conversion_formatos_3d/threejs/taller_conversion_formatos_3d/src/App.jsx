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
