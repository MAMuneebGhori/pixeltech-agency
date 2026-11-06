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

## 6. Build order (each slice: lint + build + `node --test` + `npm run check:mobile`, which tests 320px and 375px; see §10 X7/X10)

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
- **Setup (as built, corrected in §9):** `main.jsx` injects `/_vercel/insights/script.js` in production builds; `@vercel/analytics` was not added because its React peer range conflicts with `@remix-run/react`. Web Analytics must be enabled on the Vercel project or the script 404s. It's cookieless, so the cookie banner copy stays true.
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
- **Backend validation:** `server.js` accepts `source: 'Demo line'` only with a matching secret, compared with the existing `safeEqual` (`server.js:38`), never `===`. Without it, the backend forces `source = 'Booking Form'`.
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
- REALITY: premise-table pass. All 10 findings have file:line or command receipts; F10 is marked estimated (unverified=1). Receipt: WEBSITE_REDESIGN_PLAN.md:186
- REALITY: already-done pass. Nothing in R1–R5 or E1–E5 exists on `origin/main` at 2ed1044 (grep for analytics, `useSearchParams` and Calendly = 0 hits). Receipt: src/pages/Booking.jsx:58
- REALITY: surface-check pass. Routes `/api/leads` (`server.js:84`) and `/booking` (`App.jsx`) exist. The `@vercel/analytics` and Calendly embed APIs are third-party, to be verified at build time. Receipt: backend/server.js:84
- REALITY: binding-decisions pass. `gstack-decision-search` returned none. Plan §7 D1–D8 still hold; R1 amends §7 D2's trial start, answered in Q2. Receipt: WEBSITE_REDESIGN_PLAN.md:165
- REALITY: numbers pass. $21,285 and $10,643 are re-derived from `roi.js`; vendor prices are tagged estimated. Receipt: src/lib/roi.js:18
- REALITY: deferred-asks pass. There's no linked issue; E3 is deferred with its reason. Receipt: WEBSITE_REDESIGN_PLAN.md:352
- REALITY: pr-count pass. There's no `.gstack/ship-policy.json`, so the default is one PR per wave: wave 1 = tasks 1–5 and 7; wave 2 = task 6, with the demo line. Receipt: WEBSITE_REDESIGN_PLAN.md:365

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

## 9. Eng review (2026-11-06)

**Target:** `pixel tech/WEBSITE_REDESIGN_PLAN.md` as merged to main (`666b398`, PR #8), checked against the wave-1 code on `conversion-wave-1` (PR #9, `0c9d177`) and `backend/` on main.

## Decision ledger

### X1: committed live secrets in `backend/.env`
Finding: 1, CRITICAL, confidence 10/10, `backend/.env` (tracked on `origin/main`, blob `ec1339b`; first tracked in `0817ff1`, last changed `ee9b1ce` 2026-06-09); reviewer: eng review (Claude). Repo `MAMuneebGhori/pixeltech-agency` visibility = PUBLIC (`gh repo view`). Keys present: `GEMINI_API_KEY`, `MONGODB_URI`, `RESEND_API_KEY`, `GREEN_API_INSTANCE`, `GREEN_API_TOKEN`, `DEEPSEEK_API_KEY` (values not reproduced). `backend/.gitignore` lists `.env`, which does not untrack a committed file.
Plan baseline: not in the plan; §8.5 item 3 covers `/api/leads` only.
Runtime evidence: `git ls-tree origin/main backend/.env` lists the file; masked `git show` confirms non-empty values for every key above. Whether Render reads env vars from its dashboard or depends on this file: unknown.
Comparison grid:
| Choice | Current | A | B |
|---|---|---|---|
| X1 key rotation (owner: you) | not done | rotate all 6 now | rotate all 6 now |
| X1 untrack `.env` | tracked, public | `git rm --cached backend/.env` in its own PR; `.env.template` stays | same as A |
| X1 history rewrite | none | none (keys rotated, so old values are dead) | `git filter-repo` + force-push main (destructive, rewrites every SHA) |
Question D1:
D1 — Committed live secrets in a public repo
Project/branch/task: PixelTech eng review of WEBSITE_REDESIGN_PLAN.md; found on main while reading backend/.
ELI10: backend/.env holds your database password and API keys, and it's in a public GitHub repo. Anyone can copy them; bots scan GitHub for exactly this. Hiding the file now doesn't help, because the old copies stay readable. Only new keys fix it.
Stakes if we pick wrong: someone reads or wipes every lead in MongoDB, sends email as you via Resend, or spams from your WhatsApp number.
Recommendation: A because rotating the keys makes the leaked values useless; a history rewrite adds force-push risk and protects nothing once rotated.
Completeness: A=10/10, B=10/10
Header: Leaked keys
Options:
A) Rotate + untrack (recommended)
You rotate all 6 keys today (MongoDB user password, Resend, Green API, Gemini, DeepSeek) and put the new values in Render's env settings. I open a small PR that runs `git rm --cached backend/.env`. History is untouched. Check Render's env vars are set before merging, or the deployed backend loses its config. (human: ~30 min / CC: ~2 min)
B) Rotate + rewrite history
Same rotation and untrack, plus `git filter-repo` to delete the file from every commit and a force-push of main. Rewrites every commit SHA, breaks open PRs (#9) and other clones, and GitHub caches and forks still keep the old blob. (human: ~1h / CC: ~10 min)

State: approved
Actual answer: A) Rotate + untrack. D1 answer "chose that is better", which delegates to the recommendation (A).
Accepted scope: owner rotates all 6 keys and sets the new values in Render; Claude opens a PR running `git rm --cached backend/.env` (no history rewrite), merged only after Render's env vars are confirmed set.
History: none

### X2: rate limit on `POST /api/leads` (TODOS.md item, plan §8.5 item 3)
Finding: 2, INFORMATIONAL, confidence 8/10, `backend/server.js:17-18` (`app.use(cors()); app.use(express.json());`, no `trust proxy`, no limiter) and `TODOS.md:20` ("a per-IP rate limit on `POST /api/leads` (e.g. 5 per 10 minutes)"); reviewer: eng review (Claude). The backend runs behind Render's proxy (plan §8.5 item 1). Without `app.set('trust proxy', 1)`, `req.ip` is the proxy's address, so a per-IP limit becomes one shared bucket: 5 real prospects in 10 minutes lock out everyone. E4 (wave 2) also routes every demo-line lead from n8n's single IP through this route.
Plan baseline: Q8 deferred rate limiting to TODOS.md, P2 ("Add to TODOS.md (recommended)").
Runtime evidence: `grep "trust proxy\|rate" backend/server.js` = 0 hits. `express-rate-limit` is not in `backend/package.json`.
Comparison grid:
| Choice | Current | A | B |
|---|---|---|---|
| X2 when | deferred (Q8), TODOS.md P2 | build now, own PR | stays deferred |
| X2 spec | per-IP 5/10 min + honeypot | `trust proxy` 1, per-IP 5/10 min, honeypot field, skip limiter when a valid `X-Lead-Secret` arrives (E4) | TODOS.md item amended with the same three requirements |
| X2 tests | none | backend `node --test`: 6th POST in window gets 429; filled honeypot is dropped without saving | none until built |
Question D2:
D2 — Rate limit on the public lead form: build now or keep deferred?
Project/branch/task: PixelTech eng review; backend/server.js POST /api/leads, TODOS.md item from CEO Q8.
ELI10: Anyone can hit the lead form's API as fast as they like, and each hit sends you an email and a WhatsApp alert. The TODO plans a limit of 5 per visitor per 10 minutes, but as written it would see every visitor as the same one (they all arrive through Render's proxy), so 5 real prospects would block everyone else.
Stakes if we pick wrong: a bot floods your alerts, or a naive limit silently turns real prospects away with an error.
Recommendation: A because the fix is about 25 lines plus 2 tests, and spam on the only lead path is the plan's one existing critical gap (§8.6).
Completeness: A=10/10, B=7/10
Header: Rate limit
Options:
A) Build now (recommended)
Separate small backend PR: `app.set('trust proxy', 1)`, a 5-per-10-minute per-IP limit on POST /api/leads (in-memory, ~20 lines, no new dependency), a hidden honeypot field on the booking form, and an exemption for requests with a valid demo-line secret once E4 ships. Two backend tests. Closes the §8.6 critical gap. (human: ~2h / CC: ~15 min)
B) Keep deferred, fix the TODO
No code now. Amend the TODOS.md item with the trust-proxy and n8n-exemption requirements so whoever builds it doesn't ship the shared-bucket bug. The spam gap stays open. (human: ~5 min / CC: ~1 min)

