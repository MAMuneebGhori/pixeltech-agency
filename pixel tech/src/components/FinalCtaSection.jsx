import { Link } from 'react-router-dom';

export default function FinalCtaSection() {
  return (
    <section className="text-center py-xl md:py-2xl bg-bg2">
      <div className="max-w-[780px] mx-auto px-md sm:px-lg">
        <h2 className="text-section mb-lg">Stop paying for leads you never talk to.</h2>
        <p className="max-w-[56ch] mx-auto mb-xl text-lead text-mut">
          We’ll show you where your clinic is leaking leads, free, in a 15-minute call. If you want it fixed, we build the system for you.
        </p>
        <Link to="/booking" data-cta="final" className="btn-primary">Book a 15-min ROI audit</Link>
        <p className="text-sm text-mut mt-md">No commitment. Target go-live in 7 days.</p>
      </div>
    </section>
  );
}
