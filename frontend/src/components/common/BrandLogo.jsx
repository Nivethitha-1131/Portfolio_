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
          relative flex items-center gap-2.5 sm:gap-3
          px-3 sm:px-4 py-1.5 sm:py-2
          rounded-full
          bg-surface/80 backdrop-blur-md
          border border-hairline/80
          group-hover:border-gold/50
          group-hover:shadow-[0_0_20px_rgba(201,162,75,0.18)]
          transition-all duration-300
        "
      >
        {/* ── Icon / Star Monogram ── */}
        <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-gold/10 text-gold border border-gold/25 group-hover:bg-gold group-hover:text-background transition-colors duration-300 shrink-0">
          <motion.span
            className="text-[11px] leading-none"
            animate={
              isHovered && !shouldReduceMotion
                ? { rotate: 180, scale: 1.15 }
                : { rotate: 0, scale: 1 }
            }
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            ✦
          </motion.span>
        </div>

        {/* ── City & Live Clock (Always Displayed) ── */}
        <div className="flex items-center gap-2 sm:gap-2.5 whitespace-nowrap text-[9px] sm:text-[10px] tracking-wider uppercase">
          {/* City */}
          <span className="hidden sm:inline font-medium text-slate group-hover:text-cream transition-colors duration-200">
            Coimbatore
          </span>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors duration-200" />

          {/* Live Clock */}
          <span className="font-mono text-cream/90 font-medium tabular-nums group-hover:text-gold transition-colors duration-200">
            {time || '14:00:00'}
          </span>
        </div>
      </div>
    </motion.a>
  );
}
