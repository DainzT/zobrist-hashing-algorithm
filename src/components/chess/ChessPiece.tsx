'use client'
import { getPieceSymbol } from "@/lib/chess/getPieceSymbol";
import { ChessPiece as ChessPieceType } from "@/types/chess";

interface ChessPieceProps {
    piece: ChessPieceType
}

export const ChessPiece = ({
    piece,
}: ChessPieceProps) => {
    return (
        <span
            className={`
                text-4xl ${piece.color === "white" 
                    ? "text-[#ffffff] [text-shadow:_3px_0_0_#000,_-1px_0_0_#000,_0_1px_0_#000,_0_-1px_0_#000]"
                    : "text-black   [text-shadow:_1px_0_0_#fff,_-2px_0_0_#fff,_0_1px_0_#fff,_0_-1px_0_#fff]"}
            `}
        >
            {getPieceSymbol(piece.type, piece.color)}
        </span>
    );
};