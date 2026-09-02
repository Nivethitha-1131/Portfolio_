import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

/**
 * Luxury Vintage Pull-Cord Light Switch
 *
 * Bespoke Art-Deco / Heirloom Lamp Pull:
 * - Handcrafted Victorian beaded gold ball-chain that stretches with natural physics.
 * - Ornate fluted brass pendant finial with stepped collar, filigree waist, specular gloss gleams, and acorn drop.
 * - Tactile mechanical pull with spring snap-back, recoil bounce, and Web Audio API switch sound.
 * - Distinct ambient illumination states (Illuminated Sun Lamp vs Nocturnal Crescent Moon).
 */

const PULL_THRESHOLD = 26;
const MAX_PULL = 46;
const RESTING_CHAIN_LENGTH = 28;

/**
 * Synthesized tactile switch click sound using Web Audio API.
 */
function playSwitchSound(isTurningOn) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Primary metallic snap
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(isTurningOn ? 1400 : 1100, now);
    osc1.frequency.exponentialRampToValueAtTime(isTurningOn ? 420 : 320, now + 0.028);

    gain1.gain.setValueAtTime(0.09, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

    osc1.start(now);
    osc1.stop(now + 0.03);

    // Subtle resonance click
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(isTurningOn ? 850 : 650, now + 0.006);
    osc2.frequency.exponentialRampToValueAtTime(200, now + 0.035);

    gain2.gain.setValueAtTime(0.06, now + 0.006);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc2.start(now + 0.006);
    osc2.stop(now + 0.038);
  } catch {
    // Silently continue if audio context is unavailable
  }
}

/**
 * Ornate Golden Beaded Ball Chain
 * Renders interconnected 3D metallic beads that stretch naturally.
 */
