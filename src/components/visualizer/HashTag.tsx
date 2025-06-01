'use client'
interface HashTagProps {
    currentHash: bigint;
}

export const HashTag = ({
    currentHash,
}: HashTagProps) => {
    return (
        <div className="bg-[#f0d9b5]  p-4 mb-6 border-2 border-[#5d8a66] shadow-md w-[500px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-[#5d8a66] shadow-sm">
                    <h3 className="text-sm font-medium text-[#5d8a66] mb-1">Initial Hash</h3>
                    <p className="font-mono text-sm font-semibold text-[#b58863]">0n</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-[#5d8a66] shadow-sm">
                    <h3 className="text-sm font-medium text-[#5d8a66] mb-1">Current Hash</h3>
                    <p className="font-mono text-sm font-semibold text-[#5d8a66]">{currentHash.toString()}n</p>
                </div>
            </div>
        </div>

    )
}