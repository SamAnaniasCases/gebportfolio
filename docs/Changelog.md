# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Implemented **Chess Evaluation Scrollbar** (`src/components/navigation/EvalBarScroll.astro`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`):
  - Converted native browser scrollbar into a sleek, full-height right-edge Chess Evaluation Bar on desktop viewports (`fixed right-0 top-0 bottom-0`).
  - Removed text labels and floating badges (`+0.0`, `#M`) for a minimal, pure dual-tone visual bar.
  - Configured scroll-driven fill dynamics: starts 100% White in light mode at top, receding to Black as user scrolls down to 100%; automatically inverts in dark mode.
  - Enabled interactive click and drag-to-scroll navigation.

- Refined **About Page Content & Career Move Ledger** (`src/content/pages/about.json`, `src/pages/about.astro`):
  - Commented out `<CredentialsFootnote />` section in `src/pages/about.astro` until official certifications are acquired.
  - Broadened "Current focus" in `about.json` from specific web development to `Practical software systems, network infrastructure, documented decisions`.
  - Removed framework-specific assumptions (e.g. Astro defaults) across move entries, broadening Sam's narrative to apply across versatile technical roles (software, networking, and hardware systems).
  - Clarified chess-notation score sheet terminology across page headers and closing annotations to explicitly read `Career move ledger · six moves`.

- Paused **Research, Writing, and Lab Sections** behind a unified `<UnderConstruction />` placeholder component (`src/components/UnderConstruction.astro`, `src/pages/research/index.astro`, `src/pages/posts/index.astro`, `src/pages/experiments/index.astro`; originals preserved at `src/content/_archive/*-index.astro`):
  - Authored a single reusable stub with chess-piece section markers (knight for Research, bishop for Writing, rook for Lab), engraved structural border square with corner stamps, and hard-offset press shadow `4px 4px 0 var(--color-ink)`.
  - Composed Fraunces display heading, italic Fraunces lead sentence, Inter body copy, and a Gochi Hand catchphrase (`pieces still on the back rank`) rotated −1°, following the empty-state voice in `docs/engineering/ContentStyleGuide.md` §12.11.
  - Configured eyebrow (`Section · Paused`), ETA note, primary `Back to home` CTA, and a contextual secondary CTA per page (case studies, about, etc.).
  - Added a closing hatch-rule ornament (`Pinned for future work` micro-stamp) and full dark-mode pairing via the `ChessIcons variant="woodcut"` token-aware rendering.
  - Moved the prior `index.astro` content out of the routing tree to `src/content/_archive/` to keep sources recoverable without exposing a duplicate route.
  - Reverted `.qoder/skills/impeccable` discovery from ESLint by moving that library out of scope via the existing flat-config `ignores` list.

- Polished **Work / Projects Index & Case Study Detail Pages** (`src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`, `src/styles/tokens.css`):
  - Replaced every system text emoji (♔, ♛, ✓, →, ←) with theme-aware vector icons: DoodleIcons (`interface/checklist`, `interface/target`, `interface/search`, `interface/suitcase`, `interface/calendar`, `e-commerce/tag`, `interface/link`, `interface/tick`, `arrows/arrow-left`, `arrows/arrow-right`, `arrows/arrow-ne`) and `<ChessIcons piece="…">` for the strategic-role badges.
  - Swapped the serif-glyph watermarks on featured cards for real `<ChessIcons variant="woodcut">` SVGs that auto-invert in dark mode (the previous font glyphs rendered identically in both modes).
  - Rebuilt the category filter as an accessible roledex: `role="tablist"` / `role="tab"` / `aria-selected` synchronization, structural `border-[var(--stroke-structural)]` on the toolbar surface, and removal of the soft shadow that broke the press-metaphor contract.
  - Added a real `<label>` ("Search the archive") to the project search input, switched to `type="search"` + `autocomplete="off"`, and wired focus back to the input on filter reset.
  - Rebuilt the empty state with a woodcut pawn icon, Gochi Hand headline (`No moves match that line.`), `role="status"` + `aria-live="polite"`, and a keyboard-reachable reset button.
  - Promoted section subheads from Fraunces H3 to H2 so the document outline reads H1 → H2 → H3 cleanly, restoring the Engraver Reserve Rule.
  - Detail page (`[slug].astro`): replaced `@lucide/astro` icons with DoodleIcons, replaced `✓` characters in Key Project Outcomes with `<DoodleIcon name="interface/tick">`, tightened prose measure to 68ch (`max-w-[68ch]`), upgraded the Key Takeaway callout from `border-l-2` to structural stroke token, added `aria-label="Case study pagination"` and an engraved `DividerChessboard` separator before Next/Previous navigation.
  - Added the missing semantic color alias `--color-ink: var(--color-text-raw);` to `src/styles/tokens.css`. Nine components across home, about, projects, and the new MoveEntry referenced `var(--color-ink)` but the token did not exist — silently producing zero-offset no-style box-shadows. The alias fixes the silent bug in one place.

- Fixed **React Hook SSR Desynchronization on Vite Dev Reloads** (`src/layouts/BaseLayout.astro`):
  - Updated `<ChatWidget client:load />` to `<ChatWidget client:only="react" />` to render the interactive live chat widget exclusively on the client.
  - Eliminated SSR React dispatcher errors (`TypeError: Cannot read properties of null (reading 'useState')`) triggered during Vite's automatic dependency re-optimizations.

