import SectionReveal from '../components/common/SectionReveal';
import AnimatedHeading from '../components/common/AnimatedHeading';
import LogoLoop from '../components/skills/LogoLoop';

/**
 * Skills section — Continuous Interactive Logo Loop showcasing technical capabilities.
 */
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
      aria-label="Skills — technical capabilities logo loop"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute rounded-full bg-gold/5"
          style={{
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(300px, 60vw, 800px)',
            height: 'clamp(200px, 40vh, 500px)',
            filter: 'blur(120px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:pl-32 md:pr-8 lg:pl-44 lg:pr-12 xl:pl-48 xl:pr-16">
        <SectionReveal>
          <div className="mb-4 sm:mb-6">
            <AnimatedHeading
              label="04 — Skills"
              heading={"Technical\nCapabilities"}
            />
            <p className="text-slate text-xs sm:text-sm font-light max-w-xl -mt-2 sm:-mt-4">
              A comprehensive, evolving stack of intelligence frameworks, modern languages, and cloud infrastructure engineered for production.
            </p>
          </div>

          {/* ── Continuous Infinite Logo Loop strictly inside this container ratio ── */}
          <div className="relative w-full overflow-hidden">
            <LogoLoop />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
