'use client'
import { BoardTile } from "@/components/chess/BoardTiles";
import { ZobristTile } from "@/components/visualizer/ZobristTile";
import { useChessGame } from "@/hooks/useChessGame";
import { PawnPromotion } from "@/components/chess/PawnPromotion";
import { useState } from "react";
import { Position } from "@/types/chess";
import { GameStatus } from "@/components/chess/GameStatus";
import { HashTable } from "@/components/visualizer/HashTable";
import { BoardCoordinates } from "@/components/chess/BoardCoordinates";
import { ToggleButton } from "@/components/chess/Toggle/ToggleButton";
import { TogglePanelButton } from "@/components/chess/Toggle/TogglePanelButton";

const ChessBoard = () => {
    const {
        board,
        selectedPiece,
        promotion,
        handleSquareClick,
        handlePromotionChoice,
        zobristTable,
        gameStatus,
        currentHash,
        moveHistory,
    } = useChessGame();
    const [isActive, setIsActive] = useState<Position>();
    const [showBoardCoordinates, setShowBoardCoordinates] = useState<boolean>(false);
    const [showTileCoordinates, setShowTileCoordinates] = useState<boolean>(false);
    const [showZobristTable, setShowZobristTable] = useState<boolean>(false);
    const [showHashTable, setShowHashTable] = useState<boolean>(false);

    const handleLastActive = (row: number, col: number) => {
        setIsActive({ row, col })
    }

    const selectedPieceData = isActive ? board[isActive.row][isActive.col] : null;
    const zobristValues = selectedPieceData
        ? zobristTable[selectedPieceData.color][selectedPieceData.type]
        : null;

    return (
        <main className="flex flex-col items-center w-full gap-6 p-6">
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex-1">
                    <h2 className="text-xl font-medium mb-4 text-gray-800 tracking-tight">Board Settings</h2>
                    <div className="flex flex-col lg:flex-row gap-3">
                        <ToggleButton
                            action={showBoardCoordinates}
                            setAction={setShowBoardCoordinates}
                            toggleOffPrompt="Show Board Coordinates"
                            toggleOnPrompt="Hide Board Coordinates"
                        />
                        <ToggleButton
                            action={showTileCoordinates}
                            setAction={setShowTileCoordinates}
                            toggleOffPrompt="Show Tile Coordinates"
                            toggleOnPrompt="Hide Tile Coordinates"
                        />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex-1">
                    <h2 className="text-xl font-medium mb-4 text-gray-800 tracking-tight">Visualization</h2>
                    <div className="flex flex-col lg:flex-row gap-3">
                        <TogglePanelButton
                            isOpen={showZobristTable}
                            onClick={() => setShowZobristTable(!showZobristTable)}
                            label="Zobrist Table"
                        />

                        <TogglePanelButton
                            isOpen={showHashTable}
                            onClick={() => setShowHashTable(!showHashTable)}
                            label="Hash Table"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center w-full">
                <div className="bg-white p-2 rounded-xl shadow-lg border border-gray-200 font-mono">
                    <BoardCoordinates showBoardCoordinates={showBoardCoordinates}>
                        <section
                            className="
                                relative w-[500px] h-auto aspect-square
                                border border-gray-300
                                shadow-sm grid grid-cols-8 grid-rows-8
                            ">
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
                                        row={rowIndex}
                                        col={colIndex}
                                        showCoordinates={showTileCoordinates}
                                    />
                                ))
                            ))}

                            {promotion.isPromoting && promotion.color && (
                                <div
                                    className="
                                        absolute inset-0 flex items-center justify-center 
                                        z-10 bg-black/50 rounded-xl
                                ">
                                    <PawnPromotion
                                        color={promotion.color}
                                        onSelect={handlePromotionChoice}
                                    />
                                </div>
                            )}

                            {gameStatus === "draw" && (
                                <div
                                    className="
                                        absolute inset-0 flex items-center 
                                        justify-center z-10 bg-black/50 rounded-xl
                                ">
                                    <GameStatus gameStatus={gameStatus} />
                                </div>
                            )}
                        </section>
                    </BoardCoordinates>
                </div>
            </div>

            <div className={`
                    bg-white rounded-xl shadow-md transition-all duration-300 
                    overflow-hidden border border-gray-100 flex-1
                    ${showZobristTable
                    ? 'h-full p-6'
                    : 'max-h-0 p-0 border-0'
                }
                `}>
                <h3 className="text-lg font-medium mb-3 text-gray-700">
                    Zobrist Values
                </h3>
                <div
                    className="
                            w-[500px] h-auto aspect-square border border-gray-200
                            shadow-xs grid grid-cols-8 grid-rows-8
                    ">
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

            <div className={`
                    bg-white rounded-xl shadow-md transition-all duration-300 
                    overflow-hidden border border-gray-100 flex-1
                    ${showHashTable
                    ? 'max-h-[500px] p-6 opacity-100'
                    : 'max-h-0 p-0 border-0'
                }
                `}>
                <h3 className="text-lg font-medium mb-3 text-gray-700">Move History</h3>
                <HashTable
                    type='chess'
                    currentHash={currentHash}
                    moves={moveHistory}
                />
            </div>

        </main>
    )
};

export default ChessBoard;