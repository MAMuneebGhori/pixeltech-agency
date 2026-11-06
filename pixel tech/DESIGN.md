# PixelTech Design System

Source of truth: the `@theme` block in `src/index.css`. This file explains it. Direction comes from `Booked Solid System — Website Redesign.md`: warm, editorial, calm. No neon, no gradients, no abstract AI glow art.

## Colors

| Token | Value | Use |
|---|---|---|
| `bg` | `#FAF8F5` | Page background (alabaster) |
| `bg2` | `#F3EFE9` | Alternate sections, inputs, footer |
| `card` | `#FFFFFF` | Cards, menus, modals |
| `line` | `#EAE6DF` | Borders and dividers |
| `ink` | `#141413` | Body text, primary buttons |
| `mut` | `#6B655C` | Secondary text, placeholders (5.0:1 or better on every surface) |
| `accent` | `#7D5E3A` | Links, eyebrows, icons, italic emphasis (5.2:1 or better on every surface) |
| `accent2` / `gold` | `#C59B6D` | The spec's champagne gold. **Decorative or large text only**: 2.4:1 on `bg`, so it fails WCAG AA for body text |
| `good` | `#2E6F40` | Success |
| `bad` | `#B3261E` | Errors |

Rules:
- Use tokens (`bg-card`, `text-mut`, `border-line`), never hex values in JSX. For translucency, use opacity on a token (`bg-ink/5`), not `white/` or `black/`.
- Shadows are soft and warm: `rgba(20,20,19,0.06–0.08)`.
- `.text-gradient` and `.bg-gradient-brand` are legacy class names. They now render as solid italic `accent` text and a solid `ink` fill. Don't add new uses.

## Typography

- **Display (h1–h6):** Instrument Serif, weight 400 only. `font-synthesis: none` stops the `font-bold` classes from faking a bold.
- **Body:** Inter 400–700.
- **Mono (`font-mono`):** JetBrains Mono, for metrics, timestamps and prices in simulations.

## Layout

- Container max-width `1080px` (narrow: `780px`), gutter `22px`, section padding `86px 0`.
- Mobile check at 375 px: no horizontal scroll.

## Components

- **Primary button (`.btn-primary`):** `ink` fill, `bg` text, pill radius. Hover swaps to `accent` and lifts 1px. Visible focus ring in `accent`.
- **Cards:** `card` background, `line` border, radius `16–24px`, soft warm shadow. No glow on hover.
- **Pills:** pill radius, `line` border, `bg2` or `card` fill.
- **Icon boxes:** `bg-accent/10` with an `accent` icon.
