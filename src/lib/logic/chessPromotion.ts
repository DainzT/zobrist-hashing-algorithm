import { Board, PieceColor, PieceType, Position, ZobristTable } from "@/types/chess";

export const updateBoardAfterPromotion = (
    board: Board,
    position: Position | null,
    color: PieceColor | null,
    pieceType: Exclude<PieceType, 'pawn' | 'king'>
) => {
    const newBoard = [...board.map(r => [...r])];
    newBoard[position!.row][position!.col] = {
        type: pieceType,
        color: color!,
    };
    return newBoard;
};

export const updateHashAfterPromotion = (
    currentHash: bigint,
    position: Position | null,
    color: PieceColor | null,
    pieceType: Exclude<PieceType, 'pawn' | 'king'>,
    zobristTable: ZobristTable,
) => {
    let newHash = currentHash;
    newHash ^= zobristTable[color!]['pawn'][position!.row][position!.col];
    newHash ^= zobristTable[color!][pieceType][position!.row][position!.col];
    return newHash;
};