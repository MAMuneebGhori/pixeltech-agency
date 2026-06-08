import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function Pricing() {
  return (
    <main className="min-h-screen pt-[120px] pb-[80px] bg-bg relative overflow-hidden">
      <SEO title="Pricing" description="Transparent, flat-fee pricing for automated lead follow-up systems." url="/pricing" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            One system. <span className="text-gradient">One simple price.</span>
          </h1>
          <p className="text-mut text-[1.1rem] md:text-[1.2rem] max-w-[600px] mx-auto">
            No confusing tiers. No hidden fees. Just a flat setup rate and a predictable monthly retainer to keep your clinic's lead system optimized and running smoothly.
          </p>
        </div>
        
        <div className="bg-card border border-accent/30 rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(0,242,254,0.1)] relative">
          <div className="absolute top-0 right-8 -translate-y-1/2">
            <span className="bg-gradient-brand text-[#05050A] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Core Offer
            </span>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">The Booked Solid System</h3>
          <p className="text-mut mb-6">Automated lead follow-up + booking, fully done-for-you.</p>
          
          <div className="flex flex-wrap items-end gap-2 mb-8 border-b border-line pb-8">
            <span className="text-4xl md:text-5xl font-extrabold">$1,250</span>
            <span className="text-mut font-medium mb-1 md:mb-2">setup</span>
            <span className="text-mut font-medium mb-1 md:mb-2 mx-2">+</span>
            <span className="text-3xl md:text-4xl font-bold text-accent">$650</span>
            <span className="text-mut font-medium mb-1 md:mb-2">/mo to run & optimize</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4 text-ink">What's Included (Setup)</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-mut text-sm">Under 60-second SMS/Email follow-up build</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-mut text-sm">Automated booking calendar integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-mut text-sm">Missed-call text-back setup</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-mut text-sm">Go-live in ~7 days</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-ink">What's Included (Monthly)</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-mut text-sm">Premium reliable hosting for the system</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-mut text-sm">Continuous system optimizations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-mut text-sm">Dedicated priority support for your clinic</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-mut text-sm">Lead flow monitoring</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="p-6 bg-[#0a0a0f] border border-line rounded-2xl">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              Optional Add-on
              <span className="text-[0.65rem] bg-white/10 text-white/80 px-2 py-0.5 rounded-full uppercase tracking-wider">Only if you need it</span>
            </h4>
            <p className="text-mut text-sm">
              <strong className="text-ink">High-Converting Landing Page.</strong> If your website isn't converting clicks into leads, we'll build one. +$500–$1,500 one-time.
              <br/><br/>
              <span className="text-ink text-[0.8rem] font-bold uppercase tracking-wider">Free SSL & Premium Hosting Included:</span> We automatically provision secure SSL certificates and host your new landing page on blazing-fast infrastructure. You don't have to worry about security warnings or server costs.
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/booking" className="btn-primary w-full md:w-auto inline-block text-lg py-4 px-12">
              Book My Free Lead-Leak Audit
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
