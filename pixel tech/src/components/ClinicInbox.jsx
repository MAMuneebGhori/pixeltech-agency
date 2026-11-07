import { useState } from 'react';
import { Bubble, Chip, GuardrailLine } from './ProductCards';
import { onTabKey } from '../lib/tabKeys';

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

// Fixed bar heights (no randomness, so renders match). Played bars are full ink; the rest fade (opacity only).
const BARS = Array.from({ length: 56 }, (_, i) => 6 + Math.round(18 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.23))));

function VoiceCall() {
  const [hasAudio, setHasAudio] = useState(HAS_RECORDING);
  const [time, setTime] = useState(-1);
  const [duration, setDuration] = useState(0);
  const active = hasAudio && time >= 0 ? activeLine(time) : -1;
  const played = duration > 0 && time >= 0 ? time / duration : 0;

  return (
    <>
      {/* Transcript-only until the recording ships; a broken file still hides the player. preload="none":
          nothing downloads until the visitor presses play, so the hero stays light. */}
      {hasAudio && (
        <div className="mb-md">
          <svg aria-hidden="true" viewBox={`0 0 ${BARS.length * 5} 30`} className="w-full h-8 mb-xs" preserveAspectRatio="none">
            {BARS.map((h, i) => (
              <rect key={i} x={i * 5} y={(30 - h) / 2} width="3" height={h} rx="1.5"
                className="fill-ink transition-opacity duration-[220ms]" opacity={i / BARS.length < played ? 1 : 0.3} />
            ))}
          </svg>
          <audio
            controls
            preload="none"
            src="/demo-call.mp3"
            onError={() => { setHasAudio(false); setTime(-1); }}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onEnded={() => setTime(-1)}
            className="w-full"
          />
        </div>
      )}
      {/* While audio plays, the spoken line stays at full opacity and the rest fade to 0.5 (opacity only). */}
      <ol className="flex flex-col gap-xs">
        {TRANSCRIPT.map((line, i) => (
          <Bubble key={i} who={line.who} caller={line.who === 'Caller'} current={i === active} dim={active >= 0 && i !== active}>
            {line.text}
          </Bubble>
        ))}
      </ol>
    </>
  );
}

// SRD F-13: a missed call gets a text within 60 seconds. Times are mono figures.
function TextBack() {
  return (
    <>
      <p className="text-sm text-mut mb-sm">Missed call from (512) •••-0193 at <span className="font-mono">7:14 PM</span></p>
      <ol className="flex flex-col gap-xs">
        <Bubble who="Ava, by text" time="7:14 PM">Sorry we missed your call! This is Ava at Glow Med Spa. Want me to find you a consult time?</Bubble>
        <Bubble who="Patient" time="7:16 PM" caller>Yes please, Botox. Anything Friday?</Bubble>
        <Bubble who="Ava, by text" time="7:16 PM">Friday at 10 AM or 3 PM?</Bubble>
        <Bubble who="Patient" time="7:17 PM" caller>3 works.</Bubble>
      </ol>
      <div className="mt-md flex flex-wrap gap-xs">
        <Chip status>Texted back in <span className="font-mono">0:38</span></Chip>
        <Chip>Booked, Fri <span className="font-mono">3:00 PM</span></Chip>
      </div>
    </>
  );
}

// SRD F-10: the deflection line is the scripted one, word for word. Never show the AI answering a safety question.
function InstagramDm() {
  return (
    <>
      <ol className="flex flex-col gap-xs">
        <Bubble who="Maya R., Instagram" time="9:02 PM" caller>Is Botox safe while I’m breastfeeding?</Bubble>
        <Bubble who="Ava" time="9:02 PM">That’s best answered by our clinician — I’ll book you a consultation and flag your question. I have Thursday at 2 PM or Friday at 10 AM. Which works better?</Bubble>
        <Bubble who="Maya R., Instagram" time="9:04 PM" caller>Thursday, thanks.</Bubble>
      </ol>
      <div className="mt-md flex flex-wrap gap-xs">
        <Chip status>Consult booked, Thu <span className="font-mono">2:00 PM</span></Chip>
        <Chip>Flagged for clinician</Chip>
      </div>
    </>
  );
}

const TABS = [
  { id: 'voice', label: 'Call', time: '9:42 PM', Panel: VoiceCall },
  { id: 'sms', label: 'Text-back', time: '7:14 PM', Panel: TextBack },
  { id: 'dm', label: 'Instagram DM', time: '9:02 PM', Panel: InstagramDm },
];

export default function ClinicInbox() {
  const [tab, setTab] = useState(0);
  const { id, time, Panel } = TABS[tab];

  return (
    // DESIGN.md simulation well: one surface, no border or shadow; the tabs are real controls, so they look like ones.
    <figure className="bg-bg2 rounded-well p-md sm:p-lg text-left">
      <div className="flex flex-wrap items-baseline justify-between gap-x-sm gap-y-2xs mb-sm">
        <p className="text-sm font-semibold text-ink">Glow Med Spa inbox</p>
        <time className="font-mono text-[13px] text-mut">{time}</time>
      </div>

      <div role="tablist" aria-label="Conversation type" className="flex gap-2xs rounded-inner bg-bg3 p-2xs mb-sm">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`inbox-tab-${t.id}`}
            aria-selected={i === tab}
            aria-controls={`inbox-panel-${t.id}`}
            tabIndex={i === tab ? 0 : -1}
            onClick={() => setTab(i)}
            onKeyDown={(e) => onTabKey(e, i, TABS.length, setTab)}
            className={`flex-auto whitespace-nowrap min-h-11 rounded-[8px] px-xs text-sm font-semibold transition-colors duration-[120ms] ${
              i === tab ? 'bg-card text-ink' : 'text-mut hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* min-height keeps the hero from jumping when a shorter conversation is picked. */}
      <div key={id} role="tabpanel" id={`inbox-panel-${id}`} aria-labelledby={`inbox-tab-${id}`}
        className="min-h-[26rem] sm:min-h-[24rem] motion-safe:animate-fade-in">
        <Panel />
      </div>

      <GuardrailLine className="mt-md" />
      <figcaption className="mt-sm text-sm text-mut">Example conversations. Glow Med Spa is a fictional clinic.</figcaption>
    </figure>
  );
}
