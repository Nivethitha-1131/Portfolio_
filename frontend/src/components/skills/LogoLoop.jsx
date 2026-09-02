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
 */
function LogoCard({ item, isHighlighted, onHover, isDimmed }) {
  const { theme } = useTheme();
  const [iconError, setIconError] = useState(false);

  // Theme-aware icon color: golden in dark mode, antique bronze in light mode
  const iconHex = theme === 'light' ? '7A2635' : 'C9A45C';
  const iconUrl = item.icon && !['spark', 'database'].includes(item.icon)
    ? `https://cdn.simpleicons.org/${item.icon}/${iconHex}`
    : null;

  return (
    <div
      onMouseEnter={() => onHover(item.label)}
      onMouseLeave={() => onHover(null)}
      className={`
        group relative flex items-center gap-3 sm:gap-3.5
        px-4 py-2.5 sm:px-5 sm:py-3
        rounded-xl
        border transition-all duration-300 select-none cursor-pointer shrink-0
        ${
          isHighlighted
            ? 'bg-surface/90 border-gold shadow-[0_0_24px_rgba(201,164,92,0.35)] scale-105'
            : isDimmed
            ? 'bg-surface/40 border-hairline/40 opacity-40'
            : 'bg-surface/75 border-hairline/80 hover:border-gold/70 hover:bg-surface/95 hover:shadow-[0_8px_24px_rgba(201,164,92,0.22)] hover:scale-105'
        }
      `}
    >
      {/* Icon Pedestal */}
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-background/80 border border-hairline/60 flex items-center justify-center shrink-0 group-hover:border-gold/50 transition-colors">
        {['spark', 'database'].includes(item.icon) ? (
          <SpecialGlyph type={item.icon} />
        ) : iconUrl && !iconError ? (
          <img
            src={iconUrl}
            alt={`${item.label} logo`}
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain group-hover:scale-110 transition-transform duration-200"
            loading="lazy"
            onError={() => setIconError(true)}
          />
        ) : (
          <span className="font-mono text-xs font-bold text-gold">
            {item.label.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* Label & Category */}
      <div className="flex flex-col text-left leading-none">
        <span className="text-cream text-xs sm:text-[13px] font-medium tracking-wide group-hover:text-gold transition-colors duration-200 whitespace-nowrap">
          {item.label}
        </span>
        <span className="text-[7.5px] sm:text-[8px] font-mono tracking-widest uppercase text-slate/70 mt-1">
          {item.category}
        </span>
      </div>
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
      <div className="relative w-full rounded-2xl border border-hairline/70 bg-surface/30 backdrop-blur-sm p-3.5 sm:p-5 md:p-6 logo-loop-mask pause-on-hover flex flex-col gap-3 sm:gap-4 overflow-hidden shadow-inner">
        {/* Track 1: Flows Left */}
        <div className="flex overflow-hidden w-full">
          <div className="animate-marquee-left flex items-center gap-3 sm:gap-4">
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
          <div className="animate-marquee-right flex items-center gap-3 sm:gap-4">
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
          <div className="animate-marquee-left flex items-center gap-3 sm:gap-4" style={{ '--marquee-duration': '44s' }}>
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

      {/* Subtle Hint */}
      <p className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-slate/50 text-center select-none">
        ✦ Interactive Logo Stream • Hover or touch to inspect
      </p>
    </div>
  );
}
