# 🔴 UPSIDE DOWNED — Hackathon 2025 Website

An immersive, scroll-driven 3D storytelling website built with Next.js, React Three Fiber, and Tailwind CSS. Stranger Things themed hackathon landing page.

---

## 📁 Project Structure

```
upside-downed/
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── src/
    ├── app/
    │   ├── globals.css          ← All CSS, fonts, animations
    │   ├── layout.tsx           ← Root HTML layout
    │   └── page.tsx             ← Main page (scroll container)
    ├── components/
    │   ├── scene/
    │   │   ├── Scene.tsx        ← R3F Canvas + all 3D objects
    │   │   ├── CameraRig.tsx    ← Scroll-driven camera movement
    │   │   ├── Portal.tsx       ← Red rift (GLSL shader)
    │   │   ├── AshParticles.tsx ← Floating ash particles
    │   │   ├── Vines.tsx        ← Dark 3D tube geometry vines
    │   │   ├── DossierCards.tsx ← Glass character cards
    │   │   ├── MindFlayer.tsx   ← Shadowy silhouette boss
    │   │   ├── VoidFog.tsx      ← Atmospheric fog planes
    │   │   └── PostFX.tsx       ← Bloom + ChromaticAberration + Grain
    │   ├── hud/
    │   │   └── HUD.tsx          ← Live telemetry overlay (toxicity/signal)
    │   └── overlay/
    │       ├── PhaseOverlay.tsx ← Story text for each scroll phase
    │       ├── GlitchText.tsx   ← Character scramble text effect
    │       ├── Terminal.tsx     ← Typewriter terminal text
    │       ├── CTAButton.tsx    ← "Establish Neural Link" register button
    │       ├── GrainOverlay.tsx ← Film grain + chromatic aberration CSS
    │       └── LoadingScreen.tsx← Initial loading animation
    ├── hooks/
    │   ├── useScrollProgress.ts ← 0-1 scroll tracker
    │   └── useParallax.ts       ← Mouse/gyroscope camera tilt
    └── lib/
        └── constants.ts         ← Camera positions, phase data, colors
```

---

## 🚀 Setup Instructions (Step by Step)

### 1. Install Node.js
Download from: https://nodejs.org (choose LTS version — v18 or v20)

### 2. Create the project folder
Create a folder on your computer called `upside-downed`. Copy ALL the provided files into it, keeping the same folder structure.

### 3. Open in VS Code
- Open VS Code
- File → Open Folder → select `upside-downed`

### 4. Open Terminal in VS Code
- Press `Ctrl + `` ` ` (backtick) or go to Terminal → New Terminal

### 5. Install dependencies
```bash
npm install
```
Wait for it to finish (may take 2-3 minutes, will download ~300MB).

### 6. Start development server
```bash
npm run dev
```

### 7. Open in browser
Go to: http://localhost:3000

---

## ✏️ Customization

### Change the Register Button Link
Open `src/components/overlay/CTAButton.tsx`, find this line:
```tsx
window.open("https://your-registration-link.com", "_blank");
```
Replace the URL with your actual registration form link (Google Forms, Devpost, etc.).

### Change Hackathon Info
Edit `src/lib/constants.ts` to update character missions, card positions, colors.

### Change Colors
Edit `src/app/globals.css` — the `:root` CSS variables control all colors.
Edit `tailwind.config.ts` — the `colors` section maps to Tailwind class names.

### Change Typography
The fonts are loaded in `src/app/layout.tsx`. Currently using:
- **Bebas Neue** — cinematic titles
- **VT323** — terminal/HUD text
- **Share Tech Mono** — code elements

---

## 📱 Mobile Optimization
- Device orientation (gyroscope) parallax on mobile
- Responsive text sizes with `sm:`, `md:`, `lg:` Tailwind prefixes
- Reduced particle count and adaptive pixel ratio (`dpr={[1, 1.5]}`)
- Touch-friendly scroll interaction

---

## 🎬 Scroll Story Phases

| Scroll % | Phase | Story |
|----------|-------|-------|
| 0–20% | **The Breach** | Title reveal + red portal appears |
| 20–50% | **The Descent** | Through the rift, vines surround |
| 50–85% | **Dossiers** | Three character mission cards |
| 85–100% | **The Climax** | Mind Flayer + terminal + register CTA |

---

## ⚡ Build for Production
```bash
npm run build
npm start
```

---

## 🛠️ Troubleshooting

**"Module not found" error** → Run `npm install` again

**3D not showing / blank canvas** → Check browser console (F12). Make sure WebGL is supported in your browser.

**Slow on mobile** → The `AdaptiveDpr` component automatically lowers quality on slower devices.

**Fonts not loading** → Check your internet connection (fonts load from Google Fonts CDN).
