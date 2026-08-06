---
name: sketched-thumbnail-generator
description: Generate hand-drawn, woodcut crayon SVG thumbnails and project card artwork for the Work page following the hand-wobble displacement filter, crayon texturing, double-inked outline, and transparent background standards.
---

# Sketched Thumbnail Generator

Create consistent, hand-drawn woodcut & crayon SVG thumbnails and project card artwork for the **Work / Projects** page in this repository.

All project card thumbnails, logos, and case study hero illustrations must share the same hand-crafted aesthetic: organic hand-wobble linework, crayon noise textures, double-stroke ink passes, corner crosshatching, **no outer border frames**, and a **transparent background**.

---

## 1. Core Visual Attributes

Every sketched SVG thumbnail must incorporate these 5 design pillars:

| Pillar                                            | Implementation                                                                                                           | Effect                                                                                                 |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| **1. Transparent Background & Borderless Canvas** | No canvas `<rect fill="...">` or outer notebook border frame. Canvas is 100% transparent (`fill="none"`).                | Allows the sketched card and symbol to float naturally over layout surfaces and dark/light mode cards. |
| **2. Organic Hand-Wobble Filters**                | `feTurbulence` + `feDisplacementMap` (`#wobble`, `#wobble2`)                                                             | Distorts straight vector paths into hand-sketched, hand-drawn lines with natural wobble.               |
| **3. Crayon & Noise Texturing**                   | `feTurbulence` + `feColorMatrix` + `feComposite` (`#crayonRed`, `#crayonBlue`, `#crayonWhite`)                           | Replicates colored-pencil and crayon filling over paper surfaces.                                      |
| **4. Double-Stroke Ink Pass**                     | Primary path (`stroke-width="5"`, `#wobble`) + Secondary offset path (`stroke-width="2.5"`, `opacity="0.6"`, `#wobble2`) | Simulates loose, double-pass hand-inked outlines.                                                      |
| **5. Corner Crosshatch Shading**                  | 3-line parallel diagonal hatch groups (`stroke-width="2"`, `opacity="0.35"`)                                             | Adds handcrafted woodcut crosshatch shading to card corners.                                           |

---

## 2. Standard ViewBox & Aspect Ratios

- **Standard Card ViewBox**: `140 150 820 560` (focused strictly on the sketched card container and symbol, with 0 outer border margin).
- **Tight Symbol / Mark Crop ViewBox**: `220 200 660 460` (focused strictly on the central monogram or icon mark).
- **Icon / Badge ViewBox**: `0 0 120 120` or `0 0 100 100` (1:1 square ratio for inline thumbnails).

---

## 3. Canonical SVG Filter Definitions (`<defs>`)

Every sketched SVG asset **must** include the following standard filter definition block:

```xml
<defs>
  <!-- 1. Primary Hand-Wobble Displacement (Main Shapes & Fills) -->
  <filter id="wobble" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="11" result="turb"/>
    <feDisplacementMap in="SourceGraphic" in2="turb" scale="8" xChannelSelector="R" yChannelSelector="G"/>
  </filter>

  <!-- 2. Secondary Wobble Displacement (Offset Double-Stroke Ink Pass) -->
  <filter id="wobble2" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="2" seed="42" result="turb2"/>
    <feDisplacementMap in="SourceGraphic" in2="turb2" scale="10" xChannelSelector="R" yChannelSelector="G"/>
  </filter>

  <!-- 3. Crayon Fill Texture (Card Background Fill - Red) -->
  <filter id="crayonRed" x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency="0.06 0.09" numOctaves="3" seed="5" result="n"/>
    <feColorMatrix in="n" type="matrix"
      values="0 0 0 0 1
              0 0 0 0 1
              0 0 0 0 1
              0 0 0 0.18 0" result="grain"/>
    <feComposite in="grain" in2="SourceGraphic" operator="atop"/>
  </filter>

  <!-- 4. Crayon Fill Texture (Card Background Fill - Blue) -->
  <filter id="crayonBlue" x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency="0.06 0.09" numOctaves="3" seed="5" result="n"/>
    <feColorMatrix in="n" type="matrix"
      values="0 0 0 0 0.1
              0 0 0 0 0.47
              0 0 0 0 0.95
              0 0 0 0.18 0" result="grain"/>
    <feComposite in="grain" in2="SourceGraphic" operator="atop"/>
  </filter>

  <!-- 5. Crayon Fill Texture (White Symbol / Letterform Fill) -->
  <filter id="crayonWhite" x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency="0.07 0.1" numOctaves="3" seed="19" result="n"/>
    <feColorMatrix in="n" type="matrix"
      values="0 0 0 0 0.85
              0 0 0 0 0.15
              0 0 0 0 0.1
              0 0 0 0.12 0" result="grain"/>
    <feComposite in="grain" in2="SourceGraphic" operator="atop"/>
  </filter>
</defs>
```

