import { Board, Position } from '@/types/chess';

export const validateKingMove = (
    board: Board,
    from: Position,
    to: Position,
    hasKingMoved: boolean,
    hasRookMoved: Record<string, boolean>,
    isCheck: boolean,
): boolean => {
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    console.log(colDiff)
    if ((rowDiff <= 1 && colDiff <= 1) && (rowDiff !== 0 || colDiff !== 0)) {
        const targetPiece = board[to.row][to.col];
        const movingPiece = board[from.row][from.col];

        if (!movingPiece) return false;
        if (targetPiece && targetPiece.color === movingPiece.color) return false;

        return true;
    }

    if (rowDiff === 0 && colDiff === 2 && !hasKingMoved && !isCheck) {
        console.log(true)
        return validateCastling(board, from, to, hasRookMoved);
    }

    return false;
};

const validateCastling = (
    board: Board,
    from: Position,
    to: Position,
    hasRookMoved: Record<string, boolean>
): boolean => {
    const color = board[from.row][from.col]?.color;
    if (!color) return false;

    const direction = to.col > from.col ? 1 : -1;
    const rookCol = direction === 1 ? 7 : 0;
    const rookKey = `${color}-${from.row}-${rookCol}`;

    if (hasRookMoved[rookKey]) return false;

    const startCol = direction === 1 ? from.col + 1 : from.col - 1;
    const endCol = direction === 1 ? rookCol - 1 : rookCol + 1;

    for (let col = startCol; col !== endCol; col += direction) {
        if (board[from.row][col] !== null) return false;
    }

    // for (let col = from.col; col !== to.col + direction; col += direction) {
    //     if (isSquareUnderAttack(board, { row: from.row, col }, color === 'white' ? 'black' : 'white')) {
    //         return false;
    //     }
    // }


    return true;
};
