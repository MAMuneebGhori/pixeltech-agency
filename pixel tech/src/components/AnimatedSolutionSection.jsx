import React from 'react';
import { motion } from 'framer-motion';
import { CardStack } from './ui/card-stack';

const items = [
  {
    id: 1,
    title: "The 96% Problem",
    description: "Most visitors leave basic websites without taking action. You need a system that converts.",
    imageSrc: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Custom Web App",
    description: "Built exactly for your business logic. Not a generic template glued together with plugins.",
    imageSrc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Instant Automation",
    description: "Every new lead gets an automated reply in seconds. We never miss an opportunity.",
    imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Calendar Filling",
    description: "Your calendar fills itself automatically while you focus completely on your operations.",
    imageSrc: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Scalable Architecture",
    description: "Lightning-fast load speeds that Google loves, ready to grow right alongside your business.",
    imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  },
];

export default function AnimatedSolutionSection() {
  return (
    <section className="py-[86px] border-b border-line bg-bg relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-[22px] relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-[780px] mx-auto px-6 text-center relative z-10"
        >
          <div className="w-full text-left">
            <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
              The Pixeltech Advantage
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            Stop losing leads to slow websites. <span className="text-gradient">Start closing them 24/7.</span>
          </h2>
        </motion.div>

        <div className="w-full flex justify-center mt-[60px]">
          <div className="w-full max-w-[600px] flex justify-center">
            <CardStack
              items={items}
              initialIndex={0}
              cardWidth={340}
              cardHeight={460}
              autoAdvance
              intervalMs={3000}
              pauseOnHover={false}
              showDots
            />
          </div>
        </div>
        
      </div>
    </section>
  );
}
