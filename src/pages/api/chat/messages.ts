import type { APIRoute } from "astro";

export const prerender = false;

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: number;
  isSystem?: boolean;
}

// In-memory fallback buffer for dev / single worker instances
let globalChatHistory: ChatMessage[] = [
  {
    id: "welcome-1",
    sender: "System",
    avatar: "knight",
    text: "Welcome to the live chat room! Say hello or play a chess move.",
    timestamp: Date.now() - 60000,
    isSystem: true,
  },
];

export function getGlobalChatHistory(): ChatMessage[] {
  return globalChatHistory;
}

export function addGlobalChatMessage(msg: ChatMessage): ChatMessage[] {
  globalChatHistory.push(msg);
  if (globalChatHistory.length > 50) {
    globalChatHistory = globalChatHistory.slice(-50);
  }
  return globalChatHistory;
}

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ messages: globalChatHistory }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
};
