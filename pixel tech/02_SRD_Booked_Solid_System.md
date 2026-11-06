# Software Requirements Document — Booked Solid System (v1.0)

**Prepared for:** Tech Lead, PixelTech
**Date:** October 2026
**Mission:** A working, demonstrable med-spa AI receptionist in 10 days; a client-deployable MVP within 3 weeks of first contract.
**Guiding principle:** Assemble on proven infrastructure (Retell + n8n + Twilio + calendar APIs). Do not build telephony, STT, LLM, or TTS. We build configuration, workflows, knowledge bases, integrations, and the client-facing layer.

---

## 0. Build philosophy & phasing

| Phase | Timeline | Goal | Spend gate |
|---|---|---|---|
| Phase 0 — Demo | Days 1–7 | A live phone number anyone can call; AI answers, handles FAQs, books a fake appointment, sends SMS confirmation | ~$0 (free credits) |
| Phase 1 — MVP | Days 8–14 + post-contract | Multi-channel intake (call, SMS, IG/FB DM), real calendar booking, reminders, missed-call text-back, lead dashboard, human escalation | ~$20–50 |
| Phase 2 — Client hardening | During first 2 client onboardings | Real spa integrations (Vagaro/Calendly/Square…), transcript logging, reactivation campaigns, guardrail tuning | Per-client usage only |
| Phase 3 — Scale | After 3 clients | White-label client portal, multi-location, BAA/HIPAA path, GHL migration evaluation | Funded by revenue |

**Do not start Phase 2/3 features early.** The demo wins the deal; discipline wins the timeline.

---

## 1. System architecture (MVP)

```
                 ┌──────────────────────────────────────────────┐
 Inbound call ──▶│ Twilio US number ──▶ Retell AI voice agent    │
                │   (STT + LLM + TTS, med-spa knowledge base)   │
                 └───────────────┬──────────────────────────────┘
                                 │ webhooks / function calls
                                 ▼
                      n8n workflow engine (self-hosted)
        ┌────────────┬───────────┴───────────┬─────────────────┐
        ▼            ▼                       ▼                 ▼
 Calendar API   Twilio SMS            Meta (IG/FB) API     Google Sheets /
 (Calendly/     (confirmations,       (DM auto-reply)      later: CRM
  Google/Sq)    text-back, reminds)
                                 │
                                 ▼
                  Lead record + transcript + booking log
                  (client dashboard, Google Sheets v1)
```

**Accounts to create (week 1):** Retell AI (free $10 credit), Twilio (one US local number), n8n (self-host Docker or free Cloud), Calendly (free), Google Cloud project (Calendar API + Sheets), Meta Business (test IG/FB page).

---

## 2. Functional requirements

### 2.1 Inbound voice (core — required for demo)
- F-01 Answer 100% of calls to the client's connected number on the first ring, 24/7/365, including after-hours and weekends.
- F-02 Natural two-way conversation; interruption handling (barge-in); US-accented voice; under 1-second response latency.
- F-03 Greeting identifies the spa by name: *"Hi, this is [Spa Name], how can I help you today?"*
- F-04 Intent recognition for at minimum: (a) book/change/cancel appointment, (b) pricing/hours/location/parking FAQs, (c) service questions (Botox, fillers, laser, body contouring, facials, IV, consults), (d) status of existing appointment, (e) human/front-desk request, (f) emergency/medical question.
- F-05 Lead capture every time: caller name, phone, service interest, preferred time; written to lead record even if no booking completes.
- F-06 Qualification questions per configurable script: new vs returning client, service of interest, preferred date/time window, how they heard of us.
- F-07 Booking flow: check live calendar availability → offer 2 specific time options → confirm → write appointment to calendar → read back details.
- F-08 Reschedule/cancel: verify identity by name + phone, mutate calendar, confirm verbally and by SMS.
- F-09 Human escalation: transfer to a staff number during business hours when caller insists or intent is out of scope; after-hours, take message + promise callback window; log and alert staff via email/SMS.
- F-10 Clinical guardrail: never give medical advice, diagnosis, or treatment safety opinions. Scripted deflection: *"That's best answered by our clinician — I'll book you a consultation and flag your question."* Hard-block requests for emergency services → advise calling 911.
- F-11 End-of-call SMS confirmation with appointment details + address + link to reschedule.
- F-12 Voicemail fallback if AI telephony fails (never ring to dead air).

