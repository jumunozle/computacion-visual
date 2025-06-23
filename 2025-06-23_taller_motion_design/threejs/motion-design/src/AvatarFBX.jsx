import { useLoader, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export default function AvatarFBX({ actionName }) {
  const group = useRef()
  const mixer = useRef()
  const { scene } = useThree()

  // Carga del modelo base y animaciones
  const model = useLoader(FBXLoader, '/models/Idle.fbx')
  const anims = {
    idle: useLoader(FBXLoader, '/models/Idle.fbx'),
    wave: useLoader(FBXLoader, '/models/Wave.fbx'),
    run: useLoader(FBXLoader, '/models/Run.fbx'),
    jump: useLoader(FBXLoader, '/models/Jump.fbx'),
  }

  useEffect(() => {
    model.scale.set(0.015, 0.015, 0.015)
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    group.current.add(model)

    mixer.current = new THREE.AnimationMixer(model)
    scene.add(model)

    return () => {
      if (mixer.current) mixer.current.stopAllAction()
    }
  }, [model])

  useEffect(() => {
    if (!mixer.current || !actionName) return
    const action = mixer.current.clipAction(anims[actionName].animations[0])
    mixer.current.stopAllAction()
    action.reset().fadeIn(0.3).play()
  }, [actionName])

  useEffect(() => {
    const clock = new THREE.Clock()
    const animate = () => {
      requestAnimationFrame(animate)
      mixer.current?.update(clock.getDelta())
    }
    animate()
  }, [])

  return <group ref={group} position={[0, -1.5, 0]} />
}

