import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function AnimatedObject() {
  const meshRef = useRef()
  const clock = new THREE.Clock()

  useFrame(() => {
    const t = clock.getElapsedTime()
    const mesh = meshRef.current

    // Movimiento en trayectoria circular
    mesh.position.x = Math.sin(t) * 2
    mesh.position.z = Math.cos(t) * 2

    // Rotación continua
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01

    // Escalado dinámico senoidal
    const scale = 1 + 0.3 * Math.sin(t * 2)
    mesh.scale.set(scale, scale, scale)
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} /> 
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} />
      <AnimatedObject />
      <OrbitControls />
    </Canvas>
  )
}

export default App