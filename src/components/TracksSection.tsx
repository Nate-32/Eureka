import { type MouseEvent } from 'react';
import { Atom, BrainCircuit, Dna, Globe } from 'lucide-react';
import { EVENT_CONFIG, type TrackItem } from '../config/eventData';
import { SnowCap } from './SnowCap';

function TrackIcon({ icon }: { icon: TrackItem['icon'] }) {
  switch (icon) {
    case 'atom':
      return <Atom className="h-6 w-6 text-[#B9DFFF]" aria-hidden="true" />;
    case 'brain-circuit':
      return <BrainCircuit className="h-6 w-6 text-[#E58BFF]" aria-hidden="true" />;
    case 'dna':
      return <Dna className="h-6 w-6 text-[#00E5CC]" aria-hidden="true" />;
    case 'globe':
      return <Globe className="h-6 w-6 text-[#FFB36B]" aria-hidden="true" />;
  }
}

export function TracksSection() {
  const { tracks } = EVENT_CONFIG;

  const handlePointerMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="tracks" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#B9DFFF]">
            {tracks.eyebrow}
          </p>
          <h2 className="font-display mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            {tracks.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#B5C0D6]">
            {tracks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tracks.items.map((track, idx) => (
            <article
              key={track.id}
              onMouseMove={handlePointerMove}
              className={`frosted-panel frosted-panel-interactive frost-spotlight rounded-2xl p-7 flex flex-col justify-between ${
                idx === 3 ? 'frost-rim-bottom' : ''
              }`}
            >
              {idx === 0 && <SnowCap align="left" width="sm" />}
              {idx === 2 && <SnowCap align="right" width="sm" />}
              <div className="relative z-20">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[#B9DFFF]/25 bg-[#10172B]/80 shadow-[0_0_20px_rgba(123,47,255,0.16)]">
                  <TrackIcon icon={track.icon} />
                </div>

                <p className="mb-2 text-xs font-medium text-[#B9DFFF]/80">
                  {track.focusArea}
                </p>
                <h3 className="font-display mb-3 text-xl font-bold text-white">
                  {track.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#B5C0D6]">
                  {track.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
