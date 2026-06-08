import React, { useState, useEffect } from 'react';
import ChatMockup from './ChatMockup';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const catchphrases = [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 20 } 
    }
  };

  const h1Variants = {
    hidden: { opacity: 0, filter: 'blur(12px)' },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: 'easeOut' } 
    }
  };

  const marqueeItems = [
    "⚡ Reply in under 60 seconds",
    "📅 Auto-booking calendar",
    "🔔 No-show reminders",
    "📞 Missed-call text-back",
    "♻️ Lead reactivation",
    "✅ Live in ~7 days"
  ];
  
  // Double the array to ensure seamless looping
  const loopedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section className="pt-[20px] lg:pt-[40px] pb-0 bg-[radial-gradient(900px_480px_at_0%_0%,rgba(0,242,254,0.15),transparent_70%)] border-b border-line relative overflow-hidden">
      
      {/* Background Abstract Image */}
      <div className="absolute top-0 right-0 w-full max-w-[1000px] h-full opacity-20 pointer-events-none -z-10 mix-blend-screen translate-x-1/4">
        <img src="/hero_abstract.png" alt="" className="w-full h-full object-cover object-top mask-image-gradient" style={{ WebkitMaskImage: 'linear-gradient(to left, black 20%, transparent 100%)' }} />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start pb-[80px]">
          
          {/* Left Column: Text Content */}
          <motion.div 
            className="text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge removed as requested */}
            
            <motion.h1 variants={h1Variants} className="mb-6 text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[3.2rem] font-extrabold leading-[1.3] tracking-tight">
              <span className="block mb-2">
                Turn the leads your clinic already pays for into <span className="text-gradient">booked appointments.</span>
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-[0.95rem] md:text-[1.05rem] max-w-[580px] mt-6 mb-10 text-mut leading-relaxed text-justify">
              PixelTech installs an automated system for Med Spas & Clinics that follows up with every lead in under 60 seconds and books them straight into your calendar. Stop losing leads to slow follow-up.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <Link to="/booking" className="btn-primary inline-block px-8 py-4 text-lg">
                Book My Free Lead-Leak Audit
              </Link>
              <span className="block text-[0.85rem] text-mut mt-3 font-medium">
                See exactly where you're losing leads — in a free 15-min call.
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column: Chat Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 80, damping: 20 }}
            className="relative w-full flex justify-center lg:justify-end lg:-mt-10 xl:-mt-16"
          >
            {/* Soft glow behind the mockup */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[rgba(0,242,254,0.15)] blur-[100px] rounded-full pointer-events-none -z-10" />
            
            <div className="w-full max-w-[450px] lg:max-w-[420px] transform lg:scale-95 origin-center lg:origin-right">
              <ChatMockup />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-width Infinite Marquee Line */}
      <div className="w-full border-t border-line/50 bg-[#05050A]/80 backdrop-blur-md py-4 overflow-hidden relative">
        {/* Gradients on edges to fade out marquee */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#05050A] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#05050A] to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex whitespace-nowrap gap-6 w-max"
          animate={{ x: ["0%", "-33.333333%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {loopedItems.map((text, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="text-[0.85rem] text-ink font-bold tracking-wide uppercase px-5 py-2 bg-card border border-line rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                {text}
              </span>
              <span className="text-accent/30 text-xl">•</span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
