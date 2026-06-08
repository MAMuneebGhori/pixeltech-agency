import React, { useId, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { CheckCheck, Zap } from "lucide-react";
import { TimelineContent } from "./ui/timeline-animation";
import { VerticalCutReveal } from "./ui/vertical-cut-reveal";
import { cn } from "../lib/utils";

const PricingSwitch = ({
  button1,
  button2,
  onSwitch,
  className,
  layoutId,
}) => {
  const [selected, setSelected] = useState("0");
  const uniqueId = useId();
  const switchLayoutId = layoutId || `switch-${uniqueId}`;

  const handleSwitch = (value) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div
      className={cn(
        "relative z-10 w-full flex rounded-full bg-bg2 border border-line p-1 shadow-inner",
        className,
      )}
    >
      <button
        onClick={() => handleSwitch("0")}
        className={cn(
          "relative z-10 w-full sm:h-14 h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors outline-none",
          selected === "0"
            ? "text-ink"
            : "text-mut hover:text-ink",
        )}
      >
        {selected === "0" && (
          <motion.span
            layoutId={switchLayoutId}
            className="absolute top-0 left-0 sm:h-14 h-10 w-full rounded-full border border-line shadow-md bg-card"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative">{button1}</span>
      </button>

      <button
        onClick={() => handleSwitch("1")}
        className={cn(
          "relative z-10 w-full sm:h-14 h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors outline-none",
          selected === "1"
            ? "text-ink"
            : "text-mut hover:text-ink",
        )}
      >
        {selected === "1" && (
          <motion.span
            layoutId={switchLayoutId}
            className="absolute top-0 left-0 sm:h-14 h-10 w-full rounded-full border border-line shadow-md bg-card"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative flex justify-center items-center gap-2">
          {button2}
        </span>
      </button>
    </div>
  );
};

export default function PricingSection() {
  const [hasLandingPage, setHasLandingPage] = useState(false);
  const pricingRef = useRef(null);

  const revealVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.3,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const timelineVaraints = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const toggleLandingPage = (value) =>
    setHasLandingPage(parseInt(value) === 1);

  const currentPrice = hasLandingPage ? 2500 : 1500;
  const originalPrice = hasLandingPage ? 3800 : 2500;

  const features = [
    "Custom Full-Stack Web Architecture",
    "Booked Solid Follow-up Automation",
    "Self-Booking Calendar Infrastructure",
    "Missed-Call Text-Back System",
    "Lead Reactivation Workflows",
    hasLandingPage ? "High-Converting Landing Page" : "Core System Integration",
    hasLandingPage ? "Premium Web Hosting & SSL" : "Standard Cloud Setup",
    "24/7 Technical Support",
  ];

  return (
    <div className="w-full min-h-screen relative border-b border-line bg-bg overflow-hidden" ref={pricingRef}>
      <div className="pt-24 pb-16 px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <TimelineContent
            as="div"
            animationNum={0}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="flex items-center justify-center mb-6"
          >
            <Zap className="h-5 w-5 text-accent fill-accent mr-2" />
            <span className="text-accent font-bold tracking-[0.15em] uppercase">The Solution</span>
          </TimelineContent>

          <h1 className="md:text-5xl sm:text-4xl text-3xl font-extrabold text-ink mb-6 leading-[1.2] tracking-tight">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.15}
              staggerFrom="first"
              reverse={true}
              containerClassName="justify-center"
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 40,
                delay: 0.4,
              }}
            >
              Enterprise engineering. Accessible.
            </VerticalCutReveal>
          </h1>

          <TimelineContent
            as="p"
            animationNum={1}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="text-lg md:text-xl text-mut max-w-2xl mx-auto"
          >
            Stop piecing together disparate tools. Get a unified, scalable system that converts traffic into booked appointments.
          </TimelineContent>
        </div>
      </div>

      {/* Product Features */}
      <div className="px-4 pb-24 relative z-10">
        <div className="max-w-5xl mx-auto bg-bg2 border border-line rounded-[2rem] p-8 md:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 md:gap-16 gap-10 items-start">
            <div>
              <TimelineContent
                as="h3"
                animationNum={2}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="text-3xl font-extrabold text-ink mb-8"
              >
                What's included
              </TimelineContent>

              <div className="space-y-5">
                {features.map((feature, index) => (
                  <TimelineContent
                    key={index}
                    as="div"
                    animationNum={3 + index}
                    timelineRef={pricingRef}
                    customVariants={timelineVaraints}
                    className="flex items-center"
                  >
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mr-4 shrink-0">
                      <CheckCheck className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <span className="text-mut font-medium">{feature}</span>
                  </TimelineContent>
                ))}
              </div>
            </div>

            <div className="space-y-10 lg:pl-8 lg:border-l border-line">
              <TimelineContent
                as="div"
                animationNum={3}
                timelineRef={pricingRef}
                customVariants={revealVariants}
              >
                <h4 className="font-bold text-ink mb-2 text-lg">
                  Optional Add-on
                </h4>
                <p className="text-sm text-mut mb-4">
                  Need a website? We'll build a high-converting landing page optimized for lead capture.
                </p>
                <PricingSwitch
                  button1="Core System"
                  button2="+ Landing Page"
                  onSwitch={toggleLandingPage}
                  className="grid grid-cols-2 w-full"
                />
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={5}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="pt-6 border-t border-line"
              >
                <div className="flex flex-col mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold text-ink tracking-tight flex items-center">
                      $1,250
                    </span>
                    <span className="text-xl text-mut font-medium relative before:content-[''] before:absolute before:-left-1 before:-right-1 before:top-1/2 before:-translate-y-1/2 before:h-0.5 before:bg-mut before:z-10">
                      $2,000
                    </span>
                    <span className="text-xl text-mut font-medium ml-1">
                      setup
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-bold text-accent tracking-tight">
                      +$650
                    </span>
                    <span className="text-mut font-medium">
                      /mo to run & optimize
                    </span>
                  </div>

                  {hasLandingPage && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                      className="flex items-baseline pt-4 border-t border-line/50"
                    >
                      <span className="text-lg text-mut font-medium relative before:content-[''] before:absolute before:-left-1 before:-right-1 before:top-1/2 before:-translate-y-1/2 before:h-0.5 before:bg-mut before:z-10 mr-2">
                        $1,500
                      </span>
                      <span className="text-2xl font-bold text-ink tracking-tight mr-2">
                        +$1,000
                      </span>
                      <span className="text-sm text-mut font-medium uppercase tracking-wider">
                        One-time for Landing Page
                      </span>
                    </motion.div>
                  )}
                </div>
                
                <Link to={`/booking?service=${hasLandingPage ? 'core_and_landing_page' : 'core'}`} className="block w-full">
                  <TimelineContent
                    as="button"
                    animationNum={6}
                    timelineRef={pricingRef}
                    customVariants={revealVariants}
                    className="btn-primary w-full h-14 rounded-xl font-bold tracking-wider uppercase text-sm"
                  >
                    Book a Technical Audit
                  </TimelineContent>
                </Link>
                <p className="text-center text-xs text-mut mt-4">No hidden fees. Full ownership.</p>
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
