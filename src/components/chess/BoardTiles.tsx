'use client'

interface BoardTileProps {
    isDark: boolean;
};

export const BoardTile = ({
    isDark,
}: BoardTileProps) => {
    return (
        <button
            className={`
                w-full h-full flex items-center justify-center
                ${isDark ? "bg-gray-400" : "bg-white"}
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-colors
            `}
        >
        </button>
    );
};