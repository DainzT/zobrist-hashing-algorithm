import { Board, PieceType } from '@/types/chess';

export const initializeEmptyBoard = (): Board => {
    return Array(8).fill(null).map(() => Array(8).fill(null));
};

export const setupPawns = (board: Board): void => {
    for (let i = 0; i < 8; i++) {
        board[1][i] = { type: "pawn", color: "black" };
        board[6][i] = { type: "pawn", color: "white" };
    }
};

export const setupPieces = (board: Board): void => {
    const initialPieces: PieceType[] = [
        "rook", "knight", "bishop", "queen",
        "king", "bishop", "knight", "rook",
    ];

    for (let i = 0; i < 8; i++) {
        board[0][i] = { type: initialPieces[i], color: "black" };
        board[7][i] = { type: initialPieces[i], color: "white" };
    }
};

export const createInitialBoard = (): Board => {
    const board = initializeEmptyBoard();
    setupPawns(board);
    setupPieces(board);
    return board;
};