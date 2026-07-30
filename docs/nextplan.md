<aside>
♟️

**Premise:** one single, never-ending chess game shared by every visitor to the portfolio. You are assigned a side on arrival and stay on it. Anyone on your side may move; the first valid submission wins. You never learn who your opponent is — or who your allies are.

</aside>

## 0. Decisions locked in

| Decision         | Choice                                              | Rationale                                                                  |
| ---------------- | --------------------------------------------------- | -------------------------------------------------------------------------- |
| Turn model       | Persistent side membership, first valid submit wins | No lobby, no matchmaking, no waiting for an opponent                       |
| Move reservation | None                                                | Losing a race is a normal designed state, not an error                     |
| Package scope    | Game-agnostic core + optional chess adapter         | Zero-dependency core; nothing chess-shaped remains in the arbiter          |
| Chess rules      | `chess.js`, as an optional peer dependency          | Legality, checkmate, and draws are a solved problem                        |
| Storage          | Cloudflare D1, free tier                            | No cost, SQL for atomic writes, no idle suspension, same vendor as hosting |
| Concurrency      | Compare-and-swap on a `version` field               | Guarantees exactly one winner per race                                     |
| History shown    | Last 10 moves                                       | Display limit only — full history is persisted                             |
| Archive          | Data saved now, UI deferred                         | You cannot retroactively recover games you did not store                   |
| npm publish      | After the game is live                              | Ship private, publish once the API has stopped moving                      |

## 1. Why this concept works on a low-traffic site

Most multiplayer portfolio features die of loneliness: they need two simultaneous visitors, and a portfolio rarely has them. This design inverts that dependency.

Because new players are assigned to whichever side needs bodies, and because there is no reservation on a turn, **a visitor never waits for anyone**. They load the page, they are on a team, and if it is their side's turn they may move immediately. The opponent is simply whoever loads the page next — in an hour, or tomorrow.

The consequences are all favourable:

- No empty-lobby state to design around.
- No presence tracking, no heartbeats, no disconnect handling.
- **No WebSockets.** The interaction is one `GET` on load and one `POST` to move.
- Low traffic becomes atmosphere rather than failure. A game unfolding over three weeks across forty strangers is more interesting than a fast one.

The fog is literal. You do not know whether the last move came from a stranger, or from yourself in another tab last Tuesday.

## 2. What is in the package, and what is not

The package owns **permission**. `chess.js` owns **legality**. Your portfolio owns **appearance**.

| Question                                     | Answered by     |
| -------------------------------------------- | --------------- |
| Is `Nf3` legal from this position?           | `chess.js`      |
| Is this checkmate, stalemate, or a draw?     | `chess.js`      |
| Which side is this anonymous visitor on?     | **The package** |
| May they act right now?                      | **The package** |
| Did they lose the race to a teammate?        | **The package** |
| What does a knight look like?                | Your repo       |
| Board colours, animation, hover states, copy | Your repo       |

Rule of thumb: **if verifying a change requires looking at a screen, it does not belong in the package.** Everything in the arbiter must be assertable against strings.

No SVGs, no CSS, no fonts, no assets of any kind ship with the package. Pieces exist inside it only as characters in FEN and SAN notation.

## 3. The turn model in detail

### 3.1 Side assignment

On first visit, a session is bound to exactly one side and stays there. Assignment prefers, in order:

1. The side with fewer recently-active members.
2. On a tie, the side whose turn it is — so a fresh arrival can act immediately.

Binding is carried in a **signed HTTP-only cookie** (HMAC over `sessionId` plus `side`). This is stateless, requires no storage read to verify, and cannot be edited by the client. A session is bound to one side, so a single visitor cannot legally move for both.

### 3.2 Submitting a move

A move is accepted only if all four hold:

- The cookie signature is valid.
- The cookie's side equals the side to move.
- The submitted `version` matches the stored `version`.
- `chess.js` accepts the move as legal in the current position.

Otherwise it is rejected with a specific, distinguishable reason.

### 3.3 Losing the race is a feature

Two teammates submitting within the same second is expected traffic, not an edge case. The loser receives the reason `superseded` along with the new position, and the interface should say something in-world — _a teammate moved first_ — rather than surfacing an error. This is thematically ideal: the fog conceals your allies too.

### 3.4 The stall problem

If nobody is currently assigned to the side to move, the game halts. Two mitigations:

