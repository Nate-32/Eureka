import { ArrowUpRight } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventData';
import { SnowCap } from './SnowCap';

interface FinalCtaSectionProps {
  onOpenProposal: () => void;
}

export function FinalCtaSection({ onOpenProposal }: FinalCtaSectionProps) {
  const { finalCta } = EVENT_CONFIG;

  return (
    <section id="proposal" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative rounded-3xl">
          {/* Soft aurora backdrop glow behind the frosted centerpiece */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_20%_30%,rgba(123,47,255,0.32),transparent_58%),radial-gradient(ellipse_at_80%_40%,rgba(229,139,255,0.26),transparent_58%),radial-gradient(ellipse_at_50%_90%,rgba(255,179,107,0.16),transparent_58%)] blur-2xl"
          />

          <div className="frosted-panel frost-rim-bottom relative rounded-3xl px-7 py-14 sm:px-14 sm:py-20 text-center">
            <SnowCap align="right" width="lg" />
            <div className="relative z-20">
              <p className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#FFB36B]">
                {EVENT_CONFIG.tagline}
              </p>
              <h2 className="font-display mx-auto mb-5 max-w-2xl text-3xl sm:text-5xl font-extrabold text-white text-balance">
                {finalCta.heading}
              </h2>
              <p className="mx-auto mb-9 max-w-xl text-base sm:text-lg leading-relaxed text-[#E2E9F6]">
                {finalCta.description}
              </p>

              {EVENT_CONFIG.externalProposalFormUrl ? (
                <a
                  href={EVENT_CONFIG.externalProposalFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-[#B9DFFF]/35 bg-gradient-to-r from-[#7B2FFF] via-[#9C4DFF] to-[#E58BFF] px-8 py-4 text-base font-semibold text-white shadow-[0_12px_40px_rgba(123,47,255,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(229,139,255,0.48)] whitespace-nowrap"
                >
                  <span>{finalCta.ctaLabel}</span>
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onOpenProposal}
                  className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-[#B9DFFF]/35 bg-gradient-to-r from-[#7B2FFF] via-[#9C4DFF] to-[#E58BFF] px-8 py-4 text-base font-semibold text-white shadow-[0_12px_40px_rgba(123,47,255,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(229,139,255,0.48)] whitespace-nowrap"
                >
                  <span>{finalCta.ctaLabel}</span>
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
