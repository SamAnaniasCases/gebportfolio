# 6. Use React Only for Interactive Islands

- **Status:** Approved
- **Deciders:** Sam, Gen
- **Date:** 2026-07-18

## Context and Problem Statement

To maintain excellent web performance and accessibility budgets (LCP ≤ 2.5s, JS bundle size ≤ 75KB on content pages), we must prevent the framework code of client-side UI libraries (like React) from bloating static documents.

## Decision Options

1.  **Full React App (e.g., Next.js, Gatsby)**: Simple component reuse, but forces the client to download React runtime code even on plain-text article pages.
2.  **Vanilla Astro Components**: Zero client-side JS runtime by default, but difficult to implement complex clientside features (like interactive search inputs or nested forms).
3.  **Astro + Hydrated React Islands**: Build static components natively in Astro, and hydrate React components only on pages where interactive state is strictly required.

## Decision Outcome

We will build **static elements in Astro (.astro) by default**. **React (.tsx)** is restricted to interactive component "islands" requiring clientside state (`useState`, `useEffect`) or advanced DOM events, loaded using selective hydration directives (e.g., `client:visible`).

## Consequences

- **Positive**: Near-zero client-side JS weight on most pages, maximum SEO visibility, and fast initial page load speeds.
- **Negative**: Developers must maintain two component syntaxes (Astro and React JSX) and explicitly manage boundary transitions.
