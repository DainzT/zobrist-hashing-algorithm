import { Board, Color, Position } from "@/types/chess";
import { validateMove } from "../../rules";

export const findAllCheckingPieces = (board: Board, kingPosition: Position, color: Color): Position[] => {
    const checkingPieces: Position[] = [];
    const opponentColor = color === 'white' ? 'black' : 'white';

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece && piece.color === opponentColor) {
                if (validateMove(
                    board,
                    { row, col },
                    kingPosition,
                    null,
                    false,
                    undefined,
                    true
                )) {
                    checkingPieces.push({ row, col });
                }
            }
        }
    }

    return checkingPieces;
};
