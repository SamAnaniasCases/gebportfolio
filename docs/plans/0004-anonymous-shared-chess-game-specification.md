# Anonymous Shared Chess Game Architecture & Specification

<callout icon="♞">**Status:** Approved · **Owner:** Gen · **Date:** 2026-07-28</callout>

---

## 1. Goal & Context

This specification defines the architecture, data model, API surface, security model, and interface strategy for a **single, persistent, anonymous crowd chess game** embedded directly into the personal portfolio site.

### Key Premise & Access Gating

Unlike traditional multiplayer games that require online lobbies or real-time matchmaking, every active participant shares one continuous chess game:

- **Gated Participation via Chat Onboarding:** Portfolio visitors who only browse the portfolio site are **never** assigned to a team. This prevents passive page loads from polluting team balance or inflating session counts.
- **Username & "Play" Trigger:** Access to the game is gated inside the **Chat Modal** (`ChatBox.tsx`). A visitor must input their username and click **"Play" / "Join"** before team assignment occurs.
- **Persistent Side Assignment:** Upon completing onboarding, the backend assigns the session to a side (White or Black) and binds it via a signed HTTP-only cookie (`HMAC-SHA256(sessionId + side)`).
- **First-Valid-Submit-Wins:** Anyone on the current turn's side may submit a move; the **first valid submission wins**.
- **Fog of War:** Players never learn who their opponents or allies are.
- **Compare-and-Swap (CAS)** concurrency guarantees exactly one accepted move per turn race at the database layer.

---

## 2. User Experience & Split Modal Layout

### Split Layout Structure (`ChatBox.tsx`)

Once onboarded, the Chat Modal displays a dual-panel split layout:

- **Left Panel — Chatbox Feed, Messaging & Control Toolbar:** Real-time chat stream, user handle, typing indicator, message input box. Includes header toolbar with:
  - **3D View Button:** Toggle between 3D Perspective and 2D Top-Down camera views.
  - **Details Button:** Rendered strictly as a borderless SVG icon (`mistake.svg`) without text label, opening `GameDetailsModal`.
- **Right Panel — Shared Chess Game Board:** Pure, headerless, frameless 3D/2D chess board floating cleanly without container borders or card backgrounds.
- **Board Press Turn Notification:** Pressing or clicking anywhere on the chess board fires a global **Toast Notification** (positioned top-right, featuring `inaccuracy.svg`) stating whose turn it is (e.g. _"★ Your Turn to move!"_ or _"⏳ Opponent's Turn — Waiting for Team Black..."_).
- **Anti-Spam Toast Rate Limiting:** Duplicate turn notifications with the exact same message are automatically suppressed while active to prevent notification spamming.
- **Responsive Behavior:** On mobile viewports, panels collapse cleanly into a stacked view or tabbed switcher with smooth transitions.

### Piece Assets & Aesthetics

- **SVG Assets:** Use the vector SVG set located in [`src/assets/chess/`](../../src/assets/chess):
  - Black pieces: `black-pawn.svg`, `black-knight.svg`, `black-bishop.svg`, `black-rook.svg`, `black-queen.svg`, `black-king.svg`
  - White pieces: `white-pawn.svg`, `white-knight.svg`, `white-bishop.svg`, `white-rook.svg`, `white-queen.svg`, `white-king.svg`
- **Woodcut Engraving Theme Alignment:** Board squares and SVG pieces inherit design tokens (`currentColor`, woodcut stroke weights, radius, dark mode compatibility).
- **State Copy inside Chat Modal:**
  - _"Welcome, [Username]. You are on the Black team."_
  - _"You are the 47th visitor to touch this board."_
  - _"A teammate moved first."_ (Surfaced when losing a move race).
  - _"No move for 6 hours."_

---

## 3. Package & Architecture Strategy

### Turn Arbitration (`@samananias/turn-arbiter`)

The game turn logic is owned by `@samananias/turn-arbiter` (located locally during testing at `../turn-arbiter`).

- **Pure State Engine:** `@samananias/turn-arbiter` contains zero runtime dependencies, performs no I/O, and reads no system clock (time is injected via `now`).
- **Chess Adapter:** `@samananias/turn-arbiter/chess` uses `chess.js` (optional peer dependency) for chess rules, SAN validation, checkmate/stalemate, and threefold repetition key tracking.
- **State Invariant:** The host application database owns storage; the package owns turn permissions and state transitions.

