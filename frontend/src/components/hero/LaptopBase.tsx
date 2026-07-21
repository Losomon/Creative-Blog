'use client';

import { useGLTF } from '@react-three/drei';

export default function LaptopBase() {
  const { scene } = useGLTF('/models/macbook_pro_2021.glb');

  return (
    <primitive
      object={scene}
      position={[0, -1.3, 0.3]}
      rotation={[0, Math.PI, 0]}
      scale={0.4}
    />
  );
}

useGLTF.preload('/models/macbook_pro_2021.glb');