State: approved
Actual answer: A) Build now. D2 answer "A) Build now (recommended)".
Accepted scope: own backend PR: `trust proxy` 1, in-memory per-IP limit of 5 per 10 minutes on POST /api/leads (no new dependency), honeypot field on the booking form, limiter skipped for a valid `X-Lead-Secret` once E4 ships, and two backend tests (429 on the 6th POST; filled honeypot not saved). Supersedes the Q8 deferral; the TODOS.md item is removed when this merges.
History: Q8 deferred this to TODOS.md (CEO review).

### X3: call-volume labels kept in two places
Finding: 3, INFORMATIONAL, confidence 8/10, `src/pages/Booking.jsx:7` (`const CALL_VOLUMES = ['Under 25', '25–50', '50–100', '100+', 'Not sure'];`) and `src/lib/roi.js:47-50` (`return 'Under 25'` … `return '100+'`); reviewer: eng review (Claude), red flag 8 (hand-synced list). `roi.test.js:43-50` asserts the literal strings, not membership in the form's list. Renaming a label on one side makes E5 prefill pick a value the `<select>` doesn't have, so the field renders empty, with every test green.
Plan baseline: §8.3 E5 "maps `calls` to the select bucket via a new `callsBucket()` in `roi.js`" (approved, Q7). Shape of the label list: unspecified.
Runtime evidence: both lists match today (static read, PR #9 `0c9d177`).
Comparison grid:
| Choice | Current | A | B |
|---|---|---|---|
| X3 label source | two hand-synced lists | `CALL_VOLUMES` exported from `roi.js`; `Booking.jsx` imports it; `callsBucket` returns entries of it | unchanged |
| X3 test | literals only | add one assertion: every non-empty `callsBucket` result is in `CALL_VOLUMES` | unchanged |
| E5 behavior | approved (Q7) | unchanged | unchanged |
Question D3:
D3 — Keep the booking form's call-volume labels in one place?
Project/branch/task: PixelTech eng review; PR #9 (conversion-wave-1), Booking.jsx and roi.js.
ELI10: When someone comes from the ROI calculator, the booking form pre-picks their calls-per-week option. The option names live in Booking.jsx, and roi.js has its own copy of the same names. Change one copy and the pre-pick quietly stops working, and no test notices.
Stakes if we pick wrong: calculator visitors land on a form with the calls field blank, and nobody finds out.
Recommendation: A because it's a 4-line move plus one assertion, and it removes the silent failure for good.
Completeness: A=10/10, B=7/10
Header: Label list
Options:
A) One list in roi.js (recommended)
Move `CALL_VOLUMES` into roi.js and export it; Booking.jsx imports it; callsBucket returns its entries. Add one test assertion that every bucket is a real form option. Lands on PR #9. (human: ~15 min / CC: ~3 min)
B) Leave as is
Both lists match today. Anyone editing the labels has to remember the other file. (human: 0 / CC: 0)

State: approved
Actual answer: A) One list in roi.js. D3 answer "A) One list in roi.js (recommended)".
Accepted scope: export `CALL_VOLUMES` from `roi.js`, import it in `Booking.jsx`, have `callsBucket` return its entries, and add one assertion in `roi.test.js` that every non-empty bucket is in `CALL_VOLUMES`. Lands on PR #9; E5 behavior unchanged.
History: none

### X4: Calendly script listeners outlive the scheduler
Finding: 4, INFORMATIONAL, confidence 6/10 (medium confidence, verify this is actually an issue), `src/pages/Booking.jsx:55-56` (`script.addEventListener('load', init); script.addEventListener('error', () => setState('failed'));`) with cleanup at `:58-61` removing only the `message` listener and the timer; reviewer: eng review (Claude). Under `<StrictMode>` (`src/main.jsx:18`) React mounts effects twice in dev, so `init` is queued twice and `Calendly.initInlineWidget` may run twice into one parent. Production mounts once, so the user-facing effect there is unverified and likely nil.
Plan baseline: §8.3 E2 states and the §8.13 item 6 "loaded" rule (approved, Q4). Listener lifetime: unspecified.
Runtime evidence: not run in a browser; whether a second `initInlineWidget` call renders a second iframe is unknown.
Comparison grid:
| Choice | Current | A | B |
|---|---|---|---|
| X4 listener cleanup | `load`/`error` never removed | both removed in the effect cleanup (named handlers) | unchanged |
| E2 states and timeout | approved (Q4) | unchanged | unchanged |
Question D4:
D4 — Clean up the Calendly script listeners?
Project/branch/task: PixelTech eng review; PR #9 (conversion-wave-1), Booking.jsx Scheduler.
ELI10: After a booking is saved, the page loads Calendly's script and waits for it. The code attaches "script loaded" handlers but never removes them, so in development mode (which mounts things twice on purpose) the scheduler may start twice. Real visitors probably never see it, but it's two lines to make it correct.
Stakes if we pick wrong: at worst a doubled scheduler during local testing that sends someone chasing a fake bug; production impact unverified.
Recommendation: A because it's two lines that make the component correct under React's own rules.
Completeness: A=10/10, B=8/10
Header: Listeners
Options:
A) Remove on cleanup (recommended)
Name the load and error handlers and remove both in the effect cleanup, next to the existing message-listener removal. Lands on PR #9. No change to the E2 states or the 10-second fallback. (human: ~10 min / CC: ~2 min)
B) Leave as is
Production mounts once, so visitors are very likely unaffected. Local dev may show a doubled widget. (human: 0 / CC: 0)

State: approved
Actual answer: A) Remove on cleanup. D4 answer "A) Remove on cleanup (recommended)".
Accepted scope: name the script `load` and `error` handlers in `Booking.jsx` Scheduler and remove both in the effect cleanup. Lands on PR #9; E2 states and the 10-second fallback unchanged.
History: none

Approval readiness: PASS. Checked X1 (D1 "chose that is better" → A), X2 (D2 "A) Build now (recommended)"), X3 (D3 "A) One list in roi.js (recommended)"), X4 (D4 "A) Remove on cleanup (recommended)"). No pending rows.

### 9.1 Scope Challenge
- **Result:** scope accepted as-is. What's left of the plan is wave 2 (E4) plus the TODOs: under 8 files, no new classes or services, so the complexity gate didn't trip.
- **Findings:**
  - `[CRITICAL] (confidence: 10/10) backend/.env` — live keys committed to a public repo. X1, approved (D1).
  - `[INFORMATIONAL] (confidence: 8/10) backend/server.js:17` — the planned per-IP limit would key on Render's proxy IP. X2, approved: build now (D2).
