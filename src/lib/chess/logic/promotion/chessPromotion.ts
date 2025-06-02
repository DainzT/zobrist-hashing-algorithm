import { Board, ChessPiece, PieceColor, PieceType, Position, ZobristTable } from "@/types/chess";

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
    from: Position | null,
    position: Position | null,
    color: PieceColor | null,
    pieceType: Exclude<PieceType, 'pawn' | 'king'>,
    zobristTable: ZobristTable,
    capturedPiece: ChessPiece| null,
) => {
    let newHash = currentHash;
    console.log(zobristTable[color!]['pawn'][from!.row][from!.col])
    newHash ^= zobristTable[color!]['pawn'][from!.row][from!.col];
    if (capturedPiece) {
        newHash ^= zobristTable[capturedPiece!.color][capturedPiece!.type][position!.row][position!.col];
    }
    console.log(zobristTable[color!][pieceType][position!.row][position!.col])
    newHash ^= zobristTable[color!][pieceType][position!.row][position!.col];
    return newHash;
};