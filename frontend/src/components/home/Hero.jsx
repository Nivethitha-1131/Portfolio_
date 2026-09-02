import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/**
 * Hero — responsive full-viewport cinematic hero.
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
      className="relative w-full overflow-hidden bg-background min-h-[640px] h-[100dvh]"
    >
      {/* ── Layer 0 — Radial atmospheric glow ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute rounded-full bg-burgundy"
          style={{
            top: '30%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(320px, 70vw, 900px)',
            height: 'clamp(280px, 55vh, 600px)',
            filter: 'blur(120px)',
            opacity: 0.18,
          }}
        />
        <div
          className="absolute rounded-full bg-gold"
          style={{
            top: '25%', left: '25%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(180px, 30vw, 400px)',
            height: 'clamp(140px, 25vh, 320px)',
            filter: 'blur(90px)',
            opacity: 0.07,
          }}
        />
      </div>

      {/* ── Layer 1a — PORTFOLIO wordmark SOLID (behind portrait) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 z-[1] flex items-center justify-center font-serif select-none whitespace-nowrap leading-none px-2"
        style={{
          top: '45%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(36px, 13vw, 200px)',
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
        className="pointer-events-none absolute inset-x-0 z-[20] flex items-center justify-center font-serif select-none whitespace-nowrap leading-none px-2"
        style={{
          top: '45%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(36px, 13vw, 200px)',
          fontWeight: 900,
          letterSpacing: '-0.015em',
          color: 'transparent',
          WebkitTextStroke: 'clamp(1px, 0.15vw, 1.5px) rgba(180,30,55,0.75)',
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
          top: '46%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: 'clamp(280px, 50vh, 560px)',
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
        initial={shouldReduceMotion ? { opacity: 0.82 } : { opacity: 0 }}
        animate={{ opacity: 0.82 }}
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

      {/* ── Layer 4 — Content Overlays ── */}

      {/* TOP-LEFT: Name + Subtitle */}
      <div
        className="absolute z-[30] left-5 sm:left-10 lg:left-24 xl:left-28"
        style={{
          top: 'clamp(76px, 11vh, 96px)',
          maxWidth: 'clamp(240px, 35vw, 360px)',
        }}
      >
        <motion.h1
          className="font-serif text-cream font-semibold leading-tight mb-2"
          style={{ fontSize: 'clamp(1.75rem, 3.8vw, 3.4rem)' }}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: EASE_OUT }}
        >
          Nivethitha R
        </motion.h1>

        <p
          className="flex flex-wrap text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold font-medium"
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

        {/* Social icons — mobile/tablet only (LeftSidebar covers lg+) */}
        <motion.div
          className="flex items-center gap-5 mt-4 lg:hidden"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.85, ease: EASE_OUT }}
        >
          <a
            href="https://www.linkedin.com/in/nivethitha-ramesh/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-slate hover:text-gold transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://github.com/Nivethitha-1131"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-slate hover:text-gold transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a
            href="https://leetcode.com/u/Nivethitha_R/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
            className="text-slate hover:text-gold transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
          </a>
          <a
            href="mailto:nivethitha1131@gmail.com"
            aria-label="Email"
            className="text-slate hover:text-gold transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 7L2 7" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* BOTTOM-LEFT: Bio + Explore CTA */}
      <motion.div
        className="absolute z-[30] left-5 sm:left-10 lg:left-24 xl:left-28"
        style={{
          bottom: 'clamp(24px, 4vh, 48px)',
          maxWidth: 'clamp(250px, 32vw, 340px)',
        }}
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 1.5, ease: EASE_OUT }}
      >
        <p
          className="text-cream font-light leading-relaxed mb-5"
          style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)' }}
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
              text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase
              px-4 py-3 sm:px-5 sm:py-3.5
              hover:bg-gold
              transition-colors duration-250
            "
          >
            Explore My Work
            <ArrowRightIcon />
          </a>
        </div>
      </motion.div>

      {/* BOTTOM-RIGHT: Stat counters (md+ screens) */}
      <div
        className="hidden md:flex absolute z-[20] items-center"
        style={{
          bottom: 'clamp(24px, 4vh, 48px)',
          right: 'clamp(24px, 4vw, 80px)',
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
              <div className="w-px h-8 sm:h-10 bg-hairline mx-3 sm:mx-4 lg:mx-6" aria-hidden="true" />
            )}
            <div className="text-center">
              <div
                className="font-serif text-gold font-semibold leading-none tabular-nums"
                style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2.4rem)' }}
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
              <div className="text-[9px] sm:text-[10px] text-slate mt-1.5 leading-relaxed">
                {stat.line1}<br />{stat.line2}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* BOTTOM-CENTER: Jumping scroll down arrow */}
      <motion.div
        className="absolute z-[30] left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        style={{
          bottom: 'clamp(18px, 3.2vh, 40px)',
        }}
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
          className="group flex flex-col items-center gap-1.5 focus:outline-none"
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
                    y: [0, 7, 0],
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
    </section>
  );
}
