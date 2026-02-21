"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { STORY } from "@/lib/constants";
import { CTAButton } from "./CTAButton";

interface PhaseOverlayProps {
  scrollProgress: number;
}

function phaseOpacity(p: number, fadeIn: number, peak: number, fadeOut: number, end: number): number {
  if (p < fadeIn) return 0;
  if (p < peak)   return (p - fadeIn) / (peak - fadeIn);
  if (p <= fadeOut) return 1;
  if (p < end)    return 1 - (p - fadeOut) / (end - fadeOut);
  return 0;
}

function Divider({ color = "#ff1a1a" }: { color?: string }) {
  return (
    <motion.div
      className="w-12 h-px my-3 md:my-4"
      style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  );
}

function Eyebrow({ text, color = "#ff1a1a" }: { text: string; color?: string }) {
  return (
    <p
      className="font-vt323 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2"
      style={{ color: `${color}99` }}
    >
      {text}
    </p>
  );
}

function Title({ lines, color = "#ffffff", size = "large" }: { lines: string[]; color?: string; size?: "large" | "medium" }) {
  const sizeClass =
    size === "large"
      ? "text-[14vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw]"
      : "text-[10vw] sm:text-[7vw] md:text-[6.5vw] lg:text-[6vw]";
  return (
    <h2
      className={`font-bebas leading-none tracking-wide ${sizeClass}`}
      style={{ color, textShadow: `0 0 40px ${color}55, 0 0 80px ${color}22` }}
    >
      {lines.map((line, i) => <span key={i} className="block">{line}</span>)}
    </h2>
  );
}

