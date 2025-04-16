'use client'
import { ChessPiece as ChessPieceType } from "../../types/chess";
import { ChessPiece } from "./ChessPiece";

interface BoardTileProps {
    piece: ChessPieceType | null;
    isDark: boolean;
    isSelected: boolean;
    onClick: () => void;
};

export const BoardTile = ({
    piece,
    isDark,
    isSelected,
    onClick,
}: BoardTileProps) => {
    return (
        <button
            onClick={onClick}
            className={`
                w-full h-full flex items-center justify-center
                relative
                ${isDark ? "bg-[#000000]" : "bg-[#ffffff]"}
                focus:outline-none
                transition-all duration-200
                overflow-visible
                ${isSelected ? `
                    [&::after]:content-['']
                    [&::after]:absolute 
                    [&::after]:inset-0
                    [&::after]:rounded-[1px]
                    [&::after]:border-2 
                    [&::after]:border-[#72ff70]
                    [&::after]:shadow-[0_0_10px_3px_rgba(114,255,112,0.7)]
                    [&::after]:z-10
                    [&::after]:pointer-events-none
                ` : ''}
            `}
        >
            {piece && <ChessPiece piece={piece} />}
        </button>
    );
};