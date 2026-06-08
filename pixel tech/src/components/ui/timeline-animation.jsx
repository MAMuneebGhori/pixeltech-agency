import React from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../lib/utils';

export const TimelineContent = ({
  children,
  as = "div",
  animationNum = 0,
  timelineRef,
  customVariants,
  className,
  ...props
}) => {
  const Component = motion[as] || motion.div;
  const isInView = useInView(timelineRef, { once: true, margin: "-10%" });

  // Use the user-provided custom variants if available, otherwise default to simple fade/slide
  const variants = customVariants || {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <Component
      className={cn(className)}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      {...props}
    >
      {children}
    </Component>
  );
};
