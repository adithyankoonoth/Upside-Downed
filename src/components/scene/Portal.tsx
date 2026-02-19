"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PortalProps {
  scrollProgress: number;
}

const PORTAL_VERT = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPos;
  uniform float uTime;

  void main() {
    vUv = uv;
    vPos = position;
    vec3 pos = position;
    // Subtle vertex displacement at edges
    float edge = smoothstep(0.3, 1.0, length(uv - 0.5) * 2.0);
    pos.z += sin(uTime * 2.0 + length(position.xy) * 3.0) * edge * 0.2;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const PORTAL_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  varying vec2 vUv;

  // pseudo-random
  float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv - 0.5;
    float len = length(uv);

    // Rift shape — elongated tear
    float angle = atan(uv.y, uv.x);
    float riftShape = 1.0 - smoothstep(0.0, 0.45 - abs(sin(angle) * 0.38), len);

    // Inner glow
    float innerGlow = 1.0 - smoothstep(0.0, 0.25, len);
    innerGlow = pow(innerGlow, 1.5);

    // Animated energy tendrils
    float tendril = sin(angle * 8.0 + uTime * 3.0) * 0.5 + 0.5;
    tendril *= sin(len * 20.0 - uTime * 5.0) * 0.5 + 0.5;
    tendril *= smoothstep(0.45, 0.1, len);

    // Flickering static at edges
    float noise = rand(uv + uTime * 0.1) * smoothstep(0.2, 0.45, len);

    // Color composite
    vec3 coreColor  = vec3(1.0, 0.15, 0.05);   // hot white-red
    vec3 midColor   = vec3(0.9, 0.0, 0.0);     // deep red
    vec3 edgeColor  = vec3(0.5, 0.0, 0.0);     // dark red

    vec3 col = mix(edgeColor, midColor, riftShape);
    col = mix(col, coreColor, innerGlow);
    col += tendril * vec3(1.0, 0.3, 0.1) * 0.6;
    col += noise * vec3(1.0, 0.0, 0.0) * 0.3;

    float alpha = riftShape * 0.95 + tendril * 0.3;
    alpha = clamp(alpha, 0.0, 1.0);

    // Fade in with scroll
    alpha *= smoothstep(0.0, 0.1, uProgress);

    gl_FragColor = vec4(col, alpha);
  }
`;

export function Portal({ scrollProgress }: PortalProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  const uniforms = useMemo(
    () => ({
      uTime:     { value: 0 },
      uProgress: { value: 0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = clock.elapsedTime;
    matRef.current.uniforms.uProgress.value = scrollProgress;

    if (groupRef.current) {
      // Subtle rotation
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.3) * 0.05;
      // Scale pulse
      const scale = 1 + Math.sin(clock.elapsedTime * 1.5) * 0.03;
      groupRef.current.scale.setScalar(scale);
    }
  });

  // Portal is at Z=30 (world space)
  return (
    <group ref={groupRef} position={[0, 0, 30]}>
      {/* Main rift plane */}
      <mesh>
        <planeGeometry args={[12, 18, 32, 32]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={PORTAL_VERT}
          fragmentShader={PORTAL_FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial color="#ff1a1a" transparent opacity={0.15} />
      </mesh>

      {/* Outer halo ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[6, 0.3, 8, 64]} />
        <meshBasicMaterial color="#ff0000" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
