import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventData';
import { SnowCap } from './SnowCap';

interface PrizesSectionProps {
  onOpenProposal: () => void;
}

export function PrizesSection({ onOpenProposal }: PrizesSectionProps) {
  const { prizes } = EVENT_CONFIG;

  return (
    <section id="prizes" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#E58BFF]">
            {prizes.eyebrow}
          </p>
          <h2 className="font-display mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            {prizes.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#B5C0D6]">
            {prizes.subtitle}
          </p>
          <p className="mt-4 text-xs sm:text-sm text-[#B9DFFF]/80">
            {prizes.sampleNotice}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
          {prizes.tiers.map((tier) => {
            const isGrand = Boolean(tier.featured);

            const accentColor =
              tier.accent === 'amber'
                ? 'text-[#FFB36B]'
                : tier.accent === 'silver'
                ? 'text-[#E2E8F0]'
                : 'text-[#B9DFFF]';

            const panelAccentClasses = isGrand
              ? 'border-[#FFB36B]/40 bg-gradient-to-b from-[#7B2FFF]/20 via-[#10172B]/70 to-[#FFB36B]/10 shadow-[0_24px_64px_rgba(6,6,15,0.7),0_0_48px_rgba(255,179,107,0.14)] lg:-my-3'
              : 'frost-rim-bottom';

            return (
              <article
                key={tier.id}
                className={`frosted-panel frosted-panel-interactive rounded-3xl p-8 flex flex-col justify-between ${panelAccentClasses}`}
              >
                {isGrand && <SnowCap align="right" width="md" />}
                <div className="relative z-20">
                  <p className={`text-xs font-semibold tracking-[0.14em] uppercase mb-3 ${accentColor}`}>
                    {tier.rankLabel}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                    {tier.title}
                  </h3>
                  <div
                    className={`font-display font-mono-tabular text-2xl sm:text-3xl font-extrabold mb-3 ${
                      isGrand
                        ? 'bg-gradient-to-r from-[#FFFFFF] via-[#FFB36B] to-[#E58BFF] bg-clip-text text-transparent'
                        : 'text-[#B9DFFF]'
                    }`}
                  >
                    {tier.amountPlaceholder}
                  </div>
                  <p className="text-sm leading-relaxed text-[#B5C0D6] mb-6">
                    {tier.summary}
                  </p>

                  <div className="border-t border-[#B9DFFF]/12 pt-5 mb-8">
                    <ul className="space-y-3 text-sm text-[#E2E9F6]">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className={`h-4 w-4 mt-0.5 shrink-0 ${
                              isGrand ? 'text-[#FFB36B]' : 'text-[#00E5CC]'
                            }`}
                            aria-hidden="true"
                          />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {EVENT_CONFIG.externalProposalFormUrl ? (
                  <a
                    href={EVENT_CONFIG.externalProposalFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                      isGrand
                        ? 'bg-gradient-to-r from-[#7B2FFF] via-[#9C4DFF] to-[#FFB36B] text-white shadow-[0_8px_28px_rgba(255,179,107,0.25)] hover:-translate-y-0.5'
                        : 'border border-[#B9DFFF]/25 bg-[#10172B]/65 text-white hover:border-[#B9DFFF]/50 hover:bg-[#10172B]/90'
                    }`}
                  >
                    <span>{EVENT_CONFIG.submitProposalLabel}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenProposal}
                    className={`inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                      isGrand
                        ? 'bg-gradient-to-r from-[#7B2FFF] via-[#9C4DFF] to-[#FFB36B] text-white shadow-[0_8px_28px_rgba(255,179,107,0.25)] hover:-translate-y-0.5'
                        : 'border border-[#B9DFFF]/25 bg-[#10172B]/65 text-white hover:border-[#B9DFFF]/50 hover:bg-[#10172B]/90'
                    }`}
                  >
                    <span>{EVENT_CONFIG.submitProposalLabel}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
