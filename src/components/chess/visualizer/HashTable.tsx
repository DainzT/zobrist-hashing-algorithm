'use client'
import { PieceMove } from "@/types/chess";
import { HashTableHeader } from "./HashTableHeader";
import { HashTableRow } from "./HashTableRow";

interface HashTableProps {
    moves: PieceMove[];
}

export const HashTable = ({
    moves = [],
}: HashTableProps) => {
    const toChessNotation = (row: number, col: number): string => {
        const file = String.fromCharCode(97 + col);
        const rank = 8 - row;
        return `${file}${rank}`;
    };

    return (
        <div className="w-full">

            {moves.length > 0 ? (
                <>
                    <div className="border-2 border-[#5d8a66] overflow-auto shadow-md h-[370px]">
                        <table className=" divide-[#b58863]/30">
                            <HashTableHeader
                                columns={[
                                    'Piece',
                                    'Move',
                                    'Operations',
                                    'Result'
                                ].filter(Boolean)}
                            />
                            <tbody className="bg-white divide-[#b58863]/30 overflow-auto">
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
                </>
            ) : (
                <div className="bg-[#f0d9b5] p-8 text-center border-2 border-[#5d8a66]">
                    <div className="text-[#5d8a66] mb-2 font-medium">No moves recorded yet</div>
                    <div className="text-sm text-[#5d8a66]/80">Make a move to see hash calculations</div>
                </div>
            )}
        </div>
    );
}