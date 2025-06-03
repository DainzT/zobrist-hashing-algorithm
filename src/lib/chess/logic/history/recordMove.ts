import { ChessPiece, PieceColor, PieceMove, PieceType, Position, ZobristTable } from "@/types/chess";
import { Dispatch, SetStateAction } from "react";

export const recordMove = (
    piece: ChessPiece,
    from: Position,
    to: Position,
    zobristTable: ZobristTable,
    currentHash: bigint,
    setMoveHistory: Dispatch<SetStateAction<PieceMove[]>>,
    capturedPiece?: ChessPiece | null,
    enPassantCaptured?: ChessPiece | null,
    isEnPassant?: boolean,
    isCastling?: { valid: boolean, from: number, to: number, kingSideHash: bigint, queenSideHash: bigint },
    isPromotion?: boolean,
) => {
    const fromHash = zobristTable[piece.color][isPromotion ? 'pawn' : piece.type][from.row][from.col];
    const toHash = zobristTable[piece.color][piece.type][to.row][to.col];
    const castlingRookData = isCastling?.valid ? {
        rookCol: isCastling.from,
        newRookCol: isCastling.to,
        fromHash: zobristTable[piece.color]['rook'][to.row][isCastling.from],
        toHash: zobristTable[piece.color]['rook'][to.row][isCastling.to],
        kingSideHash: isCastling.kingSideHash,
        queenSideHash: isCastling.queenSideHash,
    } : null;

    const capturedPieceData: { type: PieceType; color: PieceColor; hash: bigint } | null = (() => {
        if (isEnPassant && enPassantCaptured) {
            return {
                type: 'pawn' as PieceType,
                color: enPassantCaptured.color,
                hash: zobristTable[enPassantCaptured.color]['pawn'][from.row][to.col]
            }
        }

        if (capturedPiece) {
            return {
                type: capturedPiece.type,
                color: capturedPiece.color,
                hash: zobristTable[capturedPiece.color][capturedPiece.type][to.row][to.col]
            }
        };
        return null;
    })();

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
        capturedPiece: capturedPieceData ?? null,
        castlingRook: castlingRookData,
        isEnPassant: isEnPassant!,
        isCastling: isCastling?.valid ?? false,
        isPromotion: isPromotion!,
        moveHash: currentHash || 0n
    };
    setMoveHistory(prev => [...prev, move]);
};

