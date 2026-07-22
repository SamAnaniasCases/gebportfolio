# Chess Icon Design System

<callout icon="♞">**Status:** Active · **Owner:** Gen · **Last Reviewed:** 2026-07-22</callout>

The official specification for the Chess Icon Design System in the personal portfolio project.

---

## 1. Overview & Purpose

The Chess Icon Design System establishes a unified, thematic iconography language inspired by chess notation, board diagrams, piece silhouettes, and game evaluation symbols. It serves two primary icon asset categories:

1. **Navigation & UI Glyphs (`src/assets/chess-nav/`)**: Monochrome stroke-based SVGs using `currentColor` that scale cleanly down to 15px/18px and adapt to light/dark themes.
2. **Move Evaluation & Status Badges (`src/assets/chess-icons/`)**: Colored circular badges based on standard chess move annotations (brilliant `!!`, great `!`, best `★`, good `👍`, correct `✓`, book `📖`, inaccuracy `?!`, mistake `?`, blunder `✗`, miss `??`).

---

## 2. Active Navigation Indicator Rule

- The primary navigation active marker in `src/layouts/BaseLayout.astro` uses the **Correct** (`correct.svg`) badge icon to denote the currently active page.
- Sidebar route items render their assigned chess piece (`king`, `knight`, `rook`, `bishop`, `pawn`, `queen`) at 15px desktop / 18px mobile from `src/assets/chess-nav/`.

---

## 3. Move Evaluation Badges Specification (`src/assets/chess-icons/`)

All move evaluation badges share the following technical structure:
- **ViewBox**: `0 0 24 24`
- **Background Shape**: `<circle cx="12" cy="12" r="11" fill="[HEX_COLOR]" />`
- **Foreground Glyphs**: White (`fill="white"` or `stroke="white"`), centered within the badge.

### Palette & Notation Inventory

| Badge Name | File | Notation Symbol | Palette Color | Hex Value | Meaning / Usage |
|---|---|---|---|---|---|
| **Brilliant** | `brilliant.svg` | `!!` | Teal | `#3bb5a0` | Exceptional, creative accomplishment or standout project |
| **Great** | `great.svg` | `!` | Blue | `#4a90c2` | High-impact achievement or featured article |
| **Best** | `best.svg` | `★` | Engine Green | `#66b833` | Preferred solution or optimal tech choice |
| **Good** | `good.svg` | `👍` | Leaf Green | `#5eb85e` | Solid execution or positive outcome |
| **Correct** | `correct.svg` | `✓` | Sage Green | `#8ec440` | Active route indicator, verified test/gate |
| **Book** | `book.svg` | `📖` | Theory Brown | `#a18860` | Standard documentation or reference material |
| **Inaccuracy** | `inaccuracy.svg` | `?!` | Gold / Yellow | `#f0b830` | Suboptimal pattern or caution flag |
| **Mistake** | `mistake.svg` | `?` | Orange | `#e88835` | Deprecated approach or known limitation |
| **Blunder** | `blunder.svg` | `✗` | Coral Red | `#e56b5b` | Major failure, breaking change, or error state |
| **Miss** | `miss.svg` | `??` | Dark Red | `#c23535` | Critical issue or missed opportunity |

---

## 4. Navigation Piece Icon Specification (`src/assets/chess-nav/`)

Used strictly inside navigation links (`ChessIcons.astro` and `BaseLayout.astro`):
- **ViewBox**: `0 0 24 24`
- **Stroke**: `currentColor` (auto-inverts between Light and Dark mode)
- **Stroke Width**: `2.5px`
- **Linecap / Linejoin**: `round`
- **Fill**: `none` (except minimal accent dots e.g., eye or crown jewel)

### Piece Route Mapping

| Route | Piece SVG | Meaning |
|---|---|---|
| `/` | `king.svg` | Home — King of the board |
| `/projects` | `knight.svg` | Projects — Tactical maneuver / signature piece |
| `/experience` | `rook.svg` | Experience — Solid structural foundation |
| `/research` | `bishop.svg` | Research — Diagonal insight / deep study |
| `/posts` | `pawn.svg` | Posts — Incremental steps / writing |
| `/experiments` | `queen.svg` | Experiments — Versatile exploration |

---

## 5. Directory Structure & Organization

```
src/assets/
├── brand/          # Logo assets & brand SVGs
├── chess/          # Detailed woodcut piece engravings (full illustrations)
├── chess-icons/    # Move evaluation badges & status icons
├── chess-nav/      # Simplified 24x24 stroke SVGs for sidebar navigation
└── theme-icons/    # Sun/Moon mode toggle icons
```

---

## 6. Verification & Standards Checklist

- [x] All SVGs formatted with clean, un-nested elements and `aria-hidden="true"`.
- [x] All relative markdown links in documentation pass `npx pnpm run check-links`.
- [x] Verification suite passes (`format`, `lint`, `check`, `build`).
