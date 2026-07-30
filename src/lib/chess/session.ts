const SESSION_SECRET =
  process.env.CHESS_SESSION_SECRET || "turn-arbiter-local-dev-secret-key-32bytes";
const COOKIE_NAME = "chess_session";

export interface SessionData {
  sessionId: string;
  side: "white" | "black";
}

const encoder = new TextEncoder();

async function getHmacKey(secret: string): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Sign session payload (sessionId + side) using Web Crypto HMAC-SHA256.
 */
export async function signSession(sessionId: string, side: "white" | "black"): Promise<string> {
  const payload = `${sessionId}:${side}`;
  const key = await getHmacKey(SESSION_SECRET);
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const hexSignature = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${payload}.${hexSignature}`;
}

/**
 * Verify signed session cookie value using Web Crypto.
 * Returns SessionData if valid, null if invalid or tampered.
 */
export async function verifySession(
  cookieValue: string | undefined | null
): Promise<SessionData | null> {
  if (!cookieValue) return null;

  const lastDotIndex = cookieValue.lastIndexOf(".");
  if (lastDotIndex === -1) return null;

  const payload = cookieValue.substring(0, lastDotIndex);
  const signature = cookieValue.substring(lastDotIndex + 1);

  const parts = payload.split(":");
  if (parts.length !== 2) return null;

  const [sessionId, side] = parts;
  if (side !== "white" && side !== "black") return null;

  const key = await getHmacKey(SESSION_SECRET);
  const expectedBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const expectedHex = Array.from(new Uint8Array(expectedBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (signature !== expectedHex) return null;

  return { sessionId, side };
}

export function generateSessionId(): string {
  return crypto.randomUUID();
}

export { COOKIE_NAME };
