# Design: PixelTech, Booked Solid System

The locked system. Every page and every Hallmark run reads this first, and pages share it. Change it on purpose: the file is the rule, and `src/index.css` `@theme` is where it lives in code. Where the two disagree, this file wins and the code is a migration item (see the end).

## System

- **Genre:** editorial. **Register:** luxury med-spa: a treatment-room menu, not a SaaS dashboard. Quiet paper, one bronze signal, serif display, generous air.
- **Reference points:** medspai.com and joinblvd.com, for category register only (calm surfaces, product shown working, prices stated plainly). Never their palette, type, copy or layout; we borrow patterns, never identity (plan §2).
- **Posture:** Restrained. The accent stays under 5% of any viewport: the primary control, links, focus, one figure per screen.
- **Audience and use:** med-spa owners, mostly on a phone between clients. One job per page; on marketing pages it is *book a 15-minute ROI audit*.

## Banned (no waiver)

- Purple, blue, violet, cyan or neon in any gradient, glow, halo or spotlight. No gradients on surfaces or text at all; `.text-gradient` and `.bg-gradient-brand` are legacy names that render solid and get no new uses.
- Robot, android, glowing-brain, circuit-board, hologram or "AI hand" imagery; any stock photo of a headset receptionist; abstract AI glow art; generated illustrations.
- Emoji as icons; icons in coloured circles; the three-column icon + title + two-line feature grid.
- Invented metrics, testimonials, logo walls, star ratings or case-study counts. Example data is labelled as an example (plan §3 rule 5).
- Tracked small capitals or mono-caps labels and eyebrows ("HOW IT WORKS", "EXAMPLE"). Labels are the body face, a step smaller, sentence case, untracked.
- One italic or coloured word inside a roman heading. Stress comes from a line break or a second line at a second size.
- Middle-dot-joined meta strings ("Voice · SMS · DM"), arrows glued to link text, decorative status dots.
- A card inside a card, or a bordered box inside a well. Pure `#FFF` or `#000` as a surface or text.
- Glassmorphism, backdrop blur, parallax, custom cursors, bounce easing, `transition: all`.

## Tokens

OKLCH is canonical; hex is the sRGB conversion for tools that need it. Token names match the Tailwind `@theme` names already in `src/index.css`, so classes like `bg-bg2` and `text-mut` keep working.

| Token (`--color-*`) | OKLCH | Hex | Role | Contrast |
|---|---|---|---|---|
| `bg` | `oklch(97.8% 0.006 75)` | `#FAF7F3` | Page paper (alabaster) | n/a |
| `bg2` | `oklch(95.2% 0.010 75)` | `#F3EEE8` | Wells, inputs, alternate bands, footer | n/a |
| `bg3` *(new)* | `oklch(92.4% 0.014 72)` | `#ECE5DC` | Deep well: the caller's bubble, chips | n/a |
| `card` | `oklch(99.3% 0.003 80)` | `#FEFDFA` | Raised surfaces: dialogs, the clinic's bubble | n/a |
| `line` | `oklch(90.5% 0.012 76)` | `#E4DFD7` | Hairlines and the one card border | 1.24:1 (decorative) |
| `field` *(new)* | `oklch(62% 0.016 70)` | `#8D857C` | Input, select and textarea edges | 3.6 on `card`, 3.4 on `bg`, 3.2 on `bg2` (WCAG 1.4.11 needs 3:1) |
| `ink` | `oklch(19.5% 0.006 70)` | `#171412` | Body text, headings, primary fill | 17.2:1 on `bg` |
| `ink2` *(new)* | `oklch(33% 0.010 70)` | `#393530` | Secondary heads, strong captions | 10.6:1 on `bg2` |
| `mut` | `oklch(50% 0.018 70)` | `#6A6258` | Captions, helper text, placeholders | 5.6 on `bg`, 4.8 on `bg3` |
| `accent` | `oklch(48.5% 0.080 62)` | `#7F542C` | Bronze signal: links, primary hover | 6.1:1 on `bg`; `bg` on it 6.1:1 |
| `accent-ink` *(new)* | `oklch(97.8% 0.006 75)` | `#FAF7F3` | Text on an `accent` fill (the primary on hover) | 6.1:1 on `accent` |
| `gold` (`accent2`) | `oklch(74% 0.085 75)` | `#CBA36D` | Champagne. Decorative only, or text on `ink` | 2.2 on `bg` (fails), 7.9 on `ink` |
| `focus` *(new)* | `oklch(52% 0.150 60)` | `#A44D00` | Focus ring only | 5.4:1 on `bg` |
| `good` | `oklch(48.7% 0.100 150)` | `#2F6F40` | Success text | 5.7:1 on `bg` |
| `bad` | `oklch(50.1% 0.178 29)` | `#B3261D` | Errors | 6.1:1 on `bg` |

