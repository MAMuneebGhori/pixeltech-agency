// Static product UI mocks for How It Works (plan 4.3). Glow Med Spa and all names/figures are illustrative.

const mono = 'font-mono text-[0.66rem] uppercase tracking-wide';

function Mock({ title, meta, children }) {
  return (
    <figure className="rounded-xl bg-bg2 border border-line p-3.5 text-[0.85rem]">
      <figcaption className="flex items-center justify-between mb-3">
        <span className="font-semibold text-ink text-[0.8rem]">{title}</span>
        <span className={`${mono} text-mut`}>{meta}</span>
      </figcaption>
      {children}
    </figure>
  );
}

function Bubble({ who, children, right }) {
  return (
    <li className={`rounded-lg border border-line px-3 py-2 ${right ? 'bg-card ml-6' : 'bg-card/60 mr-6'}`}>
      <span className={`${mono} block text-mut mb-0.5`}>{who}</span>
      <span className="text-ink">{children}</span>
    </li>
  );
}

const Chip = ({ tone = 'mut', children }) => (
  <span className={`${mono} inline-block rounded-full border px-2 py-0.5 ${tone === 'good' ? 'border-good/40 text-good' : tone === 'accent' ? 'border-accent/40 text-accent' : 'border-line text-mut'}`}>
    {children}
  </span>
);

// SRD F-10: the deflection line is the scripted one, word for word. Never show the AI answering a safety question.
export function CallCard() {
  return (
    <Mock title="Live call · Glow Med Spa" meta="Example">
      <ol className="space-y-2">
        <Bubble who="Caller" right>Is lip filler safe while I'm breastfeeding?</Bubble>
        <Bubble who="AI">That's best answered by our clinician — I'll book you a consultation and flag your question. I have Thursday at 2 PM or Friday at 10 AM. Which works better?</Bubble>
        <Bubble who="Caller" right>Yes, Thursday's good.</Bubble>
      </ol>
      <div className="mt-3 flex flex-wrap gap-2">
        <Chip tone="good">Consult booked · Thu 2 PM</Chip>
        <Chip tone="accent">Flagged for clinician</Chip>
      </div>
    </Mock>
  );
}

const THREADS = [
  { ch: 'SMS', name: 'Missed call · (512) •••-0193', msg: 'Sorry we missed you! Want me to find you a consult time?', time: '7:14 PM', replied: '0:38' },
  { ch: 'Instagram', name: 'Maya R.', msg: 'How much is Botox for forehead lines?', time: '9:02 PM', replied: '0:41' },
  { ch: 'Messenger', name: 'Dana K.', msg: 'Do you have anything this Saturday?', time: '10:27 PM', replied: '0:52' },
];

export function InboxCard() {
  return (
    <Mock title="Inbox · all channels" meta="Example">
      <ul className="divide-y divide-line rounded-lg border border-line bg-card">
        {THREADS.map((t) => (
          <li key={t.ch} className="p-2.5">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="flex items-center gap-2 min-w-0">
                <Chip>{t.ch}</Chip>
                <span className="truncate font-medium text-ink text-[0.8rem]">{t.name}</span>
              </span>
              <span className="font-mono text-[0.66rem] text-mut shrink-0">{t.time}</span>
            </div>
            <p className="text-mut truncate">{t.msg}</p>
            <div className="mt-1.5"><Chip tone="good">Replied in {t.replied}</Chip></div>
          </li>
        ))}
      </ul>
    </Mock>
  );
}

// SRD F-17: 24h + 2h reminders with quick replies, and a no-reply flag.
export function ReminderCard() {
  return (
    <Mock title="Reminders · lip filler consult" meta="Example">
      <ol className="space-y-2">
        <Bubble who="24h before">Reminder: your lip filler consult is tomorrow at 11 AM at Glow Med Spa.</Bubble>
        <li className="flex flex-wrap gap-2 ml-1">
          {['Confirm', 'Reschedule', 'Cancel'].map((q) => (
            <span key={q} className="rounded-full border border-line bg-card px-3 py-1 text-[0.78rem] text-ink">{q}</span>
          ))}
        </li>
        <Bubble who="2h before">See you at 11 AM today. Reply R if you need to reschedule.</Bubble>
      </ol>
      <div className="mt-3 rounded-lg border border-accent/40 bg-card p-2.5 text-[0.8rem] text-ink">
        <Chip tone="accent">No-show risk</Chip>
        <span className="block mt-1">Sat 9 AM booking hasn't replied to either reminder. Flagged for your front desk.</span>
      </div>
    </Mock>
  );
}

// SRD F-19–F-21: CSV import, sequenced follow-up with opt-out, results per campaign. The 90-day recall is one example sequence.
const RECALL = [
  ['Upload', 'CSV imported: 240 past clients'],
  ['Day 0', 'SMS: "It\'s been about 3 months since your last Botox visit. Want to book a touch-up? Reply STOP to opt out."'],
  ['Day 3', 'SMS follow-up to anyone who hasn\'t replied'],
  ['Day 7', 'Email with this month\'s consult times'],
];

export function RecallCard() {
  return (
    <Mock title="Botox recall · 90 days after last visit" meta="Example sequence">
      <ol className="relative border-l border-line ml-1.5 space-y-3">
        {RECALL.map(([when, what]) => (
          <li key={when} className="pl-4 relative">
            <span aria-hidden="true" className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <span className={`${mono} block text-accent`}>{when}</span>
            <span className="text-ink">{what}</span>
          </li>
        ))}
      </ol>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[['Replied', 18], ['Booked', 7], ['Opted out', 3]].map(([label, n]) => (
          <div key={label} className="flex flex-col-reverse rounded-lg border border-line bg-card p-2">
            <dt className="text-[0.7rem] text-mut">{label}</dt>
            <dd className="font-mono text-[1.1rem] text-ink">{n}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2.5 text-[0.72rem] text-mut">Every message includes "Reply STOP to opt out". Only sent to clients who already have a relationship with your clinic.</p>
    </Mock>
  );
}
