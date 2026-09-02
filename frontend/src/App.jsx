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

      {/* Fixed left sidebar — social icons + scroll indicator */}
      <LeftSidebar />

      {/* Single-scroll page canvas */}
      <main>
        <Home onContactOpen={openContact} />
        <Journey />
        <Innovation />
        <Skills />
      </main>

      {/* Footer */}
      <footer className="border-t border-hairline py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col items-center gap-6">
          {/* Back to Home CTA — ditto matching jumping scroll indicator */}
          <div>
            <button
              onClick={() => {
                document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer select-none"
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
                  className="-translate-y-0.5"
                >
                  <path d="M17 14l-5-5-5 5" />
                </svg>
              </motion.div>
              <span className="text-[8px] sm:text-[9px] font-medium tracking-[0.25em] uppercase text-slate/80 group-hover:text-gold transition-colors duration-200">
                Back to Top
              </span>
            </button>
          </div>

          {/* Copyright & Social links */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left pt-4 border-t border-hairline/40">
            <p className="text-[10px] tracking-widest uppercase text-slate">
              © {new Date().getFullYear()} Nivethitha Ramesh
            </p>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/nivethitha-ramesh/" target="_blank" rel="noopener noreferrer"
                className="text-[10px] tracking-widest uppercase text-slate hover:text-gold transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com/Nivethitha-1131" target="_blank" rel="noopener noreferrer"
                className="text-[10px] tracking-widest uppercase text-slate hover:text-gold transition-colors">
                GitHub
              </a>
              <a href="https://leetcode.com/u/Nivethitha_R/" target="_blank" rel="noopener noreferrer"
                className="text-[10px] tracking-widest uppercase text-slate hover:text-gold transition-colors">
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
