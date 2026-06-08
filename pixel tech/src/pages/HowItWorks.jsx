import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

import VerticalTabs from '../components/ui/vertical-tabs';

export default function HowItWorks() {
  return (
    <main className="min-h-screen pt-[120px] pb-[80px] bg-bg2 relative overflow-hidden">
      <SEO title="How It Works" description="See exactly how our automated follow-up system integrates with your clinic." url="/how-it-works" />
      
      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            How the <span className="text-gradient">System Works</span>
          </h1>
          <p className="text-mut text-[1.1rem] md:text-[1.2rem] max-w-[600px] mx-auto leading-relaxed">
            We don't just give you software. We build a fully automated, invisible employee for your clinic that works 24/7.
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full">
        <VerticalTabs />
      </div>
        
      <div className="mt-16 text-center relative z-10">
        <Link to="/booking" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
          Book My Free Lead-Leak Audit
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </main>
  );
}
