import React, { useState, useEffect } from "react";

export interface ToastData {
  id: number;
  message: string;
  duration?: number;
}

export const MistakeIcon: React.FC<{ className?: string }> = ({ className = "size-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
  >
    <circle cx="12" cy="12" r="11" fill="#e88835" />
    <path
      d="M8.5 9c0-2.2 1.5-4 3.5-4s3.5 1.8 3.5 4c0 1.5-1 2.5-2 3s-1.5 1.2-1.5 2"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="12" cy="17.5" r="1.5" fill="white" />
  </svg>
);

export const InaccuracyIcon: React.FC<{ className?: string }> = ({ className = "size-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
  >
    <circle cx="12" cy="12" r="11" fill="#f0b830" />
    <path
      d="M4.5 8.5c0-1.8 1.2-3 2.7-3s2.7 1.2 2.7 3c0 1.2-.8 2-1.5 2.5-.5.3-1 .8-1 1.5"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="7.4" cy="16.5" r="1.3" fill="white" />
    <rect x="14.2" y="5.5" width="2.6" height="7.5" rx="1.3" fill="white" />
    <circle cx="15.5" cy="16.5" r="1.4" fill="white" />
  </svg>
);

let toastIdCounter = 0;
type ToastListener = (toast: ToastData) => void;
const listeners: Set<ToastListener> = new Set();
let currentActiveMessage: string | null = null;

/**
 * Trigger a global toast notification.
 * Anti-spam: If an active toast with the same message is currently showing,
 * repeated triggers are ignored until it vanishes.
 */
export function showToast(message: string, duration = 2500) {
  if (currentActiveMessage === message) {
    // Anti-spam: Ignore duplicate toast while current identical toast is active
    return;
  }

  currentActiveMessage = message;
  const newToast: ToastData = {
    id: ++toastIdCounter,
    message,
    duration,
  };

  listeners.forEach((listener) => listener(newToast));
}

export const ToastContainer: React.FC = () => {
  const [activeToast, setActiveToast] = useState<ToastData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleNewToast = (toast: ToastData) => {
      setActiveToast(toast);
      setIsVisible(true);
    };

    listeners.add(handleNewToast);
    return () => {
      listeners.delete(handleNewToast);
    };
  }, []);

  useEffect(() => {
    if (!activeToast) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for slide-out transition before clearing message lock
      setTimeout(() => {
        currentActiveMessage = null;
        setActiveToast(null);
      }, 300);
    }, activeToast.duration || 2500);

    return () => clearTimeout(timer);
  }, [activeToast]);

  if (!activeToast) return null;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed top-16 right-4 z-[100] flex max-w-[90vw] justify-end sm:top-6 sm:right-6 sm:max-w-md"
    >
      <div
        className={`bg-bg/95 border-border-custom text-text pointer-events-auto flex max-w-md items-center gap-3 rounded-full border px-4 py-2.5 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          isVisible ? "translate-y-0 scale-100 opacity-100" : "-translate-y-3 scale-95 opacity-0"
        }`}
      >
        {/* Inaccuracy Chess SVG Icon for Toast */}
        <div className="flex size-6 shrink-0 items-center justify-center">
          <InaccuracyIcon className="size-5 select-none" />
        </div>

        {/* Message */}
        <span className="font-mono text-xs leading-tight font-semibold">{activeToast.message}</span>
      </div>
    </div>
  );
};
