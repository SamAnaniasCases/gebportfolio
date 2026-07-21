# Deployment

<callout icon="♞">**Status:** Active · **Owner:** Gen · **Last Reviewed:** 2026-07-18</callout>

Deploy pipelines, environment configs, and rollout procedures.

## Production Pipelines

- **Hosting**: Cloudflare Pages.
- **Trigger**: Push to the default `main` branch.
- **Verification Gate**: CI checks (linting, formatting, TS typecheck, build, Playwright E2E and axe accessibility tests, and Lighthouse performance budgets via `lighthouse-budget.json`) must pass on GitHub Actions before deployment.

## Environments

- `Local`: Local environment, mocks, development server.
- `Preview`: Per-PR preview deployment on Cloudflare.
- `Production`: Live deployment, search engine indexed.
