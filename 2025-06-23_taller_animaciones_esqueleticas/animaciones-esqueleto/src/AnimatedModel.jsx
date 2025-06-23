import { useFBX, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';

export function AnimatedModel({ animation = 'Idle', ...props }) {
  const group = useRef();
  const model = useFBX('/personaje.fbx');
  const { actions, names } = useAnimations(model.animations, group);

  useEffect(() => {
    console.log('Animaciones disponibles:', names);
    if (actions && actions[animation]) {
      actions[animation].reset().fadeIn(0.2).play();
      return () => actions[animation].fadeOut(0.2);
    }
  }, [animation]);

  return <primitive ref={group} object={model} scale={0.01} {...props} />;
}
