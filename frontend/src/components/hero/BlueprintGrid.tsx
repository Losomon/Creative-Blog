'use client';

import { Grid } from '@react-three/drei';

/**
 * The dark "architectural" floor grid beneath the exploded UI stack.
 * Kept subtle on purpose — precision, not sci-fi dashboard.
 */
export default function BlueprintGrid() {
  return (
    <Grid
      position={[0, -1.35, 0]}
      args={[24, 24]}
      cellSize={0.5}
      cellThickness={0.5}
      cellColor="#1c2620"
      sectionSize={2.5}
      sectionThickness={1}
      sectionColor="#3a4a3a"
      fadeDistance={11}
      fadeStrength={1.5}
      infiniteGrid
    />
  );
}
