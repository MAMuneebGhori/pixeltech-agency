import { CallCard, InboxCard, ReminderCard, RecallCard } from './ProductCards';

export function Section({ id, eyebrow, title, intro, alt, titleAs: Title = 'h2', children }) {
  return (
    <section id={id} className={`py-20 md:py-28 border-b border-line scroll-mt-20 ${alt ? 'bg-bg2' : ''}`}>
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-12"
      >
        <p className="font-mono text-[0.72rem] uppercase tracking-wider text-mut mb-3">{eyebrow}</p>
        <Title className="text-[2.2rem] md:text-5xl leading-[1.08] mb-4 max-w-[760px]">{title}</Title>
        {intro && <p className="text-mut text-[1.05rem] leading-relaxed max-w-[640px] mb-12">{intro}</p>}
        {!intro && <div className="mb-12" />}
        {children}
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
    // Moneypenny blocks automated access: confirm this figure by hand before launch (plan D4).
    figure: '69%',
    text: 'of callers who reach voicemail hang up without leaving a message. They call the next clinic instead.',
    source: 'Moneypenny Small Business Call Report',
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
      eyebrow="The revenue leak"
      title={<>Your clinic doesn't have a lead problem. <em className="text-accent">It has a follow-up problem.</em></>}
      intro="You pay to make the phone ring. Then the call lands while your team is with a patient, the DM sits until morning, and the lead books somewhere else."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {LEAK_STATS.map((s) => (
          <div key={s.figure} className="bg-card border border-line rounded-[18px] p-6 flex flex-col">
            <span className="font-mono text-[2.6rem] leading-none text-ink mb-4">{s.figure}</span>
            <p className="text-ink text-[0.98rem] leading-relaxed mb-6">{s.text}</p>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="mt-auto text-[0.78rem] text-accent underline underline-offset-2">
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
    n: '01',
    Card: CallCard,
    title: 'Voice receptionist',
    text: 'Answers pricing, hours, parking and service questions (Botox, fillers, laser, facials and more), offers two real calendar slots, and texts a confirmation when the call ends.',
  },
  {
    n: '02',
    Card: InboxCard,
    title: 'Missed-call text-back & DMs',
    text: 'If a call goes unanswered, or a message arrives on Instagram or Facebook, the system replies by text with the same service menu and booking logic.',
  },
  {
    n: '03',
    Card: ReminderCard,
    title: 'No-show reminders',
    text: 'Texts patients 24 hours and 2 hours before their visit with quick replies to confirm, reschedule or cancel, and flags anyone who goes quiet.',
  },
  {
    n: '04',
    Card: RecallCard,
    title: 'Old-lead reactivation',
    text: 'Upload your past client list. Opt-out-compliant SMS and email sequences reach back out, and every re-booked consult is logged.',
  },
];

export function HowItWorksSection() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="One system, from the first ring to the follow-up."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {STEPS.map((s) => (
          <div key={s.n} className="bg-card border border-line rounded-[18px] p-6">
            <span className="font-mono text-[0.8rem] text-accent">{s.n}</span>
            <h3 className="text-[1.8rem] mt-1 mb-3">{s.title}</h3>
            <p className="text-mut leading-relaxed mb-5">{s.text}</p>
            <s.Card />
          </div>
        ))}
      </div>
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
    <Section id="compare" alt eyebrow="Why practices switch to us" title="What changes at your front desk.">
      {/* Table from md up; stacked cards on mobile. */}
      <div className="hidden md:block overflow-hidden rounded-[18px] border border-line bg-card">
        <table className="w-full text-left text-[0.92rem]">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="p-4 font-semibold text-mut w-[22%]">Front-desk need</th>
              {COMPARE_COLS.map((c, i) => (
                <th key={c} scope="col" className={`p-4 font-semibold ${i === 2 ? 'text-ink bg-bg2' : 'text-mut'}`}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map(([need, ...cells]) => (
              <tr key={need} className="border-b border-line last:border-0 align-top">
                <th scope="row" className="p-4 font-semibold text-ink">{need}</th>
                {cells.map((c, i) => (
                  <td key={i} className={`p-4 leading-relaxed ${i === 2 ? 'text-ink bg-bg2 font-medium' : 'text-mut'}`}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {COMPARE_ROWS.map(([need, ...cells]) => (
          <div key={need} className="bg-card border border-line rounded-[18px] p-5">
            <h3 className="font-body font-semibold text-[1rem] mb-3">{need}</h3>
            <dl className="space-y-3 text-[0.9rem]">
              {cells.map((c, i) => (
                <div key={i} className={i === 2 ? 'rounded-xl bg-bg2 p-3' : ''}>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-wide text-mut">{COMPARE_COLS[i]}</dt>
                  <dd className={i === 2 ? 'text-ink font-medium' : 'text-mut'}>{c}</dd>
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
      eyebrow="Works with your stack"
      title="Keep the booking software you already use."
      intro="We connect to your calendar so the receptionist only offers times you actually have open."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="bg-card border border-line rounded-[18px] p-6">
          <h3 className="font-body font-semibold text-[1rem] mb-1">Working today</h3>
          <p className="text-mut text-[0.9rem] mb-4">Direct integrations.</p>
          <ul className="flex flex-wrap gap-2">
            {VERIFIED.map((v) => <li key={v} className="rounded-full border border-good/40 bg-good/5 px-3.5 py-1.5 text-[0.9rem] text-ink">{v}</li>)}
          </ul>
        </div>
        <div className="bg-card border border-line rounded-[18px] p-6">
          <h3 className="font-body font-semibold text-[1rem] mb-1">Compatible via direct API or monitored sync</h3>
          <p className="text-mut text-[0.9rem] mb-4">We confirm the setup for your system on the audit call.</p>
          <ul className="flex flex-wrap gap-2">
            {COMPATIBLE.map((v) => <li key={v} className="rounded-full border border-line px-3.5 py-1.5 text-[0.9rem] text-mut">{v}</li>)}
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
      eyebrow="Your 9 AM digest"
      title="See every lead, every morning."
      intro="Each morning you get one email: yesterday's leads, what got booked, and anything that needs a person. Full transcripts are searchable in your dashboard."
    >
      <div className="max-w-[560px] bg-card border border-line rounded-[18px] p-6 shadow-[0_30px_80px_rgba(20,20,19,0.06)]">
        <div className="flex items-center justify-between border-b border-line pb-4 mb-4">
          <div>
            <p className="font-semibold text-ink text-[0.95rem]">Glow Med Spa · Daily digest</p>
            <p className="text-mut text-[0.8rem]">Example email</p>
          </div>
          <span className="font-mono text-[0.72rem] text-mut">9:00 AM</span>
        </div>
        <dl className="grid grid-cols-2 gap-3 mb-4">
          {DIGEST.map(([label, n]) => (
            <div key={label} className="flex flex-col-reverse rounded-xl bg-bg2 border border-line p-3.5">
              <dt className="text-[0.8rem] text-mut mt-1.5">{label}</dt>
              <dd className="font-mono text-[1.6rem] leading-none text-ink">{n}</dd>
            </div>
          ))}
        </dl>
        <div className="rounded-xl border border-accent/40 p-3.5 text-[0.9rem]">
          <p className="font-mono text-[0.68rem] uppercase tracking-wide text-accent mb-1">Needs a person</p>
          <p className="text-ink">Jessica M. asked whether she can get filler while breastfeeding. Flagged for your clinician, with a consult booked for Thursday.</p>
        </div>
      </div>
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
      eyebrow="Target: live in 7 days"
      title="How we plan to get you live in a week."
      intro="This is our target runbook. Your timeline depends on your calendar system and how quickly we get your menu and policies."
    >
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {RUNBOOK.map((text, i) => (
          <li key={i} className="relative bg-card border border-line rounded-[18px] p-6">
            <span className="font-mono text-[0.72rem] uppercase tracking-wide text-accent">Day {i + 1}</span>
            <p className="mt-3 text-ink leading-relaxed text-[0.95rem]">{text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
