import React from "react";
import { PIECE_RAWS } from "./ChessPiece";

export interface PromotionModalProps {
  color: "w" | "b";
  onSelect: (piece: "q" | "n" | "r" | "b") => void;
  onCancel: () => void;
}

interface PieceOption {
  type: "q" | "n" | "r" | "b";
  name: string;
}

const PIECE_OPTIONS: PieceOption[] = [
  { type: "q", name: "Queen" },
  { type: "n", name: "Knight" },
  { type: "r", name: "Rook" },
  { type: "b", name: "Bishop" },
];

export const PromotionModal: React.FC<PromotionModalProps> = ({ color, onSelect, onCancel }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="promotion-modal-title"
      className="bg-background/80 animate-in fade-in fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs transition-opacity"
      onClick={onCancel}
    >
      <div
        className="bg-surface border-border shadow-woodcut animate-in zoom-in-95 flex max-w-sm flex-col items-center rounded-xl border-2 p-5 text-center transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          id="promotion-modal-title"
          className="text-text font-mono text-base font-bold tracking-wide uppercase"
        >
          Promote Pawn
        </h3>
        <p className="text-text-muted mt-1 font-mono text-xs">
          Select a piece for your promoted pawn:
        </p>

        <div className="mt-4 grid grid-cols-4 gap-3">
          {PIECE_OPTIONS.map((option) => {
            const pieceChar = color === "w" ? option.type.toUpperCase() : option.type;
            const svgRaw = PIECE_RAWS[pieceChar];

            return (
              <button
                key={option.type}
                type="button"
                onClick={() => onSelect(option.type)}
                className="bg-surface/80 border-border/60 hover:border-primary hover:bg-primary/10 hover:shadow-primary/20 focus-visible:ring-primary flex flex-col items-center justify-center rounded-lg border p-2 transition-all hover:scale-105 focus-visible:ring-2 focus-visible:outline-none"
                aria-label={`Promote to ${option.name}`}
              >
                <div
                  className="size-12 [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain"
                  dangerouslySetInnerHTML={{ __html: svgRaw }}
                />
                <span className="text-text mt-1.5 font-mono text-[11px] font-semibold">
                  {option.name}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="text-text-muted hover:text-text focus-visible:ring-primary mt-4 font-mono text-xs underline underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          Cancel Selection
        </button>
      </div>
    </div>
  );
};
