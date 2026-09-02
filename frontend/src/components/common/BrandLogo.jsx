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
 * Creative 'N' Monogram Emblem for Nivethitha Ramesh.
 * High-fashion serif letterform with rich gold gradient and a delicate celestial sparkle at the apex.
 */
function CreativeNMonogram() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="w-3.5 h-3.5 sm:w-4 sm:h-4 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="monogramGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8E0" />
          <stop offset="35%" stopColor="#F5DF9E" />
          <stop offset="70%" stopColor="#C9A45C" />
          <stop offset="100%" stopColor="#8E6520" />
        </linearGradient>
      </defs>

      {/* Left upright stem with serifs */}
      <line x1="4" y1="4.2" x2="7.6" y2="4.2" stroke="url(#monogramGold)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="5.8" y1="4.2" x2="5.8" y2="15.8" stroke="url(#monogramGold)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="15.8" x2="7.6" y2="15.8" stroke="url(#monogramGold)" strokeWidth="1.2" strokeLinecap="round" />

      {/* Bold high-contrast diagonal stroke */}
      <line x1="5.8" y1="4.6" x2="14.2" y2="15.4" stroke="url(#monogramGold)" strokeWidth="2.8" strokeLinecap="round" />

      {/* Right hairline upright stem with serifs */}
      <line x1="12.4" y1="4.2" x2="16" y2="4.2" stroke="url(#monogramGold)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="14.2" y1="4.2" x2="14.2" y2="15.8" stroke="url(#monogramGold)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12.4" y1="15.8" x2="16" y2="15.8" stroke="url(#monogramGold)" strokeWidth="1.2" strokeLinecap="round" />

      {/* Creative celestial four-point diamond sparkle star at apex */}
      <path
        d="M 16 1.8 Q 16 3.2 17.4 3.2 Q 16 3.2 16 4.6 Q 16 3.2 14.6 3.2 Q 16 3.2 16 1.8 Z"
        fill="#FFFDF2"
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
        {/* ── Creative 'N' Monogram Emblem ── */}
        <div className="relative flex items-center justify-center w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-gradient-to-br from-gold/20 via-gold/10 to-transparent border border-gold/35 group-hover:border-gold group-hover:shadow-[0_0_12px_rgba(201,162,75,0.45)] transition-all duration-300 shrink-0">
          <motion.div
            className="flex items-center justify-center"
            animate={
              isHovered && !shouldReduceMotion
                ? { scale: 1.15, rotate: [0, -4, 4, 0] }
                : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <CreativeNMonogram />
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
