"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MindFlayerProps {
  scrollProgress: number;
}

const FLAYER_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  varying vec2 vUv;
  varying vec3 vPos;

  void main() {
    vUv = uv;
    vPos = position;
    vec3 pos = position;

    // Writhing motion
    float wave = sin(pos.y * 1.5 + uTime * 2.0) * uReveal * 0.4;
    float wave2 = cos(pos.x * 2.0 + uTime * 1.5) * uReveal * 0.3;
    pos.x += wave;
    pos.z += wave2;

    // Top tentacles
    if (pos.y > 0.3) {
      float tentacle = smoothstep(0.3, 1.0, pos.y);
      pos.x += sin(pos.y * 6.0 + uTime * 3.0) * tentacle * uReveal * 1.5;
      pos.z += cos(pos.y * 4.0 + uTime * 2.5) * tentacle * uReveal * 0.8;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FLAYER_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  varying vec2 vUv;
  varying vec3 vPos;

  void main() {
    // Fog/shadow effect — darker center, wispy edges
    float centerDist = length(vUv - 0.5);
    float body = 1.0 - smoothstep(0.0, 0.5, centerDist);
    body = pow(body, 1.2);

    // Animated fog wisps
    float wisp = sin(vUv.x * 12.0 + uTime) * cos(vUv.y * 8.0 + uTime * 0.7) * 0.3 + 0.7;
    body *= wisp;

    // Deep red/black color
    vec3 col = mix(vec3(0.05, 0.0, 0.0), vec3(0.18, 0.01, 0.01), body);

    // Faint red aura at edges of tentacles
    float aura = smoothstep(0.3, 0.0, centerDist) * 0.3;
    col += vec3(0.6, 0.0, 0.0) * aura;

    float alpha = body * 0.85 * uReveal;
    gl_FragColor = vec4(col, alpha);
  }
`;

// Tentacle mesh
function Tentacle({ seed, length, scrollProgress }: { seed: number; length: number; scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const angle = (seed / 8) * Math.PI * 2;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const x = Math.cos(angle) * t * 5 + Math.sin(t * Math.PI * 3 + seed) * t * 2;
      const y = length * t + Math.cos(t * Math.PI * 2 + seed) * t;
      const z = Math.sin(angle) * t * 3;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 30, 0.15, 6, false);
  }, [seed, length]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const reveal = THREE.MathUtils.smoothstep(scrollProgress, 0.82, 0.95);
    (meshRef.current.material as THREE.MeshStandardMaterial).opacity = reveal * 0.7;
    // Writhing
    meshRef.current.rotation.z = Math.sin(clock.elapsedTime * 1.5 + seed) * 0.1;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#1a0000"
        roughness={1}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

export function MindFlayer({ scrollProgress }: MindFlayerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyMatRef = useRef<THREE.ShaderMaterial>(null);

  const bodyUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uReveal: { value: 0 } }),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current || !bodyMatRef.current) return;
    bodyMatRef.current.uniforms.uTime.value = clock.elapsedTime;

    const reveal = THREE.MathUtils.smoothstep(scrollProgress, 0.82, 0.95);
    bodyMatRef.current.uniforms.uReveal.value = reveal;

    // Slow ominous sway
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.08;
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.5 - 2;
  });

  return (
    <group ref={groupRef} position={[0, 0, -55]}>
      {/* Main body mass */}
      <mesh>
        <sphereGeometry args={[10, 24, 24]} />
        <shaderMaterial
          ref={bodyMatRef}
          vertexShader={FLAYER_VERT}
          fragmentShader={FLAYER_FRAG}
          uniforms={bodyUniforms}
          transparent
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Tentacles radiating outward */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Tentacle key={i} seed={i} length={8 + i * 0.5} scrollProgress={scrollProgress} />
      ))}

      {/* Ambient red haze behind flayer */}
      <mesh>
        <sphereGeometry args={[18, 16, 16]} />
        <meshBasicMaterial
          color="#1a0000"
          transparent
          opacity={0.25}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
