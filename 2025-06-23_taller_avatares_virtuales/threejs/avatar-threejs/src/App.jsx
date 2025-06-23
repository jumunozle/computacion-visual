// src/App.jsx
import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import AvatarFBX from './AvatarFBX'

export default function App() {
  const [play, setPlay] = useState(false)
  const [color, setColor] = useState('#ff8080')

  return (
    <>
      <Canvas shadows camera={{ position: [0, 1.5, 3], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <OrbitControls />
        <Environment preset="sunset" />
        <AvatarFBX playAnimation={play} color={color} />
      </Canvas>

      <div style={{
        position: 'absolute', top: 20, left: 20, zIndex: 1, display: 'flex', flexDirection: 'column', gap: '10px'
      }}>
        <button onClick={() => setPlay(!play)}>Reproducir Animación</button>
        <label>
          🎨 Color Ropa:
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
      </div>
    </>
  )
}
