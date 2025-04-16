'use client'

export const HashTable = () => {
    return (
        <main className="font-[Inter] gap-10 p-8">
            {/* Chess Board (left) */}
            <div className="flex flex-col items-center">
                {/* Your existing chess board */}
            </div>

            {/* Zobrist Visualization (middle) */}
            <div className="flex flex-col items-center">
                {/* Your existing Zobrist grid */}
            </div>

            {/* Hash Information Panel (right) */}
            <div className="flex flex-col gap-6 w-80">
                <div className="sticky top-4 space-y-6">
                    {/* Enhanced Hash Display */}
                    <div className="bg-gray-100 p-4 rounded-lg">
                        {/* ... hash display code from above ... */}
                    </div>

                    {/* Hash Breakdown */}
                    <div className="p-4 bg-blue-50 rounded-lg">
                        {/* ... hash composition code ... */}
                    </div>

                    {/* Move History */}
                    <div className="max-h-60 overflow-y-auto">
                        {/* ... move history code ... */}
                    </div>

                    {/* Position Comparison */}
                    <div className="p-4 bg-green-50 rounded-lg">
                        {/* ... comparison code ... */}
                    </div>
                </div>
            </div>
        </main>
    );
}