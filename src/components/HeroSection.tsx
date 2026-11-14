import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Compass } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventData';
import { resolveAssetUrl } from '../utils/assets';

interface HeroSectionProps {
  onOpenProposal: () => void;
}

export function HeroSection({ onOpenProposal }: HeroSectionProps) {
  const bgUrl = resolveAssetUrl(EVENT_CONFIG.assets.heroBackground);
  const typoUrl = resolveAssetUrl(EVENT_CONFIG.assets.heroTypography);

  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const typoImgRef = useRef<HTMLImageElement | null>(null);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [typoLoaded, setTypoLoaded] = useState(false);

  useEffect(() => {
    if (bgImgRef.current?.complete) setBgLoaded(true);
    if (typoImgRef.current?.complete) setTypoLoaded(true);
  }, []);

  const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full items-end md:items-center overflow-hidden bg-[#06060F] pt-20 pb-14 sm:pb-16 md:pt-24 md:pb-20"
    >
      {/* Edge-to-edge winter aurora backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#06060F]">
        <img
          ref={bgImgRef}
          src={bgUrl}
          alt="Winter aurora landscape with an observer looking toward luminous violet and teal ribbons over a snow-covered engineering campus"
          width={1672}
          height={941}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          onLoad={() => setBgLoaded(true)}
          className={`absolute inset-0 h-full w-full max-w-none object-cover object-[76%_18%] sm:object-[74%_24%] md:object-[72%_center] lg:object-center xl:object-right transition-opacity duration-500 ease-out ${
            bgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Desktop & laptop directional scrim: keeps moon/dish softly visible on left while ensuring crisp contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden md:block bg-[linear-gradient(90deg,rgba(6,6,15,0.78)_0%,rgba(6,6,15,0.46)_38%,rgba(6,6,15,0.12)_64%,transparent_100%)]"
        />

        {/* Mobile scrim: leaves the upper ~42% completely clear for the aurora & observer, darkens lower half for text legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 md:hidden bg-[linear-gradient(to_top,#06060F_0%,rgba(6,6,15,0.92)_38%,rgba(6,6,15,0.52)_62%,rgba(6,6,15,0.15)_85%,transparent_100%)]"
        />

        {/* Bottom horizon blend into #06060F */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#06060F] via-[#06060F]/65 to-transparent"
        />
      </div>

      {/* Balanced Hero Content — responsive edge alignment across laptop, desktop & mobile */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-end md:items-center md:grid-cols-12">
          <div className="md:col-span-7 lg:col-span-6 flex flex-col items-start pt-[38svh] sm:pt-[34svh] md:pt-0">
            {/* Unboxed Event Identity Label */}
            <div className="mb-3 sm:mb-4 flex items-center gap-3 text-[11px] sm:text-xs font-medium tracking-[0.15em] uppercase text-[#B9DFFF]">
              <span className="h-[1px] w-6 sm:w-7 bg-gradient-to-r from-[#00E5CC] to-[#B9DFFF]" aria-hidden="true" />
              <span>{EVENT_CONFIG.heroIdentityLabel}</span>
            </div>

            {/* Supplied Hero_Typo graphic — transparent background & aspect ratio preserved */}
            <div className="mb-4 sm:mb-5 w-full max-w-[330px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[560px]">
              <img
                ref={typoImgRef}
                src={typoUrl}
                alt="EUREKA — Ignite: Discovery"
                width={1200}
                height={400}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                onLoad={() => setTypoLoaded(true)}
                className={`block h-auto w-full object-contain drop-shadow-[0_12px_36px_rgba(6,6,15,0.65)] transition-opacity duration-300 ease-out ${
                  typoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            {/* Supporting Introduction */}
            <p className="mb-6 sm:mb-8 max-w-lg text-sm sm:text-base lg:text-lg leading-relaxed text-[#E2E9F6]">
              {EVENT_CONFIG.heroSubtitle}
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex w-full sm:w-auto flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => scrollToSection('#about')}
                className="inline-flex flex-1 sm:flex-none cursor-pointer items-center justify-center gap-2.5 rounded-full border border-[#B9DFFF]/35 bg-gradient-to-r from-[#7B2FFF] via-[#9245FF] to-[#E58BFF]/90 px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-[0_8px_32px_rgba(123,47,255,0.42)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_38px_rgba(229,139,255,0.45)] whitespace-nowrap shrink-0"
              >
                <span>{EVENT_CONFIG.primaryCtaLabel}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('#tracks')}
                className="inline-flex flex-1 sm:flex-none cursor-pointer items-center justify-center gap-2.5 rounded-full border border-[#B9DFFF]/25 bg-[#10172B]/60 px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-[#FFFFFF] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00E5CC]/60 hover:bg-[#10172B]/80 hover:text-[#B9DFFF] whitespace-nowrap shrink-0"
              >
                <Compass className="h-4 w-4 text-[#00E5CC]" aria-hidden="true" />
                <span>{EVENT_CONFIG.secondaryCtaLabel}</span>
              </button>

              <button
                type="button"
                onClick={onOpenProposal}
                className="inline-flex cursor-pointer items-center gap-1.5 px-1 py-2 text-sm font-medium text-[#FFB36B] underline decoration-[#FFB36B]/45 underline-offset-4 transition-colors hover:text-white hover:decoration-white whitespace-nowrap shrink-0"
              >
                <span>{EVENT_CONFIG.submitProposalLabel}</span>
              </button>
            </div>
          </div>

          {/* Right column intentionally open for BG1 observer, aurora, drone & rover */}
          <div className="hidden md:block md:col-span-5 lg:col-span-6" aria-hidden="true" />
        </div>
      </div>

      {/* Subtle Unboxed Scroll Indicator */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('#about');
        }}
        aria-label="Scroll to About EUREKA"
        className="group absolute bottom-4 sm:bottom-6 left-1/2 z-10 hidden sm:inline-flex -translate-x-1/2 items-center gap-2 text-xs font-medium tracking-[0.14em] uppercase text-[#B9DFFF]/80 transition-colors hover:text-white"
      >
        <span>Scroll to explore</span>
        <ArrowDown className="h-3.5 w-3.5 text-[#00E5CC] transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
      </a>
    </section>
  );
}
