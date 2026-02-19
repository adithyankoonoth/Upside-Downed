"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING NEURAL BRIDGE...");

  const statuses = [
    "INITIALIZING NEURAL BRIDGE...",
    "DETECTING DIMENSIONAL RIFT...",
    "CALIBRATING IMU SENSORS...",
    "DECRYPTING 14.8 MHz SIGNAL...",
    "ESTABLISHING UPSIDE DOWN LINK...",
    "WARNING: TOXIC ATMOSPHERE DETECTED",
    "ACCESS GRANTED // DESCEND AT YOUR OWN RISK",
  ];

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 8 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
      setProgress(Math.min(p, 100));
      const idx = Math.min(Math.floor((p / 100) * statuses.length), statuses.length - 1);
      setStatus(statuses[idx]);
    }, 120);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title */}
      <div className="text-center mb-12">
        <div className="font-vt323 text-xs tracking-[0.4em] text-rift/60 mb-4">
          HAWKINS NATIONAL LABORATORY // CLASSIFIED ACCESS
        </div>
        <h1
          className="font-bebas text-6xl md:text-8xl"
          style={{
            color: "#ff1a1a",
            textShadow: "0 0 40px #ff1a1aaa",
          }}
        >
          UPSIDE DOWNED
        </h1>
        <div className="font-vt323 text-signal/60 text-sm mt-2 tracking-widest">
          HACKATHON 2025
        </div>
      </div>

      {/* Loading bar */}
      <div className="w-72 md:w-96 mb-4">
        <div className="flex justify-between font-vt323 text-xs text-ash/50 mb-2">
          <span>LOADING VOID ENVIRONMENT</span>
          <span className="text-signal">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-white/5 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-rift"
            style={{ width: `${progress}%`, boxShadow: "0 0 10px #ff1a1a" }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Status text */}
      <div className="font-vt323 text-xs tracking-widest text-ash/50 h-4">
        {status}
      </div>

      {/* Animated dots */}
      <div className="mt-8 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-rift animate-pulse"
            style={{
              animationDelay: `${i * 0.3}s`,
              boxShadow: "0 0 6px #ff1a1a",
            }}
          />
        ))}
      </div>

      {/* Scanlines */}
      <div className="scanlines absolute inset-0 pointer-events-none" />
    </motion.div>
  );
}