---

## 4. Step-by-Step Construction Workflow

When creating a new thumbnail for a project or case study:

### Step 1: Transparent Canvas (No Outer Borders)

Ensure the top-level `<svg>` element has **no background rect** and **no outer border box**:

```xml
<svg viewBox="140 150 820 560" fill="none" xmlns="http://www.w3.org/2000/svg">
```

### Step 2: Main Sketched Card Body

Draw the primary sketched background card with rounded corners (`rx="26"`), heavy outline (`stroke-width="7"`), and `#wobble` + `#crayonRed`/`#crayonBlue` filters:

```xml
<g filter="url(#wobble)">
  <rect x="140" y="150" width="820" height="560" rx="26" fill="#e8362a" stroke="#8a1f16" stroke-width="7" filter="url(#crayonRed)"/>
</g>
<rect x="140" y="150" width="820" height="560" rx="26" fill="none" stroke="#7a170f" stroke-width="3" filter="url(#wobble2)" opacity="0.55"/>
```

### Step 3: Corner Crosshatching

Add 3-line parallel diagonal hatch marks to the top-right and bottom-left card corners:

```xml
<g stroke="#8a1f16" stroke-width="2" opacity="0.35" filter="url(#wobble2)">
  <line x1="160" y1="640" x2="220" y2="580"/>
  <line x1="175" y1="655" x2="235" y2="595"/>
  <line x1="190" y1="670" x2="250" y2="610"/>
  <line x1="850" y1="190" x2="910" y2="250"/>
  <line x1="835" y1="205" x2="895" y2="265"/>
  <line x1="820" y1="220" x2="880" y2="280"/>
</g>
```

### Step 4: Main Vector Symbol / Monogram

Draw the project symbol or monogram path using cream parchment fill (`#fdf6e3`), heavy dark stroke (`#8a1f16`, `stroke-width="5"`), `#wobble`, and `#crayonWhite`:

```xml
<!-- Primary Pass -->
<g filter="url(#wobble)">
  <path d="..." fill="#fdf6e3" stroke="#8a1f16" stroke-width="5" filter="url(#crayonWhite)"/>
</g>

<!-- Secondary Inked Double-Outline Pass -->
<path d="..." fill="none" stroke="#5c110a" stroke-width="2.5" filter="url(#wobble2)" opacity="0.6"/>
```

### Step 5: Loose Pencil Scribble Shading

Add subtle curved accent paths inside letterforms or symbol facets:

```xml
<g stroke="#f4c7c0" stroke-width="3" fill="none" opacity="0.65" filter="url(#wobble2)" stroke-linecap="round">
  <path d="M 370 510 Q 400 490 420 530"/>
  <path d="M 680 370 Q 720 350 740 390"/>
</g>
```

---

## 5. Astro Component Template Structure

Save new thumbnail components in `src/components/ui/<ProjectName>Logo.astro` or `src/assets/logos/`:

```astro
---
interface Props {
  class?: string;
  size?: "sm" | "md" | "lg" | "xl" | number;
  variant?: "card" | "mark-only";
  ariaLabel?: string;
}

const {
  class: className = "",
  size = "md",
  variant = "card",
  ariaLabel = "Sketched project thumbnail",
} = Astro.props;

const sizeMap: Record<string, string> = {
  sm: "size-10",
  md: "size-16",
  lg: "size-24",
  xl: "size-32",
};

const dimensionClass = typeof size === "number" ? "" : sizeMap[size] || sizeMap.md;
const customStyle = typeof size === "number" ? `width: ${size}px; height: ${size}px;` : "";
---

<div
  class:list={[
    "relative inline-flex shrink-0 items-center justify-center transition-transform hover:scale-105",
    dimensionClass,
    className,
  ]}
  style={customStyle}
  aria-label={ariaLabel}
  role="img"
>
  <svg
    viewBox="140 150 820 560"
    fill="none"
    class="h-full w-full select-none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <!-- Filter defs & sketched card paths -->
  </svg>
</div>
```

---

## 6. Verification Checklist

Before committing any newly generated sketched thumbnail SVG:

- [ ] Background is 100% transparent (`fill="none"`, no outer `<rect fill="#fdf6e3">`).
- [ ] Contains no outer notebook border frame lines (`<rect stroke="...">`).
- [ ] Contains `#wobble` and `#wobble2` displacement filters for organic hand-drawn lines.
- [ ] Contains `#crayonRed`/`#crayonBlue` and `#crayonWhite` noise filters for authentic crayon fill texturing.
- [ ] Uses double-pass offset inked outlines (`stroke-width="5"` + `stroke-width="2.5"`).
- [ ] Displays corner crosshatch shading.
- [ ] Renders crisply across Light Mode and Dark Mode without unreadable contrast.
- [ ] Validated with `cmd /c "npx pnpm run check"`.