- Assignment always prefers the side that owes a move, so arrivals unblock the game by default.
- A **stall breaker**: if no move has been made for some threshold — 48 hours is a reasonable start — the position opens to any visitor regardless of assigned side.

## 4. Package design

This section is a summary only. The full package specification — API surface, behavioural rules, test plan, manifest, and publishing steps — now lives in its own document for the separate repo: fog-arbiter — Package Specification.

### 4.1 Shape

Two entry points. The core imports nothing.

```
@samananias/fog-arbiter          → core, zero dependencies
@samananias/fog-arbiter/chess    → chess.js adapter, ~30 lines
```

`chess.js` is declared as an **optional peer dependency**, pulled in only by consumers who import the subpath.

### 4.2 Purity contract

The arbiter performs no I/O, reads no clock, and starts no timers. Time is injected; state is returned. This makes it run unchanged in Node, Bun, Deno, Cloudflare Workers, and the browser, and makes every concurrency case testable without a server.

```tsx
import { createArbiter } from "@samananias/fog-arbiter";
import { chessRules } from "@samananias/fog-arbiter/chess";

const arbiter = createArbiter({
  rules: chessRules,
  state: storedState, // or undefined to begin a new game
  now: Date.now(), // injected, never read internally
  stallAfterMs: 48 * 3600_000,
});

// Who is this visitor?
const assignment = arbiter.assign({ sessionId });
// → { side: "white", canMoveNow: true }

// Attempt a move
const result = arbiter.submit({
  sessionId,
  side: "white",
  move: "e4",
  version: 41,
});
// → { ok: true,  state, san: "e4", outcome: null }
// → { ok: false, reason: "superseded" | "not_your_side" | "illegal_move" | "game_over" }

arbiter.serialize(); // → plain JSON; you persist it however you like
arbiter.publicView(); // → what is safe to send the browser
```

### 4.3 The rules interface

The entire chess-specific surface, which the adapter implements:

```tsx
type Rules<Position, Move> = {
  initial(): Position;
  applyMove(
    position: Position,
    move: Move
  ):
    | { ok: false }
    | {
        ok: true;
        position: Position;
        sideToMove: "white" | "black";
        notation: string;
        positionKey: string;
        outcome: Outcome | null;
      };
};
```

`positionKey` is what makes threefold repetition possible — see §5.3.

## 5. Storage

### 5.1 Storage on a zero budget

**Hard constraint: no paid services.** The only two requirements are durability across requests and an atomic compare-and-swap, since "first valid submit wins" is meaningless without one. Everything below is judged on whether a free tier satisfies both.

| Option            | Verdict                                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Cloudflare D1** | **Chosen.** Free tier, SQLite, atomic `UPDATE ... WHERE version = ?`, no idle suspension, same vendor as hosting |
| Upstash Redis     | Free tier is sufficient, but adds a second vendor and gives no SQL if the archive returns                        |
| Neon Postgres     | Free with autosuspend that wakes on demand; a reasonable fallback                                                |
| Supabase          | Free, but idle projects are paused after about a week — fatal for a board that may sit quiet for days            |
| Cloudflare KV     | Free, but **eventually consistent**. Two racing writes can both appear to succeed. Unusable here                 |
| Durable Object    | Ideal design fit, requires the paid Workers plan. Excluded                                                       |
| In-memory         | Impossible; serverless invocations do not share memory                                                           |
| Client storage    | Impossible; would give every visitor a private board                                                             |

D1 wins on a detail specific to this project: **it brings the archive back at no cost.** The only reason the archive was cut was that Redis made those queries awkward. With SQLite, "list finished games" is one `SELECT`, so §5.3's advice to save PGNs stops being speculative groundwork and becomes a feature you can ship whenever you want.

**Headroom.** A chess move costs roughly one read and one write. Even an unrealistically busy board — a hundred moves a day plus a thousand page loads — sits at a small fraction of the free allowances for D1 reads, D1 writes, and Workers requests. Traffic is not the risk here; forgetting to add an index would cost you more than visitors ever will.

Because the package exposes `serialize()` and `restore()` and never touches storage itself, **this decision is reversible** without touching the package.

### 5.2 Schema

One row holds the live game. The `CHECK (id = 1)` constraint makes it structurally impossible to accidentally create a second concurrent game.

