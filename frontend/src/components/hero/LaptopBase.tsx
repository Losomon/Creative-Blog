'use client';

/**
 * Option A from the plan: laptop built entirely from Three.js primitives.
 * Kept low-poly and implied rather than literal — the exploded UI layers
 * above it are the real subject, the laptop just grounds the composition.
 * Swap this out for a Blender-authored laptop.glb + useGLTF() later
 * without touching any other part of the scene.
 */
export default function LaptopBase() {
  return (
    <group position={[0, -1.3, 0.3]}>
      {/* keyboard deck */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[3.4, 0.12, 2.1]} />
        <meshStandardMaterial color="#2b2d2b" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* trackpad */}
      <mesh position={[0, 0.065, 0.55]}>
        <boxGeometry args={[1, 0.01, 0.65]} />
        <meshStandardMaterial color="#3a3c3a" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* hinge */}
      <mesh position={[0, 0.02, -1.05]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 3.3, 16]} />
        <meshStandardMaterial color="#161716" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* ambient glow spill under the deck, reads as the lime uplight in the reference */}
      <pointLight position={[0, 0.4, 0]} color="#d6f439" intensity={2.2} distance={3.5} decay={2} />
    </group>
  );
}
