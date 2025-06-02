'use client'
import Link from 'next/link'

export default function ZobristHashingPage() {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto p-8  bg-white rounded-xl shadow-lg border-2 border-[#b58863] ">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-[#5d8a66] mb-2">Zobrist Hashing in Chess</h1>
                    <div className="h-1 w-20 bg-[#b58863] mb-4"></div>
                    <p className="text-gray-700">
                        Explore how Zobrist hashing enables efficient board state representation in chess engines
                    </p>
                </header>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#5d8a66] mb-3">Introduction</h2>
                    <div className="space-y-4 text-gray-700">
                        <p>
                            Zobrist hashing is a technique used in computer chess programs to uniquely identify board positions.
                            Developed by Albert Zobrist in 1970, it provides an efficient way to implement transposition tables
                            and detect repeated positions.
                        </p>
                        <p>
                            Unlike traditional hashing methods, Zobrist hashing allows incremental updates - when a move is made,
                            the hash can be updated by XOR operations rather than being recomputed from scratch.
                        </p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#5d8a66] mb-3">How It Works</h2>
                    <div className="space-y-4 text-gray-700">
                        <p>
                            The system works by assigning a unique random number to each possible chess piece at each possible
                            board position. The hash of a position is computed by XOR-ing together the numbers for all pieces
                            currently on the board.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Each piece-square combination gets a unique 64-bit number</li>
                            <li>Empty squares don't contribute to the hash</li>
                            <li>Moving a piece requires just two XOR operations</li>
                            <li>Castling rights and en passant are also encoded</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#5d8a66] mb-3">Visualization</h2>
                    <div className="bg-[#f0d9b5]/30 p-6 rounded-lg border border-[#b58863]/50">
                        <p className="mb-4 text-gray-700">
                            The interactive chess board that I made demonstrates Zobrist hashing in action. Each move updates the board's
                            hash value incrementally, showing how the technique works in real-time.
                        </p>
                        <Link
                            href="/chess"
                            className="inline-flex items-center px-6 py-3 bg-[#5d8a66] text-[#f0d9b5] rounded-lg 
                        hover:bg-[#4a6b57] transition-colors duration-200 font-medium shadow-md"
                        >
                            Open Chess Visualizer
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#5d8a66] mb-3">Benefits</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#f0d9b5]/20 p-4 rounded-lg border border-[#b58863]/30">
                            <h3 className="font-medium text-[#5d8a66] mb-2">Efficiency</h3>
                            <p className="text-gray-700 text-sm">
                                Incremental updates make hash computation O(1) per move instead of O(n) for the whole board.
                            </p>
                        </div>
                        <div className="bg-[#f0d9b5]/20 p-4 rounded-lg border border-[#b58863]/30">
                            <h3 className="font-medium text-[#5d8a66] mb-2">Uniqueness</h3>
                            <p className="text-gray-700 text-sm">
                                64-bit hashes provide excellent collision resistance for chess positions.
                            </p>
                        </div>
                        <div className="bg-[#f0d9b5]/20 p-4 rounded-lg border border-[#b58863]/30">
                            <h3 className="font-medium text-[#5d8a66] mb-2">Versatility</h3>
                            <p className="text-gray-700 text-sm">
                                The same technique works for many board games beyond chess.
                            </p>
                        </div>
                        <div className="bg-[#f0d9b5]/20 p-4 rounded-lg border border-[#b58863]/30">
                            <h3 className="font-medium text-[#5d8a66] mb-2">Transposition Tables</h3>
                            <p className="text-gray-700 text-sm">
                                Enables efficient storage and retrieval of previously evaluated positions.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}