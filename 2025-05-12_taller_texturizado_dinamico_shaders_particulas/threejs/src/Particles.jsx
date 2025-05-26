import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";


// Acá definimos el material dinámico usando shaderMaterial
export function Particles({ count = 500, explode = false }) {
  const meshRef = useRef();
  const explosionStart = useRef(null);

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const radius = THREE.MathUtils.randFloat(1.8, 3.5);
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(THREE.MathUtils.randFloat(-1, 1));
      const heightOffset = Math.random() * Math.PI * 2;
      const speed = THREE.MathUtils.randFloat(0.2, 1);
      // Dirección de explosión aleatoria
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      ).normalize();
      data.push({ radius, theta, phi, heightOffset, speed, dir });
    }
    return data;
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Iniciar la explosión
    if (explode && explosionStart.current === null) {
      explosionStart.current = t;
    }
    // Resetear la explosión
    if (!explode && explosionStart.current !== null) {
      explosionStart.current = null;
    }

    // Si la explosión ha comenzado, calcular el progreso
    let explosionProgress = 0;
    if (explode && explosionStart.current !== null) {
      explosionProgress = Math.min((t - explosionStart.current) / 1.2, 1); // 1.2s de animación
    }


    // Actualizar la posición de las partículas
    // y aplicar la explosión
    for (let i = 0; i < count; i++) {
      const { radius, theta, phi, heightOffset, speed, dir } = particles[i];
      const animatedTheta = theta + t * speed;
      const x = radius * Math.sin(phi) * Math.cos(animatedTheta);
      const y = radius * Math.cos(phi) + Math.sin(t * 2 + heightOffset);
      const z = radius * Math.sin(phi) * Math.sin(animatedTheta);

      // Si explota, mueve la partícula hacia afuera
      let pos = new THREE.Vector3(x, y, z);
      if (explode && explosionStart.current !== null) {
        pos = pos.add(dir.clone().multiplyScalar(explosionProgress * 6)); // 6 = fuerza de explosión
      }

        // Aplicar un movimiento de rebote
      const scale = 0.2 + 0.1 * Math.sin(t * 2 + i);

      meshRef.current.setMatrixAt(
        i,
        new THREE.Matrix4().compose(
          pos,
          new THREE.Quaternion(),
          new THREE.Vector3(scale, scale, scale)
        )
      );
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (

    // InstancedMesh para crear múltiples partículas

    // Se usa un material estándar con color blanco y un brillo azul
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="white" emissive="#00ffff" />
    </instancedMesh>
  );
}