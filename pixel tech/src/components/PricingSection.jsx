import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { Section } from './HomeSections';
import { MONTHLY_PRICE, DEFAULT_INPUTS, estimateLeak, bookingsToBreakEven } from '../lib/roi';

// Set by hand as seats fill; never a fake countdown (plan D2).
const FOUNDING_SEATS_LEFT = 3;
// shortcut: D2a (7 vs 30 days) still open; 7 is the plan's recommendation, change here if the 30-day option wins.
const TRIAL_DAYS = 7;

const FEATURES = [
  'AI voice receptionist for your calls',
  'Missed-call text-back',
  'Instagram & Facebook DM replies',
  'Appointment reminders to cut no-shows',
  'Past-client reactivation campaigns',
  '9 AM daily digest of every lead and booking',
  'TCPA-compliant opt-outs and call-recording notice',
];

// Limits stated up front (plan 4.7). Each one traces to the SRD: §7 BAA, F-16 later phase, §3 unverified integrations, Phase 3 multi-location.
const NOT_INCLUDED = [
  'A HIPAA Business Associate Agreement (BAA)',
  'A website chat widget (planned for later)',
  'Booking-software integrations we haven’t confirmed for your system',
  'More than one location',
];

const usd = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const ROI_FIELDS = [
  { key: 'callsPerWeek', label: 'Inbound calls per week' },
  {
    key: 'missedPct', label: 'Calls that go unanswered (%)', max: 100,
    hint: <>Default is the salon & spa average, <a href="https://www.zenoti.com/thecheckin/how-track-salon-call-conversion-rate" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">Zenoti, 2026</a>.</>,
  },
  { key: 'missedMessagesPerWeek', label: 'Texts & DMs answered over an hour late, per week' },
  { key: 'bookPct', label: 'Missed leads who would have booked (%)', max: 100, hint: 'Our conservative assumption. Use your own close rate if you know it.' },
  { key: 'treatmentValue', label: 'Average first-treatment value ($)' },
];

// Inputs stay strings so a field can be cleared while typing; roi.js treats blanks as 0.
const DEFAULT_FORM = Object.fromEntries(Object.entries(DEFAULT_INPUTS).map(([k, v]) => [k, String(v)]));

function RoiCalculator({ headingAs: Heading }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const { missedLeads, lostBookings, lostRevenue } = estimateLeak(form);
  const breakEven = bookingsToBreakEven(form.treatmentValue);

  const field = 'mt-1.5 w-full rounded-xl border border-line bg-card px-4 py-3 font-mono text-ink focus:outline-2 focus:outline-accent';

  return (
    <div className="bg-card border border-line rounded-[18px] p-6 md:p-8">
      <Heading className="text-[1.8rem] mb-1">What missed leads cost you</Heading>
      <p className="text-mut text-[0.9rem] mb-6">Put in your own numbers. The defaults are a starting point.</p>

      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        {ROI_FIELDS.map(({ key, label, max, hint }) => (
          <label key={key} className="text-[0.9rem] font-medium text-ink">
            {label}
            <input
              type="number" inputMode="numeric" min="0" max={max}
              value={form[key]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              className={field}
            />
            {hint && <span className="block mt-1 text-[0.78rem] font-normal text-mut">{hint}</span>}
          </label>
        ))}
      </div>

      <div className="rounded-xl bg-bg2 border border-line p-5" aria-live="polite">
        <p className="text-[0.85rem] text-mut">Estimated revenue lost per month</p>
        <p className="font-mono text-[2.4rem] leading-tight text-ink">{usd(lostRevenue)}</p>
        <p className="mt-1 text-[0.85rem] text-mut">
          About {missedLeads} missed leads a month, {lostBookings} of whom would have booked.
        </p>
        <p className="mt-3 text-[0.92rem] text-ink">
          {breakEven
            ? <>The plan is {usd(MONTHLY_PRICE)}/mo. It pays for itself if it recovers <strong>{breakEven} booking{breakEven > 1 ? 's' : ''}</strong> a month.</>
            : <>Enter a treatment value to compare it with the {usd(MONTHLY_PRICE)}/mo plan.</>}
        </p>
        <p className="mt-3 text-[0.75rem] text-mut">
          How it's worked out: (calls × unanswered % + late texts & DMs) × 4.3 weeks × booking % × treatment value.
        </p>
      </div>
    </div>
  );
}

export default function PricingSection({ titleAs = 'h2' }) {
  // One level below the section title, so /pricing (h1) doesn't skip to h3.
  const SubHeading = titleAs === 'h1' ? 'h2' : 'h3';
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      titleAs={titleAs}
      title="One plan. No lock-in."
      intro="Everything below, for one flat monthly price. Cancel any month."
    >
      <div className="grid gap-5 lg:grid-cols-2 items-start">
        <div className="bg-card border border-line rounded-[18px] p-6 md:p-8">
          <p className="font-mono text-[0.72rem] uppercase tracking-wide text-accent mb-3">
            Founding Partner · {FOUNDING_SEATS_LEFT} of 3 seats left
          </p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-mono text-[3rem] leading-none text-ink">{usd(MONTHLY_PRICE)}</span>
            <span className="text-mut">/mo after your {TRIAL_DAYS}-day free trial</span>
          </div>
          <p className="mt-2 text-[0.95rem]">
            <s className="text-mut">$497 setup</s> <span className="text-accent font-semibold">waived for our first 3 clinics</span>
          </p>

          <SubHeading className="mt-6 mb-3 font-body font-semibold text-[1rem]">Included</SubHeading>
          <ul className="space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex gap-3 text-ink text-[0.95rem]">
                <Check className="h-5 w-5 text-good shrink-0" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <SubHeading className="mt-6 mb-3 font-body font-semibold text-[1rem]">Not included</SubHeading>
          <ul className="space-y-3">
            {NOT_INCLUDED.map((f) => (
              <li key={f} className="flex gap-3 text-mut text-[0.95rem]">
                <X className="h-5 w-5 text-mut shrink-0" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          {/* D7: soft fair-use line; no minutes cap published. */}
          <p className="mt-6 mb-8 rounded-xl bg-bg2 border border-line p-3.5 text-[0.88rem] text-ink">
            Covers a typical single-location spa. If your volume ever goes over, we'll tell you first. We never surprise-bill.
          </p>

          <Link to="/booking?service=core" className="btn-primary w-full text-base">Book a 15-min ROI audit</Link>
          <p className="text-center text-[0.8rem] text-mut mt-3">No lock-in. Cancel any month.</p>
        </div>

        <RoiCalculator headingAs={SubHeading} />
      </div>
    </Section>
  );
}
