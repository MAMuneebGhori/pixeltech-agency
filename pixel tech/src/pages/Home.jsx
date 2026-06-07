import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import FinalCtaSection from '../components/FinalCtaSection';
import { Code2, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Unique Quick Intro Section */}
      <section className="py-[100px] border-b border-line bg-bg2 relative overflow-hidden">
        <div className="max-w-[1080px] mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent text-sm font-bold tracking-wide uppercase">The Pixeltech Difference</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4 mb-6">
              We don't build websites.<br/>
              <span className="text-gradient">We engineer businesses.</span>
            </h2>
            <p className="text-mut text-[1.05rem] leading-relaxed mb-8 max-w-[480px]">
              Stop settling for slow templates that don't convert. We engineer custom full-stack web applications wired with automation that turns traffic into booked calls on autopilot.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services" className="btn-primary inline-flex items-center gap-2">
                Explore Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/how-it-works" className="px-6 py-3 rounded-full border border-line text-ink hover:border-accent hover:text-accent transition-all font-bold">
                How It Works
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="bg-card border border-line rounded-2xl p-8 relative z-10 shadow-2xl">
              <h3 className="text-xl font-bold mb-6">Why top agencies choose us:</h3>
              <ul className="space-y-4">
                {[
                  'React & Next.js custom frontends',
                  'Sub-second blazing fast load times',
                  'Integrated automated SMS/Email workflows',
                  'Enterprise-grade security & scaling',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-ink font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Unique Highlights Section */}
      <section className="py-[100px] border-b border-line bg-bg relative overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
         
         <div className="max-w-[1080px] mx-auto px-6 relative z-10">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Everything you need to <span className="text-gradient">scale</span></h2>
             <p className="text-mut text-lg max-w-2xl mx-auto">We replace your scattered tools with one cohesive, custom-built system.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-line p-8 rounded-2xl hover:border-accent/50 transition-all flex flex-col group"
              >
                 <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                   <Code2 className="w-7 h-7" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">Custom Architecture</h3>
                 <p className="text-mut mb-8 flex-grow">Bespoke codebases that run perfectly and look beautiful, built from the ground up without restrictive templates.</p>
                 <Link to="/services" className="text-accent hover:text-white flex items-center gap-2 font-bold text-sm mt-auto">
                   View Services <ArrowRight className="w-4 h-4" />
                 </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-line p-8 rounded-2xl hover:border-accent/50 transition-all flex flex-col group"
              >
                 <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                   <Rocket className="w-7 h-7" />
                 </div>
                 <h3 className="text-xl font-bold mb-3">Automated Growth</h3>
                 <p className="text-mut mb-8 flex-grow">Missed call text-backs, AI booking flows, and CRM integrations built right in to capture every lead.</p>
                 <Link to="/how-it-works" className="text-accent hover:text-white flex items-center gap-2 font-bold text-sm mt-auto">
                   See The Process <ArrowRight className="w-4 h-4" />
                 </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-line p-8 rounded-2xl hover:border-accent/50 transition-all flex flex-col group"
              >
                 <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                   <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                 </div>
                 <h3 className="text-xl font-bold mb-3">Transparent Pricing</h3>
                 <p className="text-mut mb-8 flex-grow">No hidden fees, no surprise retainers. Flat-rate custom engineering with crystal clear timelines and deliverables.</p>
                 <Link to="/pricing" className="text-accent hover:text-white flex items-center gap-2 font-bold text-sm mt-auto">
                   View Pricing <ArrowRight className="w-4 h-4" />
                 </Link>
              </motion.div>
           </div>
         </div>
      </section>

      <FinalCtaSection />
    </main>
  );
}
