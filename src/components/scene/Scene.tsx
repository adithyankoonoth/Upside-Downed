"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";
import { CameraRig } from "./CameraRig";
import { Portal } from "./Portal";
import { AshParticles } from "./AshParticles";
import { Vines } from "./Vines";
import { DossierCards } from "./DossierCards";
import { MindFlayer } from "./MindFlayer";
import { VoidFog } from "./VoidFog";
import { PostFX } from "./PostFX";
import { SpaceParticles } from "./SpaceParticles";

interface SceneProps {
  scrollProgress: number;
}

export default function Scene({ scrollProgress }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 70], fov: 65, near: 0.1, far: 600 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ background: "#020408" }}
    >
      <Suspense fallback={null}>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Fog for depth */}
        <fog attach="fog" args={["#020408", 60, 200]} />

        {/* Lighting */}
        <ambientLight intensity={0.04} />
        {/* Portal glow */}
        <pointLight position={[0, 0, 30]} color="#ff1a1a" intensity={12} distance={100} decay={2} />
        {/* Deep blue environment */}
        <pointLight position={[0, 0, -45]} color="#001433" intensity={6} distance={120} decay={1.5} />
        {/* Card accent lights */}
        <pointLight position={[-8, 2, -12]} color="#00c8ff" intensity={3} distance={30} decay={2} />
        <pointLight position={[0,  2, -20]} color="#39ff14" intensity={2} distance={30} decay={2} />
        <pointLight position={[8,  2, -28]} color="#ff1a1a" intensity={3} distance={30} decay={2} />

        <CameraRig scrollProgress={scrollProgress} />

        {/* Background star field */}
        <SpaceParticles />

        {/* Phase 1 — Breach */}
        <AshParticles count={500} scrollProgress={scrollProgress} />
        <Portal scrollProgress={scrollProgress} />

        {/* Phase 2-3 — Descent */}
        <Vines scrollProgress={scrollProgress} />
        <VoidFog scrollProgress={scrollProgress} />

        {/* Phase 4-5 — Dossiers */}
        <DossierCards scrollProgress={scrollProgress} />

        {/* Phase 6 — Climax */}
        <MindFlayer scrollProgress={scrollProgress} />

        <PostFX scrollProgress={scrollProgress} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
