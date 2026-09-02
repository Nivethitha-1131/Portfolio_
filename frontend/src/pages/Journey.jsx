import { useState } from 'react';
import SectionReveal from '../components/common/SectionReveal';
import AnimatedHeading from '../components/common/AnimatedHeading';
import TimelineCard from '../components/journey/TimelineCard';
import VideoModal from '../components/common/VideoModal';
import { journeyData } from '../data/journey';

/**
 * Journey page — vertical timeline of education, internships, and milestones.
 */
export default function Journey() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

  return (
    <section
      id="journey"
      className="relative py-20 sm:py-28 lg:py-36"
      aria-label="Journey — education and experience"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionReveal>
          <AnimatedHeading
            label="02 — Journey"
            heading={"The Path\nSo Far"}
            onPlayClick={() => setVideoOpen(true)}
          />

          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical connector line (always visible, centered) */}
            <div
              aria-hidden="true"
              className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-hairline"
            />

            <div className="flex flex-col gap-6 sm:gap-8">
              {journeyData.map((entry, idx) => (
                <div
                  key={entry.id}
                  className={`grid grid-cols-2 gap-4 sm:gap-8 lg:gap-12 ${
                    idx % 2 === 0 ? '' : '[direction:rtl]'
                  }`}
                >
                  {/* Card in the correct column */}
                  <div className={idx % 2 === 0 ? 'pr-4 sm:pr-8 lg:pr-12' : 'pl-4 sm:pl-8 lg:pl-12 [direction:ltr]'}>
                    <TimelineCard {...entry} />
                  </div>

                  {/* Spacer column */}
                  <div />
                </div>
              ))}
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
