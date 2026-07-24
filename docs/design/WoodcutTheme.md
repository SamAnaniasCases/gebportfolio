# Woodcut & Engraving Visual Theme

<callout icon="♞">**Status:** Implemented · **Owner:** Gen · **Created:** 2026-07-21</callout>

This document defines the visual language for the site's redesign: a **black-ink woodcut / engraving** aesthetic derived directly from the brand logo (goat-head chess knight SVG). It supplements — does not replace — [DesignSystem.md](./DesignSystem.md). All token names below map to existing CSS custom properties in [`tokens.css`](../../src/styles/tokens.css) and [`global.css`](../../src/styles/global.css).

---

## 1. Visual Style Guidelines

### 1.1 Core Principles

| Principle         | Rule                                                                                                                                   |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Linework first    | Every visual element is defined by its outline; fill is secondary.                                                                     |
| High contrast     | Black on white (light mode) or white on true black (dark mode). No mid-tone washes.                                                    |
| No gradients      | Zero `linear-gradient`, `radial-gradient`, or `conic-gradient` in any CSS or SVG. Depth is conveyed exclusively through hatch density. |
| No soft shadows   | `box-shadow` with blur is banned. The only permitted shadow is a hard offset: `box-shadow: 3px 3px 0 var(--color-ink)`.                |
| Current-color art | All SVG illustrations use `stroke="currentColor"` and `fill="var(--color-surface)"` so they invert automatically between modes.        |

### 1.2 Line Weight System

Extracted from the logo SVG and standardised for all UI illustration work:

| Token / Role          | Weight     | Usage                                                                 |
| --------------------- | ---------- | --------------------------------------------------------------------- |
| `--stroke-structural` | **2.5 px** | Outer silhouettes, card frames, icon outlines, section rule lines     |
| `--stroke-detail`     | **1.5 px** | Interior detail lines, facial features, secondary contours            |
| `--stroke-hatch`      | **1.3 px** | Cross-hatch shading fills, texture regions, background patterns       |
| `--stroke-fine`       | **1.0 px** | Ultra-fine decorative marks, coordinate labels, chessboard grid lines |

> In SVG: always set `stroke-linejoin="round"` and `stroke-linecap="round"` to match the logo's engraved feel.

### 1.3 Cross-Hatching Rules

Cross-hatching replaces all gradient and opacity-based shading. Follow the three-tier density system:

```
Tier 1 – Light shade   : single parallel lines, 45°, 8 px spacing
Tier 2 – Medium shade  : two passes (45° + 135°), 6 px spacing
Tier 3 – Deep shadow   : three passes (45° + 135° + 90°), 4 px spacing
```