- **Reality rows:**
REALITY: premise-table pass. 11 claims checked against code: E1 setup claim FALSE (corrected in §8.3); others hold. unverified=2 (Render env-var source, Calendly double-init). Receipt: 0c9d177 (PR #9; src/main.jsx line 11 there)
REALITY: already-done pass. Wave 1 is built on PR #9 (`0c9d177`); E4 and the rate limit are absent on main (`grep "trust proxy\|rate" backend/server.js` = 0). Receipt: backend/server.js:85
REALITY: surface-check pass. `/api/leads` (`server.js:85`), `/booking`, `/_vercel/insights/script.js` (`main.jsx:11`) and the backend `npm test` script (`backend/package.json` `node --test "lib/*.test.js"`, 6/6 pass) exist. Receipt: backend/package.json:8
REALITY: binding-decisions pass. D1–D8, Q1–Q10 and §8.14 D2/D3 kept. X2 supersedes the Q8 deferral by explicit answer (D2). Receipt: WEBSITE_REDESIGN_PLAN.md:201
REALITY: numbers pass. 5 per 10 minutes and the 10s Calendly timeout are taken from TODOS.md:20 and Booking.jsx:15; no new benchmarks. Receipt: src/pages/Booking.jsx:15
REALITY: deferred-asks pass. No linked issue; E3 and the deposit stay deferred in TODOS.md. Receipt: TODOS.md:3
REALITY: pr-count pass. Default one PR per wave. This review adds PR #10 (secrets) and one backend PR (X2) on top of PR #9; X3/X4 land on PR #9. Each extra PR is one more review and merge. Receipt: WEBSITE_REDESIGN_PLAN.md:374

### 9.2 Architecture
- **Design-twice:** no new module, service or public boundary. E4 adds a secret check inside an existing route, so there's no second shape to compare.
- **Findings:**
  - `[INFORMATIONAL] (confidence: 8/10) src/pages/Booking.jsx:7` + `src/lib/roi.js:47` — hand-synced label list (red flag 8). X3, approved (D3).
  - `[INFORMATIONAL] (confidence: 8/10) src/main.jsx:11` — §8.3 E1 described `@vercel/analytics`; the build injects the insights script. Factual correction, applied in §8.3; no behavior change.
  - `[INFORMATIONAL] (confidence: 7/10) WEBSITE_REDESIGN_PLAN.md §8.3 E4` — "matching secret" didn't name a comparison. The existing `safeEqual` (`server.js:38`) is now specified. Reuses an existing helper for approved behavior (Q6); no new choice.
- **Dispositions:** X3 accepted (D3); E1 drift corrected; E4 compare corrected.

### 9.3 Code quality
- **Findings:**
  - `[INFORMATIONAL] (confidence: 6/10) src/pages/Booking.jsx:55` — Calendly script listeners never removed. Medium confidence, verify this is actually an issue. X4, approved (D4).
  - `[INFORMATIONAL] (confidence: 5/10) src/pages/Booking.jsx:99` — `VITE_API_URL || 'http://localhost:3001'`. If the Vercel env var is missing, every production submit fails with the error state. Medium confidence, verify this is actually an issue. Added to the launch config list below; no code change.
  - `[INFORMATIONAL] (confidence: 7/10) backend/server.js:120-124` — admin `PATCH /status` passes `req.body.status` to `findByIdAndUpdate` without `runValidators`, so the `['new','contacted']` enum isn't enforced. Admin-only, existing, outside the plan. Noted; no task.
- **Dispositions:** X4 accepted (D4); `VITE_API_URL` → launch config; admin PATCH noted only.

### 9.4 Tests
Framework: `node --test` (frontend `src/lib/*.test.js`, backend `lib/*.test.js`). No CLAUDE.md testing section.

```
CODE PATHS                                         USER FLOWS
[+] src/lib/roi.js                                 [+] Calculator → booking
  ├── estimateLeak / break-even [★★★ roi.test]       ├── [★★ TESTED] params round-trip — roi.test fromRoiParams
  ├── callsBucket boundaries     [★★★ roi.test]       ├── [GAP] bucket ∈ form options (X3)
  └── to/fromRoiParams hostile   [★★★ roi.test]       └── [GAP] [→E2E] calc → submit → alert → Calendly (manual)
[+] backend/lib/leadInput.js                       [+] Lead form abuse
  └── whitelist/caps/source      [★★★ 6 tests]        ├── [GAP] 6th POST in 10 min → 429 (X2)
[+] backend/server.js POST /api/leads                 └── [GAP] honeypot filled → not saved (X2)
  ├── 503 when DB down            [GAP] (existing, low value)
  └── rate limit (X2, planned)    [GAP]            [+] Scheduler (Booking.jsx)
[+] src/lib/track.js              never throws;       ├── loading → ready → widget   [manual, plan §8.5 item 6]
                                  no test (trivial)   └── 10s / script error → link  [manual]
COVERAGE: 5/11 paths tested | GAPS: 4 (1 E2E-manual) | QUALITY: ★★★:4 ★★:1
```

- **Proposed tests:**
  - `roi.test.js`, one assertion: every non-empty `callsBucket` result is in `CALL_VOLUMES` (X3). Value: protects=prefill hits a real option; fails_when=a label changes on one side; why_new=literals only today; seam=none; no_claim=select rendering.
  - Backend `lib/*.test.js`: the 6th POST in the window returns 429, and a filled honeypot isn't saved (X2). Value cards are in the Test Plan artifact.
  - The end-to-end path stays manual on the Vercel preview (plan §8.5 item 6).
- **Tests made obsolete:** none.
- **Test plan artifact:** `~/.gstack/projects/MAMuneebGhori-pixeltech-agency/mamun-docs-eng-review-eng-review-test-plan-20261106-174432.md`.

### 9.5 Performance
No issues found. `GET /api/leads` loads every lead unpaginated (`server.js:72`); the scale is tens of leads before client #1, so it's fine until the hundreds. Calendly loads only after submit.

### 9.6 Outside voice
Unavailable. Codex isn't installed, and the native Plan subagent didn't return a complete report within five minutes, so it was stopped. No outside coverage.

### 9.7 What already exists
- `safeEqual` (`server.js:38`): reused for E4.
- `pickLeadFields` (`backend/lib/leadInput.js`): the honeypot check goes next to it.
- `clean` / `callsBucket` / `fromRoiParams` (`roi.js`): X3 builds on them.
- `track()` (`track.js`).
- The Calendly `Scheduler` (`Booking.jsx:25`).

### 9.8 NOT in scope
- **Git history rewrite for `.env`:** rejected in D1. Rotation makes the leaked values dead.
- **Admin PATCH enum validation:** admin-only, existing, low impact.
- **Pagination of `GET /api/leads`:** not needed at the current scale.
- **E4 build:** still wave 2, with the demo line.

### 9.9 Failure modes
| Path | Failure | Covered by | User sees |
|---|---|---|---|
| Rate limit (X2) | Keyed on the proxy IP, so real prospects get blocked | `trust proxy` + 429 test | "We couldn't send your request" (existing error state) |
| Honeypot (X2) | Autofill fills the hidden field | `autocomplete="off"`, `tabindex=-1`, `aria-hidden` | A real user is silently dropped (watch the lead count after deploy) |
| `.env` untrack (PR #10) | Render has no env vars set | Merge gate in the PR checklist | Backend 503s on every lead |
| E5 prefill (X3) | Label drift | X3 assertion | Blank select |

Critical gaps: 0. The earlier spam gap (§8.6) closes when X2 ships.

### 9.10 Launch config additions
- Confirm `VITE_API_URL` is set on Vercel production.
- Enable Web Analytics on the Vercel project.
- Rotate the six leaked keys and set them in Render before PR #10 merges.

## Implementation Tasks
Synthesized from this review's findings. Each task derives from a specific finding above.

- [ ] **T0 (P1, human: ~30 min / CC: n/a)** — secrets — Rotate all six leaked keys and set them in Render (owner)
  - Surfaced by: Scope Challenge — X1 `backend/.env`
  - Files: none (Render dashboard; MongoDB Atlas, Resend, Green API, Google AI Studio, DeepSeek consoles)
  - Verify: the old MongoDB password fails to connect, and a test lead on the deployed backend still alerts
- [ ] **T1 (P1, human: ~5 min / CC: ~1 min)** — repo — Merge PR #10 after T0
  - Surfaced by: X1
  - Files: `backend/.env` (untracked)
  - Verify: `git ls-files backend/.env` is empty on main; the Render deploy is healthy
- [ ] **T2 (P2, human: ~2h / CC: ~15 min)** — backend — Rate limit + honeypot on POST /api/leads
  - Surfaced by: Scope Challenge — X2 `server.js:17`
  - Files: `backend/server.js`, `backend/lib/leadInput.js`, `backend/lib/*.test.js`, `pixel tech/src/pages/Booking.jsx` (hidden field), `pixel tech/TODOS.md` (remove the item)
  - Verify: `cd backend && npm test`; on deploy, one real submit succeeds and the 6th rapid one gets 429
- [ ] **T3 (P2, human: ~15 min / CC: ~3 min)** — frontend — One `CALL_VOLUMES` list in roi.js
  - Surfaced by: Architecture — X3 `Booking.jsx:7`
  - Files: `src/lib/roi.js`, `src/lib/roi.test.js`, `src/pages/Booking.jsx`
  - Verify: `node --test src/lib/roi.test.js`, `npm run lint`
- [ ] **T4 (P2, human: ~10 min / CC: ~2 min)** — frontend — Remove Calendly script listeners on cleanup
  - Surfaced by: Code quality — X4 `Booking.jsx:55`
  - Files: `src/pages/Booking.jsx`
  - Verify: `npm run lint`, `npm run build`; one scheduler renders in `npm run dev`

_No new tasks from Performance._

### Parallelization
| Step | Modules touched | Depends on |
|------|----------------|------------|
| T1 | repo config | T0 |
| T2 | backend/, pixel tech/src/pages | — |
| T3 + T4 | pixel tech/src/lib, pixel tech/src/pages | — |

- **Lane A:** T3 → T4 (PR #9).
- **Lane B:** T2 backend part (its own PR).
- **Conflict:** T2's honeypot input touches `Booking.jsx`, which PR #9 also changes. Land PR #9 first, then add the honeypot field.
- **Owner lane:** T0 → T1.

### Unresolved decisions
None.

### Completion summary
- Step 0: Scope Challenge — scope accepted as-is
- Reality rows: 7/7 applicable rows emitted (PLAN_REALITY below), 2 unverified premises
- Architecture Review: 3 issues found
- Code Quality Review: 3 issues found
- Test Review: diagram produced, 3 gaps identified
- Performance Review: 0 issues found
- NOT in scope: written
- What already exists: written
- TODOS.md updates: 0 items proposed to user (the rate-limit item is superseded by X2 and removed when T2 merges)
- Failure modes: 0 critical gaps flagged
- Unresolved decisions: 0 in this review
- Outside voice: codex unavailable (not installed); native fallback gave no complete report in five minutes
- Parallelization: 2 lanes, 2 parallel / 1 sequential (owner)
- Lake Score: 4/4

## 10. Eng review, second pass: components, demo/ROI state, mobile (2026-11-06)

**Target:** this plan, focused on component architecture, the audio/transcript demo and ROI calculator state, and mobile layout. Evidence: `conversion-wave-1` at `38da60d` (PR #9) and `origin/main` at `666b398`. Mobile evidence is a **live probe**: the production build (`vite preview`) in headless Chrome at 375×812, measuring `scrollWidth` and element bounds on `/`, `/pricing`, `/booking`, `/booking?<roi params>` and `/about` (script: `scratchpad/mobile-probe.mjs`).

### 10.1 Component architecture (as built)

```
main.jsx ── StrictMode ── App (router) ── TopNavBar · <Routes> · Footer · CookieConsent · ScrollToTop
  │  trackClicks(document)  ← one delegated listener: [data-cta] → cta_click, [data-event] → event
  │  /_vercel/insights/script.js (prod only)
  │
  ├─ /            pages/Home.jsx (composition only, no state)
  │   ├─ HeroSection ─────────── DemoCallCard            [state: hasAudio, time]
  │   │    └─ <dialog> demo-line (only when VITE_DEMO_PHONE)
  │   ├─ HomeSections.jsx: RevenueLeak · HowItWorks · Comparison · Stack · GoLive · Digest
  │   │    └─ HowItWorks ─ ProductCards.jsx: CallCard · InboxCard · ReminderCard · RecallCard (static)
  │   ├─ PricingSection ─────── RoiCalculator             [state: form (strings)]
  │   ├─ FaqAccordion · FinalCtaSection
  │   └─ Section (exported from HomeSections.jsx; also used by Pricing, FAQ, About)
  ├─ /pricing     pages/Pricing.jsx → PricingSection titleAs="h1"
  ├─ /booking     pages/Booking.jsx                       [state: roiInputs, form, status] → Scheduler [state]
  ├─ /about       pages/About.jsx
  └─ /admin       pages/Admin.jsx (token inbox, out of scope)

lib/roi.js   pure: estimateLeak · bookingsToBreakEven · callsBucket · CALL_VOLUMES · to/fromRoiParams · format*
lib/track.js track() · trackClicks()
```

No global store, context or data fetching outside `/booking` and `/admin`. Every piece of state lives in the leaf that renders it, and the only cross-page state is the ROI inputs, carried in the URL (E5). Right-sized for a 6-route marketing site; no change proposed.

### 10.2 State: audio/transcript demo (`DemoCallCard.jsx`)

```
            mount (preload="metadata", src=/demo-call.mp3)
                 │
   ┌─────────────┴─────────────┐
 loadedmetadata             error (file missing → Vercel rewrite serves index.html → decode fails)
   │ hasAudio=true             │ hasAudio=false  → transcript-only card, <audio hidden>
   ▼                           
 controls visible, time=-1 → all lines normal
   │ timeupdate (~4/s) → time=currentTime
   ▼
 active = last line with t ≤ time → that line border-accent, earlier/later lines text-mut
```

- **Derived, not stored:** `active` is computed in render from `time`, so the highlight can't drift from the audio.
- **Coupling to S3:** `TRANSCRIPT[].t` is hand-timed against a recording that doesn't exist yet (`DemoCallCard.jsx:3`). When S3 lands, replace every line and time from the real recording before PR #9 merges; the §3 rule 5 honesty guardrail means the text must match the audio word for word.
- **No click-to-seek:** lines don't seek the audio. Not in the plan; listed under 10.6.

### 10.3 State: ROI calculator (`PricingSection.jsx` `RoiCalculator`)

```
 form: {callsPerWeek, missedPct, missedMessagesPerWeek, bookPct, treatmentValue}  (strings, so a field can be blank)
   │ onChange → setForm; first edit per page load → track('roi_edit') (module flag roiEdited)
   ▼ render (derived, nothing cached)
 estimateLeak(form) → missedLeads, lostBookings, lostRevenue, lostRevenueLow
 bookingsToBreakEven(form.treatmentValue) → N | null ("Enter a treatment value…")
 toRoiParams(form) → /booking?calls&missed&dms&book&value   (CTA, data-cta="roi")
   ▼
 /booking: fromRoiParams(URL) → roiInputs (null on a plain visit) → callsBucket → prefilled select;
           formatRoiEstimate(roiInputs) → roiEstimate on the lead (recomputed, never trusted from a URL total)
```

All math is in `roi.js` and unit-tested (10 tests). Calculator state is lost on Back from `/booking` (defaults return). Acceptable; listed under 10.6.

### 10.4 Mobile probe results (375×812, production build)

| Route | scrollWidth | Overflowing elements | Notes |
|---|---|---|---|
| `/` | **491** (viewport 375) | How It Works cards [16..490px] | Horizontal scroll of 116px on the whole page |
| `/pricing` | 375 | none | ROI result lines wrap cleanly |
| `/booking` | 375 | none | inputs 42px tall, 16px font (no iOS zoom) |
| `/booking?<roi>` | 375 | none | prefill note fits |
| `/about` | 375 | none | |

Tap targets: the nav toggle is 32px with `aria-label="Toggle navigation menu"`; footer links are 22px tall with 16px gaps; the inline "Zenoti, 2026" source link is 15px inside a hint line. All meet WCAG 2.2 AA 2.5.8 (24px or spacing; inline links exempt). None are 44px (the AAA / Apple HIG size); no change proposed.

### X5: home page scrolls sideways on phones
Finding: 5, CRITICAL, confidence 10/10 (measured), `src/components/HomeSections.jsx:101` (`<div key={s.n} className="bg-card border border-line rounded-[18px] p-6">`, a grid item with the default `min-width: auto`) holding `src/components/ProductCards.jsx:68` (`<p className="text-mut truncate">{t.msg}</p>`, `white-space: nowrap`); reviewer: eng review (Claude). The no-wrap preview's full single-line width becomes the grid item's minimum, so the `grid gap-5` column grows to 474px and every How It Works card overflows. Same markup on `origin/main` (`HomeSections.jsx:101`), so the live site has it today.
Plan baseline: §6 "each slice: lint + build + `node --test` + 375px check"; the 375px check never ran for slice 4 (ProductCards).
Runtime evidence: probe at 375px: `/` scrollWidth 491; overflowing chain `div [16..490]` → `figure` → `p.truncate` ×3 (InboxCard). Other routes 375.
Comparison grid:
| Choice | Current | A | B |
|---|---|---|---|
| X5 fix | none; page 491px wide | `min-w-0` on the How It Works grid item (`HomeSections.jsx:101`), on a branch off main, own PR | same class change, on PR #9 only (held) |
| X5 proof | none | rerun the 375px probe on all 5 routes: every scrollWidth = 375 | same probe |
| Release | — | ships to production on merge | waits for the demo recording |
Question D1:
D1 — Fix the sideways-scrolling home page on phones
Project/branch/task: PixelTech; found by a 375px probe of the production build; same bug on main.
ELI10: On a phone, the home page is 116px wider than the screen, so it wobbles sideways when you scroll and the How It Works cards get cut off at the right edge. Med-spa owners mostly look on their phones. It's caused by the inbox mock's one-line message previews; one CSS class on the card container fixes it.
Stakes if we pick wrong: every phone visitor sees a broken-feeling page until PR #9 ships, which is waiting on the demo recording.
Recommendation: A because the bug is live on main today and the fix is one class with a measured before/after.
Completeness: A=10/10, B=10/10
Header: Mobile overflow
Options:
A) Fix on main now (recommended)
New branch off main: add `min-w-0` to the How It Works grid item in HomeSections.jsx, rerun the 375px probe on all five routes (every page exactly 375 wide), lint and build, open a small PR. Ships independently of PR #9. (human: ~20 min / CC: ~3 min)
B) Fix on PR #9 only
Same one-class change, committed to conversion-wave-1. Production keeps the sideways scroll until PR #9 merges after the demo recording. (human: ~10 min / CC: ~2 min)

State: approved
Actual answer: A) Fix on main now. D1 answer "A) Fix on main now (recommended)".
Accepted scope: branch off main; `min-w-0` on the How It Works grid item (`HomeSections.jsx:101`); rerun the 375px probe on all five routes (each scrollWidth = 375); lint and build; own PR.
History: none

### X6: ROI result re-announced on every keystroke
Finding: 6, INFORMATIONAL, confidence 7/10, `src/components/PricingSection.jsx:80` (`<div className="rounded-xl bg-bg2 border border-line p-5" aria-live="polite">`) wrapping five paragraphs (break-even, range, explanation, formula); reviewer: eng review (Claude). Each `onChange` (`:68-71`) re-renders the region, so a screen reader queues the whole block (about 60 words, formula included) after each digit typed. Editing "500" to "650" queues three announcements.
Plan baseline: §8.13 S2 (break-even headline, range underneath; approved Q9). Live-region scope: unspecified.
Runtime evidence: static read; not run with a screen reader.
Comparison grid:
| Choice | Current | A | B |
|---|---|---|---|
| X6 live region | whole result box | only the break-even line and the range line (`aria-live="polite"` + `aria-atomic="true"` on a wrapper of those two) | unchanged |
| S2 layout and copy | approved (Q9) | unchanged | unchanged |
Question D2:
D2 — Make the ROI result announce only the two numbers that matter?
Project/branch/task: PixelTech; PR #9 (conversion-wave-1), PricingSection.jsx RoiCalculator.
ELI10: Screen-reader users hear the calculator's result read out as they type. Right now the whole result box is marked to be read, about 60 words including the formula, after every single digit. Narrowing it to "pays for itself at N bookings" and the dollar range makes it usable.
Stakes if we pick wrong: blind or low-vision owners hear a long, repeating wall of text and give up on the calculator.
Recommendation: A because it moves one attribute and changes nothing visual.
Completeness: A=10/10, B=6/10
Header: ROI announce
Options:
A) Announce two lines (recommended)
Move `aria-live="polite"` from the whole box to a wrapper around the break-even line and the range line, with `aria-atomic="true"` so each update reads as one short sentence. Nothing visual changes. Lands on PR #9 next to the calculator work. (human: ~15 min / CC: ~2 min)
B) Leave as is
Sighted users see no difference. Screen-reader users keep hearing the full block after each keystroke. (human: 0 / CC: 0)

