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
        <div className="grid grid-cols-[auto_1fr] grid-rows-[1fr_auto]">
            {showBoardCoordinates && (
                <div className="row-span-1 flex flex-col items-center justify-between h-[500px] px-3 text-gray-700">
                    {[8, 7, 6, 5, 4, 3, 2, 1].map((num) => (
                        <div key={num} className="h-[62.5px] flex items-center justify-end pr-1">
                            {num}
                        </div>
                    ))}
                </div>
            )}
            <div className={`row-span-1 ${!showBoardCoordinates ? 'col-span-2' : ''}`}>
                {children}
            </div>

            {showBoardCoordinates && <div className="h-[30px]"></div>}
            {showBoardCoordinates && (
                <div className="flex justify-between items-center w-[500px] py-2 text-gray-700">
                    {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((letter) => (
                        <div key={letter} className="w-[62.5px] text-center">
                            {letter}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};