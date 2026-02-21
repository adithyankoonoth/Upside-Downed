"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  startRef: React.MutableRefObject<() => void>;
}

export function BackgroundMusic({ startRef }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    startRef.current = () => {
      if (!audioRef.current) return;
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        const source = ctx.createMediaElementSource(audioRef.current);
        const gain = ctx.createGain();
        gain.gain.value = 0.8;
        source.connect(gain);
        gain.connect(ctx.destination);
      } catch (e) {}
      audioRef.current.volume = 1.0;
      audioRef.current.play().catch(console.error);
      setPlaying(true);
    };
  }, [startRef]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" loop />
      <button
        onClick={toggle}
        className="absolute top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 font-vt323 text-xs tracking-widest pointer-events-auto"
        style={{
          color: playing ? "#00c8ff88" : "#ff1a1a66",
          border: `1px solid ${playing ? "#00c8ff22" : "#ff1a1a22"}`,
          background: "#02040888",
          backdropFilter: "blur(8px)",
          padding: "4px 12px",
        }}
      >
        {playing ? "♪ SIGNAL ON" : "♪ SIGNAL OFF"}
      </button>
    </>
  );
}