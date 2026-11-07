import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Product UI simulations (DESIGN.md "UI simulation cards"). Glow Med Spa and every name and figure are
// illustrative; each section captions that once, below its simulations.

// One surface: a borderless well. The header names what it is; a time, when given, is a mono figure.
export function Mock({ title, time, children, className = '' }) {
  return (
    <figure className={`min-w-0 bg-bg2 rounded-well p-md sm:p-lg ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-sm gap-y-2xs mb-md">
        <p className="text-sm font-semibold text-ink">{title}</p>
        {time && <time className="font-mono text-[13px] text-mut">{time}</time>}
      </div>
      {children}
    </figure>
  );
}

// The clinic's side (Ava) on card fill at the left; the patient on the deeper well at the right.
// `dim`/`current` drive the audio-synced highlight (opacity only, 220ms).
export function Bubble({ who, time, caller, current, dim, children }) {
  return (
    <li
      aria-current={current ? 'true' : undefined}
      className={`rounded-inner px-3.5 py-sm max-w-[92%] sm:max-w-[85%] transition-opacity duration-[220ms] ease-out ${
        caller ? 'bg-bg3 ml-auto' : 'bg-card'
      } ${dim ? 'opacity-50' : 'opacity-100'}`}
    >
      <span className="flex items-baseline justify-between gap-sm text-[13px] font-semibold text-mut mb-3xs">
        <span>{who}</span>
        {time && <time className="font-mono font-normal">{time}</time>}
      </span>
      <span className="text-ink">{children}</span>
    </li>
  );
}

// Text only, never a dot; reads as status, not as a button. `status` = an outcome, in clinical emerald.
export const Chip = ({ status, children }) => (
  <span className={`inline-block rounded-pill bg-bg3 px-2.5 py-2xs text-[13px] ${status ? 'text-good font-semibold' : 'text-ink'}`}>{children}</span>
);

// SRD F-10, shown under every conversation sample.
export function GuardrailLine({ className = '' }) {
  return (
    <p className={`rounded-inner bg-card px-3.5 py-sm text-sm text-ink ${className}`}>
      <span className="font-semibold text-good">Clinical guardrail.</span> Medical questions go to a clinician.
    </p>
  );
}

// Real buttons (aria-pressed), so they look like controls; one chip group per simulation.
export function Segmented({ label, options, value, onChange }) {
  return (
    <div role="group" aria-label={label} className="flex w-full sm:inline-flex sm:w-auto gap-2xs rounded-inner bg-bg3 p-2xs mb-md">
      {options.map((o, i) => (
        <button
          key={o}
          type="button"
          aria-pressed={i === value}
          onClick={() => onChange(i)}
          className={`flex-1 sm:flex-none whitespace-nowrap min-h-11 rounded-[8px] px-sm text-sm font-semibold transition-colors duration-[120ms] ${
            i === value ? 'bg-card text-ink' : 'text-mut hover:text-ink'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

// A row that opens to show what happened: native <details>, so it works by keyboard and without state.
function Row({ head, time, outcome, status, children }) {
  return (
    <li>
      <details className="group">
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-sm px-3.5 py-sm [&::-webkit-details-marker]:hidden">
          <time className="shrink-0 font-mono text-[13px] text-mut w-[4.5rem]">{time}</time>
          <span className="min-w-0 flex-1 text-ink sm:truncate">{head}</span>
          <span className="hidden sm:inline"><Chip status={status}>{outcome}</Chip></span>
          <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-mut transition-transform duration-[220ms] group-open:rotate-180" />
        </summary>
        <div className="px-3.5 pb-sm pl-[calc(4.5rem+1.625rem)] max-sm:pl-3.5 text-mut">
          <span className="sm:hidden mb-2xs block"><Chip status={status}>{outcome}</Chip></span>
          {children}
        </div>
      </details>
    </li>
  );
}

// (a) Everything that rang after close, and what happened to it.
const NIGHT = [
  { time: '7:48 PM', head: 'Lip filler pricing', outcome: 'Consult booked', status: true, detail: 'Quoted from your menu, offered two slots, booked Thursday at 2 PM and texted a confirmation.' },
  { time: '8:31 PM', head: 'Botox touch-up, Maya R.', outcome: 'Booked', status: true, detail: 'Returning patient. Booked Saturday at 11 AM with her usual injector.' },
  { time: '9:15 PM', head: 'Question about pregnancy', outcome: 'Sent to clinician', detail: 'Gave the clinician line word for word, booked a consult and flagged the question for your team.' },
  { time: '10:02 PM', head: 'Parking and hours', outcome: 'Answered', detail: 'Gave your hours and parking notes. No booking needed.' },
];

export function AfterHoursLog() {
  return (
    <Mock title="After close, last night" time="7 PM to 7 AM">
      <ul className="rounded-inner bg-card divide-y divide-line">
        {NIGHT.map((c) => <Row key={c.time} {...c}>{c.detail}</Row>)}
      </ul>
      <dl className="mt-md grid grid-cols-3 gap-sm">
        {[['Calls answered', '4'], ['Voicemails', '0'], ['Booked', '2']].map(([k, v]) => (
          <div key={k} className="border-t border-line pt-xs">
            <dt className="text-[13px] text-mut">{k}</dt>
            <dd className="font-mono text-2xl text-ink tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
    </Mock>
  );
}

// (b) Missed calls, DMs and texts in one list, each answered inside 60 seconds (SRD F-13, F-15).
const THREADS = [
  { time: '7:14 PM', head: 'Missed call, (512) •••-0193', replied: '0:38', reply: 'Sorry we missed you! Want me to find you a consult time?' },
  { time: '9:02 PM', head: 'Instagram, Maya R.', replied: '0:41', reply: 'Botox for forehead lines starts at $12 a unit. Want a Thursday or Friday consult?' },
  { time: '10:27 PM', head: 'Messenger, Dana K.', replied: '0:52', reply: 'Saturday has 11 AM or 1 PM open. Shall I hold one for you?' },
];

export function ThreadInbox() {
  return (
    <Mock title="Every channel, one inbox">
      <ul className="rounded-inner bg-card divide-y divide-line">
        {THREADS.map((t) => (
          <Row key={t.time} time={t.time} head={t.head} outcome={<>Replied in <span className="font-mono">{t.replied}</span></>} status>
            <span className="text-[13px] font-semibold text-mut">Ava replied</span>
            <span className="block text-ink">{t.reply}</span>
          </Row>
        ))}
      </ul>
    </Mock>
  );
}

// (c) SRD F-19 to F-21: CSV import, sequenced follow-up with opt-out, results per campaign.
const SEQUENCES = [
  {
    steps: [
      ['Day 90', 'SMS: “It’s been about 3 months since your last Botox visit. Want to book a touch-up? Reply STOP to opt out.”'],
      ['Day 93', 'Follow-up text to anyone who hasn’t replied'],
      ['Day 97', 'Email with this month’s consult times'],
    ],
    result: ['31 due', '12 booked', '1 opted out'],
  },
  {
    steps: [
      ['Upload', 'CSV imported: 240 past clients, sorted by last visit'],
      ['Day 0', 'SMS with a returning-client consult offer, with STOP to opt out'],
      ['Day 3', 'Follow-up text to anyone who hasn’t replied'],
      ['Day 7', 'Email with this month’s consult times'],
    ],
    result: ['18 replied', '7 booked', '3 opted out'],
  },
];

export function RecallTimeline() {
  const [seq, setSeq] = useState(0);
  const { steps, result } = SEQUENCES[seq];
  return (
    <Mock title="Recall and reactivation">
      <Segmented label="Sequence" options={['Botox recall', 'CSV upload']} value={seq} onChange={setSeq} />
      <ol key={seq} className="border-l border-line ml-2xs flex flex-col gap-sm motion-safe:animate-fade-in">
        {steps.map(([when, what]) => (
          <li key={when} className="pl-md">
            <span className="block font-mono text-[13px] text-mut">{when}</span>
            <span className="text-ink">{what}</span>
          </li>
        ))}
      </ol>
      <p className="mt-md flex flex-wrap gap-xs">
        {result.map((r) => {
          const [n, ...words] = r.split(' ');
          return <Chip key={r} status={r.includes('booked')}><span className="font-mono">{n}</span> {words.join(' ')}</Chip>;
        })}
      </p>
      <p className="mt-sm text-sm text-mut">Only sent to people who are already your clients. Every message carries an opt-out.</p>
    </Mock>
  );
}

// (d) SRD F-17: 24h and 2h reminders. Reschedule first: a "can't make it" gets two new times before any cancel.
const REMINDERS = [
  {
    time: 'Fri 11:00 AM',
    thread: [
      ['Ava, by text', 'Reminder: your lip filler consult is tomorrow at 11 AM at Glow Med Spa. Reply C to confirm or R to reschedule.'],
      ['Patient', 'R, something came up', true],
      ['Ava, by text', 'No problem. I can move you to Monday at 4 PM or Tuesday at 10 AM. Which works?'],
      ['Patient', 'Tuesday', true],
    ],
    outcome: [<>Rescheduled to Tue <span className="font-mono">10:00 AM</span></>, 'Saturday slot reopened'],
  },
  {
    time: 'Sat 9:00 AM',
    thread: [
      ['Ava, by text', 'See you at 11 AM today at Glow Med Spa. Reply R if you need to reschedule.'],
    ],
    outcome: ['No reply to either reminder', 'Flagged for your front desk'],
    quiet: true,
  },
];

export function NoShowShield() {
  const [r, setR] = useState(0);
  const { time, thread, outcome, quiet } = REMINDERS[r];
  return (
    <Mock title="No-show shield" time={time}>
      <Segmented label="Reminder sent before the visit" options={['24 hours', '2 hours']} value={r} onChange={setR} />
      <ol key={r} className="flex flex-col gap-xs motion-safe:animate-fade-in">
        {thread.map(([who, text, caller], i) => <Bubble key={i} who={who} caller={caller}>{text}</Bubble>)}
      </ol>
      <p className="mt-md flex flex-wrap gap-xs">
        <Chip status={!quiet}>{outcome[0]}</Chip>
        <Chip>{outcome[1]}</Chip>
      </p>
    </Mock>
  );
}
