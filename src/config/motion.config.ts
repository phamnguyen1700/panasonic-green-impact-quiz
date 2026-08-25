import type { Transition, Variants } from "framer-motion";

import { motionTokens } from "./theme.config";

const { duration, easing } = motionTokens;

export const transitions = {
  organic: { duration: duration.base, ease: easing.organic } as Transition,
  entrance: { duration: duration.slow, ease: easing.entrance } as Transition,
  fast: { duration: duration.fast, ease: easing.organic } as Transition,
} satisfies Record<string, Transition>;

export const screenEnter: Variants = {
  hidden: { opacity: 0, scale: 1.02, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: duration.scene, ease: easing.entrance },
  },
};

export const screenExit: Variants = {
  exit: {
    opacity: 0,
    scale: 0.99,
    filter: "blur(8px)",
    transition: { duration: duration.base, ease: easing.exit },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transitions.entrance },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: transitions.entrance },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: transitions.organic },
};

export const revealText: Variants = {
  hidden: { opacity: 0, y: "0.35em", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: duration.slow, ease: easing.entrance },
  },
};

const floating = (distance: number, seconds: number, rotate: number) => ({
  y: [0, -distance, 0],
  rotate: [0, rotate, 0],
  transition: {
    duration: seconds,
    ease: easing.breeze,
    repeat: Infinity,
    repeatType: "loop" as const,
  },
});

export const floatingSlow = floating(14, 11, 1.4);
export const floatingMedium = floating(22, 7.5, -2.2);

export const cardHover = {
  y: -12,
  scale: 1.035,
  transition: transitions.fast,
};

export const buttonTap = { scale: 0.96, transition: { duration: duration.instant } };
export const buttonHover = { scale: 1.035, transition: transitions.fast };

export const particleDrift = (index: number) => ({
  y: ["-10%", "110%"],
  x: [0, index % 2 === 0 ? 40 : -50, 0],
  rotate: [0, index % 2 === 0 ? 140 : -160],
  opacity: [0, 0.75, 0],
  transition: {
    duration: duration.drift + (index % 5) * 3,
    ease: "linear" as const,
    repeat: Infinity,
    delay: index * 1.4,
  },
});

export const motionPresets = {
  screenEnter,
  screenExit,
  fadeUp,
  fadeScale,
  staggerContainer,
  staggerItem,
  floatingSlow,
  floatingMedium,
  cardHover,
  buttonTap,
  buttonHover,
  revealText,
  particleDrift,
  transitions,
};
