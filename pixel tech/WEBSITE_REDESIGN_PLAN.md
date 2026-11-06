# Website Redesign Plan v2 — Booked Solid System

**Status:** Approved. Slices 1–5 are built (not committed). Slice 6 (Lighthouse) is in progress. See §0.

## 0. Implementation status (checked 2026-11-06)

| Brief item | Where it lives now | State |
|---|---|---|
| 1. Stats + 60s SLA + demo line | `HeroSection` (60-second text-back line), `RevenueLeakSection` (37% / 69% / 7×) | Done. 35% and 67% are deliberately left out (D8). The demo line is wired to `VITE_DEMO_PHONE` and stays off until the Phase 0 battery passes (D1) |
| 2. "Why practices switch to us" table | `HomeSections.jsx` `ComparisonSection` + the new text-back-speed row | Done, with generic competitor columns (D6) |
| 3. Product UI cards + transparent pricing | `ProductCards.jsx` (F-10 call transcript, unified inbox, reminders, 90-day Botox recall, STOP line), `DigestSection`, `PricingSection` Included / Not included + fair-use line | Done |
| 4. 5-input ROI calculator | `lib/roi.js` `estimateLeak` + `DEFAULT_INPUTS`, UI in `PricingSection` | Done. `node --test src/lib/roi.test.js`: 5/5 pass |
| 5. SRD guardrails | F-10 line in `ProductCards` + FAQ; §3 wording in `StackSection` + FAQ; 7-day §6 runbook in `GoLiveSection` | Done |
| About / Booking cleanup | `pages/About.jsx`, `pages/Booking.jsx` | Done |

