import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ThreeStepsCards from '../components/ThreeStepsCards';
import Testimonial1 from '../components/ui/testimonial-1';

export default function HowItWorks() {
  const timeline = [
    {
      phase: 'Phase 1',
      title: 'Discovery & Strategy',
      duration: 'Week 1',
      items: [
        'Deep-dive into your business model and goals',
        'Audit current digital infrastructure',
        'Map out the technical architecture',
        'Define KPIs and conversion targets'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Engineering & Build',
      duration: 'Weeks 2–4',
      items: [
        'Custom React/Next.js frontend development',
        'Backend API and database architecture',
        'Automation engine integration',
        'CRM and third-party connections'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Launch & Optimize',
      duration: 'Week 5+',
      items: [
        'QA testing and performance audits',
        'Go-live deployment and monitoring',
        'Monthly conversion optimization',
        'Ongoing technical support and scaling'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="pt-[140px] pb-[80px] relative overflow-hidden border-b border-line">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/8 blur-[150px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-[780px] mx-auto px-6 text-center relative z-10"
        >
          <div className="w-full text-left">
            <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
              Our Process
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            How we turn ideas into{' '}
            <span className="text-gradient">revenue machines.</span>
          </h1>
          <p className="text-mut text-lg max-w-[580px] mx-auto leading-relaxed">
            A battle-tested, three-phase process that takes you from concept to a fully automated, high-converting digital system.
          </p>
        </motion.div>
      </section>

      <ThreeStepsCards />

      {/* Detailed Timeline */}
      <section className="py-[100px] border-b border-line bg-bg2 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[780px] mx-auto px-6 text-center relative z-10 mb-16">
          <div className="w-full text-left">
            <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
              The Timeline
            </span>
          </div>
          <h2 className="mb-3.5">
            From zero to live in <span className="text-gradient">5 weeks.</span>
          </h2>
        </div>

        <div className="max-w-[900px] mx-auto px-6 relative z-10">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-line hidden md:block" />

          <div className="grid gap-12 md:gap-0">
            {timeline.map((phase, idx) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15, type: 'spring', stiffness: 80 }}
                className={`relative md:grid md:grid-cols-2 md:gap-12 ${idx > 0 ? 'md:mt-16' : ''}`}
              >
                {/* Dot on timeline */}
                <div className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-accent shadow-[0_0_15px_rgba(0,242,254,0.5)] z-10" />
                
                {idx % 2 === 0 ? (
                  <>
                    <div className="md:text-right md:pr-12">
                      <span className="text-accent text-sm font-bold tracking-wide uppercase">{phase.phase} · {phase.duration}</span>
                      <h3 className="text-2xl font-bold mt-2 mb-4">{phase.title}</h3>
                      <ul className="grid gap-3">
                        {phase.items.map((item, i) => (
                          <li key={i} className="text-mut text-[0.95rem] leading-relaxed flex items-start gap-2 md:justify-end">
                            <span className="md:order-2 text-accent/50 mt-1 shrink-0">›</span>
                            <span className="md:order-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="hidden md:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block" />
                    <div className="md:pl-12">
                      <span className="text-accent text-sm font-bold tracking-wide uppercase">{phase.phase} · {phase.duration}</span>
                      <h3 className="text-2xl font-bold mt-2 mb-4">{phase.title}</h3>
                      <ul className="grid gap-3">
                        {phase.items.map((item, i) => (
                          <li key={i} className="text-mut text-[0.95rem] leading-relaxed flex items-start gap-2">
                            <span className="text-accent/50 mt-1 shrink-0">›</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonial1 />
      
      {/* CTA */}
      <section className="text-center bg-[radial-gradient(700px_360px_at_50%_120%,rgba(0,242,254,0.15),transparent_70%)] py-[86px] border-b border-line bg-bg">
        <div className="max-w-[780px] mx-auto px-6 text-center">
          <h2 className="mb-3.5 text-4xl md:text-5xl">
            Ready to get started?<br />
            <span className="text-gradient">Let's map it out.</span>
          </h2>
          <p className="max-w-[580px] mx-auto mt-5 mb-8 text-mut text-[1.1rem]">
            Book a free 15-minute strategy call. We'll review your current setup and show you exactly how the system works for your business.
          </p>
          <Link to="/booking" className="btn-primary inline-block text-lg shadow-[0_0_20px_rgba(0,242,254,0.2)]">
            Book My Free Strategy Call
          </Link>
        </div>
      </section>
    </main>
  );
}
