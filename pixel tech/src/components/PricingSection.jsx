import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { Section } from './HomeSections';
import { MONTHLY_PRICE, DEFAULT_INPUTS, estimateLeak, bookingsToBreakEven, toRoiParams, usd, restoreRoiForm } from '../lib/roi';
import { foundingOffer, SETUP_FEE } from '../lib/offer';
import { track } from '../lib/track';

// The owner's calculator numbers, kept for this visit only (design review D10); storage can be blocked, so every access is guarded.
const ROI_STORAGE_KEY = 'pixeltech-roi-inputs';
const loadRoiForm = (fallback) => {
  try { return restoreRoiForm(sessionStorage.getItem(ROI_STORAGE_KEY)) || fallback; } catch { return fallback; }
};
const saveRoiForm = (form) => {
  try { sessionStorage.setItem(ROI_STORAGE_KEY, JSON.stringify(form)); } catch { /* private mode or blocked storage: the numbers just aren't kept */ }
};

// roi_edit fires once per page load, not on every keystroke.
let roiEdited = false;
const markRoiEdited = () => { if (!roiEdited) { roiEdited = true; track('roi_edit'); } };

// Set by hand as seats fill; never a fake countdown (plan D2). At 3 the label shows no count (plan 8.3 R4).
const FOUNDING_SEATS = 3;
const FOUNDING_SEATS_LEFT = 3;
// Trial clock starts at go-live, not signup (plan 8.3 R1; 7 vs 14 days revisited with the guarantee, TODOS.md).
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

const ROI_FIELDS = [
  { key: 'callsPerWeek', label: 'Inbound calls per week', max: 300, step: 5 },
  {
    key: 'missedPct', label: 'Calls that go unanswered (%)', max: 100, step: 1,
    hint: <>Default is the salon & spa average, <a href="https://www.zenoti.com/thecheckin/how-track-salon-call-conversion-rate" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 whitespace-nowrap">Zenoti, 2026</a>.</>,
  },
  { key: 'missedMessagesPerWeek', label: 'Texts & DMs answered over an hour late, per week', max: 60, step: 1 },
  { key: 'bookPct', label: 'Missed leads who would have booked (%)', max: 100, step: 1, hint: 'Our conservative assumption. Use your own close rate if you know it.' },
  { key: 'treatmentValue', label: 'Average first-treatment value ($)', max: 2000, step: 25 },
];

// Inputs stay strings so a field can be cleared while typing; roi.js treats blanks as 0.
const DEFAULT_FORM = Object.fromEntries(Object.entries(DEFAULT_INPUTS).map(([k, v]) => [k, String(v)]));

// One ledger line: words in sans on the left, the figure in mono on the right.
function LedgerRow({ label, children, strong }) {
  return (
    <div className={`flex items-baseline justify-between gap-md py-xs ${strong ? 'text-ink font-semibold' : 'text-mut'}`}>
      <dt>{label}</dt>
      <dd className="font-mono text-ink tabular-nums text-right">{children}</dd>
    </div>
  );
}

