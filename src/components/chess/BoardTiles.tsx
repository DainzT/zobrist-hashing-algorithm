'use client'
import { ChessPiece as ChessPieceType } from "../../types/chess";
import { ChessPiece } from "./ChessPiece";

interface BoardTileProps {
    piece: ChessPieceType | null;
    isDark: boolean;
    isSelected: boolean;
    row: number;
    col: number;
    showCoordinates: boolean;
    onClick: () => void;
};

export const BoardTile = ({
    piece,
    isDark,
    isSelected,
    row,
    col,
    showCoordinates,
    onClick,
}: BoardTileProps) => {
    const file = String.fromCharCode(97 + col);
    const rank = 8 - row;
    const coordinate = `${file}${rank}`;

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
                ${piece ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}
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
            {showCoordinates && (
            <span className={`
                absolute
                text-[11px]
                ${isDark ? "text-[#eeeed2]" : "text-[#769656]"}
                font-medium
                z-20
                bottom-1 right-1
                flex items-center justify-center
            `}>
                <span className={`
                    relative
                    px-1
                    ${isDark ? "before:bg-[#769656]/30" : "before:bg-[#eeeed2]/30"}
                    before:content-['']
                    before:absolute
                    before:inset-0
                    before:rounded-full
                    before:z-[-1]
                    before:opacity-80
                    before:scale-110
                    hover:before:scale-125
                    transition-all duration-100
                `}>
                    {coordinate}
                </span>
            </span>
            )}
        </button>
    );
};