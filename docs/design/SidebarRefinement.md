# Sidebar Refinement — Implementation Tracker

> **Status:** Planning Complete — Awaiting Implementation (Revised: review decisions resolved)
> **Scope:** Refinements to the fixed left sidebar navigation (WoodcutTheme.md §5)
> **Principle:** Elevate, don't redesign. Preserve the minimalist chess-inspired identity.

---

## Resolved Decisions (Review 2026-07-22)

The plan was audited against source code and the following decisions are now locked:

1. **Active marker:** simplified stroke-only **knight SVG at 12 px**, shipped in Phase A (pulled forward from Phase B). No left bar, no background pill — spec §5.3 is explicit: _"just the knight marker, like a move notation on a scoresheet."_ The Unicode `♞` glyph suggestion in §5.3 is superseded by the SVG for consistency with the piece-icon system.
2. **Alt+K hint:** **dropped.** No keyboard shortcut exists in the codebase; rendering the hint without the functionality would be misleading. Deferred until a real shortcut is implemented.
3. **Home link:** **added.** Spec §5.1/§5.3 includes Home (♔ King) but the implementation omits it. Phase A adds it via the Keystatic navigation singleton, sidebar groups, and piece map.
4. **Verification cadence:** **batched.** Phases A+C+D (all small `BaseLayout.astro` changes) share one verification run; B, E, F, G, H verify individually — 6 full runs instead of 8.

---

## Verified Audit Findings

All findings below have been verified against source code, not assumed.

### Active State (BaseLayout.astro L259–262)

| Aspect          | Spec (WoodcutTheme.md §5.3)               | Actual Implementation                      | Delta                         |
| --------------- | ----------------------------------------- | ------------------------------------------ | ----------------------------- |
| Marker type     | `♞` knight glyph                          | Pawn SVG (`ChessIcons piece="pawn"`)       | Wrong piece                   |
| Marker size     | 12 px                                     | `size-4` = 16 px                           | +4 px larger                  |
| Position        | `absolute left-0`                         | `absolute top-1/2 left-0 -translate-y-1/2` | Matches (vertically centered) |
| Text emphasis   | `font-semibold` + `var(--color-text-raw)` | `text-text font-semibold`                  | Matches                       |
| Background/pill | None                                      | None                                       | Matches                       |

**Verdict:** Active state is functional but uses the wrong piece and is too large. The pawn is barely visible at 16px and doesn't carry the "knight = logo = identity" symbolism. **Resolution:** simplified stroke-only knight SVG at 12px (Phase A) — the current filtered knight SVG would be an illegible smudge at 12px, so the new asset is a prerequisite, not an option.

---

### Icon System (ChessIcons.astro + assets/chess/*.svg)

| Aspect                     | Spec (§5.3)                  | Actual Implementation                                                                  | Delta                           |
| -------------------------- | ---------------------------- | -------------------------------------------------------------------------------------- | ------------------------------- |
| Icon size (desktop)        | 15 px                        | `size-5` = 20 px                                                                       | +5 px larger                    |
| Icon size (mobile overlay) | 18 px (§5.6)                 | `size-6` = 24 px                                                                       | +6 px larger                    |
| Rendering                  | Stroke-based, `currentColor` | Filled SVGs with hardcoded colors                                                      | Major deviation                 |
| Black pieces               | —                            | `fill="#4a3624"` `stroke="#efe2bd"`                                                    | Hardcoded brown/cream           |
| White pieces               | —                            | `fill="#f6efd6"` `stroke="#3a2a18"`                                                    | Hardcoded cream/brown           |
| Filters                    | —                            | `feTurbulence` wobble + grain on every SVG                                             | Performance cost at small sizes |
| ViewBox                    | —                            | ~200×383–394 (queen: 200×333)                                                          | Non-uniform aspect ratios       |
| Theme swap                 | `currentColor` auto-invert   | Dual-render: black SVG (light) / white SVG (dark) via `dark:hidden`/`hidden dark:flex` | Works but doubles DOM nodes     |

**Verdict:** Icons render correctly in both themes but deviate from spec's `currentColor` intent. At 20px with wobble filters, pieces are difficult to distinguish from each other. The queen's shorter viewBox means it renders at a different visual scale. Mobile overlay icons are also oversized relative to spec.

---

### Piece-to-Route Mapping (BaseLayout.astro L57–63)

