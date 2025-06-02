import { Board, Color, Position } from "@/types/chess";
import { validateMove } from "../../rules";
import { wouldLeaveKingInCheck } from "./wouldLeaveKingInCheck";
import { getSquaresBetween } from "../movement/getSquaresBetween";

export const canCheckBeBlocked = (board: Board, checkingPiecePos: Position, kingPosition: Position, color: Color): boolean => {
    const checkingPiece = board[checkingPiecePos.row][checkingPiecePos.col];
    if (!checkingPiece) return false;

    if (checkingPiece.type === 'knight' || checkingPiece.type === 'pawn') {
        return false;
    }

    const squaresBetween = getSquaresBetween(checkingPiecePos, kingPosition);

    for (const square of squaresBetween) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.color === color && piece.type !== 'king') {
                    if (validateMove(
                        board,
                        { row, col },
                        square,
                        null,
                        false,
                        undefined,
                        true
                    )) {
                        if (!wouldLeaveKingInCheck(board, { row, col }, square, color)) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    return false;
};