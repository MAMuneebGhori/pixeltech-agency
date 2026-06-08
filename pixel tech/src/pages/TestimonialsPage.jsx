import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function TestimonialsPage() {
  const testimonials = [
    {
      quote: "We were spending thousands on ads every month, but leads would sit for hours before anyone replied. After PixelTech installed the system, every lead started getting an immediate response, even after business hours. Our booking rate doubled in the first 30 days.",
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop",
      name: "Dr. Sarah Jenkins",
      role: "Owner, Lumina Med Spa",
      metric: "+104% Bookings"
    },
    {
      quote: "The biggest issue we had was no-shows and endless phone tag. Since launching the automated follow-up and booking infrastructure, our front desk is no longer stressed out. Patients book themselves online, and the automatic reminders have cut our no-shows down to almost zero.",
      src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=250&auto=format&fit=crop",
      name: "Michael Chen",
      role: "Director, Revive Aesthetics",
      metric: "98% Show Rate"
    },
    {
      quote: "We've tried three different marketing agencies before, and all they did was send us raw leads that we couldn't close. PixelTech is the only one that actually built the system to follow up with them automatically. I literally wake up to new appointments on my calendar.",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop",
      name: "Jessica Alvarez",
      role: "Founder, Glow Clinic",
      metric: "24/7 Automated Booking"
    },
    {
      quote: "The missed-call text-back feature alone paid for the entire setup in the first week. We had a client call while we were with another patient, and the system instantly texted them. They replied, got qualified by the AI, and booked a $1,200 package before we even finished our treatment.",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop",
      name: "David Rossi",
      role: "Partner, Elite Wellness",
      metric: "$1,200 Saved in Week 1"
    }
  ];

  return (
    <main className="min-h-screen pt-[120px] pb-[80px] bg-bg relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full pointer-events-none translate-x-1/2" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-[0.65rem] tracking-[0.18em] uppercase text-accent border border-accent/20 rounded-full px-3.5 py-1.5 mb-6 bg-accent/5">
            <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
            Client Success Stories
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Don't Just Take <span className="text-gradient">Our Word For It.</span>
          </h1>
          <p className="text-mut text-[1.1rem] md:text-[1.2rem] leading-relaxed max-w-[650px] mx-auto">
            See how Med Spas and Clinics are transforming their lead flow, stopping leakage, and booking their calendars solid.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0B1120]/80 backdrop-blur-xl border border-line p-8 rounded-3xl hover:border-accent/40 hover:shadow-[0_0_30px_rgba(0,242,254,0.15)] transition-all duration-300 flex flex-col"
            >
              {/* Stars & Metric */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="text-[0.7rem] font-bold uppercase tracking-wider bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">
                  {t.metric}
                </div>
              </div>

              {/* Quote */}
              <p className="text-[1.05rem] text-ink leading-relaxed mb-8 flex-grow">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-line/50">
                <img src={t.src} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-accent/20" />
                <div>
                  <h4 className="font-bold text-ink">{t.name}</h4>
                  <p className="text-mut text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/booking" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
            Get Results Like These
          </Link>
        </div>

      </div>
    </main>
  );
}
