import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'

function HandModel() {
  const { scene } = useGLTF('/models/female_hand.glb')
  console.log('Modelo cargado:', scene)


  // Cargar texturas PBR
  const colorMap = useLoader(THREE.TextureLoader, '/textures/Metal049A_2K-JPG_Color.jpg')
  const normalMap = useLoader(THREE.TextureLoader, '/textures/Metal049A_2K-JPG_NormalGL.jpg')
  const roughnessMap = useLoader(THREE.TextureLoader, '/textures/Metal049A_2K-JPG_Roughness.jpg')
  const metalnessMap = useLoader(THREE.TextureLoader, '/textures/Metal049A_2K-JPG_Metalness.jpg')

  // Aplicar las texturas al material del modelo
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        map: colorMap,
        normalMap: normalMap,
        roughnessMap: roughnessMap,
        metalnessMap: metalnessMap,
        metalness: 1.0,
        roughness: 1.0,
      })
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  return (
    <primitive 
  object={scene}
  position={[0, 0, 0]}
  rotation={[0, 0, 0]}
  scale={[1, 1, 1]} 
  dispose={null}
/>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#222' }}>
      <Canvas
        shadows
        camera={{
          position: [0, 0, 1.5],
          fov: 45,
          near: 0.1,
          far: 10
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[3, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-normalBias={0.05}
        />
        <Stage
  intensity={0.6}
  environment="studio"
  adjustCamera={1.2}
>
  <Suspense fallback={null}>
    <HandModel />
  </Suspense>
</Stage>

        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          enablePan={true}
          enableZoom={true}
          minDistance={0.5}
          maxDistance={3}
        />
      </Canvas>
    </div>
  )
}
