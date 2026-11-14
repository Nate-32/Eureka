import { useState, type FormEvent } from 'react';
import { CheckCircle2, Mail, MessageSquare, Phone, Send } from 'lucide-react';
import { EVENT_CONFIG, type ContactChannel } from '../config/eventData';
import { SnowCap } from './SnowCap';

function ChannelIcon({ icon }: { icon: ContactChannel['icon'] }) {
  switch (icon) {
    case 'mail':
      return <Mail className="h-5 w-5 text-[#B9DFFF]" aria-hidden="true" />;
    case 'message-square':
      return <MessageSquare className="h-5 w-5 text-[#00E5CC]" aria-hidden="true" />;
    case 'phone':
      return <Phone className="h-5 w-5 text-[#FFB36B]" aria-hidden="true" />;
  }
}

export function ContactSection() {
  const { contact } = EVENT_CONFIG;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Proposal & Track Inquiry');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setError('Please enter your name (at least 2 characters).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (trimmedMessage.length < 10) {
      setError('Please include a brief message (at least 10 characters).');
      return;
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setTopic('Proposal & Track Inquiry');
    setMessage('');
    setError(null);
    setSubmitted(false);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#E58BFF]">
            {contact.eyebrow}
          </p>
          <h2 className="font-display mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            {contact.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#B5C0D6]">
            {contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: Editable Placeholder Contact Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              {contact.channels.map((channel, idx) => (
                <div
                  key={channel.id}
                  className="frosted-panel frosted-panel-interactive rounded-2xl p-6 flex items-center gap-4"
                >
                  {idx === 0 && <SnowCap align="left" width="sm" />}
                  <div className="relative z-20 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#B9DFFF]/20 bg-[#10172B]/80">
                    <ChannelIcon icon={channel.icon} />
                  </div>
                  <div className="relative z-20 min-w-0">
                    <p className="text-xs font-medium text-[#00E5CC]">{channel.role}</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{channel.label}</p>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="mt-1 block truncate text-sm text-[#B9DFFF] hover:text-white transition-colors"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <p className="mt-1 truncate font-mono-tabular text-xs sm:text-sm text-[#B5C0D6]">
                        {channel.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="frosted-panel rounded-2xl p-5">
              <p className="text-xs leading-relaxed text-[#B5C0D6]">
                {contact.placeholderNote}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Query Helpdesk Form */}
          <div className="lg:col-span-7">
            <div className="frosted-panel h-full rounded-3xl p-7 sm:p-9">
              <SnowCap align="right" width="md" />
              <div className="relative z-20 h-full">
              {submitted ? (
                <div className="flex h-full flex-col items-start justify-center py-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00E5CC]/35 bg-[#00E5CC]/15 text-[#00E5CC]">
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    Query Recorded Locally
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#B5C0D6] mb-6 max-w-lg">
                    Thank you, <span className="text-white font-medium">{name}</span>. Your{' '}
                    <span className="text-[#B9DFFF]">{topic}</span> inquiry has been validated. Connect an active form endpoint or helpdesk URL in{' '}
                    <code className="font-mono-tabular text-xs text-[#B9DFFF]">src/config/eventData.ts</code>{' '}
                    when publishing live registration.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#B9DFFF]/30 bg-[#10172B]/70 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#B9DFFF]/55 hover:bg-[#10172B]"
                  >
                    Send Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex h-full flex-col justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#00E5CC] mb-1.5">
                      Helpdesk Inquiry
                    </p>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      Have a Specific Question?
                    </h3>
                    <p className="text-sm text-[#B5C0D6] mb-6">
                      Reach out regarding tracks, proposal guidelines, technical infrastructure, or ecosystem partnerships.
                    </p>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
                      <div>
                        <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-[#B9DFFF]">
                          Your Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ada Lovelace"
                          required
                          className="w-full rounded-xl border border-[#B9DFFF]/20 bg-[#06060F]/65 px-4 py-2.5 text-sm text-white placeholder-[#B5C0D6]/45 transition-colors focus:border-[#00E5CC] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-[#B9DFFF]">
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@domain.example"
                          required
                          className="w-full rounded-xl border border-[#B9DFFF]/20 bg-[#06060F]/65 px-4 py-2.5 text-sm text-white placeholder-[#B5C0D6]/45 transition-colors focus:border-[#00E5CC] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="contact-topic" className="mb-1.5 block text-xs font-medium text-[#B9DFFF]">
                        Inquiry Topic
                      </label>
                      <select
                        id="contact-topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full rounded-xl border border-[#B9DFFF]/20 bg-[#06060F]/85 px-4 py-2.5 text-sm text-white transition-colors focus:border-[#00E5CC] focus:outline-none"
                      >
                        <option value="Proposal & Track Inquiry">Proposal & Track Inquiry</option>
                        <option value="Technical & Infrastructure">Technical & Infrastructure</option>
                        <option value="Sponsorship & Partnerships">Sponsorship & Partnerships</option>
                        <option value="General Event Details">General Event Details</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-[#B9DFFF]">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Share your question or partnership details..."
                        required
                        className="w-full resize-y rounded-xl border border-[#B9DFFF]/20 bg-[#06060F]/65 px-4 py-2.5 text-sm text-white placeholder-[#B5C0D6]/45 transition-colors focus:border-[#00E5CC] focus:outline-none"
                      />
                    </div>
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-medium text-[#FFB36B]">
                      {error}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    {EVENT_CONFIG.externalQueryFormUrl ? (
                      <a
                        href={EVENT_CONFIG.externalQueryFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-[#B9DFFF] underline underline-offset-4 hover:text-white"
                      >
                        Open external query form
                      </a>
                    ) : (
                      <span className="text-xs text-[#B5C0D6]/80">
                        Validated interactive helpdesk preview
                      </span>
                    )}

                    <button
                      type="submit"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#B9DFFF]/30 bg-gradient-to-r from-[#7B2FFF] via-[#9245FF] to-[#E58BFF]/90 px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(123,47,255,0.35)] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Submit Query</span>
                    </button>
                  </div>
                </form>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
