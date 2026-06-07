import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TestimonialsGrid from '../components/TestimonialsGrid';

export default function Testimonials() {
  const stats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '2x', label: 'Avg. Lead Increase' },
    { value: '<60s', label: 'Lead Response Time' },
    { value: '98%', label: 'Client Retention' },
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
              Real Results
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Don't take our word for it.{' '}
            <span className="text-gradient">See the proof.</span>
          </h1>
          <p className="text-mut text-lg max-w-[580px] mx-auto leading-relaxed">
            Hear directly from the businesses we've helped scale with custom-engineered web applications and automation systems.
          </p>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="bg-bg2 border-b border-line py-12">
        <div className="max-w-[1080px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-2">{stat.value}</div>
                <div className="text-mut text-sm uppercase tracking-wider font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsGrid />

      {/* CTA */}
      <section className="text-center bg-[radial-gradient(700px_360px_at_50%_120%,rgba(0,242,254,0.15),transparent_70%)] py-[86px] border-b border-line bg-bg">
        <div className="max-w-[780px] mx-auto px-6 text-center">
          <h2 className="mb-3.5 text-4xl md:text-5xl">
            Ready to be the next<br />
            <span className="text-gradient">success story?</span>
          </h2>
          <p className="max-w-[580px] mx-auto mt-5 mb-8 text-mut text-[1.1rem]">
            Let's talk about what Pixeltech can build for your business. No obligation — just a conversation.
          </p>
          <Link to="/booking" className="btn-primary inline-block text-lg shadow-[0_0_20px_rgba(0,242,254,0.2)]">
            Book My Strategy Call
          </Link>
        </div>
      </section>
    </main>
  );
}
