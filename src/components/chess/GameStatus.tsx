'use client'
import { gameStatus } from "@/types/chess";

interface GameStatusProps {
    gameStatus: gameStatus;
    winner?: 'white' | 'black';
    onNewGame?: () => void;
    onReview?: () => void;
    reviewing: boolean
}

export const GameStatus = ({
    gameStatus,
    winner,
    onNewGame,
    onReview,
    reviewing,
}: GameStatusProps) => {
    if (!gameStatus) return null;
    const isCheckmate = gameStatus === "checkmate";
    const isDraw = gameStatus === "draw";

    return (
        <div className={`${reviewing ? "backdrop-blur-none" : "backdrop-blur-sm"} fixed inset-0 bg-black/50 flex items-center justify-center z-50  transition-opacity duration-300`}>
            {reviewing && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#5d8a66]/30 text-[#f0d9b5] px-4 py-2 rounded-full shadow-lg flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="font-medium">Review Mode</span>
                </div>
            )}

            <div className={`
                relative bg-[#f0d9b5] p-8 rounded-xl border-2 
                ${isCheckmate ? 'border-[#5d8a66]' : 'border-[#b58863]'}
                shadow-2xl max-w-md w-full mx-4
                ${reviewing ? "opacity-0" : ""}
                transition-transform duration-300
            `}>
                {isCheckmate ? (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-[#5d8a66] mb-2 font-serif">
                            Checkmate!
                        </h2>
                        <p className="text-xl text-[#3a5543] mb-6">
                            {winner === 'white' ? 'White' : 'Black'} wins!
                        </p>
                        <div className="text-6xl mb-6">
                            {winner === 'white' ? '♔' : '♚'}
                        </div>
                    </div>
                ) : isDraw ? (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-[#b58863] mb-2 font-serif">
                            Game Drawn
                        </h2>
                        <p className="text-lg text-[#5d8a66] mb-6">
                            No legal moves remain
                        </p>
                        <div className="text-6xl mb-6">
                            🤝
                        </div>
                    </div>
                ) : null}

                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={onNewGame}
                        className={`px-6 py-2 rounded-lg cursor-pointer transition-colors font-medium shadow-md
                        ${reviewing 
                            ? "bg-gray-400 text-gray-200" 
                            : "bg-[#5d8a66] text-[#f0d9b5] hover:bg-[#4a6b57]"
                        }`}
                        disabled={reviewing}
                    >
                        New Game
                    </button>
                    <button
                        onClick={onReview}
                        className={`px-6 py-2 rounded-lg cursor-pointer transition-colors font-medium shadow-md
                        ${reviewing 
                            ? "bg-[#5d8a66] text-[#f0d9b5]" 
                            : "bg-[#b58863] text-[#f0d9b5] hover:bg-[#9c6f52]"
                        }`}
                    >
                        {reviewing ? "Exit Review" : "Review"}
                    </button>
                </div>
            </div>
        </div>
    );
};