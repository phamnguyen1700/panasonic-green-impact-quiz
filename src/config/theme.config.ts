/**
 * Campaign design tokens.
 * Single source of truth for colours, type, spacing, motion timing, etc.
 * CSS-facing values are mirrored in src/styles/theme.css.
 */

export const colors = {
  forest: {
    900: "oklch(0.26 0.06 155)",
    800: "oklch(0.34 0.09 155)",
    700: "oklch(0.44 0.12 152)",
    600: "oklch(0.55 0.15 150)",
    500: "oklch(0.66 0.17 148)",
  },
  lime: {
    500: "oklch(0.88 0.2 128)",
    400: "oklch(0.92 0.19 125)",
  },
  cyan: {
    500: "oklch(0.78 0.12 200)",
    400: "oklch(0.86 0.09 202)",
  },
  sky: {
    500: "oklch(0.82 0.07 232)",
    200: "oklch(0.93 0.03 230)",
  },
  sun: {
    500: "oklch(0.86 0.13 82)",
    300: "oklch(0.93 0.08 88)",
  },
  ink: "oklch(0.18 0.03 160)",
  mist: "oklch(0.98 0.01 150)",
} as const;

export const gradients = {
  cta: "linear-gradient(100deg, var(--lime-500), var(--forest-500))",
  ctaHover: "linear-gradient(100deg, var(--lime-400), var(--forest-600))",
  glass:
    "linear-gradient(140deg, color-mix(in oklab, white 26%, transparent), color-mix(in oklab, white 6%, transparent))",
  headline: "linear-gradient(96deg, var(--lime-400), var(--cyan-400))",
  scrim:
    "linear-gradient(to right, color-mix(in oklab, var(--ink) 78%, transparent), color-mix(in oklab, var(--ink) 22%, transparent) 62%, transparent)",
  sunGlow:
    "radial-gradient(60% 60% at 70% 20%, color-mix(in oklab, var(--sun-300) 45%, transparent), transparent 70%)",
  cardMint: "linear-gradient(150deg, oklch(0.9 0.13 150 / 0.7), oklch(0.86 0.17 125 / 0.35))",
  cardSun: "linear-gradient(150deg, oklch(0.9 0.11 70 / 0.7), oklch(0.9 0.12 40 / 0.32))",
  cardAqua: "linear-gradient(150deg, oklch(0.9 0.07 215 / 0.7), oklch(0.86 0.1 195 / 0.32))",
  cardSky: "linear-gradient(150deg, oklch(0.88 0.08 240 / 0.7), oklch(0.84 0.1 215 / 0.32))",
  cardMoss: "linear-gradient(150deg, oklch(0.84 0.15 140 / 0.7), oklch(0.7 0.16 155 / 0.35))",
} as const;

export const typography = {
  fontFamily: {
    display: "'Be Vietnam Pro', system-ui, sans-serif",
    body: "'Be Vietnam Pro', system-ui, sans-serif",
    script: "'Playfair Display', Georgia, serif",
  },
  scale: {
    hero: "clamp(2.75rem, 8vw, 6.5rem)",
    display: "clamp(2rem, 5vw, 3.75rem)",
    title: "clamp(1.5rem, 3vw, 2.25rem)",
    subtitle: "clamp(1.05rem, 1.6vw, 1.35rem)",
    body: "1rem",
    small: "0.875rem",
    micro: "0.75rem",
  },
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  tracking: { tight: "-0.03em", normal: "0em", wide: "0.16em" },
  leading: { tight: 0.94, snug: 1.15, normal: 1.6 },
} as const;

export const spacing = {
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1.25rem",
  lg: "2rem",
  xl: "3rem",
  "2xl": "4.5rem",
  "3xl": "7rem",
} as const;

export const radius = {
  sm: "0.75rem",
  md: "1.25rem",
  lg: "1.75rem",
  xl: "2.25rem",
  card: "1.75rem",
  pill: "999px",
} as const;

export const shadows = {
  glass: "0 24px 60px -24px oklch(0.2 0.05 160 / 0.55)",
  card: "0 30px 70px -30px oklch(0.2 0.06 160 / 0.65)",
  cta: "0 18px 40px -16px oklch(0.66 0.17 148 / 0.75)",
  text: "0 2px 24px oklch(0.18 0.03 160 / 0.45)",
} as const;

export const blur = {
  soft: "8px",
  glass: "18px",
  heavy: "36px",
} as const;

export const zIndex = {
  background: 0,
  scrim: 10,
  particles: 20,
  content: 30,
  overlay: 40,
  modal: 50,
} as const;

export const motionTokens = {
  duration: {
    instant: 0.16,
    fast: 0.32,
    base: 0.6,
    slow: 0.9,
    scene: 1.2,
    drift: 14,
  },
  easing: {
    organic: [0.22, 0.61, 0.36, 1] as const,
    entrance: [0.16, 0.84, 0.44, 1] as const,
    exit: [0.4, 0, 0.6, 1] as const,
    breeze: [0.45, 0, 0.55, 1] as const,
  },
} as const;

export const theme = {
  colors,
  gradients,
  typography,
  spacing,
  radius,
  shadows,
  blur,
  zIndex,
  motion: motionTokens,
} as const;

export type Theme = typeof theme;
