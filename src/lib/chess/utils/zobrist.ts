'use client'
import { PieceColor, PieceType, ZobristTable } from '@/types/chess';

const pieceTypes: PieceType[] = ["pawn", "rook", "knight", "bishop", "queen", "king"];
const pieceColors: PieceColor[] = ["white", "black"];

const generateRandom64Bit = (): bigint => {
    const high = Math.floor(Math.random() * 0xFFFFFFFF);
    const low = Math.floor(Math.random() * 0xFFFFFFFF);
    return ((BigInt(high) << 32n) | BigInt(low));
};

export const initializeZobristTable = (): ZobristTable => {
    const table: ZobristTable = {
        white: {} as Record<PieceType, bigint[][]>,
        black: {} as Record<PieceType, bigint[][]>,
        castling: {
            whiteKingside: generateRandom64Bit(),
            whiteQueenside: generateRandom64Bit(),
            blackKingside: generateRandom64Bit(),
            blackQueenside: generateRandom64Bit(),
        },
    };

    for (const color of pieceColors) {
        for (const type of pieceTypes) {
            table[color]![type] = Array(8).fill(0).map(() => 
                Array(8).fill(0).map(() => generateRandom64Bit())
            );
        }
    }

    return table;
}