import { useFBX, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';

export function AnimatedModel({ animation = 'Idle', ...props }) {
  const group = useRef();
  const model = useFBX('/personaje.fbx');
  const { actions, names } = useAnimations(model.animations, group);

useEffect(() => {
  console.log('Animaciones disponibles:', names);

  const action = actions?.[animation];
  if (action) {
    action.reset().fadeIn(0.2).play();

    return () => {
      if (action.isRunning()) {
        action.fadeOut(0.2);
      }
    };
  }
}, [animation, actions]);


  return <primitive ref={group} object={model} scale={0.01} {...props} />;
}
