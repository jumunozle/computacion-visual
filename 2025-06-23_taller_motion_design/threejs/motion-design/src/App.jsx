import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { useState, useEffect } from 'react'
import AvatarFBX from './AvatarFBX'

export default function App() {
  const [action, setAction] = useState('idle')

  const handleKey = (e) => {
    if (e.code === 'Space') setAction('jump')
    if (e.key.toLowerCase() === 'r') setAction('run')
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} castShadow intensity={1} />
        <Environment preset="sunset" />
        <OrbitControls />

        <AvatarFBX actionName={action} />
      </Canvas>

      <div style={{ position: 'absolute', top: 20, left: 20 }}>
        <button onClick={() => setAction('idle')}>Idle</button>
        <button onClick={() => setAction('wave')}>👋 Saludo</button>
        <button onClick={() => setAction('run')}>🏃‍♂️ Correr</button>
        <button onClick={() => setAction('jump')}>🦘 Saltar</button>
      </div>
    </>
  )
}
