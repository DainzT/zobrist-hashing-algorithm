import { Board, Position } from "@/types/chess";
import { isKingInCheck } from "./isKingInCheck";

export const hasLegalMovesForKing = (board: Board, kingPosition: Position, color: 'white' | 'black') => {
    const directions = [
        { row: -1, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
        { row: -1, col: -1 },
        { row: -1, col: 1 },
        { row: 1, col: -1 },
        { row: 1, col: 1 },
    ];

    for (const { row, col } of directions) {
        const newRow = kingPosition.row + row;
        const newCol = kingPosition.col + col;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const targetPiece = board[newRow][newCol];
            if (!targetPiece || targetPiece.color !== color) {
                const originalPiece = board[kingPosition.row][kingPosition.col];
                board[kingPosition.row][kingPosition.col] = null;
                board[newRow][newCol] = originalPiece;
                if (!isKingInCheck(board, { row: newRow, col: newCol }, color)) {
                    board[kingPosition.row][kingPosition.col] = originalPiece;
                    board[newRow][newCol] = targetPiece;
                    return true;
                }
                board[kingPosition.row][kingPosition.col] = originalPiece;
                board[newRow][newCol] = targetPiece;
            }

        }
    }
    return false;
};