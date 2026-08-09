import React, { useState, useEffect, useRef } from "react";
import { Chess, type Square } from "chess.js";
import { ChessBoard3D } from "./ChessBoard3D";
import { type PublicGameState } from "./GameDetailsModal";
import { showToast } from "../feedback/Toast";
import { chessAudio } from "../../lib/chess/audio";
import blunderRaw from "../../assets/chess-icons/blunder.svg?raw";

export interface ChessWidgetProps {
  displayName?: string;
  is3D?: boolean;
  onGameStateChange?: (state: PublicGameState | null) => void;
}

export const ChessWidget: React.FC<ChessWidgetProps> = React.memo(
  ({ is3D = true, onGameStateChange }) => {
    const [gameState, setGameState] = useState<PublicGameState | null>(null);
    const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const onGameStateChangeRef = useRef(onGameStateChange);
    useEffect(() => {
      onGameStateChangeRef.current = onGameStateChange;
    }, [onGameStateChange]);

    const prevVersionRef = useRef<number | null>(null);

    // Fetch current live game state from server
    const fetchState = async () => {
      try {
        const res = await fetch("/api/chess/state");
        if (res.ok) {
          const data = (await res.json()) as PublicGameState;
          setGameState(data);
          if (prevVersionRef.current !== data.version) {
            prevVersionRef.current = data.version;
            onGameStateChangeRef.current?.(data);
          }
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

    // Parse FEN string with chess.js for legal move generation & check detection
    const chess = new Chess(gameState.fen);
    const board = chess.board();

    // Check detection & king square targeting
    const isCheck = chess.inCheck();
    const sideInCheck = chess.turn(); // 'w' or 'b'
    let checkSquare: string | null = null;

    if (isCheck) {
      board.forEach((row) => {
        row.forEach((cell) => {
          if (cell && cell.type === "k" && cell.color === sideInCheck) {
            checkSquare = cell.square;
          }
        });
      });
    }

    const handleSquareClick = (
      squareName: string,
      cell: { type: string; color: string } | null
    ) => {
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
          onGameStateChangeRef.current?.(data.state);

          // Test if move resulted in a Check or normal move for audio response
          const newChess = new Chess(data.state.fen);
          if (newChess.inCheck()) {
            chessAudio.playCheck();
            showToast("CHECK!");
          } else {
            chessAudio.playMove();
          }
        } else {
          if (data.reason === "superseded") {
            showToast("A teammate moved first!");
            if (data.publicView) {
              setGameState(data.publicView);
              onGameStateChangeRef.current?.(data.publicView);
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

    const checkedTeamName = sideInCheck === "w" ? "White" : "Black";
    const isYourKingInCheck =
      isCheck && (gameState.yourSide === "white" ? sideInCheck === "w" : sideInCheck === "b");

    return (
      <div className="flex h-full w-full flex-col items-center justify-center space-y-2">
        {/* Dynamic King in Check Alert Banner */}
        {isCheck && (
          <div
            className={`flex animate-bounce items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-bold shadow-md ${
              isYourKingInCheck
                ? "border-rose-600 bg-rose-600 text-white"
                : "border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300"
            }`}
          >
            <span
              className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full"
              dangerouslySetInnerHTML={{ __html: blunderRaw }}
            />
            <span>
              {isYourKingInCheck
                ? "YOUR KING IS IN CHECK!"
                : `${checkedTeamName} King is in Check!`}
            </span>
          </div>
        )}

        {/* Pure 3D / 2D Chess Board (Direct touch-interactive canvas without parent click interceptor) */}
        <div className="flex w-full flex-1 items-center justify-center">
          <ChessBoard3D
            board={board}
            yourSide={gameState.yourSide}
            selectedSquare={selectedSquare}
            possibleMoves={possibleMoves}
            checkSquare={checkSquare}
            is3D={is3D}
            isSubmitting={isSubmitting}
            isGameOver={!!gameState.outcome}
            onSquareClick={handleSquareClick}
          />
        </div>
      </div>
    );
  }
);
