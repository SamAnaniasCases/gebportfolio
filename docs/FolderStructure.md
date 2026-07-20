# Folder Structure

<callout icon="♞">**Status:** Active · **Owner:** Gen · **Last Reviewed:** 2026-07-18</callout>

The workspace layout and module boundary constraints.

## Directory Roles

- [src/pages/](../src/pages) — Entry points for routes. No complex UI logic.
- [src/layouts/](../src/layouts) — Page shells and document envelopes.
- [src/components/](../src/components) — Pure UI components separated into `primitives`, `content`, `navigation`, `feedback`, and `forms`.
- [src/features/](../src/features) — Self-contained domain modules containing private components and types.
- [src/content/](../src/content) — Markdown and data assets. No UI code.
- [tests/](../tests) — Playwright E2E and Axe accessibility automated test suites.

## Import Boundaries

- **Downward Flow**: Components may import from `primitives`, `config`, `lib`, and `types`.
- **No Circular Dependency**: Primitives must never import features. Content files must never import UI.
- **Barrel Exports**: Barrel exports (`index.ts`) are restricted to public feature boundaries.
