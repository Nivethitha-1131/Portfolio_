import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SocialLinksRow, RotatingWordHorizontal } from '../common/LeftSidebar';

/* ── PORTFOLIO wordmark letters ─────────────────────────────── */
const PORTFOLIO_LETTERS = ['P', 'O', 'R', 'T', 'F', 'O', 'L', 'I', 'O'];
const SUBTITLE = 'AI & DATA SCIENCE ENTHUSIAST';

/* ── Editorial easing ────────────────────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1];

/* ── PORTFOLIO wordmark animation variants ───────────────────── */
const wordmarkContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.042, delayChildren: 0.9 },
  },
};

const wordmarkLetter = {
  hidden: {
    opacity: 0,
    scaleX: 0.5,
    filter: 'blur(8px)',
    x: 0,
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    filter: 'blur(0px)',
    x: 0,
    transition: { duration: 0.48, ease: EASE_OUT },
  },
};

/* ── Stats data ─────────────────────────────────────────────── */
const STATS = [
  { target: 4, suffix: '+', line1: 'Projects', line2: 'Completed' },
  { target: 2, suffix: '+', line1: 'Years of', line2: 'Learning' },
  { target: 1.5, suffix: '+', line1: 'Years Intern', line2: 'Experience' },
  { target: 200, suffix: '+', line1: 'LeetCode', line2: 'Solved' },
];

/* ── CountUp component ───────────────────────────────────────── */
function CountUp({ target, suffix, delay = 0, duration = 900, started, reduced }) {
  const [count, setCount] = useState(reduced ? target : 0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!started || reduced) return;

    let timeout = setTimeout(() => {
      let startTime = null;

      const tick = (ts) => {
        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) rafRef.current = requestAnimationFrame(tick);
        else setCount(target);
      };

      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [started, target, duration, delay, reduced]);

  return <>{count}{suffix}</>;
}

/* ── Arrow icon ─────────────────────────────────────────────── */
function ArrowRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/**
 * Hero — responsive cinematic hero across mobile, tablet, desktop, and ultra-wide.
 *
 * @param {{ onContactOpen: () => void }} props
 */