State: approved
Actual answer: A) Announce two lines. D2 answer "A) Announce two lines (recommended)".
Accepted scope: in `PricingSection.jsx` RoiCalculator, move `aria-live="polite"` off the result box onto a wrapper around the break-even line and the range line, with `aria-atomic="true"`. No visual change; S2 layout and copy unchanged. Lands on PR #9.
History: none

### X7: no repeatable 375px check
Finding: 7, INFORMATIONAL, confidence 9/10, `package.json` (scripts: `lint`, `build`, no layout check) and plan §6 ("each slice: lint + build + `node --test` + 375px check"); reviewer: eng review (Claude). The 375px check is manual, it was skipped for slice 4, and X5 reached production. The probe used in 10.4 (headless Chrome over CDP, no new dependency, Node 24 built-in `WebSocket`) found it in one run.
Plan baseline: §6 requires a 375px check per slice (approved with Approach A). How it runs: unspecified.
Runtime evidence: probe run on 5 routes; `/` scrollWidth 491, others 375.
Comparison grid:
| Choice | Current | A | B |
|---|---|---|---|
| X7 check | manual, skipped once | `scripts/mobile-check.mjs` + `npm run check:mobile`: starts `vite preview`, launches local Chrome headless, fails (exit 1) if any of the 5 routes has scrollWidth > 375 | stays manual |
| §6 slice checklist | lint + build + test + 375px (manual) | 375px step becomes `npm run check:mobile` | unchanged |
| Dependencies | none added | none (system Chrome, Node built-ins) | none |
Question D3:
D3 — Turn the 375px phone check into a script?
Project/branch/task: PixelTech; plan §6 slice checklist; the probe that found X5.
ELI10: The plan says every change gets checked at phone width, but it's a manual step, it got skipped once, and the sideways-scroll bug went live. The quick script I used to find it can be saved as `npm run check:mobile`: it opens each page at phone width and fails if anything sticks out.
Stakes if we pick wrong: the next card or table that's too wide ships to phones unnoticed again.
Recommendation: A because the script already exists, adds no dependency, and it caught a live bug on its first run.
Completeness: A=10/10, B=6/10
Header: Mobile check
Options:
A) Add npm run check:mobile (recommended)
Commit the probe as `scripts/mobile-check.mjs` with an npm script. It runs the production preview in local headless Chrome and exits 1 if any of the 5 routes is wider than 375px. Plan §6 points its 375px step at it. Needs Chrome installed; no CI exists, so it runs by hand or from /ship. Goes in the same PR as X5. (human: ~1h / CC: ~10 min)
B) Keep it manual
No script. The 375px step stays a person resizing DevTools, as in §6 today. (human: 0 / CC: 0)