function Tag({ text, color = "#ff1a1a" }: { text: string; color?: string }) {
  return (
    <p className="font-vt323 text-[10px] tracking-[0.25em] mt-3" style={{ color: `${color}66` }}>
      {text}
    </p>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ── PHASE 1 — SIGNAL ──────────────────────────────────────────────────────
function PhaseSignal() {
  const s = STORY.SIGNAL;
  const bars = Array.from({ length: 28 }, (_, i) => ({
    h: 6 + Math.abs(Math.sin(i * 0.8)) * 20 + Math.abs(Math.sin(i * 0.3)) * 10,
    delay: i * 0.04,
  }));
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center">
        <motion.p variants={fadeUp} className="font-vt323 text-[10px] md:text-xs tracking-[0.35em] text-rift/60 mb-6">
          {s.eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-bebas leading-none tracking-wider"
          style={{ fontSize: "clamp(4rem, 18vw, 14rem)", color: "#ff1a1a", textShadow: "0 0 60px #ff1a1aaa, 0 0 120px #ff1a1a44" }}
        >
          {s.title[0]}
          <br />
          <span style={{ color: "#ffffff", textShadow: "0 0 40px #ffffff33" }}>{s.title[1]}</span>
        </motion.h1>
        <motion.div variants={fadeUp} className="mt-6 mb-4"><Divider color="#ff1a1a" /></motion.div>
        <motion.p variants={fadeUp} className="font-vt323 text-lg md:text-xl text-ash/80 max-w-md leading-relaxed">
          {s.body}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex items-end gap-[2px]">
          {bars.map((b, i) => (
            <div key={i} className="w-[3px] bg-rift/70 rounded-full"
              style={{ height: `${b.h}px`, boxShadow: "0 0 4px #ff1a1a88", animation: "pulse 1.5s ease-in-out infinite", animationDelay: `${b.delay}s` }}
            />
          ))}
        </motion.div>
        <motion.p variants={fadeUp} className="font-vt323 text-[10px] tracking-[0.3em] text-rift/40 mt-4">
          {s.tag}
        </motion.p>
      </motion.div>
    </div>
  );
}

// ── PHASE 2 — ORIGIN ──────────────────────────────────────────────────────
function PhaseOrigin() {
  const s = STORY.ORIGIN;
  return (
    <div className="flex flex-col justify-center h-full px-6 md:px-16 lg:px-24">
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
        <motion.div variants={fadeUp}><Eyebrow text={s.eyebrow} color="#00c8ff" /></motion.div>
        <motion.div variants={fadeUp}><Title lines={s.title} color="#ffffff" size="medium" /></motion.div>
        <motion.div variants={fadeUp} className="my-4"><Divider color="#00c8ff" /></motion.div>
        <motion.p variants={fadeUp} className="font-vt323 text-base md:text-xl text-ash/80 leading-relaxed max-w-xl">
          {s.body}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
          {["HAWKINS LAB", "DR. BRENNER", "SENSORY DEPRIVATION", "SUBJECT 011", "PSYCHIC CONDITIONING"].map((chip) => (
            <span key={chip} className="font-vt323 text-[10px] tracking-widest px-2 py-1"
              style={{ color: "#00c8ff88", border: "1px solid #00c8ff22", background: "#00c8ff08" }}>
              {chip}
            </span>
          ))}
        </motion.div>
        <motion.div variants={fadeUp}><Tag text={s.tag} color="#00c8ff" /></motion.div>
      </motion.div>
    </div>
  );
}

// ── PHASE 3 — THE GATE ────────────────────────────────────────────────────
function PhaseGate() {
  const s = STORY.GATE;
  return (
    <div className="flex flex-col justify-center h-full items-end px-6 md:px-16 lg:px-24">
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl text-right">
        <motion.div variants={fadeUp}><Eyebrow text={s.eyebrow} color="#ff1a1a" /></motion.div>
        <motion.div variants={fadeUp}><Title lines={s.title} color="#ff1a1a" size="medium" /></motion.div>
        <motion.div variants={fadeUp} className="flex justify-end my-4"><Divider color="#ff1a1a" /></motion.div>
        <motion.p variants={fadeUp} className="font-vt323 text-base md:text-xl text-ash/80 leading-relaxed">
          {s.body}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2 justify-end">
          {["NOV 6 1983", "ISOLATION TANK", "DEMOGORGON", "DIMENSIONAL TEAR", "THE GATE OPENS"].map((chip) => (
            <span key={chip} className="font-vt323 text-[10px] tracking-widest px-2 py-1"
              style={{ color: "#ff1a1a88", border: "1px solid #ff1a1a22", background: "#ff1a1a08" }}>
              {chip}
            </span>
          ))}
        </motion.div>
        <motion.div variants={fadeUp} className="flex justify-end">
          <Tag text={s.tag} color="#ff1a1a" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── PHASE 4 — VECNA ───────────────────────────────────────────────────────
function PhaseVecna() {
  const s = STORY.VECNA;
  return (
    <div className="flex flex-col justify-center h-full px-6 md:px-16 lg:px-24">
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
        <motion.div variants={fadeUp}><Eyebrow text={s.eyebrow} color="#8b0000" /></motion.div>
        <motion.div variants={fadeUp}><Title lines={s.title} color="#cc0000" size="medium" /></motion.div>
        <motion.div variants={fadeUp} className="my-4"><Divider color="#8b0000" /></motion.div>
        <motion.p variants={fadeUp} className="font-vt323 text-base md:text-xl text-ash/80 leading-relaxed max-w-xl">
          {s.body}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-6 grid grid-cols-2 gap-2 max-w-sm">
          {[
            { label: "ORIGIN", val: "HENRY CREEL" },
            { label: "SUBJECT", val: "001" },
            { label: "ABILITY", val: "HIVE MIND CONTROL" },
            { label: "STATUS", val: "ACTIVE — EXPANDING" },
          ].map(({ label, val }) => (
            <div key={label} className="p-2" style={{ border: "1px solid #8b000033", background: "#8b000011" }}>
              <p className="font-vt323 text-[9px] tracking-widest" style={{ color: "#8b000099" }}>{label}</p>
              <p className="font-vt323 text-sm" style={{ color: "#cc000099" }}>{val}</p>
            </div>
          ))}
        </motion.div>
        <motion.div variants={fadeUp}><Tag text={s.tag} color="#8b0000" /></motion.div>
      </motion.div>
    </div>
  );
}

// ── PHASE 5 — TRAPPED ─────────────────────────────────────────────────────
function PhaseTrapped() {
  const s = STORY.TRAPPED;
  return (
    <div className="flex flex-col justify-center h-full items-end px-6 md:px-16 lg:px-24">
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-xl text-right">
        <motion.div variants={fadeUp}><Eyebrow text={s.eyebrow} color="#39ff14" /></motion.div>
        <motion.div variants={fadeUp}><Title lines={s.title} color="#39ff14" size="medium" /></motion.div>
        <motion.div variants={fadeUp} className="flex justify-end my-4"><Divider color="#39ff14" /></motion.div>
        <motion.p variants={fadeUp} className="font-vt323 text-base md:text-xl text-ash/80 leading-relaxed">
          {s.body}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-6 space-y-2">
          {[
            { label: "PSI RESERVES",  val: 12, color: "#ff1a1a", unit: "%" },
            { label: "CO TOXICITY",   val: 89, color: "#39ff14", unit: "ppm" },
            { label: "NEURAL SIGNAL", val: 8,  color: "#00c8ff", unit: "dB" },
          ].map(({ label, val, color, unit }) => (
            <div key={label} className="flex items-center gap-3 justify-end">
              <span className="font-vt323 text-xs tracking-widest text-ash/50">{label}</span>
              <div className="w-24 h-1.5 bg-white/5 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full"
                  style={{ width: `${val}%`, backgroundColor: color, boxShadow: `0 0 6px ${color}` }} />
              </div>
              <span className="font-vt323 text-xs w-10 text-right" style={{ color }}>{val}{unit}</span>
            </div>
          ))}
        </motion.div>
        <motion.div variants={fadeUp} className="flex justify-end">
          <Tag text={s.tag} color="#39ff14" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── PHASE 6 — CLIMAX ──────────────────────────────────────────────────────
function PhaseClimax({ active }: { active: boolean }) {
  const lines = STORY.CLIMAX.terminal;
  const [typed, setTyped]     = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) { setTyped([]); setLineIdx(0); setCharIdx(0); return; }
    if (lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    if (charIdx <= line.length) {
      timerRef.current = setTimeout(() => {
        setTyped((prev) => { const next = [...prev]; next[lineIdx] = line.slice(0, charIdx); return next; });
        setCharIdx((c) => c + 1);
      }, 28 + Math.random() * 20);
    } else {
      timerRef.current = setTimeout(() => { setLineIdx((l) => l + 1); setCharIdx(0); }, 350);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, lineIdx, charIdx, lines]);

  const done = lineIdx >= lines.length;

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 md:px-8 text-center">

      {/* Big title */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="font-bebas leading-none mb-8"
        style={{ fontSize: "clamp(3rem, 12vw, 9rem)", color: "#ff1a1a", textShadow: "0 0 40px #ff1a1aaa, 0 0 100px #ff1a1a44" }}
      >
        THE SHADOW STORM
        <br />
        <span style={{ color: "#00c8ff", textShadow: "0 0 40px #00c8ffaa" }}>IS APPROACHING</span>
      </motion.h2>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full max-w-lg border border-signal/25 bg-void/85 backdrop-blur-sm p-4 md:p-6 mb-8 text-left"
        style={{ boxShadow: "0 0 50px #00c8ff18, inset 0 0 30px #00c8ff08" }}
      >
        <div className="flex items-center gap-2 border-b border-signal/15 pb-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-rift/80" />
          <div className="w-2 h-2 rounded-full bg-toxic/60" />
          <div className="w-2 h-2 rounded-full bg-signal/60" />
          <span className="ml-2 font-vt323 text-[10px] tracking-widest text-signal/40">
            HAWKINS_NEURAL_TERMINAL — v2.4 — UPSIDE_DOWN_INTERFACE
          </span>
        </div>
        {typed.map((line, i) => {
          const isWarning = line.includes("CRITICAL") || line.includes("LETHAL");
          const isDivider = line.startsWith("——");
          const isLast    = i === lines.length - 1;
          return (
            <div key={i} className="flex gap-2 mb-1 font-vt323 text-sm md:text-base">
              {!isDivider && <span className="text-rift/50 flex-shrink-0">{i < 5 ? ">>>" : "   "}</span>}
              <span style={{
                color: isWarning ? "#ff1a1a" : isDivider ? "#ffffff22" : isLast ? "#39ff14" : "#00c8ff",
                textShadow: isWarning ? "0 0 8px #ff1a1a88" : "0 0 6px #00c8ff44",
              }}>
                {line}
                {i === lineIdx && !done && <span className="cursor-blink" style={{ color: "#00c8ff" }}>█</span>}
              </span>
            </div>
          );
        })}
        {done && (
          <div className="flex items-center gap-2 mt-3 font-vt323 text-sm text-toxic">
            <span style={{ textShadow: "0 0 8px #39ff14" }}>AWAITING_RESPONSE</span>
            <span className="cursor-blink">▋</span>
          </div>
        )}
      </motion.div>

      {/* ── GREEN TEXT FIRST ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6 text-center"
      >
        <p className="font-vt323 text-[9px] tracking-[0.4em] text-ash/35 mb-2">
          HACKATHON THEME UNLOCKED
        </p>
        <p
          className="font-bebas text-xl md:text-3xl tracking-[0.18em]"
          style={{ color: "#39ff14", textShadow: "0 0 20px #39ff14aa" }}
        >
          BUILD SOMETHING THAT HELPS ELEVEN SURVIVE
        </p>
        <p className="font-vt323 text-xs text-ash/50 mt-2 tracking-wide">
          AI · HARDWARE · SOFTWARE · EXPERIENCE — ALL TRACKS OPEN
        </p>
      </motion.div>

      {/* ── BUTTON BELOW ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: done ? 1 : 0, scale: done ? 1 : 0.9 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <CTAButton />
      </motion.div>

    </div>
  );
}

// ── MASTER CONTROLLER ─────────────────────────────────────────────────────
export function PhaseOverlay({ scrollProgress: p }: PhaseOverlayProps) {
  const op1 = phaseOpacity(p, 0.00, 0.02, 0.12, 0.17);
  const op2 = phaseOpacity(p, 0.16, 0.20, 0.31, 0.36);
  const op3 = phaseOpacity(p, 0.35, 0.39, 0.50, 0.55);
  const op4 = phaseOpacity(p, 0.54, 0.58, 0.69, 0.74);
  const op5 = phaseOpacity(p, 0.73, 0.77, 0.84, 0.89);
  const op6 = phaseOpacity(p, 0.88, 0.91, 1.00, 1.00);

  return (
    <>
      <AnimatePresence>
        {op1 > 0 && <PhaseShell key="p1" opacity={op1}><PhaseSignal /></PhaseShell>}
      </AnimatePresence>
      <AnimatePresence>
        {op2 > 0 && <PhaseShell key="p2" opacity={op2}><PhaseOrigin /></PhaseShell>}
      </AnimatePresence>
      <AnimatePresence>
        {op3 > 0 && <PhaseShell key="p3" opacity={op3}><PhaseGate /></PhaseShell>}
      </AnimatePresence>
      <AnimatePresence>
        {op4 > 0 && <PhaseShell key="p4" opacity={op4}><PhaseVecna /></PhaseShell>}
      </AnimatePresence>
      <AnimatePresence>
        {op5 > 0 && <PhaseShell key="p5" opacity={op5}><PhaseTrapped /></PhaseShell>}
      </AnimatePresence>
      <AnimatePresence>
        {op6 > 0 && <PhaseShell key="p6" opacity={op6}><PhaseClimax active={p > 0.90} /></PhaseShell>}
      </AnimatePresence>
    </>
  );
}

function PhaseShell({ children, opacity }: { children: React.ReactNode; opacity: number }) {
  return (
    <div
      className="absolute inset-0 z-30"
      style={{ opacity, pointerEvents: opacity > 0.05 ? "auto" : "none", transition: "opacity 0.4s ease" }}
    >
      {children}
    </div>
  );
}