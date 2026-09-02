import { useTilt } from '../../hooks/useTilt';

function IconGitHub() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
      fill="currentColor" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}

function IconExternalLink() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/**
 * ProjectCard — responsive project card with 3D tilt.
 */
export default function ProjectCard({
  title = '',
  tagline = '',
  description = '',
  tags = [],
  github = null,
  live = null,
}) {
  const tilt = useTilt({ max: 8, perspective: 900, scale: 1.015 });
  const isEmpty = !title && !description;

  return (
    <article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onMouseEnter={tilt.onMouseEnter}
      className="
        group flex flex-col h-full min-h-[300px] bg-surface border border-hairline rounded-sm p-6 sm:p-7 lg:p-8
        transition-shadow duration-[250ms] ease-out
        hover:shadow-[0_12px_40px_0_rgba(201,162,75,0.16)]
        hover:border-gold/40
      "
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      {/* Top accent line */}
      <div
        aria-hidden="true"
        className="h-px w-10 bg-gold/30 mb-5 sm:mb-6 transition-all duration-300 group-hover:w-full group-hover:bg-gold/20"
      />

      {/* Title */}
      <h3 className="font-serif text-xl sm:text-2xl text-cream leading-tight mb-2 min-h-[1.75rem]">
        {title || <span className="opacity-30 italic font-sans text-lg">Project Title</span>}
      </h3>

      {/* Tagline */}
      <p className="text-[10px] sm:text-[11px] tracking-wide text-gold/80 uppercase font-medium mb-3 sm:mb-4 min-h-[1rem]">
        {tagline || (isEmpty ? <span className="opacity-30 text-slate">Tagline / Domain</span> : '')}
      </p>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate leading-relaxed flex-1 mb-5 sm:mb-6">
        {description || (isEmpty ? <span className="opacity-30 italic">Project description will be updated here.</span> : '')}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
        {tags && tags.length > 0 ? (
          tags.map(tag => (
            <span
              key={tag}
              className="text-[9px] sm:text-[10px] font-medium tracking-wide text-slate border border-hairline px-2.5 py-1 rounded-sm group-hover:border-gold/30 transition-colors duration-250"
            >
              {tag}
            </span>
          ))
        ) : (
          isEmpty && (
            <span className="text-[9px] sm:text-[10px] font-medium tracking-wide text-slate/30 border border-hairline/40 px-2.5 py-1 rounded-sm">
              Tags
            </span>
          )
        )}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 mt-auto pt-2 border-t border-hairline/40">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-medium tracking-widest uppercase text-slate hover:text-gold transition-colors py-1"
            aria-label={`View ${title || 'project'} on GitHub`}
          >
            <IconGitHub />
            GitHub
          </a>
        )}
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-medium tracking-widest uppercase text-slate hover:text-gold transition-colors py-1"
            aria-label={`View ${title || 'project'} live`}
          >
            <IconExternalLink />
            Live
          </a>
        )}
      </div>
    </article>
  );
}