function RoiCalculator({ headingAs: Heading }) {
  const [form, setForm] = useState(() => loadRoiForm(DEFAULT_FORM));
  const { missedCalls, missedMessages, missedLeads, lostBookings, lostRevenue, lostRevenueLow } = estimateLeak(form);
  const breakEven = bookingsToBreakEven(form.treatmentValue);
  const pctShown = (key) => Math.min(Number(form[key]) || 0, 100);

  const update = (key, value) => {
    markRoiEdited();
    setForm((f) => { const next = { ...f, [key]: value }; saveRoiForm(next); return next; });
  };

  // DESIGN.md inputs: bg2 fill, a constant 1px field border, 48px, 16px text; focus comes from the global ring.
  const field = 'w-28 shrink-0 min-h-12 rounded-inner border border-field bg-bg2 px-sm font-mono text-base text-ink tabular-nums text-right';

  return (
    <div className="bg-card border border-line rounded-card p-lg md:p-xl">
      {/* No heading prop: the surrounding Section already carries the head and intro (/pricing). */}
      {Heading && (
        <>
          <Heading className="text-title mb-2xs">What missed leads cost you</Heading>
          <p className="text-mut text-sm mb-lg">Drag or type your own numbers. The defaults are a starting point.</p>
        </>
      )}

      {/* Each input is a slider for feel and a number box for the exact figure; both edit the same value. */}
      <div className="flex flex-col gap-md mb-lg">
        {ROI_FIELDS.map(({ key, label, max, step, hint }) => {
          const id = `roi-${key}`;
          return (
            <div key={key}>
              <div className="flex items-end justify-between gap-md">
                <label htmlFor={id} className="text-sm font-semibold text-ink pb-xs">{label}</label>
                <input
                  id={id}
                  type="number" inputMode="numeric" min="0" max={max === 100 ? 100 : undefined}
                  value={form[key]}
                  onChange={(e) => update(key, e.target.value)}
                  className={field}
                />
              </div>
              <input
                type="range" min="0" max={max} step={step}
                aria-label={label}
                value={Math.min(Number(form[key]) || 0, max)}
                onChange={(e) => update(key, e.target.value)}
                className="ledger-range"
              />
              {hint && <span className="block text-sm text-mut">{hint}</span>}
            </div>
          );
        })}
      </div>

      {/* Receipt: the arithmetic in order, each figure on its own line, totals under a double rule.
          Only the two headline figures are announced on each edit (aria-live); the lines above stay quiet. */}
      <div className="rounded-inner bg-bg2 p-lg">
        <div className="flex items-baseline justify-between gap-md mb-xs">
          <p className="text-sm font-semibold text-ink">Monthly revenue recovery</p>
          <p className="text-sm text-mut">Estimate</p>
        </div>
        <dl className="border-t border-line">
          <LedgerRow label="Unanswered calls">{missedCalls}</LedgerRow>
          <LedgerRow label="Late texts & DMs">{missedMessages}</LedgerRow>
          <LedgerRow label="Missed leads">{missedLeads}</LedgerRow>
          <LedgerRow label={<>Would have booked, at <span className="font-mono">{pctShown('bookPct')}%</span></>}>{lostBookings}</LedgerRow>
          <LedgerRow label="Times first-treatment value">{usd(Number(form.treatmentValue) > 0 ? Number(form.treatmentValue) : 0)}</LedgerRow>
        </dl>
        <div className="border-t-[3px] border-double border-ink/40 mt-xs pt-sm" aria-live="polite" aria-atomic="true">
          <p className="text-sm text-mut">Revenue lost to missed leads, per month</p>
          <p className="font-mono text-[1.4rem] text-ink tabular-nums">
            <span className="whitespace-nowrap">{usd(lostRevenueLow)}</span> to <span className="whitespace-nowrap">{usd(lostRevenue)}</span>
          </p>
          {/* Break-even leads (plan 8.13 S2): it rests on one number the owner knows. DESIGN.md: only the numeral is mono. */}
          {breakEven ? (
            <>
              <p className="mt-md text-sm text-mut">At {usd(MONTHLY_PRICE)}/mo, the plan pays for itself at</p>
              <p className="text-title text-ink">
                <span className="font-mono text-[3.5rem] leading-none align-[-0.08em] tabular-nums">{breakEven}</span>{' '}
                booking{breakEven > 1 ? 's' : ''} a month
              </p>
            </>
          ) : (
            <p className="mt-md text-ink">Enter a treatment value to compare it with the {usd(MONTHLY_PRICE)}/mo plan.</p>
          )}
        </div>
        <p className="mt-md text-sm text-mut">
          The low end assumes half of missed leads are existing patients getting back in touch.
          How it’s worked out: (calls × unanswered % + late texts & DMs) × 4.3 weeks × booking % × treatment value.
        </p>
      </div>
      <Link
        to={`/booking?${toRoiParams(form)}`}
        data-cta="roi"
        className="btn-primary w-full text-base mt-lg"
      >
        Book a 15-min ROI audit
      </Link>
    </div>
  );
}

const TITLE = 'One plan. No lock-in.';
// The price sits in the intro so it is still read first when the calculator leads on phones (D3).
const INTRO = `${usd(MONTHLY_PRICE)} a month for everything below, one flat price. Cancel any month.`;

