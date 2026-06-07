import React from 'react';

export default function GuaranteeSection() {
  return (
    <section className="py-[120px] border-b border-line bg-bg relative overflow-hidden">
      {/* Ambient background glow instead of a hard box */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center">
        <div className="w-[140px] h-[140px] rounded-full border-2 border-accent text-accent flex flex-col items-center justify-center mx-auto mb-10 font-extrabold text-xs tracking-[0.15em] text-center shadow-[0_0_20px_rgba(0,242,254,0.3)] bg-bg2 relative">
          <div className="absolute inset-0 bg-accent/10 rounded-full animate-pulse opacity-50" />
          <span className="relative z-10">PERFORMANCE</span>
          <span className="relative z-10">PROMISE</span>
        </div>
        
        <h2 className="mb-6 text-3xl md:text-4xl font-extrabold tracking-tight">Engineering that actually delivers.</h2>
        
        <p className="max-w-[640px] mx-auto text-mut text-[1.1rem] md:text-lg leading-relaxed">
          We don't hand over a codebase and disappear. We build your custom full-stack architecture, integrate the automation engine, and ensure it actively captures and converts leads. We partner with you for the long term.
        </p>
      </div>
    </section>
  );
}
