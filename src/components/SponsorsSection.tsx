import { ArrowRight } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventData';
import { SnowCap } from './SnowCap';

export function SponsorsSection() {
  const { sponsors } = EVENT_CONFIG;

  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="sponsors" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#B9DFFF]">
            {sponsors.eyebrow}
          </p>
          <h2 className="font-display mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            {sponsors.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#B5C0D6]">
            {sponsors.subtitle}
          </p>
          <p className="mt-4 text-xs sm:text-sm text-[#B9DFFF]/80">
            {sponsors.placeholderNotice}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {sponsors.tiers.map((tier) => {
            const isPlatinum = tier.id === 'platinum';
            const isGold = tier.id === 'gold';

            const tierAccent = isPlatinum
              ? 'border-[#E2EEFF]/30'
              : isGold
              ? 'border-[#FFB36B]/30'
              : 'border-[#B9DFFF]/20';

            const titleColor = isPlatinum
              ? 'text-[#F1F6FF]'
              : isGold
              ? 'text-[#FFB36B]'
              : 'text-[#B9DFFF]';

            const gridCols = isPlatinum
              ? 'grid-cols-1 md:grid-cols-2'
              : isGold
              ? 'grid-cols-1 sm:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

            const slotHeight = isPlatinum ? 'min-h-[116px]' : isGold ? 'min-h-[98px]' : 'min-h-[84px]';

            return (
              <div
                key={tier.id}
                className={`frosted-panel rounded-3xl p-6 sm:p-8 ${tierAccent}`}
              >
                {isPlatinum && <SnowCap align="left" width="lg" />}
                <div className="relative z-20 mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-[#B9DFFF]/10 pb-4">
                  <div>
                    <h3 className={`font-display text-lg font-bold tracking-wide uppercase ${titleColor}`}>
                      {tier.tierName}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B5C0D6]">{tier.subtitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="inline-flex w-fit cursor-pointer items-center gap-1.5 text-xs font-medium text-[#B9DFFF] hover:text-white transition-colors mt-2 sm:mt-0"
                  >
                    <span>Inquire about {tier.id} tier</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>

                <div className={`grid gap-4 ${gridCols}`}>
                  {tier.slots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`flex items-center justify-center rounded-2xl border border-dashed border-[#B9DFFF]/22 bg-[#10172B]/45 px-5 py-4 text-center transition-colors duration-200 hover:border-[#B9DFFF]/45 hover:bg-[#10172B]/70 ${slotHeight}`}
                    >
                      {slot.logoUrl ? (
                        <img
                          src={slot.logoUrl}
                          alt={slot.placeholderLabel}
                          referrerPolicy="no-referrer"
                          className="max-h-12 w-auto object-contain"
                        />
                      ) : (
                        <span className="font-display text-sm font-semibold tracking-wider text-[#B5C0D6]">
                          {slot.placeholderLabel}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
