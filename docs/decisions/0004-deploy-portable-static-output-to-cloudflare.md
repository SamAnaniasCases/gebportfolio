# 4. Deploy Portable Static Output to Cloudflare

- **Status:** Approved
- **Deciders:** Sam, Gen
- **Date:** 2026-07-18

## Context and Problem Statement

We want the portfolio site to load with minimal latency worldwide, remain secure, cost next to nothing to operate, and survive unexpected viral traffic spikes.

## Decision Options

1.  **Vercel / Netlify**: Excellent developer experience, but pricing plans can scale unexpectedly on bandwidth usage.
2.  **AWS S3 + CloudFront**: Enterprise standard, but carries high configuration complexity and maintenance costs.
3.  **Cloudflare Pages**: Extremely fast global edge caching, free tier covers substantial bandwidth, and integrates natively with Git-based triggers.

## Decision Outcome

**Cloudflare Pages** is selected for hosting, deployed using static build artifacts compiled in GitHub Actions.

## Consequences

- **Positive**: Near-zero operational cost, DDoS protection, edge caching speed, and instant preview builds on PRs.
- **Negative**: Server-side features must be written as serverless functions or API endpoints (Astro server routes) rather than a continuous long-running Node server process.