State: approved
Actual answer: A) Add npm run check:mobile. D3 answer "A) Add npm run check:mobile (recommended)".
Accepted scope: `scripts/mobile-check.mjs` + `npm run check:mobile` (starts `vite preview`, launches local headless Chrome, exits 1 if any of the 5 routes has scrollWidth > 375; no new dependency), in the X5 PR (#13); plan §6's 375px step points to it.
History: none

### 10.5 Outside voice (native Plan subagent, completed inside the 5-minute limit)
Codex is not installed; the native fallback returned a complete report (12 findings). Verified by the parent reviewer:
- **O3 (confirmed, `node` probe):** `/booking?value=500` and `?calls=abc` prefill "Under 25", because `fromRoiParams` cleans a missing or invalid `calls` to 0 (`roi.js:63`) before `callsBucket` sees it. This violates the approved §8.13 item 8 ("An invalid or missing `calls` param means no prefill"; Q2/mechanical fix). **Carried forward as required work under that approval:** `fromRoiParams` keeps `callsPerWeek` as `null` when the `calls` param is missing or not a non-negative number, and `roi.test.js` adds `/booking?value=500` and `calls=abc` → `''`.
- **O4 (confirmed):** `formatRoiEstimate` records the raw `missedPct`/`bookPct` ("missed 150%") while `pct()` computed at 100% (`roi.js:18` vs `:74`). **Carried forward under E5 (Q7: the lead stores the estimate and the inputs behind it):** record the clamped percentages; one test row.
- **O7 (static read):** `TRANSCRIPT.findLastIndex` (`DemoCallCard.jsx:15`) is ES2023, unpolyfilled; it throws on iOS 15.0–15.3 once audio plays. **Carried forward as a crash fix of approved behavior:** replace it with a reverse loop.
- **O10, O11 factual corrections:** the map now says `ReminderCard`; X6's code reference is the pre-change line (the narrowed wrapper is at `PricingSection.jsx:82` on `09359c6`).
- **Informational, no task:** O8 the active line is colour-only (no `aria-current`); O9 absurd inputs (1e308, 0.0001) print "$∞" or a 7-digit break-even; O12 the demo card header has no gap at 320px. Other `grid gap-5` items lack `min-w-0` but have no unwrappable content today.

### X8: demo player hidden on iPhone
Finding: O1, INFORMATIONAL, confidence 6/10 (medium confidence, verify this is actually an issue), `src/components/DemoCallCard.jsx:29-30` (`hidden={!hasAudio}` / `onLoadedMetadata={() => setHasAudio(true)}`); reviewer: outside voice (native Plan subagent), checked by the parent. iOS Safari has historically ignored `preload="metadata"` until a user gesture; if it still does, `loadedmetadata` never fires, the `<audio>` stays hidden and there are no controls to tap. Matters once S3's `public/demo-call.mp3` exists.
Plan baseline: §1 "audio player hidden until `public/demo-call.mp3` exists" (v1 decision D5, demo recording planned). How presence is detected: unspecified.
Runtime evidence: no iPhone test; headless Chrome can't show this. The file doesn't exist yet.
Comparison grid:
| Choice | Current | A | B | C | D |
|---|---|---|---|---|---|
| X8 player visibility | shown only after `loadedmetadata` | shown when a build-time constant `HAS_RECORDING = true` (set in the S3 commit that adds the mp3); no runtime probe | unchanged | unchanged until an iPhone test of PR #9 decides | unchanged, revisit when S3 lands |
| Transcript highlight | follows `timeupdate` | unchanged | unchanged | unchanged | unchanged |
Question D4:
D4 — Show the demo recording's player without waiting for the browser to preload it?
Project/branch/task: PixelTech; PR #9, DemoCallCard.jsx; matters once the S3 recording lands.
ELI10: The hero's demo card only shows its audio player after the browser has fetched the recording's details. iPhones have often refused to fetch audio until someone taps play, so on an iPhone the player might never appear and nobody can tap it. A simple switch that we flip when we add the recording avoids depending on that.
Stakes if we pick wrong: iPhone visitors, most of your owners, never hear the demo call that the hero promises.
Recommendation: A because it removes the guess entirely and the switch flips in the same commit that adds the file.
Note: options differ in kind, not coverage — no completeness score.
Header: iPhone player
Options:
A) Apply: build-time switch (recommended)
Replace the loadedmetadata check with a constant `HAS_RECORDING`, false today and set true in the commit that adds public/demo-call.mp3. The player shows exactly when the file ships; `onError` still hides it if the file is broken. Lands on PR #9. (human: ~20 min / CC: ~3 min)
B) Keep current behavior
The player keeps waiting for loadedmetadata. Works on desktop; on iPhone it may never show. (human: 0 / CC: 0)
C) Investigate first
Leave the code; when S3 lands, open PR #9's Vercel preview on a real iPhone and check that the player appears, then decide. Approves no change now. (human: ~15 min with a phone / CC: n/a)
D) Defer this change
Leave the row unresolved and revisit when the recording is made. Nothing changes now.