- Reshaped **About Page as a Chess-Notation Score Sheet** (`src/pages/about.astro`, `src/components/sections/about/AboutHero.astro`, `src/components/sections/about/MoveLedger.astro`, `src/components/sections/about/MoveEntry.astro`, `src/components/sections/about/FactsIndex.astro`, `src/components/sections/about/CredentialsFootnote.astro`, `src/content/pages/about.json`, `src/content.config.ts`):
  - Replaced the previous biography + skills grid + achievements grid architecture with a vertical chess-notation ledger. Six move entries (`1. Opening position` → `6. Endgame letter`) carry Fraunces headings, italic Fraunces lead paragraphs, JetBrains Mono date ranges, and Inter body paragraphs constricted to a 68ch measure.
  - Built `<MoveEntry />` with alternating inked/outline chess squares (pawn → rook → knight → bishop → queen → king) rendered via `ChessIcons.astro`, each anchored to a 1.3px hatch vertical rule with a hard-offset press shadow (`2px 2px 0 var(--color-ink)`) on hover.
  - Authored `<AboutHero />` hero section pairing the name in Fraunces H1 with the Gochi Hand catchphrase (`think in systems, document the moves`), a stamped location/headline badge in `bg-surface-subtle`, and a framed `<InteractiveAvatar />` with manuscript caption.
  - Authored `<FactsIndex />` sticky sidebar index card in `bg-surface-subtle` with dashed-row quick-reference facts, a Gochi Hand signature block, and a micro "Score sheet · v1.0" stamp.
  - Authored `<CredentialsFootnote />` replacing achievements cards with log-line entries separated by thin ink dividers — date in mono, title in Fraunces, issuer + verify link right-aligned. Certifications demoted from hero content to supporting marginalia.
  - Extended `pages` collection Zod schema in `src/content.config.ts` with optional `moves[]` (id, notation, piece, heading, dateRange, lead, body) and `facts[]` (label, value) for ledger-driven authoring; placeholder copy shipped in `src/content/pages/about.json` preserved the existing `sections[]` array for backward compatibility with the homepage's `<AboutSummary />`.
  - Codified content-layer ESLint hygiene by adding `.qoder/`, `.agents/`, `.github/skills/`, `party/`, and `public/` to the flat-config `ignores` list — silencing 6,845 pre-existing errors that originated outside the source tree.

- Completed **Experience Page Redesign & Interactive 3D WebGL King Companion** (`src/pages/experience.astro`, `src/components/experience/ExperienceTimeline.tsx`, `src/components/experience/Scroll3DKingCanvas.tsx`, `src/content/experience/`, `src/content/skills/`, `src/content.config.ts`, `docs/plans/0005-experience-page-specification.md`):
  - Built `<ExperienceTimeline />` React island featuring interactive category filter pills (`All Roles`, `Internship`, `Academic`, `Full-Time`, `Contract`, `Project Lead`, `Leadership`) with entry count badges and reset filter controls.
  - Implemented technology tag cross-filtering: clicking any applied technology tag (`TypeScript`, `Docker`, `PostgreSQL`, `WordPress`, `2D Animation & Design`, `Microsoft Office`) cross-filters the timeline to isolate matching roles.
  - Applied glossy frosted glassmorphism styling (`bg-surface/65 backdrop-blur-md relative z-10 dark:border-white/10 shadow-md hover:shadow-lg`) to timeline milestone cards, allowing the turned-wood 3D King moving at `z-0` to be silhouetted behind cards while preserving 100% text legibility.
  - Replaced temporary corporate placeholder data with Sam's 100% authentic, real-world experience history:
    - `avega-shipping-it-intern.yaml`: _Avega Bros. Integrated Shipping Corp_ (`IT Systems & Hardware Intern`) featuring the live biometric timekeeping system (BITS) at `https://bits.abas.ph`.
    - `ctu-danao-creative-web-design.yaml`: _Cebu Technological University - Danao Campus_ (`TESDA Scholar — Creative Web Design NC III`).
    - `arcelo-high-school-immersion.yaml`: _Arcelo Memorial National High School_ (`Senior High Work Immersion Student`).
  - Registered matching skills in `src/content/skills/`: `docker.yaml`, `postgres.yaml`, `nodejs.yaml`, `wordpress.yaml`, `javascript.yaml`, `html-css.yaml`, `microsoft-office.yaml`, and `animation.yaml`.
  - Refined `<Scroll3DKingCanvas />` 3D companion with top-down elevated tabletop camera perspective ($\sim 50^\circ$ pitch angle), procedural turned-wood grain texture, gold rim lighting (`#d4af37`), feathered soft radial contact shadow plane (`createShadowTexture()`), 4-phase physical hop state machine, interactive drag & drop with strict navigation sidebar clamping (`minX = 0.2`), and `z-0` background placement.
  - Fixed timeline node circle alignment (`-left-[24px] md:-left-[32px] -translate-x-1/2`), centering the icon circle pixel-perfectly over the vertical left timeline border line on both mobile and desktop viewports.
  - Created copy-pasteable authoring template `src/content/experience/_template.yaml.example` and updated [0005-experience-page-specification.md](plans/0005-experience-page-specification.md) to **v1.4.0** (`Implemented Specification`).

- Implemented **3D WebGL King Piece Scroll Companion** (`src/components/experience/Scroll3DKingCanvas.tsx`, `src/pages/experience.astro`, `package.json`, `pnpm-lock.yaml`, `docs/plans/0005-experience-page-specification.md`):
  - Created `<Scroll3DKingCanvas />` React island rendering a true 3D King mesh (procedural lathe-profile body, crown bowl, and 3D cross atop a dark chess tile) via Three.js.
  - Positioned canvas fixed near the right-hand scrollbar (`fixed top-1/2 right-3 -translate-y-1/2 z-40`) with a low-angle upward camera perspective (`camera.lookAt(0, 0.95, 0)`).
  - Implemented smooth scroll-driven 3D chess movements: the King executes 3D hops (`translateZ` lift-off, forward tilt, and shadow compression) while rotating 360° over the page scroll duration.
  - Installed `three` and `@types/three` dependencies and mounted component on `/experience`.

