# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-07-18

### Added

- Fontsource variable fonts integration (`Inter Variable`, `Manrope Variable`, `JetBrains Mono`).
- Official `@lucide/astro` SVG icon library configuration.
- Layout primitives: `Container.astro` (width bounds) and `Grid.astro` (responsive shorthand parser).
- Interactive controls: `Button.astro` and `LinkButton.astro` with loading overlays and accessibility sizing compliance.
- Content compositions: `Card.astro` (composable slots and semantic full-card clickable overlays) and `ThemeToggle.astro` (flash-free theme toggler).
- Main design showcase page (`index.astro` kitchen sink layout).

## [0.1.0] - 2026-07-18

### Added

- Astro v7 + TypeScript setup.
- Tailwind CSS v4 design token integrations (`tokens.css`, `global.css`).
- ESLint and Prettier flat rules.
- Content Layers schemas in `content.config.ts`.
- GitHub Actions CI workflow config.
- Architectural design decisions registry and docs folders.
