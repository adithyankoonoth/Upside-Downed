"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const GLITCH_CHARS = "!@#$%^&*01█▓▒░■□▪▫";

export function GlitchText({ text, className = "", delay = 0 }: GlitchTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let iteration = 0;
    const len = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setDisplayed(
          text
            .split("")
            .map((char, idx) => {
              if (char === " ") return " ";
              if (idx < iteration) return char;
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            })
            .join("")
        );
        if (iteration >= len) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplayed(text);
        }
        iteration += 1 / 3;
      }, 40);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, delay]);

  return (
    <motion.span
      className={`glitch-text ${className}`}
      data-text={displayed}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {displayed}
    </motion.span>
  );
}
