import React from "react";

// Raw SVG imports via Vite ?raw plugin for inline vector rendering
import whitePawnRaw from "../../assets/chess/white-pawn.svg?raw";
import whiteKnightRaw from "../../assets/chess/white-knight.svg?raw";
import whiteBishopRaw from "../../assets/chess/white-bishop.svg?raw";
import whiteRookRaw from "../../assets/chess/white-rook.svg?raw";
import whiteQueenRaw from "../../assets/chess/white-queen.svg?raw";
import whiteKingRaw from "../../assets/chess/white-king.svg?raw";

import blackPawnRaw from "../../assets/chess/black-pawn.svg?raw";
import blackKnightRaw from "../../assets/chess/black-knight.svg?raw";
import blackBishopRaw from "../../assets/chess/black-bishop.svg?raw";
import blackRookRaw from "../../assets/chess/black-rook.svg?raw";
import blackQueenRaw from "../../assets/chess/black-queen.svg?raw";
import blackKingRaw from "../../assets/chess/black-king.svg?raw";

export const PIECE_RAWS: Record<string, string> = {
  p: blackPawnRaw,
  n: blackKnightRaw,
  b: blackBishopRaw,
  r: blackRookRaw,
  q: blackQueenRaw,
  k: blackKingRaw,
  P: whitePawnRaw,
  N: whiteKnightRaw,
  B: whiteBishopRaw,
  R: whiteRookRaw,
  Q: whiteQueenRaw,
  K: whiteKingRaw,
};

export interface ChessPieceProps {
  id: string;
  type: string;
  color: "w" | "b";
  height: string; // Height calculated by projectPiece()
  transform: string; // Standee tilt calculated by projectPiece()
  isSelected?: boolean;
  is3D?: boolean;
  /** 0.0 (back row) → 1.0 (front row) — modulates shadow intensity for depth realism */
  depthFactor?: number;
}

export const ChessPiece: React.FC<ChessPieceProps> = ({
  type,
  color,
  height,
  transform: standeeTransform,
  isSelected = false,
  is3D = true,
  depthFactor = 0.5,
}) => {
  const key = type.toLowerCase();
  const pieceChar = color === "w" ? key.toUpperCase() : key;
  const pieceRaw = PIECE_RAWS[pieceChar];
  if (!pieceRaw) return null;

  const isWhite = color === "w";

  // Depth-modulated shadow parameters — front pieces cast slightly larger, more opaque shadows
  const contactOpacity = isSelected ? 0.18 : 0.25 + depthFactor * 0.1;
  const contactWidth = isSelected ? 78 : 68 + depthFactor * 8;
  const ambientOpacity = 0.08 + depthFactor * 0.06;
  const dropBlur = isWhite ? 1 : 0.5;
  const dropOpacity = isWhite ? 0.3 + depthFactor * 0.08 : 0.22 + depthFactor * 0.06;

  return (
    <div
      className="pointer-events-none absolute bottom-[12%] left-1/2 flex -translate-x-1/2 items-end justify-center transition-all duration-200 select-none"
      style={{
        transformStyle: is3D ? "preserve-3d" : "flat",
      }}
    >
      {/* 1a. Ambient Desk-Lamp Shadow — large, soft, barely visible */}
      {is3D && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 rounded-[50%] transition-all duration-200"
          style={{
            width: `${contactWidth + 12}%`,
            height: "12%",
            opacity: ambientOpacity,
            backgroundColor: "var(--chess-ink, #2a2320)",
            filter: "blur(3px)",
          }}
        />
      )}

      {/* 1b. Primary Contact Shadow — crisp, grounding the standee to the board */}
      {is3D && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 rounded-[50%] transition-all duration-200"
          style={{
            width: `${contactWidth}%`,
            height: isSelected ? "6%" : "9%",
            opacity: contactOpacity,
            backgroundColor: "var(--chess-ink, #2a2320)",
            filter: "blur(1.5px)",
          }}
        />
      )}

      {/* 2. Standee Slot Pedestal Base — palette-consistent, simple */}
      {is3D && (
        <span
          aria-hidden="true"
          className="absolute bottom-[1px] h-1.5 w-3/4 rounded-full transition-all"
          style={{
            backgroundColor: isWhite ? "var(--chess-paper, #f2e8d5)" : "var(--chess-ink, #2a2320)",
            border: `1px solid`,
            borderColor: isWhite
              ? "color-mix(in srgb, var(--chess-ink, #2a2320) 25%, transparent)"
              : "color-mix(in srgb, var(--chess-paper, #f2e8d5) 20%, transparent)",
            opacity: 0.7,
            transform: "rotateX(65deg)",
          }}
        />
      )}

      {/* 3. Upright Standee Container (Tilt governed by projectPiece) */}
      <div
        className={`relative flex w-full items-center justify-center transition-transform duration-200 ease-out ${
          isSelected ? "-translate-y-[14%]" : ""
        }`}
        style={{
          height,
          transform: is3D ? standeeTransform : "none",
          transformOrigin: "bottom center",
          transformStyle: is3D ? "preserve-3d" : "flat",
        }}
      >
        {/* Layer A: Cardboard Thickness Silhouette Duplicate */}
        {is3D && (
          <div
            aria-hidden="true"
            className="absolute inset-0 h-full w-full brightness-0 [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain"
            style={{
              transform: "translate(-1px, 2.5px)",
              opacity: 0.22,
            }}
            dangerouslySetInnerHTML={{ __html: pieceRaw }}
          />
        )}

        {/* Layer B: Main Front Vector SVG Artwork */}
        <div
          className="relative h-full w-full [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain"
          style={{
            filter: `drop-shadow(1.5px 2.5px ${dropBlur}px rgba(42, 35, 32, ${dropOpacity}))`,
          }}
          dangerouslySetInnerHTML={{ __html: pieceRaw }}
        />
      </div>
    </div>
  );
};
