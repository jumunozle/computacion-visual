import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useCursor } from '@react-three/drei'
import { Leva, useControls } from 'leva'
import * as THREE from 'three'

function InteractiveBox() {
  const meshRef = useRef()
  const edgeRef = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [position, setPosition] = useState([0, 0, 0])

  const { scale, color, rotateY } = useControls('Cubo', {
    scale: { value: 1, min: 0.5, max: 3, step: 0.1 },
    color: { value: '#ffa500' },
    rotateY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 }
  })

  useEffect(() => {
    const speed = 0.1
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      const actions = {
        w: () => setPosition(p => [p[0], p[1], p[2] - speed]),
        s: () => setPosition(p => [p[0], p[1], p[2] + speed]),
        a: () => setPosition(p => [p[0] - speed, p[1], p[2]]),
        d: () => setPosition(p => [p[0] + speed, p[1], p[2]]),
        r: () => setPosition([0, 0, 0]),
      }
      if (actions[key]) actions[key]()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useFrame((_, delta) => {
    if (meshRef.current) {
      if (active) meshRef.current.rotation.x += delta
      meshRef.current.rotation.y = rotateY
    }
    if (edgeRef.current) {
      edgeRef.current.rotation.copy(meshRef.current.rotation)
    }
  })

  useCursor(hovered)

  return (
    <group position={position} scale={scale}>
      {/* Cubo sólido */}
      <mesh
        ref={meshRef}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : color} />
      </mesh>

      {/* Borde wireframe */}
      <lineSegments ref={edgeRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial color="black" />
      </lineSegments>
    </group>
  )
}
export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      <Leva collapsed />
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <InteractiveBox />
        <OrbitControls />
      </Canvas>
    </div>
  )
}