- Contrast computed with WCAG 2.x from the hex values above. Body text needs 4.5:1; every text pairing listed passes.
- Translucency is opacity on a token (`bg-ink/5`, `bg-ink/40` for a scrim), never `white/` or `black/`.
- **Shadows:** `--shadow-card: none`; surfaces separate by paper tone and hairline. `--shadow-raised: 0 1px 2px oklch(20% 0.01 70 / 0.05), 0 12px 32px oklch(20% 0.01 70 / 0.06)` is for things that float over the page (dialog, consent bar, menu) and nothing else.
- **Radii, one per nesting level:** page band 0; card `--radius-card` 20px and well `--radius-well` 20px (same size, named by role, so a fill-only bubble in a well never reads as a card in a card); bubble, input and chip group `--radius-inner` 12px; button and pill `--radius-pill` 999px. Inner radius = outer minus padding where an inner surface sits at the outer's padding.

## Typography

Three weights in total: serif 400, sans 400 and 600. Mono is one outlier role, figures only.

| Role | Token | Size (≥1440 / 375) | Face | Line-height | Tracking |
|---|---|---|---|---|---|
| Hero head (`h1`) | `--text-display` | 84 / 44px | Instrument Serif 400 | 1.02 | -0.015em |
| Long head, statement | `--text-display-s` | 60 / 36px | Instrument Serif 400 | 1.06 | -0.01em |
| Section head (`h2`) | `--text-section` | 52 / 34px | Instrument Serif 400 | 1.08 | -0.01em |
| Item title (`h3`) | `--text-title` | 25 / 22px | Instrument Serif 400 | 1.15 | 0 |
| Lead (one line under a head) | `--text-lead` | 21 / 18px | Instrument Sans 400 | 1.45 | 0 |
| Body | `--text-md` | 16 / 16px | Instrument Sans 400 | 1.6 | 0 |
| Label, caption, meta | `--text-sm` | 14 / 14px | Instrument Sans 400 or 600 | 1.4 | 0 |
| Figure (price, time, count) | n/a | inherits its role | JetBrains Mono 400, `tabular-nums` | inherits | 0 |

