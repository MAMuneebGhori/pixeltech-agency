import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThreeStepsCards() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showWhatsappOptions, setShowWhatsappOptions] = useState(false);

  const closeModal = () => {
    setSelectedFeature(null);
    setTimeout(() => setShowWhatsappOptions(false), 200);
  };

  const steps = [
    {
      num: '1',
      title: 'Custom Full-Stack Build',
      desc: 'We engineer a blazing-fast, custom web application tailored specifically to your business needs, built on modern frameworks like React and Next.js.'
    },
    {
      num: '2',
      title: 'Automation Engine',
      desc: 'We integrate the Pixeltech AI Chatbot directly into your architecture. Every lead is instantly engaged, qualified, and pushed into your CRM.'
    },
    {
      num: '3',
      title: 'Scale & Optimize',
      desc: 'With your technical foundation set and leads converting automatically, we provide ongoing monthly optimization to scale your traffic and bookings.'
    }
  ];

  return (
    <section className="py-[86px] border-b border-line bg-bg">
      <div className="max-w-[780px] mx-auto px-[22px] text-center">
        <div className="w-full text-left">
          <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
            How It Works
          </span>
        </div>
        <h2 className="mb-3.5">
          Engineering meets <span className="text-gradient">Conversion.</span>
        </h2>
        <p className="max-w-[560px] mx-auto text-mut">
          We don't just build websites. We build scalable digital systems.
        </p>
      </div>

      <div className="max-w-[1080px] mx-auto px-[22px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mt-[44px] items-start">
          {steps.map((step, idx) => (
            <motion.div 
              key={step.num} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,242,254,0.1)' }}
              className="bg-[#05080F] hover:bg-[#0F172A] border border-white/5 hover:border-accent/40 rounded-3xl p-[32px] relative group transition-all duration-500 ease-out flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,242,254,0.08)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none" />
              <h3 className="text-[1.35rem] font-bold relative z-10 text-center text-white/90 group-hover:text-white transition-colors duration-500">{step.title}</h3>
              
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out relative z-10 w-full">
                <div className="overflow-hidden flex flex-col">
                  <p className="text-mut text-[1.05rem] leading-relaxed mt-4 text-center">{step.desc}</p>
                  
                  <div className="mt-6 pt-6 border-t border-line/50">
                    <button 
                      onClick={() => setSelectedFeature(step.title)}
                      className="w-full text-center text-[0.95rem] text-ink font-bold hover:text-accent transition-colors flex items-center justify-center gap-2"
                    >
                      Learn more 
                      <span className="text-lg leading-none">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
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
