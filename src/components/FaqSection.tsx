import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventData';
import { SnowCap } from './SnowCap';

export function FaqSection() {
  const { faq } = EVENT_CONFIG;
  const [openId, setOpenId] = useState<string | null>(faq.items[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#00E5CC]">
            {faq.eyebrow}
          </p>
          <h2 className="font-display mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            {faq.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#B5C0D6]">
            {faq.subtitle}
          </p>
          <p className="mt-4 text-xs sm:text-sm text-[#B9DFFF]/80">
            {faq.draftNotice}
          </p>
        </div>

        <div className="flex flex-col gap-3.5">
          {faq.items.map((item, idx) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-trigger-${item.id}`;

            return (
              <div
                key={item.id}
                className={`frosted-panel rounded-2xl transition-colors duration-200 ${
                  isOpen ? 'border-[#B9DFFF]/35' : ''
                }`}
              >
                {idx === 0 && <SnowCap align="right" width="sm" />}
                <h3 className="relative z-20">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-base sm:text-lg font-semibold text-white transition-colors hover:text-[#B9DFFF]"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#B9DFFF] transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#00E5CC]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm sm:text-base leading-relaxed text-[#B5C0D6]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
