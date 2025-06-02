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
import { HashTag } from "@/components/visualizer/HashTag";
import { TurnDisplay } from "@/components/chess/TurnDisplay";

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
        gameMode,
        toggleGameMode,
        currentTurn,
        review,
        setReview
    } = useChessGame();
    const [isActive, setIsActive] = useState<Position>();
    const [showBoardCoordinates, setShowBoardCoordinates] = useState<boolean>(false);
    const [showTileCoordinates, setShowTileCoordinates] = useState<boolean>(false);
    const [showZobristTable, setShowZobristTable] = useState<boolean>(false);
    const [showHashTable, setShowHashTable] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isTransparent, setIsTransparent] = useState<boolean>(false);
    const [isLeft, setIsLeft] = useState<boolean>(false);

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
            ">
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
                <div className="bg-[#f0d9b5] p-6 rounded-xl shadow-lg border-2 border-[#b58863] flex-1 ">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-medium text-[#5d8a66] tracking-tight">Board Settings</h2>
                        <div className="flex items-center gap-2 bg-[#5d8a66]/20 px-3 py-1 rounded-full border border-[#5d8a66]/30">
                            <span className="text-base font-medium text-[#5d8a66]">Mode:</span>
                            <span className="text-sm font-semibold text-[#4a6b57] capitalize">
                                {gameMode === 'turn-based' ? 'Turn-Based' : 'Free Move'}
                            </span>
                        </div>
                    </div>
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

                        <div className="flex items-center pt-2 border-t border-[#b58863]/30 gap-29">
                            <RestartButton onClick={resetBoard} />
                            <ToggleButton
                                action={gameMode === 'turn-based'}
                                setAction={toggleGameMode}
                                toggleOffPrompt="Switch to Turn-Based Mode"
                                toggleOnPrompt="Switch to Free Move Mode"
                            />
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
                                            Zobrist Settings
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
                        <div className="relative flex-[0.5]">
                            <TogglePanelButton
                                isOpen={showHashTable}
                                onClick={() => setShowHashTable(!showHashTable)}
                                label="Hash Table"
                                className="w-full"
                            />
                            {showHashTable && (
                                <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10 p-2 border border-[#b58863]">
                                    <div className="flex-col items-center justify-between">
                                        <span className="text-sm font-medium text-[#5d8a66] px-1 py-1">
                                            Hash Settings
                                        </span>
                                        <div className="border-t border-[#b58863]/30 mb-2"></div>
                                        {(showHashTable && showZobristTable) ? (
                                            <>
                                                <ToggleButton
                                                    action={isTransparent}
                                                    setAction={setIsTransparent}
                                                    toggleOffPrompt="On Transparency"
                                                    toggleOnPrompt="Off Transparency"
                                                    className="w-full"
                                                />

                                                <ToggleButton
                                                    action={isLeft}
                                                    setAction={setIsLeft}
                                                    toggleOffPrompt="Switch Left"
                                                    toggleOnPrompt="Switch Right"
                                                    className="w-full"
                                                />
                                            </>
                                        ) : (
                                            <span className="ml-3 text-sm font-medium text-[#c1574d]">
                                                None to show for this view
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {gameMode === 'turn-based' && (
                <TurnDisplay
                    currentTurn={currentTurn}
                />
            )}
            <div className={`
                ${showZobristTable ? "flex-1 flex flex-col lg:flex-row justify-between gap-6 lg:gap-15" : ""}
                ${showHashTable && !showZobristTable ? "flex-1 flex flex-col lg:flex-row justify-between gap-6 lg:gap-12" : ""}`
            }>
                <div className={`${showZobristTable ? "flex" : "flex flex-col items-center w-full"}`}>
                    <div className="bg-[#b58863] p-2 sm:p-3 rounded-xl shadow-xl  font-mono z-50">
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

                                {(gameStatus === 'draw' || gameStatus === 'checkmate') && (
                                    <div
                                        className="
                                            absolute inset-0 flex items-center
                                            justify-center z-50
                                        ">
                                        <GameStatus
                                            gameStatus={gameStatus}
                                            onNewGame={resetBoard}
                                            winner={currentTurn === "black" ? 'white' : 'black'}
                                            onReview={() => setReview(true)}
                                            reviewing={review}
                                        />
                                    </div>
                                )}
                            </section>
                        </BoardCoordinates>
                    </div>
                </div>
                {showZobristTable && (
                    <div className={`
                    bg-[#b58863] rounded-xl shadow-md transition-all duration-300 
                    overflow-hidden
                    ${showZobristTable
                            ? 'opacity-100 h-full lg-[h-500px] p-3'
                            : 'p-0 border-0 opacity-0'
                        }
                `}>
                        <div
                            className="
                            w-full lg:w-[500px] h-auto aspect-square border border-[#b58863]
                            shadow-inner  grid grid-cols-8 grid-rows-8 bg-[#f0d9b5]
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
                {(showHashTable && !showZobristTable) && (
                    <div
                        className="
                            h-auto p-3
                        "
                    >
                        <div className="w-[500px]">
                            <HashTag
                                currentHash={currentHash}
                            />
                            <HashTable
                                type='chess'
                                moves={moveHistory}
                            />
                        </div>
                    </div>
                )}
            </div>
            {(showHashTable && showZobristTable) && (
                <div
                    className={`
                        ${isTransparent ? "opacity-20" : "z-50"}
                        absolute h-auto p-4  bg-white border-2 border-[#b58863] rounded-md 
                        top-1/2 transform -translate-y-1/2 scale-98
                        shadow-lg transition-all duration-300
                        ${isLeft ? "left-1 mt-27" : "right-1 mt-33 "}
                    `}
                >
                    <div className="w-[500px] h-[500px] rounded-md ">
                        <HashTag
                            currentHash={currentHash}
                        />
                        <HashTable
                            type='chess'
                            moves={moveHistory}
                        />
                    </div>
                </div>
            )}

        </main>
    )
};

export default ChessBoard;