State: approved
Actual answer: A) Apply: build-time switch. D4 answer "A) Apply: build-time switch (recommended)".
Accepted scope: in `DemoCallCard.jsx`, a constant `HAS_RECORDING` (false today) decides whether the `<audio>` renders; the S3 commit that adds `public/demo-call.mp3` sets it true; `onError` still hides a broken file; the transcript highlight is unchanged. Lands on PR #9.
History: none

### X9: Calendly scheduler too wide at 320px
Finding: O2, INFORMATIONAL, confidence 8/10, `src/pages/Booking.jsx:80` (`'min-w-[280px] h-[680px]'`) inside `:126` (`px-5`) and `:137` (`p-5 md:p-7`); reviewer: outside voice, checked by the parent. At 320px the card's inner width is 320 − 40 − 40 = 240px, so the 280px minimum pushes the page 40px wide in the post-submit state. At 375px the inner width is 295px, so the probe passes. The probe never reaches `status === 'sent'`.
Plan baseline: §6 375px check; §8.3 E2 inline Calendly (Q4). 320px: not stated.
Runtime evidence: arithmetic from the classes above; not rendered (needs a real Calendly URL and a saved lead).
Comparison grid:
| Choice | Current | A | B | C | D |
|---|---|---|---|---|---|
| X9 scheduler width | `min-w-[280px]` inside card padding | drop the min width; below `md` the scheduler cancels the card padding (`-mx-5 md:mx-0`), so it gets 280px at 320 and the page stays 320 wide | unchanged | unchanged until checked with a real Calendly URL at 320px | unchanged |
| E2 states and fallback | approved (Q4) | unchanged | unchanged | unchanged | unchanged |
Question D5:
D5 — Make the booking scheduler fit 320px phones?
Project/branch/task: PixelTech; PR #9, Booking.jsx Scheduler.
ELI10: After someone submits the booking form, the Calendly scheduler appears. It's set to be at least 280px wide, but on the smallest phones (320px, like an iPhone SE) the card only has 240px inside it, so the page goes 40px wider than the screen right at the moment they're picking a time.
Stakes if we pick wrong: on small phones the most important step, booking the slot, wobbles sideways and gets cut off.
Recommendation: A because it is two class changes and keeps the scheduler as wide as the screen allows.
Note: options differ in kind, not coverage — no completeness score.
Header: Calendly 320
Options:
A) Apply: let it fill the card (recommended)
Remove the 280px minimum and, on small screens, let the scheduler stretch to the card's edges (`-mx-5 md:mx-0`), giving 280px at a 320px screen with no sideways scroll. No change to the loading, ready or fallback states. Lands on PR #9. (human: ~20 min / CC: ~3 min)
B) Keep current behavior
375px and wider phones are fine; 320px phones scroll sideways on the scheduler step. (human: 0 / CC: 0)
C) Investigate first
Set a test Calendly URL, submit on PR #9's preview at 320px, and measure before deciding. Approves no change now. (human: ~30 min / CC: ~10 min)
D) Defer this change
Leave the row unresolved; revisit with the design review. Nothing changes now.