function BeadedChain({ length }) {
  // Generate bead positions along the dynamic chain length
  const beadSpacing = 5.2;
  const beadCount = Math.max(3, Math.floor(length / beadSpacing));

  return (
    <svg
      width="10"
      height={length}
      viewBox={`0 0 10 ${length}`}
      className="pointer-events-none overflow-visible"
      style={{ width: '10px', height: `${length}px` }}
    >
      {/* Central linking brass wire */}
      <line
        x1="5"
        y1="0"
        x2="5"
        y2={length}
        stroke="#A07828"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Shimmering 3D Metallic Beads */}
      {Array.from({ length: beadCount }).map((_, i) => {
        const cy = 2 + (i * (length - 4)) / (beadCount - 1 || 1);
        return (
          <g key={i}>
            {/* Bead shadow */}
            <circle cx="5.3" cy={cy + 0.4} r="1.7" fill="#3D2608" opacity="0.5" />
            {/* Bead body with gold gradient */}
            <circle cx="5" cy={cy} r="1.7" fill="url(#pendantBeadGrad)" />
            {/* Specular gleam highlight */}
            <circle cx="4.4" cy={cy - 0.5} r="0.55" fill="#FFFFFF" opacity="0.85" />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Ornate Victorian Brass Pendant Finial (The Bell Weight)
 * Hand-sculpted vector art with fluted ridges, filigree collar, and specular highlight.
 */
function OrnatePendantFinial() {
  return (
    <svg
      width="22"
      height="34"
      viewBox="0 0 22 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.65)]"
    >
      {/* ── Top Hanging Eyelet Ring ── */}
      <circle cx="11" cy="2.5" r="2.2" stroke="url(#pendantBrassGrad)" strokeWidth="1.2" fill="none" />
      <circle cx="11" cy="2.5" r="1" fill="#2A1B07" />

      {/* ── Stepped Brass Escutcheon Cap ── */}
      <rect x="8.5" y="4.5" width="5" height="1.6" rx="0.5" fill="url(#pendantHighlightGrad)" />
      <rect x="7" y="6" width="8" height="1.8" rx="0.6" fill="url(#pendantBrassGrad)" />

      {/* ── Ornate Upper Fluted Sphere ── */}
      <circle cx="11" cy="9.8" r="2.6" fill="url(#pendantBeadGrad)" />
      <circle cx="9.8" cy="8.6" r="0.8" fill="#FFFDF0" opacity="0.85" />

      {/* ── Filigree Waist Ring with Accent Beads ── */}
      <rect x="6.5" y="12.2" width="9" height="1.8" rx="0.7" fill="url(#pendantHighlightGrad)" />
      <line x1="7" y1="13.1" x2="15" y2="13.1" stroke="#5A3A0B" strokeWidth="0.5" />

      {/* ── Main Baroque Teardrop Bell Body ── */}
      <path
        d="M 8.2 13.8 C 6.5 16.5, 4.2 20.2, 4.2 24.2 C 4.2 29.2, 7.2 31.2, 11 31.2 C 14.8 31.2, 17.8 29.2, 17.8 24.2 C 17.8 20.2, 15.5 16.5, 13.8 13.8 Z"
        fill="url(#pendantBodyGrad)"
        stroke="url(#pendantHighlightGrad)"
        strokeWidth="0.7"
      />

      {/* Engraved Vertical Rib Fluting (Shadows & Highlights) */}
      <path
        d="M 9.2 14.5 C 7.8 17.5, 6.2 21, 6.2 24.5 C 6.2 28.5, 8.5 30.5, 11 30.5"
        stroke="#5A390C"
        strokeWidth="0.65"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M 12.8 14.5 C 14.2 17.5, 15.8 21, 15.8 24.5 C 15.8 28.5, 13.5 30.5, 11 30.5"
        stroke="#5A390C"
        strokeWidth="0.65"
        fill="none"
        opacity="0.7"
      />
      <line x1="11" y1="14" x2="11" y2="30.8" stroke="url(#pendantHighlightGrad)" strokeWidth="0.8" opacity="0.9" />

      {/* Curving Glassy Specular Highlight on Left Contour */}
      <path
        d="M 6.8 17.5 C 5.5 20.5, 5.5 24, 6.2 26.5"
        stroke="#FFFFFF"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />

      {/* ── Bottom Acorn Drop Finial Tip ── */}
      <circle cx="11" cy="31.8" r="1.6" fill="url(#pendantBeadGrad)" />
      <circle cx="10.4" cy="31.3" r="0.5" fill="#FFFDF0" opacity="0.9" />
      <circle cx="11" cy="33.4" r="0.8" fill="#C9A45C" />
    </svg>
  );
}

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

  // Motion value for vertical pull offset (y)
  const y = useMotionValue(0);
  const smoothY = useSpring(y, { stiffness: 480, damping: 22 });

  // Micro-flex on the fixed lamp anchor when pulled with tension
  const lampFlex = useTransform(smoothY, [0, PULL_THRESHOLD, MAX_PULL], [0, 1.4, 2.8]);

  // Dynamic values driven by pull position
  const glowScale = useTransform(
    smoothY,
    [0, PULL_THRESHOLD, MAX_PULL],
    [isLight ? 1.4 : 0.85, isLight ? 2.1 : 1.7, isLight ? 2.3 : 1.9]
  );
  const glowOpacity = useTransform(
    smoothY,
    [0, PULL_THRESHOLD, MAX_PULL],
    [isLight ? 0.8 : 0.28, 0.95, 1]
  );

  // Dynamic chain length
  const chainLength = useTransform(
    smoothY,
    (val) => RESTING_CHAIN_LENGTH + Math.max(0, val)
  );

  // Interaction refs
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startTimeRef = useRef(0);
  const hasTrippedRef = useRef(false);
  const isAutoAnimatingRef = useRef(false);

  // Spring snap-back with mechanical elastic bounce
  const springRelease = () => {
    animate(y, 0, {
      type: 'spring',
      stiffness: 520,
      damping: 13.5,
      mass: 0.52,
    });
  };

  // Programmatic pull-and-release (for quick click/tap)
  const triggerAutoPull = () => {
    if (isAutoAnimatingRef.current) return;
    isAutoAnimatingRef.current = true;

    animate(y, PULL_THRESHOLD + 5, {
      duration: 0.13,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        toggle();
        playSwitchSound(!isLight);
        if (typeof window !== 'undefined' && window.navigator?.vibrate) {
          window.navigator.vibrate(14);
        }

        animate(y, 0, {
          type: 'spring',
          stiffness: 520,
          damping: 13.5,
          mass: 0.52,
          onComplete: () => {
            isAutoAnimatingRef.current = false;
          },
        });
      },
    });
  };

  // Pointer Down (Mouse click or Touch start)
  const handlePointerDown = (e) => {
    e.preventDefault();
    if (isAutoAnimatingRef.current) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startTimeRef.current = Date.now();
    hasTrippedRef.current = false;
  };

  // Pointer Move (Dragging downward)
  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const rawDeltaY = e.clientY - startYRef.current;
    if (rawDeltaY <= 0) {
      y.set(0);
      return;
    }

    // Physical spring resistance past threshold
    let pull = rawDeltaY;
    if (pull > PULL_THRESHOLD) {
      const excess = pull - PULL_THRESHOLD;
      pull = PULL_THRESHOLD + excess * 0.38;
    }
    pull = Math.min(pull, MAX_PULL);
    y.set(pull);

    // Trip the switch once threshold is crossed during drag
    if (pull >= PULL_THRESHOLD && !hasTrippedRef.current) {
      hasTrippedRef.current = true;
      toggle();
      playSwitchSound(!isLight);
      if (typeof window !== 'undefined' && window.navigator?.vibrate) {
        window.navigator.vibrate(14);
      }
    }
  };

  // Pointer Up / Cancel (Release cord)
  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    const elapsed = Date.now() - startTimeRef.current;
    const rawDeltaY = e.clientY - startYRef.current;

    // If it was a quick click/tap without dragging, run programmatic pull
    if (rawDeltaY < 6 && elapsed < 300) {
      triggerAutoPull();
      return;
    }

    // If user dragged, release with elastic bounce
    springRelease();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerAutoPull();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      id="vintage-theme-toggle"
      aria-label={`Pull-cord light switch: currently ${isLight ? 'ON (Light)' : 'OFF (Dark)'}. Pull to switch.`}
      aria-pressed={isLight}
      onKeyDown={handleKeyDown}
      className="relative flex items-center justify-center select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none"
      title="Pull cord downward to switch light"
      style={{ width: '40px', height: '36px' }}
    >
      {/* ── SVG Defs for Rich Luxury Gradients ── */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="goldThemeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2C8" />
            <stop offset="35%" stopColor="#F5E0A3" />
            <stop offset="70%" stopColor="#C9A45C" />
            <stop offset="100%" stopColor="#8A6625" />
          </linearGradient>

          {/* Luxury Turned Brass Gradient */}
          <linearGradient id="pendantBrassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7A5216" />
            <stop offset="25%" stopColor="#C9A45C" />
            <stop offset="50%" stopColor="#FFF5D6" />
            <stop offset="75%" stopColor="#C9A45C" />
            <stop offset="100%" stopColor="#5E3D0D" />
          </linearGradient>

          {/* Baroque Pendant Body 3D Radial Gradient */}
          <radialGradient id="pendantBodyGrad" cx="36%" cy="30%" r="68%">
            <stop offset="0%" stopColor="#FFFDF5" />
            <stop offset="22%" stopColor="#F5DF9E" />
            <stop offset="55%" stopColor="#C9A45C" />
            <stop offset="82%" stopColor="#845A1A" />
            <stop offset="100%" stopColor="#4A310A" />
          </radialGradient>

          {/* Specular Bead Gradient */}
          <radialGradient id="pendantBeadGrad" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#F8E5B2" />
            <stop offset="68%" stopColor="#C9A45C" />
            <stop offset="100%" stopColor="#6C450E" />
          </radialGradient>

          {/* Platinum-Gold Highlight Accent */}
          <linearGradient id="pendantHighlightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF8" />
            <stop offset="45%" stopColor="#EAD292" />
            <stop offset="100%" stopColor="#A47B2C" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Ambient Lamp Glow (Illuminated when ON, dimmed when OFF) ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none transition-colors duration-500"
        style={{
          width: isLight ? '56px' : '38px',
          height: isLight ? '56px' : '38px',
          scale: glowScale,
          opacity: glowOpacity,
          background: isLight
            ? 'radial-gradient(circle, rgba(235,185,85,0.75) 0%, rgba(201,164,92,0.35) 45%, rgba(201,164,92,0) 75%)'
            : 'radial-gradient(circle, rgba(201,164,92,0.4) 0%, rgba(201,164,92,0) 70%)',
          filter: isLight ? 'blur(7px)' : 'blur(4px)',
        }}
      />

      {/* ── Fixed Celestial Lamp Fixture (Moon/Sun Anchor) ── */}
      <motion.div
        className="relative flex flex-col items-center"
        style={{ y: lampFlex }}
      >
        {/* ── Moon / Sun Celestial Icon (Fixed 24x24) ── */}
        <div className="relative w-6 h-6 flex items-center justify-center text-gold drop-shadow-[0_2px_12px_rgba(201,164,92,0.45)]">
          <AnimatePresence mode="wait" initial={false}>
            {isLight ? (
              /* Glowing Gold Pointed Sun Lamp (Light ON) */
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
              /* Crescent Moon Fixture (Light OFF) */
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
                  opacity="0.4"
                  d="M19 12.79A7 7 0 1 1 11.21 5 5.5 5.5 0 0 0 19 12.79z"
                />
                {/* Dainty celestial engraved star on moon */}
                <circle cx="9.5" cy="11.5" r="0.6" fill="#FFFDF5" opacity="0.8" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* ── Ornate Hanging Beaded Chain & Luxury Pendant (Single Connected Assembly) ── */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          {/* Decorative brass bracket link connecting moon to chain */}
          <div className="w-1.5 h-1 -mt-0.5 rounded-sm bg-gradient-to-b from-[#C9A45C] to-[#8A6020] shadow-[0_1px_3px_rgba(0,0,0,0.4)] shrink-0" />

          {/* Dynamic Stretchy Beaded Ball Chain */}
          <motion.div
            className="flex flex-col items-center origin-top pointer-events-none"
            style={{ height: chainLength }}
          >
            <ChainRenderer chainLength={chainLength} />
          </motion.div>

          {/* ── Ornate Pendant Handle (Directly Attached Below the Chain) ── */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="
              -mt-1.5 flex flex-col items-center justify-center
              cursor-grab active:cursor-grabbing
              touch-none select-none
              p-2.5 -m-2.5
              group pointer-events-auto
            "
            aria-label="Pull cord ornate handle"
          >
            {/* Visual Ornate Brass Finial with Hover Micro-Glow */}
            <div className="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-115 group-active:scale-105">
              {/* Ambient glimmer behind finial */}
              <div
                className="absolute inset-0 rounded-full blur-[6px] bg-gold/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
              <OrnatePendantFinial />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Animated subscriber component that re-renders the beaded chain smoothly as chainLength changes
 */
function ChainRenderer({ chainLength }) {
  const [len, setLen] = useState(RESTING_CHAIN_LENGTH);

  useEffect(() => {
    return chainLength.on('change', (latest) => {
      setLen(Math.round(latest));
    });
  }, [chainLength]);

  return <BeadedChain length={len} />;
}


