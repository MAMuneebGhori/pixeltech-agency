'use client'

import React, { useRef } from "react";
import { TimelineContent } from "./timeline-animation";
import { VerticalCutReveal } from "./vertical-cut-reveal";
import { ArrowRight } from "lucide-react";

export default function AboutSection1() {
  const heroRef = useRef(null);
  
  const revealVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 40,
      opacity: 0,
    },
  };
  
  const revealVariants2 = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -40,
      opacity: 0,
    },
  };
  
  const revealVariants3 = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: {
      opacity: 0,
    },
  };
  
  return (
    <section
      className="relative py-[120px] px-6 bg-bg2 overflow-hidden border-b border-line"
      ref={heroRef}
    >
      {/* Ambient Glow Background */}
      <TimelineContent
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(800px 400px at 50% 100%, rgba(0, 242, 254, 0.08) 0%, transparent 100%)`,
        }}
        animationNum={2}
        customVariants={revealVariants3}
        timelineRef={heroRef}
      />
      <TimelineContent
        className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,#000_70%,transparent_110%)] pointer-events-none"
        animationNum={3}
        customVariants={revealVariants3}
        timelineRef={heroRef}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-[800px] mx-auto text-center">
        <div className="text-accent text-sm font-bold tracking-wider uppercase mb-6 flex items-center justify-center gap-2">
          About Our Core
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink mb-6">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.2}
            staggerFrom="last"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 30,
              delay: 0.2,
            }}
            containerClassName="text-ink leading-[120%] text-center justify-center items-center"
          >
            A Legacy of Excellence. How Our Dedication Fuels Everything We Do
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          customVariants={revealVariants}
          timelineRef={heroRef}
          className="text-mut text-center sm:text-lg text-base mb-10 leading-relaxed max-w-[640px] mx-auto"
        >
          From day one, our mission has been to create solutions that inspire,
          empower, and make a difference. We engineer success with a commitment to unyielding quality and creativity.
        </TimelineContent>

        <TimelineContent
          as="a"
          href="/services"
          animationNum={1}
          customVariants={revealVariants3}
          timelineRef={heroRef}
          className="btn-primary inline-flex items-center w-fit mx-auto gap-2 hover:gap-3 transition-all duration-300 ease-in-out cursor-pointer shadow-[0_0_20px_rgba(0,242,254,0.3)]"
        >
          Explore Our Services <ArrowRight className="w-5 h-5" />
        </TimelineContent>
      </div>
    </section>
  );
}