- Refactored **Mobile Live Chat Navigation Transition & Z-Index Layering** (`src/layouts/BaseLayout.astro`, `src/components/chat/ChatBox.tsx`, and `src/components/feedback/Toast.tsx`):
  - Updated mobile navigation drawer script in `BaseLayout.astro` to execute a smooth 200ms closing transition when tapping "Live Chat", invoking `open-portfolio-chat` event upon completion to open the chat modal without manual drawer exit.
  - Increased `ChatBox.tsx` modal container z-index from `z-50` to `z-[70]`, ensuring the Live Chat modal and onboarding dialogs surface above navigation bars (`z-50`) and mobile overlays (`z-[60]`).
  - Adjusted global `ToastContainer` position in `Toast.tsx` to `top-16 right-4 sm:top-6 sm:right-6` on mobile viewports so turn notifications float cleanly below header controls without overlapping the close button.
  - Removed redundant low-opacity `♞ Crowd Chess` text and secondary `X` button header from mobile `ChatBox.tsx` panel view.

- Established **Experience Page Architecture, Schema & Content Strategy Specification** (`docs/plans/0005-experience-page-specification.md`, `src/content.config.ts`, `src/content/experience/`, `src/pages/experience.astro`, and `docs/plans/README.md`):
  - Authored comprehensive specification `0005-experience-page-specification.md` defining content rules, CAR (Context, Action, Result) impact formula, non-invented corporate title invariants, and explicit 7-type role categorization taxonomy (`fulltime`, `contract`, `internship`, `freelance`, `academic`, `project`, `leadership`).
  - Extended Astro v5 Content Layer `experience` schema in `src/content.config.ts` with `type` enum validator and optional `url` property.
  - Removed outdated placeholder corporate data (`Google - Lead Systems Engineer`, `Netflix - Senior Developer`) and replaced with authentic initial entries (`bits-timekeeping-lead.yaml`, `bsit-computer-technology.yaml`, `software-development-contractor.yaml`).
  - Redesigned `src/pages/experience.astro` timeline to render category badge pills and theme-aware `<DoodleIcon>` vector SVGs (`briefcase`, `calendar`, `location`, `check`).

- Integrated **Doodle SVG Icon System** (`src/assets/icons/doodle/`, `src/components/ui/DoodleIcon.astro`, `src/components/ui/DoodleIcon.tsx`, `src/components/sections/ContactCTA.astro`, `src/components/sections/AboutSummary.astro`, `src/layouts/BaseLayout.astro`, `src/components/chat/ChatBox.tsx`, `docs/design/DoodleIconSystem.md`):
  - Organized and migrated 177+ hand-drawn vector doodle SVG icons into `src/assets/icons/doodle/` across 15 UI categories.
  - Built `<DoodleIcon.astro>` and `<DoodleIcon.tsx>` components with dynamic `currentColor` stroke/fill binding for seamless Light and Dark Mode ink inversion.
  - Replaced text emojis (`✉`, camera emojis, unicode `✕`) and `@lucide/astro` dependencies across site headers, contact cards, focus area lists, and chat controls with theme-aligned Doodle SVGs.
  - Documented the icon system architecture and component usage in `docs/design/DoodleIconSystem.md`, updated design and engineering guides (`docs/README.md`, `docs/design/SVGRules.md`, `docs/design/DesignSystem.md`, `docs/engineering/ContentStyleGuide.md`), and updated AI Agent rules (`.agents/AGENTS.md`, `AGENTS.md`, `docs/engineering/AI-Guidelines.md`, `docs/engineering/AI-Project-Context.md`) to strictly mandate custom `<DoodleIcon>` vector SVGs over system text emojis.

- Redesigned **Shared Chess Board UI & Global Anti-Spam Toast System** (`src/components/chess/ChessWidget.tsx`, `src/components/chess/ChessBoard3D.tsx`, `src/components/feedback/Toast.tsx`, `src/components/chat/ChatBox.tsx`, `src/lib/chess/storage.ts`, `src/styles/global.css`, `astro.config.ts`, `tests/e2e/chat.spec.ts`, `tests/e2e/navigation.spec.ts`, and `docs/plans/0004-anonymous-shared-chess-game-specification.md`):
  - Updated Playwright E2E test suite (`tests/e2e/chat.spec.ts` & `tests/e2e/navigation.spec.ts`) with updated input placeholders (`"say something..."`), onboarding title assertions, static route trailing slash normalization, and navigation timeouts.
  - Fixed TypeScript diagnostic hints in `astro.config.ts` (`_eventType`) and `ChatBox.tsx` (`React.SyntheticEvent`), reducing diagnostic noise for clean CLI feedback.
  - Fixed ESLint `@typescript-eslint/no-unused-vars` lint check in `ChessWidget.tsx` by cleaning up unused destructured prop parameters.
  - Fixed Cloudflare Workers edge environment compatibility in `src/lib/chess/storage.ts` by removing Node.js `node:fs` imports.
  - Created `.custom-scrollbar` CSS utility class in `global.css` (ultra-thin 5px thumb, transparent track, smooth hover accent color) and applied it across `ChatBox.tsx` message feeds and `GameDetailsModal.tsx` lists to replace bulky native browser scrollbars.
  - Added physical 3D wooden block slab extrusion (`.board-3d-slab`) and ground placement radial shadow to `ChessBoard3D.tsx`, giving the chess stage realistic physical block thickness and volumetric depth in 3D perspective mode.
  - Removed container background card, outer borders, shadows, header bar, and the move accepted notification banner from `ChessWidget.tsx`, making the 3D/2D chess board sit cleanly and framelessly in the interface.
  - Built a global, accessible Toast Notification System (`Toast.tsx`) positioned at the **top-right** of the viewport, featuring `inaccuracy.svg` as the notification icon, styled with design system tokens and backdrop blur.
  - Implemented anti-spam duplicate message suppression: if a toast with the exact same text is currently active/visible, duplicate triggers are ignored until the current toast vanishes.
  - Added turn indicator toasts when clicking/pressing anywhere on the chess board (e.g., _"Your Turn to move!"_ or _"Opponent's Turn..."_).
  - Integrated **3D View** camera perspective toggle and a borderless **Details** button (rendered as the `mistake.svg` icon without border or text description) directly into the Chatbox header control toolbar.