State: approved
Actual answer: A) Apply: let it fill the card. D5 answer "A) Apply: let it fill the card (recommended)".
Accepted scope: in `Booking.jsx` Scheduler, drop `min-w-[280px]`; below `md` the ready container uses `-mx-5 md:mx-0` so it spans the card's edges (280px at a 320px screen). E2 states and the 10s fallback unchanged. Lands on PR #9.
History: none

### X10: `check:mobile` widths
Finding: O5, INFORMATIONAL, confidence 8/10, `scripts/mobile-check.mjs` (PR #13: `const WIDTH = 375;`); reviewer: outside voice, checked by the parent. The check only tests 375px, so a 320px-only overflow such as X9 passes. Post-submit states (scheduler), the nav menu and dialogs are out of reach for a route-only probe.
Plan baseline: X7 approved (D3): 5 routes at 375px.
Runtime evidence: the script runs one width (read).
Comparison grid:
| Choice | Current | A | B | C | D |
|---|---|---|---|---|---|
| X10 widths | 375 | 320 and 375 (each route at both; fail on either) | 375 only | unchanged until an X9-style bug is seen at 320 | unchanged |
| X7 routes and pass rule | approved (D3) | unchanged | unchanged | unchanged | unchanged |
| Post-submit/nav/dialog states | not covered | still not covered (listed in NOT in scope) | same | same | same |
Question D6:
D6 — Also run the phone check at 320px?
Project/branch/task: PixelTech; PR #13, scripts/mobile-check.mjs.
ELI10: The new phone check only looks at a 375px-wide screen. Smaller phones like the iPhone SE are 320px wide, and some layouts only break there. Running each page at both widths costs a few more seconds and catches that class of bug.
Stakes if we pick wrong: a layout that only breaks on small phones ships without anyone noticing.
Recommendation: A because it's a one-line loop and 320px is the narrowest phone still in common use.
Note: options differ in kind, not coverage — no completeness score.
Header: 320px check
Options:
A) Apply: check 320 and 375 (recommended)
Loop each of the 5 routes at 320px and 375px and fail if either is wider than its screen. Adds about 12 seconds per run. Post-submit and menu states stay manual. Lands on PR #13. (human: ~20 min / CC: ~3 min)
B) Keep 375 only
The check stays as approved in D3: 375px only. (human: 0 / CC: 0)
C) Investigate first
Run the probe once at 320px by hand and see whether anything fails before changing the script. Approves no change now. (human: ~10 min / CC: ~2 min)
D) Defer this change
Leave the row unresolved; revisit with the design review. Nothing changes now.

State: approved
Actual answer: A) Apply: check 320 and 375. D6 answer "A) Apply: check 320 and 375 (recommended)".
Accepted scope: `scripts/mobile-check.mjs` runs each of the 5 routes at 320px and 375px and fails if either is wider than its screen. Routes and pass rule otherwise as X7. Lands on PR #13.
History: none

### X11: transcript highlight after the call ends
Finding: O6, INFORMATIONAL, confidence 8/10, `src/components/DemoCallCard.jsx:32` (`onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}`, no `onEnded`) and `:31` (`onError={() => setHasAudio(false)}`, `time` not reset); reviewer: outside voice, checked by the parent. After playback ends, the last line stays highlighted and the others stay greyed until the user seeks.
Plan baseline: §1 DemoCallCard audio player + transcript (v1, D5). End-of-call state: unspecified.
Runtime evidence: static read; no recording exists to play.
Comparison grid:
| Choice | Current | A | B | C | D |
|---|---|---|---|---|---|
| X11 end/error state | last line stays highlighted | `onEnded` and `onError` reset `time` to -1, so all lines return to normal | unchanged | unchanged until tested with the S3 file | unchanged |
| X8 `HAS_RECORDING` switch | approved (D4) | unchanged | unchanged | unchanged | unchanged |
Question D7:
D7 — Reset the transcript highlight when the demo call ends?
Project/branch/task: PixelTech; PR #9, DemoCallCard.jsx.
ELI10: While the recording plays, the transcript lights up the line being spoken and greys out the rest. When the call finishes, it stays stuck that way: the last line lit, everything else grey. Resetting when the call ends puts the card back to its normal, readable look.
Stakes if we pick wrong: after listening, the transcript looks half-faded and a little broken, right in the hero.
Recommendation: A because it's two event handlers and makes the end state look like the start.
Note: options differ in kind, not coverage — no completeness score.
Header: Call end
Options:
A) Apply: reset on end and error (recommended)
`onEnded` and `onError` set the time back to -1, so all transcript lines return to their normal colour. Lands on PR #9 with X8. (human: ~10 min / CC: ~2 min)
B) Keep current behavior
The last line stays highlighted after playback until the visitor seeks or replays. (human: 0 / CC: 0)
C) Investigate first
Decide after hearing the real S3 recording in the card. Approves no change now. (human: ~10 min / CC: n/a)
D) Defer this change
Leave the row unresolved; revisit when S3 lands. Nothing changes now.

State: approved
Actual answer: A) Apply: reset on end and error. D7 answer "A) Apply: reset on end and error (recommended)".
Accepted scope: in `DemoCallCard.jsx`, `onEnded` and `onError` set `time` to -1 so every transcript line returns to normal. Lands on PR #9 with X8.
History: none

Approval readiness (second pass): PASS. Checked X5 (D1 A), X6 (D2 A), X7 (D3 A), X8 (D4 A), X9 (D5 A), X10 (D6 A), X11 (D7 A); carried forward O3 (§8.13 item 8, approved), O4 (E5, Q7), O7 (crash fix of approved behavior). No pending rows.

### 10.6 Review sections (second pass)
- **Scope Challenge:** scope accepted as-is. The focus areas touch 7 existing files and add 1 script, with no new classes or services.
- **Architecture:** the component map and state diagrams are in 10.1–10.3. Leaf-owned state plus URL hand-off is right-sized; no change.
  - `[INFORMATIONAL] (confidence: 9/10) src/components/ProductCards.jsx:78`: the map named `RemindersCard`; corrected to `ReminderCard`.
