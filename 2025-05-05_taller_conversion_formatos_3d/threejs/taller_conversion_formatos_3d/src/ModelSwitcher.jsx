import React from 'react';
import { useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { MeshStandardMaterial } from 'three';

export default function ModelSwitcher({ type }) {
  if (type === 'gltf') {
    const { scene } = useGLTF('/models/model.glb');
    return (
      <group scale={1} position={[0, 0, 0]}> 
      <primitive object={scene} scale={1} />;
      </group>
    );
  } 

  if (type === 'obj') {
    const obj = useLoader(OBJLoader, '/models/model.obj');
    return (
      <group scale={0.020} position={[0, 0, 0]}>
        <primitive object={obj} />
      </group>
    );
  }
  


  if (type === 'stl') {
    const geometry = useLoader(STLLoader, '/models/model.stl');
    return (
      <mesh geometry={geometry} scale={1}>
        <meshStandardMaterial color="default" metalness={0.2} roughness={0.5} />
      </mesh>
    );
  }

  return null;
}