- Fixed **Double Scrollbar & Background Page Scrolling** (`src/components/chat/ChatBox.tsx`). Added body scroll lock (`document.body.style.overflow = "hidden"`) when the chat modal opens, restoring original overflow on close.
- Fixed **Nav Bar Icon Redundancy & Hover Cursor** (`src/layouts/BaseLayout.astro` and `src/components/chat/ChatWidget.tsx`). Removed extra `♞` text character and knight SVG from the navigation bar item and added `cursor-pointer` to all chat trigger buttons.
- Fixed **Mobile Responsiveness & Layout Squishing** (`src/components/chat/ChatBox.tsx`). Refactored header layout with responsive flex wrappers, truncated user handle badges, compact input paddings (`pr-12 sm:pr-14`), and optimized mobile modal heights (`h-[92vh] sm:h-[88vh]`).
- Fixed **WebSocket Connection Lifecycle Stability & Non-Blocking Typing** (`src/components/chat/useChatSocket.ts` and `src/components/chat/ChatBox.tsx`). Refactored `useChatSocket` to connect once on mount using a stable `displayNameRef`, preventing connection teardowns during typing or display name edits. Removed input field disabling in `ChatBox.tsx` and added optimistic local message delivery so typing and sending are 100% smooth and uninterrupted.

### Added

- Implemented **Production 3D Chess Stage & Projection Engine Architecture** ([sceneConfig.ts](../src/components/chess/sceneConfig.ts), [ChessBoard3D.tsx](../src/components/chess/ChessBoard3D.tsx), [ChessPiece.tsx](../src/components/chess/ChessPiece.tsx), [GameDetailsModal.tsx](../src/components/chess/GameDetailsModal.tsx), [ChessWidget.tsx](../src/components/chess/ChessWidget.tsx), and [global.css](../src/styles/global.css)):
  - Built centralized `projectPiece(x, y, type, isSelected, camera)` Projection System in `sceneConfig.ts` converting board coordinates (`x`, `y`) into screen position (`left`, `top`), depth (`zIndex`), height (`height`), and tilt (`rotateX(-46deg)`).
  - Streamlined 4-layer Stage Hierarchy (`Board Surface` -> `Highlights Layer` -> `Piece Renderer Layer` -> `UI Overlay`).
  - Centralized virtual camera geometry (`CAMERA.perspective = 1400`, `boardTilt = 58°`, `pieceTilt = -46°`) and decoupled visual style config (`PIECE_STYLES`).
  - Decoupled 8x8 Board Surface Grid from the Piece Overlay Layer: board squares are 100% agnostic of piece children.
  - Dynamic Screen-Space Depth Sorting (`pieces.sort((a,b) => a.y - b.y)`): foreground pieces physically overlap background rows naturally without DOM clipping.
  - Streamlined 4-layer Standee structure (`Shadow` -> `Base` -> `Thickness` -> `SVG Artwork`).
  - Added `.woodcut-square-dark` cross-hatching utility (`repeating-linear-gradient(45deg, var(--ink) 0 1.5px, transparent 1.5px 6px)`), letterpress frame, Lichess corner coordinates, and ink move rings.

- Implemented **Phase 0–Phase 5 of Shared Anonymous Chess Game (`@samananias/turn-arbiter`)** (`src/components/chess/ChessWidget.tsx`, `src/components/chat/ChatBox.tsx`, `src/lib/chess/storage.ts`, `src/lib/chess/session.ts`, `src/pages/api/chess/state.ts`, and `src/pages/api/chess/move.ts`):
  - Integrated local package `@samananias/turn-arbiter` (`file:../turn-arbiter`) and `chess.js` (`^1.4.0`).
  - Gated chess side assignment behind username onboarding ("Enter Handle to Play Chess & Chat"). Passive site visitors receive no chess cookies or team assignment.
  - Implemented Cloudflare D1 SQL Compare-and-Swap (CAS) atomic storage engine (`UPDATE game SET ... WHERE id = 1 AND version = ?`) with memory storage fallback.
  - Created Web Crypto API HMAC-SHA256 session cookie signing/verification (`chess_session`) for side assignment.
  - Built Astro API endpoints `/api/chess/state` (`GET`) and `/api/chess/move` (`POST`).
  - Implemented interactive 8x8 React chess board widget (`ChessWidget.tsx`) using piece vector SVGs from `src/assets/chess/`, legal move highlighting, turn state indicator, team assignment status, and move collision feedback.
  - Expanded Chat Modal (`ChatBox.tsx`) into a dual-panel split container (`max-w-5xl`) rendering real-time chat on the left panel and the shared crowd chess game on the right panel.

