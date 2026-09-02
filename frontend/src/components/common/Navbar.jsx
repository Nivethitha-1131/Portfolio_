import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import BrandLogo from './BrandLogo';

const NAV_LINKS = [
  { label: 'Home',       href: '#home',       id: 'home' },
  { label: 'Journey',    href: '#journey',    id: 'journey' },
  { label: 'Innovation', href: '#innovation', id: 'innovation' },
  { label: 'Skills',     href: '#skills',     id: 'skills' },
];

function ArrowNEIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

/**
 * Navbar — responsive header across all devices.
 *
 * Desktop (md+):
 *   Left  : BrandLogo live clock
 *   Center: Inline nav links
 *   Right : "Let's Talk ↗" + ThemeToggle
 *
 * Mobile (< md):
 *   Left  : BrandLogo (compact)
 *   Right : ThemeToggle + Animated mobile menu toggle (min 44px tap target)
 *   Drawer: Smooth sliding mobile menu with all nav links + "Let's Talk" CTA
 *
 * @param {{ onContactOpen: () => void }} props
 */
export default function Navbar({ onContactOpen }) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isClickScrollingRef = useRef(false);

  /* Active section scroll-spy */
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrollingRef.current) return;
      const scrollPosition = window.scrollY + 200;
      const links = [...NAV_LINKS].reverse();
      for (const link of links) {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(link.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollTo = (e, id, href) => {
    if (e) e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);
    isClickScrollingRef.current = true;

    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-hairline transition-colors duration-300">
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 h-14 sm:h-16 flex items-center justify-between"
      >
        {/* ── Left: Creative Interactive Brand Emblem ── */}
        <BrandLogo onClick={(e) => scrollTo(e, 'home', '#home')} />

        {/* ── Center: Desktop Nav Links (hidden on mobile, visible on md+) ── */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-10" role="list">
          {NAV_LINKS.map(({ label, href, id }) => {
            const isActive = activeSection === id;
            return (
              <li key={id}>
                <a
                  href={href}
                  onClick={(e) => scrollTo(e, id, href)}
                  className={`relative text-[9px] lg:text-[10px] font-medium tracking-[0.2em] lg:tracking-[0.25em] uppercase pb-1.5 transition-colors duration-200 ${
                    isActive ? 'text-cream' : 'text-slate hover:text-cream'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                      style={{ boxShadow: '0 0 6px rgba(201,162,75,0.6)' }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Right: CTA + ThemeToggle + Mobile Hamburger ── */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Desktop Let's Talk Button */}
          <button
            id="lets-talk-nav"
            onClick={onContactOpen}
            className="hidden md:flex items-center gap-1.5 text-[10px] font-medium tracking-[0.2em] uppercase text-cream hover:text-gold transition-colors duration-200 group cursor-pointer"
          >
            Let's Talk
            <span className="text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              <ArrowNEIcon />
            </span>
          </button>

          {/* Theme Switcher */}
          <div className="flex items-center justify-center p-1">
            <ThemeToggle />
          </div>

          {/* Mobile Hamburger / Menu Button (touch-friendly min 44x44px target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden flex items-center justify-center w-11 h-11 -mr-1 rounded-sm text-cream hover:text-gold transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer select-none"
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <span
                className={`w-full h-[1.5px] bg-current rounded-full transition-transform duration-300 origin-left ${
                  mobileMenuOpen ? 'rotate-45 translate-x-0.5 -translate-y-0.5' : ''
                }`}
              />
              <span
                className={`w-3/4 h-[1.5px] bg-current rounded-full transition-opacity duration-200 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-full h-[1.5px] bg-current rounded-full transition-transform duration-300 origin-left ${
                  mobileMenuOpen ? '-rotate-45 translate-x-0.5 translate-y-0.5' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Mobile Navigation Drawer Overlay ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-14 bg-background/80 backdrop-blur-md z-40 md:hidden"
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-navigation-menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-50 md:hidden bg-surface/98 border-b border-hairline shadow-2xl px-5 py-6"
            >
              <ul className="flex flex-col divide-y divide-hairline/60" role="list">
                {NAV_LINKS.map(({ label, href, id }, index) => {
                  const isActive = activeSection === id;
                  return (
                    <li key={id}>
                      <a
                        href={href}
                        onClick={(e) => scrollTo(e, id, href)}
                        className={`flex items-center justify-between py-3.5 text-xs font-medium tracking-[0.22em] uppercase transition-colors select-none ${
                          isActive ? 'text-gold' : 'text-cream/90 hover:text-gold'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-[9px] font-mono text-gold/60">0{index + 1}</span>
                          {label}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(201,162,75,0.8)]" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile Contact CTA Button */}
              <div className="mt-6 pt-4 border-t border-hairline/80">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onContactOpen();
                  }}
                  className="w-full flex items-center justify-center gap-2 border border-gold text-gold hover:bg-gold/10 text-xs font-semibold tracking-[0.2em] uppercase py-3.5 rounded-sm transition-all duration-200 cursor-pointer"
                >
                  Let's Talk
                  <ArrowNEIcon />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
