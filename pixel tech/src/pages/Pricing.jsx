import React from 'react';
import SEO from '../components/SEO';
import PricingSection from '../components/PricingSection';

export default function Pricing() {
  return (
    <main className="bg-bg">
      <SEO title="Pricing" description="Transparent, flat-fee pricing for automated lead follow-up systems." url="/pricing" />
      <PricingSection />
    </main>
  );
}
