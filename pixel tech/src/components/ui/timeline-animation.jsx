import React from 'react';
import { motion } from 'framer-motion';

export const TimelineContent = ({
  as: Component = "div",
  children,
  className,
  style,
  customVariants,
  animationNum = 0,
  timelineRef,
  ...props
}) => {
  const MotionComponent = motion[Component] || motion.div;
  
  return (
    <MotionComponent
      className={className}
      style={style}
      variants={customVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={animationNum}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};
