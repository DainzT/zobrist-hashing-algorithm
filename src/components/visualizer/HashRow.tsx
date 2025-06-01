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

    const captureHash = move.capturedPiece ? removeHash ^ move.capturedPiece.hash : removeHash;

    const resultingHash = move.capturedPiece ? captureHash ^ move.to.hash : addHash;

    return (
        <tr key={index} className="hover:bg-[#f8f1e4] transition-colors border-b-2 border-[#e0d0b1] max-w-[500px] w-full ">
            <td className="px-2 py-2 whitespace-nowrap w-1/4">
                <div className="flex items-center gap-2">
                    <span className={`
                        text-xl font-mono 
                        ${move.piece.color === 'white'
                            ? "text-white [text-shadow:_2px_0_0_#000,_-1px_0_0_#000,_0_1px_0_#000,_0_-1px_0_#000]"
                            : "text-black [text-shadow:_1px_0_0_#fff,_-1px_0_0_#fff,_0_1px_0_#fff,_0_-1px_0_#fff]"
                        }`
                    }>
                        {getPieceSymbol(move.piece.type, move.piece.color)}
                    </span>
                    <div>
                        <div className="flex-col capitalize font-medium text-[#5d432c] text-xs">
                            <div>{move.piece.color}</div>
                            <div>{move.piece.type}</div>
                        </div>
                        <div className="flex gap-1 mt-1">
                            {move.isEnPassant && (
                                <span className="flex-col  px-1 rounded text-xs font-medium bg-[#d9c3f0] text-[#5d3a8a]">
                                    <div>en </div>
                                    <div>passant</div>
                                </span>
                            )}
                            {move.isCastling && (
                                <span className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-[#c3d9f0] text-[#3a5d8a]">
                                    castling
                                </span>
                            )}
                            {move.isPromotion && (
                                <span className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-[#c3f0d9] text-[#3a8a5d]">
                                    promotion
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </td>

            <td className="px-2 py-2 whitespace-nowrap w-1/4">
                <div className="flex items-center gap-1">
                    <span className="font-medium text-[#5d432c] text-xs">
                        {toChessNotation(move.from.row, move.from.col)}
                    </span>
                    <span className="text-[#b58863]">→</span>
                    <span className="font-medium text-[#5d432c] text-xs">
                        {toChessNotation(move.to.row, move.to.col)}
                    </span>
                </div>
                {(move.capturedPiece) && (
                    <div className="mt-1 flex items-start gap-1 text-xs flex-col">
                        <span className="text-[#8a6d5d]">Captured:</span>
                        <div className="font-medium text-[#c45a4d]">
                            {move.capturedPiece.color} {move.capturedPiece.type}
                        </div>
                        <div className="font-mono text-xs bg-[#f0e5d9] px-1 py-0.5 text-[#8a6d5d]">
                            {move.capturedPiece.hash.toString().slice(0, 8)}
                        </div>
                        <div className="font-mono text-xs bg-[#f0e5d9] px-1 text-[#8a6d5d]">
                            {move.capturedPiece.hash.toString().slice(8, 16)}
                        </div>
                        <div className="font-mono text-xs bg-[#f0e5d9] px-1  text-[#8a6d5d]">
                            {move.capturedPiece.hash.toString().slice(16, 20)}n
                        </div>
                    </div>
                )}
            </td>

            <td className="px-2 py-2 w-1/4">
                <div className="space-y-1">
                    <div className="bg-[#f0e5d9] p-1 rounded font-mono text-xs text-[#5d432c]">
                        <div className="text-[#8a6d5d]">Remove:</div>
                        <div>{move.moveHash}n ^ {move.from.hash}n</div>
                        <div className="text-[#4a766d] font-medium">= {removeHash}n</div>
                    </div>
                    {move.capturedPiece && (
                        <div className="bg-[#f0e5d9] p-1 rounded font-mono text-xs text-[#5d432c]">
                            <div className="text-[#8a6d5d]">Capture:</div>
                            <div>{removeHash}n ^ {move.capturedPiece.hash}n</div>
                            <div className="text-[#4a766d] font-medium">
                                = {captureHash}n
                            </div>
                        </div>
                    )}
                    <div className="bg-[#f0e5d9] p-1 rounded font-mono text-xs text-[#5d432c]">
                        <div className="text-[#8a6d5d]">Add:</div>
                        <div>{captureHash}n ^ {move.to.hash}n</div>
                        <div className="text-[#4a766d] font-medium">
                            = {resultingHash}n
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-2 py-2 w-1/4">
                <div className="font-mono bg-[#e5f0d9] text-[#4a766d] p-1 text-left font-medium text-xs">
                        <div>{resultingHash.toString().slice(0, 15)}</div>
                        <div>{resultingHash.toString().slice(15, 20)}n</div>
                </div>
            </td>
        </tr>
    );
};