- **Display:** Instrument Serif, regular only, `font-synthesis: none`. One weight, one style, one colour per head; `text-wrap: balance`; measure `h1` 20ch, `h2` 30ch, `h3` 40ch.
- **Body:** Instrument Sans (the serif's own family, warmer than Inter and never the generic default), 16px minimum, 45 to 75ch, `text-wrap: pretty`. Italic is allowed inside running body copy only.
- **Mono:** JetBrains Mono for a price, a time, a duration or a count, never for a sentence or a label. "Pays for itself at **1** booking a month": the numeral is mono at display size; the words are sans.
- **Loading:** Google Fonts with `display=swap`, only the weights above, plus a size-matched local fallback per face (the existing `* Fallback` `@font-face` pattern in `src/index.css`; recompute the metrics for Instrument Sans).
- **Copy rules:** headlines seven words or fewer, section heads six or fewer, the hero sub-line one sentence of twelve words or fewer. Curly quotes, a true ellipsis, no em or en dashes in page copy.

## Spacing and layout

- **Scale (`--space-*`):** 3xs 2, 2xs 4, xs 8, sm 12, md 16, lg 24, xl 40, 2xl 64, 3xl 96, 4xl 144 (px). No raw lengths where a step exists; at most three optical nudges a page.
- **Container:** `--container` 1440px with `--gutter` `clamp(16px, 4.4vw, 64px)`: content 1312px at 1440 and held there at 1920, 343px at 375. One container width per page. Prose and forms take a narrow measure of 640px.
- **Section rhythm:** 144px between sections at desktop, 96px at 375. A head to its line 16 to 24px; the head block to its content 64px; grid rows 48 to 64px apart; a well or card pads 40px (desktop) or 24px (375).
- **Grid:** 12 columns, `--gap-columns` 32px (16px at 375). Tracks holding pictures or simulations are `minmax(0, 1fr)`; any flex or grid child that truncates takes `min-width: 0`. Asymmetric splits (5:7, 4:8) over centred stacks; never more centred heading groups than left-aligned ones.
- **Overflow:** `overflow-x: clip` on `html` and `body`, never `hidden` or `100vw`. `npm run check:mobile` (320 and 375px) must pass on every change.
- **Surface ladder:** whitespace, then a hairline, then a tinted well (`bg2`, no border), then a card (`card` fill plus a `line` border, no shadow) for content that is independently interactive. Climb one rung per seam.

## Controls

- **Primary:** `ink` fill, `bg` text, `--radius-pill`, 52px tall (48px on phones, full width under 640px), sans 600 16px. Hover: fill steps to `accent` (colour only, no lift). One filled primary per viewport; a second action on the same screen is secondary.
- **Secondary:** 1px `ink` outline, transparent fill, same radius and height. Hover: `bg2` fill.
- **Text link:** `accent`, underline offset 0.18em, 1px; visited `ink2`.
- **Inputs:** `bg2` fill, 1px `field` border at all times (`line` is too faint for a field edge, 1.3:1), `--radius-inner`, 48px tall, 16px text. The label sits above in `--text-sm` 600 sentence case; placeholders are examples, never the label.
- **Focus:** `outline: 2px solid var(--color-focus)` at a 2px offset (inset on inputs), shown instantly via `:focus-visible` on every interactive element.
- **States:** default, hover, focus-visible, active (`translateY(1px)`), disabled (`opacity: 0.55`, `cursor: not-allowed`, native attribute), loading (label plus spinner after 200ms), error (`bad` text under the field, field keeps its value), success.
- **Touch:** 44px minimum hit target on every control.

## UI simulation cards

The cards that show the product working: call transcripts, the unified inbox, reminder threads, recall sequences, the morning digest. They are the page's signature, so they get the most care.

- **One surface, never nested.** The simulation is a `<figure>` well: `bg2`, no border, `--radius-card`, padding 24px (16px at 375). The step's number, title and copy sit on the page paper beside or above it, never inside an outer card.
- **Header row:** what it is (sans 14px 600 `ink`, for example "Call with Glow Med Spa") on the left, the time in mono 13px `mut` on the right. Separate elements, never a middle-dot string; wraps to two lines below 375px.
- **Messages:** an ordered list (`<ol>`), 8px apart, no borders.
  - The clinic's side (Ava, the receptionist): `card` fill, left-aligned, `--radius-inner`, padding 12px 14px, max 85% wide.
  - The patient or caller: `bg3` fill, right-aligned, max 85%.
  - Speaker names sit in sans 13px 600 `mut` sentence case ("Ava", "Caller").
  - Message text is sans 16px `ink`. At 375 the max width rises to 92%.
- **Status chips** ("Consult booked, Thu 2 PM", "Flagged for clinician", "Replied in 0:42"): sans 13px, `bg3` fill, `--radius-pill`, padding 4px 10px, text only. Figures inside a chip are mono. Never a coloured dot.
- **Quick replies inside a sample** (Confirm, Reschedule, Cancel) are message text set in `mut`, never pill buttons. Nothing in a simulation may look tappable unless it is.
- **Timelines** (recall day 0, day 3, day 7): a real `<ol>` with a 1px `line` rail and the day in mono `mut`; one result line at the end ("7 booked from 240 contacts, example"), no stat tiles.
- **Example labelling:** one caption per section under the simulations (`figcaption`, sans 14px `mut`): "Examples use Glow Med Spa, a fictional clinic." No per-card "Example" tags.
- **Content guardrails:** a medical question always gets the scripted F-10 deflection, word for word; only Calendly, Google Calendar and Twilio appear as connected (SRD §3); sample names are first name plus initial; numbers are round and read as samples; no brand logos for SMS, Instagram or Messenger, channel names as text only.
- **Audio-synced transcript (hero demo):** the line being spoken is at full opacity; the others fade to 0.5 opacity (opacity only, 220ms, `--ease-out`). It resets when playback ends or errors, carries `aria-current="true"` on the active line, and uses native `<audio controls>`. Before the recording exists, the card shows the full transcript at full opacity with no player.

## Imagery

- **Order of preference:** the product shown working (simulations above, real screenshots); the clinic's own photographs supplied by a client, with permission; then quiet library photographs of treatment rooms, materials or hands at work, in warm natural light, desaturated about 20%, credited in the footer.
- **Never:** robots or AI imagery (see Banned), people presented as patients or customers we don't have, before-and-after photos, faces implying a testimonial.
- **Treatment:** `--radius-card`, no border, no overlay text, `object-fit: cover`, explicit `width` and `height`, `alt=""` when the subject is named beside the image.

## Motion

- **Character:** calm. One reveal per page at most (the hero simulation settling 8px up with opacity over 0.6s), visible by default without scripting.
- **Easing and duration:** `--ease-out cubic-bezier(0.22, 1, 0.36, 1)` for arrivals, `--ease-in cubic-bezier(0.55, 0, 1, 0.45)` for exits. Durations: micro 120ms (press, colour), short 220ms (hover, chips, the transcript highlight), long 420ms (dialog, accordion). Only `transform` and `opacity`.
- **Reduced motion:** under `prefers-reduced-motion: reduce` every reveal shows its end state at once; nothing loops.

## Exports

- **Code:** `src/index.css` `@theme` (Tailwind v4). Names above map one to one: `--color-bg3`, `--color-ink2`, `--color-focus`, `--font-body: "Instrument Sans", "Instrument Sans Fallback", sans-serif`, plus the `--space-*`, `--text-*`, `--radius-*`, `--shadow-*` and easing tokens.
- **Check:** `npm run check:mobile` for layout; Hallmark's `sloplint.mjs src index.html --genre editorial` for the bans above.

## Migration status (2026-11-06)

- **Before:** the sloplint static pass over `src/` and `index.html` found 51 FAIL, 11 REFLEX and 21 WARN in 23 files.
- **After** the migration (branch `design-migration`): the public site is **0 FAIL, 0 REFLEX, 0 WARN**, with one NOTE. The NOTE is gate 19: the SRD F-10 deflection line is kept word for word, stamped `copy: verbatim`.
- **Rendered tier** (puppeteer-core with the local Chrome, on `/`, `/pricing`, `/booking`, `/about`): 0 FAIL on every route. It caught and fixed: field edges under 3:1, the `/pricing` action below the 1280x800 fold, the `/pricing` head running past 1920x1080, a 22px footer control, a 5-item orphan row, and `h2`s rendering at 16px. Waivers are stamped in `src/index.css` (49b, 77, 59) with one dismissal (59, the approved section count).

Done:
1. **Labels and eyebrows:** no tracked caps or mono labels; `Section` no longer takes an eyebrow.
2. **Italic headings:** italic words removed from every heading (hero, final CTA, booking, About, revenue leak).
3. **Middle dots:** middle-dot meta strings replaced in the hero, simulations, digest and pricing.
4. **Nested cards:**
   - How It Works steps sit on the page.
   - Each simulation is one well (`--radius-well`).
   - Stats, principles and the runbook use hairlines.
   - The comparison table has no outer card.
5. **Motion:**
   - No `transition-all`.
   - The mobile menu fades in, with no height animation.
   - Unused accordion keyframes removed.
   - A reduced-motion fallback covers everything.
6. **Literal colours:**
   - OKLCH tokens throughout.
   - `bg-black/60` and blur scrims replaced with `bg-ink/40`.
   - The rgba scrollbar colours use `color-mix`.
7. **Surfaces:**
   - Tinted `card`, with no card shadows.
   - `shadow-raised` only on floating surfaces.
   - The unused `App.css` deleted.
8. **Type:** Instrument Sans body (fallback metrics recomputed), mono for figures only, and the ROI break-even numeral alone in mono.
9. **Container:** one `.container-page` (1440px, gutters 16 to 64px) for the nav, sections, hero and footer.
10. **Controls:**
    - One filled primary per screen; the pricing and nav buttons are secondary.
    - Every target is 44px or larger, focus is visible everywhere, and no button label wraps.
11. **Layout check:** `check:mobile` now catches overflow that `overflow-x: clip` hides from `scrollWidth`. It fails on any element past the screen edge, and it was verified by reintroducing the old How It Works bug.

Still open:
- **44c (Reflex) on `/pricing`, `/booking` and `/about`:** the head does not fill the first screen. This is deliberate, so the price card and the form show without scrolling. It cannot be waived, because its guard needs a Banner hero posture and the stamp's one posture is the home page's.
- **A real iPhone pass:** not run. It is the owner’s step, in the S3 commit that sets `HAS_RECORDING = true`, checking that the player shows and the transcript highlight resets. Closest proxy, run 2026-11-07: WebKit 18 (Playwright) at the iPhone 13 profile, 20/20. Five routes render with no overflow past 390px and no JS errors; the menu opens on tap; the calculator updates; inputs are 16px. This does not reproduce iOS media or autoplay policy.

Also done since the first pass:
- `Admin.jsx` migrated (0 FAIL), and `framer-motion` removed from the project.
- `/booking` tested end to end with the network mocked, 22/22 at 320, 375 and 1280px: the lead with its ROI estimate and empty honeypot, the calls/week prefill, Calendly reaching ready from its own message, `calendly_booked`, the blocked-script and 10-second fallbacks, and the API-error state. Calendly’s real service is not covered; it needs `VITE_CALENDLY_URL`.
