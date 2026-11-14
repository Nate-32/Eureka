import { Compass, Layers, Sparkles } from 'lucide-react';
import { EVENT_CONFIG, type HighlightItem } from '../config/eventData';
import { SnowCap } from './SnowCap';

function HighlightIcon({ icon }: { icon: HighlightItem['icon'] }) {
  switch (icon) {
    case 'sparkles':
      return <Sparkles className="h-5 w-5 text-[#FFB36B]" aria-hidden="true" />;
    case 'layers':
      return <Layers className="h-5 w-5 text-[#00E5CC]" aria-hidden="true" />;
    case 'compass':
      return <Compass className="h-5 w-5 text-[#B9DFFF]" aria-hidden="true" />;
  }
}

export function AboutSection() {
  const { about } = EVENT_CONFIG;

  return (
    <section id="about" className="relative py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="frosted-panel relative rounded-3xl p-7 sm:p-10 lg:p-14">
          <SnowCap align="left" width="lg" />
          <div className="relative z-20 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-center">
            {/* Left Column: Core Philosophy */}
            <div className="lg:col-span-7">
              <p className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#00E5CC]">
                {about.eyebrow}
              </p>
              <h2 className="font-display mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
                {about.heading}
              </h2>
              <p className="mb-5 text-base sm:text-lg leading-relaxed text-[#E2E9F6]">
                {about.leadParagraph}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#B5C0D6]">
                {about.secondaryParagraph}
              </p>
            </div>

            {/* Right Column: Three Compact Frosted Highlight Panels */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {about.highlights.map((item) => (
                <div
                  key={item.id}
                  className="frosted-panel frosted-panel-interactive rounded-2xl p-5 flex items-start gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#B9DFFF]/20 bg-[#10172B]/80">
                    <HighlightIcon icon={item.icon} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#B5C0D6]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
