"use client";
import { useState, useEffect } from "react";

interface ParallaxState {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

export function useParallax(): ParallaxState {
  const [pos, setPos] = useState<ParallaxState>({ x: 0, y: 0 });

  useEffect(() => {
    // Desktop — mouse
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPos({ x, y });
    };

    // Mobile — device orientation (gyroscope)
    const onOrientation = (e: DeviceOrientationEvent) => {
      const x = (e.gamma ?? 0) / 45; // -1 to 1 for ±45°
      const y = (e.beta ?? 0) / 90;  // -1 to 1 for ±90°
      setPos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("deviceorientation", onOrientation, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, []);

  return pos;
}
