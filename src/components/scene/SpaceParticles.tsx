"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SpaceParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 1200;

  const { geo } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Tunnel distribution — wide but deep
      const angle = Math.random() * Math.PI * 2;
      const radius = 15 + Math.random() * 40;
      positions[i3]     = Math.cos(angle) * radius;
      positions[i3 + 1] = Math.sin(angle) * radius;
      positions[i3 + 2] = Math.random() * 160 - 100; // z: -100 to 60

      // Colour variation: mostly grey/blue, some red
      const t = Math.random();
      if (t < 0.15) {
        colors[i3] = 0.5; colors[i3+1] = 0.0; colors[i3+2] = 0.0; // dim red
      } else if (t < 0.3) {
        colors[i3] = 0.0; colors[i3+1] = 0.2; colors[i3+2] = 0.35; // dim blue
      } else {
        const g = 0.1 + Math.random() * 0.2;
        colors[i3] = g; colors[i3+1] = g; colors[i3+2] = g * 1.3; // grey-blue
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    return { geo };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    // Very subtle rotation — sense of drifting
    ref.current.rotation.z = clock.elapsedTime * 0.008;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}