| Route          | Label      | Piece  | Spec Piece              | Match?                         |
| -------------- | ---------- | ------ | ----------------------- | ------------------------------ |
| `/`            | Home       | —      | ♔ King                  | ❌ Missing from implementation |
| `/projects`    | Work       | knight | ♘ Knight                | ✅                             |
| `/experience`  | Experience | rook   | ♖ Rook                  | ✅                             |
| `/research`    | Research   | bishop | ♗ Bishop                | ✅                             |
| `/posts`       | Writing    | pawn   | ♙ Pawn                  | ✅                             |
| `/experiments` | Lab        | queen  | ♕ Queen                 | ✅                             |
| `/about`       | About      | none   | None                    | ✅                             |
| `/contact`     | Contact    | none   | None                    | ✅                             |
| `/search`      | Search     | none   | None (spec: Alt+K hint) | ⚠️ Hint intentionally deferred |

**Verdict:** Implemented routes map correctly, but Home is missing entirely (spec wireframe §5.1 places it at the top of Group 1). The Search `(Alt+K)` hint is deliberately **not** added — no such shortcut exists in the codebase; the hint is deferred until one does.

---

### Touch Targets (BaseLayout.astro L252)

| Measurement                               | Value                                              | Minimum (Spec §5.8) | Compliant?    |
| ----------------------------------------- | -------------------------------------------------- | ------------------- | ------------- |
| Link padding (vertical)                   | `py-1.5` = 6px top + 6px bottom                    | —                   | —             |
| Text height (13px mono, ~1.5 line-height) | ~20px                                              | —                   | —             |
| Total clickable height                    | ~32px                                              | 44px                | ❌ 12px short |
| Gap between links                         | `gap-2.5` = 10px (on parent `<ul>`, not clickable) | —                   | —             |

**Verdict:** Actual clickable height is ~32px — 12px below the spec's 44px minimum. (Note: WCAG 2.2 AA SC 2.5.8 requires only 24px, so the current state passes AA and axe-core will not flag it; 44px is the spec's stricter house rule. The fix is spec-driven, not test-enforced.)

---

### Spacing & Rhythm (BaseLayout.astro L220–287)

| Element                      | Value                           | Notes                                              |
| ---------------------------- | ------------------------------- | -------------------------------------------------- |
| Sidebar width                | `w-56` = 224px                  | Matches spec ✅                                    |
| Sidebar padding              | `px-7 py-8` = 28px / 32px       | Matches spec ✅                                    |
| Right border                 | `border-r-structural` = 2.5px   | Matches spec ✅                                    |
| Header divider margin        | `my-6` = 24px top + 24px bottom | Symmetric                                          |
| Nav group gap                | `gap-4` = 16px                  | Matches spec ✅                                    |
| Link gap (within group)      | `gap-2.5` = 10px                | Matches spec ✅                                    |
| Link left padding            | `pl-6` = 24px                   | Accommodates active marker                         |
| Footer top margin            | `mt-6` = 24px                   | Footer already bottom-pinned: `<nav>` has `flex-1` |
| Footer divider bottom margin | `mb-6` = 24px                   | Same as header                                     |
| Copyright top margin         | `mt-4` = 16px                   | —                                                  |

**Verdict:** All spacing matches spec values. However, the uniform 24px margins at header and footer create monotonous rhythm — no asymmetric hierarchy. Note: the footer needs no `mt-auto` change — the `flex-1` nav already pushes it to the bottom of the flex-column aside.

---

### Typography (BaseLayout.astro L252–255)

| Aspect          | Value                          | Notes                                    |
| --------------- | ------------------------------ | ---------------------------------------- |
| Font family     | `font-mono` (JetBrains Mono)   | Matches spec ✅                          |
| Font size       | `text-[13px]`                  | Matches spec ✅                          |
| Default weight  | `font-medium` (500)            | —                                        |
| Active weight   | `font-semibold` (600)          | 500→600 shift barely perceptible in mono |
| Letter-spacing  | Not set                        | No `tracking-*` class on nav links       |
| Brand name font | `font-display` (Fraunces WONK) | Matches spec ✅                          |
| Brand name size | `text-h4` (clamp 20–24px)      | —                                        |

**Verdict:** Typography matches spec but lacks letter-spacing for small-size mono legibility. The weight difference between states is theoretically correct but visually minimal.

---

### Focus States