export default function PricingSection({ titleAs = 'h2' }) {
  // One level below the section title, so /pricing (h1) doesn't skip to h3.
  // On /pricing: a short page head with the action, the price card, then the calculator as its own
  // section with a real section head (h2 at --text-section), so the heading ladder reads h1 > h2.
  if (titleAs === 'h1') {
    return (
      <>
        <section className="pt-xl md:pt-2xl pb-2xl md:pb-3xl">
          <div className="container-page">
            <h1 className="text-display-s max-w-[20ch] mb-lg">{TITLE}</h1>
            <p className="text-lead text-mut max-w-[60ch] mb-xl">{INTRO}</p>
            <Link to="/booking" data-cta="pricing" className="btn-primary">Book a 15-min ROI audit</Link>
          </div>
        </section>
        <section id="pricing" className="pb-xl md:pb-2xl scroll-mt-20">
          <div className="container-page"><div className="max-w-[720px]"><PriceCard /></div></div>
        </section>
        <Section id="calculator" alt title="What missed leads cost you" intro="Put in your own numbers. The defaults are a starting point.">
          <div className="max-w-[720px]"><RoiCalculator /></div>
        </Section>
      </>
    );
  }
  return (
    <Section id="pricing" titleAs={titleAs} title={TITLE} intro={INTRO}>
      <PricingGrid SubHeading="h3" />
    </Section>
  );
}

// Home: the price card and the calculator side by side under one section head.
function PricingGrid({ SubHeading }) {
  return (
    <div className="grid grid-cols-1 gap-lg lg:grid-cols-2 items-start">
      {/* Phones (under 1024px): the calculator comes first, so the break-even line isn't 1,100px down (design review D3). */}
      <div className="order-2 lg:order-1 min-w-0"><PriceCard /></div>
      <div className="order-1 lg:order-2 min-w-0"><RoiCalculator headingAs={SubHeading} /></div>
    </div>
  );
}

function PriceCard() {
  const offer = foundingOffer(FOUNDING_SEATS_LEFT, FOUNDING_SEATS);
  return (
        <div className="bg-card border border-line rounded-card p-lg md:p-xl">
          {offer && <p className="text-sm font-semibold text-accent mb-sm">{offer}</p>}
          <div className="flex items-baseline gap-xs flex-wrap">
            <span className="font-mono text-[3rem] leading-none text-ink tabular-nums">{usd(MONTHLY_PRICE)}</span>
            <span className="text-mut">/mo after {TRIAL_DAYS} days free, starting the day you go live</span>
          </div>
          {/* Once the founding seats are gone the fee is real, so it stops being struck through (D8). */}
          <p className="mt-xs">
            {offer
              ? <><s className="text-mut">{usd(SETUP_FEE)} setup</s> <span className="text-accent font-semibold">waived for our first {FOUNDING_SEATS} clinics</span></>
              : <span className="text-ink">{usd(SETUP_FEE)} one-time setup</span>}
          </p>

          <p className="mt-xl mb-sm font-semibold">Included</p>
          <ul className="space-y-sm">
            {FEATURES.map((f) => (
              <li key={f} className="flex gap-sm text-ink">
                <Check className="h-5 w-5 text-good shrink-0" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <p className="mt-xl mb-sm font-semibold">Not included</p>
          <ul className="space-y-sm">
            {NOT_INCLUDED.map((f) => (
              <li key={f} className="flex gap-sm text-mut">
                <X className="h-5 w-5 text-mut shrink-0" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          {/* D7: soft fair-use line; no minutes cap published. A well, not a bordered box inside the card. */}
          <p className="mt-xl mb-xl rounded-inner bg-bg2 p-md text-sm text-ink">
            Covers a typical single-location spa. If your volume ever goes over, we’ll tell you first. We never surprise-bill.
          </p>

          {/* Secondary: the calculator’s button (which carries the owner’s numbers) is the one filled primary here. */}
          <Link to="/booking" data-cta="pricing" className="btn-secondary w-full">Book a 15-min ROI audit</Link>
          <p className="text-center text-sm text-mut mt-sm">No lock-in. Cancel any month.</p>
        </div>
  );
}
