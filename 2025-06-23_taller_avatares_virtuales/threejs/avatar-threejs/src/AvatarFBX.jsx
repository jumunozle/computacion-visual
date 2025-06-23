// src/AvatarFBX.jsx
import React, { useEffect, useRef } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useAnimations } from '@react-three/drei'
import * as THREE from 'three'

export default function AvatarFBX({ playAnimation, color }) {
  const group = useRef()
  const avatar = useLoader(FBXLoader, '/avatar.fbx')
  const { animations } = avatar
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    avatar.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone()
        child.material.color = new THREE.Color(color)
        child.material.needsUpdate = true
      }
    })
  }, [avatar, color])

  useEffect(() => {
    if (playAnimation && actions && actions[animations[0]?.name]) {
      actions[animations[0].name].reset().fadeIn(0.5).play()
    }
  }, [playAnimation, actions, animations])

  return <primitive object={avatar} ref={group} scale={0.01} position={[0, 0, 0]} />
}
