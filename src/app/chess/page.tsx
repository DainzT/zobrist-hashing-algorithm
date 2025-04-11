'use client'

import { BoardTile } from "@/components/chess/BoardTiles";
import { useState } from "react";

interface Board {
    board: (number | null)[][]
}

const ChessBoard = () => {
    const [board, setBoard] = useState<Board>({
        board: Array.from({ length: 8 }, () =>
            Array.from({ length: 8 }, () => 0)
        ),
    })

    return (
        <main className="flex items-center justify-center font-[Inter] min-h-screen w-screen bg-[#FFF]">
             <section
        className="w-[500px] h-[500px] border-[1px] border-[#000] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] grid grid-cols-8 grid-rows-8"
        role="grid"
        aria-label="Chess board"
      >
           {Array.from({ length: 8 }, (_, rowIndex) =>
          Array.from({ length: 8 }, (_, colIndex) => (
          
            <BoardTile
              key={`${rowIndex}-${colIndex}`}
              isDark={(rowIndex + colIndex) % 2 === 1}
            />
          ))
        ).flat()}
          </section>
        </main>
    )
};

export default ChessBoard;