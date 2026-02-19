"use client";

export function GrainOverlay() {
  return (
    <>
      {/* Film grain */}
      <div
        className="grain-overlay absolute inset-0 z-10 pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Chromatic aberration vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(255,10,10,0.04) 75%, rgba(0,0,255,0.06) 100%)",
        }}
      />

      {/* CRT screen curvature hint */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 70%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </>
  );
}