**Still open**
1. ~~Lint fails~~ **Fixed 2026-11-06.** `eslint src` is clean. Admin's 401 logout moved out of `authFetch` into the catch handlers.
2. ~~Leftover budget field~~ **Fixed 2026-11-06.** `Lead.js` swaps `budget` for `callsPerWeek` and `bookingSoftware`, and the email, WhatsApp and admin badges use the new fields. The lead email now HTML-escapes every form field (it used to inject them raw).
3. **Lighthouse (slice 6):** all four pages are under the 90 performance target, with blocking-time and LCP problems. The `/about` run failed when Chrome wouldn't launch (low free RAM). Re-run on a machine with free memory.
4. **Manual checks before launch:** ~~the Moneypenny 69% source~~ (confirmed 2026-11-06: UK report, 300-business survey plus call data from 10,000 businesses, about 2016; the card's unsourced "call the next clinic" line was removed); the Zenoti 2025 after-hours figure (would replace 67%); the `public/demo-call.mp3` recording.
5. **Not committed:** 30 legacy files are staged for deletion, and there are unrelated changes outside `pixel tech/` (`backend/`, `.claude/`). Split these into separate commits.
**Date:** 2026-11-06
**Inputs:** `02_SRD_Booked_Solid_System.md` (SRD v1.0), `Booked Solid System — Website Redesign.md` (spec), the v1 plan (2026-11-05, slices 1–6 already built), the current `src/`, and the 5-point competitor brief (aireceptionistmedspa.com, usehailey.com, medreceptionist.com, medspai.com, serviceagent.ai).

---

## 1. What exists today

The v1 plan is mostly built. The home page is already one long scroll in the order the brief asks for.

| Route / file | Section | State |
|---|---|---|
| `/` `pages/Home.jsx` | Composes the sections below | Done |
| `components/HeroSection.jsx` | Headline, "Book a live demo" CTA, demo-line modal (shown once `VITE_DEMO_PHONE` is set) | Done. No demo number yet (D1) |
| `components/DemoCallCard.jsx` | Lip-filler call transcript + SMS confirmation; audio player hidden until `public/demo-call.mp3` exists | Done. Recording missing |
| `HomeSections.jsx` → `RevenueLeakSection` | 3 sourced stat cards: 37% (Zenoti), 69% (Moneypenny), 7× (HBR) | Done. Moneypenny figure still needs a manual check |
| `HomeSections.jsx` → `HowItWorksSection` | 4 steps, each with a 2-line mono "sim" | Weak: plain text, not product UI cards |
| `HomeSections.jsx` → `ComparisonSection` | 3-column table, stacked cards on mobile, no competitor names | Done |
| `HomeSections.jsx` → `StackSection` | "Working today" (Calendly, Google Calendar, Twilio) vs "Compatible via direct API or monitored sync" | Done. Matches SRD §3 |
| `HomeSections.jsx` → `GoLiveSection` | Runbook squeezed into 4 steps, labelled "target" | Weak: SRD §6 has 7 days |
| `components/PricingSection.jsx` + `lib/roi.js` (+ test) | $297/mo, $497 setup waived for 3 founding seats, 7-day trial; 2-input calculator | Weak: calculator has 2 inputs and shows the upper bound ("every missed call would have booked") |
| `HomeSections.jsx` → `DigestSection` | 9 AM digest mock (labelled as an example) | Done |
| `components/FaqAccordion.jsx` | 6 SRD-sourced answers, F-10 deflection quoted word for word | Done |
| `components/FinalCtaSection.jsx` | "Book My Free Lead-Leak Audit" | Weak: CTA wording differs from the hero and pricing ("15-min ROI audit") |
| `/pricing` `pages/Pricing.jsx` | Reuses `PricingSection` as h1 | Done |
| `/about` `pages/About.jsx` | Old design: glow blob, `text-gradient`, framer-motion import, `font-extrabold` headings, "Pixeltech Agency" | **Weak.** Never got the v1 reskin |
| `/booking` `pages/Booking.jsx` | Lead form → `/api/leads` | **Weak.** Still has the old "Booked Solid System + Landing Page" package (line 81) and an ad-spend select |
| `/admin` `pages/Admin.jsx` | Token-auth lead inbox | Fine. Out of scope |
| `/how-it-works`, `/proof` | Redirect to home | Done |
| Removed already | Chatbot, testimonials, Services/HelpCenter pages, neon theme | Done |

## 2. The brief vs what we can honestly ship

Four of the five asks conflict with decisions or facts already on record. I researched each one again on 2026-11-06.

| Brief item | Problem | Recommendation |
|---|---|---|
| **"35% missed calls"** | No original study for 35% exists. Vendor blogs repeat it unsourced. The real figure is Zenoti's **37%** for salons and spas, which we already show. | Keep 37% with its Zenoti link. Don't round it to 35%. |
| **"67% after-hours"** | No primary source. Vendor pages give conflicting figures (41% "CallRail 2024", 55% unsourced). The 67% figures that do exist measure other things. The v1 plan dropped this one for the same reason. | Leave it out. Option: check Zenoti's 2025 med-spa client survey (after-hours expectations) by hand. If it has a real after-hours figure, use that number with that source. |
| **"60-second speed SLA"** | This isn't a market stat. It's **our own** commitment (SRD F-13, F-15). | Use it, but as a product promise: "Missed calls and DMs get a text back within 60 seconds." Not as "conversion drops 80% after 60 s", which has no source. |
| **Live demo phone line** | No number yet. SRD Phase 0 (the 20-call battery with ≥18 passing) hasn't been passed. | No code change needed: setting `VITE_DEMO_PHONE` switches the CTA. Turn it on only after the battery passes. |
| **Naming Smith.ai / MySalonDesk** | Naming them makes our current table rows **false**. For example, Smith.ai's own site lists appointment scheduling, SMS and an AI receptionist, but our row says "phone only, takes a message". A false claim about a named competitor is a Lanham Act risk. | Keep the column called "Traditional answering service". If you still want names, every cell about them has to be checked against their current public site and dated ("as of Nov 2026"). Expect rewriting. |
| **Copying competitor content** | Their layouts are fine to borrow. Their copy and their stats aren't. | Borrow the patterns (stat cards, comparison table, product UI cards, transparent pricing, multi-input ROI). Write our own copy. Use only stats that trace back to an original source. |

## 3. SRD guardrails (hard rules for every change)

1. **F-10 clinical deflection.** Wherever the site shows the AI answering, the medical question gets the scripted line: *"That's best answered by our clinician — I'll book you a consultation and flag your question."* Emergencies → 911. No sim ever shows the AI giving treatment-safety advice.
2. **SRD §3 calendar wording.** Only Calendly, Google Calendar and Twilio are presented as working. Everything else is "compatible with your calendar via direct API or monitored sync". The new inbox card must not show a Vagaro or Boulevard logo as connected.
3. **SRD §6 runbook.** Show all 7 days in the SRD's order, in client-facing wording, labelled "target". "Guarantee clock starts" stays out: the site offers no guarantee.
4. **No performance numbers before they're measured** (v1 rule 2). No "< 1.2s" or "100% answered on ring 1" until the Phase 0 battery passes. After that, label them "measured on our demo line, [date]".
5. **Every example is labelled as an example.** Glow Med Spa is fictional. The figures in the sims are illustrative.

## 4. Changes, section by section

### 4.1 Hero (small)
- Add a channel status strip under the CTA, in mono: `Voice · SMS · Instagram DM · Facebook Messenger`. Already present as the eyebrow, so just tighten it.
- Add one line to the sub-headline: "Missed calls and DMs get a text back within 60 seconds." (SRD F-13/F-15)
- Use one CTA label everywhere: **"Book a 15-min ROI audit"** (hero secondary, pricing, final CTA, nav).

### 4.2 Revenue leak (copy only)
- Keep 37% / 69% / 7×.
- Before launch: confirm the Moneypenny 69% by hand (still open from v1).
- If the Zenoti 2025 survey has a verified after-hours figure, it replaces the 7× card or becomes a fourth card.

### 4.3 How it works → four product UI cards (main visual work, medspai pattern)
Replace the 2-line mono sims with real UI mock cards. Static JSX, no new dependencies, all built on the existing `card`/`line`/`bg2` tokens:

| Step | Card | Contents |
|---|---|---|
| 01 Voice | **Live call transcript** | Reuse `DemoCallCard`'s transcript styling in compact form. Shows the F-10 path: caller asks "Is filler safe while breastfeeding?" → AI gives the scripted deflection → books a consult → "Flagged for clinician" chip. |
| 02 Text-back & DMs | **Unified inbox** (new) | 3 threads in one list, each with a channel badge (SMS / Instagram / Messenger), a timestamp and a "Replied in 0:42" chip (illustrative, labelled). Opening one thread shows the booking reply. |
| 03 Reminders | **Reminder thread** | 24h and 2h messages with Confirm / Reschedule / Cancel quick-reply chips, plus a "No reply — flagged" state (F-17). |
| 04 Reactivation | **Recall timeline** (new) | "CSV uploaded: 240 past clients" → Day 0 SMS → Day 3 follow-up → Day 7 email → result row (replied / booked / opted out, F-21). One example track: **"Botox recall: 90 days after last visit"**. Includes "Reply STOP to opt out" (F-18) and "Only contacts with an existing relationship" (F-20). |

The 90-day Botox recall is a configured F-19/F-20 sequence, not a separate SRD feature, so the card calls it an example sequence.

### 4.4 Comparison table (copy only)
- Rename the eyebrow to **"Why practices switch to us"** (the brief's wording).
- Add one row: **"Missed-call text-back speed" → Booked Solid: "Within 60 seconds (SRD F-13)"**.
- Competitor names follow the decision on D6.

### 4.5 Stack: no change.

### 4.6 Go-live runbook → 7 days
Replace the 4 steps with the 7 SRD §6 days in a horizontal timeline (vertical on mobile):
1. Kickoff: we collect your brand pack, menu, pricing, hours, policies and staff contacts.
2. Your phone number is set up (new or ported), plus your receptionist and its knowledge base.
3. Calendar connected; text, reminder and alert workflows built.
4. Instagram/Facebook connected; missed-call routing and escalation rules set.
5. Internal QA: a 20-call test run, with fixes.
6. You role-play 5 scenarios and sign off.
7. Soft launch on after-hours only for 48h, then 24/7; dashboard access and a 30-min training.

Heading stays "Target: live in 7 days".

### 4.7 Pricing, transparent layout (medspai pattern)
Same single plan (D2 resolved). Layout changes:
- Left: price card as now, plus two short lists: **"Included"** (current 7 features) and **"Not included"** (HIPAA BAA, website chat widget, named integrations we haven't verified). Being transparent about limits is the pattern.
- **D7 (open):** add a fair-use line? SRD §4 caps cost at $60/client/mo. Recommendation: "Covers a typical single-location spa. We'll tell you before you go over, never surprise-bill." Decide whether to publish a minutes number.
- Right: the new calculator (4.8).

### 4.8 ROI calculator, 5 inputs (serviceagent pattern)
`lib/roi.js` becomes one function. All inputs are editable, and the defaults are shown and sourced.

| # | Input | Default | Why |
|---|---|---|---|
| 1 | Inbound calls per week | 80 | Typical small spa; user edits it |
| 2 | % of calls that go unanswered | 37% | Zenoti, linked |
| 3 | Missed DMs/texts per week answered > 1h late | 10 | User's own number |
| 4 | % of missed leads who would have booked | 25% | Conservative assumption, labelled as one |
| 5 | Average first-treatment value ($) | 500 | User's own number |

Output: `missedLeads/mo = (calls × missed% + DMs) × 4.3`, `lost/mo = missedLeads × book% × value`. We show lost revenue per month, recovered bookings needed to cover $297, and a one-line explanation of the formula. Applying a booking rate replaces the old "if every missed call booked" upper bound with a defensible estimate.

Tests: extend `roi.test.js` for the new function (defaults, bad input → 0, percentages clamped to 0–100, break-even rounds up).

### 4.9 Digest: no change. 4.10 FAQ: no change.

### 4.11 Off-home fixes
- **About:** reskin to the v1 tokens (remove the glow blob, `text-gradient`, framer-motion import and `font-extrabold`; use the `Section` wrapper). Copy: "PixelTech", one founder-voice paragraph, no claims beyond the SRD.
- **Booking:** remove the "+ Landing Page" package branch (line 81). Replace the ad-spend select with "Calls per week" and "Booking software", which feed the audit call. Keep the a11y fixes from slice 6.
- **FinalCta:** unify the CTA label (4.1).

## 5. Approaches

| | A. Extend in place (recommended) | B. Restructure first |
|---|---|---|
| What | Edit `HomeSections.jsx`, `PricingSection.jsx`, `roi.js` and the 3 pages; add `components/ProductCards.jsx` for the 4 UI cards | Split `HomeSections.jsx` into one file per section and move all copy into `src/content/*.js` before changing anything |
| Effort | ~1.5 days | ~2.5 days |
| Risk | Low. Same structure, small diffs | Medium. Big move-only diff mixed in with copy changes |
| Pro | Ships fast; each slice can be reviewed alone | Copy edits become non-code edits later |
| Con | `HomeSections.jsx` grows to ~350 lines | Restructures before there's a second page that needs it |

**Recommendation: A.** The site is pre-client and pre-demo-line. What it needs is the honest content and the demo, not a new architecture.

## 6. Build order (each slice: lint + build + `node --test` + 375px check)

1. **Copy + guardrails pass:** hero line, unified CTA label, comparison eyebrow and new row, 7-day runbook. No new components.
2. **ROI calculator v2:** `roi.js` + tests first, then the UI.
3. **Pricing transparency:** Included / Not included lists, plus the fair-use line once D7 is decided.
4. **Product UI cards:** `ProductCards.jsx`, wired into How It Works. F-10 sim included.
5. **About + Booking cleanup.**
6. **Lighthouse re-run** (performance score was 46–65 and flaky, accessibility 100 on booking). Goal: no regressions from the new cards.

## 7. Decisions needed

- **D6. RESOLVED (2026-11-06): keep generic.** The column stays "Traditional answering service". No Smith.ai or MySalonDesk.
- **D7. RESOLVED: soft fair-use line.** "Covers a typical single-location spa. We'll tell you before you go over, never surprise-bill." No minutes number published.
- **D8. RESOLVED: 37% Zenoti stays (not 35%). 67% is dropped** unless the Zenoti 2025 survey gives a verified after-hours figure.

**Remaining before slice 1:** approve Approach A and the build order (§5–6).

**Resolved in v1 (still binding):** D1 no demo number yet (env switch). D2 $297/mo + $497 setup waived for 3 founding seats, 7-day trial. D3 single home page. D4 sourced stats only. D5 chatbot removed, demo recording planned.

## Out of scope
Building the voice/SMS/DM system, the client dashboard, a blog/CMS, and the Phase 0 demo line itself (it's a precondition for the click-to-call CTA, not website work).

---

## 8. CEO review: conversion pass (2026-11-06)

**Ask:** check that the offer, the Glow Med Spa demo hook and the ROI calculator maximize med-spa owner conversions.
**Mode:** SELECTIVE EXPANSION (Q1, user-selected). Depth: implementation-ready for the accepted items.
**Code reviewed:** `HeroSection.jsx`, `PricingSection.jsx`, `lib/roi.js`, `pages/Booking.jsx`, `FinalCtaSection.jsx`, `backend/server.js` at `2ed1044`.

### 8.1 Findings (evidence)

| # | Finding | Receipt |
|---|---|---|
| F1 | The 7-day trial (`TRIAL_DAYS = 7`) is as long as the 7-day go-live runbook, and the runbook's day 7 starts with 48h of after-hours-only operation. The trial ends before the clinic has seen the system run fully. | `PricingSection.jsx:10`, `:110`; SRD §6 day 7 |
| F2 | While the demo line is off, the hero CTA says "Book a live demo", but `/booking` is titled "Book your ROI audit" and never mentions a demo. | `HeroSection.jsx:34`; `Booking.jsx:44-48` |
| F3 | "Book" doesn't book. Success says "We'll email you to set a time", so a company selling 60-second replies has the prospect wait for an email. | `Booking.jsx:58` |
| F4 | The calculator defaults produce **$21,285/mo lost** `[measured: roi.js arithmetic: (80×0.37+10)×4.3×0.25×500]`. That counts every missed caller, including existing patients who call back, as a lost new booking. An owner may dismiss the whole tool. | `roi.js:5-25` |
| F5 | The calculator result has no CTA, and `/booking` asks for calls per week again. | `PricingSection.jsx:73-87`; `Booking.jsx:100` |
| F6 | "Founding Partner · 3 of 3 seats left" reads as zero customers. | `PricingSection.jsx:8`, `:106` |
| F7 | `?service=core` on the pricing CTA is ignored: nothing in `src` reads URL params. | `PricingSection.jsx:141`; grep `useSearchParams` = 0 hits |
| F8 | No analytics anywhere, so no conversion step can be measured. | grep for analytics, gtag, plausible in `src`, `index.html`, `package.json` = 0 hits |
| F9 | Demo-line callers (the hottest prospects) never reach PixelTech's lead inbox or alerts. Only form fills do. | `server.js:84-103` (only `/api/leads` creates leads); SRD F-05 |
| F10 | Price position: $297/mo sits at the low end of med-spa-specific tools. MedReception.ai lists $495–$1,495/mo, and some vendors offer 30-day money-back terms `[estimated: vendor pages via search, unverified]`. There's no change for now; it informs Q5. | web search 2026-11-06 |

### 8.2 Decision ledger

| ID and owner | Contract and evidence | Current | Proposed | Status | Exact approval and scope |
|---|---|---|---|---|---|
| Q1 mode | Review mode | — | SELECTIVE EXPANSION | approved | User answer to Q1: "Selective expansion (recommended)" |
| R1 site/offer | F1 | 7-day trial from signup | "7 days free, starting the day you go live" | approved | Q2: "chose that is better", which delegates to my recommendation of all repairs |
| R2 site/hero | F2; second opinion 2.1/2.2 | "Book a live demo" → audit page | Label stays "Book a 15-min ROI audit" (one-label rule, plan §4.1); hero sub-line and `/booking` intro add "We'll walk you through a real demo call." Use the recording until Phase 0 passes, with no live-demo claim | approved (revised) | Q2 approved the first version; reopened by second opinion; Q9: "R2: honest demo promise" |
| R3 site/roi | F4 | Single point estimate | Show a range: low = 50% of the estimate (half the missed callers assumed existing patients who call back), high = the full estimate. Update roi.js and tests. | approved | Q2, same as R1 |
| R4 site/offer | F6 | "3 of 3 seats left" | "Founding Partner pricing · first 3 clinics"; show "N left" only once a seat sells | approved | Q2, same as R1 |
| R5 site/pricing | F7 | Dead `?service=core` | Remove the param (E5 adds the only param-carrying CTA) | approved | Q2: the fifth repair, named in the question text and covered by "chose that is better" |
| E1 site/analytics | F8 | None | Vercel Web Analytics plus 5 events | approved | Q3: "Add to plan (recommended)" |
| E2 site/booking | F3 | Email follow-up | Inline Calendly after a successful save, prefilled with name and email | approved | Q4: "Add to plan (recommended)" |
| E3 business/offer | F10, SRD §6 "guarantee clock" | No guarantee (plan §3 rule 3) | Measurable "N consults in 30 days or next month free" | deferred | Q5: "Defer to TODOS.md (recommended)" |
| E4 n8n + backend | F9, SRD F-05/F-12 | None | Demo-line calls POST to `/api/leads` (source "Demo line", shared-secret header) and a daily test call; gated on the demo line existing | approved | Q6: "Add, gated on demo line (recommended)" |
| E5 site/roi→booking | F5 | Disconnected | CTA under the result, inputs carried in URL params, prefilled form, `roiEstimate` stored on the lead | approved | Q7: "Add to plan (recommended)" |

| S1 site/booking | Second opinion, strategy 1; `Booking.jsx:92` `required type="url"` | 8 fields, Website required as a URL | Website optional plain text; only name, email and phone required | approved | Q9: "Shorter booking form" |
| S2 site/roi | Second opinion, strategy 2; `PricingSection.jsx:81` | Range as headline (R3) | Headline "Pays for itself at N booking(s) a month"; the R3 range sits underneath as context | approved | Q9: "Break-even as ROI headline" |
| S3 build order | Second opinion, strategy 3; SRD §5 | Recording is an open item (§0 item 4) | Record the 90-second demo and `demo-call.mp3` before E1/E4/E5; R2's sub-line depends on it | approved | Q9: "Demo recording first" |
| R1 review | Second opinion, consistency 2.4, strategy 4 | 7 days free from go-live | Unchanged. Deposit question deferred to TODOS.md with E3; revisit 14 days when E3 is priced | approved (kept) | Q10: "Keep 7d, defer deposit (recommended)" |
| Q8 TODO | Section 3 security | No rate limit on `/api/leads` | TODOS.md item, P2 | deferred | Q8: "Add to TODOS.md (recommended)" |

Approval readiness: PASS. Checked R1 (Q2, Q10), R2 (Q9), R3–R5 (Q2), S1–S3 (Q9), E1 (Q3), E2 (Q4), E3 deferred (Q5), E4 (Q6), E5 (Q7), the rate-limit TODO (Q8). No pending rows.

### 8.3 Accepted scope: how each item works

**R1 Trial starts at go-live.** In `PricingSection.jsx`, change the price line to "/mo after 7 days free, starting the day you go live". Keep `TRIAL_DAYS = 7` and remove the D2a shortcut comment. Billing (outside the site) must start on go-live day plus 7. Owner: whoever writes the contract; add the same wording there.

**R2 Hero CTA (revised in Q9).** `HeroSection.jsx:34` keeps "Book a 15-min ROI audit". A sub-line under the buttons, and the `/booking` intro, say "We'll walk you through a real demo call." Until Phase 0 passes, that is the recorded call (S3). After `VITE_DEMO_PHONE` is set, the existing click-to-call CTA takes over unchanged.

**R3 ROI range.** In `roi.js`, `estimateLeak` also returns `lostRevenueLow = Math.round(bookings × value × (1 − EXISTING_PATIENT_SHARE))`, with `EXISTING_PATIENT_SHARE = 0.5` as a named constant and a comment saying it's an assumption. The UI headline shows "$10,643 – $21,285 / month" with the defaults `[measured: roi.js arithmetic]`, plus one line: "Low end assumes half of missed leads are existing patients getting back in touch." (The share applies to the whole total, DMs included.) Per S2, this range sits under the break-even headline. Break-even is unchanged.

**R4 Seat counter.** Keep `FOUNDING_SEATS_LEFT`. When it equals 3, render "Founding Partner pricing · first 3 clinics"; when it's below 3, render "· N of 3 left". It's set by hand, and there's still no countdown.

**R5 Dead param.** The pricing CTA links to plain `/booking`. Only the calculator CTA (E5) carries params.

**E1 Analytics.**
- **Setup:** add `@vercel/analytics` and render `<Analytics />` from `@vercel/analytics/react` in `App.jsx`. It's cookieless, so the cookie banner copy stays true.
- **Events, using `track()`:** `cta_click` {location: hero|nav|pricing|final|roi}, `roi_edit` (first edit per visit only), `booking_submit`, `booking_error` {status}, `demo_tel_tap`.
- **Plan check:** custom events need a paid Vercel plan, and page views work on every plan. Check the plan before relying on the events. If the plan is Hobby, ship the page views and leave `track()` calls as harmless no-ops.

**E2 Instant booking.**
- **Config:** `VITE_CALENDLY_URL` (env).
- **Flow:** after `res.ok`, the success state renders the Calendly inline widget (official `assets.calendly.com/assets/external/widget.js`, loaded only on `/booking` after success), with `?name=<first last>&email=<email>` URL-encoded.
- **Unset env var:** keep today's "We'll email you" message.
- **Script fails to load (10s timeout):** show a plain link "Pick a time on Calendly" to the same URL, plus the email fallback text.
- **Data:** the lead is saved before Calendly appears, so the existing email and WhatsApp alerts fire whether or not they book.

**E4 Demo-line leads (gated: ships with `VITE_DEMO_PHONE`).**
- **Lead POST:** the n8n workflow that writes the F-05 lead record also POSTs `{firstName, lastName, phone, service: 'Demo line', source: 'Demo line', goal: <call summary>}` to `/api/leads`, with the header `X-Lead-Secret: $LEAD_INGEST_SECRET`.
- **Backend validation:** `server.js` accepts `source: 'Demo line'` only with a matching secret. Without it, the backend forces `source = 'Booking Form'`.
- **Required fields:** `Lead.js` requires `email` and `lastName`, which phone callers may not give. Make both conditionally required (not required when `source === 'Demo line'`).
- **Duplicates:** n8n dedupes by call ID before posting.
- **Daily test call:** a scheduled n8n job places one test call (Twilio) to the demo line each morning. If it's not answered with the greeting within 3 rings, it alerts the team WhatsApp. This is SRD F-12 plus §4 Observability.

**E5 ROI → booking.**
- **CTA:** under the calculator result, "Get this audit for your spa", linking to `/booking?calls=<n>&missed=<pct>&dms=<n>&book=<pct>&value=<n>`.
- **Prefill:** `Booking.jsx` reads params with `useSearchParams`, maps `calls` to the select bucket via a new `callsBucket()` in `roi.js` (<25 'Under 25', 25–49 '25–50', 50–99 '50–100', ≥100 '100+'), and recomputes the estimate with `estimateLeak` rather than trusting a URL total.
- **Storage:** it sends `roiEstimate: "$X–$Y/mo (calls N, missed P%, DMs D, book B%, value $V)"` with the lead. `Lead.js` adds a `roiEstimate: String` field, and the admin card and lead email (escaped) show it.
- **Bad params:** go through `clean()` and become 0. If no params are present, there's no prefill.

### 8.4 Architecture and flows

```
 Visitor ──▶ Home (Hero R2 · Pricing R1/R4 · ROI R3) ──E5 params──▶ /booking
   │            │ track() E1                                          │ POST /api/leads
   │            ▼                                                     ▼
   │      Vercel Analytics                              backend: Lead (+roiEstimate) ─▶ email + WhatsApp alert
   │                                                                  │ res.ok
   │                                                                  ▼
   │                                                    Calendly inline (E2) ── fail ─▶ link + "we'll email you"
   │
   └─(demo line live)─▶ Twilio ▶ Retell ▶ n8n ──X-Lead-Secret──▶ POST /api/leads (source "Demo line", E4)
                                           └── daily test call ─ no answer ─▶ team WhatsApp alert
```

Booking states (E2):
```
 idle ─submit─▶ sending ─res.ok─▶ sent ─CALENDLY_URL set─▶ loading-widget ─loaded─▶ widget
                   │                 └─unset─▶ email-message          └─10s/error─▶ link-fallback
                   └─!ok / throw─▶ error (form kept, resubmit allowed)
```
"sending" already blocks a second submit (`Booking.jsx`, button disabled while `status === 'sending'`).

### 8.5 Review sections

1. **Architecture:** no new services. E4 adds one auth boundary (the shared secret) on an existing endpoint. The single point of failure is unchanged (the backend on Render). **Rollback:** every site item is a Vercel redeploy of the previous build (about 1 min). E4 rolls back by disabling the n8n node.
2. **Error & rescue:**

   | Codepath | Failure | Handling | User sees |
   |---|---|---|---|
   | Calendly script (E2) | Blocked or slow | 10s timeout → link fallback | Link plus email message |
   | `track()` (E1) | Plan lacks custom events, or an adblocker | No-op | Nothing |
   | E5 URL params | Bad or hostile values | `clean()` → 0, recomputed | Empty prefill |
   | n8n POST (E4) | Backend down | n8n retry ×3, then team alert | Nothing (caller unaffected) |
   | Demo line (E4) | Retell or Twilio down | Daily test call alerts; F-12 voicemail fallback | Voicemail, not dead air |
   | `/api/leads` | DB not connected (`server.js:86`) | 503 → existing error state | "We couldn't send your request" |

3. **Security:**
   - **Existing, outside these items:** `/api/leads` is a public POST with open `cors()` (`server.js:16`), no rate limit, and `new Lead(req.body)` mass assignment, so a client can set `status`, `date` or `chatHistory`. Likelihood Med, impact Low–Med.
   - **In scope via task 1:** whitelist the POST fields (E4 and E5 both touch this route).
   - **Recorded in `TODOS.md`:** rate limiting.
   - **E2:** the Calendly script runs only after success, on one route. There's no CSP to update (`vercel.json` has rewrites only).
   - **E5:** params are numbers that go through `clean()`, and React escapes the rendering.
   - **E4:** a spoofed demo-line source is blocked by the secret.
4. **Data and edge cases:**
   - **Double submit:** blocked.
   - **Back button after success:** remount resets the form. Acceptable.
   - **E5 hostile params:** zeroed.
   - **E4 duplicate call events:** deduped by call ID.
   - **Lead saved twice by Calendly:** impossible, because the lead saves once before the widget appears.
5. **Code quality:**
   - **Reuse:** reuse `estimateLeak`/`clean` (no duplicate math in `Booking.jsx`). `callsBucket` lives in `roi.js` next to the math.
   - **Repo pattern:** keep the env-switch pattern already used for `VITE_DEMO_PHONE` for `VITE_CALENDLY_URL`.
6. **Tests:**
   - **`roi.test.js`:** defaults give `lostRevenueLow` 10643 and `lostRevenue` 21285; `callsBucket` at 0, 24, 25, 49, 50, 99, 100 and NaN; negative and string inputs → 0.
   - **Backend (new `node --test` file):** a POST with `source: 'Demo line'` and no secret is stored as 'Booking Form'; with the right secret it's kept; unknown fields such as `status` are dropped.
   - **Manual:** Calendly with the env var unset, set, and the script blocked (DevTools request blocking).
   - `no_claim`: unit tests don't prove Calendly, Vercel Analytics or n8n accept the calls (third-party, verified manually).
7. **Performance:** Calendly loads only after submit, so the initial `/booking` weight doesn't change. `@vercel/analytics` is a small async script. No issues found.
8. **Observability:**
   - **Analytics:** E1 is the conversion dashboard. Day-1 funnel: visits → `cta_click` → `booking_submit` → Calendly bookings (Calendly's own report).
   - **Logging:** add the lead `source` to the backend's save log line.
   - **Demo-line health:** E4's daily test call is the demo-line health check.
9. **Deploy:**
   - **Order:** backend first (additive: `roiEstimate`, the field whitelist, the secret gate), then the site.
   - **New env vars:** `VITE_CALENDLY_URL` (Vercel) and `LEAD_INGEST_SECRET` (backend and n8n).
   - **Smoke test:** submit a test lead on the Vercel preview, then confirm the alert email arrives and the widget renders.
10. **Trajectory:**
    - **Reversibility:** 5/5 for site items; R1 is a commercial term, 4/5 once a client signs.
    - **Debt:** the `EXISTING_PATIENT_SHARE = 0.5` assumption, to be replaced with measured data after client #1 (alongside E3).
11. **Design & UX:**
    - **IA order stays:** promise → proof → price → math → book.
    - **New states:** booking `loading-widget` and `link-fallback`.
    - **Mobile:** the ROI range must stay readable at 375px (stack the two numbers if needed). R2's longer CTA wraps to two lines on mobile instead of truncating.
    - **Design review:** run `/design-review` after the build.

### 8.6 Failure modes registry

| Failure | Detected by | Critical gap? |
|---|---|---|
| Trial billed before go-live (R1 not carried into the contract) | Contract review | No: owner action in R1 |
| Demo line dead while its CTA is live | E4 daily test call | No |
| Demo callers never followed up | E4 lead alert | No |
| Calendly down | E2 fallback | No |
| Spoofed "Demo line" leads | E4 secret gate | No |
| Spam leads on the public POST | Nothing today | **Yes, existing.** The field whitelist limits the damage; rate limiting is in `TODOS.md` |

### 8.7 What already exists
`estimateLeak`/`clean` (`roi.js`), the `VITE_DEMO_PHONE` env-switch pattern, the lead alerts (`backend/services/notifications.js`), the Lead schema with `callsPerWeek`/`bookingSoftware`, the booking status machine (`Booking.jsx:16`), and Calendly as an SRD §3 P0 integration.

### 8.8 NOT in scope
- **E3 guarantee:** deferred to `TODOS.md`. It needs a measured baseline first.
- **Price change (F10):** not proposed; $297 stays under plan §7 D2.
- **Building the demo line:** still Phase 0. E4 only defines what must ship with it.
- **Rate limiting `/api/leads`:** an existing gap, recorded in `TODOS.md`.

### 8.9 Dream state delta
```
 TODAY                          AFTER THIS PLAN                       12-MONTH IDEAL
 Unmeasured funnel; "book"  ─▶  Measured funnel; booked in one  ─▶  Live demo line converts on its own;
 = wait for email; demo off      sitting; demo callers alerted       guarantee priced from real client data
```

### 8.10 Implementation tasks
1. **Backend:** `Lead.roiEstimate`, conditional required fields, a POST field whitelist, the `Demo line` secret gate, and a backend test (E4, E5). Human M / CC S.
2. **`roi.js`:** `lostRevenueLow`, `callsBucket`, and tests (R3, E5). Human S / CC S.
3. **`PricingSection.jsx`:** R1 copy, R3 range UI, R4 counter, the E5 CTA, and R5 removal. Human S / CC S.
4. **`HeroSection.jsx` and `Booking.jsx`:** R2 copy, E5 prefill, the E2 Calendly states. Human M / CC S.
5. **E1:** `@vercel/analytics` and 5 `track()` calls; confirm the Vercel plan. Human S / CC S.
6. **E4 (n8n, ships with the demo line):** the POST node with call-ID dedupe, and the daily test-call job. Human M / CC M.
7. **Verify:** lint, tests, build, a 375px check, the Calendly fallback check, then `/design-review`.

### 8.11 Reality rows
- REALITY: premise-table pass. All 10 findings have file:line or command receipts; F10 is marked estimated (unverified=1). Receipt: WEBSITE_REDESIGN_PLAN.md §8.1
- REALITY: already-done pass. Nothing in R1–R5 or E1–E5 exists on `origin/main` at 2ed1044 (grep for analytics, `useSearchParams` and Calendly = 0 hits). Receipt: src/pages/Booking.jsx:58
- REALITY: surface-check pass. Routes `/api/leads` (`server.js:84`) and `/booking` (`App.jsx`) exist. The `@vercel/analytics` and Calendly embed APIs are third-party, to be verified at build time. Receipt: backend/server.js:84
- REALITY: binding-decisions pass. `gstack-decision-search` returned none. Plan §7 D1–D8 still hold; R1 amends §7 D2's trial start, answered in Q2. Receipt: WEBSITE_REDESIGN_PLAN.md §7
- REALITY: numbers pass. $21,285 and $10,643 are re-derived from `roi.js`; vendor prices are tagged estimated. Receipt: src/lib/roi.js:18
- REALITY: deferred-asks pass. There's no linked issue; E3 is deferred with its reason. Receipt: WEBSITE_REDESIGN_PLAN.md §8.8
- REALITY: pr-count pass. There's no `.gstack/ship-policy.json`, so the default is one PR per wave: wave 1 = tasks 1–5 and 7; wave 2 = task 6, with the demo line. Receipt: WEBSITE_REDESIGN_PLAN.md §8.10

### 8.12 Completion summary
```
  +====================================================================+
  |            MEGA PLAN REVIEW — COMPLETION SUMMARY                   |
  +====================================================================+
  | Mode selected        | SELECTIVE EXPANSION                         |
  | System Audit         | trial < go-live, "book" doesn't book, no    |
  |                      | analytics, $21k ROI default, demo callers   |
  |                      | untracked                                   |
  | Step 0               | 5 repairs + 4 additions accepted, 1 deferred|
  | Section 1  (Arch)    | 1 issue found (new auth boundary, planned)  |
  | Section 2  (Errors)  | 6 error paths mapped, 0 GAPS                |
  | Section 3  (Security)| 2 issues found, 0 High severity             |
  | Section 4  (Data/UX) | 5 edge cases mapped, 0 unhandled            |
  | Section 5  (Quality) | 0 issues found                              |
  | Section 6  (Tests)   | Test list produced, 0 gaps                  |
  | Section 7  (Perf)    | 0 issues found                              |
  | Section 8  (Observ)  | 1 gap found (source in log line), planned   |
  | Section 9  (Deploy)  | 1 risk flagged (backend-first order)        |
  | Section 10 (Future)  | Reversibility: 4/5, debt items: 1           |
  | Section 11 (Design)  | 2 issues found (range at 375px, CTA wrap)   |
  +--------------------------------------------------------------------+
  | NOT in scope         | written (4 items)                           |
  | What already exists  | written                                     |
  | Dream state delta    | written                                     |
  | Error/rescue registry| 6 rows, 0 CRITICAL GAPS                     |
  | Failure modes        | 6 total, 1 CRITICAL GAP (existing spam risk)|
  | TODOS.md updates     | 3 items (guarantee, rate limit, deposit)    |
  | Scope proposals      | 8 proposed, 7 accepted (SELECTIVE)          |
  | CEO plan             | written                                     |
  | Outside voice        | Claude subagent: completed, 6/10, resolved |
  | Lake Score           | N/A (no coverage-scored questions)          |
  | Diagrams produced    | 3 (architecture, booking states, dream)     |
  | Stale diagrams found | 0                                           |
  | Unresolved decisions | 0                                           |
  | Reality rows         | 7/7 rows, 1 unverified                      |
  +====================================================================+
```

### 8.13 Second-opinion amendments (independent reviewer, 2026-11-06)
- **Reviewer:** a fresh-context general-purpose agent, run on the user's request.
- **Result:** QUALITY SCORE 6/10, ISSUES.
- **What it read:** both inputs, the SRD and the frontend code. Backend files were blocked by the read-permission setting; I checked its backend claims myself: `Booking.jsx:92` website `required type="url"`, `Lead.js:7` email required, `notifications.js:88` prints a raw `leadData.email`.

**User decisions:** S1–S3 and the revised R2 (Q9); R1 kept, deposit deferred (Q10). See 8.2.

**Mechanical fixes to accepted items.** These change correctness, not scope, so no new decision was needed:
1. **E4 test call:** n8n drops calls from the test-caller number before the `/api/leads` POST, so the daily test call doesn't create a lead or alert every morning.
2. **E4 health check:** it asserts on Retell's call webhook (call connected plus a transcript containing the greeting), not on Twilio ring count.
3. **E4 timing:** the secret gate and conditional required fields move from task 1 to wave 2 (task 6), with the demo line. Task 1 keeps the field whitelist and `roiEstimate`.
4. **E4 alerts:** a lead with no email renders "N/A" in the email and WhatsApp alerts (`notifications.js:88` currently prints `undefined`). Add a backend test for it.
5. **E1 events:** add a sixth event, `calendly_booked`, fired from Calendly's `calendly.event_scheduled` postMessage, so the real conversion is measured on the site.
6. **E2 "loaded":** the first `calendly.page_height` or `calendly.profile_page_viewed` postMessage after the script's `onload`. Otherwise the 10-second fallback applies.
7. **E2 cookie copy:** the cookie banner's "essential cookies" copy (`CookieConsent.jsx:121`) adds a line saying the scheduling step loads Calendly, which sets its own cookies.
8. **E5 bad params:** an invalid or missing `calls` param means no prefill (empty select), not 'Under 25'. Test: `callsBucket(NaN)`, `callsBucket(undefined)` and `callsBucket(-5)` all return `''`.
9. **Stale text:** plan §1 and §7 are historical snapshots from before slices 1–6. §0 and §8 are the current status.

**Revised build order (supersedes 8.10 ordering):**
- **Step 0:** S3, the demo recording (owner: you).
- **Step 1:** backend task 1 (minus the E4 parts).
- **Step 2:** `roi.js` (R3, S2, E5).
- **Step 3:** pricing (R1, R3, R4, R5, S2).
- **Step 4:** hero and booking (R2, S1, E5, E2).
- **Step 5:** E1.
- **Step 6:** verify.
- **Wave 2:** E4 (task 6, plus the moved backend parts), when the demo line ships.


## 8.14 Build check, PR #9 against §8.3 (2026-11-06)

Second `/plan-ceo-review` run, scoped by D1 ("Check built vs. plan") to compare the wave-1 code with the approved rows.

Matches: R1, R3, R4, R5, S1, S2, E1, E5; the backend sets `source` itself and caps `roiEstimate` at 300 characters.

| ID | Finding | Decision | Answer |
|----|---------|----------|--------|
| D2 | PR #9 ships R2's "real demo call" copy before the S3 recording exists | PR #9 held as draft until `public/demo-call.mp3` is recorded | "Hold merge until recorded (recommended)" |
| D3 | The ROI calculator button read "Get this audit for your spa", breaking §4.1's one-label rule | Renamed to "Book a 15-min ROI audit" on `conversion-wave-1` | "Use the standard label (recommended)" |

Launch config, not decisions: set `VITE_CALENDLY_URL` (E2 is inert without it), enable Vercel Web Analytics (E1), and set `VITE_DEMO_PHONE` only after Phase 0 passes.

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 2 | ISSUES OPEN | 8 proposals, 7 accepted, 1 deferred; build check: 2 findings, both resolved (§8.14) |
| Outside Review | native Claude subagent (user-requested) | Independent 2nd opinion | 1 | completed | 23 findings; 23 resolved (4 by user decision Q9, 1 by Q10, 18 as mechanical fixes in §8.13); 0 unresolved |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 0 | — | — |
| Design Review | `/plan-design-review` | UI/UX gaps | 0 | — | — |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | — | — |

- **OUTSIDE COVERAGE:** native Claude subagent, spec review/outside voice, completed (score 6/10). Backend files were unreadable to it, and I verified those claims directly. No completed external (non-Claude) review.
- **VERDICT:** CEO review complete, with 1 existing critical gap (spam and mass assignment on the public lead endpoint, partly addressed by task 1's field whitelist). Eng review required.

NO UNRESOLVED DECISIONS
