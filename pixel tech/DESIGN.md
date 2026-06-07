# PixelTech Agency Design System

## Colors (The "Deep Void" Palette)
- **Background (`--color-bg`)**: `#0a0a0f` (Deepest layer, void base)
- **Background Secondary (`--color-bg2`)**: `#11111a` (Slightly elevated background)
- **Card Surface (`--color-card`)**: `#15151f` (Primary container background)
- **Lines / Borders (`--color-line`)**: `#262633` (Subtle element separation)
- **Primary Text (`--color-ink`)**: `#f4f4f8` (High contrast, near-white)
- **Muted Text (`--color-mut`)**: `#a3a3b2` (Secondary text, descriptions)
- **Accent Pink (`--color-accent`)**: `#e0a3c0` (Brand pink start)
- **Accent Purple (`--color-accent2`)**: `#c77fa6` (Brand pink end)
- **Success (`--color-good`)**: `#5ec98a`
- **Error (`--color-bad`)**: `#e06a6a`
- **Warning/Gold (`--color-gold`)**: `#e8c46b`

## Gradients
- **Brand Primary Gradient (`--color-grad`)**: `linear-gradient(135deg, #e0a3c0, #c77fa6)`

## Typography
- **Headings (Display, H1-H3)**: `Geist`
- **Body & Labels**: `Inter`

## Layout & Container
- **Container Max-Width**: `1080px`
- **Narrow Max-Width**: `780px`
- **Gutter Padding**: `22px`
- **Section Padding**: `86px 0`

## Components Styles

### Glass Panels
- **Background**: `rgba(31, 31, 41, 0.7)` (Equivalent to `#1f1f29` with opacity)
- **Backdrop Blur**: `12px`
- **Top Border**: `1px solid rgba(255,255,255,0.1)`

### Interactive Cards
- **Border Radius**: `16px` to `18px`
- **Hover State**: Subtle Y-axis translation, outer glow with low opacity primary color.

### Buttons
- **Primary Buttons**: Gradient background, dark text (`#1a0d14`), heavy font weight (800).
- **Border Radius**: `12px`
- **Hover State**: `transform: translateY(-2px)` and glowing box-shadow `0 10px 34px rgba(199,127,166,0.35)`

### Icons & Pills
- **Pills**: `9999px` border-radius, border `1px solid var(--color-line)`, background `var(--color-bg2)`.
- **Icon Boxes (`ic`)**: `46px` by `46px`, `11px` border-radius, background `rgba(199,127,166,0.13)`.
