# 2. Adopt Git-Based Content with Keystatic

- **Status:** Approved
- **Deciders:** Sam, Gen
- **Date:** 2026-07-18

## Context and Problem Statement

We need a content management system (CMS) that provides a visual editing interface for content files while keeping all data portable, version-controlled, and stored directly in the Git repository (avoiding the cost, maintenance, and latency of a hosted database or external API-based CMS).

## Decision Options

1.  **Hosted CMS (e.g. Sanity, Contentful)**: Excellent visual interface and assets library, but introduces API costs, network requests at build time, and schema duplication between the CMS and code.
2.  **Raw Markdown Files**: Extremely lightweight and portable, but lacks a visual editor interface for easy content updates.
3.  **Keystatic (Git/Local Mode)**: Integrates directly with Astro, writes directly to Markdown/JSON/YAML files in the repo, and generates a local visual CMS interface.

## Decision Outcome

**Keystatic** in local/GitHub-backed mode is selected.

### Rationale & Schema Mapping

- **Zero-Database State**: Content remains local files in the repository.
- **Astro v5 File Loader Compatibility**: Astro v5's built-in `file()` loader expects JSON files to represent a collection of items. To support this loader natively, we structure singleton configs (like `site.json` and `navigation.json`) as JSON arrays containing a single object keyed by an `"id"`.
  - _Example:_
    ```json
    [
      {
        "id": "site-config",
        "name": "Sam Ananias",
        ...
      }
    ]
    ```

## Consequences

- **Positive**: Fully portable content, zero external database costs, strict Git history audit trail, build-time Zod schema validation.
- **Negative**: Deployments require a Git commit and rebuild. Singletons must be read as array structures or queried by their specific ID.
