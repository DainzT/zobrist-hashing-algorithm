'use client'
import { PieceMove } from "@/types/chess";
import { HashTableHeader } from "./HashHeader";
import { HashTableRow } from "./HashRow";

type GameType = 'chess' | 'checkers';

interface HashTableProps {
    type: GameType;
    currentHash: bigint;
    moves: PieceMove[];
}

export const HashTable = ({
    type,
    currentHash,
    moves = [],
}: HashTableProps) => {
    const toChessNotation = (row: number, col: number): string => {
        const file = String.fromCharCode(97 + col);
        const rank = 8 - row;
        return `${file}${rank}`;
    };

    if (type === 'chess') {
        return (
            <div className="w-full">
                <div className="bg-[#f0d9b5] rounded-xl p-4 mb-6 border-2 border-[#b58863] shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white  p-4 rounded-lg border-2 border-[#5d8a66] shadow-sm">
                            <h3 className="text-sm font-medium text-[#5d8a66] mb-1">Initial Hash</h3>
                            <p className="font-mono text-lg font-semibold text-[#b58863]">0n</p>
                        </div>
                        <div className="bg-white  p-4 rounded-lg border-2 border-[#5d8a66] shadow-sm">
                            <h3 className="text-sm font-medium text-[#5d8a66] mb-1">Current Hash</h3>
                            <p className="font-mono text-lg font-semibold text-[#5d8a66]">{currentHash.toString()}n</p>
                        </div>
                    </div>
                </div>


                <div className="border-2 border-[#b58863] overflow-hidden shadow-md">
                    <table className="min-w-full divide-y divide-[#b58863]/30">
                        <HashTableHeader
                            columns={['Piece', 'Move', 'Hash Operations', 'Result']}
                        />
                        <tbody className="bg-white divide-y divide-[#b58863]/30">
                            {moves.map((move, index) => (
                                <HashTableRow
                                    key={index}
                                    move={move}
                                    index={index}
                                    toChessNotation={toChessNotation}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                {moves.length == 0 && (
                    <div className="bg-[#f0d9b5] p-8 text-center border-2 border-[#b58863]">
                        <div className="text-[#5d8a66] mb-2 font-medium">No moves recorded yet</div>
                        <div className="text-sm text-[#5d8a66]/80">Make a move to see hash calculations</div>
                    </div>
                )}
            </div>
        );
    }
    else if (type === 'checkers') {
        return (
            <div className="bg-[#f0d9b5] rounded-xl p-8 text-center border-2 border-[#b58863]">
                <div className="text-[#5d8a66] font-medium">Checkers hash visualization coming soon</div>
            </div>
        );
    }

    return null;
}