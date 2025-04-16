import { Board, Position } from "@/types/chess";
import { validatePawnMove } from "./validatePawnMove";
import { validateKnightMove } from "./validateKnightMove";
import { validateBishopMove } from "./validateBishopMove";
import { validateRookMove } from "./validateRookMove";
import { validateQueenMove } from "./validateQueenMove";
import { validateKingMove } from "./validateKingMove";

export const validateMove = (
    board: Board,
    from: Position,
    to: Position,
    enPassantTarget?: Position | null,
    hasKingMoved?: boolean,
    hasRookMoved?: Record<string, boolean>,
    isCheck?: boolean
): boolean => {
    const piece = board[from.row][from.col];
    if (!piece) return false;
    
    if (isCheck === undefined) {
        isCheck = false;
    }

    switch (piece.type) {
        case 'king':
            return validateKingMove(
                board,
                from,
                to,
                hasKingMoved || false,
                hasRookMoved || {},
                isCheck,
            );
        case 'queen':
            return validateQueenMove(board, from, to);
        case 'rook':
            return validateRookMove(board, from, to);
        case 'bishop':
            return validateBishopMove(board, from, to);
        case 'knight':
            return validateKnightMove(board, from, to);
        case 'pawn':
            return validatePawnMove(board, from, to, enPassantTarget || null);
        default: return false;
    }
};