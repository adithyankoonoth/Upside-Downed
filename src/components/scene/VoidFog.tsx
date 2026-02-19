"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface VoidFogProps {
  scrollProgress: number;
}

const FOG_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FOG_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * (sin(p.x) * sin(p.y));
      p *= 2.1;
      a *= 0.5;
    }
    return v * 0.5 + 0.5;
  }

  void main() {
    vec2 uv = vUv * 3.0 + uTime * 0.05;
    float fog = fbm(uv);
    float alpha = fog * uOpacity * smoothstep(0.0, 1.0, vUv.y) * smoothstep(1.0, 0.0, vUv.y);
    gl_FragColor = vec4(0.01, 0.04, 0.02, alpha * 0.4);
  }
`;

export function VoidFog({ scrollProgress }: VoidFogProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uOpacity: { value: 0 } }),
    []
  );

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = clock.elapsedTime * 0.5;
    const opacity = THREE.MathUtils.smoothstep(scrollProgress, 0.15, 0.5);
    matRef.current.uniforms.uOpacity.value = opacity;
  });

  return (
    <group>
      {/* Multiple fog planes at different depths */}
      {[-5, -15, -25, -35].map((z, i) => (
        <mesh key={i} position={[0, 0, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[80, 80, 2, 2]} />
          <shaderMaterial
            ref={i === 0 ? matRef : undefined}
            vertexShader={FOG_VERT}
            fragmentShader={FOG_FRAG}
            uniforms={i === 0 ? uniforms : { uTime: { value: 0 }, uOpacity: { value: 0 } }}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
