'use client';

import { useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface LayerProps {
  scrollRef: MutableRefObject<number>;
  basePosition: [number, number, number];
  rotation: [number, number, number];
  explodeAxis: [number, number, number];
  explodeDistance: number;
  children: React.ReactNode;
}

/**
 * A single "exploded view" layer. On scroll (0 -> 1) it slides outward
 * along its own explodeAxis, giving the stack -> exploded-diagram effect
 * described in the plan. Content is real DOM via <Html transform>, so it
 * stays crisp, accessible, and easy to restyle with Tailwind.
 */
function ExplodeLayer({
  scrollRef,
  basePosition,
  rotation,
  explodeAxis,
  explodeDistance,
  children,
}: LayerProps) {
  const group = useRef<THREE.Group>(null);
  const axis = new THREE.Vector3(...explodeAxis).normalize();

  useFrame(() => {
    if (!group.current) return;
    const t = scrollRef.current;
    const target = new THREE.Vector3(...basePosition).addScaledVector(axis, t * explodeDistance);
    group.current.position.lerp(target, 0.08);
  });

  return (
    <group ref={group} position={basePosition} rotation={rotation}>
      <Html transform distanceFactor={3.6} occlude={false} zIndexRange={[1, 0]}>
        {children}
      </Html>
    </group>
  );
}

export default function FloatingUI({ scrollRef }: { scrollRef: MutableRefObject<number> }) {
  return (
    <group position={[0.15, 0.55, 0]}>
      {/* ghost layer — furthest back, barely visible */}
      <ExplodeLayer
        scrollRef={scrollRef}
        basePosition={[0.55, 0.5, -0.9]}
        rotation={[0.05, -0.42, 0]}
        explodeAxis={[0.2, 0.6, -1]}
        explodeDistance={0.9}
      >
        <div className="h-[300px] w-[270px] rounded-md border border-white/10 bg-white/[0.02]" />
      </ExplodeLayer>

      {/* code layer — back right */}
      <ExplodeLayer
        scrollRef={scrollRef}
        basePosition={[1.1, 0.15, -0.55]}
        rotation={[0.03, -0.46, 0]}
        explodeAxis={[0.6, 0.1, -1]}
        explodeDistance={0.8}
      >
        <div className="h-[300px] w-[230px] overflow-hidden rounded-md border border-white/10 bg-gradient-to-br from-[#101412]/95 to-[#08090a]/95 p-3.5 font-mono text-[10px] leading-[1.8] text-[#89ddb3]">
          <div><span className="text-[#c792ea]">function</span> <span className="text-[#82aaff]">Layout</span>() {'{'}</div>
          <div>&nbsp;&nbsp;<span className="text-[#c792ea]">const</span> [state] = <span className="text-[#82aaff]">useState</span>()</div>
          <div>&nbsp;&nbsp;<span className="text-[#c792ea]">return</span> (</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-[#89ddb3]">Grid</span>&gt;</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-[#89ddb3]">Header</span> /&gt;</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-[#89ddb3]">Content</span> /&gt;</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-[#89ddb3]">Grid</span>&gt;</div>
          <div>&nbsp;&nbsp;)</div>
          <div>{'}'}</div>
          <div className="text-[#546056]">// design system v2</div>
        </div>
      </ExplodeLayer>

      {/* main content layer — front, lime-bordered */}
      <ExplodeLayer
        scrollRef={scrollRef}
        basePosition={[0, 0, 0]}
        rotation={[0.02, -0.16, 0]}
        explodeAxis={[-0.3, 0.4, 1]}
        explodeDistance={0.7}
      >
        <div className="h-[300px] w-[300px] rounded-md border border-lime/35 bg-gradient-to-br from-[#14201a] to-[#0c0f0e] p-6 shadow-[0_0_50px_-6px_rgba(214,244,57,0.35)]">
          <div className="mb-8 font-mono text-[9px] tracking-[0.2em] text-[#7d8a7d]">
            SOLO DESIGN
          </div>
          <h3 className="font-serif text-2xl leading-[1.2] text-white">
            Designed.
            <br />
            <em className="text-lime not-italic">Engineered.</em>
            <br />
            Documented.
          </h3>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1.5 font-mono text-[10px] font-bold text-ink">
            Read more →
          </div>
        </div>
      </ExplodeLayer>

      {/* light UI card — front-most, overlapping */}
      <ExplodeLayer
        scrollRef={scrollRef}
        basePosition={[0.85, -0.55, 0.35]}
        rotation={[0.02, -0.16, 0]}
        explodeAxis={[0.8, -0.5, 1.2]}
        explodeDistance={0.6}
      >
        <div className="relative h-[150px] w-[190px] rounded-md border border-black/5 bg-gradient-to-br from-[#eeeee6]/95 to-[#d6d6ca]/95 p-3.5 shadow-xl">
          <div className="mb-2 h-1.5 w-[78%] rounded bg-black/10" />
          <div className="mb-2 h-1.5 w-[55%] rounded bg-black/10" />
          <div className="mt-2 h-10 w-full rounded bg-black/[0.06]" />
          <div className="mt-2 h-1.5 w-[55%] rounded bg-black/10" />
          <div className="absolute bottom-2.5 right-2.5 h-4 w-4 rounded-full bg-lime" />
        </div>
      </ExplodeLayer>
    </group>
  );
}
