import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventData';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProposalModal({ isOpen, onClose }: ProposalModalProps) {
  const [teamName, setTeamName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [trackId, setTrackId] = useState<string>(EVENT_CONFIG.tracks.items[0].id);
  const [projectTitle, setProjectTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (teamName.trim().length < 2) {
      setError('Please enter your team or builder name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
      setError('Please enter a valid contact email.');
      return;
    }
    if (projectTitle.trim().length < 3) {
      setError('Please provide a working project title.');
      return;
    }
    if (abstract.trim().length < 20) {
      setError('Please write a brief summary of your breakthrough concept (at least 20 characters).');
      return;
    }

    setSaved(true);
  };

  const handleResetAndClose = () => {
    setSaved(false);
    setError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="proposal-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06060F]/80 p-4 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div className="frosted-panel frost-rim-top relative w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-[0_24px_80px_rgba(4,6,18,0.85)]">
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close proposal dialog"
          className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#B9DFFF]/20 bg-[#10172B]/80 text-[#B5C0D6] transition-colors hover:border-[#B9DFFF]/45 hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {saved ? (
          <div className="py-4">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00E5CC]/35 bg-[#00E5CC]/15 text-[#00E5CC]">
              <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 id="proposal-modal-title" className="font-display text-2xl font-bold text-white mb-2">
              Proposal Draft Validated
            </h3>
            <p className="text-sm leading-relaxed text-[#B5C0D6] mb-6">
              Your proposal draft for <span className="text-white font-medium">{projectTitle}</span> ({teamName}) is ready. Once official registration opens, configure{' '}
              <code className="font-mono-tabular text-xs text-[#B9DFFF]">externalProposalFormUrl</code> in{' '}
              <code className="font-mono-tabular text-xs text-[#B9DFFF]">src/config/eventData.ts</code>{' '}
              to connect the live submission portal.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="cursor-pointer rounded-full bg-gradient-to-r from-[#7B2FFF] to-[#E58BFF] px-6 py-2.5 text-sm font-semibold text-white"
              >
                Done
              </button>
              <button
                type="button"
                onClick={() => setSaved(false)}
                className="cursor-pointer rounded-full border border-[#B9DFFF]/25 bg-[#10172B]/70 px-6 py-2.5 text-sm font-semibold text-[#B9DFFF] hover:text-white"
              >
                Edit Draft
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5 pr-8">
              <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#FFB36B]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>EUREKA Proposal Desk</span>
              </div>
              <h3 id="proposal-modal-title" className="font-display text-2xl font-bold text-white mb-1.5">
                Prepare Your Proposal
              </h3>
              <p className="text-xs sm:text-sm text-[#B5C0D6]">
                Official submission links are configured centrally before event launch. Draft and validate your concept summary below.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="proposal-team" className="mb-1 block text-xs font-medium text-[#B9DFFF]">
                    Team / Lead Name
                  </label>
                  <input
                    id="proposal-team"
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Aurora Labs"
                    className="w-full rounded-xl border border-[#B9DFFF]/20 bg-[#06060F]/70 px-3.5 py-2.5 text-sm text-white placeholder-[#B5C0D6]/45 focus:border-[#00E5CC] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="proposal-email" className="mb-1 block text-xs font-medium text-[#B9DFFF]">
                    Contact Email
                  </label>
                  <input
                    id="proposal-email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="team@domain.example"
                    className="w-full rounded-xl border border-[#B9DFFF]/20 bg-[#06060F]/70 px-3.5 py-2.5 text-sm text-white placeholder-[#B5C0D6]/45 focus:border-[#00E5CC] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="proposal-track" className="mb-1 block text-xs font-medium text-[#B9DFFF]">
                    Discovery Track
                  </label>
                  <select
                    id="proposal-track"
                    value={trackId}
                    onChange={(e) => setTrackId(e.target.value)}
                    className="w-full rounded-xl border border-[#B9DFFF]/20 bg-[#06060F]/90 px-3.5 py-2.5 text-sm text-white focus:border-[#00E5CC] focus:outline-none"
                  >
                    {EVENT_CONFIG.tracks.items.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="proposal-title" className="mb-1 block text-xs font-medium text-[#B9DFFF]">
                    Working Project Title
                  </label>
                  <input
                    id="proposal-title"
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Cryogenic Edge Biosensor"
                    className="w-full rounded-xl border border-[#B9DFFF]/20 bg-[#06060F]/70 px-3.5 py-2.5 text-sm text-white placeholder-[#B5C0D6]/45 focus:border-[#00E5CC] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="proposal-abstract" className="mb-1 block text-xs font-medium text-[#B9DFFF]">
                  Breakthrough Abstract
                </label>
                <textarea
                  id="proposal-abstract"
                  rows={3}
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  placeholder="Describe the problem in the dark, your technical approach, and the working prototype you plan to demonstrate..."
                  className="w-full resize-none rounded-xl border border-[#B9DFFF]/20 bg-[#06060F]/70 px-3.5 py-2.5 text-sm text-white placeholder-[#B5C0D6]/45 focus:border-[#00E5CC] focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-3 text-xs font-medium text-[#FFB36B]">
                {error}
              </p>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="cursor-pointer rounded-full border border-[#B9DFFF]/20 px-5 py-2.5 text-sm font-medium text-[#B5C0D6] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-full bg-gradient-to-r from-[#7B2FFF] via-[#9245FF] to-[#E58BFF] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(123,47,255,0.35)]"
              >
                Validate Proposal Draft
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
