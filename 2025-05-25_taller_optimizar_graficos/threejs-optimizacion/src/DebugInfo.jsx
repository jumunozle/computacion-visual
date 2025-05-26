// src/DebugInfo.jsx
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function DebugInfo() {
  const { gl } = useThree();

  useFrame(() => {
    const info = gl.info;
    console.clear();
    console.log("Draw Calls:", info.render.calls);
    console.log("Triangles:", info.render.triangles);
    console.log("Geometries:", info.memory.geometries);
    console.log("Textures:", info.memory.textures);
  });

  return null;
}
