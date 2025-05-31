import { ChessPiece, PieceMove, Position, ZobristTable } from "@/types/chess";
import { Dispatch, SetStateAction } from "react";

export const recordMove = (
    piece: ChessPiece,
    from: Position,
    to: Position,
    zobristTable: ZobristTable,
    currentHash: bigint,
    setMoveHistory: Dispatch<SetStateAction<PieceMove[]>>,
    additionalProps?: {
        capturedPiece?: ChessPiece | null;
        isEnPassant?: boolean;
        isCastling?: boolean;
        isPromotion?: boolean;
    }
) => {
    const fromHash = zobristTable[piece.color][piece.type][from.row][from.col];
    const toHash = zobristTable[piece.color][piece.type][to.row][to.col];

    const move: PieceMove = {
        piece,
        from: {
            ...from,
            hash: fromHash
        },
        to: {
            ...to,
            hash: toHash
        },
        capturedPiece: additionalProps?.capturedPiece ? {
            type: additionalProps.capturedPiece.type,
            color: additionalProps.capturedPiece.color,
            hash: zobristTable[additionalProps.capturedPiece.color][additionalProps.capturedPiece.type][to.row][to.col]
        } : null,
        isEnPassant: additionalProps?.isEnPassant || false,
        isCastling: additionalProps?.isCastling || false,
        isPromotion: additionalProps?.isPromotion || false,

        moveHash: currentHash || 0n
    };
    setMoveHistory(prev => [...prev, move]);
};

