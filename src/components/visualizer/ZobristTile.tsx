'use client'

interface ZobristTileProp {
    value: bigint | null;
    isHighlighted?: boolean;
}

export const ZobristTile = ({
    value,
    isHighlighted
}: ZobristTileProp) => {
    return (
        <div
            className={`flex items-center justify-center border text-xs ${isHighlighted ? 'bg-[#ecf77b]' : ''
                }`}
        >
            {value !== null ? value.toString().slice(0, 6) : ''}
        </div>
    )
};