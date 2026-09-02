import { useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

/**
 * Vintage Pull-Cord Light Switch
 *
 * Real interactive mechanical pull switch:
 * - Click or drag the cord/handle downward with natural stretch and resistance physics.
 * - Tripping threshold (26px) triggers the light ON / OFF state with tactile mechanical bounce.
 * - Smooth elastic snap-back returns the cord and brass weight to its resting position.
 * - Distinct lighting states:
 *     • ON  -> Illuminated radiant sun lamp with warm ambient glow.
 *     • OFF -> Dimmed nocturnal crescent moon with subtle starlight glimmer.
 * - Touch-friendly 44x44px touch-action:none grab area for seamless mobile dragging.
 */

const PULL_THRESHOLD = 26;
const MAX_PULL = 46;
const RESTING_STRING_LENGTH = 24;

/**
 * Synthesized tactile switch click sound using Web Audio API (no assets needed).
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
    // Silently continue if audio context is unavailable or restricted
  }
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
  const stringHeight = useTransform(
    smoothY,
    (val) => RESTING_STRING_LENGTH + Math.max(0, val)
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
      // Ignore if pointer capture fails
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
      style={{ width: '36px', height: '32px' }}
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

      {/* ── Ambient Lamp Glow (Illuminated when ON, dimmed when OFF) ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none transition-colors duration-500"
        style={{
          width: isLight ? '52px' : '36px',
          height: isLight ? '52px' : '36px',
          scale: glowScale,
          opacity: glowOpacity,
          background: isLight
            ? 'radial-gradient(circle, rgba(220,175,80,0.7) 0%, rgba(201,164,92,0.3) 45%, rgba(201,164,92,0) 75%)'
            : 'radial-gradient(circle, rgba(201,164,92,0.45) 0%, rgba(201,164,92,0) 70%)',
          filter: isLight ? 'blur(6px)' : 'blur(4px)',
        }}
      />

      {/* ── Fixed Celestial Lamp Fixture (Moon/Sun Anchor) ── */}
      <motion.div
        className="relative flex flex-col items-center"
        style={{ y: lampFlex }}
      >
        {/* ── Moon / Sun Celestial Icon (Fixed 24x24) ── */}
        <div className="relative w-6 h-6 flex items-center justify-center text-gold drop-shadow-[0_2px_10px_rgba(201,164,92,0.4)]">
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
                  opacity="0.35"
                  d="M19 12.79A7 7 0 1 1 11.21 5 5.5 5.5 0 0 0 19 12.79z"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* ── Interactive Hanging Pull String (Anchored at base of fixture) ── */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center">
          {/* Dynamic Stretchy Cord */}
          <motion.div
            className="w-[1.5px] bg-gradient-to-b from-gold via-[#F5E0A3] to-gold shadow-[0_0_4px_rgba(201,164,92,0.5)] origin-top pointer-events-none"
            style={{ height: stringHeight }}
          />

          {/* ── Pull Handle Assembly & Touch Grab Area ── */}
          <motion.div
            style={{ y: smoothY }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="
              absolute top-0 -translate-y-1/2 flex flex-col items-center justify-center
              cursor-grab active:cursor-grabbing
              touch-none select-none
              w-12 h-12
              group
            "
            aria-label="Pull cord handle"
          >
            {/* Visual Brass Weight Handle */}
            <div
              className="flex flex-col items-center pointer-events-none transition-transform duration-150 group-hover:scale-110 group-active:scale-105"
              style={{
                marginTop: `${RESTING_STRING_LENGTH}px`,
              }}
            >
              {/* Top tiny brass ring connecting to cord */}
              <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-sm border border-[#7A5B1E]/50" />

              {/* Main turned brass pendant weight */}
              <div
                className="w-3.5 h-4.5 rounded-b-full rounded-t-sm shadow-[0_2px_8px_rgba(0,0,0,0.5)] relative overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #FFF0C2 0%, #C9A45C 50%, #7A5B1E 100%)',
                  border: '0.5px solid rgba(255,240,194,0.6)',
                }}
              >
                {/* Specular highlight gleam */}
                <div className="absolute top-0.5 left-0.5 w-1 h-1.5 rounded-full bg-white/75 blur-[0.4px]" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

