import { useState } from 'react';

// `t` = seconds into public/demo-call.mp3. Replace lines and times with the real recording's transcript when it lands.
const TRANSCRIPT = [
  { t: 0, who: 'Ava', text: 'Thanks for calling Glow Med Spa, this is Ava. How can I help?' },
  { t: 4, who: 'Caller', text: 'Hi, how much is lip filler?' },
  { t: 7, who: 'Ava', text: 'Lip filler starts at $650 per syringe, and your consult is free. I have Thursday at 2 PM or Saturday at 11 AM. Which works better?' },
  { t: 16, who: 'Caller', text: 'Saturday at 11.' },
  { t: 18, who: 'Ava', text: "You’re booked for Saturday at 11 AM. I’ve just texted you a confirmation." },
];

// Set true in the same commit that adds public/demo-call.mp3 (plan S3). A build-time switch, not a
// loadedmetadata probe, because iOS Safari may not preload audio until a tap, which would hide the player forever.
const HAS_RECORDING = false;

// Last transcript line already reached at `time` (a loop, not findLastIndex, which crashes iOS < 15.4).
function activeLine(time) {
  for (let i = TRANSCRIPT.length - 1; i >= 0; i--) if (TRANSCRIPT[i].t <= time) return i;
  return -1;
}

export default function DemoCallCard() {
  const [hasAudio, setHasAudio] = useState(HAS_RECORDING);
  const [time, setTime] = useState(-1);
  const active = hasAudio && time >= 0 ? activeLine(time) : -1;

  return (
    // DESIGN.md simulation well: one surface, no border or shadow; bubbles carry no borders.
    <figure className="bg-bg2 rounded-well p-4 sm:p-6 text-left">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-4">
        <p className="text-sm font-semibold text-ink">Call with Glow Med Spa</p>
        <time className="font-mono text-[13px] text-mut">9:42 PM</time>
      </div>

      {/* Transcript-only until the recording ships; a broken file still hides the player. */}
      {hasAudio && (
        <audio
          controls
          preload="metadata"
          src="/demo-call.mp3"
          onError={() => { setHasAudio(false); setTime(-1); }}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onEnded={() => setTime(-1)}
          className="w-full mb-4"
        />
      )}

      {/* While audio plays, the spoken line stays at full opacity and the rest fade to 0.5 (opacity only). */}
      <ol className="flex flex-col gap-2">
        {TRANSCRIPT.map((line, i) => (
          <li
            key={i}
            aria-current={i === active ? 'true' : undefined}
            className={`rounded-inner px-3.5 py-3 max-w-[92%] sm:max-w-[85%] transition-opacity duration-[220ms] ease-out ${
              line.who === 'Caller' ? 'bg-bg3 ml-auto' : 'bg-card'
            } ${active >= 0 && i !== active ? 'opacity-50' : 'opacity-100'}`}
          >
            <span className="block text-[13px] font-semibold text-mut mb-0.5">{line.who}</span>
            <span className="text-ink">{line.text}</span>
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-inner bg-card px-3.5 py-3">
        <p className="text-[13px] font-semibold text-good mb-0.5">Text sent to the caller</p>
        <p className="text-ink">Glow Med Spa: You’re booked for lip filler consult, Sat 11:00 AM. Reply C to confirm or R to reschedule.</p>
      </div>
      <figcaption className="mt-4 text-sm text-mut">An example call. Glow Med Spa is a fictional clinic.</figcaption>
    </figure>
  );
}
