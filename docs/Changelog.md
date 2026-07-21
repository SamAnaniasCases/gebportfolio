# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.8.0] - 2026-07-21

### Added

- Optimized theme-aware vector logo asset file in `src/assets/brand/logo.svg`.
- Reusable primitive Astro logo component in `src/components/primitives/Logo.astro` supporting CSS theme-aware fills and stroke colors.
- Custom prefers-color-scheme responsive favicon in `public/favicon.svg` using the goat head chess knight vector paths.

### Changed

- Integrated the dynamic logo in the global header next to the site title in `src/layouts/BaseLayout.astro`.
- Cleaned up temporary files (`goat_head_chess_knight.svg` and `goat_head_chess_knight.png`) from the root directory.
- Migrated deprecated `z` imports from `astro:content` to `astro/zod` in `src/content.config.ts`.
- Migrated deprecated Lucide icons (`CheckCircle2` -> `CircleCheck`, `AlertTriangle` -> `TriangleAlert`) in experience and experiments layout pages.

## [0.7.0] - 2026-07-20

### Added

- Playwright automated browser testing configurations in `playwright.config.ts`.
- Navigation E2E testing specs in `tests/e2e/navigation.spec.ts`.
- Light/dark theme toggler and localStorage sync E2E specs in `tests/e2e/theme.spec.ts`.
- Dynamic client search filtering E2E specs in `tests/e2e/search.spec.ts`.
- Automated Axe accessibility audits across all major site routes in `tests/accessibility/a11y.spec.ts`.
- Performance metrics budgets specification in `lighthouse-budget.json`.
- Cloudflare Pages URL redirects mapping config in `public/_redirects`.

### Changed

- Expanded package config in `package.json` to include `@playwright/test`, `@axe-core/playwright`, and defined test run script tasks.

## [0.6.0] - 2026-07-20

### Added

- Lab/Experiments listing page at `src/pages/experiments/index.astro` (with dynamic status and technology filtering).
- Dynamic detail page for experiments at `src/pages/experiments/[slug].astro` (with warnings, demo links, and scroll-highlighted Table of Contents).
- Seed experiments content files at `src/content/experiments/css-grid-chess.md` and `src/content/experiments/color-scheme-sandbox.md`.

### Changed

- Integrated `ThemeToggle` into `src/layouts/BaseLayout.astro` global header for flash-free theme switching.
- Appended "Lab" navigation link pointing to `/experiments` inside `src/content/data/navigation.json`.

## [0.5.0] - 2026-07-19

### Added

- Blog writing index directory at `src/pages/posts/index.astro`.
- Blog dynamic detail page at `src/pages/posts/[slug].astro` (with Table of Contents sidebar scroll-highlights).
- Research index directory page at `src/pages/research/index.astro`.
- Research detailed publication sheet page at `src/pages/research/[slug].astro`.
- Search query lookup UI page at `src/pages/search.astro`.
- Static Search JSON database compilation endpoint at `src/pages/search.json.ts`.
- Dynamic RSS XML compilation feed endpoint at `src/pages/rss.xml.ts`.
- Table of Contents link animations helper classes (`.toc-link`, `.toc-link-active`) in `src/styles/global.css`.
- Seed posts and research entries for Welcome to Astro, Raft Simulation, and IEEE Telemetry Ingestion.

### Changed

- Fixed trailing newline conflicts in Vite `syncSingletonsPlugin` in `astro.config.ts`.
- Removed unused imports (`Download`, `Grid`, `Card`) inside research components to pass ESLint tests.

## [0.4.0] - 2026-07-19

### Added

- Main portfolio route page at `src/pages/index.astro`.
- About credentials page at `src/pages/about.astro`.
- Project cases index page at `src/pages/projects/index.astro` (with client-side vanilla filter tabs).
- Project dynamic detailed page at `src/pages/projects/[slug].astro`.
- Professional timeline history page at `src/pages/experience.astro`.
- Forms-validated submittal contact page at `src/pages/contact.astro`.
- Seed markdown, json, and yaml content layer assets for about, projects, skills, experience, and achievements collections.
- Node.js environment types (`@types/node`) as devDependency.
- Custom prose class typography styles (`.prose-custom`) in `src/styles/global.css`.

### Changed

- Migrated design system showcase to `src/pages/design-system.astro` to preserve style previews.
- Modified `src/layouts/BaseLayout.astro` to render site settings dynamically, manage SEO fallbacks, and highlight active header tabs.
- Removed prohibited `@ts-nocheck` comments in `astro.config.ts`.
- Removed explicit `any` bindings on `about.astro`'s icons.

## [0.3.0] - 2026-07-19

### Added

- Keystatic CMS integration (`@keystatic/core`, `@keystatic/astro`, `@astrojs/react`, `react`, `react-dom`).
- Schema configurations for all 10 collections/singletons in `keystatic.config.ts`.
- Custom Vite plugin `syncSingletonsPlugin` in `astro.config.ts` to solve the JSON array format mismatch for site and navigation singletons.
- Ignore rules for Keystatic local database folder in `.gitignore`.

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
