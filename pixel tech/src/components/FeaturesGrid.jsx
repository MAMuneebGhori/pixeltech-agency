import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from './ui/service-card';

export default function FeaturesGrid() {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showWhatsappOptions, setShowWhatsappOptions] = useState(false);

  const closeModal = () => {
    setSelectedFeature(null);
    setTimeout(() => setShowWhatsappOptions(false), 200); // delay reset so it doesn't jump during exit animation
  };

  const features = [
    {
      icon: '💻',
      title: 'Custom Web Applications',
      desc: 'Bespoke React/Next.js frontends paired with robust Node.js backends. We build software that fits your exact operational needs.',
      tag: 'Full-Stack',
      imgSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
      variant: 'accent'
    },
    {
      icon: '⚡',
      title: '60-Second Lead Response',
      desc: 'Powered by the Pixeltech AI Chatbot. Instant conversational AI response to every new lead, day or night. Speed-to-lead is the #1 driver of conversions.',
      tag: 'Automation',
      imgSrc: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
      variant: 'default'
    },
    {
      icon: '📅',
      title: 'Self-Booking Infrastructure',
      desc: 'Leads pick a slot themselves. Confirmations and reminders go out automatically. Your calendar fills without lifting a finger.',
      tag: 'Conversion',
      imgSrc: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1000&auto=format&fit=crop',
      variant: 'default'
    },
    {
      icon: '🚀',
      title: 'Lightning Performance',
      desc: 'Optimized Core Web Vitals, edge caching, and semantic HTML. Your site loads instantly, dominating SEO and user experience.',
      tag: 'Engineering',
      imgSrc: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
      variant: 'accent'
    },
    {
      icon: '♻️',
      title: 'Lead Reactivation',
      desc: 'We mine your old leads and past inquiries with an automated win-back campaign—generating free revenue from day one.',
      tag: 'Growth',
      imgSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
      variant: 'accent'
    },
    {
      icon: '📊',
      title: 'Dashboard & Analytics',
      desc: 'One clear view of traffic, leads, response times, and bookings. We provide data-driven technical optimization every single month.',
      tag: 'Data',
      imgSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      variant: 'default'
    }
  ];

  return (
    <section className="py-[86px] border-b border-line bg-bg2 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-[22px] relative z-10">
        <div className="text-center mb-[64px] max-w-[600px] mx-auto">
          <div className="w-full text-left">
            <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
              Elite Infrastructure
            </span>
          </div>
          <h2 className="mb-3.5">Built for speed, scale, and conversions.</h2>
          <p className="text-mut text-[1.1rem]">
            We use the same battle-tested tech stack as billion-dollar tech giants to ensure your site is blazing fast and never goes down.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] mt-[48px]">
          {features.map((f, idx) => (
             <ServiceCard
               key={idx}
               title={f.title}
               description={f.desc}
               badge={f.icon}
               imgSrc={f.imgSrc}
               imgAlt={f.title}
               variant={f.variant}
               onClick={() => setSelectedFeature(f.title)}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ delay: idx * 0.1 }}
             />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedFeature && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" 
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card border border-line rounded-2xl p-8 max-w-sm w-full shadow-2xl relative" 
              onClick={e => e.stopPropagation()}
            >
              <button className="absolute top-4 right-4 text-mut hover:text-ink text-xl" onClick={closeModal}>✕</button>
              <h3 className="text-xl font-bold mb-2">Want to learn more?</h3>
              <p className="text-mut text-[0.95rem] mb-6">Select how you'd like to contact us regarding <strong>{selectedFeature}</strong>.</p>
              
              {!showWhatsappOptions ? (
                <div className="grid gap-3.5">
                  <button 
                    onClick={() => navigate(`/booking?service=${encodeURIComponent(selectedFeature)}`)}
                    className="bg-[#00F2FE] hover:bg-[#00D4DF] text-[#05050A] font-bold py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 w-full flex items-center justify-center gap-2.5 shadow-[0_4px_15px_rgba(0,242,254,0.3)]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M4 11.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-2-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5ZM1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14Z"/></svg>
                    Book Me
                  </button>
                  <button 
                    onClick={() => setShowWhatsappOptions(true)}
                    className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 w-full flex items-center justify-center gap-2.5 shadow-[0_4px_15px_rgba(37,211,102,0.3)]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
                    Contact via WhatsApp
                  </button>
                  <a 
                    href={`mailto:info@pixeltech.agency?subject=Inquiry about ${selectedFeature}`} 
                    className="bg-[#1E293B] hover:bg-[#334155] text-white font-bold py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 w-full flex items-center justify-center gap-2.5 shadow-sm"
                    onClick={closeModal}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/></svg>
                    Contact via Email
                  </a>
                </div>
              ) : (
                <div className="grid gap-3.5">
                  <button 
                    onClick={() => setShowWhatsappOptions(false)} 
                    className="text-mut text-[0.9rem] flex items-center gap-1.5 mb-1 hover:text-ink w-fit transition-colors"
                  >
                    <span className="text-[1.2rem] leading-none mb-[2px]">←</span> Back
                  </button>
                  <a 
                    href={`https://wa.me/923336424891?text=${encodeURIComponent(`Hi, I want to learn more about ${selectedFeature}.`)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 w-full text-center flex items-center justify-center gap-2.5 shadow-sm"
                    onClick={closeModal}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
                    Rep 1: 0333 6424891
                  </a>
                  <a 
                    href={`https://wa.me/923118527408?text=${encodeURIComponent(`Hi, I want to learn more about ${selectedFeature}.`)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 w-full text-center flex items-center justify-center gap-2.5 shadow-sm"
                    onClick={closeModal}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
                    Rep 2: 0311 8527408
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
