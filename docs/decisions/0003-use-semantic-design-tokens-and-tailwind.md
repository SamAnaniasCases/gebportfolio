# 3. Use Semantic Design Tokens and Tailwind CSS v4

- **Status:** Approved
- **Deciders:** Sam, Gen
- **Date:** 2026-07-18

## Context and Problem Statement

We need a design token system that ensures consistent styling (margins, typography scales, colors) across all pages while supporting light, dark, and system color schemes without code duplication or hardcoded utility styling.

## Decision Options

1.  **Tailwind CSS v3 (JavaScript Config)**: Very popular but relies on a heavy `tailwind.config.js` file and inline arbitrary utilities.
2.  **Tailwind CSS v4 (CSS-First)**: Fully native CSS configuration using `@theme` directives. Customizations live inside stylesheet files.
3.  **CSS Modules / Plain CSS**: High level of isolation but lacks the developer speed of utility-first CSS.

## Decision Outcome

**Tailwind CSS v4** is selected, utilizing a layered CSS design system:

1.  **Raw Palette**: Declared as custom properties in `src/styles/tokens.css`.
2.  **Semantic Tokens**: Light/dark variables mapping raw colors to semantic roles (`--color-bg-raw`, `--color-text-raw`).
3.  **Tailwind Theme Binding**: Handled in `src/styles/global.css` using the `@theme` directive, generating Tailwind utilities like `bg-bg`, `text-text-muted`, and `font-display`.

## Consequences

- **Positive**: Zero JavaScript config files (`tailwind.config.js` is prohibited). Theme switching is handled dynamically in CSS by overriding properties under the `.dark` class.
- **Negative**: AI agents must be trained to edit `global.css` instead of looking for JavaScript config files.
