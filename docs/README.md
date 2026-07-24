# Portfolio Documentation Index

<callout icon="♞">**Status:** Active · **Owner:** Gen · **Last Reviewed:** 2026-07-24</callout>

Welcome to the documentation home for the personal portfolio project.

## Authority Order

1. Approved ADRs inside [decisions/](decisions/README.md)
2. The [Handbook](../Portfolio%20Architecture%20&%20Engineering%20Handbook%202e6dfc6171c0423a8fc61d2f398ece49.md)
3. Active Feature Plans inside [plans/](plans/README.md)
4. Content and TypeScript schemas
5. Implementation patterns
6. Code comments

---

## Directory & Category Map

Understanding what each directory inside `/docs` is for:

- **[`docs/architecture/`](architecture/Architecture.md)** — **System Infrastructure & Framework Rules**  
  Contains system boundaries, Astro content collection schemas, directory maps, stack choices, and Cloudflare Pages deployment configs.

- **[`docs/design/`](design/DesignSystem.md)** — **Visual Identity, Tokens & Asset Rules**  
  Contains design token specifications (`tokens.css`, `global.css`), Woodcut/engraving theme rules, typography voices, SVG cropping standards, and chess icon specs.

- **[`docs/engineering/`](engineering/CodingStandards.md)** — **Engineering Policies & AI Guidelines**  
  Contains strict TypeScript rules, component contracts, error boundaries, automated testing guidelines, and operational preflight rules for AI coding assistants.

- **[`docs/decisions/`](decisions/README.md)** — **Architecture Decision Records (ADRs)**  
  Contains immutable decision records documenting durable architectural choices (e.g. adopting Astro, Keystatic Git CMS, CSS-first Tailwind v4).

- **[`docs/plans/`](plans/README.md)** — **Feature Specifications & Execution Roadmaps**  
  Contains specifications, blueprints, and phased execution roadmaps for specific features and pages (e.g., Home Page Information Architecture & Implementation Roadmap).

- **Root `docs/`** — **Global Index & Release Logs**  
  Houses project-wide documentation entry points (`README.md`), overall timeline (`Roadmap.md`), and release history (`Changelog.md`).

---

## Document Inventory

### System Architecture & Operations (`docs/architecture/`)

- [Architecture](architecture/Architecture.md) — System boundaries, data flow, rendering model.
- [Tech Stack](architecture/TechStack.md) — Current packages, versions, and stack selection rationale.
- [Folder Structure](architecture/FolderStructure.md) — Directory map, naming, and dependency flow rules.
- [Content Management](architecture/ContentManagement.md) — Content collections, schemas, Keystatic configuration.
- [Deployment](architecture/Deployment.md) — CI/CD pipelines, environments, Cloudflare Pages config.

### Design System & Assets (`docs/design/`)

- [Design System](design/DesignSystem.md) — Typography, semantic tokens, radius, motion, design constraints.
- [SVG & Image Rules](design/SVGRules.md) — Cropping standards, stroke weights, dark mode SVG binding, and asset specs.
- [Chess Icon System](design/ChessIconSystem.md) — Specification for chess navigation icons and move evaluation badges.
- [Woodcut Visual Theme](design/WoodcutTheme.md) — Woodcut & engraving visual theme specification.
- [Woodcut Theme Roadmap](design/WoodcutThemeRoadmap.md) — Phased rollout strategy for woodcut theme.
- [Sidebar Refinement](design/SidebarRefinement.md) — Phased execution log for left-sidebar navigation.

### Engineering & Guidelines (`docs/engineering/`)

- [Coding Standards](engineering/CodingStandards.md) — TypeScript guidelines, component contracts, error boundaries, testing.
- [AI Guidelines](engineering/AI-Guidelines.md) — Preflight checks and workflow instructions for AI assistants.
- [AI Project Context](engineering/AI-Project-Context.md) — Copy-pasteable bootstrap prompt for new AI sessions.

### Governance & Planning (`docs/decisions/` & `docs/plans/`)

- [Architecture Decisions (ADRs)](decisions/README.md) — Architecture Decision Records.
- [Feature Plans & Specs](plans/README.md) — Technical feature plans, design specifications, and RFC proposals.
- [Roadmap](Roadmap.md) — Phased timeline and success metrics.
- [Changelog](Changelog.md) — Keep a Changelog formatting for versioned releases.
