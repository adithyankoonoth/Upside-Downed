"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AshParticlesProps {
  count: number;
  scrollProgress: number;
}

export function AshParticles({ count, scrollProgress }: AshParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, velocities, sizes } = useMemo(() => {
    const positions  = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes      = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles in a tunnel shape around camera path
      positions[i3]     = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = Math.random() * 80 - 10; // Z range -10 to 70

      // Drift toward camera (negative Z velocity)
      velocities[i3]     = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.008 - 0.003; // slight downward
      velocities[i3 + 2] = Math.random() * 0.06 + 0.02; // toward camera

      sizes[i] = Math.random() * 0.12 + 0.03;
    }
    return { positions, velocities, sizes };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, sizes]);

  const currentPositions = useMemo(() => positions.slice(), [positions]);

  useFrame(() => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3]     += velocities[i3];
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];

      // Reset particle when it passes the camera
      if (pos[i3 + 2] > 80) {
        pos[i3]     = (Math.random() - 0.5) * 30;
        pos[i3 + 1] = (Math.random() - 0.5) * 20;
        pos[i3 + 2] = -10;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Fade out particles as we go deep
    if (meshRef.current.material) {
      (meshRef.current.material as THREE.PointsMaterial).opacity =
        Math.max(0, 1 - scrollProgress * 3);
    }
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        color="#8a9bb0"
        size={0.12}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
