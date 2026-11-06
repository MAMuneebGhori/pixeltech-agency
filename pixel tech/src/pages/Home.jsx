import HeroSection from '../components/HeroSection';
import FinalCtaSection from '../components/FinalCtaSection';
import FaqAccordion from '../components/FaqAccordion';
import { RevenueLeakSection, HowItWorksSection, ComparisonSection, StackSection, GoLiveSection, DigestSection } from '../components/HomeSections';
import PricingSection from '../components/PricingSection';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <main>
      <SEO url="/" />
      <HeroSection />
      <RevenueLeakSection />
      <HowItWorksSection />
      <ComparisonSection />
      <StackSection />
      <GoLiveSection />
      <PricingSection />
      <DigestSection />
      <FaqAccordion />
      <FinalCtaSection />
    </main>
  );
}
