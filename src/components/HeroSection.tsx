import { ArrowDown, ArrowRight, Compass } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventData';
import { resolveAssetUrl } from '../utils/assets';

interface HeroSectionProps {
  onOpenProposal: () => void;
}

export function HeroSection({ onOpenProposal }: HeroSectionProps) {
  const bgUrl = resolveAssetUrl(EVENT_CONFIG.assets.heroBackground);
  const typoUrl = resolveAssetUrl(EVENT_CONFIG.assets.heroTypography);

  const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center pt-24 pb-20 lg:pt-28 lg:pb-24"
    >
      {/* Full-bleed BG1.png winter aurora backdrop — right-aligned subject preserved */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src={bgUrl}
          alt="Winter aurora landscape with an observer looking toward luminous violet and teal ribbons over a snow-covered engineering campus"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-[78%_28%] sm:object-[74%_center] lg:object-right"
        />

        {/* Directional readability scrims keeping the right-side person and aurora vivid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#06060F]/88 via-[#06060F]/52 to-transparent hidden md:block"
        />
        {/* Mobile vertical-first scrim so top-right observer stays visible above/beside content */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#06060F]/95 via-[#06060F]/55 to-[#06060F]/25 md:hidden"
        />
        {/* Seamless transition into deep midnight #06060F below the hero */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#06060F] via-[#06060F]/75 to-transparent"
        />
      </div>

      {/* Two-sided composition: Left column typography & actions, Right side left open for BG1 subject */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-end md:items-center lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start pt-44 sm:pt-36 md:pt-0">
            {/* Unboxed Event Identity Label */}
            <div className="mb-4 flex items-center gap-3 text-xs sm:text-sm font-medium tracking-[0.14em] uppercase text-[#B9DFFF]">
              <span className="h-[1px] w-7 bg-gradient-to-r from-[#00E5CC] to-[#B9DFFF]" aria-hidden="true" />
              <span>{EVENT_CONFIG.heroIdentityLabel}</span>
            </div>

            {/* Supplied Hero_Typo.png graphic — transparent background & aspect ratio strictly preserved */}
            <div className="mb-5 w-full max-w-[460px] sm:max-w-[520px] lg:max-w-[560px]">
              <img
                src={typoUrl}
                alt="EUREKA — Ignite: Discovery"
                referrerPolicy="no-referrer"
                className="block h-auto w-full object-contain drop-shadow-[0_12px_36px_rgba(6,6,15,0.65)]"
              />
            </div>

            {/* Supporting Introduction */}
            <p className="mb-8 max-w-xl text-base sm:text-lg leading-relaxed text-[#E2E9F6] md:text-[#B5C0D6]">
              {EVENT_CONFIG.heroSubtitle}
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToSection('#about')}
                className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-[#B9DFFF]/35 bg-gradient-to-r from-[#7B2FFF] via-[#9245FF] to-[#E58BFF]/90 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-[0_8px_32px_rgba(123,47,255,0.42)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_38px_rgba(229,139,255,0.45)] whitespace-nowrap shrink-0"
              >
                <span>{EVENT_CONFIG.primaryCtaLabel}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('#tracks')}
                className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-[#B9DFFF]/25 bg-[#10172B]/55 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#FFFFFF] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00E5CC]/60 hover:bg-[#10172B]/75 hover:text-[#B9DFFF] whitespace-nowrap shrink-0"
              >
                <Compass className="h-4 w-4 text-[#00E5CC]" aria-hidden="true" />
                <span>{EVENT_CONFIG.secondaryCtaLabel}</span>
              </button>

              <button
                type="button"
                onClick={onOpenProposal}
                className="inline-flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm font-medium text-[#FFB36B] underline decoration-[#FFB36B]/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white whitespace-nowrap shrink-0"
              >
                <span>{EVENT_CONFIG.submitProposalLabel}</span>
              </button>
            </div>
          </div>

          {/* Right column intentionally left open so BG1 observer, aurora, drone & rover remain unobstructed */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6" aria-hidden="true" />
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('#about');
        }}
        aria-label="Scroll to About EUREKA"
        className="group absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#B9DFFF]/15 bg-[#10172B]/50 px-4 py-1.5 text-xs font-medium tracking-wider text-[#B5C0D6] backdrop-blur-md transition-colors hover:border-[#B9DFFF]/35 hover:text-white"
      >
        <span>Scroll to explore</span>
        <ArrowDown className="h-3.5 w-3.5 text-[#B9DFFF] transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
      </a>
    </section>
  );
}
