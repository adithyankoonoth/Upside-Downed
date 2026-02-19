"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface VinesProps {
  scrollProgress: number;
}

function generateVinePath(
  seed: number,
  startZ: number,
  endZ: number,
  side: number
): THREE.Vector3[] {
  const rng = (n: number) => Math.sin(seed * 127.1 + n * 311.7) * 0.5 + 0.5;
  const points: THREE.Vector3[] = [];
  const segments = 20;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const z = THREE.MathUtils.lerp(startZ, endZ, t);
    const x = side * (4 + rng(i) * 10 + Math.sin(t * Math.PI * 3 + seed) * 3);
    const y = (rng(i + 10) - 0.5) * 12 + Math.cos(t * Math.PI * 2 + seed) * 4;
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}

interface VineMeshProps {
  seed: number;
  startZ: number;
  endZ: number;
  side: number;
  thickness: number;
  scrollProgress: number;
}

function VineMesh({ seed, startZ, endZ, side, thickness, scrollProgress }: VineMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const points = generateVinePath(seed, startZ, endZ, side);
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 60, thickness, 6, false);
  }, [seed, startZ, endZ, side, thickness]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    // Subtle swaying
    const t = clock.elapsedTime;
    meshRef.current.rotation.z = Math.sin(t * 0.3 + seed) * 0.02;

    // Fade in during phase 2
    const opacity = THREE.MathUtils.smoothstep(scrollProgress, 0.15, 0.4);
    (meshRef.current.material as THREE.MeshStandardMaterial).opacity = opacity * 0.85;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#0d1a05"
        roughness={0.9}
        metalness={0.1}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

export function Vines({ scrollProgress }: VinesProps) {
  const vineConfigs = useMemo(() => {
    const configs = [];
    // Left side vines
    for (let i = 0; i < 8; i++) {
      configs.push({ seed: i * 13.7, startZ: 35 - i * 5, endZ: -50, side: -1, thickness: 0.08 + Math.random() * 0.12 });
    }
    // Right side vines
    for (let i = 0; i < 8; i++) {
      configs.push({ seed: i * 7.3 + 100, startZ: 35 - i * 5, endZ: -50, side: 1, thickness: 0.08 + Math.random() * 0.12 });
    }
    // Ceiling/floor vines
    for (let i = 0; i < 5; i++) {
      configs.push({ seed: i * 23.1 + 200, startZ: 20 - i * 8, endZ: -50, side: 0.1, thickness: 0.05 });
    }
    return configs;
  }, []);

  return (
    <group>
      {vineConfigs.map((cfg, i) => (
        <VineMesh key={i} {...cfg} scrollProgress={scrollProgress} />
      ))}
    </group>
  );
}
