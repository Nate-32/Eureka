import { useState, type ReactNode } from 'react';
import { MotionConfig, motion } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { PrizesSection } from './components/PrizesSection';
import { ProposalModal } from './components/ProposalModal';
import { SnowfallCanvas } from './components/SnowfallCanvas';
import { SponsorsSection } from './components/SponsorsSection';
import { TracksSection } from './components/TracksSection';

function RevealSection({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [isProposalOpen, setIsProposalOpen] = useState(false);

  const openProposal = () => setIsProposalOpen(true);
  const closeProposal = () => setIsProposalOpen(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip bg-[#06060F] text-white">
        {/* Atmospheric winter aurora gradient layer */}
        <div className="aurora-sky-layer" aria-hidden="true" />

        {/* Subtle sparse snowfall particle layer */}
        <SnowfallCanvas />

        {/* Top Navigation Bar */}
        <Navbar onOpenProposal={openProposal} />

        {/* Main Content */}
        <main>
          <HeroSection onOpenProposal={openProposal} />

          <RevealSection>
            <AboutSection />
          </RevealSection>

          <RevealSection>
            <TracksSection />
          </RevealSection>

          <RevealSection>
            <PrizesSection onOpenProposal={openProposal} />
          </RevealSection>

          <RevealSection>
            <SponsorsSection />
          </RevealSection>

          <RevealSection>
            <FinalCtaSection onOpenProposal={openProposal} />
          </RevealSection>

          <RevealSection>
            <FaqSection />
          </RevealSection>

          <RevealSection>
            <ContactSection />
          </RevealSection>
        </main>

        <Footer onOpenProposal={openProposal} />

        <ProposalModal isOpen={isProposalOpen} onClose={closeProposal} />
      </div>
    </MotionConfig>
  );
}
