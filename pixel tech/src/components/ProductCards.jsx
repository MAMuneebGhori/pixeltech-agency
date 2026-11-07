// Static product UI mocks for How It Works (plan 4.3), built to DESIGN.md "UI simulation cards".
// Glow Med Spa and all names and figures are illustrative; the section captions that once, below the grid.

// One surface: a borderless well. The header names what it is; a time, when given, is a mono figure.
function Mock({ title, time, children }) {
  return (
    <figure className="min-w-0 bg-bg2 rounded-well p-md sm:p-lg">
      <div className="flex flex-wrap items-baseline justify-between gap-x-sm gap-y-2xs mb-md">
        <p className="text-sm font-semibold text-ink">{title}</p>
        {time && <time className="font-mono text-[13px] text-mut">{time}</time>}
      </div>
      {children}
    </figure>
  );
}

// The clinic's side (Ava) on card fill at the left; the patient on the deeper well at the right.
function Bubble({ who, caller, children }) {
  return (
    <li className={`rounded-inner px-3.5 py-sm max-w-[92%] sm:max-w-[85%] ${caller ? 'bg-bg3 ml-auto' : 'bg-card'}`}>
      <span className="block text-[13px] font-semibold text-mut mb-3xs">{who}</span>
      <span className="text-ink">{children}</span>
    </li>
  );
}

// Text only, never a dot; reads as status, not as a button.
const Chip = ({ children }) => (
  <span className="inline-block rounded-full bg-bg3 px-2.5 py-2xs text-[13px] text-ink">{children}</span>
);

// SRD F-10: the deflection line is the scripted one, word for word. Never show the AI answering a safety question.
export function CallCard() {
  return (
    <Mock title="Call with Glow Med Spa">
      <ol className="flex flex-col gap-xs">
        <Bubble who="Caller" caller>Is lip filler safe while I’m breastfeeding?</Bubble>
        <Bubble who="Ava">That’s best answered by our clinician — I’ll book you a consultation and flag your question. I have Thursday at 2 PM or Friday at 10 AM. Which works better?</Bubble>
        <Bubble who="Caller" caller>Yes, Thursday’s good.</Bubble>
      </ol>
      <div className="mt-md flex flex-wrap gap-xs">
        <Chip>Consult booked, Thu <span className="font-mono">2 PM</span></Chip>
        <Chip>Flagged for clinician</Chip>
      </div>
    </Mock>
  );
}

const THREADS = [
  { ch: 'Missed call', name: '(512) •••-0193', msg: 'Sorry we missed you! Want me to find you a consult time?', time: '7:14 PM', replied: '0:38' },
  { ch: 'Instagram', name: 'Maya R.', msg: 'How much is Botox for forehead lines?', time: '9:02 PM', replied: '0:41' },
  { ch: 'Messenger', name: 'Dana K.', msg: 'Do you have anything this Saturday?', time: '10:27 PM', replied: '0:52' },
];

export function InboxCard() {
  return (
    <Mock title="Every channel in one inbox">
      <ul className="rounded-inner bg-card divide-y divide-line">
        {THREADS.map((t) => (
          <li key={t.ch} className="min-w-0 px-3.5 py-sm">
            <div className="flex items-baseline justify-between gap-sm mb-2xs">
              <p className="min-w-0 truncate text-ink">
                <span className="font-semibold">{t.ch}</span> {t.name}
              </p>
              <time className="shrink-0 font-mono text-[13px] text-mut">{t.time}</time>
            </div>
            <p className="truncate text-mut mb-xs">{t.msg}</p>
            <Chip>Replied in <span className="font-mono">{t.replied}</span></Chip>
          </li>
        ))}
      </ul>
    </Mock>
  );
}

// SRD F-17: 24h + 2h reminders with quick replies, and a no-reply flag. Quick replies are message text, never buttons.
export function ReminderCard() {
  return (
    <Mock title="Reminders for a lip filler consult">
      <ol className="flex flex-col gap-xs">
        <Bubble who="24 hours before">
          Reminder: your lip filler consult is tomorrow at 11 AM at Glow Med Spa.
          <span className="block mt-2xs text-mut">Quick replies: Confirm, Reschedule, Cancel</span>
        </Bubble>
        <Bubble who="2 hours before">See you at 11 AM today. Reply R if you need to reschedule.</Bubble>
      </ol>
      <div className="mt-md rounded-inner bg-card px-3.5 py-sm">
        <p className="text-[13px] font-semibold text-ink2 mb-2xs">No-show risk</p>
        <p className="text-ink">Sat 9 AM booking hasn’t replied to either reminder. Flagged for your front desk.</p>
      </div>
    </Mock>
  );
}

// SRD F-19 to F-21: CSV import, sequenced follow-up with opt-out, results per campaign. The 90-day recall is one example sequence.
const RECALL = [
  ['Upload', 'CSV imported: 240 past clients'],
  ['Day 0', 'SMS: “It’s been about 3 months since your last Botox visit. Want to book a touch-up? Reply STOP to opt out.”'],
  ['Day 3', 'SMS follow-up to anyone who hasn’t replied'],
  ['Day 7', 'Email with this month’s consult times'],
];

export function RecallCard() {
  return (
    <Mock title="Botox recall, 90 days after the last visit">
      <ol className="border-l border-line ml-2xs flex flex-col gap-sm">
        {RECALL.map(([when, what]) => (
          <li key={when} className="pl-md">
            <span className="block font-mono text-[13px] text-mut">{when}</span>
            <span className="text-ink">{what}</span>
          </li>
        ))}
      </ol>
      <p className="mt-md text-ink">
        Result: <span className="font-mono tabular-nums">18</span> replied, <span className="font-mono tabular-nums">7</span> booked, <span className="font-mono tabular-nums">3</span> opted out.
      </p>
      <p className="mt-xs text-sm text-mut">Every message includes “Reply STOP to opt out”. Only sent to clients who already have a relationship with your clinic.</p>
    </Mock>
  );
}
