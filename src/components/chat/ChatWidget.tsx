import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChatBox } from "./ChatBox";

/**
 * Global Chat Widget Component mounted in BaseLayout.astro.
 * Manages open/close state, Web Audio sound effects,
 * and global event listener for 'open-portfolio-chat'.
 */
export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled] = useState(true);

  // Web Audio API context for subtle woodblock click sound
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClickSound = useCallback(() => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignore web audio error
    }
  }, [soundEnabled]);

  // Global event listener to open chat modal from navigation buttons
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
      playClickSound();
    };
    window.addEventListener("open-portfolio-chat", handleOpenEvent);
    return () => window.removeEventListener("open-portfolio-chat", handleOpenEvent);
  }, [playClickSound]);

  const handleClose = () => {
    setIsOpen(false);
    playClickSound();
  };

  return (
    <>
      {/* Screen Reader Live Region for A11y */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" id="chat-live-region" />

      {/* Fullscreen Chat Modal */}
      <ChatBox isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
