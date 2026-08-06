import type { APIRoute } from "astro";
import { addChatMessage, type ChatMessage } from "./messages";

export const prerender = false;

const MAX_MESSAGE_LENGTH = 280;

function sanitizeText(input: string): string {
  if (!input) return "";
  return input
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const { sender, avatar, text } = body;

    if (!sender || !text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(JSON.stringify({ ok: false, error: "Sender and text are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const cleanText = sanitizeText(text);
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      sender: sanitizeText(sender).slice(0, 20),
      avatar: avatar || "knight",
      text: cleanText,
      timestamp: Date.now(),
    };

    const updatedHistory = await addChatMessage(locals, newMessage);

    return new Response(
      JSON.stringify({ ok: true, message: newMessage, history: updatedHistory }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "CDN-Cache-Control": "no-store",
          "Cloudflare-CDN-Cache-Control": "no-store",
        },
      }
    );
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Failed to process chat message." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
