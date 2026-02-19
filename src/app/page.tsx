"use client";

import dynamic from "next/dynamic";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { PhaseOverlay } from "@/components/overlay/PhaseOverlay";
import { HUD } from "@/components/hud/HUD";
import { GrainOverlay } from "@/components/overlay/GrainOverlay";
import { LoadingScreen } from "@/components/overlay/LoadingScreen";
import { useState } from "react";

const Scene = dynamic(() => import("@/components/scene/Scene"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const scrollProgress = useScrollProgress();
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="relative">
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* 700vh gives generous breathing room per phase */}
      <div style={{ height: "700vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* 3D Canvas */}
          <div className="absolute inset-0 z-0">
            <Scene scrollProgress={scrollProgress} />
          </div>

          {/* Overlays */}
          <GrainOverlay />
          <div className="scanlines absolute inset-0 z-[5] pointer-events-none" />

          {/* HUD — only after first phase */}
          {scrollProgress > 0.03 && (
            <HUD scrollProgress={scrollProgress} />
          )}

          {/* Story overlays */}
          <PhaseOverlay scrollProgress={scrollProgress} />

          {/* Scroll hint */}
          {scrollProgress < 0.02 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none">
              <span className="font-vt323 text-ash/50 text-xs tracking-[0.3em]">
                SCROLL TO BEGIN DESCENT
              </span>
              <div className="flex flex-col items-center gap-1">
                {[0,1,2].map(i => (
                  <div
                    key={i}
                    className="w-px h-3 bg-rift/50"
                    style={{
                      animation: `bounce 1.5s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
