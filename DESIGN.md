---
name: Sam Ananias Cases — Portfolio
description: A hand-pressed woodcut manuscript where monastic craft discipline meets analytical structure.
colors:
  ink: "#261e1a"
  strategic-blue: "#4b648a"
  strategic-blue-hover: "#3a4e6c"
  strategic-blue-active: "#2b3a50"
  pale-blue: "#d0dff4"
  slate-warm: "#574f50"
  steel: "#9497a0"
  bg-paper: "#f8f7f5"
  surface-white: "#ffffff"
  surface-subtle: "#f0f5fc"
  text-ink: "#261e1a"
  text-muted: "#3f3939"
  border-light: "#d2d4d9"
  focus-blue: "#2563eb"
  bg-paper-dark: "#000000"
  surface-dark: "#0d0d0f"
  surface-subtle-dark: "#12121a"
  text-white-ink: "#f0f4ff"
  text-muted-dark: "#9aa3b8"
  primary-dark: "#8fb0dc"
  primary-hover-dark: "#aecae8"
  accent-dark: "#1c2c44"
  border-dark: "#2c2c36"
  focus-blue-dark: "#60a5fa"
typography:
  display:
    fontFamily: '"Fraunces Variable", "Fraunces", Georgia, serif'
    fontSize: "clamp(3rem, 2.08rem + 4.07vw, 5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontVariation: '"WONK" 1, "SOFT" 0'
  headline:
    fontFamily: '"Fraunces Variable", "Fraunces", Georgia, serif'
    fontSize: "clamp(2.5rem, 1.77rem + 3.26vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontVariation: '"WONK" 1, "SOFT" 0'
  title:
    fontFamily: '"Manrope Variable", "Manrope", Inter, ui-sans-serif, sans-serif'
    fontSize: "clamp(1.5rem, 1.27rem + 1.02vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: '"Inter Variable", "Inter", ui-sans-serif, system-ui, sans-serif'
    fontSize: "clamp(1rem, 0.95rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.08em"
  micro:
    fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    fontSize: "0.625rem"
    fontWeight: 700
    letterSpacing: "0.08em"
    usage: "Badge and chip labels only (status pills, category tags, section number pills). Never use below 10px."
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "20px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.strategic-blue}"
    textColor: "{colors.bg-paper}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.strategic-blue-hover}"
  button-primary-active:
    backgroundColor: "{colors.strategic-blue-active}"
  button-secondary:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.text-ink}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "44px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-ink}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "44px"
  card:
    backgroundColor: "{colors.surface-white}"
    rounded: "{rounded.sm}"
    padding: "24px"
---

# Design System: Sam Ananias Cases — Portfolio

## Overview

**Creative North Star: "The Woodcut Manuscript"**

This portfolio's visual language is drawn from the tradition of hand-pressed woodcut printing — where an artisan carves every line into a block, inks it, and presses it onto paper. Nothing in a woodcut is decorative by accident. Every mark costs effort, so only the marks that matter survive. The same logic governs this design system: each element earns its place through function, and the absence of ornament is itself the aesthetic statement.

The palette is ink on paper — warm off-white ground in light mode, true black in dark mode. Strokes are the primary design element, not fills. Typography alternates between the cut-letter authority of Fraunces (the Engraver voice, used for display and major headings) and the readable precision of Inter (the Reader voice, used for body copy). Layouts are structured, margins are generous, and density is intentional rather than compressed.

The chess motif is integrated as a primary decorative vocabulary — pieces, board coordinates, and hatched squares appear as dividers, ornaments, and interactive features. This is not decoration; it reflects Sam's actual relationship to chess as a thinking tool and metaphor for deliberate strategy.

**Key Characteristics:**

