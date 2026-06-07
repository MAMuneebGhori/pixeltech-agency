import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ArrowDown, ArrowUp, Code2, Zap, Server, TrendingUp } from "lucide-react";

export default function Testimonial1() {
  const [hoveredImage, setHoveredImage] = useState(null);

  const stats = [
    {
      percentage: "100%",
      label: "custom architecture",
      isIncrease: true,
      icon: <Code2 className="w-auto h-6 object-contain mx-auto translate-y-0 group-hover:-translate-y-8 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out text-mut" />,
    },
    {
      percentage: "3x",
      label: "faster load times",
      isIncrease: true,
      icon: <Zap className="w-auto h-6 object-contain mx-auto translate-y-0 group-hover:-translate-y-8 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out text-mut" />,
    },
    {
      percentage: "24/7",
      label: "lead capture",
      isIncrease: true,
      icon: <Server className="w-auto h-6 object-contain mx-auto translate-y-0 group-hover:-translate-y-8 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out text-mut" />,
    },
    {
      percentage: "10x",
      label: "conversion rate",
      isIncrease: true,
      icon: <TrendingUp className="w-auto h-6 object-contain mx-auto translate-y-0 group-hover:-translate-y-8 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out text-mut" />,
    },
  ];

  return (
    <div className="bg-bg w-full py-24 px-6 md:px-12 relative overflow-hidden cursor-default">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1080px] mx-auto relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        
        {/* Left Side: Straight Text Label */}
        <div className="w-full lg:w-1/4 shrink-0">
          <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block">
            Performance Promise
          </span>
        </div>

        {/* Right Side: Paragraphs and Stats */}
        <div className="w-full lg:w-3/4 flex flex-col">
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-ink mb-6 leading-tight select-none">
            Engineering that actually delivers.
          </h2>
          
          <p className="text-[1.05rem] md:text-lg text-mut leading-relaxed mb-12 select-none">
            We don't hand over a codebase and disappear. We build your custom full-stack architecture, integrate the automation engine, and ensure it actively captures and converts leads. We partner with you for the long term.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-bg2 border border-line rounded-xl p-4 md:p-5 shadow-2xl relative z-10 select-none">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center text-center group cursor-pointer relative"
              >
                {/* Separator line for desktop */}
                {index !== 0 && (
                  <div className="hidden sm:block w-[1px] h-8 bg-line absolute -left-2 top-1/2 -translate-y-1/2" />
                )}
                
                {/* Icon wrapper */}
                <div className="h-8 w-full flex items-center justify-center mb-1 group-hover:-translate-y-1 group-hover:opacity-0 transition-all duration-300">
                  {stat.icon}
                </div>
                
                {/* Hover stats reveal */}
                <div className="absolute top-0 opacity-0 flex flex-col items-center justify-center w-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center justify-center gap-1 relative">
                    {stat.isIncrease ? (
                      <ArrowUp className="w-3 h-3 text-accent" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-accent" />
                    )}
                    <span className="text-lg md:text-xl font-bold text-ink leading-none">
                      {stat.percentage}
                    </span>
                  </div>
                  <p className="text-mut text-[0.6rem] md:text-[0.65rem] uppercase tracking-wider font-semibold mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}
