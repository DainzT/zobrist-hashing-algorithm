'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

interface HeaderProps {
    title: string;
    body?: string;
    className?: string;
}

const Header = ({
    title,
    body,
    className = "",
}: HeaderProps) => {
    const pathname = usePathname()
    const isChessPage = pathname?.includes('/chess')

    return (
        <header className={`bg-gradient-to-br from-[#5d8a66] to-[#3a5d4a] text-white shadow-md ${className}`}>
            
            {isChessPage && (
                <div className="bg-[#3a5d4a] px-6 py-3 border-b border-[#4a6b57]">
                    <Link 
                        href="/" 
                        className="flex items-center gap-2 text-[#e8e3d9] hover:text-white transition-colors"
                    >
                        <ChevronLeft size={20} />
                        <span className="font-medium">Back to Zobrist Explanation</span>
                    </Link>
                </div>
            )}

            <div className="p-6">
                <div className="max-w-7xl mx-auto flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif">
                                {title}
                            </h1>
                            {body && (
                                <p className="text-[#e8e3d9] text-sm md:text-base max-w-3xl leading-relaxed mt-2">
                                    {body}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;