- Linework-first: borders and stroke weights define every element before fills do
- Two modes, one identity: warm paper (light) and inked plate (dark) are the same system expressed in opposite grounds
- High contrast at all times: no mid-tone washes, no soft gradients except the one permitted chess-grid texture exception
- Hard-offset interaction: interactive elements gain a 2–3px hard shadow on hover, simulating physical press
- Chess as ornament: board patterns, pieces, and coordinates are the primary non-typographic decorative vocabulary

## Colors

The palette is built from a single raw ink color (`#261e1a`) and one strategic blue (`#4b648a`), diluted or shifted to cover all semantic roles. Both modes share the same hue family; only the ground flips between warm paper and true black.

### Primary

- **Strategic Blue** (`#4b648a` / dark: `#8fb0dc`): The sole accent. Used for links, active navigation states, CTA buttons, primary badges, and interactive hover color shifts. Rarity is intentional — its appearance signals something is actionable or selected.
- **Strategic Blue Hover** (`#3a4e6c` / dark: `#aecae8`): Darker shift on hover, lighter in dark mode. Reinforces physical depth without abandoning the hue.
- **Strategic Blue Active** (`#2b3a50` / dark: `#d0dff4`): Full press state — darkest in light, fully pale in dark. Completes the physical press metaphor.

### Tertiary

- **Pale Blue** (`#d0dff4` / dark: `#1c2c44`): Used as accent-background for selection states, hover overlays on ghost elements, and badge fills. In dark mode, becomes a deep navy pool for the same role.

### Neutral

- **Warm Paper** (`#f8f7f5`): Page background in light mode. The "unprinted paper" ground.
- **Pure White** (`#ffffff`): Card and surface background in light mode. One step above the paper ground.
- **Surface Subtle** (`#f0f5fc`): Recessed surfaces, tag backgrounds, sidebar panels. A pale blue-white tint.
- **Warm Dark Ink** (`#261e1a`): Primary text in light mode. The ink color.
- **Muted Text** (`#3f3939` / dark: `#9aa3b8`): Secondary text, captions, card descriptions.
- **Border Light** (`#d2d4d9` / dark: `#2c2c36`): Structural borders, card frames, dividers.
- **True Black** (`#000000`): Page background in dark mode — the "inked plate" ground. No dilution.
- **Near Black** (`#0d0d0f`): Card surface in dark mode. A faint blue-black undertone.
- **White Ink** (`#f0f4ff`): Primary text in dark mode. Near-white with a pale-blue tint, simulating white ink on a black plate.
- **Focus Blue** (`#2563eb` / dark: `#60a5fa`): Keyboard focus rings only. Never used decoratively.

### Named Rules

**The One Accent Rule.** Strategic Blue is the only accent color. It appears on ≤15% of any given screen surface. A page full of primary-colored elements is a page that forgot the point of a primary color.

**The No-Gradient Rule.** `linear-gradient`, `radial-gradient`, and `conic-gradient` are prohibited everywhere except the `.chess-grid` background texture, which uses 1px rule-lines to render a coordinate grid — not a visual gradient. This exception is documented in `global.css` and must not be extended.

## Typography

**Display / H1 / H2 Font:** Fraunces Variable (Georgia, serif — "Engraver" voice)
**H3 / H4 Subhead Font:** Manrope Variable (Inter, ui-sans-serif — "Heading" voice)
**Body Font:** Inter Variable (ui-sans-serif, system-ui — "Reader" voice)
**Code / Label Font:** JetBrains Mono (ui-monospace — "Code" voice)
**Decorative / Scrawl Font:** Gochi Hand (cursive — restricted to catchphrases and empty states only, ≤10 words, ≥18px)

**Character:** Fraunces's woodcut terminals and ink-trap letterforms (activated via `font-variation-settings: "WONK" 1`) give headers the physical weight of carved type. Inter's extreme legibility at small sizes makes body copy scan cleanly on both bright paper and true black.

### Hierarchy

