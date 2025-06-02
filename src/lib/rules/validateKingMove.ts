import { Board, Position, RookMovedKeys } from '@/types/chess';
import { validateMove } from '.';

export const validateKingMove = (
    board: Board,
    from: Position,
    to: Position,
    hasKingMoved: boolean,
    hasRookMoved: Record<RookMovedKeys, boolean>,
    isCheck: boolean,
): boolean => {
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    const movingPiece = board[from.row][from.col];

    if (!movingPiece || movingPiece.type !== 'king') return false;

    if ((rowDiff <= 1 && colDiff <= 1)) {
        const targetPiece = board[to.row][to.col];
        const movingPiece = board[from.row][from.col];

        if (!movingPiece) return false;
        if (targetPiece && targetPiece.color === movingPiece.color) return false;

        return true;
    }
    if (rowDiff === 0 && colDiff === 2) {
        if (hasKingMoved) return false;
        if (isCheck) return false;
        return validateCastling(board, from, to, hasRookMoved, movingPiece?.color);
    }
    
    return false;
};

const validateCastling = (
    board: Board,
    from: Position,
    to: Position,
    hasRookMoved: Record<RookMovedKeys, boolean>,
    color: 'white' | 'black'
): boolean => {
    const direction = to.col > from.col ? 1 : -1;
    const rookCol = direction === 1 ? 7 : 0;
    const rookKey = `${color}-${from.row}-${rookCol}` as RookMovedKeys;

    if (hasRookMoved[rookKey]) return false;

    const rook = board[from.row][rookCol];
    if (!rook || rook.type !== 'rook' || rook.color !== color) return false;

    const startCol = Math.min(from.col, rookCol) + 1;
    const endCol = Math.max(from.col, rookCol) - 1;
    for (let col = startCol; col <= endCol; col++) {
        if (board[from.row][col] !== null) return false;
    }

    const kingPathCols = [
        from.col,
        from.col + direction,
        from.col + 2 * direction
    ];

    for (const col of kingPathCols) {
        if (isSquareUnderAttack(board, { row: from.row, col }, color === 'white' ? 'black' : 'white')) {
            return false;
        }
    }

    return true;
};

const isSquareUnderAttack = (
    board: Board,
    position: Position,
    byColor: 'white' | 'black'
): boolean => {
    const tempBoard = board.map(row => [...row]);
    tempBoard[position.row][position.col] = null;

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = tempBoard[row][col];
            if (piece && piece.color === byColor) {

                if (piece.type === 'pawn') {
                    const pawnDir = byColor === 'white' ? -1 : 1;
                    if (Math.abs(position.col - col) === 1 &&
                        position.row === row + pawnDir) {
                        return true;
                    }
                    continue;
                }

                if (validateMove(
                    tempBoard,
                    { row, col },
                    position,
                    null,
                    true,
                    undefined,
                    false
                )) {
                    return true;
                }
            }
        }
    }

    return false;
};
