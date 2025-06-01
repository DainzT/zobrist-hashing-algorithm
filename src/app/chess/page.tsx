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
import { ToggleButton } from "@/components/chess/buttons/ToggleButton";
import { TogglePanelButton } from "@/components/chess/buttons/TogglePanelButton";
import { RestartButton } from "@/components/chess/buttons/RestartButton";

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
        resetBoard,
    } = useChessGame();
    const [isActive, setIsActive] = useState<Position>();
    const [showBoardCoordinates, setShowBoardCoordinates] = useState<boolean>(false);
    const [showTileCoordinates, setShowTileCoordinates] = useState<boolean>(false);
    const [showZobristTable, setShowZobristTable] = useState<boolean>(false);
    const [showHashTable, setShowHashTable] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleLastActive = (row: number, col: number) => {
        setIsActive({ row, col })
    }

    const selectedPieceData = isActive ? board[isActive.row][isActive.col] : null;
    const zobristValues = selectedPieceData
        ? zobristTable[selectedPieceData.color][selectedPieceData.type]
        : null;

    return (
        <main
            className="
                flex flex-col items-center w-full gap-6 p-6
                bg-gradient-to-br from-[#f8f5f0] to-[#e8e3d9] min-h-screen
            ">
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
                <div className="bg-[#f0d9b5] p-6 rounded-xl shadow-lg border-2 border-[#b58863] flex-1">
                    <h2 className="text-xl font-medium mb-4 text-[#5d8a66] tracking-tight">Board Settings</h2>

                    <div className="flex flex-col gap-4">
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

                        <div className="flex items-center pt-2 border-t border-[#b58863]/30">
                            <RestartButton onClick={resetBoard} />
                        </div>
                    </div>
                </div>

                <div className="bg-[#f0d9b5] p-6 rounded-xl shadow-lg border-2 border-[#b58863] flex-1">
                    <h2 className="text-xl font-medium mb-4 text-[#5d8a66] tracking-tight">Visualization</h2>
                    <div className="flex flex-col lg:flex-row gap-3 w-full">
                        <div className="relative flex-[0.5]">
                            <TogglePanelButton
                                isOpen={showZobristTable}
                                onClick={() => setShowZobristTable(!showZobristTable)}
                                label="Zobrist Table"
                                className="w-full"
                            />
                            {showZobristTable && (
                                <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10 p-2 border border-[#b58863]">
                                    <div className="flex-col items-center justify-between">
                                        <span className="text-sm font-medium text-[#5d8a66] px-1 py-1">
                                            Table Settings
                                        </span>
                                        <div className="border-t border-[#b58863]/30 mb-2"></div>
                                        <ToggleButton
                                            action={isExpanded}
                                            setAction={setIsExpanded}
                                            toggleOffPrompt="Show Full Values"
                                            toggleOnPrompt="Hide Full Values"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <TogglePanelButton
                                isOpen={showHashTable}
                                onClick={() => setShowHashTable(!showHashTable)}
                                label="Hash Table"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={showZobristTable ? "flex-1 flex flex-col lg:flex-row justify-between gap-6 lg:gap-12" : ""}>
                <div className={`${showZobristTable ? "flex" : "flex flex-col items-center w-full"}`}>
                    <div className="bg-[#b58863] p-2 sm:p-3 rounded-xl shadow-xl border-2 border-[#5d8a66] font-mono">
                        <BoardCoordinates showBoardCoordinates={showBoardCoordinates}>
                            <section
                                className={`
                                relative w-full lg:w-[500px] h-auto aspect-square
                                shadow-inner  grid grid-cols-8 grid-rows-8
                                transition-all duration-300
                            `}>
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
                                        z-50 bg-black/50
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
                                        justify-center z-50 bg-black/50
                                ">
                                        <GameStatus gameStatus={gameStatus} />
                                    </div>
                                )}
                            </section>
                        </BoardCoordinates>
                    </div>
                </div>
                {showZobristTable && (
                    <div className={`
                    bg-[#f0d9b5] rounded-xl shadow-md transition-all duration-300 
                    overflow-hidden border border-[#5d8a66]
                    ${showZobristTable
                            ? 'opacity-100 h-full lg-[h-500px] p-3'
                            : 'p-0 border-0 opacity-0'
                        }
                `}>
                        <div
                            className="
                            w-full lg:w-[500px] h-auto aspect-square border border-[#b58863]
                            shadow-inner  grid grid-cols-8 grid-rows-8
                    ">
                            {zobristValues ? (
                                Array(8).fill(0).map((_, rowIndex) => (
                                    Array(8).fill(0).map((_, colIndex) => (
                                        <ZobristTile
                                            isExpanded={isExpanded}
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
                )}
            </div>
            <div className={`
                    bg-[#f0d9b5] rounded-xl shadow-lg transition-all duration-300 
                    overflow-auto border-2 border-[#5d8a66] w-full max-w-6xl
                    ${showHashTable
                    ? 'max-h-[500px] p-6 opacity-100'
                    : 'max-h-0 p-0 border-0'
                }
                `}>
                <h3 className="text-lg font-medium mb-3 text-[#5d8a66]">Move History</h3>
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