- Added **Anonymous Shared Chess Game Architecture & Specification** in [0004-anonymous-shared-chess-game-specification.md](plans/0004-anonymous-shared-chess-game-specification.md) and **Implementation Roadmap & Checkpoints** in [0004.1-anonymous-shared-chess-game-implementation-roadmap.md](plans/0004.1-anonymous-shared-chess-game-implementation-roadmap.md) detailing `@samananias/turn-arbiter` integration, D1 CAS storage engine, signed session cookie auth, and Astro API endpoints.
- Implemented **Mandatory Username Onboarding & Immutable Single-Session Identity** (`src/components/chat/useChatSocket.ts`, `src/components/chat/ChatBox.tsx`, and `tests/e2e/chat.spec.ts`). Removed automatic default display name generation, requiring users to pick a 3–20 character handle on first visit before accessing the chat. Handle is persisted in `localStorage` and cannot be modified in-session.

- Implemented **Phase 4 & Phase 5: Layout & Navigation Integration, Audio Polish & E2E Tests** (`src/components/chat/ChatWidget.tsx`, `src/layouts/BaseLayout.astro`, and `tests/e2e/chat.spec.ts`). Mounted `ChatWidget` island (`client:idle`) with floating bottom-right trigger, custom event listener (`open-portfolio-chat`), Web Audio woodblock click feedback, `aria-live="polite"` live announcements, and Playwright E2E test suite.
- Implemented **Phase 3: Fullscreen Blurred Backdrop UI & Woodcut Component Setup** (`src/components/chat/ChatBox.tsx`) introducing the fullscreen modal overlay with frosted glass background blur (`backdrop-blur-md bg-bg/85 dark:bg-bg/90`), woodcut framing, chess avatar badges (♞, ♜, ♝, ♟, ♔, ♛), live user counter badge, auto-scrolling feed, error banners, 280-character limit indicator, and inline display name editing.
- Implemented **Phase 2: Client State, WebSocket Hook & Display Name Management** (`src/components/chat/useChatSocket.ts`) introducing the React custom hook with exponential backoff auto-reconnection, page visibility reconnection handlers, hidden internal UUID session tokens, local storage display name persistence, and typing indicator timeout handlers.
- Implemented **Phase 1: Real-Time Edge Engine Setup** (`party/chat.ts` and `partykit.json`) introducing the PartyKit server handler, configurable in-memory 50-message ring buffer (`MAX_CHAT_HISTORY = 50`), HTML escaping XSS protection, token bucket rate limiting (3 msgs / 5s), system join/leave event emitter, and conditional discriminator engine.
- Added **Anonymous Real-Time Chatbox Architecture & Design Specification** in `docs/plans/0003-anonymous-realtime-chatbox-specification.md` and **Implementation Roadmap & Checkpoints** in `docs/plans/0003.1-anonymous-realtime-chatbox-implementation-roadmap.md` detailing phased execution, PartyKit edge engine, fullscreen blurred backdrop UI, and verification gates.
- Official **Content & Writing Style Guide** in `docs/engineering/ContentStyleGuide.md` establishing author positioning, voice, tone boundaries, surface copy standards, authenticity criteria, and AI collaboration rules (renamed from `docs/still-noname.md`).
- Updated `docs/README.md`, `docs/engineering/AI-Guidelines.md`, and `docs/engineering/AI-Project-Context.md` to reference `ContentStyleGuide.md`.
- Rebuilt Work Index Page (`src/pages/projects/index.astro`) and Case Study Detail Template (`src/pages/projects/[slug].astro`) following `work-page-visual.html` and [0002-work-page-specification.md](plans/0002-work-page-specification.md).
- Restructured featured showcase into a 2-column grid featuring the author's 2 signature projects: **BITS (Biometrics Integrated Timekeeping System)** (`bits-timekeeping.md` - ♔ Signature System) and **Portfolio Architecture & Content System** (`portfolio-architecture.md` - ♛ Technical Powerhouse).
- Integrated real project screenshots (`/images/projects/bits/dashboard.png`, `devices.png`, and `/images/projects/portfolio-architecture.png`) into frontmatter, markdown narratives, and card preview banners with `grayscale contrast-105 group-hover:grayscale-0` hover transitions.
- Added clean font chess character background watermarks (`♔`, `♛`, `♞`) matching `work-page-visual.html` (`font-serif text-[145px] rotate-[-7deg]`).
- Placed **Legacy Personal Web Portfolio** (`legacy-portfolio.md`) into the **All Projects Archive** list below (`featured: false`).
- Removed 3 fake dummy project files (`cloud-scheduler.md`, `distributed-logging.md`, `edge-telemetry-agent.md`).
- Omitted `1st`, `2nd`, `3rd` ranking numbers from all project badges and eyebrows.
- Streamlined featured card design by removing Key Decision blockquotes and Tech Stack tag pills, focusing on clean image banners, bold titles, and concise 1-sentence summaries.
- Updated Work Page Information Architecture Specification ([0002-work-page-specification.md](plans/0002-work-page-specification.md)) and Implementation Roadmap ([0002.1-work-page-implementation-roadmap.md](plans/0002.1-work-page-implementation-roadmap.md)).

### Changed

- Refreshed all Home Page (`/`) section copy and action button labels to strictly conform to `ContentStyleGuide.md` (sentence case CTAs, grounded early-career graduate positioning, fixed `02. Core Mindset & Principles` section heading). Updated `site.json`, `about.json`, all 7 section components in `src/components/sections/`, and `docs/plans/0001-home-page-specification.md`.

## [1.0.0] - 2026-07-25

### Added

