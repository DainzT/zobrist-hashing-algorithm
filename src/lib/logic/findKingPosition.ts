import { Board, Position } from "@/types/chess";

export const findKingPosition = (board: Board, color: 'white' | 'black'): Position => {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece && piece.type === 'king' && piece.color === color) {
                return { row, col };
            }
        }
    }
    throw new Error("King not found on the board");
};
