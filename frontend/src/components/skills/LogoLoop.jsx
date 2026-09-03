import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { logoLoopTracks } from '../../data/skills';

/**
 * Custom SVG glyphs for conceptual skills without a brand slug.
 */
function SpecialGlyph({ type }) {
  if (type === 'spark') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    );
  }
  if (type === 'database') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }
  return null;
}

/**
 * Individual Logo Card in the infinite loop.
 * - Frameless, free-floating: no box or border around the logo.
 * - If it has a logo: logo is centered on top, name is centered below it.
 * - If it does not have a logo: just the clean word is displayed alone, centered and neat.
 */
function LogoCard({ item, isHighlighted, onHover, isDimmed }) {
  const { theme } = useTheme();
  const [iconError, setIconError] = useState(false);

  // Theme-aware icon color: golden in dark mode, antique bronze in light mode
  const iconHex = theme === 'light' ? '7A2635' : 'C9A45C';
  const isSpecial = ['spark', 'database'].includes(item.icon);
  const iconUrl = item.icon && !isSpecial
    ? `https://cdn.simpleicons.org/${item.icon}/${iconHex}`
    : null;
  const hasLogo = Boolean(item.icon) && !iconError;

  return (
    <div
      onMouseEnter={() => onHover(item.label)}
      onMouseLeave={() => onHover(null)}
      className={`
        group relative flex flex-col items-center justify-center
        min-w-[80px] sm:min-w-[95px] px-3 sm:px-4 py-1.5
        transition-all duration-300 select-none cursor-pointer shrink-0
        ${
          isHighlighted
            ? 'scale-110 opacity-100'
            : isDimmed
            ? 'opacity-30'
            : 'opacity-85 hover:opacity-100 hover:scale-110'
        }
      `}
    >
      {hasLogo ? (
        <>
          {/* Centered Logo on top (No box) */}
          <div className="flex items-center justify-center h-8 sm:h-9 mb-1.5 transition-transform duration-200 group-hover:scale-110">
            {isSpecial ? (
              <SpecialGlyph type={item.icon} />
            ) : (
              <img
                src={iconUrl}
                alt=""
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                loading="lazy"
                onError={() => setIconError(true)}
              />
            )}
          </div>

          {/* Name below the logo */}
          <span className={`text-[11px] sm:text-xs font-medium transition-colors duration-200 text-center whitespace-nowrap leading-tight ${isHighlighted ? 'text-gold' : 'text-cream/90 group-hover:text-gold'}`}>
            {item.label}
          </span>
        </>
      ) : (
        /* If it does not have a logo, just the word alone, centered & neat */
        <span className={`text-xs sm:text-[13px] font-medium transition-colors duration-200 text-center whitespace-nowrap leading-tight tracking-wide px-1 py-3 ${isHighlighted ? 'text-gold' : 'text-cream/90 group-hover:text-gold'}`}>
          {item.label}
        </span>
      )}
    </div>
  );
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Technologies' },
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'backend', label: 'Backend & Cloud' },
  { id: 'database', label: 'Data & Databases' },
];

/**
 * LogoLoop — Multi-track Continuous Infinite Marquee for the Skills section.
 */
export default function LogoLoop() {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const isMatch = (item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'ai') return item.category.includes('AI') || item.category.includes('GenAI') || item.category.includes('Vision');
    if (activeTab === 'frontend') return item.category.includes('Frontend') || item.category.includes('Language');
    if (activeTab === 'backend') return item.category.includes('Backend') || item.category.includes('Cloud') || item.category.includes('DevOps');
    if (activeTab === 'database') return item.category.includes('Database') || item.category.includes('Data') || item.category.includes('Analytics');
    return true;
  };

  return (
    <div className="relative w-full overflow-hidden flex flex-col gap-5 sm:gap-6 pt-2 pb-2">
      {/* ── Category Filter Pills ── */}
      <div className="flex items-center justify-start gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar py-1">
        {CATEGORY_TABS.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-250 cursor-pointer select-none
                ${
                  isSelected
                    ? 'bg-gold text-background font-semibold shadow-[0_0_16px_rgba(201,164,92,0.4)]'
                    : 'bg-surface/70 border border-hairline/70 text-slate hover:text-cream hover:border-gold/50'
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Infinite Logo Loop Tracks with Edge Fade Vignette strictly inside this container ratio ── */}
      <div className="relative w-full rounded-2xl border border-hairline/60 bg-surface/25 backdrop-blur-sm p-4 sm:p-6 md:p-7 logo-loop-mask pause-on-hover flex flex-col gap-5 sm:gap-6 overflow-hidden">
        {/* Track 1: Flows Left */}
        <div className="flex overflow-hidden w-full">
          <div className="animate-marquee-left flex items-center gap-5 sm:gap-8">
            {/* Duplicated for seamless infinite loop */}
            {[...logoLoopTracks[0], ...logoLoopTracks[0]].map((item, idx) => (
              <LogoCard
                key={`t1-${item.label}-${idx}`}
                item={item}
                isHighlighted={hoveredSkill === item.label || (activeTab !== 'all' && isMatch(item))}
                isDimmed={activeTab !== 'all' && !isMatch(item)}
                onHover={setHoveredSkill}
              />
            ))}
          </div>
        </div>

        {/* Track 2: Flows Right */}
        <div className="flex overflow-hidden w-full">
          <div className="animate-marquee-right flex items-center gap-5 sm:gap-8">
            {/* Duplicated for seamless infinite loop */}
            {[...logoLoopTracks[1], ...logoLoopTracks[1]].map((item, idx) => (
              <LogoCard
                key={`t2-${item.label}-${idx}`}
                item={item}
                isHighlighted={hoveredSkill === item.label || (activeTab !== 'all' && isMatch(item))}
                isDimmed={activeTab !== 'all' && !isMatch(item)}
                onHover={setHoveredSkill}
              />
            ))}
          </div>
        </div>

        {/* Track 3: Flows Left */}
        <div className="flex overflow-hidden w-full">
          <div className="animate-marquee-left flex items-center gap-5 sm:gap-8" style={{ '--marquee-duration': '44s' }}>
            {/* Duplicated for seamless infinite loop */}
            {[...logoLoopTracks[2], ...logoLoopTracks[2]].map((item, idx) => (
              <LogoCard
                key={`t3-${item.label}-${idx}`}
                item={item}
                isHighlighted={hoveredSkill === item.label || (activeTab !== 'all' && isMatch(item))}
                isDimmed={activeTab !== 'all' && !isMatch(item)}
                onHover={setHoveredSkill}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
