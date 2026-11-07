import { useRef } from 'react';
import { Link } from 'react-router-dom';
import ClinicInbox from './ClinicInbox';

// Unset until the demo line exists; setting it switches the primary CTA to click-to-call with no code change.
const DEMO_PHONE = import.meta.env.VITE_DEMO_PHONE;

const TEST_PROMPTS = ['Ask how much Botox is', 'Ask for a Saturday slot', 'Hang up, then text after hours'];

export default function HeroSection() {
  const dialogRef = useRef(null);

  return (
    <section className="pt-xl lg:pt-xl pb-2xl lg:pb-xl">
      <div className="container-page grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 items-center">
        {/* No entrance animation: the headline is the LCP element, and a fade-in delays it. */}
        <div className="min-w-0">
          {/* DESIGN.md hero budget: the headline, one sentence of twelve words or fewer, the actions. */}
          <h1 className="text-display max-w-[20ch] mb-lg [overflow-wrap:break-word]">
            Stop losing Botox & filler consults to voicemail.
          </h1>

          <p className="text-lead max-w-[36ch] mb-xl text-mut">
            Booked Solid answers every call, text and DM, then books the patient.
          </p>

          <div className="flex flex-col sm:flex-row gap-sm">
            {DEMO_PHONE ? (
              <button type="button" onClick={() => dialogRef.current?.showModal()} className="btn-primary text-base">
                Call the demo line
              </button>
            ) : (
              <Link to="/booking" data-cta="hero" className="btn-primary text-base">Book a 15-min ROI audit</Link>
            )}
            {DEMO_PHONE && (
              <Link to="/booking" data-cta="hero" className="btn-secondary">
                Book a 15-min ROI audit
              </Link>
            )}
          </div>
          {/* No live-demo claim until the Phase 0 battery passes (plan 8.13 R2); the walkthrough uses the recorded call. */}
          {!DEMO_PHONE && (
            <p className="mt-sm text-sm text-mut">Free, 15 minutes. We’ll walk you through a real demo call.</p>
          )}
        </div>

        <div className="motion-safe:animate-fade-up w-full max-w-[480px] mx-auto lg:mr-0">
          <ClinicInbox />
        </div>
      </div>

      {DEMO_PHONE && (
        <dialog
          ref={dialogRef}
          aria-labelledby="demo-dialog-title"
          className="m-auto w-[min(92vw,440px)] rounded-card bg-card shadow-raised p-lg text-ink backdrop:bg-ink/40"
          onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        >
          <h2 id="demo-dialog-title" className="text-3xl mb-xs">Try the demo line</h2>
          <p className="text-mut text-[0.95rem] mb-md">You’ll reach Ava, the receptionist for our demo clinic, Glow Med Spa. Try one of these:</p>
          <ol className="list-decimal pl-lg space-y-xs mb-lg text-[0.95rem]">
            {TEST_PROMPTS.map((p) => <li key={p}>{p}</li>)}
          </ol>
          <a href={`tel:${DEMO_PHONE}`} data-event="demo_tel_tap" className="btn-primary w-full text-base">Call {DEMO_PHONE}</a>
          <button type="button" onClick={() => dialogRef.current?.close()} className="mt-sm w-full text-[0.9rem] text-mut hover:text-ink">
            Close
          </button>
        </dialog>
      )}
    </section>
  );
}