- **Code quality** (dispositions below):
  - `[CRITICAL] (confidence: 10/10) src/components/HomeSections.jsx:101`: page 491px wide at 375 (X5).
  - `[INFORMATIONAL] (confidence: 8/10) src/pages/Booking.jsx:80`: scheduler 40px too wide at 320 (X9).
  - `[INFORMATIONAL] (confidence: 8/10) src/lib/roi.js:63`: guessed "Under 25" prefill (O3).
  - `[INFORMATIONAL] (confidence: 8/10) src/lib/roi.js:74`: lead records uncapped % (O4).
  - `[INFORMATIONAL] (confidence: 7/10) src/components/PricingSection.jsx:80`: noisy live region (X6).
  - `[INFORMATIONAL] (confidence: 6/10) src/components/DemoCallCard.jsx:29-30`: player may never show on iPhone (X8). Medium confidence, verify this is actually an issue.
  - `[INFORMATIONAL] (confidence: 8/10) src/components/DemoCallCard.jsx:32`: highlight stuck after the call ends (X11).
  - `[INFORMATIONAL] (confidence: 6/10) src/components/DemoCallCard.jsx:15`: `findLastIndex` on iOS < 15.4 (O7). Medium confidence, verify this is actually an issue.
- **Tests:**

```
CODE PATHS                                         USER FLOWS
[+] lib/roi.js                                     [+] Phone layout
  ├── fromRoiParams missing/invalid calls → null     ├── [★★★ check:mobile] 5 routes × 320/375 (X7, X10)
  │     [★★★ roi.test, O3]                           ├── [GAP] scheduler step at 320 (needs Calendly URL; manual)
  ├── formatRoiEstimate capped %  [★★★ O4]           └── [GAP] nav menu / cookie banner / demo dialog (manual)
  └── callsBucket ∈ CALL_VOLUMES  [★★★ X3]         [+] Demo card
[+] DemoCallCard                                     ├── [GAP] iPhone: player visible once HAS_RECORDING=true
  ├── activeLine loop (O7)      [GAP] trivial, no seam    (real device, S3 commit)
  ├── onEnded/onError reset     [GAP] manual (S3)     └── [GAP] highlight resets at end (S3, manual)
COVERAGE: 6/11 paths tested | GAPS: 5 (all manual or blocked on S3) | QUALITY: ★★★:5 ★★:1
```

  - roi.js changes are covered by 11 tests (new rows for O3 and O4).
  - Layout is now enforced by `npm run check:mobile` (PR #13). It fails without the X5 fix (491/375, exit 1) and passes with it (10/10 runs).
  - The demo card's audio states can only be tested once the S3 file exists. That's a manual check on a real iPhone in the S3 commit. A unit test for `activeLine` would need an export no production caller uses, so it fails the test value bar.
  - Test plan artifact: `~/.gstack/projects/MAMuneebGhori-pixeltech-agency/mamun-docs-eng-review-eng-review-test-plan-20261106-192900.md`.
- **Performance:** no issues found. `timeupdate` re-renders a 5-line list about 4 times a second. The calculator recomputes pure math on each keystroke. Calendly loads only after submit.

### 10.7 NOT in scope
- **Click-to-seek on transcript lines:** not in the plan; the native player has seek controls.
- **Keeping calculator inputs on Back from `/booking`:** the URL already carries them forward; going back resets to the defaults.
- **`aria-current` on the active transcript line:** the transcript is always visible and the player has native controls.
- **Sanity caps for absurd ROI inputs (1e308, 0.0001):** not realistic input.
- **Header gap at 320px on the demo card:** cosmetic.
- **Layout checks for post-submit, menu and dialog states:** these need scripted interaction. They stay manual and are listed in the Test Plan.

### 10.8 Failure modes (second pass)
| Path | Failure | Covered by | User sees |
|---|---|---|---|
| Home at 375px | Unwrappable content widens a grid track | X5 fix + `check:mobile` | Fixed; the check fails if it returns |
| Scheduler at 320px | Fixed min width | X9 | Fixed; post-submit state not in the check (manual) |
| Demo player on iPhone | No preload, so the player stays hidden | X8 build-time switch | Player shows whenever `HAS_RECORDING` is true |
| S3 commit forgets `HAS_RECORDING = true` | Recording never shown | Manual check in the S3 commit | Transcript-only card (no error) |
| ROI link with bad `calls` | Guessed bucket | O3 + test | Empty select |

Critical gaps: 0.

### 10.9 Implementation Tasks (second pass)
- [x] **T5 (P1, human: ~20 min / CC: ~3 min)**: layout. `min-w-0` on How It Works cards (X5). PR #13 `5b38f3d`. Verify: `npm run check:mobile`.
- [x] **T6 (P2, human: ~1h / CC: ~10 min)**: tooling. `npm run check:mobile` at 320 and 375 (X7, X10). PR #13 `c4caebb`, `b8a3f11`. Verify: it fails without T5 and passes with it.
- [x] **T7 (P2, human: ~15 min / CC: ~2 min)**: frontend. ROI live region narrowed (X6). PR #9 `09359c6`.
- [x] **T8 (P2, human: ~40 min / CC: ~8 min)**: frontend. `HAS_RECORDING` switch, reset on end/error, `activeLine` loop, scheduler `-mx-5 md:mx-0`, `calls` → null, capped % on the lead (X8, X9, X11, O3, O4, O7). PR #9 `70b0121`. Verify: `npm test` 11/11, lint, build.
- [ ] **T9 (P1, owner, human: ~15 min)**: S3. Commit `public/demo-call.mp3`, set `HAS_RECORDING = true`, retime `TRANSCRIPT` from the real call, and check on a real iPhone that the player shows and the highlight resets at the end.

Parallelization: sequential, no parallelization opportunity (T5–T8 are done; T9 is one owner step).

### 10.10 Completion summary (second pass)
- Step 0: Scope Challenge — scope accepted as-is
- Reality rows: 7/7 applicable rows emitted (PLAN_REALITY complete, from §9.1), 1 unverified premise (iOS preload behavior)
- Architecture Review: 1 issue found
- Code Quality Review: 8 issues found
- Test Review: diagram produced, 5 gaps identified (all manual or blocked on S3)
- Performance Review: 0 issues found
- NOT in scope: written
- What already exists: §9.7 plus `estimateLeak`/`clean`/`callsBucket` and the delegated `trackClicks`
- TODOS.md updates: 0 items proposed to user
- Failure modes: 0 critical gaps flagged
- Unresolved decisions: 0 in this review
- Outside voice: native Plan subagent completed (12 findings; 7 resolved by D4–D7 or carried-forward fixes, 2 corrections, 3 informational)
- Parallelization: 0 lanes, sequential
- Lake Score: 4/4 (D1, D2, D3 and D6 scored; all picked the 10/10 option)

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 2 | ISSUES OPEN | 8 proposals, 7 accepted, 1 deferred; build check: 2 findings, both resolved (§8.14) |
| Outside Review | native Claude subagent (codex not installed) | Independent 2nd opinion | 3 | completed (eng pass 2); unavailable (eng pass 1); completed (CEO) | eng pass 2: 12 findings, all dispositioned (§10.5); CEO: 23 findings, 23 resolved |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 2 | ISSUES OPEN | pass 2: 11 issues, 0 critical gaps, all fixed on PR #9/#13; pass 1: 9 issues + leaked secrets (T0–T4) |
| Design Review | `/plan-design-review` | UI/UX gaps | 0 | — | — |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | — | — |

- **OUTSIDE COVERAGE:** eng pass 2: a native Claude Plan subagent completed inside the five-minute limit, with 12 findings checked by the parent reviewer. Eng pass 1: unavailable (stopped at the limit). CEO: native subagent completed. No completed external (non-Claude) review.
- **CROSS-MODEL:** not applicable. Only native Claude reviewers completed, so there is no cross-model comparison.
- **VERDICT:** No review is CLEAR. Eng review passes 1 and 2 have ISSUES OPEN with every finding mapped to a task. Pass 2's code fixes are built (PR #13 ready; PR #9 still held for S3/T9). Remaining owner work: T0 (rotate keys), T9 (recording + iPhone check).

NO UNRESOLVED DECISIONS
