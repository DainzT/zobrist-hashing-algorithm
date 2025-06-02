import { Board, Position } from '@/types/chess';

export const validateKnightMove = (
    board: Board,
    from: Position,
    to: Position
): boolean => {
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);

    if (!((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2))) {
        return false;
    }

    const targetPiece = board[to.row][to.col];
    const movingPiece = board[from.row][from.col];

    if (!movingPiece) return false; 

    if (targetPiece && targetPiece.color === movingPiece.color) {
        return false;
    }

    return true;
}