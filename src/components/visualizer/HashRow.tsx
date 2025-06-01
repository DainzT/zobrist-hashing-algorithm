'use client'
import { getPieceSymbol } from "@/lib/chess/getPieceSymbol";
import { PieceMove } from "@/types/chess";

interface HashTableRowProps {
    move: PieceMove;
    index: number;
    toChessNotation: (row: number, col: number) => string;
}

export const HashTableRow = ({
    move,
    index,
    toChessNotation
}: HashTableRowProps) => {
    const removeHash = move.moveHash ^ move.from.hash;
    const addHash = removeHash ^ move.to.hash;
    const resultingHash = addHash;

    return (
        <tr key={index} className="hover:bg-[#f8f1e4] transition-colors border-b border-[#e0d0b1]">
            <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <span className={`
                        text-2xl font-mono 
                        ${move.piece.color === 'white'
                            ? "text-white [text-shadow:_2px_0_0_#000,_-1px_0_0_#000,_0_1px_0_#000,_0_-1px_0_#000]"
                            : "text-black [text-shadow:_1px_0_0_#fff,_-1px_0_0_#fff,_0_1px_0_#fff,_0_-1px_0_#fff]"
                        }`
                    }>
                        {getPieceSymbol(move.piece.type, move.piece.color)}
                    </span>
                    <div>
                        <div className="capitalize font-medium text-[#5d432c]">
                            {move.piece.color} {move.piece.type}
                        </div>
                        <div className="flex gap-2 mt-1">
                            {move.isEnPassant && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#d9c3f0] text-[#5d3a8a]">
                                    en passant
                                </span>
                            )}
                            {move.isCastling && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#c3d9f0] text-[#3a5d8a]">
                                    castling
                                </span>
                            )}
                            {move.isPromotion && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#c3f0d9] text-[#3a8a5d]">
                                    promotion
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </td>

            <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-[#5d432c]">
                        {toChessNotation(move.from.row, move.from.col)}
                    </span>
                    <span className="text-[#b58863]">→</span>
                    <span className="font-medium text-[#5d432c]">
                        {toChessNotation(move.to.row, move.to.col)}
                    </span>
                </div>
                {move.capturedPiece && (
                    <div className="mt-2 flex items-center gap-1 text-sm">
                        <span className="text-[#8a6d5d]">Captured:</span>
                        <span className="font-medium text-[#c45a4d]">
                            {move.capturedPiece.type}
                        </span>
                        <span className="font-mono text-xs bg-[#f0e5d9] px-1.5 py-0.5 rounded text-[#8a6d5d]">
                            {move.capturedPiece.hash}n
                        </span>
                    </div>
                )}
            </td>

            <td className="px-4 py-3">
                <div className="space-y-2">
                    <div className="bg-[#f0e5d9] p-2 rounded font-mono text-sm text-[#5d432c]">
                        <div className="text-[#8a6d5d]">Remove:</div>
                        <div>{move.moveHash}n ^ {move.from.hash}n</div>
                        <div className="text-[#4a766d] font-medium">= {removeHash}n</div>
                    </div>
                    {move.capturedPiece && (
                        <div className="bg-[#f0e5d9] p-2 rounded font-mono text-sm text-[#5d432c]">
                            <div className="text-[#8a6d5d]">Capture:</div>
                            <div>{removeHash}n ^ {move.capturedPiece.hash}n</div>
                            <div className="text-[#4a766d] font-medium">
                                = {removeHash ^ move.capturedPiece.hash}n
                            </div>
                        </div>
                    )}
                    <div className="bg-[#f0e5d9] p-2 rounded font-mono text-sm text-[#5d432c]">
                        <div className="text-[#8a6d5d]">Add:</div>
                        <div>{removeHash}n ^ {move.to.hash}n</div>
                        <div className="text-[#4a766d] font-medium">
                            = {addHash}n
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3">
                <div className="font-mono bg-[#e5f0d9] text-[#4a766d] p-2 rounded text-center font-medium">
                    {resultingHash}n
                </div>
            </td>
        </tr>
    );
};