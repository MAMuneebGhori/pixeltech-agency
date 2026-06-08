import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    id: "01",
    title: "Under 60-Second Response",
    description: "When a new lead fills out a form on your website or Facebook ad, our system detects it instantly. Within 60 seconds, it sends a personalized, conversational SMS and Email to the lead.",
    image: "/step_1.png",
  },
  {
    id: "02",
    title: "AI Qualification",
    description: "The system engages the lead in a natural conversation to answer basic questions, pre-qualify their needs, and guide them towards booking a consultation.",
    image: "/step_2.png",
  },
  {
    id: "03",
    title: "Automated Booking",
    description: "Leads are provided a direct link to your calendar. They pick a time that works for them without you or your front desk having to play phone tag.",
    image: "/step_3.png",
  },
  {
    id: "04",
    title: "Missed Call Text-Back",
    description: "If your clinic misses a call during a busy rush or after hours, the system immediately texts the caller: 'Hi, we just missed your call! How can we help you today?'",
    image: "/step_4.png",
  },
  {
    id: "05",
    title: "No-Show Prevention",
    description: "Automated email and SMS reminders are sent 24 hours and 1 hour before the appointment, drastically reducing your no-show rate.",
    image: "/step_5.png",
  }
];

const AUTO_PLAY_DURATION = 5000;

export default function VerticalTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % SERVICES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  }, []);

  const handleTabClick = (index) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DURATION);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext]);

  const variants = {
    enter: (direction) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section className="w-full bg-bg py-8 md:py-16 lg:py-24">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Content */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4">
            <div className="space-y-1 mb-12">
              <h2 className="tracking-tighter text-balance text-3xl font-medium md:text-4xl lg:text-5xl text-ink">
                How It Works
              </h2>
              <span className="text-[10px] font-medium text-accent uppercase tracking-[0.3em] block ml-0.5">
                (OUR SYSTEM)
              </span>
            </div>

            <div className="flex flex-col space-y-0">
              {SERVICES.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex items-start gap-4 py-6 md:py-8 text-left transition-all duration-500 border-t border-line/50 first:border-0",
                      isActive
                        ? "text-ink"
                        : "text-mut hover:text-ink"
                    )}
                  >
                    <div className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[2px] bg-line/50">
                      {isActive && (
                        <motion.div
                          key={`progress-${index}-${isPaused}`}
                          className="absolute top-0 left-0 w-full bg-accent origin-top shadow-[0_0_10px_rgba(0,242,254,0.5)]"
                          initial={{ height: "0%" }}
                          animate={
                            isPaused ? { height: "0%" } : { height: "100%" }
                          }
                          transition={{
                            duration: AUTO_PLAY_DURATION / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                    </div>

                    <span className="text-[9px] md:text-[10px] font-medium mt-1 tabular-nums opacity-50 text-accent">
                      /{service.id}
                    </span>

                    <div className="flex flex-col gap-2 flex-1">
                      <span
                        className={cn(
                          "text-xl md:text-2xl lg:text-3xl font-bold tracking-tight transition-colors duration-500",
                          isActive ? "text-ink" : "text-mut"
                        )}
                      >
                        {service.title}
                      </span>

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.23, 1, 0.32, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="text-mut text-sm md:text-base font-normal leading-relaxed max-w-sm pb-2 mt-2">
                              {service.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-end h-full order-1 lg:order-2">
            <div
              className="relative group/gallery"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative aspect-4/5 md:aspect-4/3 lg:aspect-16/11 rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-card border border-line/40 shadow-2xl">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="popLayout"
                >
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      y: { type: "spring", stiffness: 260, damping: 32 },
                      opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={handleNext}
                  >
                    <img
                      src={SERVICES[activeIndex].image}
                      alt={SERVICES[activeIndex].title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 m-0! p-0! block"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#05050A]/80 via-transparent to-transparent opacity-60" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/80 backdrop-blur-md border border-line/50 flex items-center justify-center text-ink hover:bg-bg transition-all active:scale-90"
                    aria-label="Previous"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/80 backdrop-blur-md border border-line/50 flex items-center justify-center text-ink hover:bg-bg transition-all active:scale-90"
                    aria-label="Next"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
