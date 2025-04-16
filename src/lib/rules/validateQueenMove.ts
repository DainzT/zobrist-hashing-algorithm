import { Board, Position } from '@/types/chess';
import { validateRookMove } from './validateRookMove';
import { validateBishopMove } from './validateBishopMove';

export const validateQueenMove = (
    board: Board,
    from: Position,
    to: Position
): boolean => {
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);

    const isRookMove = rowDiff === 0 || colDiff === 0;
    const isBishopMove = rowDiff === colDiff;

    if (!isRookMove && !isBishopMove) {
        return false;
    }

    if (isRookMove) {
        return validateRookMove(board, from, to);
    } else {
        return validateBishopMove(board, from, to);
    }
};