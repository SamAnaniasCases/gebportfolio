# [Plan Title]

<callout icon="♞">**Status:** Draft · **Owner:** [Owner] · **Date:** [YYYY-MM-DD]</callout>

---

## 1. Goal & Context

Briefly state the goal, context, and problem this feature or change solves. Reference any relevant user requirements or issues.

---

## 2. User Experience & Design Impact

Detail any visual, interactive, accessibility (WCAG 2.2 AA), or responsive layout changes.

- **Desktop & Mobile Behavior**:
- **Accessibility Requirements**:
- **Design Tokens / Theme Variables**:

---

## 3. Proposed Architecture & Component Strategy

Outline the affected components, schemas, pages, or data layers.

### [Component / Feature Name]

Summary of changes.

#### [NEW] `path/to/newfile.astro`

#### [MODIFY] `path/to/existingfile.astro`

#### [DELETE] `path/to/oldfile.ts`

---

## 4. Dependencies & Constraints

- List any strict rules or constraints (e.g., zero new npm packages, strict TypeScript rules, static rendering default).
- Reference relevant standards in [Coding Standards](../engineering/CodingStandards.md) and [Design System](../design/DesignSystem.md).

---

## 5. Verification Plan

Detail how the feature will be verified before declaring completion.

### Automated Tests

- `npx pnpm run format`
- `npx pnpm run lint`
- `npx pnpm run check`
- `npx pnpm run build`
- `npx pnpm run test:e2e`
- `npx pnpm run test:a11y`

### Manual Verification

- Visual inspection across light & dark mode.
- Keyboard navigation & focus ring check.
