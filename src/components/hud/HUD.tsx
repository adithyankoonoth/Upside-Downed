"use client";

import { useEffect, useRef, useState } from "react";

interface HUDProps {
  scrollProgress: number;
}

function useFluctuating(base: number, amp: number, speed: number) {
  const [val, setVal] = useState(base);
  const t = useRef(Math.random() * 100);
  useEffect(() => {
    let raf: number;
    const tick = () => {
      t.current += 0.016 * speed;
      const n =
        Math.sin(t.current * 1.3) * 0.5 +
        Math.sin(t.current * 2.7 + 1.0) * 0.3 +
        Math.sin(t.current * 0.7 + 2.0) * 0.2;
      setVal(Math.max(0, Math.min(100, base + n * amp)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [base, amp, speed]);
  return val;
}

// Compact bar used in top corners only
function MiniBar({ value, color }: { value: number; color: string }) {
  const segs = 10;
  const filled = Math.round((value / 100) * segs);
  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: segs }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-1.5"
          style={{
            backgroundColor: i < filled ? color : `${color}18`,
            boxShadow: i < filled ? `0 0 3px ${color}88` : "none",
          }}
        />
      ))}
    </div>
  );
}

export function HUD({ scrollProgress }: HUDProps) {
  const toxBase  = 20 + scrollProgress * 55;
  const sigBase  = 88 - scrollProgress * 62;
  const toxicity = useFluctuating(toxBase, 8, 0.8);
  const signal   = useFluctuating(sigBase, 10, 1.1);

  // Elapsed timer
  const startRef = useRef(Date.now());
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  const phaseName =
    scrollProgress < 0.17 ? "I — BREACH"
    : scrollProgress < 0.36 ? "II — ORIGIN"
    : scrollProgress < 0.55 ? "III — THE GATE"
    : scrollProgress < 0.74 ? "IV — VECNA"
    : scrollProgress < 0.89 ? "V — TRAPPED"
    : "VI — CLIMAX";

  return (
    <div className="absolute inset-0 z-20 pointer-events-none select-none">
      {/* ── Corner crosshairs ── */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-signal/25" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-signal/25" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-signal/25" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-signal/25" />

      {/* ── Top-left: Timer ── */}
      <div className="absolute top-5 left-5">
        <div
          className="hud-panel border border-signal/15 bg-void/55 backdrop-blur-sm px-3 py-2"
          style={{ borderColor: "#00c8ff22" }}
        >
          <p className="font-vt323 text-[9px] tracking-[0.25em] text-signal/40 mb-1">T+MISSION</p>
          <p
            className="font-vt323 text-lg leading-none"
            style={{ color: "#00c8ff", textShadow: "0 0 8px #00c8ff88" }}
          >
            {mm}:{ss}
          </p>
        </div>
      </div>

      {/* ── Top-right: Phase ── */}
      <div className="absolute top-5 right-5 text-right">
        <div
          className="hud-panel border border-rift/15 bg-void/55 backdrop-blur-sm px-3 py-2"
          style={{ borderColor: "#ff1a1a22" }}
        >
          <p className="font-vt323 text-[9px] tracking-[0.25em] text-rift/40 mb-1">PHASE</p>
          <p
            className="font-vt323 text-sm leading-none"
            style={{ color: "#ff1a1a", textShadow: "0 0 8px #ff1a1a88" }}
          >
            {phaseName}
          </p>
        </div>
      </div>

      {/* ── Bottom-left: Sensors (compact) ── */}
      <div className="absolute bottom-6 left-5">
        <div
          className="border border-signal/10 bg-void/50 backdrop-blur-sm px-3 py-2 space-y-1.5"
          style={{ borderColor: "#00c8ff18" }}
        >
          <div className="flex items-center gap-3">
            <span className="font-vt323 text-[9px] tracking-widest text-rift/50 w-16">TOX-MQ7</span>
            <MiniBar value={toxicity} color="#ff1a1a" />
            <span className="font-vt323 text-[10px] w-10 text-right" style={{ color: toxicity > 60 ? "#ff1a1a" : "#ff1a1a88" }}>
              {toxicity.toFixed(0)}ppm
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-vt323 text-[9px] tracking-widest text-signal/50 w-16">SIG-IMU</span>
            <MiniBar value={signal} color="#00c8ff" />
            <span className="font-vt323 text-[10px] w-10 text-right" style={{ color: "#00c8ff88" }}>
              {signal.toFixed(0)}dB
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom-right: Depth ── */}
      <div className="absolute bottom-6 right-5 text-right">
        <div className="border border-signal/10 bg-void/50 backdrop-blur-sm px-3 py-2">
          <p className="font-vt323 text-[9px] tracking-widest text-ash/30">DESCENT DEPTH</p>
          <p
            className="font-vt323 text-base"
            style={{ color: "#00c8ff55" }}
          >
            {(scrollProgress * 100).toFixed(0)}%
          </p>
        </div>
      </div>
    </div>
  );
}
