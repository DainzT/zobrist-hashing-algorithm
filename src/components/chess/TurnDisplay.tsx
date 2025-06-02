interface TurnDisplayProps {
    currentTurn: string
}

export const TurnDisplay = ({
    currentTurn
}: TurnDisplayProps) => {
    const isWhiteTurn = currentTurn === 'white';

    return (
        <div className={`
            mt-4 px-6 py-3 rounded-lg border-2
            ${isWhiteTurn 
                ? 'border-[#f0d9b5] bg-[#f0d9b5]/20 text-[#5d8a66]' 
                : 'border-[#5d8a66] bg-[#5d8a66]/20 text-[#3a5543]'
            }
            shadow-md transition-all duration-300
        `}>
            <div className="flex items-center justify-center gap-3">
                <div className={`
                    w-6 h-6 rounded-full border-2
                    ${isWhiteTurn 
                        ? 'bg-[#f0d9b5] border-[#5d8a66]' 
                        : 'bg-[#5d8a66] border-[#3a5543]'
                    }
                `}></div>
                <span className="text-xl font-bold tracking-wide">
                    {isWhiteTurn ? "WHITE'S TURN" : "BLACK'S TURN"}
                </span>
                <div className={`
                    w-6 h-6 rounded-full border-2
                    ${isWhiteTurn 
                        ? 'bg-[#f0d9b5] border-[#5d8a66]' 
                        : 'bg-[#5d8a66] border-[#3a5543]'
                    }
                `}></div>
            </div>
        </div>
    );
}

