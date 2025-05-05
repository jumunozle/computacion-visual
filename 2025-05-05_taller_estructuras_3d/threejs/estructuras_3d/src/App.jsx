import React, { useRef, useState, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Edges, Points, useHelper } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";

function Model({ mode }) {
  const obj = useLoader(OBJLoader, "/model.obj");

  return (
    <group>
      {obj.children.map((child, i) => {
        const geometry = child.geometry;

        return (
          <group key={i}>
            {mode === "faces" && (
              <mesh geometry={geometry}>
                <meshStandardMaterial color="orange" />
              </mesh>
            )}

            {mode === "edges" && (
              <mesh geometry={geometry}>
                <meshStandardMaterial color="black" wireframe />
                <Edges scale={1.05} color="black" />
              </mesh>
            )}

            {mode === "vertices" && (
              <points geometry={geometry}>
                <pointsMaterial size={0.02} color="red" />
              </points>
            )}
          </group>
        );
      })}
    </group>
  );
}


function InfoPanel({ geometry }) {
  const [info, setInfo] = useState({ vertices: 0 });

  useEffect(() => {
    if (geometry) {
      setInfo({ vertices: geometry.attributes.position.count });
    }
  }, [geometry]);

  return (
    <div style={{ position: "absolute", top: 10, left: 10, color: "#fff" }}>
      <p>Vértices: {info.vertices}</p>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("faces");

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [2, 2, 2] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model mode={mode} />
        <OrbitControls />
      </Canvas>

      <div style={{ position: "absolute", top: 10, right: 10 }}>
        <button onClick={() => setMode("faces")}>Caras</button>
        <button onClick={() => setMode("edges")}>Aristas</button>
        <button onClick={() => setMode("vertices")}>Vértices</button>
      </div>
    </div>
  );
}
