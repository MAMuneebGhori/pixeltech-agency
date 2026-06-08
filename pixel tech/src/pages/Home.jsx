import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import TestimonialsGrid from '../components/TestimonialsGrid';
import FinalCtaSection from '../components/FinalCtaSection';
import { MessageCircle, CalendarDays, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* SECTION 2 — The Problem */}
      <section id="problem" className="py-[100px] border-b border-line bg-bg2 relative overflow-hidden">
        <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              Your clinic doesn't have a lead problem.<br/>
              <span className="text-gradient">It has a follow-up problem.</span>
            </h2>
            <p className="text-mut text-[1.1rem] md:text-[1.2rem] leading-relaxed mb-8">
              You spend real money getting leads & then end up losing them. Nobody replies for hours, leads go cold at 9 PM, no-shows eat your calendar. 
              <br/><br/>
              Studies show 78% of customers buy from whoever responds first. We make sure that's you.
            </p>
            <Link to="/booking" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
              Book a Free Audit
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — What We Do */}
      <section id="what-we-do" className="py-[100px] border-b border-line bg-bg relative overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
         
         <div className="max-w-[1080px] mx-auto px-6 relative z-10">
           <div className="grid md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-line p-8 rounded-2xl hover:border-accent/50 transition-all flex flex-col group"
              >
                 <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                   <MessageCircle className="w-7 h-7" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">Instant Follow-Up</h3>
                 <p className="text-mut flex-grow">Every new lead gets a text + email in under 60 seconds. Day or night. No lead goes cold.</p>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-line p-8 rounded-2xl hover:border-accent/50 transition-all flex flex-col group"
              >
                 <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                   <CalendarDays className="w-7 h-7" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">Automatic Booking</h3>
                 <p className="text-mut flex-grow">Leads book themselves into your calendar. Reminders cut no-shows. Missed calls get a text back instantly.</p>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-line p-8 rounded-2xl hover:border-accent/50 transition-all flex flex-col group"
              >
                 <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                   <CheckCircle2 className="w-7 h-7" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">Done-For-You</h3>
                 <p className="text-mut flex-grow">We build, test, and launch the whole system for your clinic in about 7 days. You just start seeing booked appointments.</p>
              </motion.div>
           </div>
         </div>
      </section>

      {/* SECTION 4 — The Offer + Upsell */}
      <section id="pricing" className="py-[100px] border-b border-line bg-bg2 relative overflow-hidden">
        <div className="max-w-[800px] mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">One system. <span className="text-gradient">One simple price.</span></h2>
          </div>
          
          <div className="bg-card border border-accent/30 rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(0,242,254,0.1)] relative">
            <div className="absolute top-0 right-8 -translate-y-1/2">
              <span className="bg-gradient-brand text-[#05050A] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Core Offer
              </span>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">The Booked Solid System</h3>
            <p className="text-mut mb-6">Automated lead follow-up + booking, fully done-for-you.</p>
            
            <div className="flex items-end gap-2 mb-8">
              <span className="text-4xl font-extrabold">$1,250</span>
              <span className="text-mut font-medium mb-1">setup</span>
              <span className="text-mut font-medium mb-1 mx-2">+</span>
              <span className="text-2xl font-bold">$650</span>
              <span className="text-mut font-medium mb-1">/mo to run & optimize</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                <span className="text-ink">Under 60-second follow-up</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                <span className="text-ink">Automated booking & reminders</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                <span className="text-ink">Missed-call text-back</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                <span className="text-ink">Live in ~7 days</span>
              </li>
            </ul>
            
            <div className="p-6 bg-[#0a0a0f] border border-line rounded-2xl">
              <h4 className="font-bold text-lg mb-2">Optional Add-on</h4>
              <p className="text-mut text-sm">
                <strong className="text-ink">High-Converting Landing Page.</strong> If your website isn't converting clicks into leads, we'll build one. +$500–$1,500 one-time. Only if you need it.
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
      </section>

      <TestimonialsGrid />

      <FinalCtaSection />
    </main>
  );
}
