"use client";

import dynamic from "next/dynamic";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { PhaseOverlay } from "@/components/overlay/PhaseOverlay";
import { HUD } from "@/components/hud/HUD";
import { GrainOverlay } from "@/components/overlay/GrainOverlay";
import { LoadingScreen } from "@/components/overlay/LoadingScreen";
import { BackgroundMusic } from "@/components/overlay/BackgroundMusic";
import { useState, useRef } from "react";

const Scene = dynamic(() => import("@/components/scene/Scene"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const scrollProgress = useScrollProgress();
  const [loaded, setLoaded]   = useState(false);
  const startMusicRef = useRef<() => void>(() => {});

  return (
    <main className="relative">
      {!loaded && (
        <LoadingScreen
          onComplete={() => setLoaded(true)}
          onEnter={() => startMusicRef.current()}
        />
      )}

      <BackgroundMusic startRef={startMusicRef} />

      <div style={{ height: "700vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Scene scrollProgress={scrollProgress} />
          </div>
          <GrainOverlay />
          <div className="scanlines absolute inset-0 z-[5] pointer-events-none" />
          {scrollProgress > 0.03 && <HUD scrollProgress={scrollProgress} />}
          <PhaseOverlay scrollProgress={scrollProgress} />
          {scrollProgress < 0.02 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none">
              <span className="font-vt323 text-ash/50 text-xs tracking-[0.3em]">
                SCROLL TO BEGIN DESCENT
              </span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}