# AI Project Context Bootstrap Prompt

Copy and paste the entire block below into the very first prompt of any new AI chat session to ensure the agent aligns with the codebase conventions and constraints:

```markdown
### AI Project Context

You are working on a high-performance personal portfolio project.

- **Handbook & Guidelines**: Follow the conventions in `/Portfolio Architecture & Engineering Handbook *.md` and `/docs/AI-Guidelines.md`.
- **Core Tech Stack**: Astro v7.1.1 (Static SSG) + TypeScript (strict) + Tailwind CSS v4 (CSS-first config) + pnpm.
- **Theme & Style**: Styled via semantic CSS variables mapped in `/src/styles/tokens.css` and bound to Tailwind in `/src/styles/global.css`. Hex colors must never be hardcoded in markup.
- **Content Layer (Astro v5)**: Collection schemas are declared in `/src/content.config.ts` using loaders (`glob` for directories, `file` for JSON singletons). Singletons inside `/src/content/data/` are array-wrapped with `id` keys to ensure file-loader compatibility.
- **Rules of Engagement**:
  1. No new dependencies without explicit permission.
  2. Write UI components as `.astro` static files. Use React components only for interactive islands requiring client-side state.
  3. Configure design system rules strictly inside the `@theme` directive in `/src/styles/global.css` (never create `tailwind.config.js`).
  4. Always run verification: `pnpm run check` (typecheck), `pnpm run lint` (ESLint), `pnpm run build` (build compiler), and `pnpm run test:e2e` / `pnpm run test:a11y` (E2E & accessibility tests) before considering a task completed.
- **Read First**: `/docs/README.md`, `/docs/AI-Guidelines.md`, `/docs/CodingStandards.md`.
```
