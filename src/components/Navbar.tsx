import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Snowflake, X } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventData';

interface NavbarProps {
  onOpenProposal: () => void;
}

export function Navbar({ onOpenProposal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 28);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(Math.max((y / docHeight) * 100, 0), 100) : 0;
      setScrollProgress(pct);

      const sectionIds = EVENT_CONFIG.navLinks.map((link) => link.id);
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom >= 120) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#06060F]/84 backdrop-blur-xl border-b border-[#B9DFFF]/15 shadow-[0_8px_32px_rgba(6,6,15,0.55)]'
          : 'bg-gradient-to-b from-[#06060F]/55 via-[#06060F]/20 to-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3.5 sm:px-8 lg:px-12">
        {/* Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMobileMenuOpen(false);
          }}
          className="font-display inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#B9DFFF]/30 bg-gradient-to-br from-[#7B2FFF]/40 via-[#10172B]/80 to-[#00E5CC]/30 text-[#B9DFFF] shadow-[0_0_16px_rgba(185,223,255,0.2)]">
            <Snowflake className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>
            EUREKA<span className="text-[#FFB36B]">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
          {EVENT_CONFIG.navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-[#D0DAEE] hover:text-white'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 -bottom-0.5 h-[2px] w-full rounded-full bg-gradient-to-r from-[#B9DFFF] via-[#E58BFF] to-[#00E5CC] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {EVENT_CONFIG.externalProposalFormUrl ? (
            <a
              href={EVENT_CONFIG.externalProposalFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#B9DFFF]/30 bg-gradient-to-r from-[#7B2FFF] via-[#9C4DFF] to-[#E58BFF]/90 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-[0_0_24px_rgba(123,47,255,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(229,139,255,0.45)] whitespace-nowrap shrink-0"
            >
              <span>{EVENT_CONFIG.submitProposalLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              onClick={onOpenProposal}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#B9DFFF]/30 bg-gradient-to-r from-[#7B2FFF] via-[#964BFF] to-[#E58BFF]/85 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-[0_0_24px_rgba(123,47,255,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(229,139,255,0.45)] whitespace-nowrap shrink-0"
            >
              <span>{EVENT_CONFIG.submitProposalLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex lg:hidden h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#B9DFFF]/25 bg-[#10172B]/70 text-[#B9DFFF] backdrop-blur-md transition-colors hover:border-[#B9DFFF]/45 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#B9DFFF]/15 bg-[#06060F]/95 backdrop-blur-2xl px-5 py-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {EVENT_CONFIG.navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#B9DFFF]/10 text-white border border-[#B9DFFF]/20'
                      : 'text-[#B5C0D6] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-xs text-[#00E5CC]" aria-hidden="true">
                      Active
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      )}

      {/* Scroll Progress Indicator — appears cleanly once scrolling begins */}
      <div
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-[2px] w-full transition-opacity duration-300 ${
          scrolled ? 'opacity-100 bg-white/[0.04]' : 'opacity-0'
        }`}
      >
        <div
          className="h-full bg-gradient-to-r from-[#7B2FFF] via-[#00E5CC] to-[#E58BFF] shadow-[0_0_12px_rgba(0,229,204,0.65)] transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