- Dedicated `docs/plans/` directory with `README.md` index and `0000-template.md` feature plan template for technical design specs and RFC proposals.
- Implemented **Phase 7: Background Trajectory, Contact CTA & Page Assembly** on the Home page (`/`):
  - Created `src/components/sections/AboutSummary.astro` rendering background biography, engineering philosophy, and focus areas from `src/content/pages/about.json`.
  - Created `src/components/sections/ContactCTA.astro` rendering conversion CTA finish with direct email button, GitHub profile link, and contact route from `src/content/data/site.json`.
  - Injected `Person` and `WebSite` JSON-LD structured data into `<head>` in `src/layouts/BaseLayout.astro`.
  - Assembled all 7 top-to-bottom sections on `src/pages/index.astro` strictly following `docs/plans/0001-home-page-specification.md`.
  - Fixed site-wide section boundary alignment by bounding colored sections (`bg-surface-subtle/50`) with top and bottom `DividerChessboard` primitives for 0px top/bottom background bleed.
  - Refactored `src/components/sections/GitHubActivity.astro` to use trimmed eyebrow (`06 · GITHUB CONTRIBUTIONS`) and direct grid transition.
  - Refactored `src/components/sections/ContactCTA.astro` with standalone email pill and responsive button stacking (`flex-col sm:flex-row`).
  - Updated `docs/plans/0001-home-page-specification.md` with Section 6 & 7 specs and Section Background Alternating Pattern & Divider Boundary rules.
- Added explicit Windows CLI command execution rule requiring `cmd /c` (e.g. `cmd /c "npx pnpm run format"`) across `AGENTS.md`, `.agents/AGENTS.md`, `docs/AI-Guidelines.md`, and `docs/AI-Project-Context.md` to bypass PowerShell script execution restrictions.
- Reorganized `docs/` repository documentation into structured subdirectories (`docs/architecture/`, `docs/design/`, `docs/engineering/`), updating all relative markdown links and maintaining 100% link portability.
- Created official Home Page Information Architecture & Content Strategy specification in `docs/plans/0001-home-page-specification.md`.
- Created 7-phase Home Page Implementation Roadmap & Verification Checkpoints document in `docs/plans/0002-home-page-implementation-roadmap.md`.
- Implemented **Phase 2: Hero Section & Interactive Avatar** on the Home page (`/`):
  - Created `src/components/primitives/InteractiveAvatar.astro` featuring a 16-tile staggered chessboard `clip-path` wipe animation that reveals the portrait photo on hover/focus.
  - Created `src/components/sections/Hero.astro` consuming authentic data from `src/content/data/site.json` (Display name, headline, location, and CTA links).
  - Integrated `sharp` dev dependency for high-efficiency image optimization (reducing portrait image footprint from 1.4 MB to 10 kB webp).
  - Extended Astro v5 Content Collection schema for `site` in `src/content.config.ts` with optional `headline` and `location` fields.
- Implemented **Phase 3: Strategy Before Code Section** on the Home page (`/`):
  - Created `src/components/sections/CoreMindset.astro` with 5 chess-inspired layered principle cards (_Strategy Before Code_, _Context Over Memory_, _AI as a Partner, Not a Crutch_, _Evidence Over Assumptions_, _Continuous Refinement_).
  - Integrated zero-jargon conversational copy emphasizing human engineering values, documentation context, and responsible AI collaboration.
- Implemented **Phase 4: Featured Case Studies Section** on the Home page (`/`):
  - Created `src/components/sections/FeaturedProjects.astro` querying Astro v5 `projects` content collection (`featured: true`, hard cap of 3).
  - Rendered project cards with structural stroke borders, hard offset shadows, outcome bullet points, tech stack tags, and case study links.
- Implemented **Phase 5: Lab & Learning Explorations Section** on the Home page (`/`):
  - Created `src/components/sections/LabExplorations.astro` querying Astro v5 `posts` collection (hard cap of 3).
  - Rendered research note cards with date eyebrows, non-technical excerpts, topic badges, and deep-dive links.
- Implemented **Phase 6: Interactive GitHub Contributions & Chess Playfield** on the Home page (`/`):
  - Built React Island `src/components/islands/GitHubChessGrid.tsx` rendering a 52-week activity heatmap with live GitHub contribution fetching (`488 contributions in the last year`).
  - Added chronological day-by-day contribution array sorting to fix 7-day jump artifacts and ensure seamless left-to-right daily progression.
  - Centered calendar grid layout horizontally, streamlined UI chrome by removing month and weekday labels, and integrated ♔ King piece easter egg on peak activity days.
  - Created `src/components/sections/GitHubActivity.astro` server-side pre-rendering live data with `client:visible` hydration, top/bottom borders (`border-t border-b border-ink/10`), and `DividerChessboard` pattern.
  - Relocated `<GitHubActivity />` section to the bottom of `/src/pages/index.astro` directly after Recent Work History.

## [0.9.0] - 2026-07-21

### Added