| Element               | Focus Style                                                                 | Spec Requirement             | Compliant? |
| --------------------- | --------------------------------------------------------------------------- | ---------------------------- | ---------- |
| Desktop nav links     | **None explicit** (browser default outline)                                 | `ring-focus` 2px, offset 2px | ❌         |
| Mobile hamburger      | `focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2` | Same                         | ✅         |
| Mobile close button   | `focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2` | Same                         | ✅         |
| Theme toggle (Button) | `focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2` | Same                         | ✅         |
| Skip link             | `focus:outline focus:outline-2 focus:outline-offset-2`                      | —                            | ✅         |

**Verdict:** Desktop sidebar nav links are missing explicit focus-visible styles. Keyboard users see only the browser's default outline, which may not meet the 2px ring spec.

---

### Theme Toggle (ThemeToggle.astro)

| Aspect          | Value                                                          | Notes                                                   |
| --------------- | -------------------------------------------------------------- | ------------------------------------------------------- |
| Icons           | Lucide `Sun` / `Moon`                                          | Geometric/modern — contrasts with hand-drawn chess SVGs |
| Size            | `h-5 w-5` = 20px                                               | —                                                       |
| Button size     | `h-10 w-10` = 40px                                             | Below 44px spec minimum                                 |
| Variant         | `ghost` (transparent bg, border on hover)                      | —                                                       |
| Hover animation | `group-hover:rotate-12` (moon) / `group-hover:rotate-45` (sun) | Playful, restrained ✅                                  |
| Shape           | `rounded-full`                                                 | Circular                                                |

**Verdict:** Functional but uses foreign icon language (Lucide geometric vs. hand-drawn wobble). Button is 40px, slightly below 44px touch target spec.

---

### Logo (Logo.astro)

| Aspect            | Value                         | Notes                   |
| ----------------- | ----------------------------- | ----------------------- |
| Sidebar size      | `size-8` = 32px               | Matches spec ✅         |
| Mobile size       | `size-7` = 28px               | —                       |
| Light mode fill   | `fill: #ffffff` (hardcoded)   | White silhouette        |
| Light mode stroke | `stroke: currentColor`        | Adapts to text color ✅ |
| Dark mode fill    | `fill: #ffffff` (hardcoded)   | Same white — no change  |
| Dark mode stroke  | `stroke: #0d0d0f` (hardcoded) | Should use token        |
| Dark mode details | `stroke: #0d0d0f` (hardcoded) | Should use token        |
| Dark mode eye     | `fill: #0d0d0f` (hardcoded)   | Should use token        |

