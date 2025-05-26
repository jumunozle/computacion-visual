// src/SceneModels.jsx
import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { LOD } from "three";

function createLOD(model) {
  const lod = new LOD();

  const high = model.scene.clone();
  const medium = model.scene.clone();
  const low = model.scene.clone();

  medium.traverse((child) => {
    if (child.isMesh) {
      child.geometry = child.geometry.clone();
      child.geometry = child.geometry.toNonIndexed();
      child.geometry.deleteAttribute("normal");
    }
  });

  low.traverse((child) => {
    if (child.isMesh) {
      child.geometry = child.geometry.clone();
      child.geometry = child.geometry.toNonIndexed();
      child.geometry.deleteAttribute("normal");
      child.geometry.deleteAttribute("uv");
    }
  });

  lod.addLevel(high, 0);   // cerca
  lod.addLevel(medium, 30); // media distancia
  lod.addLevel(low, 70);   // lejos

  return lod;
}

export default function SceneModels() {
  const model1 = useGLTF("/model5.glb");
  const model6 = useGLTF("/model5lowpoly.glb");
  const model2 = useGLTF("/model1.glb");
  const model3 = useGLTF("/model1lowpolyluces.glb");
  const model4 = useGLTF("/scene.gltf");
  const model5 = useGLTF("/amongusoptimizado.gltf");

  const lod1 = useMemo(() => createLOD(model1), [model1]);
  const lod2 = useMemo(() => createLOD(model2), [model2]);
  const lod3 = useMemo(() => createLOD(model3), [model3]);
  const lod4 = useMemo(() => createLOD(model4), [model4]);
  const lod5 = useMemo(() => createLOD(model5), [model5]);
  const lod6 = useMemo(() => createLOD(model6), [model6]);

  return (
    <>
      <primitive object={lod1} position={[-5, 0, 0]} />
      <primitive object={lod2} position={[2, 0, 0]} />
      <primitive object={lod3} position={[5, 0, 0]} />
      <primitive object={lod4} position={[8, 0, 0]} />
      <primitive object={lod5} position={[10, 0, 0]} />
      <primitive object={lod6} position={[-2, 0, 0]} />
    </>
  );
}
