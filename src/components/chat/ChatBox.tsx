import React, { useState, useRef, useEffect } from "react";
import { useChatSocket, validateUsername } from "./useChatSocket";

export interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
  partyHost?: string;
}

const CHESS_SYMBOLS: Record<string, string> = {
  knight: "♞",
  rook: "♜",
  bishop: "♝",
  pawn: "♟",
  king: "♔",
  queen: "♛",
};

/**
 * Fullscreen Anonymous Real-Time Chat Modal with Frosted Glass Background Blur.
 * Optimized for 100% Mobile & Desktop Responsiveness with Woodcut Line-Art Framing.
 */
export const ChatBox: React.FC<ChatBoxProps> = ({ isOpen, onClose, partyHost }) => {
  const {
    messages,
    presenceCount,
    assignedName,
    displayName,
    avatar,
    isConnected,
    hasOnboarded,
    error,
    typingUsers,
    sendMessage,
    setUsername,
    sendTypingSignal,
    clearError,
  } = useChatSocket({ partyHost });

  const [inputText, setInputText] = useState("");
  const [onboardingInput, setOnboardingInput] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onboardingInputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom on message update
  useEffect(() => {
    if (isOpen && hasOnboarded) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, hasOnboarded]);

  // Focus appropriate input when modal opens or onboarding status changes
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (!hasOnboarded) {
          onboardingInputRef.current?.focus();
        } else {
          inputRef.current?.focus();
        }
      }, 100);
    }
  }, [isOpen, hasOnboarded]);

  // Lock background body scrollbar when chat modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const success = sendMessage(inputText);
    if (success) {
      setInputText("");
      sendTypingSignal(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);
    if (text.length > 0) {
      sendTypingSignal(true);
    } else {
      sendTypingSignal(false);
    }
  };

  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateUsername(onboardingInput);
    if (!result.valid) {
      setValidationError(result.error || "Invalid username.");
      return;
    }

    setValidationError(null);
    const ok = setUsername(onboardingInput);
    if (!ok) {
      setValidationError("Failed to save username.");
    }
  };

  const currentChessSymbol = CHESS_SYMBOLS[avatar] || "♞";
  const activeError = validationError || error;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Real-time live chat room"
      className="bg-bg/85 dark:bg-bg/90 animate-reveal fixed inset-0 z-[100] flex items-center justify-center p-2 backdrop-blur-md sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Container */}
      <div
        ref={modalRef}
        className="bg-surface border-structural border-border-custom relative flex h-[92vh] max-h-[750px] w-full max-w-3xl flex-col overflow-hidden rounded-lg shadow-[4px_4px_0_var(--color-border-custom)] sm:h-[88vh]"
      >
        {/* Header Bar */}
        <header className="bg-surface border-b-hatch border-border-custom flex shrink-0 items-center justify-between px-3.5 py-2.5 select-none sm:px-5 sm:py-3.5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="font-display text-primary shrink-0 text-lg sm:text-xl">
              {currentChessSymbol}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h2 className="font-display text-text text-sm font-bold tracking-tight sm:text-base">
                  Live Portfolio Chat
                </h2>
                {hasOnboarded && (
                  <span
                    title={isConnected ? "Connected to live edge" : "Connecting..."}
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 font-mono text-[10px] font-semibold sm:gap-1.5 sm:px-2 sm:text-[11px] ${
                      isConnected
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        isConnected ? "animate-pulse bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    {presenceCount} Online
                  </span>
                )}
              </div>
              <p className="text-text-muted hidden font-mono text-[11px] sm:block">
                Ephemeral in-memory room · No login required
              </p>
            </div>
          </div>

          {/* Right Header Actions: Read-Only User Badge & Close Button */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            {hasOnboarded && (
              <div
                title="Your immutable session handle"
                className="border-border-custom bg-surface-subtle text-text flex max-w-[130px] items-center gap-1 rounded border px-2 py-0.5 font-mono text-[11px] font-semibold sm:max-w-none sm:gap-1.5 sm:px-3 sm:py-1 sm:text-xs"
              >
                <span className="text-primary shrink-0">{currentChessSymbol}</span>
                <span className="truncate">{assignedName || displayName}</span>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close chat modal"
              className="text-text-muted hover:text-text hover:bg-surface-subtle cursor-pointer rounded border border-transparent p-1 text-base leading-none transition-colors sm:p-1.5 sm:text-lg"
            >
              ✕
            </button>
          </div>
        </header>

        {/* Error Banner */}
        {activeError && (
          <div className="border-border-custom flex items-center justify-between border-b bg-rose-500/10 px-3 py-1.5 font-mono text-[11px] text-rose-700 sm:px-4 sm:py-2 sm:text-xs dark:text-rose-300">
            <span className="truncate">⚠️ {activeError}</span>
            <button
              type="button"
              onClick={() => {
                setValidationError(null);
                clearError();
              }}
              className="ml-2 text-rose-600 hover:underline dark:text-rose-400"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Mandatory Onboarding Screen vs Live Message Feed */}
        {!hasOnboarded ? (
          <div className="bg-bg flex flex-1 flex-col items-center justify-center p-4 text-center sm:p-6">
            <div className="bg-surface border-structural border-border-custom w-full max-w-md rounded-lg p-5 shadow-[3px_3px_0_var(--color-border-custom)] sm:p-6">
              <div className="bg-primary/10 border-primary/20 text-primary mx-auto mb-3 flex size-10 items-center justify-center rounded-full border text-xl sm:mb-4 sm:size-12 sm:text-2xl">
                ♞
              </div>

              <h3 className="font-display text-text mb-1 text-lg font-bold sm:text-xl">
                Choose Your Handle
              </h3>
              <p className="text-text-muted mb-5 font-sans text-xs leading-relaxed sm:mb-6">
                Choose a display name for this browser session. It will be saved locally and used
                whenever you chat.
              </p>

              <form onSubmit={handleOnboardingSubmit} className="space-y-3.5 sm:space-y-4">
                <div className="relative text-left">
                  <label
                    htmlFor="onboarding-username"
                    className="text-text-muted mb-1 block font-mono text-[11px] font-semibold"
                  >
                    Display Name (3–20 characters)
                  </label>
                  <input
                    id="onboarding-username"
                    ref={onboardingInputRef}
                    type="text"
                    value={onboardingInput}
                    onChange={(e) => {
                      setOnboardingInput(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    maxLength={20}
                    placeholder="e.g. TacticalKnight"
                    className="bg-bg border-border-custom text-text placeholder:text-text-muted focus:ring-primary w-full rounded border px-3 py-2 font-sans text-xs outline-none focus:ring-2 sm:px-3.5 sm:py-2.5 sm:text-sm"
                  />
                  <span className="text-text-muted absolute top-7 right-2.5 font-mono text-[10px] sm:top-8 sm:right-3">
                    {onboardingInput.trim().length}/20
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={onboardingInput.trim().length < 3}
                  className="bg-primary border-primary w-full cursor-pointer rounded border py-2 font-mono text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 sm:py-2.5 sm:text-sm"
                >
                  Join Chat ♞
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            {/* Live Message Feed */}
            <div className="bg-bg flex-1 space-y-2.5 overflow-y-auto p-3 sm:space-y-3 sm:p-5">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="bg-surface border-border-custom max-w-sm rounded-lg border p-5 text-center shadow-sm sm:p-6">
                    <span className="font-display text-primary text-2xl sm:text-3xl">♞</span>
                    <h3 className="font-display text-text mt-2 text-sm font-bold sm:text-base">
                      Welcome to Live Portfolio Chat!
                    </h3>
                    <p className="text-text-muted mt-1 font-sans text-xs leading-relaxed">
                      No users have sent a message yet. Be the first to start the conversation!
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.sender === (assignedName || displayName);
                  const isSystemMsg = msg.isSystem || msg.sender === "System";
                  const avatarSymbol = CHESS_SYMBOLS[msg.avatar] || "♞";

                  if (isSystemMsg) {
                    return (
                      <div
                        key={msg.id}
                        className="my-1.5 flex items-center justify-center text-center sm:my-2"
                      >
                        <span className="bg-surface-subtle border-border-custom/50 text-text-muted max-w-[95%] truncate rounded-full border px-2.5 py-0.5 font-mono text-[10px] italic shadow-xs sm:max-w-none sm:px-3 sm:py-1 sm:text-[11px]">
                          {msg.text}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2 sm:gap-2.5 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {/* Chess Avatar Badge */}
                      <div
                        title={msg.sender}
                        className={`border-border-custom flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold shadow-xs select-none sm:size-8 sm:text-sm ${
                          isMe
                            ? "bg-primary text-white"
                            : "bg-surface text-primary border-border-custom"
                        }`}
                      >
                        {avatarSymbol}
                      </div>

                      {/* Message Content Bubble */}
                      <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                        <div className="mb-0.5 flex items-center gap-1.5 font-mono text-[9px] sm:gap-2 sm:text-[10px]">
                          <span className="text-text-muted font-bold">{msg.sender}</span>
                          <span className="text-text-muted/70">
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        <div
                          className={`max-w-[88%] rounded-lg border px-3 py-2 font-sans text-xs leading-relaxed break-words shadow-sm sm:max-w-[75%] sm:px-4 sm:py-2.5 sm:text-sm ${
                            isMe
                              ? "bg-primary border-primary rounded-br-none text-white"
                              : "bg-surface text-text border-border-custom rounded-bl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Typing Indicator Bar */}
            {typingUsers.length > 0 && (
              <div className="bg-surface border-border-custom/50 text-text-muted flex items-center gap-1.5 border-t px-3 py-1 font-mono text-[10px] italic sm:px-4 sm:text-[11px]">
                <span className="bg-primary inline-block size-1.5 animate-ping rounded-full" />
                <span className="truncate">
                  {typingUsers.length === 1
                    ? `${typingUsers[0]} is typing...`
                    : `${typingUsers.join(", ")} are typing...`}
                </span>
              </div>
            )}

            {/* Message Input Form */}
            <footer className="bg-surface border-border-custom shrink-0 border-t p-2.5 sm:p-4">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    maxLength={280}
                    placeholder="Type a message..."
                    className="bg-bg border-border-custom text-text placeholder:text-text-muted focus:ring-primary w-full rounded-md border py-2 pr-12 pl-3 font-sans text-xs transition-all outline-none focus:border-transparent focus:ring-2 sm:py-2.5 sm:pr-14 sm:pl-3.5 sm:text-sm"
                  />
                  <span
                    className={`absolute top-1/2 right-2.5 -translate-y-1/2 font-mono text-[9px] select-none sm:right-3 sm:text-[10px] ${
                      inputText.length > 250 ? "font-bold text-amber-600" : "text-text-muted"
                    }`}
                  >
                    {inputText.length}/280
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="bg-primary border-primary shrink-0 cursor-pointer rounded-md border px-3 py-2 font-mono text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 sm:px-4 sm:py-2.5 sm:text-sm"
                >
                  Send ↵
                </button>
              </form>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};
