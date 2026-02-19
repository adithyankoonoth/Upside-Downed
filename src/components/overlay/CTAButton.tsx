"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function CTAButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3 pointer-events-auto">
      {/* Primary — scroll back to start / explore */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.97 }}
        className="relative overflow-hidden border-2 border-rift bg-void/80 backdrop-blur-sm px-8 py-3 font-bebas text-lg tracking-[0.25em] cursor-pointer rounded-sm"
        style={{
          color: hovered ? "#020408" : "#ff1a1a",
          textShadow: hovered ? "none" : "0 0 10px #ff1a1a88",
          transition: "color 0.3s",
          boxShadow: hovered
            ? "0 0 50px #ff1a1a, 0 0 100px #ff1a1a55"
            : "0 0 20px #ff1a1a66",
        }}
      >
        <motion.div
          className="absolute inset-0 bg-rift"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ originX: 0 }}
        />
        <span className="relative z-10 flex items-center gap-3">
          <span
            className="w-2 h-2 rounded-full bg-current flex-shrink-0"
            style={{ boxShadow: "0 0 8px currentColor", animation: "pulse 1.5s infinite" }}
          />
          BEGIN YOUR DESCENT AGAIN
        </span>
      </motion.button>
    </div>
  );
}
