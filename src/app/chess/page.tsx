'use client'
import { BoardTile } from "@/components/chess/BoardTiles";
import { ZobristTile } from "@/components/visualizer/ZobristTile";
import { useChessGame } from "@/hooks/useChessGame";
import { PawnPromotion } from "@/components/chess/PawnPromotion";
import { useState } from "react";
import { Position } from "@/types/chess";
import { HashTable } from "@/components/visualizer/HashTable";
import { GameStatus } from "@/components/chess/GameStatus";

const ChessBoard = () => {
    const { board, selectedPiece, promotion, handleSquareClick, handlePromotionChoice, zobristTable, gameStatus } = useChessGame();
    const [isActive, setIsActive] = useState<Position>();


    const handleLastActive = (row: number, col: number) => {
        setIsActive({ row, col })
    }

    const selectedPieceData = isActive ? board[isActive.row][isActive.col] : null;

    const zobristValues = selectedPieceData
        ? zobristTable[selectedPieceData.color][selectedPieceData.type]
        : null;

    return (
        <main className="flex items-center justify-center font-[Inter] min-h-screen w-screen bg-[#FFF] gap-10">
            <div className="flex flex-col items-center outline-1">
                <section
                    className="relative w-[500px] h-[500px] border-[1px] border-[#000] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] grid grid-cols-8 grid-rows-8"
                >

                    {board.map((row, rowIndex) => (
                        row.map((piece, colIndex) => (
                            <BoardTile
                                key={`${rowIndex}-${colIndex}`}
                                isDark={(rowIndex + colIndex) % 2 === 1}
                                onClick={() => {
                                    handleSquareClick({ row: rowIndex, col: colIndex })
                                    handleLastActive(rowIndex, colIndex)
                                }}
                                isSelected={
                                    selectedPiece?.row === rowIndex &&
                                    selectedPiece?.col === colIndex
                                }
                                piece={piece}
                            />
                        ))
                    ))}

                    {promotion.isPromoting && promotion.color && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <PawnPromotion
                                color={promotion.color}
                                onSelect={handlePromotionChoice}
                            />
                        </div>
                    )}

                    {gameStatus === "draw" && ( 
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <GameStatus
                                gameStatus={gameStatus}
                            />
                        </div>
                    )}
                </section>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-[400px] h-[400px] border-[1px] border-[#000] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] grid grid-cols-8 grid-rows-8">
                    {zobristValues ? (
                        Array(8).fill(0).map((_, rowIndex) => (
                            Array(8).fill(0).map((_, colIndex) => (
                                <ZobristTile
                                    key={`zobrist-${rowIndex}-${colIndex}`}
                                    value={zobristValues[rowIndex][colIndex]}
                                    isHighlighted={
                                        isActive?.row === rowIndex &&
                                        isActive?.col === colIndex
                                    }
                                />
                            ))
                        ))
                    ) : (
                        Array(8).fill(0).map((_, rowIndex) => (
                            Array(8).fill(0).map((_, colIndex) => (
                                <ZobristTile
                                    key={`empty-${rowIndex}-${colIndex}`}
                                    value={null}
                                    isHighlighted={false}
                                />
                            ))
                        ))
                    )}
                </div>
            </div>
            <div className="flex flex-col items-center">
                <HashTable />
            </div>
        </main>
    )
};

export default ChessBoard;