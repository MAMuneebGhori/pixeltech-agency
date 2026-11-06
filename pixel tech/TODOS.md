# TODOs

## Risk-reversal guarantee on the pricing card (E3)
- **What:** add a measurable guarantee, e.g. "If we don't book at least N consults in your first 30 days live, your next month is free."
- **Why:** it's the strongest objection-killer for a new vendor, and SRD §6 day 7 already says "guarantee clock starts". Today the site offers no guarantee (plan §3 rule 3).
- **Pros:**
  - Lowers the risk of switching for a cautious owner.
  - Matches what the SRD intends.
  - Some competitors offer 30-day money-back terms.
- **Cons:** paying out is a real cost if N is set without data, and it's a contract term, not just copy.
- **Context:**
  - **Origin:** deferred in the CEO review (WEBSITE_REDESIGN_PLAN.md §8, decision Q5) until there's a measured baseline: the Phase 0 20-call battery plus the first clinic's first 30 days of bookings.
  - **Where to start:** pick N from that data, then add a block under the price in `src/components/PricingSection.jsx` and the same terms in the client contract.
  - **Remove after:** remove plan §3 rule 3 at the same time.
- **Effort:** human S, CC S (code); the business decision is the real work.
- **Priority:** P2
- **Depends on:** Phase 0 demo passing, and client #1 live for 30 days.

## Rate-limit the public lead endpoint
- **What:** a per-IP rate limit on `POST /api/leads` (e.g. 5 per 10 minutes), plus a hidden honeypot field on the booking form.
- **Why:** the endpoint is public with open `cors()` (`backend/server.js:16`) and no limit, so a bot can flood the lead inbox and fire hundreds of email and WhatsApp alerts.
- **Pros:**
  - Protects the alert channels the business relies on, including E4's demo-line alerts.
  - Cheap to add.
- **Cons:**
  - A shared office IP could hit the limit. Keep it generous.
  - Needs a small dependency (e.g. `express-rate-limit`) or about 20 lines of in-memory code.
- **Context:** found in the CEO review security section (§8.5 item 3, decision Q8). Task 1 of that review adds a field whitelist, which limits what spam can set but not how much arrives. Start in `backend/server.js` at the `app.post('/api/leads', ...)` route.
- **Effort:** human S, CC S
- **Priority:** P2
- **Depends on:** nothing. It can ship with task 1 or on its own.

## Decide the deposit and state it on the pricing card
- **What:** decide whether founding clinics pay a deposit (SRD §6 day 1: "Contract + deposit cleared") and, if so, show it next to the price.
- **Why:** the site says "7 days free, starting the day you go live" and never mentions a deposit, so a required deposit would surprise the clinic at contract time.
- **Pros:** honest terms up front, and fewer surprises at contract time.
- **Cons:** a visible deposit may lower form fills, while no deposit means you carry the setup cost until the trial ends.
- **Context:**
  - **Origin:** raised by the second-opinion review (plan §8.13). Deferred in Q10 together with the guarantee; revisit the trial length (7 vs 14 days) at the same time.
  - **Where to change it:** `src/components/PricingSection.jsx` price block and the client contract.
- **Effort:** human S, CC S (copy); the business decision is the real work.
- **Priority:** P2
- **Depends on:** the guarantee decision above.
