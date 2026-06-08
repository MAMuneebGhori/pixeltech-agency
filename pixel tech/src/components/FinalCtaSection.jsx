import React from 'react';
import { Link } from 'react-router-dom';

export default function FinalCtaSection() {
  return (
    <section className="text-center bg-[radial-gradient(700px_360px_at_50%_120%,rgba(0,242,254,0.15),transparent_70%)] py-[86px] border-b border-line bg-bg">
      <div className="max-w-[780px] mx-auto px-[22px] text-center">
        <h2 className="mb-3.5 text-4xl md:text-5xl font-extrabold">
          Stop paying for leads <span className="text-gradient">you never talk to.</span>
        </h2>
        <p className="max-w-[580px] mx-auto mt-[22px] mb-[34px] text-mut text-[1.1rem]">
          We'll show you exactly where your clinic is leaking leads — free, in a 15-minute call. If you want it fixed, we build the system for you.
        </p>
        <Link to="/booking" className="btn-primary inline-block text-lg shadow-[0_0_20px_rgba(0,242,254,0.2)]">
          Book My Free Lead-Leak Audit
        </Link>
        <p className="text-[0.85rem] text-mut mt-4 font-medium">
          No commitment. 14-day go-live guarantee.
        </p>
      </div>
    </section>
  );
}
