# SVG & Image Asset Guidelines

<callout icon="♞">**Status:** Active · **Owner:** Gen · **Last Reviewed:** 2026-07-22</callout>

Engineering and design rules for creating, cropping, binding, and generating SVG vector icons and raster image assets across the portfolio.

---

## 1. Core Principles & Aesthetic Alignment

All visual assets must conform to the **Monochrome Woodcut & Engraving Design System** ([WoodcutTheme.md](WoodcutTheme.md)):

1. **Linework First**: Elements must be defined by crisp, high-contrast outlines.
2. **Strict Stroke Hierarchy**: All SVGs use the 4 canonical engraving stroke weights:
   - `--stroke-structural` (`2.5px`): Outer silhouettes, primary piece frames, icon boundaries.
   - `--stroke-detail` (`1.5px`): Facial/body features, inner contour lines.
   - `--stroke-hatch` (`1.3px`): Parallel cross-hatch shading & texture lines.
   - `--stroke-fine` (`1px`): Decorative accents & fine grid lines.
3. **No Hardcoded Hex Colors**: SVG elements must bind to semantic theme CSS tokens (`currentColor`, `var(--color-surface)`, `var(--color-text-raw)`).

---

## 2. SVG ViewBox & Cropping Standards

### Icon & Logo Bounding Box (Tight Framing Rule)

- **Problem**: Full-body illustrations (e.g. standing chess knight with base) have tall aspect ratios (`830px` height). Scaling them into `16px`–`32px` containers (favicons, navigation headers) shrinks the head into an unreadable speck.
- **Rule**: Small icon assets (Logos, Favicons, Header Badges) MUST crop the `viewBox` tightly around the subject's primary focal feature (e.g., goat knight head and horns):
  ```xml
  <!-- BAD: Full 680x830 tall piece scaled down into a 24px header box -->
  <svg viewBox="0 0 680 830"> ... </svg>

  <!-- GOOD: Tight 400x360 crop centered on the head & horns -->
  <svg viewBox="120 40 400 360"> ... </svg>
  ```
- **Aspect Ratio**: Icon `viewBox` dimensions should approach a 1:1 square or 4:3 aspect ratio.

---

## 3. Dark Mode Color Binding Rules

SVGs must remain crisp and readable across both Light Mode and Dark Mode without low-contrast blending.

### Theme-Aware SVG CSS Binding Pattern

```astro
<svg class={className} viewBox="120 40 400 360" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g class="logo-head" stroke-width="2.5" stroke-linejoin="round">
    <!-- Outer silhouette path -->
  </g>
  <g class="logo-details" stroke-width="1.3" clip-path="url(#clipHead)">
    <!-- Cross-hatch shading lines -->
  </g>
</svg>

<style>
  /* Light Mode Defaults */
  .logo-head {
    fill: #ffffff;
    stroke: currentColor;
  }
  .logo-details {
    stroke: currentColor;
  }

  /* Dark Mode High-Contrast Override */
  :global(.dark) .logo-head {
    fill: #ffffff; /* Bright white silhouette fill */
    stroke: var(--color-surface-raw, #0d0d0f); /* Dark woodcut engraving linework token */
  }
  :global(.dark) .logo-details {
    stroke: var(--color-surface-raw, #0d0d0f);
  }
</style>
```

### Favicon Dark Mode Media Query (`public/favicon.svg`)

Favicon SVGs must include embedded `@media (prefers-color-scheme: dark)` styling:

```xml
<style>
  .bg-shape { fill: #ffffff; stroke: #000000; }
  .stroke-shape { stroke: #000000; }
  @media (prefers-color-scheme: dark) {
    .bg-shape { fill: #ffffff; stroke: #ffffff; }
    .stroke-shape { stroke: #000000; }
  }
</style>
```

---

## 4. Generated Image Guidelines (`generate_image`)

When generating project covers, social OpenGraph cards, or hero illustrations:

1. **Aspect Ratios**:
   - OpenGraph Social Cards: `1200×630` (PNG/WebP).
   - Project Case Studies: `16:9` ratio (e.g., `1280×720`).
2. **Prompt Style Key**:
   - _"High-contrast woodcut engraving illustration, dark mode aesthetic, strategic blue accents (#4b648a / #8fb0dc), clean linework, no blur, technical systems diagram style."_
3. **Storage Locations**:
   - Social cards: `public/og-default.png`
   - Case study images: `public/images/projects/[slug].jpg`

---

## 6. Chess Icon Library & Evaluation Badges

See [ChessIconSystem.md](ChessIconSystem.md) for full system specifications.

1. **Navigation Piece SVGs (`src/assets/chess-nav/`)**:
   - `24×24` viewBox, `2.5px` stroke weight, `currentColor` auto-inverting stroke, `fill="none"`.
2. **Move Evaluation Badges (`src/assets/chess-icons/`)**:
   - `24×24` viewBox, `r="11"` circular fill background with explicit move evaluation hex colors (`brilliant`, `great`, `best`, `good`, `correct`, `book`, `inaccuracy`, `mistake`, `blunder`, `miss`).
   - White foreground glyphs (`fill="white"` / `stroke="white"`).
   - Used for status indicators, active nav markers (`correct.svg`), and move evaluation callouts.

---

## 7. Accessibility & Performance Checklist

- [ ] Every SVG asset includes `<title>` and `<desc>` child elements where applicable.
- [ ] Decorative SVGs set `aria-hidden="true"`.
- [ ] Interactive or standalone image SVGs set `role="img"` and `aria-label`.
- [ ] Zero unminified inline base64 strings in SVG files.
- [ ] All relative links inside documentation point to local files using relative paths.