- **Display** (bold, 48–80px clamp, lh 1.1, tracking -0.02em, WONK=1): Hero section titles only. The largest textural element on any page; used once per major surface.
- **Headline / H1** (bold, 40–64px clamp, lh 1.15, tracking -0.01em, WONK=1): Page-level headings and section heroes. One per page.
- **H2** (bold, 32–48px clamp, Fraunces, WONK=1): Section headings within a page. Often appears with a border-bottom rule underline.
- **Title / H3** (bold, 24–32px clamp, Manrope): Card headings, subsection titles. Uses Manrope (not Fraunces) to reserve the serif weight for top-level hierarchy.
- **H4** (bold, 20–24px clamp, Manrope): Component-level titles, sidebar groups, accordion headers.
- **Body Large** (regular, 18–20px clamp, Inter, lh 1.65): Lead paragraphs, hero subheadlines.
- **Body** (regular, 16–18px clamp, Inter, lh 1.65, ~68ch max-width): Standard prose. Measure held to ~68ch per line for readable typography.
- **Small** (regular, 14px, Inter): Secondary descriptions, card body text, tag labels in context.
- **Caption / Label** (semibold, 12px, JetBrains Mono, tracking 0.08em, uppercase): Eyebrow labels, section numbering, technical metadata, badge text.

### Named Rules

**The Engraver Reserve Rule.** Fraunces (the Engraver voice) is used only for Display, H1, and H2. H3 and below use Manrope. Applying Fraunces to body copy or subheads dissolves the contrast that makes the display weight land.

**The Scrawl Ceiling Rule.** Gochi Hand appears only in empty-state captions or decorative catchphrases, at ≤10 words, ≥18px, and in `text-muted` or `text-primary` color. It must never appear in functional UI labels, navigation, or content headings.

## Layout

The layout uses a centered, max-width content model. The primary content container caps at **1200px** (`Container width="default"`), with a wide variant at **1440px** for full-bleed editorial sections. Prose containers cap at **68ch** to enforce reading measure.

Horizontal padding scales responsively: `16px` on mobile, `24px` at `sm`, `32px` at `md` and above.

Sections are separated by generous vertical rhythm: `40px` on mobile, `56px` at `md`, `64px` at `lg` and above. Within sections, internal component spacing follows an 8px base grid (4px fine, 8px small, 16px standard, 24px large, 32px xl, 48px 2xl).

The grid system uses CSS Grid with explicit column counts per breakpoint (`cols="1 md:2 lg:3"` etc.), with `gap-6` (24px) as the default component gap. Cards are never given fixed heights; they expand to content.

Section numbering appears as a monospace eyebrow label before each section heading (`01 · Hero`, `02 · Opening Principles`, etc.), establishing a document-like sequential structure that reinforces the manuscript metaphor.

## Elevation & Depth

This system uses a **hybrid depth model**: surfaces are completely flat at rest; interactive elements gain a **hard-offset shadow on hover** (simulating a physical press or lift from the plate); and dark-mode foreground cards receive a single **deep ambient shadow** to separate them from the true-black background.

### Shadow Vocabulary

- **Hard hover offset** (`box-shadow: 3px 3px 0 var(--color-ink)`): Applied to cards and articles on hover. Simulates a woodblock lifted from the press — no blur, pure geometry.
- **Button woodcut shadow** (`box-shadow: 2px 2px 0 var(--color-text)`): Applied to Button and LinkButton on hover. Slightly tighter than card offset, matching the smaller element scale.
- **Active press cancel** (`box-shadow: none; transform: translate(2px, 2px)`): The active/pressed state cancels the offset and shifts the element into the shadow's position — the "press" metaphor completing its motion.
- **Dark-mode card lift** (`box-shadow: 0 20px 48px -16px rgba(0,0,0,0.85)`): Deep ambient shadow applied only to `bg-surface` elements in dark mode. Provides the only soft blur in the entire system — justified because it is invisible against the true-black background until a surface floats over it.
- **Chess board slab** (`board-3d-slab`): 14-layer hard-stacked shadow on the chess board widget, producing a carved wooden block extrusion. Decorative-only; not a pattern for general components.

