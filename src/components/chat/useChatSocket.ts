import { useEffect, useRef, useState, useCallback } from "react";

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: number;
  isSystem?: boolean;
}

export interface UseChatSocketOptions {
  roomName?: string;
}

export interface UseChatSocketReturn {
  messages: ChatMessage[];
  presenceCount: number;
  assignedName: string;
  displayName: string;
  avatar: string;
  isConnected: boolean;
  isConnecting: boolean;
  hasOnboarded: boolean;
  error: string | null;
  typingUsers: string[];
  sendMessage: (text: string) => boolean;
  setUsername: (newName: string) => boolean;
  sendTypingSignal: (isTyping: boolean) => void;
  clearError: () => void;
}

const DISPLAY_NAME_KEY = "portfolio_chat_display_name_v1";
const SESSION_STORAGE_KEY = "portfolio_chat_session_token_v1";

/** Polling interval in milliseconds. */
const POLL_INTERVAL_MS = 3000;

const CHESS_AVATARS = ["knight", "rook", "bishop", "pawn", "king", "queen"];
const RESERVED_NAMES = ["admin", "system", "mod", "moderator", "owner"];

/**
 * Validates a user-submitted display name.
 */
export function validateUsername(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { valid: false, error: "Username cannot be empty or whitespace only." };
  }
  if (trimmed.length < 3) {
    return { valid: false, error: "Username must be at least 3 characters." };
  }
  if (trimmed.length > 20) {
    return { valid: false, error: "Username must be 20 characters or fewer." };
  }
  const lower = trimmed.toLowerCase();
  if (RESERVED_NAMES.some((res) => lower.includes(res))) {
    return { valid: false, error: `The username "${trimmed}" is reserved. Please choose another.` };
  }
  return { valid: true };
}

function getOrCreateSessionToken(): string {
  if (typeof window === "undefined") return "server_placeholder";
  try {
    let token = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!token) {
      token = crypto.randomUUID
        ? crypto.randomUUID()
        : `anon_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem(SESSION_STORAGE_KEY, token);
    }
    return token;
  } catch {
    return `anon_${Math.random().toString(36).substring(2, 11)}`;
  }
}

function getInitialDisplayName(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(DISPLAY_NAME_KEY) || "";
  } catch {
    return "";
  }
}

function getAvatarForSession(sessionToken: string): string {
  let hash = 0;
  for (let i = 0; i < sessionToken.length; i++) {
    hash = (hash << 5) - hash + sessionToken.charCodeAt(i);
    hash |= 0;
  }
  return CHESS_AVATARS[Math.abs(hash) % CHESS_AVATARS.length];
}

/**
 * React Hook managing chat via HTTP polling against `/api/chat/messages`
 * and `/api/chat/send`. Replaces the former WebSocket-based hook after
 * PartyKit deployment became unavailable.
 */
export function useChatSocket(): UseChatSocketReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [displayName, setDisplayNameState] = useState<string>(getInitialDisplayName);
  const [avatar, setAvatar] = useState<string>("knight");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const displayNameRef = useRef<string>(displayName);

  // Synchronize ref with state
  useEffect(() => {
    displayNameRef.current = displayName;
  }, [displayName]);

  // Initial avatar computation
  useEffect(() => {
    const token = getOrCreateSessionToken();
    setAvatar(getAvatarForSession(token));
  }, []);

  const hasOnboarded = Boolean(displayName.trim() && displayName.trim().length >= 3);

  // Fetch messages from the HTTP API
  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/chat/messages");
      if (!res.ok) return;
      const data = await res.json();
      if (data && Array.isArray(data.messages)) {
        setMessages(data.messages);
        setIsConnected(true);
      }
    } catch {
      setIsConnected(false);
    }
  }, []);

  // Poll for messages when onboarded
  useEffect(() => {
    if (!hasOnboarded) return;

    // Initial fetch
    fetchMessages();

    const interval = setInterval(fetchMessages, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [hasOnboarded, fetchMessages]);

  // Action: Set Initial Username (Onboarding)
  const setUsername = useCallback((newName: string): boolean => {
    const validation = validateUsername(newName);
    if (!validation.valid) {
      setError(validation.error || "Invalid username.");
      return false;
    }

    const trimmed = newName.trim();
    setDisplayNameState(trimmed);
    displayNameRef.current = trimmed;

    try {
      localStorage.setItem(DISPLAY_NAME_KEY, trimmed);
    } catch {
      // Ignore storage error
    }

    setError(null);
    return true;
  }, []);

  // Action: Send Message via HTTP POST
  const sendMessage = useCallback(
    (text: string): boolean => {
      const trimmed = text.trim();
      if (!trimmed) return false;

      const currentName = displayName;

      // Optimistic local append
      const optimisticMsg: ChatMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        sender: currentName,
        avatar,
        text: trimmed,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev.slice(-49), optimisticMsg]);

      // POST to server
      fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: currentName, avatar, text: trimmed }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && Array.isArray(data.history)) {
            setMessages(data.history);
          }
        })
        .catch(() => {
          // Keep optimistic message on failure
        });

      return true;
    },
    [displayName, avatar]
  );

  // No-op: typing signals are not supported with HTTP polling
  const sendTypingSignal = useCallback(() => {}, []);

  // Action: Clear Error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    presenceCount: 0,
    assignedName: displayName,
    displayName,
    avatar,
    isConnected,
    isConnecting: false,
    hasOnboarded,
    error,
    typingUsers: [],
    sendMessage,
    setUsername,
    sendTypingSignal,
    clearError,
  };
}
