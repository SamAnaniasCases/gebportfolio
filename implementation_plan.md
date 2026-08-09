# Implementation Plan

Redesign the "02. Core Mindset & Principles" section on the home page into a horizontal slideshow/carousel with a 3D chess pawn indicator that moves between slides.

The existing `CoreMindset.astro` renders 5 principles as a static CSS grid of cards. This redesign replaces it with an interactive React component that horizontally arranges the same 5 principles as slides, highlights the active slide, and animates a 3D chess pawn between slide positions. The slideshow uses smooth CSS transitions, supports keyboard/mouse/touch navigation, and the pawn movement feels synchronized with the slide transition via matched easing curves. The chess pawn is rendered as a CSS 3D-transformed SVG (reusing the existing woodcut pawn artwork) to match the portfolio's woodcut/engraving visual theme.

[Types]

One new TypeScript interface and one new React Props type are introduced.

`MindsetPrinciple` (already defined in `CoreMindset.astro` — will be extracted into a shared type):

```typescript
interface MindsetPrinciple {
  id: string;
  number: string;
  badge: string;
  title: string;
  summary: string;
  description: string;
}
```

`CoreMindsetCarouselProps` (new):

```typescript
interface CoreMindsetCarouselProps {
  principles: MindsetPrinciple[];
}
```

No changes to existing types, enums, or data structures.

[Files]

One new file created, one existing file modified.

**New files:**

- `src/components/sections/CoreMindsetCarousel.tsx` — React component containing the entire carousel: slides, navigation controls (prev/next buttons, dot indicators), 3D pawn indicator, and all animation logic.

**Modified files:**

- `src/components/sections/CoreMindset.astro` — Replace the `<Grid>` card layout with a client:only React wrapper that mounts `<CoreMindsetCarousel>` with the same `principles` data. The Astro frontmatter and data array remain untouched.
- `src/pages/index.astro` — No changes needed (already imports `CoreMindset`).

**Files to delete/move:** None.

[Functions]

**New functions:**

- `CoreMindsetCarousel` (React.FC, `src/components/sections/CoreMindsetCarousel.tsx`) — Main component. Manages `activeIndex` state, renders slides in a horizontal scroll container, prev/next buttons, dot indicators, and the 3D pawn.

Internal helper logic (inlined, not exported):

- `goToSlide(index: number)` — Sets active index, used by prev/next buttons, dot clicks, and keyboard events.
- `goToPrev()` / `goToNext()` — Wrappers that clamp within [0, principles.length-1].
- `getPawnPosition(index: number)` — Maps slide index to a percentage `left` value for the pawn's horizontal position.
- `handleKeyDown(e: React.KeyboardEvent)` — Handles ArrowLeft/ArrowRight/Home/End keys on the carousel container.

**Modified functions:** None.

**Removed functions:** None.

[Classes]

No new classes. The component uses TailwindCSS utility classes exclusively. Key CSS patterns:

- `.transition-all` + `.duration-500` + `.ease-out` for slide transitions
- `.scale-100` / `.scale-90` + `.opacity-100` / `.opacity-50` for active/inactive slide emphasis
- `.transition-[left]` with `duration-700` `ease-in-out` for pawn movement (slightly slower than slide for a lag-follow effect)
- `perspective-[1200px]` + `rotateX(58deg)` on the pawn container for 3D tilt (matching `sceneConfig.ts` CAMERA values)
- `transform-style-3d` for the pawn's 3D space

[Dependencies]

No new npm packages. The component leverages:

- `react` (already in `package.json`)
- `@astrojs/react` (already in `astro.config.ts` for client:only)
- Existing chess pawn SVGs from `ChessIcons.astro` or direct `?raw` imports of `src/assets/chess/white-pawn.svg` / `src/assets/chess-nav/pawn.svg`
- `DoodleIcon` (for arrow navigation icons, already imported in the project)

[Testing]

**New test file:** `tests/e2e/core-mindset-carousel.spec.ts`

Test cases:

1. Renders 5 principles as slides.
2. First slide is active on load (has visual emphasis class).
3. Clicking "next" advances to slide 2 (slide 1 becomes inactive, slide 2 is active).
4. Clicking "prev" on slide 2 returns to slide 1.
5. Clicking a dot indicator jumps to the corresponding slide.
6. ArrowRight key advances, ArrowLeft key goes back.
7. Pawn element is present and its `left` style changes on slide change.
8. Responsive: on mobile viewport, slides are partially visible with the active slide centered.

[Implementation Order] I will do this manually

1. Create `src/components/sections/CoreMindsetCarousel.tsx` with the full carousel implementation.
2. Modify `src/components/sections/CoreMindset.astro` to replace the `<Grid>` with a `<CoreMindsetCarousel client:only="react" />` wrapper, importing the React component and passing the `principles` array.
3. Run the format/lint/check/build verification suite.
4. Create `tests/e2e/core-mindset-carousel.spec.ts` with the test cases above.
5. Run `pnpm run test:e2e` to verify tests pass.
6. Run `pnpm run test:a11y` to verify accessibility.
