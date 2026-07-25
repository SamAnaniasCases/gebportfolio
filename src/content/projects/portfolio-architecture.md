---
title: Portfolio Architecture & Content System
summary: A content-first personal portfolio platform built with Astro SSG, Tailwind CSS v4, and version-controlled markdown content collections.
role: Creator & Systems Builder
dates: 2026 - Present
status: active
featured: true
chessPiece: queen
category: architecture
heroImage: /images/projects/portfolio-architecture.png
keyTakeaway: "Key decision: Use Astro SSG for zero client JS by default and 100% portable markdown content."
chessRoleReason: "This project serves as the technical powerhouse of the portfolio—defining the core rules, content schemas, and verification standards that govern all work."
stackRefs:
  - typescript
tags:
  - Astro v5
  - TypeScript
  - Tailwind CSS v4
  - Markdown
links:
  - label: Source Repository
    url: https://github.com/SamAnaniasCases/gebportfolio
outcomes:
  - Built for instant page loads with zero unnecessary client script execution.
  - Designed and verified to meet strict web accessibility and design system standards.
  - Portable Markdown content collections managed with strict TypeScript schemas.
seo:
  title: Personal Portfolio Architecture Case Study
  description: High-performance Astro SSG portfolio specification and content architecture case study.
---

### Project Overview

This portfolio is built to demonstrate engineering discipline, clean architectural boundaries, and deliberate problem solving. Rather than relying on heavy client-side frameworks or unstructured CMS blobs, the site leverages **Astro v5 Content Collections**, **Tailwind CSS v4** CSS-first design tokens, and a strict verification suite.

![Portfolio Architecture & Hero UI Layout](/images/projects/portfolio-architecture.png)

### Key Architecture Decisions

- **Content-First SSG**: Pages are pre-rendered at build time with 0kb client-side JavaScript by default.
- **Specification-Driven**: Every page is governed by an explicit Information Architecture specification inside `docs/plans/`.
- **Automated Verification Suite**: Code passes Prettier, ESLint, Astro typecheck, Playwright E2E tests, and axe-core accessibility audits on every change.
