import { useState } from 'react';
import { AfterHoursLog, ThreadInbox, RecallTimeline, NoShowShield } from './ProductCards';
import { useReveal } from '../lib/useReveal';
import { onTabKey } from '../lib/tabKeys';

// A + mark on a hairline seam (index.css .cross); the parent is position: relative.
export const Cross = ({ className }) => <span aria-hidden="true" className={`cross ${className}`} />;

// DESIGN.md: no eyebrow; the heading announces the section. Each section opens on a hairline seam with a
// + at each end, then the head and the content settle in turn as it scrolls into view (useReveal).
// seam={false} for a page's first section, which already sits on the nav's rule.
export function Section({ id, title, intro, alt, seam = true, titleAs: Title = 'h2', children }) {
  const ref = useReveal();
  return (
    <section ref={ref} id={id} className={`pb-xl md:pb-2xl scroll-mt-20 ${alt ? 'bg-bg2' : ''}`}>
      <div className="container-page">
        <div className={`relative pt-xl md:pt-2xl ${seam ? 'border-t border-line' : ''}`}>
          {seam && <><Cross className="-top-[5px] -left-[5px]" /><Cross className="-top-[5px] -right-[5px]" /></>}
          <div data-reveal>
            <Title className="text-section max-w-[30ch] mb-lg">{title}</Title>
            {intro && <p className="text-lead text-mut max-w-[60ch]">{intro}</p>}
          </div>
          <div data-reveal style={{ '--reveal-i': 1 }} className="mt-xl md:mt-2xl">{children}</div>
        </div>
      </div>
    </section>
  );
}

// D4: only stats traced to a named source; each card links to it.
const LEAK_STATS = [
  {
    figure: '37%',
    text: 'of calls to salons and spas go unanswered. 82% of those are missed during business hours, while the front desk is busy with patients.',
    source: 'Zenoti, 3,500+ locations, 2026',
    href: 'https://www.zenoti.com/thecheckin/how-track-salon-call-conversion-rate',
  },
  {
    // Checked 2026-11-06 via press coverage (the Moneypenny page itself returns 403 to automated fetches).
    figure: '69%',
    text: 'of callers who reach voicemail hang up without leaving a message.',
    source: 'Moneypenny Small Business Call Report (UK, 10,000 businesses)',
    href: 'https://moneypenny.com/us/resources/news/small-business-call-report/',
  },
  {
    figure: '7×',
    text: 'more likely to reach a real conversation when a lead is contacted within an hour, compared with an hour later.',
    source: 'Harvard Business Review, 2011 (1.25M leads)',
    href: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads',
  },
];