```sql
CREATE TABLE game (
  id            INTEGER PRIMARY KEY CHECK (id = 1),
  version       INTEGER NOT NULL,
  fen           TEXT    NOT NULL,
  history       TEXT    NOT NULL,  -- JSON array of SAN, complete
  position_keys TEXT    NOT NULL,  -- JSON array, for repetition detection
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

Side balancing does not need a table. Derive it from the signed cookies you have already issued, or skip precise balancing entirely and assign new arrivals to the side that owes a move — which is the behaviour §3.1 wants anyway.

### 5.3 Store everything, display ten

The 10-move limit is **presentation only**. Truncating stored history would silently break threefold repetition detection, because `chess.js` identifies it by comparing against every previous position. Restoring from a bare FEN discards that memory. The fifty-move rule survives regardless, since the halfmove clock is encoded in the FEN.

A full game in SAN is roughly 300–400 bytes, so persisting all of it is free. Keep the complete move list and the array of position keys; send only the last ten moves to the browser.

The same reasoning applies to finished games. Write the PGN even with no archive UI — 1,000 completed games is around 300 KB, and the alternative is permanently discarding the most interesting artifact this feature produces.

### 5.4 Compare-and-swap

The entire race-condition defence is one statement. No transaction, no lock, no Lua.

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

If `meta.changes` comes back as `0`, someone on your side moved first. Re-read the row and return `superseded` with the new position. This is the single most important line in the whole feature — without the `AND version = ?`, two simultaneous moves would both be accepted and one would silently vanish.

## 6. Server surface

Two endpoints. No sockets, no polling loop required.

| Endpoint               | Purpose                                               | Returns                                   |
| ---------------------- | ----------------------------------------------------- | ----------------------------------------- |
| `GET /api/chess/state` | Load the board; assign a side if the visitor has none | Public view + `Set-Cookie` on first visit |
| `POST /api/chess/move` | Attempt a move                                        | New public view, or a rejection reason    |

The public view sent to the browser:

```json
{
  "version": 41,
  "fen": "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR b",
  "sideToMove": "black",
  "yourSide": "white",
  "canMoveNow": false,
  "recentMoves": ["e4", "c5", "Nf3"],
  "contributorCount": 47,
  "lastMoveAt": "2026-07-27T17:40:00Z",
  "outcome": null
}
```

Note what is deliberately absent: no session identifiers, no IP data, no per-move attribution, no count of who is currently on each side. Revealing side populations would let someone infer whether they are outnumbered, which erodes the fog.

### 6.1 Hosting these on an Astro site

The portfolio currently builds fully static with no adapter, so it has nowhere to run server code. Two routes forward:

1. **Add an adapter** and leave everything prerendered except the two API routes. This keeps one repo and one deploy.
2. **Host the endpoints separately** as a small Worker or serverless function on its own subdomain, and have the static site call it with CORS. Cleaner separation, one more thing to deploy.

Option 1 is simpler operationally, with one caveat: `astro.config.ts` currently registers Keystatic only when `NODE_ENV !== "production"`, and that variable is almost certainly undefined during `astro build` — meaning Keystatic is being bundled into production already. Fix that gate before introducing an adapter, or the admin routes will collide with server output.

## 7. Interface

- **Board as inline SVG.** Follow the existing `?raw` import pattern from `ThemeToggle.astro` so pieces inherit `currentColor`, the woodcut stroke tokens, and dark mode for free.
- **Reuse the existing piece set.** `BaseLayout.astro` already maps routes to pieces via `pieceByHref`, and the project schema carries a `chessPiece` field. If the knight in the sidebar is the knight on the board, the game reads as part of the site rather than a bolted-on widget.
- **One file per piece**, with sides distinguished by `fill` and `stroke` from CSS — not two sets of assets.
- **State copy carries the concept.** "You are the 47th player to touch this board." "No move for 6 hours." "A teammate moved first." This copy is most of the atmosphere.
- **Progressive enhancement.** Render the board server-side from the FEN so it is visible and legible with JavaScript disabled; only move submission needs the client.

## 8. Abuse and moderation

With no accounts, the threat model is narrow but real.

| Risk                                           | Mitigation                                                                   |
| ---------------------------------------------- | ---------------------------------------------------------------------------- |
| One person clearing cookies to play both sides | Per-IP token bucket makes a solo game take days; accept the rest as thematic |
| Rapid-fire move spam                           | Per-session cooldown plus per-IP hourly cap                                  |
| Forged side claims                             | Signed cookie; the server never trusts a client-supplied side                |
| Forged board state                             | Server validates against stored FEN; client positions are never trusted      |
| Deliberately losing to reset the game          | Cheap to do, cheap to recover from — the archive preserves the record        |
| Stalled game                                   | Stall breaker opens the position after the threshold                         |

There is no user-generated text anywhere in this feature, which removes the entire profanity and harassment surface. That is a significant advantage over the chatbox concept.

## 9. Publishing the package

**Repository:** separate from the portfolio, so it is independently versioned. The portfolio then consumes it as a real dependency — a better story than a local folder.

**Manifest essentials:** `type: "module"`, an `exports` map with the `/chess` subpath, `types`, a `files` allowlist rather than `.npmignore`, `sideEffects: false`, `engines`, `repository`, `license`, `keywords`, `peerDependenciesMeta.chess.js.optional: true`.

**Build:** `tsdown` or `tsup` to ESM plus declaration files. Skip CJS unless a consumer asks.

**Tests:** `vitest`. Because the core is pure and time is injected, the interesting cases — simultaneous submissions, stall expiry, repetition draws — are all testable with a toy two-player rules object and fake timestamps. No chess knowledge required to test the arbiter.

**Pre-publish gates:** `npm pack --dry-run` to verify contents, plus `publint` and `attw` to catch export-map and type-resolution mistakes that silently break consumers.

**Release:** publish from GitHub Actions using npm Trusted Publishing (OIDC) with `--provenance`, so no long-lived token lives in secrets. Add `changesets` once past `0.1.0`.

**README:** a live link to the running board on the portfolio. That link is the entire pitch.

## 10. Roadmap

| Phase | Deliverable                                                            | Done when                                                             |
| ----- | ---------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 0     | Repo, TypeScript, vitest, lint, CI                                     | `pnpm test` passes on a trivial export                                |
| 1     | Core arbiter against a toy rules object                                | Race conditions, stalls, and assignment are all covered by tests      |
| 2     | `chess.js` adapter on the `/chess` subpath                             | A full game can be played through the arbiter in a test               |
| 3     | D1 storage plus the two endpoints                                      | Two `curl` calls in the same second produce exactly one accepted move |
| 4     | Static board rendering a FEN, no interaction                           | The position is legible and matches the site's visual language        |
| 5     | Move submission wired end to end                                       | Feature complete                                                      |
| 6     | History, contributor count, stall breaker, game reset with PGN capture | Shippable                                                             |
| 7     | Publish `0.1.0`                                                        | Installable from npm with provenance                                  |
| Later | Archive UI, live spectating over SSE, per-game statistics              | Optional                                                              |

Phases 0–2 need no infrastructure, no hosting decisions, and no design work. That is deliberate — the hardest logic gets built and proven while the surface area is small enough to hold in your head.

## 11. Open questions

1. **Does a completed game reset immediately, or sit visible for a while?** Showing the final position with its outcome for a day or two gives the conclusion weight, rather than wiping it the instant it ends.
2. **Should a visitor be told how many moves they personally contributed?** It builds attachment, but requires storing per-session move counts and slightly thins the anonymity.
3. **What is the stall threshold?** 48 hours is a guess. On a quiet site it may need to be shorter, or the board will look abandoned.
4. **Package name.** `fog-arbiter` describes the core honestly, but `fog-chess` is more memorable and the chess adapter is what people will actually use.
5. **Does the game get its own route, or live on an existing page?** A dedicated route is easier to link and to write a case study about.

---

## 12. Active Plan Status (Session Checkpoint)

> [!NOTE]
> **Current Status: IN PROGRESS** (Refinement Phase 6)
>
> - **3D Stage Scene Graph Architecture**: Implemented 5-layer Scene Graph (`ChessStage` -> `Board Surface` -> `Highlight Layer` -> `Piece Renderer Layer` -> `UI Overlay`).
> - **Centralized Projection Engine (`projectPiece`)**: Integrated `projectPiece()` in `src/components/chess/sceneConfig.ts` converting board coordinates (`x, y`) to screen position, depth (`zIndex`), height, and tilt (`rotateX(-46deg)`).
> - **Decoupled Grid**: Board grid surface is 100% agnostic of piece children.
> - **Dynamic Depth Sorting**: Screen Y depth sorting (`pieces.sort((a,b) => a.y - b.y)`).
> - **Pending Work**: Final visual polish, move animation system, and end-to-end verification suite.
