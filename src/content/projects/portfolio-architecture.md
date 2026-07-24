---
title: Personal Portfolio Architecture & Content Strategy
summary: A fast, accessible personal website engineered with deliberate planning, strict quality gates, and clear documentation context.
role: Creator & Systems Builder
dates: 2026 - Present
status: active
featured: true
stackRefs:
  - typescript
tags:
  - Architecture
  - Web Standards
  - Accessibility
links:
  - label: Source Repository
    url: https://github.com/SamAnaniasCases
outcomes:
  - Built for instant page loads with zero unnecessary background script execution.
  - Designed and verified to meet strict web accessibility standards for all users.
seo:
  title: Personal Portfolio Architecture Case Study
  description: High-performance Astro SSG portfolio specification and content architecture case study.
---

### Project Overview

This portfolio is built to demonstrate engineering discipline, clean architectural boundaries, and deliberate problem solving. Rather than relying on heavy client-side frameworks or unstructured CMS blobs, the site leverages Astro v5 Content Collections, Tailwind CSS v4 CSS-first design tokens, and a strict verification suite.

### Key Architecture Decisions

- **Content-First SSG**: Pages are pre-rendered at build time with 0kb client-side JavaScript by default.
- **Specification-Driven**: Every page is governed by an explicit Information Architecture specification inside `docs/plans/`.
- **AI-Paired Workflow**: AI was used as an interactive partner for task decomposition, documentation, and syntax acceleration, while human ownership governs all architectural choices and verification gates.
