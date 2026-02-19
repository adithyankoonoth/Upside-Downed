import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["'Bebas Neue'", "cursive"],
        vt323: ["'VT323'", "monospace"],
        mono:  ["'Share Tech Mono'", "monospace"],
      },
      colors: {
        void:    "#020408",
        rift:    "#ff1a1a",
        signal:  "#00c8ff",
        toxic:   "#39ff14",
        ash:     "#8a9bb0",
        vine:    "#1a2a0a",
        "mind-red": "#8b0000",
      },
      animation: {
        "hud-pulse":  "hud-pulse 2.5s ease-in-out infinite",
        "red-glow":   "red-pulse 2s ease-in-out infinite",
        flicker:      "text-flicker 5s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
