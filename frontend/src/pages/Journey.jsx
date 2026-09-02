import { useState } from 'react';
import SectionReveal from '../components/common/SectionReveal';
import AnimatedHeading from '../components/common/AnimatedHeading';
import TimelineCard from '../components/journey/TimelineCard';
import VideoModal from '../components/common/VideoModal';
import { journeyData } from '../data/journey';

/**
 * Journey page — responsive vertical timeline of education, internships, and milestones.
 * Mobile (< md): Single column with left-aligned continuous line and natural stacking.
 * Desktop (md+): Balanced alternating two-column layout with centered timeline connector.
 */
export default function Journey() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

  return (
    <section
      id="journey"
      className="relative py-16 sm:py-24 lg:py-36"
      aria-label="Journey — education and experience"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:pl-32 md:pr-8 lg:pl-44 lg:pr-12 xl:pl-48 xl:pr-16">
        <SectionReveal>
          <AnimatedHeading
            label="02 — Journey"
            heading={"The Path\nSo Far"}
            onPlayClick={() => setVideoOpen(true)}
          />

          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical connector line (left-aligned on mobile, centered on desktop) */}
            <div
              aria-hidden="true"
              className="absolute left-3 sm:left-4 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-px bg-hairline"
            />

            <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
              {journeyData.map((entry, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={entry.id} className="relative">
                    {/* Timeline Node Dot (mobile) */}
                    <div
                      aria-hidden="true"
                      className="md:hidden absolute left-3 sm:left-4 top-6 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-surface border border-gold shadow-[0_0_8px_rgba(201,164,92,0.6)] z-10"
                    />

                    {/* Timeline Node Dot (desktop) */}
                    <div
                      aria-hidden="true"
                      className="hidden md:block absolute left-1/2 top-7 -translate-x-1/2 w-3 h-3 rounded-full bg-surface border border-gold shadow-[0_0_10px_rgba(201,164,92,0.8)] z-10"
                    />

                    {/* Mobile: Full-width stacked card with left padding */}
                    <div className="md:hidden pl-8 sm:pl-10">
                      <TimelineCard {...entry} />
                    </div>

                    {/* Desktop: Alternating 2-column grid */}
                    <div className="hidden md:grid md:grid-cols-2 items-center">
                      {isEven ? (
                        <>
                          {/* Card on Left */}
                          <div className="pr-10 lg:pr-14">
                            <TimelineCard {...entry} />
                          </div>
                          {/* Empty Right Column */}
                          <div aria-hidden="true" />
                        </>
                      ) : (
                        <>
                          {/* Empty Left Column */}
                          <div aria-hidden="true" />
                          {/* Card on Right */}
                          <div className="pl-10 lg:pl-14">
                            <TimelineCard {...entry} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </div>

      {/* Journey Video Modal */}
      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoSrc={videoSrc}
      />
    </section>
  );
}