export function RevenueLeakSection() {
  return (
    <Section
      id="leak"
      alt
      title={<>Your clinic doesn’t have a lead problem.<br />It has a follow-up problem.</>}
      intro="You pay to make the phone ring. Then the call lands while your team is with a patient, the DM sits until morning, and the lead books somewhere else."
    >
      {/* Sibling stats part with a top hairline, not cards on the tinted band. */}
      <div className="grid gap-xl lg:gap-(--gap-columns) lg:grid-cols-3">
        {LEAK_STATS.map((s) => (
          <div key={s.figure} className="border-t border-line pt-lg flex flex-col">
            <span className="font-mono text-[2.6rem] leading-none text-ink mb-md tabular-nums">{s.figure}</span>
            <p className="text-ink leading-relaxed mb-lg">{s.text}</p>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="mt-auto text-sm text-accent underline underline-offset-[0.18em] visited:text-ink2">
              Source: {s.source}
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}

// Asymmetric bento (7/5 over 5/7): cells are ruled by 1px hairlines (the gap shows the line colour through),
// never cards, so each simulation well stays the only surface. + marks sit on the outer corners.
const BENTO = [
  { Card: AfterHoursLog, span: 'lg:col-span-7', title: 'Nothing goes to voicemail', text: 'Calls after close and on weekends are answered, quoted from your menu and booked. Tap a call to see what happened.' },
  { Card: ThreadInbox, span: 'lg:col-span-5', title: 'A reply inside 60 seconds', text: 'Missed calls, Instagram and Facebook messages get a text back with real times to book.' },
  { Card: RecallTimeline, span: 'lg:col-span-5', title: 'Past clients come back', text: 'Upload your client list. Opt-out-compliant texts and emails reach out on a schedule.' },
  { Card: NoShowShield, span: 'lg:col-span-7', title: 'Reschedule before cancel', text: 'Reminders go out 24 hours and 2 hours before. Anyone who can’t make it is offered two new times first.' },
];

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" title="One system, from the first ring to the follow-up.">
      <div className="relative">
        <Cross className="-top-[5px] -left-[5px]" />
        <Cross className="-top-[5px] -right-[5px]" />
        <Cross className="-bottom-[5px] -left-[5px]" />
        <Cross className="-bottom-[5px] -right-[5px]" />
        <ul className="grid gap-px bg-line border border-line lg:grid-cols-12">
          {BENTO.map(({ Card, span, title, text }) => (
            <li key={title} className={`min-w-0 bg-bg p-md sm:p-lg lg:p-xl flex flex-col ${span}`}>
              <h3 className="text-title mb-xs">{title}</h3>
              <p className="text-mut leading-relaxed mb-lg max-w-[52ch]">{text}</p>
              <div className="lift"><Card /></div>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-lg text-sm text-mut">Examples use Glow Med Spa, a fictional clinic.</p>
    </Section>
  );
}

// Rule 5: no competitor names.
// Rows list ours last; the table shows it first after the need, so phones see it before swiping.
const COMPARE_COLS = ['Booked Solid System', 'Traditional answering service', 'In-house front desk alone'];
const COMPARE_ROWS = [
  ['After-hours & weekend calls', 'Takes a message and leaves a callback list for the morning.', 'Goes to voicemail after closing and on weekends.', 'Answers, follows your rules, books the slot and texts a confirmation.'],
  ['Appointment booking', 'Passes on "patient wants an appointment" notes.', 'Interrupted while checking out patients in person.', 'Checks your live calendar, offers two specific times and books directly.'],
  ['Texts & Instagram/Facebook DMs', 'Phone only.', 'Replies hours later, when someone is free.', 'Replies automatically to missed calls, texts and DMs.'],
  // SRD F-13 / F-15: our own SLA, not a market stat.
  ['Missed-call text-back speed', 'Usually no automatic text-back; callers wait for a callback.', 'Whenever someone checks the missed-call list.', 'A text back within 60 seconds.'],
  ['Clinical guardrails', 'Operators can go off-script.', 'Staff turnover means constant retraining.', 'Never diagnoses. Routes medical questions to a consult and alerts your staff.'],
  ['Visibility & old leads', 'Basic call logs, no outreach.', 'Spreadsheets; old leads sit untouched.', 'A 9 AM owner digest, searchable transcripts and old-lead reactivation.'],
];

export function ComparisonSection() {
  return (
    <Section id="compare" alt title="Why practices switch to us.">
      {/* A spec sheet. Desktop: the head row sticks under the nav (77px: 44px nav button + 2 x 16px padding + 1px rule) while the rows scroll past. Phones: the
          table scrolls sideways inside its own box with the first column pinned. Our column is the deeper well
          with a bronze rule on top. */}
      <p className="mb-md text-sm text-mut md:hidden">Swipe the table sideways to compare.</p>
      <div className="-mx-(--gutter) overflow-x-auto px-(--gutter) md:mx-0 md:overflow-visible md:px-0">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <caption className="sr-only">Booked Solid compared with a traditional answering service and an in-house front desk alone</caption>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-20 md:top-[77px] bg-bg2 border-b border-ink/20 py-md pr-md text-sm font-semibold text-mut w-[9rem] md:w-[22%]">Front-desk need</th>
              {COMPARE_COLS.map((c, i) => (
                <th key={c} scope="col" className={`md:sticky md:top-[77px] z-10 border-b border-ink/20 py-md px-md text-sm font-semibold ${
                  i === 0 ? 'bg-bg3 text-ink border-t-2 border-t-gold' : 'bg-bg2 text-mut'
                }`}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map(([need, answering, inHouse, ours]) => (
              <tr key={need} className="border-b border-line last:border-0 align-top">
                <th scope="row" className="sticky left-0 z-10 bg-bg2 py-md pr-md font-semibold text-ink">{need}</th>
                {[ours, answering, inHouse].map((c, i) => (
                  <td key={i} className={`py-md px-md leading-relaxed ${i === 0 ? 'text-ink bg-bg3' : 'text-mut'}`}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

// Rule 4 / SRD §3: only the P0 integrations are named as working; the rest are "compatible".
const VERIFIED = ['Calendly', 'Google Calendar'];
const COMPATIBLE = ['Square Appointments', 'Vagaro', 'Boulevard', 'Acuity', 'GlossGenius', 'Mindbody', 'Zenoti'];

// SRD §1 flow, in client words. No latency figure until the Phase 0 battery is measured (guardrail 4).
const FLOW = [
  {
    title: 'A patient reaches out',
    sub: 'Call, text, Instagram or Facebook DM',
    detail: <p className="text-ink">Calls and texts arrive on your clinic number, ported or new, and run through Twilio. Instagram and Facebook messages come in through your connected accounts, day or night.</p>,
  },
  {
    title: 'The receptionist answers',
    sub: '24/7, with clinical guardrails',
    detail: <p className="text-ink">Ava answers from your menu, prices and policies. A medical question gets the clinician line and a booked consult, never advice. An emergency is told to call 911, and your staff are alerted.</p>,
  },
  {
    title: 'It books your calendar',
    sub: 'Only times you actually have open',
    detail: (
      <div className="grid gap-lg sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-ink mb-xs">Working today</p>
          <ul className="flex flex-wrap gap-xs">
            {VERIFIED.map((v) => <li key={v} className="rounded-pill bg-card px-2.5 py-2xs text-sm text-ink">{v}</li>)}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink mb-xs">Compatible via direct API or monitored sync</p>
          <ul className="flex flex-wrap gap-xs">
            {COMPATIBLE.map((v) => <li key={v} className="rounded-pill bg-bg3 px-2.5 py-2xs text-sm text-mut">{v}</li>)}
          </ul>
          <p className="mt-xs text-sm text-mut">We confirm the setup for your system on the audit call.</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Everyone hears about it',
    sub: 'A text to the patient, a 9 AM digest to you',
    detail: <p className="text-ink">The patient gets a text confirmation, then reminders. You get one email at 9 AM with every lead, every booking and anything that needs a person.</p>,
  },
];

// Arrow between steps: points right from md up, down on phones (a static rotate, no animation).
const Arrow = () => (
  <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-gold h-lg md:h-auto md:w-lg">
    <svg viewBox="0 0 24 12" className="w-6 h-3 rotate-90 md:rotate-0" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M0 6h22M17 1l5 5-5 5" />
    </svg>
  </span>
);

export function StackSection() {
  const [step, setStep] = useState(1);
  return (
    <Section
      id="integrations"
      title="How a lead becomes a booking."
      intro="Four steps, running day and night, on the booking software you already use. Pick a step to see what happens there."
    >
      {/* Tabs: each step is a real control (a card, because it is interactive); its detail is the panel below. */}
      <div role="tablist" aria-label="How it connects" className="flex flex-col md:flex-row md:items-stretch">
        {FLOW.map((f, i) => (
          <div key={f.title} className="contents">
            {i > 0 && <Arrow />}
            <button
              type="button"
              role="tab"
              id={`flow-tab-${i}`}
              aria-selected={i === step}
              aria-controls="flow-panel"
              tabIndex={i === step ? 0 : -1}
              onClick={() => setStep(i)}
              onKeyDown={(e) => onTabKey(e, i, FLOW.length, setStep)}
              className={`md:flex-1 min-w-0 text-left rounded-card border p-md md:p-lg transition-colors duration-[220ms] ${
                i === step ? 'bg-card border-ink' : 'bg-bg border-line hover:border-ink/40'
              }`}
            >
              <span className="block font-mono text-[13px] text-mut mb-xs">{i + 1}</span>
              <span className="block text-title text-ink mb-2xs">{f.title}</span>
              <span className="block text-sm text-mut">{f.sub}</span>
            </button>
          </div>
        ))}
      </div>
      <div key={step} id="flow-panel" role="tabpanel" aria-labelledby={`flow-tab-${step}`}
        className="mt-lg rounded-well bg-bg2 p-lg md:p-xl max-w-[820px] motion-safe:animate-fade-in">
        {FLOW[step].detail}
      </div>
    </Section>
  );
}

// SRD F-23. Stands in for testimonials until client #1 (rule 3); figures are a labelled example.
const DIGEST = [
  ['New leads', '14'],
  ['Consults booked', '6'],
  ['After-hours calls answered', '5'],
  ['No-show risks flagged', '1'],
];

export function DigestSection() {
  return (
    <Section
      id="digest"
      title="See every lead, every morning."
      intro="Each morning you get one email: yesterday’s leads, what got booked, and anything that needs a person. Full transcripts are searchable in your dashboard."
    >
      {/* A simulation well (DESIGN.md): one surface, hairline rows, no stat tiles. */}
      <figure className="max-w-[560px] bg-bg2 rounded-well p-md sm:p-lg">
        <div className="flex flex-wrap items-baseline justify-between gap-x-sm gap-y-2xs mb-md">
          <p className="text-sm font-semibold text-ink">Daily digest from Glow Med Spa</p>
          <time className="font-mono text-[13px] text-mut">9:00 AM</time>
        </div>
        <dl className="mb-md">
          {DIGEST.map(([label, n]) => (
            <div key={label} className="flex items-baseline justify-between gap-md border-t border-line py-sm">
              <dt className="text-ink">{label}</dt>
              <dd className="font-mono text-lg text-ink tabular-nums">{n}</dd>
            </div>
          ))}
        </dl>
        <div className="rounded-inner bg-card px-3.5 py-sm">
          <p className="text-[13px] font-semibold text-ink2 mb-2xs">Needs a person</p>
          <p className="text-ink">Jessica M. asked whether she can get filler while breastfeeding. Flagged for your clinician, with a consult booked for Thursday.</p>
        </div>
        <figcaption className="mt-md text-sm text-mut">An example email for Glow Med Spa, a fictional clinic.</figcaption>
      </figure>
    </Section>
  );
}

// SRD §6, one entry per day. Rule 6: a target runbook, not a guarantee, until one client has gone through it.
const RUNBOOK = [
  'Kickoff call. We collect your brand pack, service menu, pricing, hours, policies and staff contacts.',
  'Your phone number is set up (new or ported from your current one), along with your receptionist and its knowledge base.',
  'Your calendar is connected, and the text, reminder and staff-alert workflows are built.',
  'Instagram and Facebook are connected, missed-call routing is switched on and your escalation rules are set.',
  'Internal QA: a 20-call test run, with every failure fixed.',
  'You role-play 5 scenarios with the receptionist and sign off.',
  'Soft launch on after-hours calls only for 48 hours, then 24/7. You get dashboard access and a 30-minute training.',
];

export function GoLiveSection() {
  return (
    <Section
      id="go-live"
      alt
      title="How we plan to get you live in a week."
      intro="This is our target runbook. Your timeline depends on your calendar system and how quickly we get your menu and policies."
    >
      {/* One column of seven rows, so no row is ever left orphaned. */}
      <ol className="max-w-[820px]">
        {RUNBOOK.map((text, i) => (
          <li key={i} className="grid grid-cols-[5rem_minmax(0,1fr)] gap-md border-t border-line py-lg last:border-b">
            <span className="text-sm font-semibold text-ink2 pt-3xs">Day <span className="font-mono tabular-nums">{i + 1}</span></span>
            <p className="text-ink leading-relaxed">{text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
