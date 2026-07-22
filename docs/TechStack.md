# Tech Stack

<callout icon="♞">**Status:** Active · **Owner:** Gen · **Last Reviewed:** 2026-07-21</callout>

The core technology dependencies, choices, and alternatives.

## Adopted Stack

- **Framework**: Astro (v7.1.1) - Excellent content routing and performance.
- **Styling**: Tailwind CSS (v4) - CSS-first theme configuration via `@theme`.
- **Fonts**: Fontsource (`Inter Variable`, `Manrope Variable`, `Fraunces Variable`, `JetBrains Mono`, `Gochi Hand`) — three-voice type system detailed in [DesignSystem.md](DesignSystem.md).
- **Icons**: `@lucide/astro` (v1.24.0) - SVG icon library.
- **Editor/CMS**: Keystatic (Local/Git mode) - Visual editor without database overhead.
- **Language**: TypeScript (strict mode).
- **Package Manager**: pnpm.
- **Linting/Formatting**: ESLint + Prettier.
- **Testing**: Playwright (`@playwright/test` v1.50+) & Axe Core (`@axe-core/playwright` v4.10+) for automated accessibility audits.
- **CI/CD**: GitHub Actions.
- **Hosting**: Cloudflare Pages.

## Version Policy

- Lock dependencies in `pnpm-lock.yaml`.
- Upgrade minor versions monthly.
- Apply patches automatically on successful CI.
