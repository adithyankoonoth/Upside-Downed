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
    eyebrow: "HAWKINS NATIONAL LABORATORY — CLASSIFIED SIGNAL DETECTED",
    title: ["UPSIDE", "DOWNED"],
    body: "An encrypted frequency is bleeding through the campus network. Someone — or something — is trying to reach us from the other side.",
    tag: "HACKATHON 2025 // FREQUENCY: 14.8 MHz",
  },
  ORIGIN: {
    eyebrow: "SUBJECT FILE — 011 // BORN IN DARKNESS",
    title: ["SHE WAS", "NEVER FREE"],
    body: "Jane Hopper was taken at birth. Raised inside Hawkins Lab by Dr. Martin Brenner — 'Papa' — she was subjected to years of sensory deprivation and psychic conditioning. Isolated in a tank of salted water, she learned to reach beyond the physical world. She was not discovered to have powers. She was manufactured to have them.",
    tag: "EXPERIMENT LOG — MKUltra DERIVATIVE // CLEARANCE: LEVEL 10",
  },
  GATE: {
    eyebrow: "INCIDENT REPORT — NOV 6, 1983 // THE GATE OPENS",
    title: ["SHE OPENED", "THE RIFT"],
    body: "In the black void of her isolation tank, Eleven made contact with a Demogorgon. The psychic collision tore a dimensional breach between Hawkins and the Upside Down — a parallel world: dark, toxic, frozen in time. A dead mirror of our reality. The rift she opened has never fully closed.",
    tag: "DIMENSIONAL BREACH CONFIRMED // TOXICITY: RISING",
  },
  VECNA: {
    eyebrow: "ENEMY PROFILE — ENTITY: VECNA // HENRY CREEL // SUBJECT 001",
    title: ["THE SHADOW", "HAS A FACE"],
    body: "Henry Creel was the first. A psychic predator born with the ability to sense and control minds. Brenner tried to weaponise him as Subject 001. Eleven defeated him and cast him into the Upside Down — where the dark energy consumed and transformed him into Vecna: a god of the shadow realm, architect of every gate, every tragedy, every death.",
    tag: "THREAT LEVEL: OMEGA // PSYCHIC RANGE: UNBOUNDED",
  },
  TRAPPED: {
    eyebrow: "LAST KNOWN LOCATION — THE VOID // SIGNAL FAILING",
    title: ["SHE IS", "STILL THERE"],
    body: "During the final assault on Vecna's gate network, Eleven was pulled into the void. Her physical form is dissolving into psychic static. She communicates through interference — lights flickering, radios screaming. Her body cannot survive the atmospheric toxicity much longer. We need engineers. Now.",
    tag: "PSI RESERVES: CRITICAL // ATMOSPHERIC EXPOSURE: 89.4 ppm",
  },
  CLIMAX: {
    terminal: [
      "SHADOW STORM INBOUND. ETA: 00:07:43",
      "ELEVEN PSI RESERVES: 12% — CRITICAL",
      "ATMOSPHERIC CO: 89.4 ppm — LETHAL THRESHOLD",
      "VECNA HIVE MIND: EXPANDING 4.2 km/h",
      "ACTIVE GATE BREACHES: 47 DETECTED",
      "———————————————————————————",
      "THE CLOCK IS TICKING.",
      "BUILD SOMETHING THAT HELPS HER SURVIVE OR BRINGS HER HOME",
    ],
  },
};
