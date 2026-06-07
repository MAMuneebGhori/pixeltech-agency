import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSolutionSection from '../components/AnimatedSolutionSection';
import FeaturesGrid from '../components/FeaturesGrid';
import FinalCtaSection from '../components/FinalCtaSection';

export default function Services() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Services Hero */}
      <section className="pt-[140px] pb-[80px] relative overflow-hidden border-b border-line">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(800px_400px_at_50%_0%,rgba(0,242,254,0.12),transparent_70%)] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-[780px] mx-auto px-6 text-center relative z-10"
        >
          <div className="w-full text-left">
            <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
              Our Services
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Everything you need to{' '}
            <span className="text-gradient">dominate online.</span>
          </h1>
          <p className="text-mut text-lg max-w-[580px] mx-auto leading-relaxed">
            From custom full-stack web applications to fully automated lead-capture systems — we engineer digital infrastructure that scales your business.
          </p>
          <div className="mt-10">
            <Link to="/booking" className="btn-primary inline-block px-8 py-4 text-lg">
              Get Started
            </Link>
          </div>
        </motion.div>
      </section>

      <AnimatedSolutionSection />
      <FeaturesGrid />
      <FinalCtaSection />
    </main>
  );
}
