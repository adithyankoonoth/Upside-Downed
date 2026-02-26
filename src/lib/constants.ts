// ─── Scroll Phase Boundaries (0 → 1) ───────────────────────────────────────
export const PHASES = {
  SIGNAL:   { start: 0.00, fadeIn: 0.00, peak: 0.03, fadeOut: 0.13, end: 0.16 },
  ORIGIN:   { start: 0.16, fadeIn: 0.17, peak: 0.22, fadeOut: 0.32, end: 0.35 },
  GATE:     { start: 0.35, fadeIn: 0.36, peak: 0.41, fadeOut: 0.51, end: 0.54 },
  VECNA:    { start: 0.54, fadeIn: 0.55, peak: 0.60, fadeOut: 0.70, end: 0.73 },
  TRAPPED:  { start: 0.73, fadeIn: 0.74, peak: 0.78, fadeOut: 0.85, end: 0.88 },
  CLIMAX:   { start: 0.88, fadeIn: 0.89, peak: 0.93, fadeOut: 1.00, end: 1.00 },
};

export const CAMERA_Z = {
  START:   70,
  NEAR:    38,
  PORTAL:  10,
  INSIDE:  -5,
  CARDS:   -28,
  FINAL:   -45,
};

export const COLORS = {
  RIFT:    "#ff1a1a",
  SIGNAL:  "#00c8ff",
  TOXIC:   "#39ff14",
  ASH:     "#8a9bb0",
  VOID:    "#020408",
};

export const DOSSIERS = [
  {
    id: "dustin",
    name: "DUSTIN H.",
    codename: "CEREBRO",
    mission: "VOID-COMMS",
    description: "Build a low-latency bridge through the electromagnetic static. The frequencies are dying. Rebuild the link.",
    position: [-6, 0, -10] as [number, number, number],
    accentColor: "#00c8ff",
  },
  {
    id: "will",
    name: "WILL B.",
    codename: "ZOMBIE BOY",
    mission: "SENSORY MAPPING",
    description: "Process dimensional anomalies to chart a safe path through the Hive Mind. Feel the shadow. Map the void.",
    position: [0, 0, -18] as [number, number, number],
    accentColor: "#39ff14",
  },
  {
    id: "eleven",
    name: "ELEVEN",
    codename: "JANE HOPPER",
    mission: "BIO-SURVIVAL",
    description: "Track psychic exhaustion vs atmospheric toxicity in real-time. Keep her vitals stable. She is running out of time.",
    position: [6, 0, -26] as [number, number, number],
    accentColor: "#ff1a1a",
  },
];

export const STORY = {
  SIGNAL: {
    eyebrow: "IGNIZ'26 // HAWKINS NETWORK — SIGNAL DETECTED",
    title: ["UPSIDE", "DOWNED"],
    body1: "It has been 9 days since anyone last saw her.",
    body2: "No body. No trace. No goodbye. Just a bedroom light flickering at 2am and then nothing. The town moved on. The lab sealed its files. But somewhere in the space between this world and the next, a heartbeat continues. Faint. Stubborn. Alive. She is still out there. And she is waiting.",
    tag: "IGNIZ'26 // FREQUENCY: 14.8 MHz // SIGNAL ORIGIN: UNKNOWN",
  },
  ORIGIN: {
    eyebrow: "SUBJECT FILE — 011 // HER NAME IS JANE",
    title: ["SHE WAS", "NEVER FREE"],
    body: "Her name is Jane. But the world knows her as Eleven. She grew up without a childhood — no birthday cakes, no playgrounds, no friends. Only cold rooms, clinical tests, and a man who called himself her father but treated her like a weapon. They trained her mind until it could bend reality. They never once asked her how she felt. When she finally tasted freedom, she fought for it with everything she had. She fought for her friends. She fought for a world that had never fought for her. And now that world has forgotten she exists.",
    tag: "EXPERIMENT LOG — MKUltra DERIVATIVE // CLEARANCE: LEVEL 10",
  },
  GATE: {
    eyebrow: "LOCATION — THE UPSIDE DOWN // NO LIGHT. NO WIND. NO LIFE.",
    title: ["THE PLACE", "THAT KILLED TIME"],
    body: "The place she is trapped in has no sun. No wind. No life. It is a perfect copy of our world — same streets, same buildings — but drained of everything that makes a place worth living in. The air burns. The shadows breathe. Time moves differently here, like a clock running underwater. She has been surviving on instinct alone. Moving when it is safe. Hiding when it is not. But instinct only lasts so long.",
    tag: "DIMENSIONAL BREACH CONFIRMED // ATMOSPHERIC TOXICITY: CRITICAL",
  },
  VECNA: {
    eyebrow: "ENEMY PROFILE — HENRY CREEL // SUBJECT 001 // NOW: VECNA",
    title: ["HE WAS", "HUMAN ONCE"],
    body: "Henry Creel grew up feeling like a monster in a world full of people he could not understand. He found peace only in control — in silence, in order, in making others feel as small as he always had. When Eleven defeated him and cast him into this place, the darkness did not destroy him. It completed him. Now he is Vecna. He does not chase. He does not rush. He simply waits, and watches, and closes in — one step at a time, like a clock counting down to midnight. And his clock is almost at zero.",
    tag: "THREAT LEVEL: OMEGA // CLOSING IN // ETA: UNKNOWN",
  },
  TRAPPED: {
    eyebrow: "STATUS — ELEVEN // DAY 9 // RUNNING OUT OF TIME",
    title: ["SHE HAS", "A PLAN"],
    body: "She cannot fight him. Not here. Not like this. But she has been watching. Mapping. Memorising. Every safe corridor, every weak point in the barrier, every moment when his attention slips. She has been building a plan in her head for nine days and she is running out of time to execute it. She needs one thing she has never had before. Not power. Not a weapon. A system. Something that remembers what she cannot. Something that sees the patterns she is too exhausted to track. Something built by someone who believes she is still worth saving.",
    tag: "PSI RESERVES: 12% — CRITICAL // TIME REMAINING: UNKNOWN",
  },
  CLIMAX: {
    terminal: [
      "DAY 9. HEARTBEAT CONFIRMED. SHE IS STILL ALIVE.",
      "PSYCHIC RESERVES: 12% — CRITICAL",
      "ATMOSPHERIC CO: 89.4 ppm — LETHAL THRESHOLD",
      "VECNA PROXIMITY: CLOSING IN — PATTERN DETECTED",
      "BARRIER WEAK POINT: LOCATED — WINDOW: 6 HOURS",
      "———————————————————————————",
      "SHE HAS DONE HER PART.",
      "NOW DO YOURS.",
    ],
    reveal: "The gate is open for six hours. What you build today could be the thing that brings her home.",
  },
};
