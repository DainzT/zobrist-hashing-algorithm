import { Position } from "@/types/chess";

export const getSquaresBetween = (pos1: Position, pos2: Position): Position[] => {
    const squares: Position[] = [];
    const rowStep = pos1.row === pos2.row ? 0 : pos1.row < pos2.row ? 1 : -1;
    const colStep = pos1.col === pos2.col ? 0 : pos1.col < pos2.col ? 1 : -1;

    let row = pos1.row + rowStep;
    let col = pos1.col + colStep;

    while (row !== pos2.row || col !== pos2.col) {
        squares.push({ row, col });
        row += rowStep;
        col += colStep;
    }

    return squares;
};