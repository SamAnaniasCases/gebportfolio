# Feature Plans & Design Specifications

<callout icon="♞">**Status:** Active · **Owner:** Gen · **Last Reviewed:** 2026-07-24</callout>

This directory contains technical design plans, feature specifications, and RFC proposals for the personal portfolio codebase.

## Purpose

Plans in this directory serve as durable technical blueprints for significant upcoming features or refactors. They help AI agents and human contributors align on requirements, architecture, component design, and verification steps before writing code.

## Lifecycle & Statuses

Each plan file must specify a status badge in its header:

- `Draft` — Initial specification proposal undergoing design review.
- `Approved` — Reviewed and ready for implementation.
- `In Progress` — Active development underway.
- `Implemented` — Feature complete, verified, and released.
- `Superseded` — Replaced by a newer plan or ADR.

## Authority Order

1. Approved ADRs inside [decisions/](../decisions/README.md)
2. The [Handbook](../../Portfolio%20Architecture%20%26%20Engineering%20Handbook%202e6dfc6171c0423a8fc61d2f398ece49.md)
3. Active Feature Plans inside [plans/](README.md)
4. Content and TypeScript schemas
5. Implementation patterns

## Naming Convention

Name files using a sequential number and short kebab-case title:
`NNNN-feature-name.md` (e.g. `0001-dark-mode-refinement.md`).

For quick iteration, copy the standard template from [0000-template.md](0000-template.md).

## Index of Plans

| ID     | Title                                                                                      | Status        | Date       |
| ------ | ------------------------------------------------------------------------------------------ | ------------- | ---------- |
| `0000` | [Standard Feature Plan Template](0000-template.md)                                         | `Active`      | 2026-07-24 |
| `0001` | [Home Page IA & Content Specification](0001-home-page-specification.md)                    | `Approved`    | 2026-07-24 |
| `0002` | [Home Page Implementation Roadmap & Checkpoints](0002-home-page-implementation-roadmap.md) | `In Progress` | 2026-07-24 |
