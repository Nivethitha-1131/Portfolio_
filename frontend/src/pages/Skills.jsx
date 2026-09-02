import SectionReveal from '../components/common/SectionReveal';
import AnimatedHeading from '../components/common/AnimatedHeading';
import SkillPill from '../components/skills/SkillPill';
import { skillsData } from '../data/skills';

/**
 * Skills page — grouped pill/tag grid by category.
 */
export default function Skills() {
  const categories = Object.entries(skillsData);

  return (
    <section
      id="skills"
      className="relative py-16 sm:py-24 lg:py-36"
      aria-label="Skills — technical capabilities"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionReveal>
          <AnimatedHeading label="04 — Skills" heading={"Technical\nCapabilities"} />

          {/* Skill groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-10 lg:gap-16">
            {categories.map(([category, skills]) => (
              <div key={category}>
                {/* Category label */}
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-5">
                  <span className="text-[9px] sm:text-[10px] font-medium tracking-widest uppercase text-gold whitespace-nowrap">
                    {category}
                  </span>
                  <div className="flex-1 h-px bg-hairline" />
                </div>

                {/* Pill grid */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
                  {skills.map(skill => (
                    <SkillPill key={skill.label} label={skill.label} icon={skill.icon} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
