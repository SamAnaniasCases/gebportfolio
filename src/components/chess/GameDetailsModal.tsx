import React from "react";
import { DoodleIcon } from "../ui/DoodleIcon";

export interface PublicGameState {
  version: number;
  fen: string;
  sideToMove: "white" | "black";
  yourSide: "white" | "black";
  canMoveNow: boolean;
  recentMoves: string[];
  contributorCount: number;
  lastMoveAt: string;
  outcome: { type: string; winner?: "white" | "black" } | null;
}

interface GameDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: PublicGameState | null;
  displayName: string;
}

export const GameDetailsModal: React.FC<GameDetailsModalProps> = ({
  isOpen,
  onClose,
  gameState,
  displayName,
}) => {
  if (!isOpen || !gameState) return null;

  const isYourTurn = gameState.yourSide === gameState.sideToMove;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
      {/* Click backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="border-border-custom bg-bg/95 relative z-10 w-full max-w-md rounded-2xl border p-5 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <header className="border-border-custom/60 mb-4 flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <span className="font-display text-primary text-xl"></span>
            <div>
              <h3 className="font-display text-text text-base font-bold">Game Details & History</h3>
              <p className="text-text-muted font-mono text-[11px]">Crowd Chess Match #1</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close game details"
            className="text-text-muted hover:text-text flex cursor-pointer items-center justify-center rounded-full p-1 text-lg leading-none transition-colors"
          >
            <DoodleIcon name="cross" className="size-4" />
          </button>
        </header>

        {/* Details Grid */}
        <div className="space-y-4 font-sans text-xs">
          {/* Team Assignment & Side */}
          <div className="border-border-custom/70 bg-surface-subtle/80 space-y-2 rounded-xl border p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-text-muted font-mono text-[11px]">Your Assigned Team:</span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold uppercase ${
                  gameState.yourSide === "white"
                    ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300"
                    : "border-stone-500/30 bg-stone-500/10 text-stone-700 dark:text-stone-300"
                }`}
              >
                <span
                  className={`size-2 rounded-full ${
                    gameState.yourSide === "white"
                      ? "bg-amber-400"
                      : "bg-stone-800 dark:bg-stone-200"
                  }`}
                />
                Team {gameState.yourSide}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-muted font-mono text-[11px]">Playing Handle:</span>
              <span className="text-text font-mono text-xs font-bold">{displayName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-muted font-mono text-[11px]">Total Contributors:</span>
              <span className="text-text font-mono text-xs font-bold">
                {gameState.contributorCount} visitors
              </span>
            </div>
          </div>

          {/* Match Turn Status */}
          <div className="border-border-custom/70 bg-surface-subtle/80 space-y-2 rounded-xl border p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-text-muted font-mono text-[11px]">Current Turn:</span>
              <span
                className={`font-mono text-xs font-bold ${
                  isYourTurn
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-amber-600 dark:text-amber-400"
                }`}
              >
                {isYourTurn
                  ? "★ YOUR TEAM TO MOVE"
                  : `Waiting for ${gameState.sideToMove.toUpperCase()}...`}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-muted font-mono text-[11px]">Board Version:</span>
              <span className="text-text font-mono text-xs">v{gameState.version}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-muted font-mono text-[11px]">Last Move Timestamp:</span>
              <span className="text-text-muted font-mono text-[11px]">
                {new Date(gameState.lastMoveAt).toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Move Log History */}
          <div className="space-y-1.5">
            <div className="text-text-muted flex items-center justify-between font-mono text-[11px]">
              <span>Full Move History:</span>
              <span>{gameState.recentMoves.length} moves recorded</span>
            </div>

            <div className="custom-scrollbar border-border-custom/70 bg-surface text-text max-h-36 overflow-y-auto rounded-xl border p-3 font-mono text-xs leading-relaxed">
              {gameState.recentMoves.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {gameState.recentMoves.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="text-text-muted w-6 text-[10px]">{idx + 1}.</span>
                      <span className="text-primary font-bold">{m}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-text-muted py-2 text-center italic">
                  No moves recorded yet. Board is at starting position.
                </div>
              )}
            </div>
          </div>

          {/* FEN String */}
          <div className="space-y-1">
            <span className="text-text-muted font-mono text-[10px]">FEN Position Key:</span>
            <div className="border-border-custom/40 bg-surface-subtle text-text-muted truncate rounded border p-1.5 font-mono text-[10px] select-all">
              {gameState.fen}
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <footer className="border-border-custom/60 mt-5 border-t pt-3 text-right">
          <button
            type="button"
            onClick={onClose}
            className="bg-primary cursor-pointer rounded-xl px-4 py-2 font-mono text-xs font-semibold text-white hover:opacity-90 active:scale-[0.98]"
          >
            Back to Chess Board
          </button>
        </footer>
      </div>
    </div>
  );
};
