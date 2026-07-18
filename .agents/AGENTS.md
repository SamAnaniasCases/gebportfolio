## Developer Rules & Invariants

Always follow these rules strictly before and during any edits to this repository:

### 1. Documentation Portability & Integrity

- **Prohibited Link Format**: Do **not** use absolute local paths (e.g. `file:///c:/Users/...`) inside repository markdown files.
- **Permitted Link Format**: Use relative markdown links (e.g. `[Design System](DesignSystem.md)` or `[global.css](../src/styles/global.css)`).
- **Broken Link Guard**: Any document edits must be validated by running `pnpm run check-links`. The build/check process will fail on broken relative links.

### 2. Definition of Done for Changes

- Every change must:
  1. Update the corresponding markdown file inside `docs/` if there are architectural, structural, or component deviations.
  2. Add an entry to `docs/Changelog.md` detailing the changes.
  3. Keep `docs/AI-Project-Context.md` updated if the core tech stack, folder structure, or constraints change.

### 3. Astro v5 Content Layer Rules

- All content collections must use the new Content Layer loader structure in `src/content.config.ts` (e.g. `loader: glob(...)` or `loader: file(...)`). Do **not** use legacy `type: 'content'` configurations.
- Singleton config files inside `src/content/data/` (like `site.json` and `navigation.json`) are wrapped in single-item arrays with an `id` field for compatibility with the built-in `file` loader. Maintain this structure.

### 4. Tailwind CSS v4 Rules

- Tailwind v4 is fully CSS-first. All utility configuration, theme variable mapping, and custom style extensions must be written inside `src/styles/global.css` using the `@theme` directive.
- Do **not** create a `tailwind.config.js` or `tailwind.config.mjs`.

### 5. Verification Command Sequence

Before claiming a task is done, you must run:

1. `pnpm run format` (formats the codebase using Prettier).
2. `pnpm run lint` (checks syntax with ESLint).
3. `pnpm run check` (runs Astro compiler typechecks and documentation link validation).
4. `pnpm run build` (verifies the project compiles successfully).
