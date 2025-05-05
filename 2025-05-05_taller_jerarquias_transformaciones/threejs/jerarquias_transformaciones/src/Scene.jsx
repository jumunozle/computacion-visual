// src/Scene.jsx
import { useControls } from 'leva'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Scene() {
  const parentRef = useRef()
  const childRef = useRef()
  const grandChildRef = useRef()

  const { posX, posY, rotY, rotX } = useControls('Parent Transform', {
    posX: { value: 0, min: -5, max: 5, step: 0.1 },
    posY: { value: 0, min: -5, max: 5, step: 0.1 },
    rotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  })

  useFrame(() => {
    parentRef.current.rotation.set(rotX, rotY, 0)
    parentRef.current.position.set(posX, posY, 0)
  })

  return (
    <group ref={parentRef}>
      {/* Padre */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Hijo */}
      <group ref={childRef} position={[2, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="skyblue" />
        </mesh>

        {/* Nieto */}
        <group ref={grandChildRef} position={[1.5, 0, 0]}>
          <mesh>
            <coneGeometry args={[0.3, 1, 16]} />
            <meshStandardMaterial color="pink" />
          </mesh>
        </group>
      </group>
    </group>
  )
}
