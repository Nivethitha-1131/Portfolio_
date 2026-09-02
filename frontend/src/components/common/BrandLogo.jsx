import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * BrandLogo — Interactive Live Status & Time Capsule.
 *
 * A modern, tech-forward living interface capsule featuring:
 * - Real-time live clock (ticking in local IST / user timezone).
 * - Location indicator (Chennai, IN).
 * - Pulsing live availability beacon.
 * - Interactive hover reveal: smoothly transitions into 'Scroll to Top ↑'.
 * - Glassmorphic rounded pill styling with ambient gold illumination.
 */
/**
 * Creative 3D Sculpted 'N' Brand Logo for Nivethitha Ramesh.
 *
 * Bespoke geometric brand mark:
 * - Two solid architectural vertical pillars in warm polished gold.
 * - Dimensional folded diagonal ribbon bridge with specular lighting and depth.
 * - Solid filled vector geometry for 100% bold clarity across all screen resolutions.
 * - Signature celestial diamond sparkle accent at the apex.
 */
function CreativeNBrandLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 sm:w-[18px] sm:h-[18px] overflow-visible drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Left Pillar: Radiant Champagne to Antique Gold */}
        <linearGradient id="nLogoLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF4D0" />
          <stop offset="35%" stopColor="#F5DF9E" />
          <stop offset="70%" stopColor="#C9A45C" />
          <stop offset="100%" stopColor="#7A5214" />
        </linearGradient>

        {/* 3D Diagonal Ribbon: Dimensional light-facing facet */}
        <linearGradient id="nLogoDiag" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#FFF0C2" />
          <stop offset="55%" stopColor="#E0B865" />
          <stop offset="85%" stopColor="#C9A45C" />
          <stop offset="100%" stopColor="#6E470E" />
        </linearGradient>

        {/* Right Pillar: Deep Sculpted Bronze-Gold */}
        <linearGradient id="nLogoRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5DF9E" />
          <stop offset="40%" stopColor="#C9A45C" />
          <stop offset="75%" stopColor="#966F2C" />
          <stop offset="100%" stopColor="#55370A" />
        </linearGradient>

        {/* Dynamic drop shadow under diagonal fold */}
        <filter id="nFoldShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="-0.6" dy="1" stdDeviation="0.8" floodColor="#1A0F02" floodOpacity="0.75" />
        </filter>
      </defs>

      {/* ── Left Architectural Pillar (Solid) ── */}
      <rect
        x="3.5"
        y="3"
        width="4.8"
        height="18"
        rx="1.5"
        fill="url(#nLogoLeft)"
      />

      {/* ── Right Architectural Pillar (Solid) ── */}
      <rect
        x="15.7"
        y="3"
        width="4.8"
        height="18"
        rx="1.5"
        fill="url(#nLogoRight)"
      />

      {/* ── 3D Overlapping Diagonal Ribbon (Solid) ── */}
      <path
        d="M 3.5 3.8 L 8.3 3 L 20.5 20.2 L 15.7 21 Z"
        fill="url(#nLogoDiag)"
        filter="url(#nFoldShadow)"
      />

      {/* Specular Glint Ridge running down diagonal apex */}
      <line
        x1="4.6"
        y1="3.8"
        x2="19.4"
        y2="20.2"
        stroke="#FFFFFF"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* ── Celestial Sparkle Star perched on the top-right apex ── */}
      <path
        d="M 20.5 0.8 Q 20.5 2.5 22.2 2.5 Q 20.5 2.5 20.5 4.2 Q 20.5 2.5 18.8 2.5 Q 20.5 2.5 20.5 0.8 Z"
        fill="#FFFDF5"
      />
    </svg>
  );
}

export default function BrandLogo({ onClick, href = '#home', className = '' }) {
  const [time, setTime] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label="Nivethitha Ramesh — Home / Scroll to top"
      className={`group relative inline-flex items-center select-none cursor-pointer focus:outline-none ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    >
      {/* Ambient Glow Backdrop on Hover */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-full bg-gold/20 blur-md transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.8 : 0 }}
      />

      {/* ── Glassmorphic Living Capsule ── */}
      <div
        className="
          relative flex items-center gap-2 sm:gap-3
          px-2.5 sm:px-4 py-1 sm:py-2
          rounded-full
          bg-surface/80 backdrop-blur-md
          border border-hairline/80
          group-hover:border-gold/50
          group-hover:shadow-[0_0_20px_rgba(201,162,75,0.18)]
          transition-all duration-300
        "
      >
        {/* ── Creative 'N' Brand Logo Emblem ── */}
        <div className="relative flex items-center justify-center w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-gradient-to-br from-gold/25 via-[#C9A45C]/15 to-transparent border border-gold/45 group-hover:border-gold group-hover:shadow-[0_0_16px_rgba(201,162,75,0.5)] transition-all duration-300 shrink-0">
          <motion.div
            className="flex items-center justify-center"
            animate={
              isHovered && !shouldReduceMotion
                ? { scale: 1.12, rotate: [0, -3, 3, 0] }
                : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <CreativeNBrandLogo />
          </motion.div>
        </div>

        {/* ── City & Live Clock (Visible on all screen sizes) ── */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 whitespace-nowrap text-[8.5px] sm:text-[10px] tracking-wider uppercase">
          {/* City */}
          <span className="font-medium text-slate group-hover:text-cream transition-colors duration-200">
            Coimbatore
          </span>
          <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors duration-200" />

          {/* Live Clock */}
          <span className="font-mono text-cream/90 font-medium tabular-nums group-hover:text-gold transition-colors duration-200">
            {time || '14:00:00'}
          </span>
        </div>
      </div>
    </motion.a>
  );
}