### Named Rules

**The Hard Offset Rule.** All interactive surface shadows are zero-blur, hard geometric offsets. Blurred `box-shadow` values are banned on interactive elements. The only permitted soft blur is the dark-mode foreground card ambient shadow, which is invisible until a card surfaces over the true-black ground.

**The Press Metaphor Rule.** Hover = lift (shadow appears). Active = press (shadow cancels, element translates into the vacated space by `2–3px`). This motion must be consistent across all button and card variants.

## Shapes

The form language is **gently angular with functional rounding**. Corners are always small (4–8px), never rounded enough to feel "bubbly" or "app-like." The dominant silhouette is rectangular, interrupted only at the corner radius level.

- **Card corners**: `rounded-sm` (4px) — nearly square; structural.
- **Button corners**: `rounded-md` (8px) — enough softness to be clearly a button, not enough to feel rounded-pill.
- **Badge / chip corners**: `rounded` (8px) or `rounded-full` (pill) for tag labels.
- **Image / media corners**: `rounded-xl` (20px) for hero images and project screenshots — the largest radius in the system, reserved for image containers only.
- **Border weight**: Structural borders use `--stroke-structural: 2.5px`. Interior details use `--stroke-detail: 1.5px`. Hatch dividers use `--stroke-hatch: 1.3px`. Fine ornament lines use `--stroke-fine: 1px`.

**The Structural Border Rule.** All card frames, button outlines, and section rules use `--stroke-structural` (2.5px). Using a 1px or thin border on a card or button makes it disappear against the background — the engraving aesthetic requires its linework to be visible.

## Components

### Buttons

Tactile and deliberate — every button is a physical commitment. The woodcut press metaphor is built into the interaction model.

- **Shape:** Rounded corners (8px / `rounded-md`), height 44px (md) / 36px (sm) / 48px (lg).
- **Primary:** Strategic Blue background (`#4b648a`) · Paper-white text · 2.5px `border-text` border · Hover: darker blue + 2px hard offset shadow · Active: darkest blue + translate into shadow.
- **Secondary:** White surface background · Ink text · 2.5px border-custom border · Hover: subtle surface tint + hard offset shadow.
- **Ghost:** Transparent background · Ink text · 2.5px transparent border (becomes visible on hover) · Hover: surface-subtle fill + border becomes current color.
- **Text/Link variant:** No background, no border, no height constraint · Primary-colored text · Hover: underline only.
- **Focus:** 2px `ring-focus` focus ring (`#2563eb`) with 2px offset on `bg-bg` background.
- **Disabled:** 50% opacity, pointer-events none — no variant-specific disabled treatment.
- **Loading:** Spinner overlay · Label remains at full width (opacity 0) to prevent layout shift.

### Cards / Containers

The workhorse layout element. Cards are flat plates that lift off the surface on hover.

- **Corner style:** `rounded-sm` (4px) — nearly square.
- **Background:** `bg-surface` (white / near-black).
- **Border:** 2.5px structural (`border-structural`) in `border-border-custom`.
- **Shadow at rest:** None (flat).
- **Shadow on hover (interactive cards):** `3px 3px 0 var(--color-ink)` hard offset + `-1px -1px translate` — the lift-off.
- **Shadow in dark mode:** Ambient `0 20px 48px -16px rgba(0,0,0,0.85)` always present on `.bg-surface` elements.
- **Internal padding:** `24px` (`p-6`).
- **Slot structure:** `eyebrow`, `media`, `title`, `summary`, `metadata`, `actions` — strict ordering, mt-auto pushes actions to card bottom.

### Chips / Tags / Badges

Small mono-text labels that categorize or number.