**Directional convention** (matches logo's head/neck hatch angles):

- Light source is always **upper-left**.
- Hatching runs **perpendicular to the surface being shaded** (contour hatching), not horizontally.
- Clip all hatch lines to the shape they shade (`clipPath` in SVG; `overflow: hidden` in CSS).
- Never let hatch lines cross a structural outline.

**Where to apply hatching in the UI:**

- Card hover state → Tier 1 hatch strip along the bottom border.
- Active/pressed buttons → Tier 2 hatch overlay on the button face.
- Decorative panels / section backgrounds → Tier 1 at very low visual weight (1.0 px, 12 px spacing).
- Hero illustration shadow zones → Tier 3.

### 1.4 Illustration Production Checklist

All new illustrations must:

1. Be hand-drawn or traced in a vector editor (Inkscape / Illustrator / Figma).
2. Export as SVG with `viewBox`, no fixed `width`/`height` attributes.
3. Use only `currentColor` for strokes and `var(--color-surface, #fff)` for fills.
4. Include `<title>` and `<desc>` elements for accessibility.
5. Contain zero `<filter>`, `<feGaussianBlur>`, `<linearGradient>`, or `<radialGradient>` elements.
6. Group hatch lines inside a `<g>` with a `clip-path` referencing the shape they shade.
7. Pass SVGOMG optimisation (no editor metadata, no unused defs).

---

## 2. Color Tokens

### 2.1 Light Mode — Current Palette (Unchanged)

> Light mode colors are **not modified** by this theme. They are listed here for reference and dark-mode derivation.

| Token                        | Hex       | Role                                           |
| ---------------------------- | --------- | ---------------------------------------------- |
| `--color-bg-raw`             | `#f8f7f5` | Page background — warm off-white paper         |
| `--color-surface-raw`        | `#ffffff` | Card / panel surface — pure white              |
| `--color-surface-subtle-raw` | `#f0f5fc` | Recessed / code-block surface — pale blue tint |
| `--color-text-raw`           | `#261e1a` | Primary text — warm dark ink                   |
| `--color-text-muted-raw`     | `#3f3939` | Secondary text — darkened warm gray            |
| `--color-primary-raw`        | `#4b648a` | Interactive / links — strategic blue           |
| `--color-primary-hover-raw`  | `#3a4e6c` | Primary hover                                  |
| `--color-primary-active-raw` | `#2b3a50` | Primary pressed                                |
| `--color-accent-raw`         | `#d0dff4` | Highlight / selection — pale blue              |
| `--color-border-raw`         | `#d2d4d9` | Borders — light steel                          |
| `--color-focus-raw`          | `#2563eb` | Focus ring                                     |

**Raw palette anchors** (unchanged):

| Swatch name    | Hex       |
| -------------- | --------- |
| Ink            | `#261e1a` |
| Strategic Blue | `#4b648a` |
| Pale Blue      | `#d0dff4` |
| Warm Slate     | `#574f50` |
| Steel          | `#9497a0` |

### 2.2 Dark Mode — New True-Black Palette

> Dark mode is rebuilt on a **true black** ground to mirror the natural inversion of ink-on-paper to white-on-black. All values below replace the current `.dark` block in `tokens.css`.

| Token                        | New Hex   | Rationale                                                                                       |
| ---------------------------- | --------- | ----------------------------------------------------------------------------------------------- |
| `--color-bg-raw`             | `#000000` | True black — the "inked plate" ground; maximum contrast with white linework                     |
| `--color-surface-raw`        | `#0d0d0f` | Near-black with the faintest blue undertone; cards lift off the background without visible gray |
| `--color-surface-subtle-raw` | `#12121a` | Recessed surfaces / code blocks; blue-black distinguishes them from flat surface                |
| `--color-text-raw`           | `#f0f4ff` | Near-white with pale-blue tint (derived from `#d0dff4`); reads as "white ink"                   |
| `--color-text-muted-raw`     | `#9aa3b8` | Cool steel; legible on black but clearly secondary                                              |
| `--color-primary-raw`        | `#8fb0dc` | Lightened strategic blue; passes WCAG AA on `#000000` (contrast ≈ 7.2:1)                        |
| `--color-primary-hover-raw`  | `#aecae8` | Lighter on hover — "lifting" toward white                                                       |
| `--color-primary-active-raw` | `#d0dff4` | Full pale-blue at press — mirrors light-mode accent                                             |
| `--color-accent-raw`         | `#1c2c44` | Very dark blue for selection / highlight backgrounds; white text on top                         |
| `--color-border-raw`         | `#2c2c36` | Visible border on black; blue-charcoal, not warm gray                                           |
| `--color-focus-raw`          | `#60a5fa` | Bright focus ring — unchanged from current dark value                                           |

**Contrast notes (WCAG 2.1 AA minimum 4.5:1 for body text):**

| Pair                            | Ratio    |
| ------------------------------- | -------- |
| `#f0f4ff` on `#000000`          | ≈ 19.6:1 |
| `#9aa3b8` on `#000000`          | ≈ 7.8:1  |
| `#8fb0dc` on `#000000`          | ≈ 7.2:1  |
| `#f0f4ff` on `#0d0d0f`          | ≈ 18.9:1 |
| `#f0f4ff` on `#1c2c44` (accent) | ≈ 12.1:1 |

### 2.3 Token CSS Snippet (drop-in replacement for `.dark` block)

```css
/* tokens.css — replace existing .dark block */
.dark {
  --color-bg-raw: #000000;
  --color-surface-raw: #0d0d0f;
  --color-surface-subtle-raw: #12121a;
  --color-text-raw: #f0f4ff;
  --color-text-muted-raw: #9aa3b8;
  --color-primary-raw: #8fb0dc;
  --color-primary-hover-raw: #aecae8;
  --color-primary-active-raw: #d0dff4;
  --color-accent-raw: #1c2c44;
  --color-border-raw: #2c2c36;
  --color-focus-raw: #60a5fa;
}
```

---

## 3. Chess Motif in the UI

The chess motif is the site's primary decorative vocabulary. It must feel **structural and engraved**, never clip-art or playful. All chess elements are monochrome line-art consistent with §1.

### 3.1 Iconography

| Context                      | Element                                                     | Notes                                                                      |
| ---------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------- |
| Section bullet / list marker | `♟` (pawn) or custom pawn SVG at 14 px                      | Replaces default `disc` bullet via `list-style: none` + `::before`         |
| Nav active indicator         | `♞` (knight) inline before label                            | Mirrors the logo; use only for active page                                 |
| External link icon           | Rook silhouette with small arrow                            | Replaces generic arrow-square                                              |
| Tag / category chips         | Small chess-piece glyph + label                             | Pawn = general, Knight = technical, Rook = infrastructure, Bishop = design |
| Empty state illustration     | Full knight engraving (logo asset) at 120 px                | Centred, `currentColor`, no fill override                                  |
| Loading / spinner            | Animated knight "trotting" in place (CSS keyframe, 2-frame) | Respects `prefers-reduced-motion`                                          |

> Use Unicode chess glyphs (`♔♕♖♗♘♙♚♛♜♝♞♟`) only at small sizes (≤ 20 px) where SVG overhead is unjustified. At all larger sizes use custom SVG pieces drawn in the same 2.5 / 1.5 / 1.3 px stroke system as the logo.

### 3.2 Borders & Card Frames

- **Standard card border**: `2.5 px solid var(--color-border-custom)` — matches structural stroke weight.
- **Card corner ornaments**: small L-shaped "chessboard coordinate" marks at each corner (like the a1/h8 corner squares on a scoresheet diagram). Implement as `::before` / `::after` pseudo-elements or inline SVG corners.
- **Featured / highlighted card**: double-rule border — outer `2.5 px` + inner `1.3 px` offset by `3 px`, evoking an engraved plate frame.
- **Hover state**: hard offset shadow `box-shadow: 3px 3px 0 var(--color-border-custom)` (no blur); card translates `-2px` on both axes to "lift off the plate".

### 3.3 Section Dividers

Replace plain `<hr>` and `border-t` dividers with one of these engraved motifs:

| Divider type              | Visual                                                                                            | Usage                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Chessboard strip**      | A single row of 8 alternating filled/empty squares (12 px each), centred, flanked by 1.3 px rules | Between major page sections                       |
| **Piece silhouette rule** | Small `♞` centred on a 1.3 px horizontal rule                                                     | Between list items in experience / research pages |
| **Double rule**           | Two parallel 1.3 px lines, 4 px apart                                                             | Footer separator, blockquote underline            |
| **Hatch fade**            | 40 px-wide Tier-1 hatch band fading outward (lines shorten, not opacity)                          | Hero → content transition                         |

Implement dividers as reusable Astro components (e.g. `DividerChessboard.astro`, `DividerKnight.astro`) so they stay consistent and are easy to swap.

### 3.4 Backgrounds & Textures

- **Page background (light)**: `#f8f7f5` unchanged. Optionally overlay a **very faint chessboard grid** (1 px lines, `#00000006`, 48 px squares) via a repeating CSS `background-image` on `body` — disabled by default, enable with a `.chess-grid` utility class.
- **Page background (dark)**: `#000000`. Same grid at `#ffffff05` — barely perceptible texture that reinforces the board metaphor.
- **Hero section**: large-scale knight engraving (logo) as a right-aligned decorative element at 15–20 % opacity using `color-mix(in srgb, currentColor 15%, transparent)`. No `opacity` on the element itself (keeps linework crisp).
- **Card media area**: if no image is provided, fill with a Tier-1 cross-hatch SVG pattern tile (16 × 16 px, `--stroke-fine`, `currentColor` at 10 % via `color-mix`).

```css
/* Example chessboard background utility */
.chess-grid {
  background-image:
    linear-gradient(
      to right,
      color-mix(in srgb, currentColor 3%, transparent) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      color-mix(in srgb, currentColor 3%, transparent) 1px,
      transparent 1px
    );
  background-size: 48px 48px;
}
```

> Note: the `linear-gradient` above is used **solely as a repeating grid-line technique**, not as a visual gradient. This is the only permitted exception to the no-gradient rule.

### 3.5 Decorative Elements

- **Pull quotes**: open with a large `♛` (queen) watermark at 48 px, `currentColor`, positioned top-left of the blockquote.
- **Footnotes / asides**: marked with `♜` (rook) instead of an asterisk.
- **Pagination**: previous/next arrows replaced with `♜` / `♖` (rooks facing outward).
- **404 page**: full knight engraving, "knocked over" (rotated 90°), with the caption _"The piece has left the board."_

---

## 4. Typography & Component Notes

## 4.1 Typography Direction

The type system has three distinct voices, each mapped to a different layer of the brand personality:

| Voice        | Font                              | Personality                                                          |
| ------------ | --------------------------------- | -------------------------------------------------------------------- |
| **Engraver** | Fraunces (WONK=1)                 | The serious craft — structured, high-contrast, hand-cut quirks       |
| **Scrawl**   | Gochi Hand                        | The personal touch — ink-pen margin note, playful and human          |
| **Reader**   | Inter Variable / Manrope Variable | The functional layer — neutral, highly legible, stays out of the way |

#### Type Role Table

| Role                       | Current                   | Recommended                        | Rationale                                                                                                                |
| -------------------------- | ------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Display / H1–H2            | Manrope Variable (sans)   | **Fraunces** variable, `WONK=1`    | Classical serif bones with wonky hand-cut terminals — mirrors the logo's "serious technique + whimsical subject" tension |
| Hero catchphrase / tagline | —                         | **Gochi Hand**                     | Hand-drawn ink scrawl; the "goat head" of the type system — unexpected, personal, brief                                  |
| H3–H4                      | Manrope Variable          | Manrope Variable _(keep)_          | Subheads stay modern to avoid over-theming                                                                               |
| Body                       | Inter Variable            | Inter Variable _(keep)_            | Unchanged; excellent screen readability                                                                                  |
| Mono / code                | JetBrains Mono            | JetBrains Mono _(keep)_            | Unchanged                                                                                                                |
| Eyebrow / labels           | Inter, uppercase, tracked | Inter, uppercase, tracked _(keep)_ | Unchanged                                                                                                                |

> **Dependency note:** Fraunces and Gochi Hand both require new packages. Do **not** install them without explicit permission (see dependency policy). When approved, add to `global.css` following the existing import pattern:
>
> ```css
> @import "@fontsource-variable/fraunces";
> @import "@fontsource/gochi-hand";
> ```

#### New font tokens (add to `tokens.css`)

```css
--font-serif-display: "Fraunces Variable", "Fraunces", Georgia, serif;
--font-hand: "Gochi Hand", cursive;
```

And map in `global.css` `@theme`:

```css
--font-display: var(--font-serif-display); /* replaces Manrope mapping */
--font-hand: var(--font-hand);
```

#### Fraunces usage rules

- Used **only** for `--font-size-display`, `--font-size-h1`, and `--font-size-h2`.
- Always set `font-variation-settings: "WONK" 1, "SOFT" 0` (or use the `font-wonk` utility if Tailwind plugin is added).
- Never use for body, captions, navigation, buttons, or form labels.
- In dark mode, `font-optical-sizing: auto` prevents hairlines from disappearing on black.

#### Gochi Hand usage rules

Gochi Hand is a **decorative accent**, not a structural typeface. Strict limits:

| ✅ Allowed                               | ❌ Forbidden                  |
| ---------------------------------------- | ----------------------------- |
| Hero catchphrase / subtitle (≤ 10 words) | Headings H1–H4                |
| Pull-quote attribution line              | Body paragraphs               |
| Empty-state message (e.g. 404 caption)   | Navigation labels             |
| Short decorative badge / sticker text    | Button labels                 |
| Handwritten-style annotation (≤ 6 words) | Form labels or inputs         |
|                                          | Any text longer than 12 words |
|                                          | Tables, metadata, timestamps  |

- Size: use `--font-size-body-large` or `--font-size-h4` — never smaller than 18 px (Gochi Hand loses legibility below that).
- Colour: always `var(--color-text-muted-raw)` or `var(--color-primary-raw)` — never pure black/white, to keep it feeling like a secondary marginal note.
- Letter-spacing: leave at default; Gochi Hand's irregular spacing is part of its charm.
- In dark mode: no special override needed; `currentColor` inheritance handles it.

### 4.2 Component Adjustments

**Buttons (`Button.astro` / `LinkButton.astro`)**

- Border: upgrade from `1 px` to `2.5 px solid currentColor` to match structural stroke.
- Hover: add `box-shadow: 2px 2px 0 currentColor` (hard offset, no blur).
- Active / pressed: `box-shadow: none; translate(2px, 2px)` — "pressed into the plate".
- Primary variant: solid fill, white text; on hover add Tier-1 hatch overlay via a pseudo-element SVG background.

**Cards (`Card.astro`)**

- Border weight: `border-2` (2 px) minimum; featured cards use the double-rule frame (§3.2).
- Remove `hover:shadow-md` (soft shadow) → replace with hard offset shadow (§3.2 hover).
- `rounded-lg` → `rounded-sm` (4 px). Engraved plates have tight corners; large radii feel soft.

**Header / Nav**

- Fully redesigned as a fixed left sidebar — see **§5 Navigation Redesign** for the complete specification.

**Footer**

- Top border: replace single rule with the **double rule** divider (§3.3).
- Add a centred `♞` above the copyright line as a colophon mark.

**Blockquotes (`.prose-custom blockquote`)**

- Left border: `4 px` → `2.5 px` structural + `1.3 px` inner rule (double-rule, rotated 90°).
- Add `♛` watermark per §3.5.

**Tables**

- Header row: `2.5 px` bottom border (structural rule).
- Body rows: `1.3 px` border (hatch weight).
- Zebra striping: replace `bg-surface-subtle` with a chessboard-alternating tint — even rows `transparent`, odd rows `color-mix(in srgb, var(--color-accent-raw) 8%, transparent)`.

### 4.3 Dark-Mode-Specific Component Notes

- All SVG illustrations automatically invert via `currentColor` — no per-component dark override needed.
- Hard offset shadows in dark mode use `var(--color-border-custom)` (`#2c2c36`) rather than pure white to avoid a harsh glow effect.
- The chessboard background grid (§3.4) switches from dark-on-light to light-on-dark automatically via `currentColor`.
- Focus ring (`#60a5fa`) is unchanged and passes AA on both `#000000` and `#0d0d0f`.

---

## 5. Navigation Redesign — Fixed Left Sidebar

> Reference: [bryllim.com](https://www.bryllim.com/) sidebar pattern, adapted to the woodcut/chess identity.

### 5.1 Layout Architecture

| Breakpoint                      | Pattern                                                        |
| ------------------------------- | -------------------------------------------------------------- |
| **Desktop (≥ 1024 px / `lg`)**  | Fixed left sidebar, full viewport height, content shifts right |
| **Mobile / Tablet (< 1024 px)** | Sticky top bar (52 px) + full-screen overlay menu              |

**Desktop sidebar structure (top → bottom):**

```
┌─────────────────────┐
│  [♞ logo] Sam A.    │  ← Brand lockup (Fixed Header, mb-6 whitespace, divider removed)
│                     │
│ ┌─────────────────┐ │
│ │  ♟ Home         │ │
│ │  ♘ Projects     │ │  ← Scrollable Primary Nav Container (Option A)
│ │  ♖ Experience   │ │     (Home → Lab / Work & Writing)
│ │  ♗ Research     │ │     overflow-y-auto, invisible scrollbar
│ │  ═══ Chessboard ══ │
│ │  ♙ Posts        │ │
│ │  ♕ Experiments  │ │
│ └─────────────────┘ │
│  ─────────────────  │
│  About              │  ← Fixed Utility Links & Footer Zone
│  Contact            │
│  Search             │
│  [♞ watermark]      │
│  ─────────────────  │
│  [☀/☾ theme toggle] │
│  © 2026 · v1.0.0    │
└─────────────────────┘
```

### 5.2 Sidebar Specifications

| Property       | Value                                     | Rationale                                                      |
| -------------- | ----------------------------------------- | -------------------------------------------------------------- |
| Width          | **224 px** (`w-56`)                       | Matches reference; narrow enough to maximise content area      |
| Position       | `fixed inset-y-0 left-0 z-50`             | Always visible; no scroll-away                                 |
| Background     | `var(--color-surface-raw)`                | White card in light mode; `#0d0d0f` near-black in dark         |
| Right border   | `2.5 px solid var(--color-border-custom)` | Structural stroke weight — the sidebar edge IS the plate frame |
| Padding        | `px-7 py-8` (28 px / 32 px)               | Generous whitespace, engraved-plate margin feel                |
| Content offset | Main content gets `lg:pl-56`              | Content area shifts right of the sidebar                       |

### 5.3 Nav Link Styling

| State       | Style                                                                                                                                                                                                                       |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Default** | `font-mono` (JetBrains Mono), 13 px, `var(--color-text-muted-raw)`, piece icon at 15 px (`stroke-width: 1.6`, `currentColor`)                                                                                               |
| **Hover**   | Colour transitions to `var(--color-text-raw)`; icon stays; `transition-colors duration-150`                                                                                                                                 |
| **Active**  | `♞` knight glyph (12 px) appears at the left edge (`absolute left-0`), text goes `var(--color-text-raw)` + `font-semibold`. No underline, no background pill — just the knight marker, like a move notation on a scoresheet |
| **Focus**   | Standard `ring-focus` 2 px outline, offset 2 px                                                                                                                                                                             |

**Chess-piece icons per section** (custom SVG, 15 px, stroke-based like the logo):

| Section         | Piece            | Symbolism                                      |
| --------------- | ---------------- | ---------------------------------------------- |
| Home            | `♔` King         | The starting square                            |
| Projects        | `♘` Knight       | Creative, non-linear moves                     |
| Experience      | `♖` Rook         | Solid structure, straight lines                |
| Research        | `♗` Bishop       | Deep diagonal thinking                         |
| Posts           | `♙` Pawn         | Steady, one step at a time                     |
| Experiments     | `♕` Queen        | Freedom to move anywhere                       |
| About / Contact | None (text only) | Meta pages stay plain — pieces are for content |

> Icons are optional per link — group dividers + monospace labels carry the design even without icons. Implement icons as a shared `ChessIcons.astro` component or inline SVG sprite.

### 5.4 Group Dividers & Section Labels

- **Group Labels**: 10px uppercase monospace labels (`WORK`, `WRITING`, `META`) positioned above each navigation group. On viewports with height ≤ 768px (`@custom-variant short`), labels hide automatically (`short:hidden`) to ensure vertical accessibility without scrolling.
- **Primary Group Divider**: Anchored with the engraved `DividerChessboard.astro` component (alternating ink-filled/outlined squares on a 1.3px hatch rule) between primary work links and writing links.
- **Secondary Group Dividers**: 1.3px horizontal rule (`--stroke-hatch` weight), `var(--color-border-custom)` for remaining groups.

### 5.5 Sidebar Footer

- **Theme toggle**: 44px (`h-11 w-11`) circular button (`1.3px` border), custom hand-drawn stroke-only Sun (`sun.svg`) and Moon (`moon.svg`) icons. Toggles `.dark` class on `<html class="dark">` and persists preference in `localStorage`.
- **Copyright line**: `text-caption`, `font-mono`, `var(--color-text-muted-raw)`.
- **Colophon mark**: Centered standing knight SVG watermark (`knight.svg`, 40px) at 20% opacity (`opacity-20 pointer-events-none select-none`) above the footer divider line.

### 5.6 Mobile Pattern (< 1024 px)

| Element           | Spec                                                                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Top bar**       | `sticky top-0 z-50`, `bg-surface`, bottom border `2.5 px` structural. Brand left (logo + name, 14 px Fraunces), hamburger right                                            |
| **Hamburger**     | 3-line SVG (20 px, `stroke-width: 1.6`, round caps, `currentColor`). 44 px min tap target                                                                                  |
| **Overlay menu**  | `fixed inset-0 z-[60]`, solid `var(--color-bg-raw)` (no backdrop-blur — violates no-soft-effects rule). Own header row: brand + `✕` close button, `1.3 px` bottom rule     |
| **Overlay links** | Same monospace style at **16 px**, chess-piece icons at 18 px (`size-[18px]`), `gap-3`. Staggered entry (`animation-delay: calc(var(--i) * 30ms)`). Full-width tap targets |
| **Animation**     | Overlay enters with `reveal` keyframe and exits with 200ms `mobile-menu-out` keyframe. Respects `prefers-reduced-motion`                                                   |
| **Scroll lock**   | `overflow: hidden` on `<body>` while overlay is open                                                                                                                       |

### 5.7 Dark-Mode Sidebar Notes

- Sidebar background becomes `#0d0d0f` (surface token) against the `#000000` page — a subtle lifted panel, like a black-on-black engraving plate.
- Tailwind CSS v4 class strategy: declared via `@variant dark (&:where(.dark, .dark *));` in `src/styles/global.css` so class toggles on `<html class="dark">` reliably apply `dark:` utility variants (such as `dark:hidden` and `dark:flex`).
- The 2.5 px right border (`#2c2c36`) reads as the plate edge catching light.
- Active `♞` marker inherits `currentColor` — no override needed.
- All piece icons auto-invert via `currentColor`.

### 5.8 Accessibility Requirements

- Sidebar is a `<nav aria-label="Main navigation">` landmark.
- Active link carries `aria-current="page"`.
- Overlay menu traps focus (Tab cycles within overlay), closes on `Escape`.
- Hamburger carries `aria-expanded` + `aria-controls`.
- Skip link targets `#main-content` (unchanged from current layout).
- All interactive targets ≥ 44 × 44 px touch area (visual size can be smaller with padding).

---

## 6. Implementation Priority

> **Exit criterion for every phase:** run the full verification suite (`format` → `lint` → `check` → `build` → `test:e2e` → `test:a11y`) and confirm green before starting the next phase.

| Phase        | Scope                                                                                                                                                       | Notes                                                                                                     |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Phase 1**  | Update `.dark` token block in `tokens.css` (drop-in snippet from §2.3)                                                                                      | ~10 min; immediately visible in dark mode; zero risk to light mode                                        |
| **Phase 2**  | Add Fraunces + Gochi Hand (after dependency approval); update `--font-display` token, add `--font-hand` token                                               | Moved early — typography affects how all subsequent component work feels; tune spacing against final type |
| **Phase 3**  | Add `--stroke-*` tokens; update `Card.astro`, `Button.astro`, `LinkButton.astro` border/shadow rules                                                        | Components now tuned against final palette + type                                                         |
| **Phase 4**  | Build divider components (`DividerChessboard.astro`, `DividerKnight.astro`); replace `<hr>` usages                                                          | Small, independent, low-risk                                                                              |
| **Phase 5a** | **Navigation redesign — sidebar shell (desktop)**: rebuild `BaseLayout.astro` header as fixed left sidebar (§5.1–5.5); build `ChessIcons.astro`             | Most visible payoff; desktop-first                                                                        |
| **Phase 5b** | **Navigation redesign — mobile overlay** (§5.6): hamburger, full-screen menu, focus trap, scroll lock, `prefers-reduced-motion`                             | Accessibility-critical; test with keyboard + screen reader                                                |
| **Phase 5c** | **Navigation redesign — E2E test updates**: align `tests/e2e/navigation.spec.ts` with new DOM structure; verify a11y suite passes against sidebar landmarks | Must land with 5a/5b before merge                                                                         |
| **Phase 6**  | Chess motif decorative layer — blockquote `♛`, pagination rooks, 404 page, Gochi Hand catchphrases                                                          | Pure decoration; no structural risk                                                                       |
| **Phase 7**  | Optional `.chess-grid` body background utility                                                                                                              | Ship only if it earns its place visually                                                                  |

**Visual QA checkpoints:** after Phase 2 and Phase 5b, take full-page screenshots in both light and dark mode (desktop + mobile) and review against §1 style rules before proceeding.

---

_This document is a design specification. All code changes must still pass the full verification suite before merging (see [AI-Guidelines.md](../engineering/AI-Guidelines.md))._
