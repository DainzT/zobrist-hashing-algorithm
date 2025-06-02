import { Board, Color, Position } from "@/types/chess";
import { findKingPosition } from "../movement/findKingPosition";
import { isKingInCheck } from "./isKingInCheck";

export const wouldLeaveKingInCheck = (
        board: Board,
        from: Position,
        to: Position,
        color: Color
    ): boolean => {
        const newBoard = board.map(row => [...row]);
        
        const piece = newBoard[from.row][from.col];
        if (!piece) return false;
        
        newBoard[from.row][from.col] = null;
        newBoard[to.row][to.col] = piece;
        
        const kingPosition = findKingPosition(newBoard, color);
        
        return isKingInCheck(newBoard, kingPosition, color);
    };