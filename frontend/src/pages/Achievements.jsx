import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionReveal from '../components/common/SectionReveal';
import AnimatedHeading from '../components/common/AnimatedHeading';
import { achievementsStats, achievementsList } from '../data/achievements';
import { useTheme } from '../hooks/useTheme';

/**
 * Animated count-up counter for achievements stats.
 */
function StatCounter({ target, suffix, delay = 0, duration = 900 }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTimestamp = null;
    let frameId;

    const timeout = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setVal(Math.round(ease * target));
        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        } else {
          setVal(target);
        }
      };
      frameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [started, target, duration, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
}

function AchievementIcon({ type }) {
  if (type === 'trophy') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-gold">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
        <path d="M6 4h12v6a6 6 0 0 1-12 0V4Z" />
      </svg>
    );
  }
  if (type === 'flame') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-gold">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    );
  }
  if (type === 'code') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-gold">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-gold">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

/**
 * Achievements section — dedicated showcase of academic rank, hackathon wins, and LeetCode milestones.
 */
export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative py-16 sm:py-24 lg:py-36 overflow-hidden"
      aria-label="Achievements — honors and milestones"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute rounded-full bg-gold/5"
          style={{
            top: '25%',
            right: '15%',
            width: 'clamp(320px, 50vw, 700px)',
            height: 'clamp(240px, 40vh, 550px)',
            filter: 'blur(130px)',
          }}
        />
        <div
          className="absolute rounded-full bg-burgundy/15"
          style={{
            bottom: '15%',
            left: '10%',
            width: 'clamp(280px, 45vw, 600px)',
            height: 'clamp(220px, 35vh, 480px)',
            filter: 'blur(120px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:pl-32 md:pr-8 lg:pl-44 lg:pr-12 xl:pl-48 xl:pr-16">
        <SectionReveal>
          {/* Header */}
          <div className="mb-10 sm:mb-14">
            <AnimatedHeading
              label="05 — Achievements"
              heading={"Honors &\nMilestones"}
            />
            <p className="text-slate text-xs sm:text-sm font-light max-w-2xl -mt-2 sm:-mt-4 leading-relaxed">
              A documented track record of continuous academic leadership, high-intensity hackathon building, and algorithmic problem-solving excellence.
            </p>
          </div>

          {/* ── Key Metrics Ribbon ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14">
            {achievementsStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="
                  group relative flex flex-col justify-between
                  p-4 sm:p-5 rounded-xl
                  bg-surface/80 backdrop-blur-md
                  border border-hairline/80 hover:border-gold/60
                  hover:shadow-[0_8px_24px_rgba(201,164,92,0.18)]
                  transition-all duration-300
                "
              >
                <div className="font-serif text-2xl sm:text-3xl font-bold text-gold tabular-nums leading-none mb-2">
                  <StatCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    delay={i * 120}
                  />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-medium text-cream group-hover:text-gold transition-colors">
                    {stat.label}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-slate font-mono uppercase tracking-wider mt-0.5">
                    {stat.detail}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Featured Bento Grid Showcase ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {achievementsList.map((item, idx) => {
              const isHighlight = item.id === 'dept-topper';
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: idx * 0.12 }}
                  className={`
                    group relative flex flex-col justify-between
                    p-5 sm:p-7 md:p-8 rounded-2xl
                    bg-surface/85 backdrop-blur-lg
                    border transition-all duration-300
                    hover:scale-[1.01] hover:shadow-[0_12px_36px_rgba(0,0,0,0.45)]
                    ${
                      isHighlight
                        ? 'border-gold/50 shadow-[0_0_28px_rgba(201,164,92,0.18)] hover:border-gold'
                        : 'border-hairline hover:border-gold/60'
                    }
                  `}
                >
                  {/* Subtle Corner Accent Glow on Highlight Card */}
                  {isHighlight && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 bg-gold/15 rounded-full blur-2xl"
                    />
                  )}

                  {/* Top Bar: Icon + Category Badge + Ribbon */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-background/90 border border-gold/30 flex items-center justify-center shrink-0 group-hover:border-gold/60 transition-colors shadow-inner">
                          <AchievementIcon type={item.icon} />
                        </div>
                        <div>
                          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-gold font-semibold">
                            {item.category}
                          </span>
                          <div className="text-[10px] sm:text-[11px] text-slate font-mono">
                            {item.period}
                          </div>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider uppercase font-semibold bg-gold/15 border border-gold/40 text-gold whitespace-nowrap">
                        {item.badge}
                      </span>
                    </div>

                    {/* Title & Organization */}
                    <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-cream group-hover:text-gold transition-colors duration-200 mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] font-mono text-gold/80 mb-3 sm:mb-4">
                      {item.organization}
                    </p>

                    {/* Description */}
                    <p className="text-slate text-xs sm:text-sm font-light leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {/* Quick Metric Chips */}
                    <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-lg bg-background/50 border border-hairline/60">
                      {item.metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <div className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-slate">
                            {m.label}
                          </div>
                          <div className="text-[11px] sm:text-xs font-semibold text-cream mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="flex flex-col gap-2 mb-4">
                      {item.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-cream/90 font-light leading-snug">
                          <span className="text-gold font-bold shrink-0 mt-0.5">✦</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Optional External Link (e.g. LeetCode) */}
                  {item.link && (
                    <div className="pt-4 border-t border-hairline/60 mt-2">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex items-center gap-1.5
                          text-xs font-mono tracking-wider uppercase text-gold hover:text-cream
                          transition-colors duration-200
                        "
                      >
                        {item.linkText}
                      </a>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