### 2.2 SMS / messaging
- F-13 Missed-call text-back within 60 seconds on any unanswered call routed to the platform.
- F-14 Two-way SMS conversation using the same knowledge base and booking logic (text agent mirrors voice agent).
- F-15 Instagram & Facebook Messenger auto-reply via Meta API: same speed SLA (60 seconds), same qualification + booking flow, hand-off to human on request.
- F-16 Website chat widget (later phase; note API compatibility with Retell/n8n).
- F-17 Reminder sequence: 24h and 2h before appointment, with confirm/reschedule/cancel quick replies; no-show risk flagging when no confirmation.
- F-18 All opt-outs (STOP/UNSUBSCRIBE) suppressed immediately across channels; suppression list retained.

### 2.3 Lead reactivation (sales-driving feature)
- F-19 Bulk import of old lead/customer lists (CSV).
- F-20 Personalized SMS/email follow-up sequence for unbooked leads and stale contacts, with opt-out language and rate limiting (TCPA-safe: only numbers the business already has a relationship with).
- F-21 Reactivation results logged per campaign (re-booked, replied, opted out).

### 2.4 Dashboard / client visibility
- F-22 v1 client dashboard (Google Looker Studio on Sheets, or simple Retool/internal page): calls answered vs missed, after-hours share, SMS/DM volume, bookings created, no-shows, reactivation ROI, full transcripts searchable.
- F-23 Daily 9 AM email digest to owner: yesterday's leads, bookings, and anything needing human action.
- F-24 Staff alert (email + SMS) for: escalation requests, high-value service inquiries, failed bookings.

### 2.5 Configuration & onboarding
- F-25 Per-client onboarding wizard/checklist: spa name, hours, services + pricing, policies (deposits, cancellation, late), FAQ doc, staff numbers, calendar connection, brand voice.
- F-26 Knowledge base editable by us (non-technical) without code deploy — document-driven (Google Doc/Notion → Retell knowledge ingestion).
- F-27 Call recording + transcript storage, US region, retention setting (default 90 days), client can request deletion.
- F-28 Test-mode number for every new deployment before cutover.

---

## 3. Integrations & effort estimates

| Integration | Method | Effort | Priority |
|---|---|---|---|
| Calendly | Native API/webhooks | 0.5 day | P0 (demo) |
| Google Calendar | Google API + n8n | 1 day | P0 |
| Twilio voice/SMS | Native via Retell/n8n | 1 day | P0 |
| Meta IG/FB Messenger | Meta Graph API + n8n | 2 days | P1 |
| Square Appointments / Acuity | API + OAuth | 1–2 days each | P1 |
| Vagaro / GlossGenius / Mindbody | Marketplace/API, varying quality; webhook fallback | 2–4 days each | P2 (build per first client need) |
| Boulevard / Jane / Mangomint / Zenoti | API partnerships may be required; manual calendar sync fallback | 3–5 days | P2 |
| Email (Gmail/Outlook) | SMTP/Graph API | 0.5 day | P1 |
| GoHighLevel (future CRM swap) | Native n8n/GHL API | 2 days | P3 |

Rule: never promise a named integration in a contract until its API access is verified. Use "compatible with your calendar via direct API or monitored sync" language until then.

---

## 4. Non-functional requirements

