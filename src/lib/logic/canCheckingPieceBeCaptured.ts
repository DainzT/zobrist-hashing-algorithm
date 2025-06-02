import { Board, Color, Position } from "@/types/chess";
import { validateMove } from "../rules";
import { wouldLeaveKingInCheck } from "./wouldLeaveKingInCheck";

export const canCheckingPieceBeCaptured = (board: Board, checkingPiecePos: Position, color: Color): boolean => {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece && piece.color === color) {
                if (validateMove(
                    board,
                    { row, col },
                    checkingPiecePos,
                    null,
                    false,
                    undefined,
                    true
                )) {
                    if (!wouldLeaveKingInCheck(board, { row, col }, checkingPiecePos, color)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
};