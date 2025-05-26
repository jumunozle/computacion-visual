import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import * as THREE from "three";
import { DynamicShaderSphere } from "./DynamicShaderSphere";
import { Particles } from "./Particles"; // Cambio de nombre aquí

// Función principal de la aplicación
function App() {

  // Estado para manejar el mouse y la explosión
  const [mouse, setMouse] = useState(new THREE.Vector2());
  const [explode, setExplode] = useState(false);

  // Actualizar la posición del mouse
  useEffect(() => {
    const updateMouse = (e) => {
      setMouse(new THREE.Vector2(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      ));
    };
    // Agregar el evento de movimiento del mouse
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);



  // Resetear la explosión después de 1.5 segundos
  useEffect(() => {
    if (explode) {
      const timeout = setTimeout(() => setExplode(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [explode]);



  return (

    // Contenedor principal de la aplicación
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <DynamicShaderSphere mouse={mouse} onClick={() => setExplode(true)} />
        <Particles count={1000} explode={explode} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;