export interface StoredGameState {
  version: number;
  fen: string;
  history: string[]; // Full SAN move history
  positionKeys: string[]; // Array of FEN position keys for threefold repetition
  contributors: number;
  lastMoveAt: string;
}

export interface StorageProvider {
  getGame(): Promise<StoredGameState | null>;
  saveGame(
    currentVersion: number,
    nextState: StoredGameState
  ): Promise<{ ok: true; state: StoredGameState } | { ok: false; reason: "superseded" }>;
  archiveGame(pgn: string, outcome: string, contributors: number): Promise<void>;
}

// Default initial FEN position
export const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// Memory storage instance for local development / testing
let memoryState: StoredGameState = {
  version: 0,
  fen: INITIAL_FEN,
  history: [],
  positionKeys: [INITIAL_FEN.split(" ")[0]],
  contributors: 0,
  lastMoveAt: new Date().toISOString(),
};

/**
 * In-Memory Storage Provider (Local Dev / Fallback)
 * Implements atomic compare-and-swap (CAS) logic in memory.
 */
export const memoryStorageProvider: StorageProvider = {
  async getGame(): Promise<StoredGameState | null> {
    return {
      ...memoryState,
      history: [...memoryState.history],
      positionKeys: [...memoryState.positionKeys],
    };
  },

  async saveGame(
    currentVersion: number,
    nextState: StoredGameState
  ): Promise<{ ok: true; state: StoredGameState } | { ok: false; reason: "superseded" }> {
    // Atomic Compare-And-Swap (CAS) check
    if (memoryState.version !== currentVersion) {
      return { ok: false, reason: "superseded" };
    }

    memoryState = {
      ...nextState,
      history: [...nextState.history],
      positionKeys: [...nextState.positionKeys],
    };

    return { ok: true, state: { ...memoryState } };
  },

  async archiveGame(pgn: string, outcome: string, contributors: number): Promise<void> {
    console.log(
      `[Chess Archive] Game ended (${outcome}) with ${contributors} contributors. PGN captured:`,
      pgn
    );
  },
};

// @ts-expect-error cloudflare:workers virtual module resolved during Cloudflare Workers runtime
import { env as cfEnv } from "cloudflare:workers";

export interface D1PreparedStatement {
  first<T = Record<string, unknown>>(): Promise<T | null>;
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<{ meta: { changes: number } }>;
}

export interface D1DatabaseBinding {
  prepare(query: string): D1PreparedStatement;
}

/**
 * Safely extracts the D1 database binding from Cloudflare Workers runtime or Astro.locals.
 * Resolves from `cloudflare:workers` env or `locals.DB`.
 */
export function getD1Database(locals?: unknown): D1DatabaseBinding | undefined {
  try {
    let targetEnv: Record<string, unknown> | undefined = undefined;
    try {
      if (typeof cfEnv !== "undefined") {
        targetEnv = cfEnv as Record<string, unknown>;
      }
    } catch {
      // cloudflare:workers env unavailable in local dev
    }

    const rawLocals = locals as Record<string, unknown>;
    const globalObj = globalThis as unknown as Record<string, unknown>;
    const db = (targetEnv?.DB || rawLocals?.DB || globalObj?.DB) as D1DatabaseBinding | undefined;

    if (db && typeof db.prepare === "function") {
      return db;
    }
  } catch {
    // Memory fallback
  }
  return undefined;
}

async function ensureD1Tables(d1Binding: D1DatabaseBinding): Promise<void> {
  try {
    await d1Binding
      .prepare(
        `CREATE TABLE IF NOT EXISTS game (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          version INTEGER NOT NULL,
          fen TEXT NOT NULL,
          history TEXT NOT NULL,
          position_keys TEXT NOT NULL,
          contributors INTEGER NOT NULL,
          last_move_at TEXT NOT NULL
        )`
      )
      .run();

    await d1Binding
      .prepare(
        `CREATE TABLE IF NOT EXISTS finished_game (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          pgn TEXT NOT NULL,
          outcome TEXT NOT NULL,
          contributors INTEGER NOT NULL,
          ended_at TEXT NOT NULL
        )`
      )
      .run();

    await d1Binding
      .prepare(
        `INSERT OR IGNORE INTO game (id, version, fen, history, position_keys, contributors, last_move_at)
         VALUES (1, 0, '${INITIAL_FEN}', '[]', '${JSON.stringify([INITIAL_FEN.split(" ")[0]])}', 0, '${new Date().toISOString()}')`
      )
      .run();
  } catch (e) {
    console.error("[D1 Auto-Schema Error]:", e);
  }
}

/**
 * Cloudflare D1 Storage Provider
 * Implements atomic SQL Compare-and-Swap (CAS): UPDATE game SET ... WHERE id = 1 AND version = ?
 */
export function createD1StorageProvider(d1Binding: D1DatabaseBinding): StorageProvider {
  let isInitialized = false;

  const initSchema = async () => {
    if (!isInitialized) {
      await ensureD1Tables(d1Binding);
      isInitialized = true;
    }
  };

  return {
    async getGame(): Promise<StoredGameState | null> {
      try {
        await initSchema();
        const row = (await d1Binding.prepare("SELECT * FROM game WHERE id = 1").first()) as Record<
          string,
          unknown
        > | null;

        if (!row) {
          return {
            version: 0,
            fen: INITIAL_FEN,
            history: [],
            positionKeys: [INITIAL_FEN.split(" ")[0]],
            contributors: 0,
            lastMoveAt: new Date().toISOString(),
          };
        }

        return {
          version: Number(row.version),
          fen: String(row.fen),
          history: JSON.parse(String(row.history || "[]")),
          positionKeys: JSON.parse(String(row.position_keys || "[]")),
          contributors: Number(row.contributors),
          lastMoveAt: String(row.last_move_at),
        };
      } catch (e) {
        console.error("[D1 Storage] Error reading game state:", e);
        return memoryStorageProvider.getGame();
      }
    },

    async saveGame(
      currentVersion: number,
      nextState: StoredGameState
    ): Promise<{ ok: true; state: StoredGameState } | { ok: false; reason: "superseded" }> {
      try {
        await initSchema();
        const stmt = d1Binding.prepare(`
          UPDATE game
          SET version       = ?,
              fen           = ?,
              history       = ?,
              position_keys = ?,
              contributors  = ?,
              last_move_at  = ?
          WHERE id = 1 AND version = ?
        `);

        const result = await stmt
          .bind(
            nextState.version,
            nextState.fen,
            JSON.stringify(nextState.history),
            JSON.stringify(nextState.positionKeys),
            nextState.contributors,
            nextState.lastMoveAt,
            currentVersion
          )
          .run();

        if (result.meta.changes === 0) {
          return { ok: false, reason: "superseded" };
        }

        return { ok: true, state: nextState };
      } catch (e) {
        console.error("[D1 Storage] Error executing CAS update:", e);
        return memoryStorageProvider.saveGame(currentVersion, nextState);
      }
    },

    async archiveGame(pgn: string, outcome: string, contributors: number): Promise<void> {
      try {
        await d1Binding
          .prepare(
            `INSERT INTO finished_game (pgn, outcome, contributors, ended_at) VALUES (?, ?, ?, ?)`
          )
          .bind(pgn, outcome, contributors, new Date().toISOString())
          .run();
      } catch (e) {
        console.error("[D1 Storage] Error archiving finished game:", e);
      }
    },
  };
}
