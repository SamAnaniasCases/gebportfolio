# Content Management

<callout icon="♞">**Status:** Active · **Owner:** Gen · **Last Reviewed:** 2026-07-18</callout>

Details of the content layer, collections schemas, and Keystatic rules.

## Content Collections

Defined in `src/content.config.ts`:

- `site`: Global configuration.
- `navigation`: Link configurations.
- `projects`: Markdown-based case studies.
- `posts`: Blog posts.
- `experience`: Career timeline entries.
- `skills`: Competency evidence and category taxonomy.
- `achievements`: Certifications and awards.
- `research`: Formal publications and abstract.
- `experiments`: Lab work and warnings.
- `pages`: Static page contents.

## Content Formatting

- Slugs: Lowercase, kebab-case, immutable once published.
- Drafts: Hidden from feeds, index, sitemap.
- Validation: Enforced at build-time using Zod and CI validation scripts.
