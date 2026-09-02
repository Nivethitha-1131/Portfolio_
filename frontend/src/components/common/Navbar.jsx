import { useState, useEffect, useRef } from 'react';
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
 * Navbar — always shows all page links inline across every screen size.
 *
 * Left  : N✦ monogram
 * Center: nav links (always visible)
 * Right : "Let's Talk ↗" (sm+) · ThemeToggle
 *
 * @param {{ onContactOpen: () => void }} props
 */
export default function Navbar({ onContactOpen }) {
  const [activeSection, setActiveSection] = useState('home');
  const isClickScrollingRef = useRef(false);

  /* Active section scroll-spy */
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrollingRef.current) return;
      const scrollPosition = window.scrollY + 180;
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

  const scrollTo = (e, id, href) => {
    if (e) e.preventDefault();
    setActiveSection(id);
    isClickScrollingRef.current = true;

    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-hairline transition-colors duration-300"
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 h-14 sm:h-16 flex items-center justify-between"
      >
        {/* ── Left: Creative Interactive Brand Emblem ── */}
        <BrandLogo onClick={(e) => scrollTo(e, 'home', '#home')} />

        {/* ── Center: Nav Links (always visible) ── */}
        <ul className="flex items-center gap-4 sm:gap-6 lg:gap-10" role="list">
          {NAV_LINKS.map(({ label, href, id }) => {
            const isActive = activeSection === id;
            return (
              <li key={id}>
                <a
                  href={href}
                  onClick={(e) => scrollTo(e, id, href)}
                  className={`relative text-[8px] sm:text-[10px] font-medium tracking-[0.15em] sm:tracking-[0.25em] uppercase pb-1 sm:pb-1.5 transition-colors duration-200 ${
                    isActive ? 'text-cream' : 'text-slate hover:text-cream'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                      style={{ boxShadow: '0 0 6px rgba(201,162,75,0.6)' }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Right: CTA + ThemeToggle ── */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Let's Talk Button */}
          <button
            id="lets-talk-nav"
            onClick={onContactOpen}
            className="hidden sm:flex items-center gap-1.5 text-[10px] font-medium tracking-[0.2em] uppercase text-cream hover:text-gold transition-colors duration-200 group"
          >
            Let's Talk
            <span className="text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              <ArrowNEIcon />
            </span>
          </button>

          {/* Theme Switcher */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
