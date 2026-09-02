/* ── Feature icons ─────────────────────────────────────── */
function AIMLIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}

function DataIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v5c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 10v5c0 1.66 4.03 3 9 3s9-1.34 9-3v-5" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: <AIMLIcon />,
    title: 'AI & ML',
    description: 'Building intelligent models that learn, predict and create impact.',
  },
  {
    icon: <DataIcon />,
    title: 'Data Science',
    description: 'Turning raw data into meaningful insights and solutions.',
  },
  {
    icon: <CodeIcon />,
    title: 'Full Stack Dev',
    description: 'Crafting clean, scalable web apps with modern technologies.',
  },
  {
    icon: <StarIcon />,
    title: 'Problem Solver',
    description: 'Tackling complex challenges and building efficient solutions.',
  },
];

/**
 * WhatIDo — the bottom strip of the hero section.
 * Spans full width, slightly lighter surface, rounded top corners.
 * Contains a left WHAT I DO statement + 4 feature items with thin dividers.
 *
 * Positioned absolute bottom-0 within the parent hero section.
 */
export default function WhatIDo() {
  return (
    <div
      className="absolute bottom-0 inset-x-0 z-[25] border-t border-hairline"
      style={{
        background: 'color-mix(in srgb, var(--surface) 85%, var(--bg) 15%)',
        backdropFilter: 'blur(12px)',
        borderRadius: '18px 18px 0 0',
        minHeight: '130px',
      }}
    >
      <div className="max-w-[1440px] mx-auto h-full px-8 lg:px-16 py-5 flex items-center gap-8 lg:gap-0">

        {/* ── Left: WHAT I DO ── */}
        <div className="flex-shrink-0 lg:pr-10 xl:pr-14 lg:border-r lg:border-hairline">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-gold text-xs">✦</span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-gold font-medium">
              What I Do
            </span>
          </div>
          <div className="font-serif text-cream leading-tight" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)' }}>
            I build. I analyze.<br />
            I solve{' '}
            <span className="text-gold">real-world problems.</span>
          </div>
        </div>

        {/* ── Right: Feature grid ── */}
        <div className="hidden lg:grid flex-1 h-full" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`flex items-start gap-3 px-6 xl:px-8 ${i > 0 ? 'border-l border-hairline' : ''}`}
            >
              {/* Circular icon with subtle glow on hover */}
              <div
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-gold
                  border border-gold/30 hover:border-gold/70 hover:shadow-[0_0_12px_rgba(201,162,75,0.2)]
                  transition-all duration-250 mt-0.5"
              >
                {f.icon}
              </div>
              <div>
                <h4 className="text-cream text-xs font-semibold mb-1.5 tracking-wide">
                  {f.title}
                </h4>
                <p className="text-[10px] text-slate leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: simple 2-col grid of feature titles */}
        <div className="lg:hidden grid grid-cols-2 gap-4 flex-1">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-center gap-2">
              <span className="text-gold">{f.icon}</span>
              <span className="text-[11px] font-medium text-cream">{f.title}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
