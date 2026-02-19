"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useParallax } from "@/hooks/useParallax";
import { CAMERA_Z } from "@/lib/constants";
import * as THREE from "three";

interface CameraRigProps {
  scrollProgress: number;
}

// 6-phase smooth camera path
function getTargetZ(p: number): number {
  const lerp = THREE.MathUtils.lerp;
  const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const map  = (v: number, a: number, b: number) => ease(Math.max(0, Math.min(1, (v - a) / (b - a))));

  if (p < 0.17) return lerp(CAMERA_Z.START,  CAMERA_Z.NEAR,   map(p, 0.00, 0.17));
  if (p < 0.36) return lerp(CAMERA_Z.NEAR,   CAMERA_Z.PORTAL, map(p, 0.17, 0.36));
  if (p < 0.55) return lerp(CAMERA_Z.PORTAL, CAMERA_Z.INSIDE, map(p, 0.36, 0.55));
  if (p < 0.74) return lerp(CAMERA_Z.INSIDE, CAMERA_Z.CARDS,  map(p, 0.55, 0.74));
  if (p < 0.89) return lerp(CAMERA_Z.CARDS,  CAMERA_Z.FINAL,  map(p, 0.74, 0.89));
  return CAMERA_Z.FINAL;
}

export function CameraRig({ scrollProgress }: CameraRigProps) {
  const { camera } = useThree();
  const parallax   = useParallax();

  // Smoothed state — avoids React re-renders entirely
  const smooth = useRef({
    z: CAMERA_Z.START,
    x: 0,
    y: 0,
    fov: 65,
  });

  useFrame((_, delta) => {
    const cam = camera as THREE.PerspectiveCamera;

    const targetZ   = getTargetZ(scrollProgress);
    const targetX   = parallax.x * 1.4;
    const targetY   = -parallax.y * 0.9;
    const targetFov = THREE.MathUtils.lerp(65, 78, Math.min(scrollProgress / 0.5, 1));

    // Variable lerp: fast for Z (responsive to scroll), gentle for X/Y (parallax feel)
    const dtClamped = Math.min(delta, 0.05);
    const zLerp  = 1 - Math.pow(0.008, dtClamped); // very smooth z
    const xyLerp = 1 - Math.pow(0.06,  dtClamped);  // gentle parallax
    const fovLerp= 1 - Math.pow(0.05,  dtClamped);

    smooth.current.z   = THREE.MathUtils.lerp(smooth.current.z,   targetZ,   zLerp);
    smooth.current.x   = THREE.MathUtils.lerp(smooth.current.x,   targetX,   xyLerp);
    smooth.current.y   = THREE.MathUtils.lerp(smooth.current.y,   targetY,   xyLerp);
    smooth.current.fov = THREE.MathUtils.lerp(smooth.current.fov, targetFov, fovLerp);

    camera.position.set(smooth.current.x, smooth.current.y, smooth.current.z);

    // Smooth look-ahead — camera slightly tilts toward movement direction
    const lookAheadX = (smooth.current.x) * 0.06;
    const lookAheadY = (smooth.current.y) * 0.04;
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -lookAheadX, 0.08);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, -lookAheadY, 0.08);

    cam.fov = smooth.current.fov;
    cam.updateProjectionMatrix();
  });

  return null;
}
