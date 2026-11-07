import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { CALL_VOLUMES, callsBucket, fromRoiParams, formatRoiEstimate, formatRoiRange } from '../lib/roi';
import { track } from '../lib/track';

// Same list as the home page's stack section; "Other" covers everything else.
const BOOKING_SOFTWARE = ['Calendly', 'Google Calendar', 'Square Appointments', 'Acuity', 'Vagaro', 'GlossGenius', 'Mindbody', 'Boulevard', 'Zenoti', 'Other', 'None yet'];

// Unset until a Calendly event exists; then the success step books the call inline (plan 8.3 E2).
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL;
const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_ORIGIN = /^https:\/\/([a-z0-9-]+\.)?calendly\.com$/;
const CALENDLY_TIMEOUT_MS = 10000;

const label = 'text-sm font-semibold text-ink';
// DESIGN.md inputs: constant 1px border, 48px, 16px text (no iOS zoom); focus is the global outline ring.
const input = 'w-full min-h-12 bg-bg2 border border-field rounded-inner px-sm py-sm text-base text-ink placeholder-mut';
const Req = () => <span className="text-bad" aria-hidden="true">*</span>;

const EMPTY = { firstName: '', lastName: '', email: '', phone: '', company: '', website: '', callsPerWeek: '', bookingSoftware: '', goal: '', fax: '' };

