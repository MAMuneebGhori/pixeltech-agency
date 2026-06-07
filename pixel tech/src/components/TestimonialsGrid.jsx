import React from 'react';
import { CircularTestimonials } from './ui/circular-testimonials';

export default function TestimonialsGrid() {
  const testimonials = [
    {
      quote: "Pixeltech completely rebuilt our web presence. The new React app is blazing fast, and the automated follow-up system doubled our lead conversion in month one.",
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
      name: "Sarah Jenkins",
      designation: "devremind.co.uk",
      link: "https://devremind.co.uk/"
    },
    {
      quote: "The custom dashboard and missed-call text-back paid for the entire project. Every lost call now turns into a booked consultation automatically.",
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
      name: "PakOrganics",
      designation: "pakorganics.store",
      link: "https://pakorganics.store/"
    },
    {
      quote: "We needed a scalable full-stack solution, not a basic template. Pixeltech delivered robust engineering combined with a marketing engine that actually works.",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
      name: "Protex.pk",
      designation: "@protex.pk",
      link: "https://www.instagram.com/protex.pk?igsh=Nzk4anR4b2RiZGk="
    }
  ];

  return (
    <section className="py-[120px] border-b border-line bg-bg overflow-hidden relative">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-[22px] relative z-10">
        <div className="text-left mb-[64px] max-w-[600px]">
          <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
            Why Brands Switch
          </span>
          <h2 className="mb-3.5 text-3xl md:text-4xl font-extrabold tracking-tight">The math is simple.</h2>
          <p className="text-mut text-[1.1rem]">
            Better engineering + instant automated follow-up = a compounding return on your digital investment.
          </p>
        </div>

        <div className="mt-12">
          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: "#ffffff",
              designation: "#00F2FE",
              testimony: "#e2e8f0",
              arrowBackground: "rgba(255,255,255,0.05)",
              arrowForeground: "#ffffff",
              arrowHoverBackground: "rgba(0,242,254,0.2)",
            }}
            fontSizes={{
              name: "1.25rem",
              designation: "0.75rem",
              quote: "1rem",
            }}
          />
        </div>
        
        <p className="mt-16 text-[0.8rem] text-mut text-center max-w-[700px] mx-auto">
          *Illustrative examples of typical results based on real industry data. Our platform is built to replicate this level of high-performance conversion for your business.
        </p>
      </div>
    </section>
  );
}
