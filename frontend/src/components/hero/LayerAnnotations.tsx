'use client';

import { Html, Line } from '@react-three/drei';

interface Callout {
  label: string;
  sub: string[];
  anchor: [number, number, number];
  labelPos: [number, number, number];
  align: 'left' | 'right';
}

const CALLOUTS: Callout[] = [
  {
    label: 'UI Layer',
    sub: ['Typography', 'Components'],
    anchor: [0.35, 1.35, 0.15],
    labelPos: [0.05, 2.05, 0.15],
    align: 'right',
  },
  {
    label: 'Code Layer',
    sub: ['React / Next.js', 'TypeScript', 'Design System'],
    anchor: [1.75, 0.75, -0.5],
    labelPos: [2.15, 1.55, -0.5],
    align: 'left',
  },
  {
    label: 'Structure',
    sub: ['Grid', 'Layout', 'Hierarchy'],
    anchor: [-1.35, 0.35, 0.25],
    labelPos: [-2.05, 0.75, 0.25],
    align: 'left',
  },
];

export default function LayerAnnotations() {
  return (
    <group>
      {CALLOUTS.map((c) => (
        <group key={c.label}>
          <Line
            points={[c.anchor, c.labelPos]}
            color="#6b7169"
            lineWidth={1}
            dashed={false}
          />
          <Html position={c.labelPos} center={false} zIndexRange={[2, 1]}>
            <div
              className={`w-[140px] font-mono text-[10px] leading-relaxed text-[#8f948e] ${
                c.align === 'right' ? 'text-right' : 'text-left'
              }`}
            >
              <b className="mb-0.5 block text-[11px] font-medium text-[#e4e4dc]">{c.label}</b>
              {c.sub.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
