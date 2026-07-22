# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.0] - 2026-07-21

### Added

- Woodcut & engraving visual theme specification and phased roadmap in `docs/WoodcutTheme.md` and `docs/WoodcutThemeRoadmap.md`.
- True-black dark mode palette (ground `#000000`, surface `#0d0d0f`, text `#f0f4ff`, primary `#8fb0dc`) in `src/styles/tokens.css`.
- Engraving stroke-weight tokens (`--stroke-structural` 2.5px, `--stroke-detail` 1.5px, `--stroke-hatch` 1.3px, `--stroke-fine` 1px) in `src/styles/tokens.css`.
- Classical typography voices — Fraunces Variable (display, WONK) and Gochi Hand (decorative scrawl) via `@fontsource-variable/fraunces` and `@fontsource/gochi-hand`.
- Engraved section divider primitives `DividerChessboard.astro` and `DividerKnight.astro` in `src/components/primitives/`.
- Chess piece icon component `ChessIcons.astro` in `src/components/navigation/`.
- Fixed left-sidebar navigation (desktop) with a full-screen overlay menu, focus trap, and scroll lock (mobile) in `src/layouts/BaseLayout.astro`.
- Themed 404 page featuring a knocked-over knight engraving at `src/pages/404.astro`.
- Mode-aware `.chess-grid` repeating chessboard background texture utility in `src/styles/global.css`.
- Dedicated SVG & image asset rules specification in `docs/SVGRules.md` establishing tight cropping standards, engraving stroke-weight hierarchy, and dark-mode high-contrast binding patterns.
- Integrated complete set of 12 hand-drawn woodcut chess piece SVGs (king, queen, rook, bishop, knight, pawn in black and white styles) inside `src/assets/chess/`.
- Replaced legacy navigation glyphs in `src/components/navigation/ChessIcons.astro` and `src/layouts/BaseLayout.astro` with custom theme-adaptive SVGs (black SVGs in Light Mode, white SVGs in Dark Mode) and updated active navigation indicator to the Pawn SVG.
- Completed Phase A of Sidebar Refinement (`docs/SidebarRefinement.md`): restored `Home` (`/`) route with King piece (♔), implemented stroke-only 12px Knight SVG active indicator (`src/assets/chess-nav/knight.svg`), added 44px min-height touch targets, and configured explicit `focus-visible` focus rings.
- Completed Phases C & D of Sidebar Refinement (`docs/SidebarRefinement.md`): added `tracking-wide` letter spacing on navigation links, 1px horizontal icon hover shift micro-interactions (`group-hover:translate-x-px`), and `active:scale-[0.92]` press feedback on the theme toggle button. Finalized Checkpoint 1.
- Completed Phase B of Sidebar Refinement (`docs/SidebarRefinement.md`): created 24×24 simplified stroke-only piece SVGs in `src/assets/chess-nav/`, refactored `ChessIcons.astro` to single-render using `currentColor` auto-inversion, and resized icons to 15px (desktop) and 18px (mobile). Finalized Checkpoint 2.
- Completed Phase E of Sidebar Refinement (`docs/SidebarRefinement.md`): added 10px uppercase mono group labels (`WORK`, `WRITING`, `META`), integrated `DividerChessboard.astro` for the primary group divider strip, and configured `@custom-variant short` (`max-height: 768px`) for responsive label visibility. Finalized Checkpoint 3.
- Completed Phase F of Sidebar Refinement (`docs/SidebarRefinement.md`): created hand-drawn Sun/Moon SVGs in `src/assets/theme-icons/`, updated `ThemeToggle.astro` button to 44px (`h-11 w-11`), and added a 40px knight watermark at 20% opacity above the sidebar footer divider. Finalized Checkpoint 4.
- Completed Phase G of Sidebar Refinement (`docs/SidebarRefinement.md`): tokenized hardcoded `#0d0d0f` dark-mode colors in `Logo.astro` with `var(--color-surface-raw, #0d0d0f)`. Finalized Checkpoint 5.
- Completed Phase H of Sidebar Refinement (`docs/SidebarRefinement.md`): implemented 200ms `mobile-menu-out` exit animation, per-link 30ms staggered entry delays (`--i`), and `prefers-reduced-motion` animation fallbacks in `BaseLayout.astro` and `global.css`. Finalized Checkpoint 6.
- Isolated desktop sidebar vertical scrolling to the primary navigation section (`Home` → `Lab`), pinning the logo header, utility links (`About`, `Contact`, `Search`), theme toggle, and footer permanently in fixed position.

### Fixed

- Added `@variant dark (&:where(.dark, .dark *));` class selector strategy to `src/styles/global.css` for Tailwind CSS v4, fixing `dark:hidden` and `dark:flex` Sun/Moon icon swapping when toggling dark mode via JavaScript.
- Updated `.chess-grid` CSS variable mixing in `src/styles/global.css` to use `var(--color-border-raw)` for clear grid visibility in both dark and light mode.
- Enhanced Dark Mode background texture in `src/styles/global.css` with an optical 3D depth effect using `filter: blur(0.75px)`, 4-stop radial `mask-image` dual vignette decay, and dark surface card ambient elevation shadows (`box-shadow`), allowing foreground UI elements to float cleanly above a soft, distant background environment.
- Cropped SVG `viewBox` in `src/components/primitives/Logo.astro`, `public/favicon.svg`, and `src/assets/brand/logo.svg` to focus directly on the goat knight head and horns (`120 40 400 360`), making the logo prominent, bold, and readable at small sizes (favicons and topbar headers).

- Updated active navigation link indicator in `src/layouts/BaseLayout.astro` to use `src/assets/chess-icons/correct.svg` instead of `knight.svg`.
- Redesigned `king.svg` and `knight.svg` in `src/assets/chess-nav/` for improved clarity at 15px render size.
- Created 10 chess move evaluation annotation badges in `src/assets/chess-icons/` (`brilliant`, `great`, `best`, `good`, `correct`, `book`, `inaccuracy`, `mistake`, `blunder`, `miss`).
- Restyled `.prose-custom blockquote` with an engraved double-rule border and ♛ queen watermark.
- Replaced the hero text gradient with a solid `text-primary` emphasis and added a Gochi Hand catchphrase (no-gradient rule, WoodcutTheme.md §1.1).
- Updated navigation and theme E2E specs for the sidebar/overlay DOM and the multi-instance theme toggle.

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
