import { Board, Position } from "@/types/chess";

export const validatePawnMove = (
    board: Board,
    from: Position,
    to: Position,
    enPassantTarget: Position | null,
): boolean => {
    const piece = board[from.row][from.col];
    if (!piece || piece.type !== "pawn") return false;

    const direction = piece?.color === "white" ? -1 : 1;
    const isInitialPosition = piece.color === 'white' ? from.row === 6 : from.row === 1;
    const targetPiece = board[to.row][to.col];

    // Forward validation
    if (to.col === from.col && !targetPiece) {
        if (to.row === from.row + direction && !board[to.row][to.col]) {
            return true;
        }

        if (isInitialPosition && to.row === from.row + 2 * direction && 
            !board[from.row + direction][to.col] && !board[to.row][to.col]) {
            return true;
        }
    }

    // Capture validation
    if (Math.abs(to.col - from.col) === 1 && to.row === from.row + direction) {
        if (targetPiece && targetPiece.color !== piece.color) {
            return true;
        }
        if (
            enPassantTarget &&
            to.row === enPassantTarget.row &&
            to.col === enPassantTarget.col
        ) {
            const capturedPawnRow = from.row
            const capturedPawn = board[capturedPawnRow][to.col];
            return (
                capturedPawn?.type === 'pawn' &&
                capturedPawn.color !== piece.color
            );
        }
    }

    return false;
};

