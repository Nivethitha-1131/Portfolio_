import { motion, useReducedMotion } from 'framer-motion';

/**
 * Creative 3D Sculpted 'N' Brand Logo for Nivethitha Ramesh.
 *
 * Bespoke geometric brand mark:
 * - Two solid architectural vertical pillars in warm polished gold.
 * - Dimensional folded diagonal ribbon bridge with realistic drop shadow and specular glare.
 * - Celestial 4-point diamond sparkle star perched at the apex.
 * - Subtle outer celestial halo ring.
 */
function CreativeNLogo() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-5 h-5 sm:w-6 sm:h-6 overflow-visible drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Left Pillar: Radiant Champagne to Antique Gold */}
        <linearGradient id="nLogoLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF5" />
          <stop offset="25%" stopColor="#F7E2A8" />
          <stop offset="65%" stopColor="#C9A45C" />
          <stop offset="100%" stopColor="#7A5214" />
        </linearGradient>

        {/* 3D Diagonal Ribbon: Dimensional light-facing facet */}
        <linearGradient id="nLogoDiag" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#FFF2C6" />
          <stop offset="55%" stopColor="#E5C274" />
          <stop offset="85%" stopColor="#B38936" />
          <stop offset="100%" stopColor="#553508" />
        </linearGradient>

        {/* Right Pillar: Deep Sculpted Bronze-Gold */}
        <linearGradient id="nLogoRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7E2A8" />
          <stop offset="45%" stopColor="#C9A45C" />
          <stop offset="80%" stopColor="#966F2C" />
          <stop offset="100%" stopColor="#55370A" />
        </linearGradient>

        {/* Realistic Drop Shadow under the diagonal fold */}
        <filter id="nFoldShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-0.8" dy="1.4" stdDeviation="1" floodColor="#100600" floodOpacity="0.85" />
        </filter>
      </defs>

      {/* Subtle outer celestial dashed halo */}
      <circle
        cx="16"
        cy="16"
        r="14.8"
        stroke="url(#nLogoLeft)"
        strokeWidth="0.75"
        opacity="0.25"
        strokeDasharray="2 3"
      />

      {/* ── Left Architectural Pillar (Solid) ── */}
      <rect
        x="6"
        y="5.5"
        width="6"
        height="21"
        rx="1.8"
        fill="url(#nLogoLeft)"
      />

      {/* ── Right Architectural Pillar (Solid) ── */}
      <rect
        x="20"
        y="5.5"
        width="6"
        height="21"
        rx="1.8"
        fill="url(#nLogoRight)"
      />

      {/* ── 3D Overlapping Diagonal Ribbon (Solid) ── */}
      <path
        d="M 6 6.5 L 12 5.5 L 26 25.5 L 20 26.5 Z"
        fill="url(#nLogoDiag)"
        filter="url(#nFoldShadow)"
      />

      {/* Specular Glint Ridge running down diagonal apex */}
      <line
        x1="7"
        y1="6.5"
        x2="25"
        y2="25.5"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.95"
      />

      {/* ── Celestial 4-Point Diamond Sparkle Star at Apex ── */}
      <path
        d="M 26 2.2 Q 26 4 27.8 4 Q 26 4 26 5.8 Q 26 4 24.2 4 Q 26 4 26 2.2 Z"
        fill="#FFFDF5"
      />
    </svg>
  );
}

export default function BrandLogo({ onClick, href = '#home', className = '' }) {
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      aria-label="Nivethitha Ramesh — Home / Scroll to top"
      className={`group relative inline-flex items-center select-none cursor-pointer focus:outline-none ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    >
      {/* Ambient Glow Backdrop on Hover */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1.5 rounded-full bg-gold/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* ── Standalone Creative 'N' Brand Logo Emblem ── */}
      <div
        className="
          relative flex items-center justify-center
          w-9 h-9 sm:w-10 sm:h-10
          rounded-full
          bg-surface/80 backdrop-blur-md
          border border-hairline/80
          group-hover:border-gold/60
          group-hover:shadow-[0_0_24px_rgba(201,162,75,0.35)]
          transition-all duration-300
        "
      >
        {/* ── Creative 3D 'N' Emblem ── */}
        <motion.div
          className="relative flex items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-gradient-to-br from-gold/25 via-[#C9A45C]/15 to-transparent border border-gold/40 group-hover:border-gold group-hover:shadow-[0_0_16px_rgba(201,162,75,0.5)] transition-all duration-300 shrink-0"
          animate={
            !shouldReduceMotion
              ? { scale: [1, 1.03, 1] }
              : undefined
          }
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CreativeNLogo />
        </motion.div>
      </div>
    </motion.a>
  );
}
