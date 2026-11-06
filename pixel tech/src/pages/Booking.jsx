import { useState } from 'react';
import SEO from '../components/SEO';

const CALL_VOLUMES = ['Under 25', '25–50', '50–100', '100+', 'Not sure'];
// Same list as the home page's stack section; "Other" covers everything else.
const BOOKING_SOFTWARE = ['Calendly', 'Google Calendar', 'Square Appointments', 'Acuity', 'Vagaro', 'GlossGenius', 'Mindbody', 'Boulevard', 'Zenoti', 'Other', 'None yet'];

const label = 'text-[0.7rem] font-semibold text-mut uppercase tracking-[0.08em]';
const input = 'w-full bg-bg2 border border-line rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors text-ink placeholder-mut';
const Req = () => <span className="text-bad" aria-hidden="true">*</span>;

const EMPTY = { firstName: '', lastName: '', email: '', phone: '', company: '', website: '', callsPerWeek: '', bookingSoftware: '', goal: '' };

export default function Booking() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }));
  const onInput = (e) => set(e.target.name, e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service: 'Booked Solid System', source: 'Booking Form' }),
      });
      // Only claim success when the lead was actually saved.
      setStatus(res.ok ? 'sent' : 'error');
    } catch (error) {
      console.error('Failed to save lead to backend:', error);
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
            We'll look at where your calls and DMs go unanswered, and what fixing it is worth to your clinic.
          </p>
        </div>

        <div className="bg-card border border-line rounded-[18px] p-5 md:p-7">
          {status === 'sent' ? (
            <div className="text-center py-10" role="status">
              <h2 className="text-3xl mb-3">Request received</h2>
              <p className="text-mut leading-relaxed">We'll email you to set a time for your audit.</p>
            </div>
          ) : (
            <form className="grid gap-4" onSubmit={handleSubmit}>
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
                  <label htmlFor="website" className={label}>Website <Req /></label>
                  <input id="website" required type="url" name="website" value={form.website} onChange={onInput} className={input} placeholder="https://yourclinic.com" />
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
