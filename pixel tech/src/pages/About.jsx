import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Zap } from 'lucide-react';

export default function About() {
  return (
    <main className="min-h-screen pt-[120px] pb-[80px] bg-bg relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-[0.65rem] tracking-[0.18em] uppercase text-accent border border-accent/20 rounded-full px-3.5 py-1.5 mb-6 bg-accent/5">
            <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
            Our Mission
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            We Help Clinics Stop <span className="text-gradient">Leaking Revenue.</span>
          </h1>
          <p className="text-mut text-[1.1rem] md:text-[1.2rem] leading-relaxed max-w-[650px] mx-auto">
            Most Med Spas and Clinics spend thousands of dollars every month on Facebook ads, Google ads, and SEO. 
            But when the leads finally come in, nobody replies for hours. Leads go cold, competitors swoop in, and money is burned.
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-card border border-line p-8 md:p-12 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-ink">Why We Exclusively Serve Med Spas</h2>
          
          <div className="space-y-6 text-mut leading-relaxed">
            <p>
              At Pixeltech Agency, we noticed a massive gap in the aesthetics industry. Doctors and practitioners are world-class at delivering results for their patients, but they are entirely too busy to sit by the phone waiting to text back a lead who asks, "How much is Botox?"
            </p>
            <p>
              Traditional marketing agencies will sell you on "getting more leads." But more leads don't matter if your front desk is too overwhelmed to follow up with them immediately. 
            </p>
            <p>
              <strong className="text-ink">That's why we built the Booked Solid System.</strong>
            </p>
            <p>
              We don't run your ads. We fix what happens <em>after</em> the ad is clicked. We install AI-driven infrastructure that responds to every inquiry in under 60 seconds, pre-qualifies them, and books them straight into your calendar—day or night, weekends and holidays.
            </p>
          </div>
        </div>

        {/* Core Values / Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-bg2 border border-line p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-ink">Speed is Everything</h3>
            <p className="text-mut text-sm">78% of customers buy from the first responder. Our systems ensure your clinic is always first.</p>
          </div>
          <div className="bg-bg2 border border-line p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-ink">Done-For-You</h3>
            <p className="text-mut text-sm">You shouldn't have to learn new software. We build, manage, and optimize the entire system for you.</p>
          </div>
          <div className="bg-bg2 border border-line p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-ink">Niche Expertise</h3>
            <p className="text-mut text-sm">Because we focus strictly on Med Spas and Clinics, our conversational AI actually understands your services.</p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/booking" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
            Book Your Strategy Call
          </Link>
        </div>

      </div>
    </main>
  );
}
