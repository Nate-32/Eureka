import { Github, Globe, Linkedin, Snowflake } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventData';

interface FooterProps {
  onOpenProposal: () => void;
}

export function Footer({ onOpenProposal }: FooterProps) {
  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#B9DFFF]/15 bg-[#06060F]/85 backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Identity & Description */}
          <div className="lg:col-span-5">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-display mb-4 inline-flex items-center gap-2.5 text-xl font-bold text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#B9DFFF]/30 bg-gradient-to-br from-[#7B2FFF]/40 to-[#00E5CC]/25 text-[#B9DFFF]">
                <Snowflake className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                {EVENT_CONFIG.brandName}
                <span className="text-[#FFB36B]">.</span>
              </span>
            </a>

            <p className="mb-6 max-w-sm text-sm leading-relaxed text-[#B5C0D6]">
              {EVENT_CONFIG.footer.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contact');
                }}
                aria-label="Connect with EUREKA Website Contact"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B9DFFF]/20 bg-[#10172B]/70 text-[#B9DFFF] transition-colors hover:border-[#00E5CC]/60 hover:text-white"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contact');
                }}
                aria-label="EUREKA GitHub Inquiries"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B9DFFF]/20 bg-[#10172B]/70 text-[#B9DFFF] transition-colors hover:border-[#00E5CC]/60 hover:text-white"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contact');
                }}
                aria-label="EUREKA LinkedIn Inquiries"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B9DFFF]/20 bg-[#10172B]/70 text-[#B9DFFF] transition-colors hover:border-[#00E5CC]/60 hover:text-white"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="font-display mb-4 text-sm font-semibold tracking-wider uppercase text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#B5C0D6]">
              {EVENT_CONFIG.navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="transition-colors hover:text-[#B9DFFF]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Participation & Resources */}
          <div className="lg:col-span-4">
            <h4 className="font-display mb-4 text-sm font-semibold tracking-wider uppercase text-white">
              Participation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#B5C0D6]">
              <li>
                {EVENT_CONFIG.externalProposalFormUrl ? (
                  <a
                    href={EVENT_CONFIG.externalProposalFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#B9DFFF]"
                  >
                    Submit Proposal
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenProposal}
                    className="cursor-pointer transition-colors hover:text-[#B9DFFF]"
                  >
                    Submit Proposal
                  </button>
                )}
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#faq');
                  }}
                  className="transition-colors hover:text-[#B9DFFF]"
                >
                  Participant Guidelines (Draft)
                </a>
              </li>
              <li>
                <a
                  href="#sponsors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#sponsors');
                  }}
                  className="transition-colors hover:text-[#B9DFFF]"
                >
                  Partnership Tiers
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#contact');
                  }}
                  className="transition-colors hover:text-[#B9DFFF]"
                >
                  Organizing Helpdesk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#B9DFFF]/10 pt-6 text-xs text-[#B5C0D6]/80 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} {EVENT_CONFIG.footer.copyright}</p>
          <p className="text-[#B9DFFF]/70">
            Theme: {EVENT_CONFIG.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
