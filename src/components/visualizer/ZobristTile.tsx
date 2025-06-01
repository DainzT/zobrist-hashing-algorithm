'use client'

interface ZobristTileProps {
    value: bigint | null;
    isHighlighted?: boolean;
    isExpanded?: boolean;
}

export const ZobristTile = ({
    value,
    isHighlighted = false,
    isExpanded = false
}: ZobristTileProps) => {
    return (
        <button
            className={`
                flex items-center justify-center 
                border border-[#b58863]/30
                text-xs font-mono
                transition-all duration-200
                ${value !== null ?
                    `text-[#5d8a66] bg-[#f0d9b5]/70 hover:bg-[#e5cfa5]` :
                    'bg-[#f8f5f0]'
                }
                ${isHighlighted ?
                    '!bg-[#ebff0b] !text-[#5d8a66] shadow-[0_0_8px_2px_rgba(236,247,123,0.6)]' :
                    ''
                }
                p-2 overflow-hidden
                relative
            `}
            disabled={!value}
        >
            {value !== null ? (
                <div className="flex flex-col items-center">
                    <span className={`truncate ${isExpanded ? 'hidden' : 'block'}`}>
                        {value.toString().slice(0, 6)}..
                    </span>
                </div>
            ) : null}

            {isExpanded && (
                <div
                    className={`
                            absolute inset-0 z-10 flex items-center justify-center p-1
                            ${value !== null ?
                            `text-[#5d8a66] bg-[#f0d9b5]/70 hover:bg-[#e5cfa5]` :
                            'bg-[#f8f5f0]'}
                            ${isHighlighted ?
                            '!bg-[#ebff0b] !text-[#5d8a66] shadow-[0_0_8px_2px_rgba(236,247,123,0.6)]' :
                            ''
                        }
                    `}
                >
                    <span className="text-xs break-all text-center">
                        {value?.toString()}n
                    </span>
                </div>
            )}
        </button>
    )
}