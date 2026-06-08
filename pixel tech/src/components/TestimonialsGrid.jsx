import React from 'react';
import { CircularTestimonials } from './ui/circular-testimonials';

export default function TestimonialsGrid() {
  const testimonials = [
    {
      quote: "We were spending thousands on ads every month, but leads would sit for hours before anyone replied. After PixelTech installed the system, every lead started getting an immediate response, even after business hours. It feels like we finally stopped leaking opportunities.",
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
      name: "Sarah Mitchell",
      designation: "Owner, Aesthetic Wellness Clinic"
    },
    {
      quote: "The biggest change wasn't more leads. It was actually converting the leads we already had. The automated booking and reminder system reduced the back-and-forth with prospects and made scheduling much easier for our team.",
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
      name: "Dr. Jennifer Carter",
      designation: "Owner, Radiance Medical Spa"
    },
    {
      quote: "We used to miss inquiries that came in during evenings and especially on weekends. Now every lead gets an instant response and can book directly into our calendar. The setup process was straightforward, and the system was live faster than expected.",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
      name: "Melissa Rodriguez",
      designation: "Owner, Elite Skin & Laser Clinic"
    },
    {
      quote: "PixelTech gave us a clear picture of where leads were falling through the cracks. Their team handled everything from setup to testing, and we immediately noticed a smoother experience for patients.",
      src: "https://api.dicebear.com/7.x/micah/svg?seed=Amanda&backgroundColor=0B1120&mouth=smile",
      name: "Amanda Lewis",
      designation: "Owner, Glow Aesthetics & Wellness"
    }
  ];

  return (
    <section id="testimonials" className="py-[120px] border-b border-line bg-bg overflow-hidden relative">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-[22px] relative z-10">
        <div className="text-left mb-[64px] max-w-[600px]">
          <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-6">
            Real Results
          </span>
          <h2 className="mb-3.5 text-3xl md:text-4xl font-extrabold tracking-tight">Don't just take our word for it.</h2>
          <p className="text-mut text-[1.1rem]">
            See how automated systems are helping clinic owners stop lead-leakage and book more appointments.
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
      </div>
    </section>
  );
}
