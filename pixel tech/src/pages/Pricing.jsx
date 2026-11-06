import SEO from '../components/SEO';
import PricingSection from '../components/PricingSection';

export default function Pricing() {
  return (
    <main className="bg-bg">
      <SEO title="Pricing" description="One plan: $297/mo, no lock-in. Setup waived for our first 3 clinics. Work out what missed calls cost your med spa." url="/pricing" />
      <PricingSection titleAs="h1" />
    </main>
  );
}
