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

const label = 'text-[0.7rem] font-semibold text-mut uppercase tracking-[0.08em]';
const input = 'w-full bg-bg2 border border-line rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors text-ink placeholder-mut';
const Req = () => <span className="text-bad" aria-hidden="true">*</span>;

const EMPTY = { firstName: '', lastName: '', email: '', phone: '', company: '', website: '', callsPerWeek: '', bookingSoftware: '', goal: '' };

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
      <h2 className="text-3xl mb-2 text-center">Pick a time for your audit</h2>
      <p className="text-mut text-center mb-4">Your details are saved. Choose a slot and you're booked.</p>
      {state === 'failed' ? (
        <p className="text-center text-mut leading-relaxed py-6" role="status">
          The scheduler didn't load.{' '}
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline">Pick a time on Calendly</a>
          , or we'll email you to set a time.
        </p>
      ) : (
        <>
          {state === 'loading' && <p className="text-center text-mut py-6" role="status">Loading the scheduler…</p>}
          <div ref={parentRef} className={state === 'ready' ? 'min-w-[280px] h-[680px]' : 'h-0 overflow-hidden'} />
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
    <main className="pt-[100px] lg:pt-[120px] pb-[80px] bg-bg">
      <SEO title="Book a 15-min ROI audit" description="Book a free 15-minute call. We'll show you where your med spa is losing leads and what fixing it is worth." url="/booking" />

      <div className="max-w-[560px] w-full mx-auto px-5">
        <div className="text-center mb-8">
          <p className="font-mono text-[0.72rem] uppercase tracking-wider text-mut mb-3">Free · 15 minutes</p>
          <h1 className="text-4xl md:text-5xl leading-[1.08] mb-3">
            Book your <em className="text-accent">ROI audit.</em>
          </h1>
          <p className="text-mut max-w-[420px] mx-auto">
            We'll look at where your calls and DMs go unanswered, and what fixing it is worth to your clinic. We'll also walk you through a real demo call.
          </p>
        </div>

        <div className="bg-card border border-line rounded-[18px] p-5 md:p-7">
          {status === 'sent' ? (
            CALENDLY_URL ? (
              <Scheduler name={`${form.firstName} ${form.lastName}`.trim()} email={form.email} />
            ) : (
              <div className="text-center py-10" role="status">
                <h2 className="text-3xl mb-3">Request received</h2>
                <p className="text-mut leading-relaxed">We'll email you to set a time for your audit.</p>
              </div>
            )
          ) : (
            <form className="grid gap-4" onSubmit={handleSubmit}>
              {roiInputs && (
                <p className="rounded-lg border border-line bg-bg2 p-3 text-[0.85rem] text-mut">
                  We'll bring your calculator numbers to the call: {formatRoiRange(roiInputs)} in missed revenue.
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="grid gap-1.5">
                  <label htmlFor="firstName" className={label}>First name <Req /></label>
                  <input id="firstName" required name="firstName" value={form.firstName} onChange={onInput} className={input} autoComplete="given-name" />
                </div>
                <div className="grid gap-1.5">
                  {/* Required: the Lead schema rejects a lead without one. */}
                  <label htmlFor="lastName" className={label}>Last name <Req /></label>
                  <input id="lastName" required name="lastName" value={form.lastName} onChange={onInput} className={input} autoComplete="family-name" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="grid gap-1.5">
                  <label htmlFor="email" className={label}>Email <Req /></label>
                  <input id="email" required type="email" name="email" value={form.email} onChange={onInput} className={input} autoComplete="email" />
                </div>
                <div className="grid gap-1.5">
                  <label htmlFor="phone" className={label}>Phone / WhatsApp <Req /></label>
                  <input id="phone" required type="tel" name="phone" value={form.phone} onChange={onInput} className={input} autoComplete="tel" placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="grid gap-1.5">
                  <label htmlFor="company" className={label}>Clinic name</label>
                  <input id="company" name="company" value={form.company} onChange={onInput} className={input} autoComplete="organization" />
                </div>
                <div className="grid gap-1.5">
                  {/* Optional plain text (plan 8.13 S1): "glowspa.com" or an Instagram handle is fine. */}
                  <label htmlFor="website" className={label}>Website or Instagram</label>
                  <input id="website" name="website" value={form.website} onChange={onInput} className={input} autoComplete="url" placeholder="yourclinic.com or @yourclinic" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="grid gap-1.5">
                  <label htmlFor="callsPerWeek" className={label}>Calls per week</label>
                  <select id="callsPerWeek" name="callsPerWeek" value={form.callsPerWeek} onChange={onInput} className={`${input} h-[42px]`}>
                    <option value="">Choose…</option>
                    {CALL_VOLUMES.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="grid gap-1.5">
                  <label htmlFor="bookingSoftware" className={label}>Booking software</label>
                  <select id="bookingSoftware" name="bookingSoftware" value={form.bookingSoftware} onChange={onInput} className={`${input} h-[42px]`}>
                    <option value="">Choose…</option>
                    {BOOKING_SOFTWARE.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="goal" className={label}>Anything we should know?</label>
                <textarea id="goal" name="goal" value={form.goal} onChange={onInput} rows={3} className={`${input} resize-none`} />
              </div>

              {status === 'error' && (
                <p role="alert" className="rounded-lg border border-bad/40 bg-bad/5 p-3 text-sm text-ink">
                  We couldn't send your request. Please try again, or email us at{' '}
                  <a href="mailto:info@pixeltech.agency" className="text-accent underline">info@pixeltech.agency</a>.
                </p>
              )}

              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full mt-1 text-base disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : 'Book a 15-min ROI audit'}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