```
+-------------------------------------------------------------------------------+
|                             gebportfolio App                                  |
|  +-----------------------------------+-------------------------------------+  |
|  |     Left: Chatbox Feed            |     Right: Shared Chess Game        |  |
|  |  (ChatBox.tsx Username Gate)      |  (src/assets/chess/*.svg Pieces)    |  |
|  +-----------------------------------+-------------------------------------+  |
|  - Astro SSR API Routes (/api/chess/state, /api/chess/move)                  |
|  - Cloudflare D1 Storage & Compare-and-Swap Versioning                       |
+-------------------------------------------------------------------------------+
                                 |
                                 v
+-------------------------------------------------------------------------------+
|                     @samananias/turn-arbiter                          |
|  - Side Assignment & Balance Logic                                            |
|  - Injected Timestamp & Stall Expiry Evaluation                               |
|  - 5-Stage Rejection Hierarchy (game_over, superseded, etc.)                  |
+-------------------------------------------------------------------------------+
                                 |
                                 v
+-------------------------------------------------------------------------------+
|                   @samananias/turn-arbiter/chess                      |
|  - Legal move calculation & SAN notation via chess.js                         |
+-------------------------------------------------------------------------------+
```

---

## 4. Database Schema & Concurrency Control

Storage is managed via **Cloudflare D1** (SQLite) using Compare-and-Swap (CAS) on a `version` integer field.

```sql
CREATE TABLE game (
  id            INTEGER PRIMARY KEY CHECK (id = 1),
  version       INTEGER NOT NULL,
  fen           TEXT    NOT NULL,
  history       TEXT    NOT NULL,  -- JSON array of SAN notation
  position_keys TEXT    NOT NULL,  -- JSON array for threefold repetition
  contributors  INTEGER NOT NULL,
  last_move_at  TEXT    NOT NULL
);

CREATE TABLE finished_game (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  pgn          TEXT    NOT NULL,
  outcome      TEXT    NOT NULL,
  contributors INTEGER NOT NULL,
  ended_at     TEXT    NOT NULL
);

CREATE TABLE rate_limit (
  ip         TEXT PRIMARY KEY,
  tokens     REAL NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Compare-and-Swap (CAS) Atomic Update

```sql
UPDATE game
SET version       = version + 1,
    fen           = ?,
    history       = ?,
    position_keys = ?,
    contributors  = ?,
    last_move_at  = ?
WHERE id = 1 AND version = ?;
```

If affected rows (`changes`) is `0`, a teammate submitted first. The backend re-reads the row and responds with `superseded` plus the newly accepted board position.

---

## 5. Server API Surface

Two Astro SSR API routes handle game communication:

| Endpoint           | Method | Description                                                                                                         | Payload / Response                                        |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `/api/chess/state` | `GET`  | Reads current board state; assigns side & sets signed HTTP-only cookie ONLY when requested by an onboarded session. | Returns sanitized `publicView` JSON.                      |
| `/api/chess/move`  | `POST` | Validates session cookie signature, turn side, board `version`, and legal move.                                     | Returns `{ ok: true, state }` or `{ ok: false, reason }`. |

### Public State Payload

```json
{
  "version": 42,
  "fen": "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR b",
  "sideToMove": "black",
  "yourSide": "white",
  "canMoveNow": false,
  "recentMoves": ["e4", "c5", "Nf3"],
  "contributorCount": 47,
  "lastMoveAt": "2026-07-28T12:00:00Z",
  "outcome": null
}
```

---

## 6. Abuse Mitigation & Security

- **Gated Team Assignment:** Passive page loads do not trigger side allocation or pollute team balance.
- **Signed Session Cookie:** `HMAC-SHA256(sessionId + side)` prevents client-side side forgery.
- **IP Rate Limiting:** Per-IP token bucket limits rapid-fire automated moves.
- **Zero UGC in Game Engine:** Move submissions accept only SAN moves (e.g. `e4`, `Nf3`), removing profanity/moderation risks.
- **Stall Breaker:** If 48 hours elapse without a move, the position opens to any visitor regardless of team.

---

## 7. Verification & Definition of Done

1. `cmd /c "npx pnpm run format"` (Prettier write)
2. `cmd /c "npx pnpm run lint"` (ESLint syntax check)
3. `cmd /c "npx pnpm run check"` (Astro typecheck & link validation)
4. `cmd /c "npx pnpm run build"` (Production build compilation)
5. `cmd /c "npx pnpm run test:e2e"` (Playwright E2E test suite)
6. `cmd /c "npx pnpm run test:a11y"` (axe-core accessibility audit)
