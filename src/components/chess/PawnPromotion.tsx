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
        <div className="bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white/80 p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                    {promotionPieces.map((piece) => (
                        <button
                            key={piece}
                            onClick={() => onSelect(piece)}
                            className={`
                                p-4 rounded-lg border-2 transition-all hover:scale-105
                                ${color === 'white'
                                    ? 'bg-black text-white'
                                    : 'bg-white text-black'
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


