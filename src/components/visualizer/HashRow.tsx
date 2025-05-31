'use client'
import { getPieceSymbol } from "@/lib/chess/getPieceSymbol";
import { PieceMove } from "@/types/chess";

interface HashTableRowProps {
    move: PieceMove;
    index: number;
    toChessNotation: (row: number, col: number) => string;
}

export const HashTableRow = ({ move, index, toChessNotation }: HashTableRowProps) => {
    const removeHash = move.moveHash ^ move.from.hash;
    const addHash = removeHash ^ move.to.hash;
    const resultingHash = addHash;

    return (
        <tr key={index} className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <span className={`
                        text-2xl  font-mono 
                        ${move.piece.color === 'white'
                            ? "text-white [text-shadow:_2px_0_0_#000,_-1px_0_0_#000,_0_1px_0_#000,_0_-1px_0_#000]"
                            : "text-black [text-shadow:_1px_0_0_#fff,_-1px_0_0_#fff,_0_1px_0_#fff,_0_-1px_0_#fff]"
                        }`
                    }>
                        {getPieceSymbol(move.piece.type, move.piece.color)}
                    </span>
                    <div>
                        <div className="capitalize font-medium">
                            {move.piece.color} {move.piece.type}
                        </div>
                        <div className="flex gap-2 mt-1">
                            {move.isEnPassant && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                    en passant
                                </span>
                            )}
                            {move.isCastling && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                    castling
                                </span>
                            )}
                            {move.isPromotion && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    promotion
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </td>

            <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <span className="font-medium">
                        {toChessNotation(move.from.row, move.from.col)}
                    </span>
                    <span className="text-gray-400">→</span>
                    <span className="font-medium">
                        {toChessNotation(move.to.row, move.to.col)}
                    </span>
                </div>
                {move.capturedPiece && (
                    <div className="mt-2 flex items-center gap-1 text-sm">
                        <span className="text-gray-500">Captured:</span>
                        <span className="font-medium text-red-600">
                            {move.capturedPiece.type}
                        </span>
                        <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                            {move.capturedPiece.hash}n
                        </span>
                    </div>
                )}
            </td>

            <td className="px-4 py-3">
                <div className="space-y-2">
                    <div className="bg-gray-50 p-2 rounded font-mono text-sm">
                        <div className="text-gray-600">Remove:</div>
                        <div>{move.moveHash}n ^ {move.from.hash}n</div>
                        <div className="text-blue-600 font-medium">= {removeHash}n</div>
                    </div>
                    {move.capturedPiece && (
                        <div className="bg-gray-50 p-2 rounded font-mono text-sm">
                            <div className="text-gray-600">Capture:</div>
                            <div>{removeHash}n ^ {move.capturedPiece.hash}n</div>
                            <div className="text-blue-600 font-medium">
                                = {removeHash ^ move.capturedPiece.hash}n
                            </div>
                        </div>
                    )}
                    <div className="bg-gray-50 p-2 rounded font-mono text-sm">
                        <div className="text-gray-600">Add:</div>
                        <div>{removeHash}n ^ {move.to.hash}n</div>
                        <div className="text-blue-600 font-medium">
                            = {addHash}n
                        </div>
                    </div>
                </div>
            </td>

            {/* Resulting Hash Column */}
            <td className="px-4 py-3">
                <div className="font-mono bg-blue-50 text-blue-700 p-2 rounded text-center font-medium">
                    {resultingHash}n
                </div>
            </td>
        </tr>
    );
};