**Verdict:** Logo works visually but dark-mode colors are hardcoded rather than token-driven (verified in the component's `<style>` block). At 32px, the fine hatch lines (1.3px in 200×388 viewBox → ~0.2px rendered) are invisible.

---

### Group Dividers (BaseLayout.astro L237–238)

| Aspect            | Code                                   | Screenshot                                | Notes           |
| ----------------- | -------------------------------------- | ----------------------------------------- | --------------- |
| Divider placement | Between groups only (`groupIndex > 0`) | Shows divider after EVERY item in Group 1 | ⚠️ Discrepancy  |
| Divider weight    | `h-[var(--stroke-hatch)]` = 1.3px      | Thin lines visible                        | Matches spec ✅ |
| Divider color     | `bg-border-custom`                     | —                                         | Matches spec ✅ |
| Divider width     | `w-full` (full sidebar minus padding)  | —                                         | Matches spec ✅ |

**Verdict:** Code renders 2 inter-group dividers (between Group 1→2 and Group 2→3) plus 1 header divider and 1 footer divider. The screenshot shows additional intra-group dividers — this is either an older build or a design reference that doesn't match current code.

---

### Accessibility Attributes

| Requirement                               | Status     | Location                    |
| ----------------------------------------- | ---------- | --------------------------- |
| `<nav aria-label="Main navigation">`      | ✅ Present | BaseLayout L233             |
| `aria-current="page"` on active link      | ✅ Present | BaseLayout L257             |
| Active marker `aria-hidden="true"`        | ✅ Present | BaseLayout L260             |
| Decorative dividers `aria-hidden="true"`  | ✅ Present | BaseLayout L231, L238, L281 |
| Skip link → `#main-content`               | ✅ Present | BaseLayout L134–138         |
| Mobile: `aria-expanded` + `aria-controls` | ✅ Present | BaseLayout L156–157         |
| Mobile: focus trap                        | ✅ Present | BaseLayout L314+ (script)   |
| Mobile: `Escape` to close                 | ✅ Present | BaseLayout script           |
| Icon spacers `aria-hidden="true"`         | ✅ Present | BaseLayout L267             |

**Verdict:** ARIA implementation is solid. The gap is in _visual_ focus indication (missing focus-visible ring on desktop links), not in semantic accessibility.

---

## Improvement Opportunities (Ranked)

| #   | Opportunity                                                                           | Impact | Difficulty | Priority              | Status       |
| --- | ------------------------------------------------------------------------------------- | ------ | ---------- | --------------------- | ------------ |
| 1   | Active state: simplified stroke-only knight SVG at 12px replaces pawn marker          | High   | Medium     | P0                    | ✅ Completed |
| 2   | Add explicit `focus-visible:ring-2` to desktop nav links                              | High   | Low        | P0                    | ✅ Completed |
| 3   | Increase touch targets to ≥44px (`min-h-[44px]` + `items-center`)                     | High   | Low        | P0                    | ✅ Completed |
| 4   | Add missing Home link (♔ king piece) via CMS data + sidebar groups                    | Medium | Low        | P1 (ships in Phase A) | ✅ Completed |
| 5   | Icon system: simplified stroke-only SVGs for remaining pieces, no filters at nav size | High   | Medium     | P1                    | ✅ Completed |
| 6   | Icon sizes: desktop 20px → 15px, mobile 24px → 18px (or document deviation)           | Medium | Low        | P1                    | ✅ Completed |
| 7   | Add letter-spacing (`tracking-wide`) to nav labels                                    | Low    | Low        | P2                    | ✅ Completed |
| 8   | Asymmetric spacing rhythm (looser header divider)                                     | Medium | Low        | P2                    | ✅ Completed |
| 9   | Hover micro-interaction: icon `translateX(1px)`                                       | Medium | Low        | P2                    | ✅ Completed |
| 10  | Section labels (tiny uppercase group names) — spec amendment, not in §5               | Medium | Low        | P2                    | ✅ Completed |
| 11  | Divider differentiation (chessboard strip for primary group)                          | Low    | Low        | P3                    | ✅ Completed |
| 12  | Replace Lucide Sun/Moon with hand-drawn theme toggle icons                            | Medium | Medium     | P3                    | ✅ Completed |
| 13  | Footer colophon watermark (40px knight at 20% opacity)                                | Low    | Low        | P3                    | ✅ Completed |
| 14  | Logo dark-mode: replace hardcoded hex with tokens                                     | Low    | Low        | P3                    | ✅ Completed |
| 15  | Mobile overlay: staggered link entry + graceful exit animation                        | Low    | Medium     | P3                    | ✅ Completed |

**Removed:** the `(Alt+K)` Search hint (former item #14) — dropped per Resolved Decision 2.

---

## Implementation Roadmap

### Phase A — Active State, Accessibility & Nav Structure (P0)

- **Objective:** Make the active page unmistakable and spec-compliant; fix focus-visible and touch targets; restore the missing Home route
- **Files:** `src/layouts/BaseLayout.astro`, new `src/assets/chess-nav/knight.svg`, `.keystatic/data/navigation.json`
- **Changes:**
  - Create a simplified stroke-only knight SVG: 24×24 viewBox, `currentColor` stroke, no wobble/grain filters, bold silhouette with exaggerated ear/snout. Stroke-width guide: `stroke_viewBox ≈ 1.6 × 24 ÷ render_px` (≈3.2 units → 1.6px rendered at 12px; a single value in the 2.5–3.2 range is acceptable across 12–15px usage — fine-tune visually)
  - Replace the active pawn marker with the new knight at `size-3` (12px); keep `absolute left-0` centering and `pl-6`
  - **No left bar, no pill** — spec §5.3: knight marker only
  - Add `focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2` to desktop nav links
  - Replace `py-1.5` with `min-h-[44px] items-center` on desktop nav links (vertical centering preserved by flex)
  - Add Home link: `{ label: "Home", href: "/" }` entry in `navigation.json`; prepend `"/"` to Group 1 in `groupHrefs` (`["/", "/projects", "/experience", "/research"]` — spec wireframe places Home at the top of Group 1); add `"/": "king"` to `pieceByHref`
  - Mobile overlay picks up Home automatically (it renders all visible CMS links)
- **Risk:** Simplified knight must stay legible at 12px — test at target size before proceeding. Optionally add Home to the link list in `tests/e2e/navigation.spec.ts`
- **Verification:** Batched with Phases C + D (see Verification Protocol)
- **Status:** ✅ Completed

### Phase B — Icon System Refinement (P1)

- **Objective:** Make chess pieces distinguishable at nav-icon size; unify on `currentColor` single-render
- **Files:** new `src/assets/chess-nav/*.svg`, `src/components/navigation/ChessIcons.astro`, `src/layouts/BaseLayout.astro`
- **Changes:**
  - Create simplified stroke-only SVGs for king, rook, bishop, pawn, queen at 24×24 viewBox (knight already shipped in Phase A), normalized to a uniform aspect ratio
  - `currentColor` stroke, no filters; exaggerate distinguishing features (bishop mitre, rook crenellations, queen crown points)
  - Rewrite `ChessIcons.astro` to single-render the new set — removes the `dark:hidden` / `hidden dark:flex` dual spans (halves DOM nodes; icons auto-invert per §5.7)
  - Resize desktop icons `size-5` (20px) → 15px per spec §5.3; mobile overlay `size-6` (24px) → 18px per spec §5.6 (or document an intentional deviation)
  - Full-detail filtered SVGs in `src/assets/chess/` remain for large-size usage
- **Risk:** New SVGs may lose hand-drawn character; test at target sizes in both themes
- **Verification:** Full suite
- **Status:** ✅ Completed

### Phase C — Spacing & Typography Polish (P2)

- **Objective:** Improve vertical rhythm and mono legibility
- **Files:** `src/layouts/BaseLayout.astro`
- **Changes:**
  - Add `tracking-wide` to nav link class
  - Adjust header divider margin: `my-6` → `mt-8 mb-6` (looser top)
  - Footer: no `mt-auto` change (already bottom-pinned via `flex-1` nav); optionally tighten `mb-6` → `mb-4` on the footer divider if the rhythm still reads loose
  - Keep `pl-6` (active marker remains a piece icon)
- **Risk:** Minor; verify E2E locators still match
- **Verification:** Batched with Phases A + D
- **Status:** ✅ Completed

### Phase D — Hover & Micro-Interactions (P2)

- **Objective:** Add tactile feedback on hover; reinforce chess "movement" language
- **Files:** `src/layouts/BaseLayout.astro`, `src/styles/global.css`
- **Changes:**
  - Add `hover:translate-x-px` to chess icon wrapper (1px nudge)
  - Gate behind `prefers-reduced-motion: reduce` (disable transform)
  - Theme toggle: add `active:scale-[0.92]` press feedback
- **Risk:** Sub-pixel blurring on non-retina; use `translate3d` for GPU compositing
- **Verification:** Batched with Phases A + C
- **Status:** ✅ Completed

### Phase E — Section Labels & Dividers (P2–P3)

- **Objective:** Reinforce group identity; add chessboard strip to primary divider
- **Files:** `src/layouts/BaseLayout.astro`, `src/components/primitives/DividerChessboard.astro`
- **Changes:**
  - Add 10px uppercase mono labels above groups (e.g., "WORK" / "WRITING" / "META")
  - Replace first inter-group divider with DividerChessboard component
  - Add `@media (max-height: 768px)` to hide labels on short viewports
- **Note:** Group labels are **not** in WoodcutTheme §5 — adopting them is a spec amendment. If kept, update `WoodcutTheme.md` §5.1 to document them
- **Risk:** Labels add vertical height; may overflow on short screens
- **Verification:** Full suite
- **Status:** ✅ Completed

### Phase F — Theme Toggle & Footer (P3)

- **Objective:** Unify icon language; add colophon bookend
- **Files:** `src/components/navigation/ThemeToggle.astro`, new SVG assets, `src/layouts/BaseLayout.astro`
- **Changes:**
  - Replace Lucide Sun/Moon with hand-drawn equivalents (wobble style, 20px)
  - Add 40px knight watermark at 20% opacity above footer divider
  - Increase toggle button from `h-10 w-10` → `h-11 w-11` (44px)
- **Risk:** Custom SVGs must maintain recognizability at 20px
- **Verification:** Full suite
- **Status:** ✅ Completed

### Phase G — Logo & Dark Mode Tokens (P3)

- **Objective:** Tokenize logo dark-mode colors; optimize for small render
- **Files:** `src/components/primitives/Logo.astro`
- **Changes:**
  - Replace `#0d0d0f` hardcoded values with `var(--color-surface-raw)` (verified hardcoded in the component `<style>` block)
  - Consider a simplified 32px-optimized variant (fewer hatch lines)
- **Risk:** Changes affect all Logo usages (mobile bar, sidebar, mobile overlay); scope carefully
- **Verification:** Full suite
- **Status:** ✅ Completed

### Phase H — Mobile Overlay Polish (P3)

- **Objective:** Graceful exit animation; staggered link entry
- **Files:** `src/layouts/BaseLayout.astro`, `src/styles/global.css`
- **Changes:**
  - Add exit keyframe (opacity 1→0, translateY 0→4px, 200ms)
  - Add per-link `animation-delay: calc(var(--i) * 30ms)` on entry
  - JS: delay `hidden` attribute removal until exit animation completes
  - Respect `prefers-reduced-motion`
- **Scope note:** This is the only mobile-overlay phase; mobile icon sizing is handled in Phase B
- **Risk:** Exit animation requires careful JS timing; test on slow devices
- **Verification:** Full suite
- **Status:** ✅ Completed

---

## Screenshot vs. Code Discrepancy

The provided visual reference shows horizontal dividers after **every item** in the first group (Work, Experience, Research each followed by a line). However, the current code (`BaseLayout.astro` L237–238) only renders dividers **between groups** (2 total inter-group dividers).

**Possible explanations:**

1. Screenshot is from an older build with different grouping logic
2. Screenshot is a design reference/mockup, not a live capture
3. Visual misinterpretation of spacing as dividers

**Action:** Verify by running `pnpm dev` and capturing the actual rendered state before implementation begins.

---

## Verification Protocol

Batched per Resolved Decision 4 — 6 full runs instead of 8:

| Checkpoint | Phases Covered | Rationale                                                                      |
| ---------- | -------------- | ------------------------------------------------------------------------------ |
| 1          | A + C + D      | All small `BaseLayout.astro` class/structure changes; one run covers the batch |
| 2          | B              | New SVG assets + ChessIcons rewrite; visual regression risk                    |
| 3          | E              | Layout height changes (labels)                                                 |
| 4          | F              | New SVG assets (theme toggle)                                                  |
| 5          | G              | Global Logo component changes                                                  |
| 6          | H              | JS timing changes (exit animation)                                             |

Each run executes the full suite in order:

```
npx pnpm run format
npx pnpm run lint
npx pnpm run check
npx pnpm run build
npx pnpm run test:e2e
npx pnpm run test:a11y
```

All gates must pass before proceeding to the next checkpoint.

---

## File Inventory

| File                                                | Role                                        | Phases Affected                                                |
| --------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------- |
| `src/layouts/BaseLayout.astro`                      | Sidebar shell, nav links, groups, footer    | A, B (icon sizes), C, D, E, F, H                               |
| `.keystatic/data/navigation.json`                   | Keystatic navigation singleton (link data)  | A (Home entry)                                                 |
| `src/assets/chess-nav/*.svg`                        | New simplified stroke-only piece set        | A (knight), B (remaining pieces)                               |
| `src/components/navigation/ChessIcons.astro`        | Chess piece icon renderer                   | B                                                              |
| `src/assets/chess/*.svg`                            | Full-detail chess piece SVGs (12 files)     | — (retained for large-size usage)                              |
| `src/components/navigation/ThemeToggle.astro`       | Theme toggle button                         | F                                                              |
| `src/components/primitives/Logo.astro`              | Goat-knight brand mark                      | G                                                              |
| `src/components/primitives/DividerChessboard.astro` | Chessboard strip divider                    | E                                                              |
| `src/styles/global.css`                             | Utility classes, keyframes, motion rules    | D, H                                                           |
| `src/styles/tokens.css`                             | Design tokens (stroke weights, transitions) | — (reference only)                                             |
| `tests/e2e/navigation.spec.ts`                      | Navigation E2E tests                        | A (verify locators; optionally add Home)                       |
| `tests/accessibility/a11y.spec.ts`                  | Accessibility audits                        | A (touch targets — note: 44px is spec rule, axe enforces 24px) |
