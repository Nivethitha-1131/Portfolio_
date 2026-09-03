import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionReveal from '../components/common/SectionReveal';
import AnimatedHeading from '../components/common/AnimatedHeading';
import { achievementsStats, achievementsList } from '../data/achievements';

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
 * Interactive Modal showing detailed breakdown when user clicks an achievement card.
 * Streamlined to be neat, clean, compact, and photo-focused.
 */
function AchievementDetailModal({ item, onClose }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [activeLightbox, setActiveLightbox] = useState(false);

  const images = item.images || [];
  const hasImages = images.length > 0;
  const currentImg = images[photoIndex] || null;

  const nextPhoto = (e) => {
    if (e) e.stopPropagation();
    if (images.length > 1) {
      setPhotoIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevPhoto = (e) => {
    if (e) e.stopPropagation();
    if (images.length > 1) {
      setPhotoIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  useEffect(() => {
    if (!item) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeLightbox) {
          setActiveLightbox(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        nextPhoto();
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        prevPhoto();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose, activeLightbox, images.length]);

  if (!item) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="achievement-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="
            relative w-full max-w-lg max-h-[92vh] overflow-y-auto no-scrollbar
            bg-surface/98 border border-gold/40 rounded-2xl p-4 sm:p-6
            shadow-[0_24px_64px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col gap-3.5
          "
        >
          {/* Header Row: Clean, Minimal, Uncluttered */}
          <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-hairline/60">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-semibold">
                  {item.category}
                </span>
                <span className="text-slate/40">•</span>
                <span className="text-[10px] font-mono text-slate">
                  {item.period}
                </span>
              </div>
              <h3
                id="achievement-modal-title"
                className="font-serif text-lg sm:text-xl font-semibold text-cream leading-tight"
              >
                {item.title}
              </h3>
              <p className="text-xs font-mono text-gold/80 mt-0.5">
                {item.organization}
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="
                w-8 h-8 rounded-full border border-hairline hover:border-gold/80
                flex items-center justify-center text-slate hover:text-gold
                bg-surface/80 transition-colors duration-200 cursor-pointer shrink-0 mt-0.5
              "
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Semester GPAs: Compact & Clean Ribbon */}
          {item.semesterGPAs && (
            <div className="grid grid-cols-4 gap-1.5 py-1.5 px-3 rounded-lg bg-background/50 border border-hairline/70">
              {item.semesterGPAs.map((s, idx) => (
                <div key={s.sem} className={`text-center ${idx !== 0 ? 'border-l border-hairline/50' : ''}`}>
                  <div className="text-[9px] font-mono text-slate uppercase tracking-wider">
                    {s.sem}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gold font-mono tracking-tight">
                    {s.gpa}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cards without images: render clean description & link */}
          {!hasImages && (
            <div className="py-2">
              <p className="text-slate text-xs sm:text-sm font-light leading-relaxed mb-4">
                {item.description}
              </p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-gold hover:text-cream transition-colors duration-200"
                >
                  {item.linkText}
                </a>
              )}
            </div>
          )}

          {/* Cards with images: Photo Showcase */}
          {hasImages && currentImg && (
            <>
              {/* Photo Display Frame */}
              <div className="relative w-full h-[400px] sm:h-[460px] rounded-xl overflow-hidden border border-hairline/80 bg-black/60 shadow-xl flex items-center justify-center group/photo select-none">
                {/* Ambient Backdrop */}
                <div
                  className="absolute inset-0 bg-cover bg-center blur-2xl opacity-25 scale-110 pointer-events-none transition-all duration-700"
                  style={{ backgroundImage: `url(${currentImg.src})` }}
                />

                {/* Sharp Foreground Image */}
                <div
                  className="relative z-10 w-full h-full flex items-center justify-center p-1.5 cursor-zoom-in overflow-hidden"
                  onClick={() => setActiveLightbox(true)}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={photoIndex}
                      src={currentImg.src}
                      alt={currentImg.alt}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="max-h-full max-w-full w-auto h-full object-contain rounded-lg drop-shadow-xl"
                      loading="lazy"
                    />
                  </AnimatePresence>
                </div>

                {/* Minimalist Glass Prev/Next Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevPhoto}
                      aria-label="Previous photo"
                      className="
                        absolute left-2.5 z-20 w-8 h-8 rounded-full
                        bg-black/60 hover:bg-gold backdrop-blur-md
                        border border-white/20 hover:border-gold text-white hover:text-background
                        flex items-center justify-center transition-all duration-200
                        shadow-lg cursor-pointer hover:scale-105 active:scale-95
                      "
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={nextPhoto}
                      aria-label="Next photo"
                      className="
                        absolute right-2.5 z-20 w-8 h-8 rounded-full
                        bg-black/60 hover:bg-gold backdrop-blur-md
                        border border-white/20 hover:border-gold text-white hover:text-background
                        flex items-center justify-center transition-all duration-200
                        shadow-lg cursor-pointer hover:scale-105 active:scale-95
                      "
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Subtle zoom hint */}
                <div className="absolute bottom-2 right-2.5 z-20 pointer-events-none opacity-60 group-hover/photo:opacity-100 transition-opacity">
                  <span className="text-[9px] font-mono text-cream/80 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                    Zoom ⤢
                  </span>
                </div>
              </div>

              {/* Neat & Clean Bottom Bar: Caption + Compact Switcher */}
              <div className="flex items-center justify-between gap-2.5 pt-0.5 flex-wrap">
                <div className="flex items-center gap-2 min-w-0">
                  <p className="text-xs font-medium text-cream truncate">
                    {currentImg.caption}
                  </p>
                  {currentImg.link && (
                    <a
                      href={currentImg.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-gold/80 hover:text-cream transition-colors flex items-center gap-0.5 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Post</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPhotoIndex(idx)}
                        className={`
                          px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer
                          ${
                            photoIndex === idx
                              ? 'bg-gold text-background font-semibold shadow-sm'
                              : 'bg-surface/80 text-slate hover:text-cream border border-hairline'
                          }
                        `}
                      >
                        {img.label || (idx + 1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* ── Full-Screen Lightbox Image Preview with Next/Prev ── */}
      <AnimatePresence>
        {activeLightbox && currentImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveLightbox(false)}
            className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[92vh] flex flex-col items-center select-none"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveLightbox(false)}
                aria-label="Close full size view"
                className="
                  absolute -top-11 right-0 sm:-right-2 w-9 h-9 rounded-full
                  border border-white/30 hover:border-gold text-white hover:text-gold
                  flex items-center justify-center bg-black/60 transition-colors duration-200 cursor-pointer
                "
              >
                ✕
              </button>

              {/* Lightbox Image with Slide Animation */}
              <div className="relative flex items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={photoIndex}
                    src={currentImg.src}
                    alt={currentImg.alt}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl border border-gold/40"
                  />
                </AnimatePresence>

                {/* Lightbox Nav Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevPhoto}
                      aria-label="Previous photo"
                      className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-gold border border-gold/50 text-gold hover:text-background flex items-center justify-center transition-all shadow-xl cursor-pointer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={nextPhoto}
                      aria-label="Next photo"
                      className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-gold border border-gold/50 text-gold hover:text-background flex items-center justify-center transition-all shadow-xl cursor-pointer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Caption & Counter in Lightbox */}
              <div className="flex items-center gap-3 mt-3 px-4 py-1.5 rounded-full bg-black/60 border border-hairline/60">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gold font-semibold">
                  {photoIndex + 1} / {images.length}
                </span>
                <span className="text-white/40">•</span>
                <p className="text-cream text-xs sm:text-sm font-medium tracking-wide text-center">
                  {currentImg.caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Achievements section — dedicated showcase of key metrics and milestones.
 */
export default function Achievements() {
  const [selectedId, setSelectedId] = useState(null);

  const selectedAchievement = achievementsList.find((item) => item.id === selectedId) || null;

  return (
    <section
      id="achievements"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
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

          {/* ── Key Metrics Small Cards Ribbon (Interactive on Click) ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {achievementsStats.map((stat, i) => {
              const isCurrent = selectedId === stat.id;
              const hasDirectLink = Boolean(stat.directLink);

              const handleCardClick = () => {
                if (hasDirectLink) {
                  window.open(stat.directLink, '_blank', 'noopener,noreferrer');
                } else {
                  setSelectedId(stat.id);
                }
              };

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  role={hasDirectLink ? 'link' : 'button'}
                  tabIndex={0}
                  onClick={handleCardClick}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick();
                    }
                  }}
                  aria-label={
                    hasDirectLink
                      ? `${stat.label}: ${stat.target}${stat.suffix}. Open profile on LeetCode.`
                      : `${stat.label}: ${stat.target}${stat.suffix}. Click to inspect details.`
                  }
                  className={`
                    group relative flex flex-col justify-between
                    p-5 sm:p-6 rounded-2xl cursor-pointer select-none
                    bg-surface/80 backdrop-blur-md
                    border transition-all duration-300
                    hover:scale-[1.03] active:scale-[0.98]
                    ${
                      isCurrent
                        ? 'border-gold shadow-[0_0_24px_rgba(201,164,92,0.35)]'
                        : 'border-hairline/80 hover:border-gold/70 hover:shadow-[0_10px_28px_rgba(201,164,92,0.22)]'
                    }
                  `}
                >
                  {/* Top Row: Counter + Subtle "Click ↗" prompt */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gold tabular-nums leading-none">
                      <StatCounter
                        target={stat.target}
                        suffix={stat.suffix}
                        delay={i * 120}
                      />
                    </div>
                    <span className="text-[9px] font-mono tracking-wider uppercase text-gold/60 group-hover:text-gold flex items-center gap-1 transition-colors">
                      <span>Click</span>
                      <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                        ↗
                      </span>
                    </span>
                  </div>

                  <div>
                    <div className="text-sm sm:text-base font-medium text-cream group-hover:text-gold transition-colors">
                      {stat.label}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate font-mono uppercase tracking-wider mt-1">
                      {stat.detail}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </SectionReveal>
      </div>

      {/* ── Achievement Detail Modal ── */}
      <AnimatePresence>
        {selectedAchievement && (
          <AchievementDetailModal
            item={selectedAchievement}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