- Woodcut & engraving visual theme specification and phased roadmap in `docs/WoodcutTheme.md` and `docs/WoodcutThemeRoadmap.md`.
- True-black dark mode palette (ground `#000000`, surface `#0d0d0f`, text `#f0f4ff`, primary `#8fb0dc`) in `src/styles/tokens.css`.
- Engraving stroke-weight tokens (`--stroke-structural` 2.5px, `--stroke-detail` 1.5px, `--stroke-hatch` 1.3px, `--stroke-fine` 1px) in `src/styles/tokens.css`.
- Classical typography voices — Fraunces Variable (display, WONK) and Gochi Hand (decorative scrawl) via `@fontsource-variable/fraunces` and `@fontsource/gochi-hand`.
- Engraved section divider primitives `DividerChessboard.astro` and `DividerKnight.astro` in `src/components/primitives/`.
- Chess piece icon component `ChessIcons.astro` in `src/components/navigation/`.
- Fixed left-sidebar navigation (desktop) with a full-screen overlay menu, focus trap, and scroll lock (mobile) in `src/layouts/BaseLayout.astro`.
- Themed 404 page featuring a knocked-over knight engraving at `src/pages/404.astro`.
- Mode-aware `.chess-grid` repeating chessboard background texture utility in `src/styles/global.css`.
- Dedicated SVG & image asset rules specification in `docs/SVGRules.md` establishing tight cropping standards, engraving stroke-weight hierarchy, and dark-mode high-contrast binding patterns.
- Integrated complete set of 12 hand-drawn woodcut chess piece SVGs (king, queen, rook, bishop, knight, pawn in black and white styles) inside `src/assets/chess/`.
- Replaced legacy navigation glyphs in `src/components/navigation/ChessIcons.astro` and `src/layouts/BaseLayout.astro` with custom theme-adaptive SVGs (black SVGs in Light Mode, white SVGs in Dark Mode) and updated active navigation indicator to the Pawn SVG.
- Completed Phase A of Sidebar Refinement (`docs/SidebarRefinement.md`): restored `Home` (`/`) route with King piece (♔), implemented stroke-only 12px Knight SVG active indicator (`src/assets/chess-nav/knight.svg`), added 44px min-height touch targets, and configured explicit `focus-visible` focus rings.
- Completed Phases C & D of Sidebar Refinement (`docs/SidebarRefinement.md`): added `tracking-wide` letter spacing on navigation links, 1px horizontal icon hover shift micro-interactions (`group-hover:translate-x-px`), and `active:scale-[0.92]` press feedback on the theme toggle button. Finalized Checkpoint 1.
- Completed Phase B of Sidebar Refinement (`docs/SidebarRefinement.md`): created 24×24 simplified stroke-only piece SVGs in `src/assets/chess-nav/`, refactored `ChessIcons.astro` to single-render using `currentColor` auto-inversion, and resized icons to 15px (desktop) and 18px (mobile). Finalized Checkpoint 2.
- Completed Phase E of Sidebar Refinement (`docs/SidebarRefinement.md`): added 10px uppercase mono group labels (`WORK`, `WRITING`, `META`), integrated `DividerChessboard.astro` for the primary group divider strip, and configured `@custom-variant short` (`max-height: 768px`) for responsive label visibility. Finalized Checkpoint 3.
- Completed Phase F of Sidebar Refinement (`docs/SidebarRefinement.md`): created hand-drawn Sun/Moon SVGs in `src/assets/theme-icons/`, updated `ThemeToggle.astro` button to 44px (`h-11 w-11`), and added a 40px knight watermark at 20% opacity above the sidebar footer divider. Finalized Checkpoint 4.
- Completed Phase G of Sidebar Refinement (`docs/SidebarRefinement.md`): tokenized hardcoded `#0d0d0f` dark-mode colors in `Logo.astro` with `var(--color-surface-raw, #0d0d0f)`. Finalized Checkpoint 5.
- Completed Phase H of Sidebar Refinement (`docs/SidebarRefinement.md`): implemented 200ms `mobile-menu-out` exit animation, per-link 30ms staggered entry delays (`--i`), and `prefers-reduced-motion` animation fallbacks in `BaseLayout.astro` and `global.css`. Finalized Checkpoint 6.
- Isolated desktop sidebar vertical scrolling to the primary navigation section (`Home` → `Lab`), pinning the logo header, utility links (`About`, `Contact`, `Search`), theme toggle, and footer permanently in fixed position.

### Fixed

- Fixed Lighthouse CI GitHub Actions workflow step by creating `lighthouserc.json` configuration file (`staticDistDir: ./dist`, `budgetFile: ./lighthouse-budget.json`) and configuring `treosh/lighthouse-ci-action@v12` with `configPath`, resolving `No URLs provided to collect` CI failure.
- Added `@variant dark (&:where(.dark, .dark *));` class selector strategy to `src/styles/global.css` for Tailwind CSS v4, fixing `dark:hidden` and `dark:flex` Sun/Moon icon swapping when toggling dark mode via JavaScript.
- Updated `.chess-grid` CSS variable mixing in `src/styles/global.css` to use `var(--color-border-raw)` for clear grid visibility in both dark and light mode.
- Enhanced Dark Mode background texture in `src/styles/global.css` with an optical 3D depth effect using `filter: blur(0.75px)`, 4-stop radial `mask-image` dual vignette decay, and dark surface card ambient elevation shadows (`box-shadow`), allowing foreground UI elements to float cleanly above a soft, distant background environment.
- Cropped SVG `viewBox` in `src/components/primitives/Logo.astro`, `public/favicon.svg`, and `src/assets/brand/logo.svg` to focus directly on the goat knight head and horns (`120 40 400 360`), making the logo prominent, bold, and readable at small sizes (favicons and topbar headers).

- Updated active navigation link indicator in `src/layouts/BaseLayout.astro` to use `src/assets/chess-icons/correct.svg` instead of `knight.svg`.
- Redesigned `king.svg` and `knight.svg` in `src/assets/chess-nav/` for improved clarity at 15px render size.
- Created 10 chess move evaluation annotation badges in `src/assets/chess-icons/` (`brilliant`, `great`, `best`, `good`, `correct`, `book`, `inaccuracy`, `mistake`, `blunder`, `miss`).
- Restyled `.prose-custom blockquote` with an engraved double-rule border and ♛ queen watermark.
- Replaced the hero text gradient with a solid `text-primary` emphasis and added a Gochi Hand catchphrase (no-gradient rule, WoodcutTheme.md §1.1).
- Updated navigation and theme E2E specs for the sidebar/overlay DOM and the multi-instance theme toggle.

## [0.8.0] - 2026-07-21

### Added

- Optimized theme-aware vector logo asset file in `src/assets/brand/logo.svg`.
- Reusable primitive Astro logo component in `src/components/primitives/Logo.astro` supporting CSS theme-aware fills and stroke colors.
- Custom prefers-color-scheme responsive favicon in `public/favicon.svg` using the goat head chess knight vector paths.