// Calendly inline scheduler. 'ready' needs Calendly's own postMessage, not just script onload, because the
// iframe can still fail after the script loads. Anything else after 10s falls back to a plain link.
function Scheduler({ name, email }) {
  const parentRef = useRef(null);
  const [state, setState] = useState('loading'); // loading | ready | failed

  useEffect(() => {
    const onMessage = (e) => {
      if (!CALENDLY_ORIGIN.test(e.origin) || typeof e.data?.event !== 'string') return;
      if (e.data.event === 'calendly.page_height' || e.data.event === 'calendly.profile_page_viewed') setState('ready');
      if (e.data.event === 'calendly.event_scheduled') track('calendly_booked');
    };
    window.addEventListener('message', onMessage);
    const timer = setTimeout(() => setState((s) => (s === 'loading' ? 'failed' : s)), CALENDLY_TIMEOUT_MS);

    const init = () => {
      try {
        window.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: parentRef.current, prefill: { name, email } });
      } catch {
        setState('failed');
      }
    };
    const onError = () => setState('failed');
    let script = null;
    if (window.Calendly) {
      init();
    } else {
      script = document.querySelector(`script[src="${CALENDLY_SCRIPT}"]`);
      if (!script) {
        script = document.createElement('script');
        script.src = CALENDLY_SCRIPT;
        script.async = true;
        document.body.appendChild(script);
      }
      script.addEventListener('load', init);
      script.addEventListener('error', onError);
    }
    return () => {
      window.removeEventListener('message', onMessage);
      script?.removeEventListener('load', init);
      script?.removeEventListener('error', onError);
      clearTimeout(timer);
    };
  }, [name, email]);

  return (
    <div>
      <h2 className="text-3xl mb-xs text-center">Pick a time for your audit</h2>
      <p className="text-mut text-center mb-md">Your details are saved. Choose a slot and you’re booked.</p>
      {state === 'failed' ? (
        <p className="text-center text-mut leading-relaxed py-lg" role="status">
          The scheduler didn’t load.{' '}
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline">Pick a time on Calendly</a>
          , or we’ll email you to set a time.
        </p>
      ) : (
        <>
          {/* The scheduler's 680px is held from the start, so nothing jumps when Calendly arrives (D9). */}
          <div className="relative -mx-lg md:mx-0 h-[680px]">
            {state === 'loading' && (
              <p className="absolute inset-0 grid place-items-center rounded-inner bg-bg2 text-mut" role="status">Loading the scheduler…</p>
            )}
            <div ref={parentRef} data-state={state} className={`h-full transition-opacity duration-[220ms] ease-out ${state === 'ready' ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        </>
      )}
    </div>
  );
}

export default function Booking() {
  const [searchParams] = useSearchParams();
  // Arriving from the ROI calculator (plan 8.3 E5): prefill calls/week and keep the estimate for the lead.
  const [roiInputs] = useState(() => fromRoiParams(searchParams));
  const [form, setForm] = useState(() => (roiInputs ? { ...EMPTY, callsPerWeek: callsBucket(roiInputs.callsPerWeek) } : EMPTY));
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }));
  const onInput = (e) => set(e.target.name, e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    track('booking_submit', { from: roiInputs ? 'roi' : 'direct' });
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          service: 'Booked Solid System',
          ...(roiInputs && { roiEstimate: formatRoiEstimate(roiInputs) }),
        }),
      });
      // Only claim success when the lead was actually saved.
      if (!res.ok) track('booking_error', { status: res.status });
      setStatus(res.ok ? 'sent' : 'error');
    } catch (error) {
      console.error('Failed to save lead to backend:', error);
      track('booking_error', { status: 'network' });
      setStatus('error');
    }
  };

  return (
    <main className="pt-3xl lg:pt-3xl pb-3xl bg-bg">
      <SEO title="Book a 15-min ROI audit" description="Book a free 15-minute call. We’ll show you where your med spa is losing leads and what fixing it is worth." url="/booking" />

      <div className="max-w-[560px] w-full mx-auto px-lg">
        <div className="text-center mb-xl">
          <h1 className="text-display-s mb-sm">Book your free 15-minute ROI audit.</h1>
          <p className="text-mut max-w-[420px] mx-auto">
            We’ll look at where your calls and DMs go unanswered, and what fixing it is worth to your clinic. We’ll also walk you through a real demo call.
          </p>
        </div>

        <div className="bg-card border border-line rounded-[18px] p-lg md:p-lg">
          {status === 'sent' ? (
            CALENDLY_URL ? (
              <Scheduler name={`${form.firstName} ${form.lastName}`.trim()} email={form.email} />
            ) : (
              <div className="text-center py-xl" role="status">
                <h2 className="text-3xl mb-sm">Request received</h2>
                <p className="text-mut leading-relaxed">We’ll email you to set a time for your audit.</p>
              </div>
            )
          ) : (
            <form className="grid gap-md" onSubmit={handleSubmit}>
              {CALENDLY_URL && <p className="text-sm text-mut">Step 1 of 2: your details. Step 2: pick a time.</p>}
              {roiInputs && (
                <p className="rounded-lg border border-line bg-bg2 p-sm text-[0.85rem] text-mut">
                  We’ll bring your calculator numbers to the call: {formatRoiRange(roiInputs)} in missed revenue.
                </p>
              )}
              {/* Honeypot: off-screen and skipped by keyboard and screen readers; the backend drops any lead that fills it. */}
              <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                <label htmlFor="fax">Fax</label>
                <input id="fax" name="fax" value={form.fax} onChange={onInput} tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="grid gap-xs">
                  <label htmlFor="firstName" className={label}>First name <Req /></label>
                  <input id="firstName" required name="firstName" value={form.firstName} onChange={onInput} className={input} autoComplete="given-name" />
                </div>
                <div className="grid gap-xs">
                  {/* Required: the Lead schema rejects a lead without one. */}
                  <label htmlFor="lastName" className={label}>Last name <Req /></label>
                  <input id="lastName" required name="lastName" value={form.lastName} onChange={onInput} className={input} autoComplete="family-name" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="grid gap-xs">
                  <label htmlFor="email" className={label}>Email <Req /></label>
                  <input id="email" required type="email" name="email" value={form.email} onChange={onInput} className={input} autoComplete="email" />
                </div>
                <div className="grid gap-xs">
                  <label htmlFor="phone" className={label}>Phone / WhatsApp <Req /></label>
                  <input id="phone" required type="tel" name="phone" value={form.phone} onChange={onInput} className={input} autoComplete="tel" placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="grid gap-xs">
                  <label htmlFor="company" className={label}>Clinic name</label>
                  <input id="company" name="company" value={form.company} onChange={onInput} className={input} autoComplete="organization" />
                </div>
                <div className="grid gap-xs">
                  {/* Optional plain text (plan 8.13 S1): "glowspa.com" or an Instagram handle is fine. */}
                  <label htmlFor="website" className={label}>Website or Instagram</label>
                  <input id="website" name="website" value={form.website} onChange={onInput} className={input} autoComplete="url" placeholder="yourclinic.com or @yourclinic" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="grid gap-xs">
                  <label htmlFor="callsPerWeek" className={label}>Calls per week</label>
                  <select id="callsPerWeek" name="callsPerWeek" value={form.callsPerWeek} onChange={onInput} className={input}>
                    <option value="">Choose…</option>
                    {CALL_VOLUMES.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="grid gap-xs">
                  <label htmlFor="bookingSoftware" className={label}>Booking software</label>
                  <select id="bookingSoftware" name="bookingSoftware" value={form.bookingSoftware} onChange={onInput} className={input}>
                    <option value="">Choose…</option>
                    {BOOKING_SOFTWARE.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid gap-xs">
                <label htmlFor="goal" className={label}>Anything we should know?</label>
                <textarea id="goal" name="goal" value={form.goal} onChange={onInput} rows={3} className={`${input} resize-none`} />
              </div>

              {status === 'error' && (
                <p role="alert" className="rounded-lg border border-bad/40 bg-bad/5 p-sm text-sm text-ink">
                  We couldn’t send your request. Please try again, or email us at{' '}
                  <a href="mailto:info@pixeltech.agency" className="text-accent underline">info@pixeltech.agency</a>.
                </p>
              )}

              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full mt-2xs text-base disabled:opacity-60">
                {/* Honest about what this button does: it saves details; the time is picked next (design review D7). */}
                {status === 'sending' ? 'Sending…' : CALENDLY_URL ? 'Continue to pick a time' : 'Send my details'}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
