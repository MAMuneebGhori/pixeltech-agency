import { Section } from './HomeSections';

// Every answer traces to the SRD (section refs in comments). Don't add claims the SRD doesn't make.
const FAQS = [
  {
    // SRD F-10
    q: 'Will the AI give medical advice?',
    a: "No. It never diagnoses or gives treatment-safety opinions. Medical questions get a scripted reply (“That’s best answered by our clinician — I’ll book you a consultation and flag your question”), and your staff are alerted. Emergencies are told to call 911.",
  },
  {
    // SRD §4 Data, §7 HIPAA BAA risk
    q: 'Is it HIPAA compliant?',
    a: "We don’t sign a Business Associate Agreement (BAA) yet. To stay out of scope, the system only handles scheduling information: name, phone number, service of interest and appointment time. No clinical notes or medical history. If you need a BAA, ask on the audit call and we’ll walk you through our timeline.",
  },
  {
    // SRD §4 Data, F-27
    q: 'Where is our data stored?',
    a: "In the US only, encrypted in transit and at rest, and kept separate from other clients' data. Only named PixelTech staff can access it. Call recordings and transcripts are kept for 90 days by default, and you can ask us to delete them at any time.",
  },
  {
    // SRD F-18, F-20, §4 Compliance
    q: 'How do you handle opt-outs and call recording?',
    a: "Anyone who replies STOP is removed from every channel immediately. Reactivation messages only go to people who already have a relationship with your clinic. Every call opens with a recording notice, which covers two-party consent states like California and Florida.",
  },
  {
    // SRD F-09
    q: 'What happens when a caller wants a real person?',
    a: "During business hours, the call is transferred to your front desk. After hours, the AI takes a message, tells the caller when to expect a callback, and alerts your staff by email and text.",
  },
  {
    // SRD §3 integrations
    q: 'Do we have to switch booking software?',
    a: 'No. We connect to your existing calendar. Calendly and Google Calendar work directly today; other systems connect through direct API or monitored sync, and we confirm yours on the audit call.',
  },
];

// FAQPage structured data built from the same list the page shows, so the two can't drift (design review D5).
// "<" is escaped so no answer text can close the script tag.
const FAQ_JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}).replace(/</g, '\\u003c');

export default function FaqAccordion() {
  return (
    <Section id="faq" title="Questions clinics ask us.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_JSON_LD }} />
      {/* A hairline list, not a stack of cards. */}
      <div className="max-w-[820px] border-b border-line">
        {FAQS.map((faq) => (
          <details key={faq.q} className="group border-t border-line [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between gap-4 py-5 font-semibold cursor-pointer hover:text-accent transition-colors duration-[220ms] ease-out">
              {faq.q}
              <span aria-hidden="true" className="text-[1.4rem] leading-none text-mut transition-transform duration-[220ms] ease-out group-open:rotate-45">+</span>
            </summary>
            <p className="pb-6 pr-8 text-mut leading-relaxed max-w-[65ch]">{faq.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
