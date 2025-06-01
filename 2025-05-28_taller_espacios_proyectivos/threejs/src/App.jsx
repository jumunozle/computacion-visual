// threejs/App.jsx
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei'
import { useEffect, useState } from 'react'
import * as THREE from 'three'

function SceneContent({ cameraType }) {
  const [cameraKey, setCameraKey] = useState(0)

  // Esto forzará la reinicialización de la cámara al cambiar de tipo
  useEffect(() => {
    setCameraKey(prev => prev + 1)
  }, [cameraType])

  return (
    <>
      {cameraType === 'perspective' ? (
        <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} key={cameraKey} />
      ) : (
        <OrthographicCamera makeDefault position={[0, 2, 10]} zoom={100} key={cameraKey} />
      )}

      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />

      {/* Cubos a distintas profundidades */}
      <mesh position={[-2, 0, -2]}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="green" />
      </mesh>

      <mesh position={[2, 0, 2]}>
        <boxGeometry />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Etiqueta */}
      <Html center position={[0, 2.5, 0]}>
        <div style={{ backgroundColor: 'white', padding: '6px 10px', borderRadius: '8px', fontWeight: 'bold' }}>
          {cameraType.toUpperCase()} CAMERA
        </div>
      </Html>
    </>
  )
}

import { Html } from '@react-three/drei'

export default function App() {
  const [cameraType, setCameraType] = useState('perspective')

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'o') setCameraType('orthographic')
      if (e.key === 'p') setCameraType('perspective')
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <Canvas shadows style={{ height: '100vh', width: '100vw', background: '#f0f0f0' }}>
      <SceneContent cameraType={cameraType} />
    </Canvas>
  )
}
