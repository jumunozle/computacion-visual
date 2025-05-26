import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Plane() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0] }));
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#777" />
    </mesh>
  );
}

function Box({ position = [0, 2, 0] }) {
  const [color, setColor] = useState("orange");
  const [ref] = useBox(() => ({
    mass: 1,
    position,
    onCollide: () => {
      const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
      setColor(`#${randomColor.getHexString()}`);
    },
  }));

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Scene() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBoxes((prev) => [
        ...prev,
        {
          id: Math.random(),
          position: [
            (Math.random() - 0.5) * 4,
            5 + Math.random() * 2,
            (Math.random() - 0.5) * 4,
          ],
        },
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <OrbitControls />
      <Physics>
        <Plane />
        {boxes.map((b) => (
          <Box key={b.id} position={b.position} />
        ))}
      </Physics>
    </Canvas>
  );
}

export default function App() {
  return <Scene />;
}