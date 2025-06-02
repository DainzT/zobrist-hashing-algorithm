import { gameStatus } from "@/types/chess";

interface TurnDisplayProps {
    currentTurn: 'white' | 'black';
    gameStatus: gameStatus;
    winner?: 'white' | 'black' | null;
}

export const TurnDisplay = ({
    currentTurn,
    gameStatus,
    winner
}: TurnDisplayProps) => {
    const isWhiteTurn = currentTurn === 'white';
    const isGameOver = gameStatus === 'checkmate' || gameStatus === 'draw';

    let displayText = '';
    let displayColor = isWhiteTurn ? 'white' : 'black';

    if (isGameOver) {
        if (gameStatus === 'checkmate') {
            displayText = winner === 'white' ? "WHITE WINS!" : "BLACK WINS!";
            displayColor = winner || displayColor;
        } else {
            displayText = "DRAW!";
        }
    } else {
        displayText = isWhiteTurn ? "WHITE'S TURN" : "BLACK'S TURN";
    }

    const isDisplayWhite = displayColor === 'white';

    return (
        <div className={`
            mt-4 px-6 py-3 rounded-lg border-2
            ${isDisplayWhite 
                ? 'border-[#f0d9b5] bg-[#f0d9b5]/20 text-[#5d8a66]' 
                : 'border-[#5d8a66] bg-[#5d8a66]/20 text-[#3a5543]'
            }
            shadow-md transition-all duration-300
        `}>
            <div className="flex items-center justify-center gap-3">
                <div className={`
                    w-6 h-6 rounded-full border-2
                    ${isDisplayWhite 
                        ? 'bg-[#f0d9b5] border-[#5d8a66]' 
                        : 'bg-[#5d8a66] border-[#3a5543]'
                    }
                `}></div>
                <span className="text-xl font-bold tracking-wide">
                    {displayText}
                </span>
                <div className={`
                    w-6 h-6 rounded-full border-2
                    ${isDisplayWhite 
                        ? 'bg-[#f0d9b5] border-[#5d8a66]' 
                        : 'bg-[#5d8a66] border-[#3a5543]'
                    }
                `}></div>
            </div>
        </div>
    );
}