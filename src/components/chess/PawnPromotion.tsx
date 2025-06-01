'use client'
import { PieceType } from "@/types/chess";

type PromotionPiece = Exclude<PieceType, 'pawn' | 'king'>;

interface PawnPromotionProps {
    color: 'white' | 'black';
    onSelect: (pieceType: PromotionPiece) => void;
}


export const PawnPromotion = ({
    color,
    onSelect,
}: PawnPromotionProps) => {
    const promotionPieces: PromotionPiece[] = ['queen', 'rook', 'bishop', 'knight'];

    return (
        <div className="bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className={`
                bg-[#f0d9b5]/90 p-6 rounded-xl border-2 border-[#b58863]
                shadow-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            `}>
                <div className="grid grid-cols-2 gap-4">
                    {promotionPieces.map((piece) => (
                        <button
                            key={piece}
                            onClick={() => onSelect(piece)}
                            className={`
                                p-4 rounded-lg border-2 transition-all  hover:scale-105 active:scale-95 
                                cursor-pointer
                                ${color === 'white'
                                    ? 'bg-[#5d8a66] border-[#4a6b57] text-[#ffffff] [text-shadow:_3px_0_0_#000,_-1px_0_0_#000,_0_1px_0_#000,_0_-1px_0_#000]'
                                    : 'bg-[#5d8a66] border-[#4a6b57] text-black [text-shadow:_1px_0_0_#fff,_-2px_0_0_#fff,_0_1px_0_#fff,_0_-1px_0_#fff]'
                                }
                            `}
                        >
                            <div className="flex flex-col items-center w-full h-full">
                                <span className="text-3xl  w-10">
                                    {getPieceSymbol(piece, color)}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

function getPieceSymbol(piece: PromotionPiece, color: 'white' | 'black'): string {
    const symbols = {
        queen: color === 'white' ? '♛' : '♛',
        rook: color === 'white' ? '♜' : '♜',
        bishop: color === 'white' ? '♝' : '♝',
        knight: color === 'white' ? '♞' : '♞',
    };
    return symbols[piece];
}