- **Style:** `bg-surface-subtle` or `bg-primary/10` · `border-border-custom` or `border-primary/20` · `rounded` (8px) · mono font (`JetBrains Mono`) · 12px · tracking wider · uppercase.
- **Primary number badge:** Primary-colored text on primary-tint background — section indices and card numbers.
- **Neutral tag:** Muted text on subtle surface — technology tags, role labels.

### Navigation

- **Sidebar style:** Vertical navigation with chess-piece icons alongside text labels. Active state: primary-colored text + left border indicator. Hover: primary color text transition.
- **Mobile nav:** Full-screen overlay with staggered animation (200ms reveal) and explicit close affordance. Exits with `mobile-menu-out` keyframe (fade + 4px translate down, 200ms).
- **TOC:** Monospace caption text, `toc-link` class for default state, `toc-link-active` for the active section (primary color + 2px left border + left padding).

### DividerChessboard (Signature Component)

A section boundary ornament using a miniature chessboard grid with a chess-piece SVG centered on a column. Used between sections to reinforce the chess motif and provide visual breathing room without a plain horizontal rule.

### Prose (Signature Component)

Markdown content rendered through `.prose-custom`. Notable treatments:

- **Blockquote:** Double-rule left border (2.5px structural + 1.3px inner hatch, offset 4px apart) in primary blue, with a `♛` queen watermark rendered behind the opening line in 18% primary opacity.
- **Code inline:** `bg-surface-subtle` + `border-border-custom` pill, mono font, small text.
- **Code block:** `bg-surface-subtle` rounded-xl container, no highlighted border, scrollable overflow.

## Do's and Don'ts

### Do:

- **Do** use `--stroke-structural` (2.5px) for all card frames, button borders, and section rules. The linework must be visible.
- **Do** use hard-offset shadows (`3px 3px 0 var(--color-ink)`) on interactive cards and `2px 2px 0 var(--color-text)` on buttons at hover, then cancel and translate on active.
- **Do** use Fraunces (font-display, WONK=1) for Display, H1, and H2 headings only. Switch to Manrope for H3–H4.
- **Do** use JetBrains Mono for all eyebrow labels, section numbers, badge text, and technical metadata — always uppercase, always tracked wide.
- **Do** use CSS variable tokens (`var(--color-primary-raw)`, `var(--color-ink)`) in inline styles and component variants. Never hardcode hex values in markup.
- **Do** use `currentColor` for all DoodleIcon and chess SVG strokes so they auto-invert between light and dark modes.
- **Do** prefix section eyebrows with their ordinal number (`01 ·`, `02 ·`) to maintain the manuscript-index structure.
- **Do** keep Strategic Blue scarce — it should feel like an accent, not a theme color carpeting the page.

### Don't:

- **Don't** use `linear-gradient`, `radial-gradient`, or `conic-gradient` except in `.chess-grid::before` (the documented 1px rule-line exception).
- **Don't** use blurred `box-shadow` on interactive elements (buttons, cards). The only permitted blur is the dark-mode ambient card lift, which is invisible against the true-black ground.
- **Don't** use Fraunces below H2 level. Applying the engraver serif to subheads, body, or labels erodes the display weight contrast.
- **Don't** use Gochi Hand (Scrawl voice) in functional UI — navigation, buttons, form labels, or any string over 10 words.
- **Don't** use system text emojis (`✉`, `📷`, `✕`, `🚀`, etc.) in any UI component. Use `<DoodleIcon>` vector SVGs or chess-piece SVGs instead.
- **Don't** use mid-tone fills or semi-transparent color washes as decorative backgrounds. The palette is ink-on-paper; wash it out and the woodcut aesthetic collapses.
- **Don't** use `rounded-full` (pill) on cards or buttons. Pill radius belongs on chips, tags, and scrollbar thumbs only.
- **Don't** render a soft drop shadow on any interactive element at rest. Flat at rest is the contract; shadow appears only in response to hover or dark-mode ambient lift.
