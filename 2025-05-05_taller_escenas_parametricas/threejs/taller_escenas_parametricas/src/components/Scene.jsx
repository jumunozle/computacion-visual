// src/components/Scene.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import { objectsData } from '../data';

export function Scene() {
  const globalParams = useControls('Global', {
    showAll: true,
    rotationMultiplier: { value: 1, min: 0, max: 5 },
  });

  const cubeParams = useControls('Cube', {
    scale: { value: 1, min: 0.1, max: 3 },
    color: 'orange',
  });

  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {globalParams.showAll &&
        objectsData.map((obj) => {
          const scale = cubeParams.scale * obj.scale;
          const rotationY = obj.rotationY * globalParams.rotationMultiplier;

          return (
            <mesh
              key={obj.id}
              position={obj.position}
              rotation={[0, rotationY, 0]}
              scale={scale}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={cubeParams.color || obj.color} />
            </mesh>
          );
        })}
    </Canvas>
  );
}
