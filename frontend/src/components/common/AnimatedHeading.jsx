import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import {
  EASE_OUT,
  letterContainer,
  letterVariant,
  labelFade,
} from '../../utils/motionVariants';

/**
 * AnimatedHeading — scroll-triggered section heading with:
 *  - gold label  → fade/slide-up
 *  - h2 text     → letter-by-letter reveal
 *  - optional play button positioned directly to the right of "Far"
 *  - gold divider → slide in from left
 *
 * @param {{
 *   label:        string,
 *   heading:      string,
 *   onPlayClick?: () => void,
 *   className?:   string
 * }} props
 */
export default function AnimatedHeading({ label, heading, onPlayClick, className = '' }) {
  const { ref, inView } = useScrollReveal();

  const lines = heading.split('\n');

  return (
    <div ref={ref} className={`mb-10 sm:mb-14 lg:mb-16 ${className}`}>
      {/* Gold label */}
      <motion.p
        className="text-[9px] sm:text-[10px] tracking-widest uppercase text-gold mb-3 sm:mb-4 font-medium"
        variants={labelFade(0)}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {label}
      </motion.p>

      {/* Responsive Section Heading */}
      <h2
        className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.15] mb-4"
        aria-label={heading.replace('\n', ' ')}
      >
        {lines.map((line, li) => {
          const isLastLine = li === lines.length - 1;
          return (
            <span key={li} className="block">
              <motion.span
                className="inline-flex items-center flex-wrap"
                aria-hidden="true"
                variants={letterContainer(li * 0.12)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <span className="inline-flex items-center">
                  {line.split('').map((char, ci) => (
                    <motion.span
                      key={ci}
                      variants={letterVariant}
                      style={{
                        display: 'inline-block',
                        whiteSpace: char === ' ' ? 'pre' : 'normal',
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>

                {/* Circular Play Button */}
                {isLastLine && onPlayClick && (
                  <button
                    type="button"
                    onClick={onPlayClick}
                    aria-label="Play journey video"
                    className="inline-flex items-center justify-center ml-2.5 sm:ml-4 rounded-full border border-gold/80 text-gold hover:bg-gold hover:text-background hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(201,164,92,0.3)] group cursor-pointer shrink-0"
                    style={{
                      width: '0.68em',
                      height: '0.68em',
                      transform: 'translateY(0.12em)',
                    }}
                    title="Watch Journey Video"
                  >
                    <svg
                      width="42%"
                      height="42%"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-[0.08em] group-hover:scale-110 transition-transform"
                    >
                      <polygon points="6,4 18,12 6,20" />
                    </svg>
                  </button>
                )}
              </motion.span>
            </span>
          );
        })}
      </h2>

      {/* Divider */}
      <motion.div
        className="gold-divider"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}
