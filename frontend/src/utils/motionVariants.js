/**
 * Shared Framer Motion variants & easing used across all pages.
 * Import from here — do NOT duplicate timings in individual components.
 */

/* ── Easing ──────────────────────────────────────────────────── */
export const EASE_OUT = [0.16, 1, 0.3, 1];

/* ── Slide-up fade (single element) ─────────────────────────── */
export const slideUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.6, ease: EASE_OUT } },
};

/* ── Letter-by-letter container (for splitting text) ─────────── */
export const letterContainer = (delayStart = 0) => ({
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.022, delayChildren: delayStart },
  },
});

/* ── Single letter ───────────────────────────────────────────── */
export const letterVariant = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } },
};

/* ── Label fade-in ───────────────────────────────────────────── */
export const labelFade = (delay = 0) => ({
  hidden:  { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE_OUT } },
});
