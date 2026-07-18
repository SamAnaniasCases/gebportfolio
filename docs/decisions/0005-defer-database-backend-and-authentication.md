# 5. Defer Database, Backend, and Authentication

- **Status:** Approved
- **Deciders:** Sam, Gen
- **Date:** 2026-07-18

## Context and Problem Statement

Adding database instances, full backend servers, or user registration flows at the early stages of a personal portfolio site introduces significant security surfaces, operational costs, migration overhead, and latency.

## Decision Options

1.  **Backend Stack (e.g., Express, Supabase, Neon Postgres)**: Provides dynamic user state, database relations, and live writes, but carries maintenance and security risks.
2.  **No Database (Static-First)**: Rely completely on flat files in Git and static page compilation.

## Decision Outcome

We will **defer** all database, dedicated server backends, and authentication layers at launch. All public-facing data (projects, experience, and blogs) will reside in local Markdown, JSON, or YAML collections.

## Consequences

- **Positive**: Zero database costs, zero SQL migrations, no risk of password leaks or database connection outages.
- **Negative**: Cannot support authenticated user-specific dashboards or dynamic comment feeds initially. If needed, these will be implemented via serverless database wrappers (e.g., Cloudflare D1 + Drizzle) in later phases.
