import React, { useState, useEffect } from "react";
import { Chess, type Square } from "chess.js";
import { ChessBoard3D } from "./ChessBoard3D";
import { type PublicGameState } from "./GameDetailsModal";
import { showToast } from "../feedback/Toast";

export interface ChessWidgetProps {
  displayName?: string;
  is3D?: boolean;
  onGameStateChange?: (state: PublicGameState | null) => void;
}

export const ChessWidget: React.FC<ChessWidgetProps> = ({ is3D = true, onGameStateChange }) => {
  const [gameState, setGameState] = useState<PublicGameState | null>(null);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current live game state from server
  const fetchState = async () => {
    try {
      const res = await fetch("/api/chess/state");
      if (res.ok) {
        const data = (await res.json()) as PublicGameState;
        setGameState(data);
        if (onGameStateChange) onGameStateChange(data);
      }
    } catch {
      // Silent error during polling
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 3000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading || !gameState) {
    return (
      <div className="flex h-full min-h-[300px] flex-col items-center justify-center p-6 text-center">
        <div className="bg-primary/10 border-primary/20 text-primary mb-3 flex size-12 animate-pulse items-center justify-center rounded-full border text-2xl">
          ♞
        </div>
        <p className="text-text-muted font-mono text-xs">Loading 3D Chess Board...</p>
      </div>
    );
  }

  // Parse FEN string with chess.js for legal move generation
  const chess = new Chess(gameState.fen);
  const board = chess.board();

  const handleBoardClick = () => {
    if (!gameState) return;
    const isYourTurn = gameState.yourSide === gameState.sideToMove;
    const msg = isYourTurn
      ? `Your Turn to move! (Team ${gameState.yourSide.toUpperCase()})`
      : `Opponent's Turn — Team ${gameState.sideToMove.toUpperCase()}`;
    showToast(msg);
  };

  const handleSquareClick = (squareName: string, cell: { type: string; color: string } | null) => {
    // Show toast for turn info when board/square is pressed
    handleBoardClick();

    if (gameState.outcome || isSubmitting) return;

    // If clicking on an existing selection or target square
    if (selectedSquare) {
      if (selectedSquare === squareName) {
        setSelectedSquare(null);
        setPossibleMoves([]);
        return;
      }

      // Check if squareName is a valid destination for selected piece
      const validMoves = chess.moves({ square: selectedSquare as Square, verbose: true });
      const targetMove = validMoves.find((m) => m.to === squareName);

      if (targetMove) {
        // Submit move
        executeMove(targetMove.san);
        setSelectedSquare(null);
        setPossibleMoves([]);
        return;
      }
    }

    // If selecting a piece of player's assigned team
    if (cell && cell.color === (gameState.yourSide === "white" ? "w" : "b")) {
      setSelectedSquare(squareName);
      const moves = chess.moves({ square: squareName as Square, verbose: true });
      setPossibleMoves(moves.map((m) => m.to));
    } else {
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const executeMove = async (sanMove: string) => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/chess/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          move: sanMove,
          version: gameState.version,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setGameState(data.state);
        if (onGameStateChange) onGameStateChange(data.state);
      } else {
        if (data.reason === "superseded") {
          showToast("A teammate moved first!");
          if (data.publicView) {
            setGameState(data.publicView);
            if (onGameStateChange) onGameStateChange(data.publicView);
          }
        } else if (data.reason === "not_your_side") {
          showToast("It's not your team's turn right now.");
        } else if (data.reason === "illegal_move") {
          showToast("Illegal move for this position.");
        } else {
          showToast(`Rejected: ${data.reason}`);
        }
      }
    } catch {
      showToast("Failed to connect to game server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {/* Pure 3D / 2D Chess Board (Header-less & Frame-less) */}
      <div
        className="flex w-full flex-1 cursor-pointer items-center justify-center"
        onClick={handleBoardClick}
      >
        <ChessBoard3D
          board={board}
          yourSide={gameState.yourSide}
          selectedSquare={selectedSquare}
          possibleMoves={possibleMoves}
          is3D={is3D}
          isSubmitting={isSubmitting}
          isGameOver={!!gameState.outcome}
          onSquareClick={handleSquareClick}
        />
      </div>
    </div>
  );
};
