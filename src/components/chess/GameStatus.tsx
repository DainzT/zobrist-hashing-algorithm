'use client'
import { gameStatus } from "@/types/chess";

interface GameStatusProps {
    gameStatus: gameStatus;
    onNewGame?: () => void
    onClose?: () => void
}

export const GameStatus = ({
    gameStatus,
}: GameStatusProps) => {
    const isDraw = gameStatus === "draw";

    if (!isDraw) return null;

    return (
        <div className="flex items-center justify-center z-50 ">
            <div className="bg-white/90 p-8 rounded-lg shadow-lg w-50 h-43">
                <div className="
                    absolute inset-0 rounded-lg transform translate-y-3 
                    bg-black/20 blur-lg -z-10" 
                />
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center font-sans">Draw</h2>
                <div className="flex justify-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                        🤝
                    </h2>
                </div>
            </div>
        </div>
    )
}
