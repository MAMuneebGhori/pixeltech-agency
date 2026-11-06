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
