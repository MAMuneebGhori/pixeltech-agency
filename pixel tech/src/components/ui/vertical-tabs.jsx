import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    id: "01",
    title: "Under 60-Second Response",
    description: "When a new lead fills out a form on your website or Facebook ad, our system detects it instantly. Within 60 seconds, it sends a personalized, conversational SMS and Email to the lead.",
    image: "/step1.png",
  },
  {
    id: "02",
    title: "AI Qualification",
    description: "The system engages the lead in a natural conversation to answer basic questions, pre-qualify their needs, and guide them towards booking a consultation.",
    image: "/step2.png",
  },
  {
    id: "03",
    title: "Automated Booking",
    description: "Leads are provided a direct link to your calendar. They pick a time that works for them without you or your front desk having to play phone tag.",
    image: "/step3.png",
  },
  {
    id: "04",
    title: "Missed Call Text-Back",
    description: "If your clinic misses a call during a busy rush or after hours, the system immediately texts the caller: 'Hi, we just missed your call! How can we help you today?'",
    image: "/step4.png",
  },
  {
    id: "05",
    title: "No-Show Prevention",
    description: "Automated email and SMS reminders are sent 24 hours and 1 hour before the appointment, drastically reducing your no-show rate.",
    image: "/step5.png",
  }
];

const AUTO_PLAY_DURATION = 5000;

export default function VerticalTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SERVICES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  }, []);

  const handleTabClick = (index) => {
    if (index === activeIndex) return;
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

  return (
    <section className="w-full bg-transparent py-8 md:py-16 lg:py-24">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="space-y-1 mb-12 md:mb-16">
          <h2 className="tracking-tighter text-balance text-3xl font-medium md:text-4xl lg:text-5xl text-ink">
            How It Works
          </h2>
          <span className="text-[10px] font-medium text-accent uppercase tracking-[0.3em] block ml-0.5">
            (OUR SYSTEM)
          </span>
        </div>

        {/* Steps List */}
        <div className="flex flex-col">
          {SERVICES.map((service, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={service.id}
                onClick={() => handleTabClick(index)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className={cn(
                  "group relative cursor-pointer border-t border-line/30 transition-all duration-500",
                  index === SERVICES.length - 1 && "border-b border-line/30"
                )}
              >
                {/* Progress bar on the left edge */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-line/20">
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

                {/* Step content row */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 py-6 md:py-8 pl-6 md:pl-8">
                  {/* Left: Step number + Text */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <span className="text-[10px] md:text-xs font-medium mt-1 tabular-nums text-accent/60 shrink-0">
                      /{service.id}
                    </span>

                    <div className="flex flex-col gap-1.5 flex-1">
                      <span
                        className={cn(
                          "text-xl md:text-2xl lg:text-3xl font-bold tracking-tight transition-colors duration-500",
                          isActive ? "text-ink" : "text-mut group-hover:text-ink"
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
                              duration: 0.35,
                              ease: [0.23, 1, 0.32, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="text-mut text-sm md:text-base font-normal leading-relaxed max-w-md pb-1 mt-1">
                              {service.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Right: Image — shown next to the active step */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92, width: 0 }}
                        animate={{ opacity: 1, scale: 1, width: "auto" }}
                        exit={{ opacity: 0, scale: 0.92, width: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                        className="shrink-0 overflow-hidden"
                      >
                        <div className="w-full lg:w-[320px] xl:w-[380px] aspect-video rounded-2xl overflow-hidden border border-line/30 shadow-xl bg-card">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#05050A]/60 to-transparent" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-card/80 backdrop-blur-md border border-line/50 flex items-center justify-center text-ink hover:bg-bg hover:border-accent/50 transition-all active:scale-90"
            aria-label="Previous step"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-card/80 backdrop-blur-md border border-line/50 flex items-center justify-center text-ink hover:bg-bg hover:border-accent/50 transition-all active:scale-90"
            aria-label="Next step"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