export default function Hero({ onContactOpen }) {
  const shouldReduceMotion = useReducedMotion();

  const [statsStarted, setStatsStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStatsStarted(true), shouldReduceMotion ? 0 : 1800);
    return () => clearTimeout(t);
  }, [shouldReduceMotion]);

  return (
    <section
      id="home"
      aria-label="Hero — Nivethitha Ramesh"
      className="relative w-full overflow-hidden bg-background min-h-[600px] sm:min-h-[640px] h-[100dvh]"
    >
      {/* ── Layer 0 — Radial atmospheric glow ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute rounded-full bg-burgundy"
          style={{
            top: '32%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(320px, 75vw, 950px)',
            height: 'clamp(280px, 60vh, 650px)',
            filter: 'blur(120px)',
            opacity: 0.22,
          }}
        />
        <div
          className="absolute rounded-full bg-gold"
          style={{
            top: '26%', left: '26%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(180px, 34vw, 420px)',
            height: 'clamp(140px, 28vh, 340px)',
            filter: 'blur(90px)',
            opacity: 0.09,
          }}
        />
      </div>

      {/* ── Layer 1a — PORTFOLIO wordmark SOLID (behind portrait) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 z-[1] flex items-center justify-center font-serif select-none whitespace-nowrap leading-none px-2 overflow-hidden"
        style={{
          top: '46%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(36px, 12.5vw, 195px)',
          fontWeight: 900,
          letterSpacing: '-0.015em',
          color: '#7B1829',
          opacity: 0.95,
        }}
      >
        <motion.div
          className="inline-flex items-center max-w-full"
          variants={wordmarkContainer}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate="visible"
        >
          {PORTFOLIO_LETTERS.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={wordmarkLetter}
              style={{ transformOrigin: 'center center' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── Layer 1b — PORTFOLIO wordmark OUTLINE (above portrait) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 z-[20] flex items-center justify-center font-serif select-none whitespace-nowrap leading-none px-2 overflow-hidden"
        style={{
          top: '46%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(36px, 12.5vw, 195px)',
          fontWeight: 900,
          letterSpacing: '-0.015em',
          color: 'transparent',
          WebkitTextStroke: 'clamp(1px, 0.16vw, 1.6px) rgba(180,30,55,0.75)',
        }}
      >
        <motion.div
          className="inline-flex items-center max-w-full"
          variants={wordmarkContainer}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate="visible"
        >
          {PORTFOLIO_LETTERS.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={wordmarkLetter}
              style={{ transformOrigin: 'center center' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── Layer 2 — Portrait ── */}
      <motion.div
        className="pointer-events-none absolute z-[10] flex items-center justify-center"
        style={{
          top: '47%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: 'clamp(270px, 48vh, 550px)',
          width: 'auto',
          WebkitMaskImage: `
            linear-gradient(
              to top,
              transparent 0%,
              rgba(0,0,0,0.6) 18%,
              rgba(0,0,0,0.9) 32%,
              black 50%,
              black 80%,
              rgba(0,0,0,0.85) 92%,
              transparent 100%
            ),
            linear-gradient(
              to right,
              transparent 0%,
              black 8%,
              black 92%,
              transparent 100%
            )
          `,
          WebkitMaskComposite: 'destination-in',
          maskImage: `
            linear-gradient(
              to top,
              transparent 0%,
              rgba(0,0,0,0.6) 18%,
              rgba(0,0,0,0.9) 32%,
              black 50%,
              black 80%,
              rgba(0,0,0,0.85) 92%,
              transparent 100%
            ),
            linear-gradient(
              to right,
              transparent 0%,
              black 8%,
              black 92%,
              transparent 100%
            )
          `,
          maskComposite: 'intersect',
        }}
        initial={shouldReduceMotion ? { opacity: 0.85 } : { opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{
          duration: 1.5,
          delay: 0.1,
          ease: 'easeInOut',
        }}
      >
        <img
          src="/assets/portrait.png"
          alt="Nivethitha Ramesh"
          className="h-full w-auto object-contain max-w-[85vw]"
          draggable="false"
        />
      </motion.div>

      {/* ── Layer 3 — Cohesive Ultra-wide & Multi-screen Content Container ── */}
      <div className="relative z-[30] max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-12 pointer-events-none">

        {/* TOP-LEFT: Name + Subtitle */}
        <div
          className="absolute left-6 sm:left-10 md:left-32 lg:left-44 xl:left-48 pointer-events-auto"
          style={{
            top: 'clamp(80px, 12vh, 112px)',
            maxWidth: 'clamp(240px, 34vw, 380px)',
          }}
        >
          <motion.h1
            className="font-serif text-cream font-semibold leading-tight mb-2"
            style={{ fontSize: 'clamp(1.85rem, 5.2vw, 3.6rem)' }}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: EASE_OUT }}
          >
            Nivethitha R
          </motion.h1>

          <p
            className="flex flex-wrap text-[9px] sm:text-[10.5px] tracking-[0.18em] sm:tracking-[0.3em] uppercase text-gold font-medium"
            aria-label={SUBTITLE}
          >
            {SUBTITLE.split('').map((char, idx) => (
              <motion.span
                key={idx}
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                }}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: shouldReduceMotion ? 0 : 0.5 + idx * 0.013,
                  ease: EASE_OUT,
                }}
              >
                {char}
              </motion.span>
            ))}
          </p>

          {/* Social icons & Life Perspective — mobile/tablet only (LeftSidebar covers lg+) */}
          <motion.div
            className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4 lg:hidden flex-wrap"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.85, ease: EASE_OUT }}
          >
            <SocialLinksRow className="flex items-center gap-3" />
            <span className="w-px h-3.5 bg-hairline" aria-hidden="true" />
            <RotatingWordHorizontal />
          </motion.div>
        </div>

        {/* BOTTOM-LEFT: Bio + Explore CTA */}
        <motion.div
          className="
            absolute left-5 sm:left-8 md:left-32 lg:left-44 xl:left-48 pointer-events-auto
            bottom-[74px] md:bottom-[clamp(20px,4vh,48px)]
          "
          style={{
            maxWidth: 'clamp(240px, 32vw, 360px)',
          }}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.5, ease: EASE_OUT }}
        >
          <p
            className="text-cream font-light leading-relaxed mb-3.5 sm:mb-5"
            style={{ fontSize: 'clamp(0.88rem, 1.3vw, 1.1rem)' }}
          >
            I turn ideas into intelligent systems using{' '}
            <span className="text-gold font-medium">data</span>,{' '}
            code and{' '}
            <span className="text-gold font-medium">creativity</span>.
          </p>

          <div>
            <a
              href="#innovation"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#innovation')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="
                inline-flex items-center gap-2
                bg-cream text-background
                text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase
                px-4 py-3 sm:px-6 sm:py-4
                hover:bg-gold
                transition-colors duration-250
                cursor-pointer select-none
                shadow-[0_4px_20px_rgba(0,0,0,0.3)]
              "
            >
              Explore My Work
              <ArrowRightIcon />
            </a>
          </div>
        </motion.div>

        {/* MOBILE ACHIEVEMENTS BANNER (< md screens) */}
        <div
          className="
            md:hidden absolute inset-x-2.5 bottom-2.5 z-30 pointer-events-auto
            bg-surface/92 backdrop-blur-md border border-hairline rounded-sm
            px-2 py-2 shadow-xl
          "
        >
          <div className="grid grid-cols-4 items-center divide-x divide-hairline">
            {STATS.map((stat, i) => (
              <div key={stat.line1 + stat.line2} className="px-1 text-center">
                <div className="font-serif text-gold font-semibold text-[13px] leading-none tabular-nums">
                  <CountUp
                    target={stat.target}
                    suffix={stat.suffix}
                    delay={i * 120}
                    duration={900}
                    started={statsStarted}
                    reduced={shouldReduceMotion}
                  />
                </div>
                <div className="text-[7px] text-slate mt-1 leading-tight tracking-tight">
                  {stat.line1}<br />{stat.line2}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM-RIGHT: Stat counters (md+ screens) */}
        <div
          className="hidden md:flex absolute items-center pointer-events-auto"
          style={{
            bottom: 'clamp(20px, 4vh, 48px)',
            right: 'clamp(16px, 3vw, 48px)',
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.line1 + stat.line2}
              className="flex items-center"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: shouldReduceMotion ? 0 : 1.8 + i * 0.13,
                ease: EASE_OUT,
              }}
            >
              {i > 0 && (
                <div className="w-px h-8 sm:h-10 bg-hairline mx-2 sm:mx-3 lg:mx-5" aria-hidden="true" />
              )}
              <div className="text-center">
                <div
                  className="font-serif text-gold font-semibold leading-none tabular-nums"
                  style={{ fontSize: 'clamp(1.25rem, 1.8vw, 2.2rem)' }}
                >
                  <CountUp
                    target={stat.target}
                    suffix={stat.suffix}
                    delay={i * 180}
                    duration={900}
                    started={statsStarted}
                    reduced={shouldReduceMotion}
                  />
                </div>
                <div className="text-[8px] sm:text-[9px] lg:text-[10px] text-slate mt-1 leading-tight sm:leading-relaxed">
                  {stat.line1}<br />{stat.line2}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM SCROLL INDICATOR:
            On mobile (< md): Positioned bottom-[74px] right-3.5 (aligns with Explore button)
            On desktop (md+): Centered between bio and stats
        */}
        <motion.div
          className="
            absolute pointer-events-auto cursor-pointer
            right-3.5 bottom-[74px] md:right-auto md:bottom-[clamp(18px,3.2vh,40px)] md:left-1/2 md:-translate-x-1/2
            flex flex-col items-center
          "
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.9, ease: EASE_OUT }}
        >
          <a
            href="#journey"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex flex-col items-center gap-1.5 focus:outline-none select-none p-1"
            aria-label="Scroll down to Journey"
          >
            <span className="text-[8px] sm:text-[9px] font-medium tracking-[0.25em] uppercase text-slate/80 group-hover:text-gold transition-colors duration-200">
              Scroll
            </span>
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, 6, 0],
                    }
              }
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="
                w-7 h-7 sm:w-8 sm:h-8
                rounded-full
                border border-hairline group-hover:border-gold/70
                flex items-center justify-center
                text-slate group-hover:text-gold
                bg-surface/60 backdrop-blur-sm
                group-hover:shadow-[0_0_14px_rgba(201,162,75,0.35)]
                transition-all duration-300
              "
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="translate-y-0.5"
              >
                <path d="M7 10l5 5 5-5" />
              </svg>
            </motion.div>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
