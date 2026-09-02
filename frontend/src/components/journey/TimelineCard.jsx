import { useTilt } from '../../hooks/useTilt';

/**
 * TimelineCard — responsive timeline card.
 * Left accent bar in gold; hover: 3-D tilt + gold border glow.
 * Accessible, clear typography across mobile and desktop.
 */
export default function TimelineCard({
  type,
  period,
  title,
  organization,
  location,
  description,
}) {
  const tilt = useTilt({ max: 8, perspective: 900, scale: 1.015 });

  const typeLabelMap = {
    education:  'Education',
    internship: 'Internship',
    milestone:  'Milestone',
  };

  return (
    <article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onMouseEnter={tilt.onMouseEnter}
      className="
        group relative bg-surface border border-hairline rounded-sm
        p-4 sm:p-6 lg:p-7
        transition-all duration-[250ms] ease-out
        hover:shadow-[0_8px_32px_0_rgba(201,162,75,0.14)]
        hover:border-gold/40
      "
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      {/* Left gold accent bar */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-[2.5px] sm:w-[3px] bg-gold/40 rounded-l-sm transition-all duration-250 group-hover:bg-gold/80"
      />

      {/* Type badge + period */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2.5 sm:mb-3">
        <span className="text-[9px] sm:text-[10px] font-medium tracking-widest uppercase text-gold border border-gold/40 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-sm">
          {typeLabelMap[type] ?? type}
        </span>
        <span className="text-[10px] sm:text-xs tracking-wide text-slate">{period}</span>
      </div>

      {/* Location */}
      {location && (
        <p className="text-[11px] sm:text-xs text-slate/90 mb-2 sm:mb-2.5">{location}</p>
      )}

      {/* Title & org */}
      <h3 className="font-serif text-base sm:text-lg lg:text-xl text-cream leading-snug mb-1">{title}</h3>
      <p className="text-xs sm:text-[13px] font-medium tracking-wide text-gold/85 uppercase mb-3 sm:mb-4">
        {organization}
      </p>

      {/* Gold hairline divider */}
      <div className="gold-divider mb-3 sm:mb-4" />

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate leading-relaxed">{description}</p>
    </article>
  );
}
