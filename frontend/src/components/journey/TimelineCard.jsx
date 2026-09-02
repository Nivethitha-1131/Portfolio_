import { useTilt } from '../../hooks/useTilt';

/**
 * TimelineCard — responsive timeline card.
 * Left accent bar in gold; hover: 3-D tilt + gold border glow.
 * Scaled-down typography for narrow mobile columns.
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
        p-3 sm:p-5 lg:p-7
        transition-shadow duration-[250ms] ease-out
        hover:shadow-[0_8px_32px_0_rgba(201,162,75,0.14)]
        hover:border-gold/40
      "
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      {/* Left gold accent bar */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-[2px] sm:w-[3px] bg-gold/30 rounded-l-sm transition-all duration-250 group-hover:bg-gold/70"
      />

      {/* Type badge + period */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 lg:gap-3 mb-2 sm:mb-3 lg:mb-4">
        <span className="text-[6px] sm:text-[8px] lg:text-[9px] font-medium tracking-widest uppercase text-gold border border-gold/40 px-1.5 py-0.5 sm:px-2 sm:py-0.5 lg:px-2.5 lg:py-1 rounded-sm">
          {typeLabelMap[type] ?? type}
        </span>
        <span className="text-[7px] sm:text-[10px] lg:text-[11px] tracking-wide text-slate">{period}</span>
      </div>

      {/* Location (separate row for better wrapping) */}
      {location && (
        <p className="text-[7px] sm:text-[10px] lg:text-[11px] text-slate mb-2 sm:mb-3">{location}</p>
      )}

      {/* Title & org */}
      <h3 className="font-serif text-sm sm:text-lg lg:text-xl text-cream leading-snug mb-0.5 sm:mb-1">{title}</h3>
      <p className="text-[8px] sm:text-[11px] lg:text-[12px] font-medium tracking-wide text-gold/80 uppercase mb-2 sm:mb-3 lg:mb-4">
        {organization}
      </p>

      {/* Gold hairline divider */}
      <div className="gold-divider mb-2 sm:mb-3 lg:mb-4" />

      {/* Description */}
      <p className="text-[9px] sm:text-xs lg:text-sm text-slate leading-relaxed">{description}</p>
    </article>
  );
}
