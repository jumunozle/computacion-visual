import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import { AnimatedModel } from './AnimatedModel';
import './App.css';

export default function App() {
  const [currentAnim, setCurrentAnim] = useState('mixamo.com');
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentAnim('Take 001');
        setShowText(true); // mostrar texto mientras corre
      }
    };

    const handleKeyUp = () => {
      setCurrentAnim('mixamo.com');
      setShowText(false); // ocultar texto
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="container">
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} />
        <Suspense fallback={null}>
          <AnimatedModel animation={currentAnim} position={[0, 0, 0]} />
        </Suspense>
        <OrbitControls />
      </Canvas>

      {/* Botones para cambio manual */}
      <div className="buttons">
        <button onClick={() => setCurrentAnim('mixamo.com')}>Animación 1</button>
        <button onClick={() => setCurrentAnim('Take 001')}>Animación 2</button>
      </div>

      {/* Texto sincronizado con animación */}
      {showText && (
        <div className="sync-text">
          🏃‍♂️ El personaje está corriendo...
        </div>
      )}
    </div>
  );
}
