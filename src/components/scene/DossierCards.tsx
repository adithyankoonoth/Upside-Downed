"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { DOSSIERS } from "@/lib/constants";

interface DossierCardsProps {
  scrollProgress: number;
}

const CARD_VERT = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const CARD_FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec3  uAccent;
  uniform float uReveal;
  uniform vec2  uMouse;
  varying vec2  vUv;
  varying vec3  vNormal;

  float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    float edge = smoothstep(0.0,0.025,uv.x)*smoothstep(1.0,0.975,uv.x)
               * smoothstep(0.0,0.025,uv.y)*smoothstep(1.0,0.975,uv.y);

    // Glass base
    vec3 col = mix(vec3(0.01,0.01,0.03), vec3(0.04,0.05,0.08), edge);

    // Fresnel
    float fresnel = pow(1.0 - abs(vNormal.z), 2.5);
    col += uAccent * fresnel * 0.35;

    // Scanlines
    float scan = sin(uv.y * 90.0 + uTime * 1.5) * 0.025 + 0.975;
    col *= scan;

    // Abstract figure (head + body)
    vec2 c = uv - vec2(0.5, 0.52);
    float head = smoothstep(0.10, 0.085, length(c - vec2(0.0, 0.20)));
    float body = smoothstep(0.14, 0.11,  length(c * vec2(0.65, 1.0)));
    float fig  = max(head, body);

    // Flashlight circle
    float fl = smoothstep(0.42, 0.08, length(uv - (uMouse * 0.5 + 0.5)));
    float reveal = uReveal;

    col += uAccent * fig * (0.25 + fl * 0.75) * reveal;

    // Noise / sketch texture
    float noise = (rand(uv*100.0)*0.7 + rand(uv*30.0)*0.3) * 0.1;
    col += noise * fl * reveal;

    // Border glow
    float border = 1.0 - edge;
    col += uAccent * border * 0.5 * (sin(uTime*1.5)*0.25+0.75);

    float alpha = (edge * 0.75 + border * 0.4) * reveal;
    gl_FragColor = vec4(col, alpha);
  }
`;

function Card({
  dossier,
  index,
  scrollProgress,
}: {
  dossier: typeof DOSSIERS[0];
  index: number;
  scrollProgress: number;
}) {
  const matRef   = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Cards enter view during phase 4-5 (0.55 - 0.88)
  // Each card staggers by 0.08
  const cardRevealStart = 0.55 + index * 0.08;
  const cardRevealPeak  = cardRevealStart + 0.06;

  const color = useMemo(() => new THREE.Color(dossier.accentColor), [dossier.accentColor]);
  const uniforms = useMemo(
    () => ({
      uTime:   { value: 0 },
      uAccent: { value: color },
      uReveal: { value: 0 },
      uMouse:  { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [color]
  );

  useFrame(({ clock, pointer }) => {
    if (!matRef.current || !groupRef.current) return;
    matRef.current.uniforms.uTime.value = clock.elapsedTime;

    const t = Math.max(0, Math.min(1,
      (scrollProgress - cardRevealStart) / (cardRevealPeak - cardRevealStart)
    ));
    matRef.current.uniforms.uReveal.value = t;
    matRef.current.uniforms.uMouse.value.lerp(pointer, 0.08);

    // Float
    groupRef.current.position.y =
      dossier.position[1] + Math.sin(clock.elapsedTime * 0.6 + index * 2.1) * 0.18;
    groupRef.current.rotation.y =
      Math.sin(clock.elapsedTime * 0.35 + index) * 0.07 + (hovered ? 0.08 : 0);
    groupRef.current.rotation.x =
      Math.sin(clock.elapsedTime * 0.28 + index) * 0.04;
  });

  return (
    <group
      ref={groupRef}
      position={dossier.position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <mesh>
        <planeGeometry args={[4, 5.8, 1, 1]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={CARD_VERT}
          fragmentShader={CARD_FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <Text
        position={[0, 2.5, 0.05]}
        fontSize={0.22}
        color={dossier.accentColor}
        anchorX="center"
        letterSpacing={0.1}
      >
        {dossier.name}
      </Text>
      <Text
        position={[0, 2.18, 0.05]}
        fontSize={0.12}
        color="#4a5568"
        anchorX="center"
        letterSpacing={0.07}
      >
        {`/ ${dossier.codename} /`}
      </Text>
      <Text
        position={[0, -2.1, 0.05]}
        fontSize={0.15}
        color={dossier.accentColor}
        anchorX="center"
        maxWidth={3.4}
        textAlign="center"
        letterSpacing={0.05}
      >
        {`MISSION: ${dossier.mission}`}
      </Text>
      <Text
        position={[0, -2.62, 0.05]}
        fontSize={0.095}
        color="#2d3748"
        anchorX="center"
        maxWidth={3.5}
        textAlign="center"
      >
        {dossier.description}
      </Text>
    </group>
  );
}

export function DossierCards({ scrollProgress }: DossierCardsProps) {
  return (
    <group>
      {DOSSIERS.map((d, i) => (
        <Card key={d.id} dossier={d} index={i} scrollProgress={scrollProgress} />
      ))}
    </group>
  );
}