### Changed

- Integrated the dynamic logo in the global header next to the site title in `src/layouts/BaseLayout.astro`.
- Cleaned up temporary files (`goat_head_chess_knight.svg` and `goat_head_chess_knight.png`) from the root directory.
- Migrated deprecated `z` imports from `astro:content` to `astro/zod` in `src/content.config.ts`.
- Migrated deprecated Lucide icons (`CheckCircle2` -> `CircleCheck`, `AlertTriangle` -> `TriangleAlert`) in experience and experiments layout pages.

## [0.7.0] - 2026-07-20

### Added

- Playwright automated browser testing configurations in `playwright.config.ts`.
- Navigation E2E testing specs in `tests/e2e/navigation.spec.ts`.
- Light/dark theme toggler and localStorage sync E2E specs in `tests/e2e/theme.spec.ts`.
- Dynamic client search filtering E2E specs in `tests/e2e/search.spec.ts`.
- Automated Axe accessibility audits across all major site routes in `tests/accessibility/a11y.spec.ts`.
- Performance metrics budgets specification in `lighthouse-budget.json`.
- Cloudflare Pages URL redirects mapping config in `public/_redirects`.

### Changed

- Expanded package config in `package.json` to include `@playwright/test`, `@axe-core/playwright`, and defined test run script tasks.

## [0.6.0] - 2026-07-20

### Added

- Lab/Experiments listing page at `src/pages/experiments/index.astro` (with dynamic status and technology filtering).
- Dynamic detail page for experiments at `src/pages/experiments/[slug].astro` (with warnings, demo links, and scroll-highlighted Table of Contents).
- Seed experiments content files at `src/content/experiments/css-grid-chess.md` and `src/content/experiments/color-scheme-sandbox.md`.

### Changed

- Integrated `ThemeToggle` into `src/layouts/BaseLayout.astro` global header for flash-free theme switching.
- Appended "Lab" navigation link pointing to `/experiments` inside `src/content/data/navigation.json`.

## [0.5.0] - 2026-07-19

### Added

- Blog writing index directory at `src/pages/posts/index.astro`.
- Blog dynamic detail page at `src/pages/posts/[slug].astro` (with Table of Contents sidebar scroll-highlights).
- Research index directory page at `src/pages/research/index.astro`.
- Research detailed publication sheet page at `src/pages/research/[slug].astro`.
- Search query lookup UI page at `src/pages/search.astro`.
- Static Search JSON database compilation endpoint at `src/pages/search.json.ts`.
- Dynamic RSS XML compilation feed endpoint at `src/pages/rss.xml.ts`.
- Table of Contents link animations helper classes (`.toc-link`, `.toc-link-active`) in `src/styles/global.css`.
- Seed posts and research entries for Welcome to Astro, Raft Simulation, and IEEE Telemetry Ingestion.

### Changed

- Fixed trailing newline conflicts in Vite `syncSingletonsPlugin` in `astro.config.ts`.
- Removed unused imports (`Download`, `Grid`, `Card`) inside research components to pass ESLint tests.

## [0.4.0] - 2026-07-19

### Added

- Main portfolio route page at `src/pages/index.astro`.
- About credentials page at `src/pages/about.astro`.
- Project cases index page at `src/pages/projects/index.astro` (with client-side vanilla filter tabs).
- Project dynamic detailed page at `src/pages/projects/[slug].astro`.
- Professional timeline history page at `src/pages/experience.astro`.
- Forms-validated submittal contact page at `src/pages/contact.astro`.
- Seed markdown, json, and yaml content layer assets for about, projects, skills, experience, and achievements collections.
- Node.js environment types (`@types/node`) as devDependency.
- Custom prose class typography styles (`.prose-custom`) in `src/styles/global.css`.

### Changed

- Migrated design system showcase to `src/pages/design-system.astro` to preserve style previews.
- Modified `src/layouts/BaseLayout.astro` to render site settings dynamically, manage SEO fallbacks, and highlight active header tabs.
- Removed prohibited `@ts-nocheck` comments in `astro.config.ts`.
- Removed explicit `any` bindings on `about.astro`'s icons.

## [0.3.0] - 2026-07-19

### Added

- Keystatic CMS integration (`@keystatic/core`, `@keystatic/astro`, `@astrojs/react`, `react`, `react-dom`).
- Schema configurations for all 10 collections/singletons in `keystatic.config.ts`.
- Custom Vite plugin `syncSingletonsPlugin` in `astro.config.ts` to solve the JSON array format mismatch for site and navigation singletons.
- Ignore rules for Keystatic local database folder in `.gitignore`.

## [0.2.0] - 2026-07-18

### Added

- Fontsource variable fonts integration (`Inter Variable`, `Manrope Variable`, `JetBrains Mono`).
- Official `@lucide/astro` SVG icon library configuration.
- Layout primitives: `Container.astro` (width bounds) and `Grid.astro` (responsive shorthand parser).
- Interactive controls: `Button.astro` and `LinkButton.astro` with loading overlays and accessibility sizing compliance.
- Content compositions: `Card.astro` (composable slots and semantic full-card clickable overlays) and `ThemeToggle.astro` (flash-free theme toggler).
- Main design showcase page (`index.astro` kitchen sink layout).

## [0.1.0] - 2026-07-18

### Added

- Astro v7 + TypeScript setup.
- Tailwind CSS v4 design token integrations (`tokens.css`, `global.css`).
- ESLint and Prettier flat rules.
- Content Layers schemas in `content.config.ts`.
- GitHub Actions CI workflow config.
- Architectural design decisions registry and docs folders.
