import { useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

/**
 * Vintage Pull-String Lamp Theme Toggle
 *
 * Moon and Sun icons are scaled to 100% identical dimensions (24x24 viewBox, 18px outer bounds).
 * Moon/Sun Celestial Icon is vertically centered with navbar text ("Let's Talk", "Home", etc).
 */

const PULL_THRESHOLD = 32;

function GlowingGoldSunIcon() {
  const points = [];
  const numPoints = 12;
  const cx = 12;
  const cy = 12;
  const rOuter = 9.2;
  const rInner = 5.4;

  for (let i = 0; i < numPoints; i++) {
    const angle = (i * 360) / numPoints - 90;
    const rad = (angle * Math.PI) / 180;
    const rad1 = ((angle - 12) * Math.PI) / 180;
    const rad2 = ((angle + 12) * Math.PI) / 180;

    const xTip = (cx + rOuter * Math.cos(rad)).toFixed(2);
    const yTip = (cy + rOuter * Math.sin(rad)).toFixed(2);
    const x1 = (cx + rInner * Math.cos(rad1)).toFixed(2);
    const y1 = (cy + rInner * Math.sin(rad1)).toFixed(2);
    const x2 = (cx + rInner * Math.cos(rad2)).toFixed(2);
    const y2 = (cy + rInner * Math.sin(rad2)).toFixed(2);

    points.push(`${xTip},${yTip} ${x2},${y2} ${x1},${y1}`);
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <defs>
        <radialGradient id="glowingSunCore" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FFF9E5" />
          <stop offset="35%" stopColor="#F7E2A9" />
          <stop offset="70%" stopColor="#C9A45C" />
          <stop offset="100%" stopColor="#966F2C" />
        </radialGradient>
        <linearGradient id="glowingSunRay" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E0A3" />
          <stop offset="50%" stopColor="#C9A45C" />
          <stop offset="100%" stopColor="#8A6625" />
        </linearGradient>
      </defs>

      {/* Pointed Flame Sunburst Rays */}
      <g fill="url(#glowingSunRay)" stroke="url(#glowingSunRay)" strokeWidth="0.5" strokeLinejoin="round">
        {points.map((pts, idx) => (
          <polygon key={idx} points={pts} />
        ))}
      </g>

      {/* Main Outer Glowing Sun Disc */}
      <circle
        cx="12"
        cy="12"
        r="5.4"
        fill="url(#glowingSunCore)"
        stroke="url(#glowingSunRay)"
        strokeWidth="0.9"
      />

      {/* Subtle Inner Concentric Ring */}
      <circle
        cx="12"
        cy="12"
        r="3.5"
        fill="none"
        stroke="#FFF4D0"
        strokeWidth="0.6"
        opacity="0.65"
      />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === 'light';

  // Motion value for pull distance (y)
  const y = useMotionValue(0);
  const smoothY = useSpring(y, { stiffness: 400, damping: 20 });

  // Dynamic values driven by spring position
  const glowScale = useTransform(smoothY, [0, PULL_THRESHOLD], [0.8, 1.85]);
  const glowOpacity = useTransform(smoothY, [0, PULL_THRESHOLD], [0.2, 0.95]);
  const stringLength = useTransform(smoothY, [0, PULL_THRESHOLD], [24, 44]);

  const isAnimatingRef = useRef(false);

  // Single click trigger handler
  const handleAction = (e) => {
    if (e) e.preventDefault();
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    // Instantly toggle theme state
    toggle();

    // Perform lamp string pull & spring snap-back animation
    animate(y, PULL_THRESHOLD, {
      duration: 0.16,
      ease: [0.33, 1, 0.68, 1],
      onComplete: () => {
        animate(y, 0, {
          type: 'spring',
          stiffness: 450,
          damping: 18,
          mass: 0.7,
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      },
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleAction(e);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      id="vintage-theme-toggle"
      aria-label={`Switch to ${isLight ? 'Dark Burgundy Estate' : 'Light Ivory Estate'} theme`}
      aria-pressed={isLight}
      onClick={handleAction}
      onKeyDown={handleKeyDown}
      className="relative flex items-center justify-center cursor-pointer select-none group outline-none focus:outline-none focus:ring-0 focus-visible:outline-none"
      title="Pull string to switch theme"
      style={{ width: '32px', height: '28px' }}
    >
      {/* ── SVG Defs for Gradients ── */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="goldThemeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E0A3" />
            <stop offset="50%" stopColor="#C9A45C" />
            <stop offset="100%" stopColor="#8A6625" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Warm Gold Radial Glow ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '36px',
          height: '36px',
          scale: glowScale,
          opacity: glowOpacity,
          background: isLight
            ? 'radial-gradient(circle, rgba(181,138,62,0.55) 0%, rgba(181,138,62,0) 70%)'
            : 'radial-gradient(circle, rgba(201,164,92,0.65) 0%, rgba(201,164,92,0) 70%)',
          filter: 'blur(4px)',
        }}
      />

      {/* ── Interactive Lamp Pull Assembly (Moon/Sun centered with navbar text) ── */}
      <motion.div
        className="relative flex flex-col items-center"
        style={{ y: smoothY }}
      >
        {/* ── Moon / Sun Celestial Icon (Identical 24x24 Size) ── */}
        <div className="relative w-6 h-6 flex items-center justify-center text-gold drop-shadow-[0_2px_8px_rgba(201,164,92,0.35)]">
          <AnimatePresence mode="wait" initial={false}>
            {isLight ? (
              /* Glowing Gold Pointed Sun Disc (Exact same size as moon) */
              <motion.div
                key="glowing-gold-sun"
                initial={{ scale: 0.4, rotate: -60, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.4, rotate: 60, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <GlowingGoldSunIcon />
              </motion.div>
            ) : (
              /* Crescent Moon Icon (Exact same size as sun) */
              <motion.svg
                key="moon"
                initial={{ scale: 0.4, rotate: 60, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.4, rotate: -60, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <path
                  fill="url(#goldThemeGrad)"
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                />
                <path
                  fill="#FFF4D0"
                  opacity="0.35"
                  d="M19 12.79A7 7 0 1 1 11.21 5 5.5 5.5 0 0 0 19 12.79z"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* ── Pull String & Bead hanging down below Moon/Sun icon ── */}
        <div className="absolute top-full flex flex-col items-center pointer-events-auto">
          {/* Thin Gold Pull String */}
          <motion.div
            className="w-[1.5px] bg-gradient-to-b from-gold via-[#F5E0A3] to-gold shadow-[0_0_3px_rgba(201,164,92,0.4)]"
            style={{ height: stringLength }}
          />

          {/* Turned Gold Bead Ornament */}
          <motion.div
            className="flex flex-col items-center group-hover:scale-110 transition-transform duration-200"
            style={{ marginTop: '-1px' }}
          >
            {/* Top tiny bead ring */}
            <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-sm border border-[#7A5B1E]/40" />

            {/* Main decorative turned bead */}
            <div
              className="w-3 h-4 rounded-b-full rounded-t-sm shadow-[0_2px_6px_rgba(0,0,0,0.4)] relative overflow-hidden"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #FFF0C2 0%, #C9A45C 50%, #7A5B1E 100%)',
                border: '0.5px solid rgba(255,240,194,0.5)',
              }}
            >
              {/* Highlight gleam */}
              <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white/70 blur-[0.5px]" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
