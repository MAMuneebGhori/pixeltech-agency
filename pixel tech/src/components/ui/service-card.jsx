import * as React from "react";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "../../lib/utils";

// CVA for card variants
const cardVariants = cva(
  "relative flex flex-col justify-between w-full p-4 lg:p-5 overflow-hidden rounded-xl shadow-sm transition-shadow duration-300 ease-in-out group hover:shadow-xl border border-line",
  {
    variants: {
      variant: {
        default: "bg-card text-ink",
        red: "bg-red-950/20 text-white border-red-900/30",
        blue: "bg-blue-950/20 text-white border-blue-900/30",
        gray: "bg-secondary text-white border-white/5",
        accent: "bg-[rgba(0,242,254,0.03)] text-white border-[rgba(0,242,254,0.1)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const ServiceCard = React.forwardRef(
  ({ className, variant, title, description, badge, onClick, imgSrc, imgAlt, ...props }, ref) => {
    
    const buttonRef = React.useRef(null);

    const handleMouseMove = (e) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      buttonRef.current.style.setProperty('--x', `${x}px`);
      buttonRef.current.style.setProperty('--y', `${y}px`);
    };

    // Animation variants for Framer Motion
    const cardAnimation = {
      hover: {
        scale: 1.02,
        transition: { duration: 0.3 },
      },
    };

    const imageAnimation = {
      hover: {
        scale: 1.15,
        rotate: -5,
        x: -10,
        y: -10,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    };
    
    const arrowAnimation = {
        hover: {
            x: 5,
            transition: { duration: 0.4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
        }
    };

    return (
      <motion.div
        className={cn(cardVariants({ variant, className }))}
        ref={ref}
        variants={cardAnimation}
        whileHover="hover"
        {...props}
      >
        <div className="relative z-10 flex flex-col h-full pointer-events-none">
          <h3 className="text-[1.1rem] font-bold tracking-tight mb-1 text-white">{title}</h3>
          
          {description && (
             <p className="text-mut text-[0.85rem] leading-snug mb-3 max-w-[95%]">{description}</p>
          )}

          <button
            ref={buttonRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            aria-label={`Learn more about ${title}`}
            className="relative mt-auto flex items-center text-[0.75rem] font-bold tracking-wider transition-all duration-300 pointer-events-auto w-fit text-white bg-transparent border border-white/15 hover:border-white/40 px-4 py-1.5 rounded-full overflow-hidden group/btn"
          >
            {/* Dark background fade on hover */}
            <span className="absolute inset-0 bg-black/40 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            {/* Cursor tracking spotlight glow */}
            <span 
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(circle 50px at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.2) 0%, transparent 100%)'
              }}
            />

            {/* Content layer */}
            <span className="relative z-10 flex items-center">
              MORE INFO
              <motion.div variants={arrowAnimation}>
                  <ArrowRight className="ml-2 h-4 w-4" />
              </motion.div>
            </span>
          </button>
        </div>
        
        {/* Soft Radial Gradient Mask so Unsplash photos look like floating orbs */}
        <motion.div
          className="absolute -right-4 -bottom-4 w-28 h-28 opacity-30 group-hover:opacity-70 mix-blend-screen pointer-events-none transition-opacity duration-300"
          variants={imageAnimation}
        >
            <img
              src={imgSrc}
              alt={imgAlt}
              className="w-full h-full object-cover"
              style={{
                WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)',
                maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)',
              }}
            />
        </motion.div>
      </motion.div>
    );
  }
);
ServiceCard.displayName = "ServiceCard";

export { ServiceCard };
