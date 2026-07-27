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
  partyHost?: string;
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

const SESSION_STORAGE_KEY = "portfolio_chat_session_token_v1";
const DISPLAY_NAME_KEY = "portfolio_chat_display_name_v1";

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
 * Robust React Hook managing real-time WebSocket connection to PartyKit backend.
 * Enforces mandatory username onboarding and persistent single-session identity.
 */
export function useChatSocket(options: UseChatSocketOptions = {}): UseChatSocketReturn {
  const { roomName = "global", partyHost } = options;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [presenceCount, setPresenceCount] = useState<number>(1);
  const [displayName, setDisplayNameState] = useState<string>(getInitialDisplayName);
  const [assignedName, setAssignedName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("knight");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef<number>(0);
  const typingTimerRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
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

  // Stable connect function
  const connect = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!displayNameRef.current || displayNameRef.current.trim().length < 3) {
      setIsConnecting(false);
      return;
    }

    if (
      socketRef.current &&
      (socketRef.current.readyState === WebSocket.OPEN ||
        socketRef.current.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    setIsConnecting(true);

    const token = getOrCreateSessionToken();
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

    let host = partyHost;
    if (!host) {
      const isLocal =
        window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      host = isLocal ? "127.0.0.1:1999" : window.location.host;
    }

    const wsUrl = `${protocol}//${host}/party/chat?room=${encodeURIComponent(
      roomName
    )}&token=${encodeURIComponent(token)}&name=${encodeURIComponent(displayNameRef.current)}`;

    try {
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setIsConnecting(false);
        setError(null);
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === "sync") {
            setMessages(data.history || []);
            setPresenceCount(data.presenceCount || 1);
            setAssignedName(data.assignedName || displayNameRef.current);
            if (data.avatar) setAvatar(data.avatar);
          } else if (data.type === "message") {
            if (data.message) {
              setMessages((prev) => [...prev.slice(-49), data.message]);
            }
          } else if (data.type === "presence") {
            setPresenceCount(data.presenceCount || 1);
          } else if (data.type === "name_updated") {
            if (data.assignedName) {
              setAssignedName(data.assignedName);
            }
          } else if (data.type === "typing") {
            const senderName = data.sender;
            if (!senderName) return;

            if (data.isTyping) {
              setTypingUsers((prev) => (prev.includes(senderName) ? prev : [...prev, senderName]));

              if (typingTimerRef.current.has(senderName)) {
                clearTimeout(typingTimerRef.current.get(senderName)!);
              }
              const timer = setTimeout(() => {
                setTypingUsers((prev) => prev.filter((u) => u !== senderName));
                typingTimerRef.current.delete(senderName);
              }, 3000);
              typingTimerRef.current.set(senderName, timer);
            } else {
              setTypingUsers((prev) => prev.filter((u) => u !== senderName));
              if (typingTimerRef.current.has(senderName)) {
                clearTimeout(typingTimerRef.current.get(senderName)!);
                typingTimerRef.current.delete(senderName);
              }
            }
          } else if (data.type === "error") {
            setError(data.message || "An error occurred.");
          }
        } catch {
          // Ignore JSON parse errors
        }
      };

      ws.onerror = () => {
        setIsConnected(false);
        setIsConnecting(false);
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsConnecting(false);
        socketRef.current = null;

        const delay = Math.min(2000 * Math.pow(2, reconnectAttemptsRef.current), 8000);
        reconnectAttemptsRef.current += 1;

        if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, delay);
      };
    } catch {
      setIsConnected(false);
      setIsConnecting(false);
    }
  }, [partyHost, roomName]);

  // Connect when displayName is set
  useEffect(() => {
    if (displayName && displayName.trim().length >= 3) {
      connect();
    } else {
      setIsConnecting(false);
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [connect, displayName]);

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

  // Action: Send Message
  const sendMessage = useCallback(
    (text: string): boolean => {
      const trimmed = text.trim();
      if (!trimmed) return false;

      const currentName = assignedName || displayName;
      const newMsg: ChatMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        sender: currentName,
        avatar,
        text: trimmed,
        timestamp: Date.now(),
      };

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({
            type: "chat",
            text: trimmed,
          })
        );
      } else {
        setMessages((prev) => [...prev.slice(-49), newMsg]);
      }

      return true;
    },
    [assignedName, displayName, avatar]
  );

  // Action: Send Typing Signal
  const sendTypingSignal = useCallback((isTyping: boolean) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "typing",
          isTyping,
        })
      );
    }
  }, []);

  // Action: Clear Error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    presenceCount,
    assignedName: assignedName || displayName,
    displayName,
    avatar,
    isConnected,
    isConnecting,
    hasOnboarded,
    error,
    typingUsers,
    sendMessage,
    setUsername,
    sendTypingSignal,
    clearError,
  };
}
