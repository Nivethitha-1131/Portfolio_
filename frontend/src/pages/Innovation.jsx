import SectionReveal from '../components/common/SectionReveal';
import AnimatedHeading from '../components/common/AnimatedHeading';
import ProjectCard from '../components/innovation/ProjectCard';
import { projectsData } from '../data/projects';

/**
 * Innovation page — project showcase grid.
 */
export default function Innovation() {
  return (
    <section
      id="innovation"
      className="relative py-16 sm:py-24 lg:py-36 bg-surface/30"
      aria-label="Innovation — project showcase"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:pl-24 md:pr-8 lg:pl-32 lg:pr-12 xl:pl-36 xl:pr-16">
        <SectionReveal>
          <AnimatedHeading label="03 — Innovation" heading={"Selected\nWork"} />

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {projectsData.map(project => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
