import { Board, Position } from '@/types/chess';

export const validateRookMove = (
    board: Board,
    from: Position,
    to: Position
): boolean => {
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);

    if (rowDiff !== 0 && colDiff !== 0) {
        return false;
    }

    const rowStep = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
    const colStep = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;

    let currentRow = from.row + rowStep;
    let currentCol = from.col + colStep;
    
    while (currentRow !== to.row || currentCol !== to.col) {
        if (board[currentRow][currentCol] !== null) {
            return false; 
        }
        currentRow += rowStep;
        currentCol += colStep;
    }

    const targetPiece = board[to.row][to.col];
    const movingPiece = board[from.row][from.col];

    if (!movingPiece) return false;

    if (targetPiece && targetPiece.color === movingPiece.color) {
        return false;
    }

    return true;
};