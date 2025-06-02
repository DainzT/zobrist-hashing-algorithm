export type Color = 'white' | 'black';
export type PieceType =
    | "pawn"
    | "rook"
    | "knight"
    | "bishop"
    | "queen"
    | "king";
export type PieceColor = "black" | "white";

export interface ChessPiece {
    type: PieceType;
    color: PieceColor;
}

export type Board = (ChessPiece | null)[][];

export type ZobristTable = Record<PieceColor, Record<PieceType, bigint[][]>>;

export interface Position {
    row: number;
    col: number;
}

export type PromotionData = {
    isPromoting: boolean;
    position: Position | null;
    color: 'white' | 'black' | null;
    capturedPiece?: ChessPiece
    from?: Position;
};

export type gameStatus = 'draw' | 'checkmate' | 'ongoing'

export interface PieceMove {
    piece: ChessPiece;
    from: {
        row: number;
        col: number;
        hash: bigint;
    };
    to: {
        row: number;
        col: number;
        hash: bigint;
    };
    capturedPiece: {
        type: PieceType;
        color: Color;
        hash: bigint;
    } | null;
    castlingRook?: {
        rookCol: number
        newRookCol: number
        fromHash: bigint;
        toHash: bigint;
    } | null;
    isEnPassant: boolean;
    isCastling: boolean;
    isPromotion: boolean;

    moveHash: bigint;
}

export type RookMovedKeys =
    | 'white-7-0'
    | 'white-7-7'
    | 'black-0-7'
    | 'black-0-0';
