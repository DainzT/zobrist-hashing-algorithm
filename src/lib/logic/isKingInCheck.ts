import { Board, Position } from "@/types/chess";
import { validateMove } from "../rules";

export const isKingInCheck = (board: Board, kingPosition: Position, color: 'white' | 'black') => {
    const opponentColor = color === 'white' ? 'black' : 'white';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece && piece.color === opponentColor) {
                if (validateMove(board, { row, col }, kingPosition, null, false)) {
                    return true;
                }
            }
        }
    }
    return false;
};