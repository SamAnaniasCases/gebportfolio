# Design System

<callout icon="♞">**Status:** Active · **Owner:** Gen · **Last Reviewed:** 2026-07-18</callout>

Details of the tokens, scales, layouts, and constraints.

## Tokens & Theme Variables

Our design tokens are declared in [tokens.css](../src/styles/tokens.css) and mapped to Tailwind colors inside [global.css](../src/styles/global.css).

### Color Palette Roles

- `background`: Warm off-white (`#f8f7f5`) for light mode, warm ink (`#261e1a`) for dark mode.
- `surface`: Pure white (`#ffffff`) for light mode, lifted warm charcoal (`#342d2a`) for dark mode.
- `text`: Warm dark ink (`#261e1a`) for light mode, near-white blue-tint (`#e2efff`) for dark mode.
- `primary`: Strategic blue (`#4b648a`) for light mode, light blue (`#84a1cc`) for dark mode.
- `accent`: Pale blue (`#d0dff4`) for light mode, restrained steel blue (`#404f66`) for dark mode.

### Spacing & Radius

- **Rhythm**: Base increment of 4px.
- **Border Radius**: `sm 4px` | `md 8px` | `lg 12px` | `xl 20px` | `pill 9999px`.

### Typographic Scales (Fluid)

- Display: 48px - 80px (using clamp)
- H1: 40px - 64px
- Body: 16px - 18px (Measures: ~68 characters per line)

### Motion

- Normal transitions: 200ms using easing `cubic-bezier(.2,0,0,1)`.
- Motion always respects `prefers-reduced-motion`.
