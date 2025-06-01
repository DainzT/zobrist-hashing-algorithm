'use Client'
interface BoardCoordinatesProps {
    children?: React.ReactNode;
    showBoardCoordinates?: boolean;
}

export const BoardCoordinates = ({
    children,
    showBoardCoordinates = false,
}: BoardCoordinatesProps) => {
    return (
        <div className="relative">
            {showBoardCoordinates && (
                <div className="absolute -left-3 flex flex-col items-center justify-between h-full lg:h-[500px] py-3 px-1 text-[#f0d9b5]">
                    {[8, 7, 6, 5, 4, 3, 2, 1].map((num) => (
                        <div
                            key={num}
                            className="h-[62.5px] flex items-center justify-end pr-1 font-medium"
                        >
                            <span className="
                                bg-[#5d8a66]/30 px-1 rounded-sm
                                border border-[#b58863]/50
                            ">
                                {num}
                            </span>
                        </div>
                    ))}
                </div>
            )}
            <div className={`
                row-span-1 transition-all duration-500 ease-out
                ${showBoardCoordinates ? 'scale-[0.95]' : 'scale-100'}
            `}>
                {children}
            </div>
            {showBoardCoordinates && (
                <div className={`absolute -bottom-3 flex justify-between items-center w-full lg:w-[500px] px-3 text-[#e6d2b1]`}>
                    {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((letter) => (
                        <div
                            key={letter}
                            className="w-[62.5px] text-center font-medium"
                        >
                            <span className="
                                bg-[#5d8a66]/30 px-1 rounded-sm
                                border border-[#b58863]/50
                            ">
                                {letter}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};