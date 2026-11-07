import { CallCard, InboxCard, ReminderCard, RecallCard } from './ProductCards';

// DESIGN.md: no eyebrow; the heading announces the section. 96px between sections on phones, 144px from md.
export function Section({ id, title, intro, alt, titleAs: Title = 'h2', children }) {
  return (
    <section id={id} className={`py-12 md:py-[72px] scroll-mt-20 ${alt ? 'bg-bg2' : ''}`}>
      <div className="container-page">
        <Title className="text-section max-w-[30ch] mb-5">{title}</Title>
        {intro && <p className="text-lead text-mut max-w-[60ch]">{intro}</p>}
        <div className="mt-12 md:mt-16">{children}</div>
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
      <div className="grid gap-10 lg:gap-8 lg:grid-cols-3">
        {LEAK_STATS.map((s) => (
          <div key={s.figure} className="border-t border-line pt-6 flex flex-col">
            <span className="font-mono text-[2.6rem] leading-none text-ink mb-4 tabular-nums">{s.figure}</span>
            <p className="text-ink leading-relaxed mb-6">{s.text}</p>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="mt-auto text-sm text-accent underline underline-offset-[0.18em] visited:text-ink2">
              Source: {s.source}
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}

const STEPS = [
  {
    Card: CallCard,
    title: 'Voice receptionist',
    text: 'Answers pricing, hours, parking and service questions (Botox, fillers, laser, facials and more), offers two real calendar slots, and texts a confirmation when the call ends.',
  },
  {
    Card: InboxCard,
    title: 'Missed-call text-back & DMs',
    text: 'If a call goes unanswered, or a message arrives on Instagram or Facebook, the system replies by text with the same service menu and booking logic.',
  },
  {
    Card: ReminderCard,
    title: 'No-show reminders',
    text: 'Texts patients 24 hours and 2 hours before their visit with quick replies to confirm, reschedule or cancel, and flags anyone who goes quiet.',
  },
  {
    Card: RecallCard,
    title: 'Old-lead reactivation',
    text: 'Upload your past client list. Opt-out-compliant SMS and email sequences reach back out, and every re-booked consult is logged.',
  },
];

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" title="One system, from the first ring to the follow-up.">
      {/* Each step sits on the page; its simulation is the only surface (no card around it). */}
      <ol className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        {STEPS.map((s) => (
          <li key={s.title} className="min-w-0 flex flex-col">
            <h3 className="text-title mb-3">{s.title}</h3>
            <p className="text-mut leading-relaxed mb-6 max-w-[60ch]">{s.text}</p>
            <s.Card />
          </li>
        ))}
      </ol>
      <p className="mt-10 text-sm text-mut">Examples use Glow Med Spa, a fictional clinic.</p>
    </Section>
  );
}

// Rule 5: no competitor names.
const COMPARE_COLS = ['Traditional answering service', 'In-house front desk alone', 'Booked Solid System'];
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
    <Section id="compare" alt title="What changes at your front desk.">
      {/* Full-width table, horizontal rules only; our column sits on the deeper well. */}
      <table className="hidden md:table w-full text-left">
        <thead>
          <tr className="border-b border-ink/20">
            <th scope="col" className="py-4 pr-4 text-sm font-semibold text-mut w-[22%]">Front-desk need</th>
            {COMPARE_COLS.map((c, i) => (
              <th key={c} scope="col" className={`py-4 px-4 text-sm font-semibold ${i === 2 ? 'text-ink bg-bg3 rounded-t-inner' : 'text-mut'}`}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map(([need, ...cells]) => (
            <tr key={need} className="border-b border-line last:border-0 align-top">
              <th scope="row" className="py-4 pr-4 font-semibold text-ink">{need}</th>
              {cells.map((c, i) => (
                <td key={i} className={`py-4 px-4 leading-relaxed ${i === 2 ? 'text-ink bg-bg3' : 'text-mut'}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phones: each row restacks as a labelled block, parted by hairlines. */}
      <div className="md:hidden">
        {COMPARE_ROWS.map(([need, ...cells]) => (
          <div key={need} className="border-t border-line py-6">
            <h3 className="font-body font-semibold text-base mb-4">{need}</h3>
            <dl className="space-y-3">
              {cells.map((c, i) => (
                <div key={i} className={i === 2 ? 'rounded-inner bg-bg3 p-3' : ''}>
                  <dt className="text-sm font-semibold text-mut">{COMPARE_COLS[i]}</dt>
                  <dd className={i === 2 ? 'text-ink' : 'text-mut'}>{c}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </Section>
  );
}

// Rule 4 / SRD §3: name only the P0 integrations as working.
const VERIFIED = ['Calendly', 'Google Calendar', 'Twilio'];
const COMPATIBLE = ['Square Appointments', 'Acuity', 'Vagaro', 'GlossGenius', 'Mindbody', 'Boulevard', 'Zenoti'];

export function StackSection() {
  return (
    <Section
      id="integrations"
      title="Keep the booking software you already use."
      intro="We connect to your calendar so the receptionist only offers times you actually have open."
    >
      {/* Wells, not cards: nothing here is clickable. */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="bg-bg2 rounded-well p-6 md:p-10">
          <h3 className="font-body font-semibold text-base mb-1">Working today</h3>
          <p className="text-mut text-sm mb-4">Direct integrations.</p>
          <ul className="flex flex-wrap gap-2">
            {VERIFIED.map((v) => <li key={v} className="rounded-full bg-card px-3.5 py-1.5 text-sm text-ink">{v}</li>)}
          </ul>
        </div>
        <div className="bg-bg2 rounded-well p-6 md:p-10">
          <h3 className="font-body font-semibold text-base mb-1">Compatible via direct API or monitored sync</h3>
          <p className="text-mut text-sm mb-4">We confirm the setup for your system on the audit call.</p>
          <ul className="flex flex-wrap gap-2">
            {COMPATIBLE.map((v) => <li key={v} className="rounded-full bg-bg3 px-3.5 py-1.5 text-sm text-mut">{v}</li>)}
          </ul>
        </div>
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
      <figure className="max-w-[560px] bg-bg2 rounded-well p-4 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-4">
          <p className="text-sm font-semibold text-ink">Daily digest from Glow Med Spa</p>
          <time className="font-mono text-[13px] text-mut">9:00 AM</time>
        </div>
        <dl className="mb-4">
          {DIGEST.map(([label, n]) => (
            <div key={label} className="flex items-baseline justify-between gap-4 border-t border-line py-3">
              <dt className="text-ink">{label}</dt>
              <dd className="font-mono text-lg text-ink tabular-nums">{n}</dd>
            </div>
          ))}
        </dl>
        <div className="rounded-inner bg-card px-3.5 py-3">
          <p className="text-[13px] font-semibold text-ink2 mb-1">Needs a person</p>
          <p className="text-ink">Jessica M. asked whether she can get filler while breastfeeding. Flagged for your clinician, with a consult booked for Thursday.</p>
        </div>
        <figcaption className="mt-4 text-sm text-mut">An example email for Glow Med Spa, a fictional clinic.</figcaption>
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
          <li key={i} className="grid grid-cols-[5rem_minmax(0,1fr)] gap-4 border-t border-line py-5 last:border-b">
            <span className="text-sm font-semibold text-ink2 pt-0.5">Day <span className="font-mono tabular-nums">{i + 1}</span></span>
            <p className="text-ink leading-relaxed">{text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
