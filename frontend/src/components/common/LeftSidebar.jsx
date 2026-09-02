import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Inline SVG social icons — thin stroke, outline style ── */
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LeetCodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}

/* ── Meaningful positive life words that continuously rotate ── */
export const POSITIVE_WORDS = [
  'LIFE',
  'PERSPECTIVE',
  'HUMBLE',
  'CALM',
  'GRATITUDE',
  'PURPOSE',
  'CLARITY',
  'RESILIENCE',
  'EVOLVE',
  'KINDNESS',
  'BALANCE',
  'GROWTH',
];

/**
 * RotatingWord — Smooth vertical fade & slide transition between positive words.
 */
export function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % POSITIVE_WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-36 min-h-[135px] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={POSITIVE_WORDS[index]}
          initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-[8px] font-medium tracking-[0.3em] uppercase text-slate/90 hover:text-gold transition-colors select-none"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          {POSITIVE_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/**
 * RotatingWordHorizontal — Smooth horizontal transition for mobile drawers and footers.
 */
export function RotatingWordHorizontal() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % POSITIVE_WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2">
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"
        animate={{ scale: [1, 1.35, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="h-5 flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={POSITIVE_WORDS[index]}
            initial={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -6, filter: 'blur(2px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-[9px] font-medium tracking-[0.25em] uppercase text-slate/90 select-none"
          >
            {POSITIVE_WORDS[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * SocialLinksRow — Reusable horizontal row of social icons for mobile and footer.
 */
export function SocialLinksRow({ className = 'flex items-center gap-4' }) {
  return (
    <div className={className}>
      <a
        href="https://www.linkedin.com/in/nivethitha-ramesh/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="p-1 text-slate hover:text-gold transition-colors duration-200"
      >
        <LinkedInIcon />
      </a>
      <a
        href="https://github.com/Nivethitha-1131"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="p-1 text-slate hover:text-gold transition-colors duration-200"
      >
        <GitHubIcon />
      </a>
      <a
        href="https://leetcode.com/u/Nivethitha_R/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LeetCode"
        className="p-1 text-slate hover:text-gold transition-colors duration-200"
      >
        <LeetCodeIcon />
      </a>
      <a
        href="mailto:nivethitha1131@gmail.com"
        aria-label="Email"
        className="p-1 text-slate hover:text-gold transition-colors duration-200"
      >
        <MailIcon />
      </a>
    </div>
  );
}

/**
 * LeftSidebar — fixed left column with social icons + vertical divider + rotating positive words.
 * Visible on large screens.
 */
export default function LeftSidebar() {
  return (
    <aside
      aria-label="Social links and life perspective"
      className="fixed left-5 xl:left-7 top-0 bottom-0 z-40 hidden lg:flex flex-col items-center pt-24 pb-8 pointer-events-none"
      style={{ willChange: 'auto', transform: 'translateZ(0)', isolation: 'isolate' }}
    >
      {/* Social icons */}
      <div className="flex flex-col items-center gap-5 pointer-events-auto">
        <a
          href="https://www.linkedin.com/in/nivethitha-ramesh/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-slate hover:text-gold transition-colors duration-200"
        >
          <LinkedInIcon />
        </a>
        <a
          href="https://github.com/Nivethitha-1131"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-slate hover:text-gold transition-colors duration-200"
        >
          <GitHubIcon />
        </a>
        <a
          href="https://leetcode.com/u/Nivethitha_R/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LeetCode"
          className="text-slate hover:text-gold transition-colors duration-200"
        >
          <LeetCodeIcon />
        </a>
        <a
          href="mailto:nivethitha1131@gmail.com"
          aria-label="Email"
          className="text-slate hover:text-gold transition-colors duration-200"
        >
          <MailIcon />
        </a>
      </div>

      {/* Thin vertical divider */}
      <div className="w-px flex-1 bg-hairline my-6" />

      {/* Pulsing dot + Rotating positive life words */}
      <div className="flex flex-col items-center gap-2">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-gold"
          animate={{ scale: [1, 1.35, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <RotatingWord />
      </div>
    </aside>
  );
}