- **Reliability:** 99.5% uptime for call answering; failed-call retry + voicemail fallback.
- **Latency:** answer < 3 rings; conversational response < 1.2s.
- **Data:** US-only processing/storage; no PHI beyond scheduling data in v1; encryption in transit/at rest; access limited to named PixelTech staff; per-client data isolation.
- **Compliance:** TCPA-safe outbound (only consented/relationship numbers), opt-out suppression, CAN-SPAM for email elements, call recording announcement where state law requires (two-party consent states: CA, FL, IL, MD, MA, MT, NH, PA, WA — default to recording-notice in the greeting for all clients).
- **Scalability:** concurrent call support (Retell gives 20 free concurrent lines — ample for single-location spas).
- **Observability:** error alerts to the team Slack/WhatsApp; per-call status logging.
- **Cost controls:** per-client Retell/Twilio spend caps and alerting at $60/client/month.

---

## 5. Demo specification (Phase 0 — the thing that closes deals)

A prospect must be able to do this on a sales call, no slides:

1. Dial a published US demo number from their own phone.
2. Hear: *"Hi, this is Glow Med Spa, how can I help?"* (fictional demo spa).
3. Ask a real question ("How much is Botox? / Do you have anything Saturday?") and get a fluent, correct answer.
4. Book a consultation for a offered slot; receive an SMS confirmation seconds later.
5. Call back and reschedule; hear the AI know the existing appointment.
6. Text the number after hours and get the 60-second auto-reply + booking link.
7. (Screen-share) See the lead record + transcript appear live in the dashboard.

**Demo script pack:** fake service menu, pricing sheet, FAQ doc, policies, 2 Google calendars (one "spa", one booking target), 3 test scenarios for role-play. Record a 90-second screen+phone demo video for the website and cold emails.

**Acceptance test for Phase 0:** 20 consecutive internal test calls, ≥18 fully successful (correct answer + booking + SMS), zero dropped calls, median response latency < 1.2s.

---

## 6. Delivery runbook (repeats per client — target: live in 7 days)

| Day | Actions |
|---|---|
| 1 | Contract + deposit cleared; kickoff call; collect brand pack, menu, pricing, hours, policies, staff contacts |
| 2 | Provision Twilio number (or port theirs), create client Retell agent + knowledge base draft |
| 3 | Calendar/booking integration; build n8n workflows (SMS, reminders, alerts, logging) |
| 4 | Connect IG/FB; missed-call routing; configure escalation tree |
| 5 | Internal QA: 20-call test battery; fix failures; load FAQ edge cases |
| 6 | Client UAT call: owner role-plays 5 scenarios; sign-off checklist |
| 7 | Cutover (soft launch: after-hours only first 48h, then 24/7); dashboard access + 30-min training; guarantee clock starts |

---

## 7. Risks & mitigations

| Risk | Mitigation |
|---|---|
| LLM hallucinates prices/policies | Knowledge-grounded prompts; pricing only read from structured config; "I'll confirm with the team" fallback |
| Calendar API breaks → double bookings | Read-before-write checks; confirmation SMS; daily digest reconciliation |
| Prospect already has Boulevard/Beau or Vagaro AI | Position multi-channel DM + reactivation + human management layer; never claim to replace native tools |
| Retell pricing/terms change (like Synthflow did) | Keep n8n workflows platform-agnostic; Vapi documented as switch-over fallback (abstraction layer at the webhook boundary) |
| Client asks HIPAA BAA before we can sign | v1 contract limits data to scheduling; roadmap letter showing BAA timeline |
| Pakistan IP access issues | Retell/Twilio/n8n all web/API-based and accessible; maintain backup developer access via standard cloud tooling |

---

## 8. Definition of done (MVP)

- [ ] Phase 0 demo passes the 20-call acceptance battery
- [ ] One client deployed via the 7-day runbook with all P0/P1 features
- [ ] Dashboard shows answer rate, bookings, transcripts; daily digest sends
- [ ] Opt-out and compliance flows tested
- [ ] Cost-to-serve verified under $75/client/month
- [ ] Runbook + config templates reusable for client #2 with <3 days of repeat engineering
