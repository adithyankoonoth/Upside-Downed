"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TerminalProps {
  lines: string[];
  active: boolean;
  typingSpeed?: number;
}

export function Terminal({ lines, active, typingSpeed = 40 }: TerminalProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setVisibleLines([]);
      setCurrentLine(0);
      setCurrentChar(0);
      setDone(false);
      return;
    }

    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    const line = lines[currentLine];

    if (currentChar <= line.length) {
      timeoutRef.current = setTimeout(() => {
        setVisibleLines((prev) => {
          const next = [...prev];
          next[currentLine] = line.slice(0, currentChar);
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, typingSpeed + Math.random() * 30);
    } else {
      // Move to next line after pause
      timeoutRef.current = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 500);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active, currentLine, currentChar, lines, typingSpeed]);

  return (
    <div className="font-vt323 text-sm md:text-base leading-relaxed">
      {/* Prompt header */}
      <div className="text-signal/60 text-xs mb-3 tracking-widest">
        HAWKINS_NEURAL_TERMINAL v2.4 // UPSIDE_DOWN_INTERFACE
      </div>
      <div className="w-full h-px bg-signal/20 mb-3" />

      {visibleLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2 mb-1"
        >
          <span className="text-rift/70 select-none flex-shrink-0">
            {i === 0 ? ">>>" : "   "}
          </span>
          <span
            className="text-signal"
            style={{ textShadow: "0 0 6px #00c8ff88" }}
          >
            {line}
            {/* Blinking cursor on the active line */}
            {i === currentLine && !done && (
              <span className="cursor-blink text-signal">█</span>
            )}
          </span>
        </motion.div>
      ))}

      {done && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 flex items-center gap-2"
        >
          <span className="text-toxic" style={{ textShadow: "0 0 8px #39ff14" }}>
            AWAITING_RESPONSE
          </span>
          <span className="cursor-blink text-toxic">▋</span>
        </motion.div>
      )}
    </div>
  );
}
