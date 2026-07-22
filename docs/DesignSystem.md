# Design System

<callout icon="♞">**Status:** Active · **Owner:** Gen · **Last Reviewed:** 2026-07-21</callout>

Details of the tokens, scales, layouts, and constraints.

## Tokens & Theme Variables

Our design tokens are declared in [tokens.css](../src/styles/tokens.css) and mapped to Tailwind colors inside [global.css](../src/styles/global.css).

### Color Palette Roles

Light mode is unchanged (warm paper). Dark mode uses the true-black woodcut palette (WoodcutTheme.md §2.2).

- `background`: Warm off-white (`#f8f7f5`) for light mode, true black (`#000000`) for dark mode.
- `surface`: Pure white (`#ffffff`) for light mode, near-black (`#0d0d0f`) for dark mode.
- `text`: Warm dark ink (`#261e1a`) for light mode, near-white blue-tint (`#f0f4ff`) for dark mode.
- `primary`: Strategic blue (`#4b648a`) for light mode, lightened strategic blue (`#8fb0dc`) for dark mode.
- `accent`: Pale blue (`#d0dff4`) for light mode, very dark blue (`#1c2c44`) for dark mode.

### Stroke Weights (Engraving System)

Linework defines every element. Four structural stroke tokens drive borders, icons, dividers, and hatching (WoodcutTheme.md §1.2):

- `--stroke-structural`: 2.5px — outer silhouettes, card frames, section rules.
- `--stroke-detail`: 1.5px — interior detail lines, secondary contours.
- `--stroke-hatch`: 1.3px — cross-hatch shading, group dividers, textures.
- `--stroke-fine`: 1px — ultra-fine decorative marks, chessboard grid lines.

### Spacing & Radius

- **Rhythm**: Base increment of 4px.
- **Border Radius**: `sm 4px` | `md 8px` | `lg 12px` | `xl 20px` | `pill 9999px`.

### Typographic Scales (Fluid)

- Display: 48px - 80px (using clamp)
- H1: 40px - 64px
- Body: 16px - 18px (Measures: ~68 characters per line)

### Type Voices (WoodcutTheme.md §4.1)

- **Engraver** — Fraunces Variable (WONK=1): Display, H1, H2 only.
- **Scrawl** — Gochi Hand: decorative catchphrases and empty-state captions only (≤10 words, ≥18px, muted or primary color).
- **Reader** — Inter Variable: body text.
- Manrope Variable: H3–H4 subheads. JetBrains Mono: code and labels.

### Motion

- Normal transitions: 200ms using easing `cubic-bezier(.2,0,0,1)`.
- Motion always respects `prefers-reduced-motion`.

## Woodcut Theme Constraints

The visual language is a black-ink woodcut / engraving aesthetic derived from the brand logo. Core rules:

- **Linework first**: every element is defined by its outline; fill is secondary.
- **High contrast**: black on white (light) / white on true black (dark); no mid-tone washes.
- **No gradients**: zero `linear-gradient`/`radial-gradient`/`conic-gradient` (the `.chess-grid` repeating grid lines are the sole documented exception).
- **No soft shadows**: blurred `box-shadow` is banned; only hard offsets (e.g. `3px 3px 0 var(--color-border-custom)`).
- **Current-color art**: SVG illustrations use `currentColor` strokes so they invert automatically between modes.
- **Chess motif**: pieces, board patterns, and coordinates are the primary decorative vocabulary (icons, dividers, borders). See [WoodcutTheme.md](WoodcutTheme.md) for the full specification.
