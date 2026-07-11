"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function WireframePanel() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Slow, deliberate rotation — matches the "cinematic" motion mode, never fast or bouncy.
    group.current.rotation.y = Math.sin(t * 0.15) * 0.18;
    group.current.position.y = Math.sin(t * 0.4) * 0.05;
  });

  const blueprintBlue = "#4A7FE8";

  return (
    <group ref={group}>
      {/* Outer frame */}
      <mesh>
        <boxGeometry args={[2.4, 1.6, 0.02]} />
        <meshBasicMaterial
          color={blueprintBlue}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Inner layout blocks — suggests a UI without literally drawing one */}
      <mesh position={[-0.55, 0.35, 0.01]}>
        <boxGeometry args={[1.1, 0.5, 0.01]} />
        <meshBasicMaterial color={blueprintBlue} wireframe transparent opacity={0.4} />
      </mesh>
      <mesh position={[0.65, -0.15, 0.01]}>
        <boxGeometry args={[0.7, 0.9, 0.01]} />
        <meshBasicMaterial color={blueprintBlue} wireframe transparent opacity={0.4} />
      </mesh>
      <mesh position={[-0.55, -0.35, 0.01]}>
        <boxGeometry args={[1.1, 0.3, 0.01]} />
        <meshBasicMaterial color={blueprintBlue} wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function Hologram() {
  return (
    <div
      className="h-full w-full"
      role="img"
      aria-label="A translucent, glowing wireframe diagram of a user interface, slowly rotating, representing a design being drafted in mid-air above the desk."
    >
      <Canvas camera={{ position: [0, 0, 4.2], fov: 40 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.6} />
        <WireframePanel />
      </Canvas>
    </div>
  );
}
