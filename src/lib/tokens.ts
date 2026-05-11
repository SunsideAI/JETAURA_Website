export const colors = {
  bg: "#0A0A0B",
  text: "#F5F2EC",
  accent: "#B8956A",

  textMuted: "rgba(245, 242, 236, 0.55)",
  textSubtle: "rgba(245, 242, 236, 0.4)",
  textFaint: "rgba(245, 242, 236, 0.25)",
  accentMuted: "rgba(184, 149, 106, 0.6)",
  accentSubtle: "rgba(184, 149, 106, 0.3)",
  borderAccent: "rgba(184, 149, 106, 0.7)",
  borderFaint: "rgba(245, 242, 236, 0.1)",
} as const;

export const durations = {
  instant: 0,
  fast: 0.2,
  base: 0.4,
  reveal: 0.6,
  heroReveal: 1.2,
  cinematic: 2.0,
  idleBreath: 8.0,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 48,
  "4xl": 64,
  "5xl": 96,
  "6xl": 144,
  "7xl": 192,
} as const;

export const z = {
  background: 0,
  content: 10,
  hud: 50,
  overlay: 100,
  modal: 200,
} as const;

export const heroStrings = {
  topLeft: "N° 001 — Sky Brokers",
  bottomLeft: "Est. 2026 · Frankfurt",
  headline1: {
    line1: "Beyond",
    line2: "schedules.",
  },
  headline2: {
    line1: "Anywhere.",
    line2: "Within 90 minutes.",
  },
  cta: "Configure your flight",
  scrollHint: "Press space or scroll to continue ↓",
  tailNumber: "D-AVIA · GULFSTREAM G650",
} as const;
