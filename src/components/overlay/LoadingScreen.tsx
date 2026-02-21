"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
  onEnter: () => void;
}

export function LoadingScreen({ onComplete, onEnter }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus]   = useState("INITIALIZING NEURAL BRIDGE...");
  const [ready, setReady]     = useState(false);

  const statuses = [
    "INITIALIZING NEURAL BRIDGE...",
    "DETECTING DIMENSIONAL RIFT...",
    "CALIBRATING IMU SENSORS...",
    "DECRYPTING 14.8 MHz SIGNAL...",
    "ESTABLISHING UPSIDE DOWN LINK...",
    "WARNING: TOXIC ATMOSPHERE DETECTED",
    "READY",
  ];

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 8 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setReady(true);
      }
      setProgress(Math.min(p, 100));
      const idx = Math.min(
        Math.floor((p / 100) * statuses.length),
        statuses.length - 1
      );
      setStatus(statuses[idx]);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    onEnter();    // starts music
    onComplete(); // hides loading screen
  };

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
          style={{ color: "#ff1a1a", textShadow: "0 0 40px #ff1a1aaa" }}
        >
          UPSIDE DOWNED
        </h1>
      </div>

      {/* Progress bar */}
      <div className="w-72 md:w-96 mb-4">
        <div className="flex justify-between font-vt323 text-xs text-ash/50 mb-2">
          <span>LOADING VOID ENVIRONMENT</span>
          <span className="text-signal">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-white/5 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-rift"
            style={{ width: `${progress}%`, boxShadow: "0 0 10px #ff1a1a" }}
          />
        </div>
      </div>

      {/* Status */}
      <div className="font-vt323 text-xs tracking-widest text-ash/50 h-5 mb-8">
        {status}
      </div>

      {/* Enter button — appears when loading is done */}
      <AnimatePresence>
        {ready && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={handleEnter}
            className="font-bebas text-2xl tracking-[0.3em] px-10 py-3 border-2 border-rift cursor-pointer"
            style={{
              color: "#ff1a1a",
              boxShadow: "0 0 30px #ff1a1a88",
              background: "#02040888",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          >
            ENTER THE VOID
          </motion.button>
        )}
      </AnimatePresence>

      <div className="scanlines absolute inset-0 pointer-events-none" />
    </motion.div>
  );
}