import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import TestimonialsGrid from '../components/TestimonialsGrid';
import Booking from './Booking';
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

      {/* Rest of the content has been moved to dedicated pages */}

      <div id="booking-section">
        <Booking />
      </div>
    </main>
  );
}
