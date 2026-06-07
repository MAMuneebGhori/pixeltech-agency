import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PricingSection from '../components/PricingSection';
import { CheckCircle2, X } from 'lucide-react';

export default function Pricing() {
  const comparisonRows = [
    { feature: 'Custom React/Next.js Build', us: true, them: false },
    { feature: 'Full-Stack Backend (Node.js)', us: true, them: false },
    { feature: 'Automated Lead Follow-up', us: true, them: false },
    { feature: 'Self-Booking Calendar', us: true, them: false },
    { feature: 'Core Web Vitals Optimized', us: true, them: 'Varies' },
    { feature: 'Ongoing Monthly Optimization', us: true, them: false },
    { feature: 'Custom API Integrations', us: true, them: 'Extra cost' },
    { feature: 'Dedicated Technical Support', us: true, them: 'Email only' },
  ];

  return (
    <main className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="pt-[140px] pb-[80px] relative overflow-hidden border-b border-line">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/8 blur-[150px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-[780px] mx-auto px-6 text-center relative z-10"
        >
          <div className="w-full text-left">
            <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
              Transparent Pricing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Enterprise engineering.{' '}
            <span className="text-gradient">Accessible pricing.</span>
          </h1>
          <p className="text-mut text-lg max-w-[580px] mx-auto leading-relaxed">
            No hidden fees. No surprise invoices. Choose the plan that fits your stage and scale — we'll handle the rest.
          </p>
        </motion.div>
      </section>

      <PricingSection />

      {/* Comparison Table */}
      <section className="py-[100px] border-b border-line bg-bg relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[780px] mx-auto px-6 text-center relative z-10 mb-16">
          <div className="w-full text-left">
            <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
              Why Pixeltech
            </span>
          </div>
          <h2 className="mb-3.5">
            Pixeltech vs. <span className="text-gradient">Generic Agencies</span>
          </h2>
        </div>

        <div className="max-w-[800px] mx-auto px-6 relative z-10">
          <div className="bg-card border border-line rounded-2xl overflow-hidden shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-bg2 border-b border-line">
              <div className="p-5 font-bold text-mut text-sm uppercase tracking-wider">Feature</div>
              <div className="p-5 font-bold text-accent text-sm uppercase tracking-wider text-center">Pixeltech</div>
              <div className="p-5 font-bold text-mut text-sm uppercase tracking-wider text-center">Others</div>
            </div>
            
            {/* Table Rows */}
            {comparisonRows.map((row, idx) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`grid grid-cols-3 border-b border-line/50 last:border-b-0 ${
                  idx % 2 === 0 ? 'bg-card' : 'bg-bg2/50'
                }`}
              >
                <div className="p-5 text-[0.95rem] font-medium">{row.feature}</div>
                <div className="p-5 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-accent drop-shadow-[0_0_6px_rgba(0,242,254,0.5)]" />
                </div>
                <div className="p-5 flex items-center justify-center">
                  {row.them === true ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500/50" />
                  ) : row.them === false ? (
                    <X className="w-5 h-5 text-red-500/50" />
                  ) : (
                    <span className="text-mut text-sm">{row.them}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-[radial-gradient(700px_360px_at_50%_120%,rgba(0,242,254,0.15),transparent_70%)] py-[86px] border-b border-line bg-bg">
        <div className="max-w-[780px] mx-auto px-6 text-center">
          <h2 className="mb-3.5 text-4xl md:text-5xl">
            Stop paying for templates.<br />
            <span className="text-gradient">Invest in systems.</span>
          </h2>
          <p className="max-w-[580px] mx-auto mt-5 mb-8 text-mut text-[1.1rem]">
            Book a free consultation and we'll build a custom quote based on your exact needs — no generic packages.
          </p>
          <Link to="/booking" className="btn-primary inline-block text-lg shadow-[0_0_20px_rgba(0,242,254,0.2)]">
            Get My Custom Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
