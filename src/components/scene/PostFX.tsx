"use client";

import { useMemo } from "react";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

interface PostFXProps {
  scrollProgress: number;
}

export function PostFX({ scrollProgress }: PostFXProps) {
  // Chromatic aberration increases during portal descent
  const chromaticOffset = useMemo(() => {
    const intensity = 0.002 + scrollProgress * 0.006;
    return new THREE.Vector2(intensity, intensity);
  }, [scrollProgress]);

  return (
    <EffectComposer multisampling={0}>
      {/* Bloom — makes portal and blue terminal glow */}
      <Bloom
        luminanceThreshold={0.3}
        luminanceSmoothing={0.9}
        intensity={1.5 + scrollProgress * 1.5}
        radius={0.4}
      />

      {/* Chromatic Aberration — RGB shift on edges */}
      <ChromaticAberration
        offset={chromaticOffset}
        radialModulation={true}
        modulationOffset={0.5}
      />

      {/* Film Grain / Noise */}
      <Noise
        opacity={0.09 + scrollProgress * 0.06}
        blendFunction={BlendFunction.OVERLAY}
      />

      {/* Vignette — darkens edges */}
      <Vignette
        offset={0.3}
        darkness={0.9}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
