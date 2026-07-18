# 1. Adopt Astro Content-First Architecture

- **Status:** Approved
- **Deciders:** Sam, Gen
- **Date:** 2026-07-18

## Context and Problem Statement

The goal is to build a fast, elegant, content-first personal portfolio that exhibits excellent Core Web Vitals (LCP ≤ 2.5s, CLS ≤ 0.1) and high accessibility baseline (WCAG 2.2 AA). It must remain inexpensive to host, simple to maintain, and easy for AI coding agents to collaborate on.

## Decision Options

1.  **Next.js (App Router)**: Extremely powerful for server-side products, but carries a larger runtime footprint and bundles significant client-side JS for routing and hydration by default.
2.  **Astro**: Specifically built for content-driven sites. It ships zero client-side JavaScript by default, isolating interactivity to custom React/Svelte islands.
3.  **Vanilla HTML/CSS**: Maximum performance and simplicity, but lacks standard developer tooling (component composition, Content Collections, and build-time image optimization).

## Decision Outcome

**Astro** is selected as the primary frontend framework.

### Rationale

- **Zero JS by Default**: Astro is designed for high-performance content sites, which maps perfectly to a personal portfolio.
- **Islands Architecture**: Allows us to write standard React components only where client-side state is required (such as interactive filters or forms), keeping the rest of the page static.
- **Content Layer**: Astro v5's Content Layer API provides typed schema validation with Zod out-of-the-box, ensuring high data integrity.
- **Built-in Optimization**: Excellent default tooling for responsive images and asset processing.

## Consequences

- **Positive**: High lighthouse scores, easy SEO configuration, structured frontmatter schemas, and edge-run optimization.
- **Negative**: Requires learning Astro component syntax and managing dual Astro/React boundary rules.
