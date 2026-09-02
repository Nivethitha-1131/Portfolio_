import { useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import GrainOverlay from './components/common/GrainOverlay';
import Navbar from './components/common/Navbar';
import LeftSidebar from './components/common/LeftSidebar';
import ContactModal from './components/common/ContactModal';
import Home from './pages/Home';
import Journey from './pages/Journey';
import Innovation from './pages/Innovation';
import Skills from './pages/Skills';

/**
 * App — root component.
 * Orchestrates theme, grain overlay, fixed chrome (navbar + sidebar),
 * page sections, footer, and the contact modal.
 */
export default function App() {
  const [contactOpen, setContactOpen] = useState(false);

  const openContact  = () => setContactOpen(true);
  const closeContact = () => setContactOpen(false);

  return (
    <ThemeProvider>
      {/* Fixed film-grain texture overlay (global, z-1, pointer-events-none) */}
      <GrainOverlay />

      {/* Fixed top navigation */}
      <Navbar onContactOpen={openContact} />

      {/* Fixed left sidebar — social icons + scroll indicator (desktop only) */}
      <LeftSidebar />

      {/* Single-scroll page canvas */}
      <main className="w-full overflow-x-clip">
        <Home onContactOpen={openContact} />
        <Journey />
        <Innovation />
        <Skills />
      </main>

      {/* Footer */}
      <footer className="border-t border-hairline py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:pl-24 md:pr-8 lg:pl-32 lg:pr-12 xl:pl-36 xl:pr-16 flex flex-col items-center gap-6">
          {/* Back to Home CTA */}
          <div>
            <button
              onClick={() => {
                document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex flex-col items-center gap-2 p-2 focus:outline-none cursor-pointer select-none"
              aria-label="Go back to home page"
            >
              <motion.div
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="
                  w-8 h-8 sm:w-9 sm:h-9
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
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="-translate-y-0.5"
                >
                  <path d="M17 14l-5-5-5 5" />
                </svg>
              </motion.div>
              <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.25em] uppercase text-slate/80 group-hover:text-gold transition-colors duration-200">
                Back to Top
              </span>
            </button>
          </div>

          {/* Copyright & Social links */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left pt-4 border-t border-hairline/40">
            <p className="text-[10px] sm:text-[11px] tracking-widest uppercase text-slate">
              © {new Date().getFullYear()} Nivethitha Ramesh
            </p>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <a href="https://www.linkedin.com/in/nivethitha-ramesh/" target="_blank" rel="noopener noreferrer"
                className="text-[10px] sm:text-[11px] tracking-widest uppercase text-slate hover:text-gold transition-colors p-1">
                LinkedIn
              </a>
              <a href="https://github.com/Nivethitha-1131" target="_blank" rel="noopener noreferrer"
                className="text-[10px] sm:text-[11px] tracking-widest uppercase text-slate hover:text-gold transition-colors p-1">
                GitHub
              </a>
              <a href="https://leetcode.com/u/Nivethitha_R/" target="_blank" rel="noopener noreferrer"
                className="text-[10px] sm:text-[11px] tracking-widest uppercase text-slate hover:text-gold transition-colors p-1">
                LeetCode
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact modal — managed at root, rendered above everything */}
      <ContactModal isOpen={contactOpen} onClose={closeContact} />
    </ThemeProvider>
  );
}
