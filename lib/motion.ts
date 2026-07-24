// Shared framer-motion variants. Keeping these centralized avoids drift.

import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0.05,
    },
  },
});

export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};

// Pin reveal: enters from a tiny offset, used in lists
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// Wider slide used on cards that come in from the side on scroll
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -22 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// Letters rise out of a mask . used in headline components
export const letterRise: Variants = {
  hidden: { opacity: 0, y: "100%" },
  show: (i = 0) => ({
    opacity: 1,
    y: "0%",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.025 },
  }),
};

// Respects user's reduced-motion preference
export const reducedMotionTransition = {
  duration: 0.01,
};
