'use client';

import { Suspense, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import BlueprintGrid from './BlueprintGrid';
import LaptopBase from './LaptopBase';
import FloatingUI from './FloatingUI';
import LayerAnnotations from './LayerAnnotations';

/** Rotates the whole rig a few degrees toward the pointer — parallax, not free orbit. */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const targetY = state.pointer.x * 0.12;
    const targetX = -state.pointer.y * 0.06;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.04);
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene({ scrollRef }: { scrollRef: MutableRefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0.6, 0.9, 5.4], fov: 32 }}
    >
      <color attach="background" args={['#0a0d0e']} />
      <fog attach="fog" args={['#0a0d0e', 6, 12]} />

      <ambientLight intensity={0.35} />
      <hemisphereLight args={['#3a4a3a', '#0a0d0e', 0.4]} />
      <directionalLight position={[3, 4, 2]} intensity={0.6} color="#e8ede2" />
      <pointLight position={[-2, 1, 2]} intensity={0.8} color="#d6f439" distance={6} decay={2} />

      <Suspense fallback={null}>
        <ParallaxRig>
          <BlueprintGrid />
          <LaptopBase />
          <FloatingUI scrollRef={scrollRef} />
          <LayerAnnotations />
        </ParallaxRig>
      </Suspense>
    </Canvas>
  );
}
