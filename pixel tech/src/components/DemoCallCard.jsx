import { useState } from 'react';

// `t` = seconds into public/demo-call.mp3. Replace lines and times with the real recording's transcript when it lands.
const TRANSCRIPT = [
  { t: 0, who: 'AI', text: 'Thanks for calling Glow Med Spa, this is Ava. How can I help?' },
  { t: 4, who: 'Caller', text: 'Hi, how much is lip filler?' },
  { t: 7, who: 'AI', text: 'Lip filler starts at $650 per syringe, and your consult is free. I have Thursday at 2 PM or Saturday at 11 AM. Which works better?' },
  { t: 16, who: 'Caller', text: 'Saturday at 11.' },
  { t: 18, who: 'AI', text: "You're booked for Saturday at 11 AM. I've just texted you a confirmation." },
];

export default function DemoCallCard() {
  const [hasAudio, setHasAudio] = useState(false);
  const [time, setTime] = useState(-1);
  const active = hasAudio && time >= 0 ? TRANSCRIPT.findLastIndex((l) => l.t <= time) : -1;

  return (
    <div className="bg-card border border-line rounded-[18px] p-5 sm:p-6 shadow-[0_30px_80px_rgba(20,20,19,0.08)] text-left">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[0.8rem] font-semibold text-ink">Glow Med Spa · example call</span>
        <span className="font-mono text-[0.72rem] text-mut">9:42 PM</span>
      </div>

      {/* Hidden until the file loads, so the card is transcript-only while demo-call.mp3 doesn't exist. */}
      <audio
        controls
        preload="metadata"
        src="/demo-call.mp3"
        hidden={!hasAudio}
        onLoadedMetadata={() => setHasAudio(true)}
        onError={() => setHasAudio(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        className="w-full mb-4"
      />

      <ol className="space-y-2.5">
        {TRANSCRIPT.map((line, i) => (
          <li
            key={i}
            className={`rounded-xl px-3.5 py-2.5 text-[0.92rem] border transition-colors ${
              line.who === 'AI' ? 'bg-bg2 border-line' : 'bg-card border-line ml-8'
            } ${i === active ? 'border-accent text-ink' : active >= 0 ? 'text-mut' : 'text-ink'}`}
          >
            <span className="block font-mono text-[0.68rem] uppercase tracking-wide text-mut mb-0.5">{line.who}</span>
            {line.text}
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-xl border border-good/30 bg-good/5 px-3.5 py-2.5 text-[0.85rem] text-ink">
        <span className="font-mono text-[0.68rem] uppercase tracking-wide text-good block mb-0.5">SMS sent</span>
        Glow Med Spa: You're booked for lip filler consult, Sat 11:00 AM. Reply C to confirm or R to reschedule.
      </div>
    </div>
  );
}
