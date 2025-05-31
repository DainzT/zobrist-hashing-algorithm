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
                <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Initial Hash</h3>
                            <p className="font-mono text-lg font-semibold">0n</p>
                        </div>
                        <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Current Hash</h3>
                            <p className="font-mono text-lg font-semibold text-blue-600">{currentHash}n</p>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <HashTableHeader
                            columns={['Piece', 'Move', 'Hash Operations', 'Result']}
                        />
                        <tbody className="bg-white divide-y divide-gray-200">
                            {moves.map((move, index) => {
                                return (
                                    <HashTableRow
                                        key={index}
                                        move={move}
                                        index={index}
                                        toChessNotation={toChessNotation}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {moves.length === 0 && (
                    <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                        <div className="text-gray-500 mb-2">No moves recorded yet</div>
                        <div className="text-sm text-gray-400">Make a move to see hash calculations</div>
                    </div>
                )}
            </div>
        );
    }
    else if (type === 'checkers') {
        return (
            <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                <div className="text-gray-700">Checkers hash visualization coming soon</div>
            </div>
        );
    }

    return null;
}