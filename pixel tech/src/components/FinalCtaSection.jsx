import { Link } from 'react-router-dom';

export default function FinalCtaSection() {
  return (
    <section className="text-center py-20 md:py-28 border-b border-line bg-bg2">
      <div className="max-w-[780px] mx-auto px-4 sm:px-6">
        <h2 className="text-4xl md:text-5xl mb-5">
          Stop paying for leads <em className="text-accent">you never talk to.</em>
        </h2>
        <p className="max-w-[580px] mx-auto mb-9 text-mut text-[1.1rem]">
          We'll show you exactly where your clinic is leaking leads — free, in a 15-minute call. If you want it fixed, we build the system for you.
        </p>
        <Link to="/booking" className="btn-primary">Book a 15-min ROI audit</Link>
        <p className="text-[0.85rem] text-mut mt-4 font-medium">No commitment. Target go-live in 7 days.</p>
      </div>
    </section>
  );
}
