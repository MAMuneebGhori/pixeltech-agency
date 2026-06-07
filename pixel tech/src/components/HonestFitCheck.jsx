import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, X } from 'lucide-react';

export default function HonestFitCheck() {
  return (
    <section className="py-[120px] border-b border-line bg-bg relative overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[780px] mx-auto px-[22px] text-center mb-[64px] relative z-10">
        <div className="w-full text-left">
          <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
            Who We Work With
          </span>
        </div>
        <h2 className="mb-3.5 text-4xl md:text-5xl font-extrabold tracking-tight text-white">We don't take everyone.</h2>
        <p className="text-mut text-lg">Our systems are built exclusively for businesses ready to scale.</p>
      </div>

      <div className="max-w-[1080px] mx-auto px-[22px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          
          {/* Negative Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="group relative bg-[#050505] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden"
          >
            {/* Subtle red hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-white font-bold text-2xl tracking-tight">Not for you if...</h3>
            </div>
            
            <ul className="grid gap-5 list-none p-0">
              {[
                "You just want a cheap $500 WordPress template.",
                "You aren't running ads or driving traffic to your site.",
                "You don't have the operational capacity to handle more bookings/leads.",
                "You prefer doing manual follow-up via spreadsheet."
              ].map((text, i) => (
                <li key={i} className="flex gap-4 items-start text-mut group/item">
                  <X className="w-5 h-5 text-red-500/40 shrink-0 mt-0.5 group-hover/item:text-red-500/80 transition-colors" />
                  <span className="text-[1.05rem] leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Positive Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: 'spring', delay: 0.1 }}
            className="group relative bg-[#050505] border border-accent/20 rounded-3xl p-8 md:p-10 shadow-[0_0_40px_rgba(0,242,254,0.05)] overflow-hidden"
          >
            {/* Accent hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 border border-accent/30 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-white font-bold text-2xl tracking-tight">Perfect for you if...</h3>
            </div>
            
            <ul className="grid gap-5 list-none p-0 relative z-10">
              {[
                "You need a robust, custom full-stack web application.",
                "You know you are losing paid leads to slow response times.",
                "You value clean code, high performance, and SEO optimization.",
                "You want a unified system where engineering directly drives revenue."
              ].map((text, i) => (
                <li key={i} className="flex gap-4 items-start text-white/90 group/item">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]" />
                  <span className="text-[1.05rem] leading-snug font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
