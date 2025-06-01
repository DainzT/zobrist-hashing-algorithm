'use client'
import { RotateCcw } from "lucide-react";
import { useState } from "react";

interface RestartButtonProps {
    onClick: () => void;
    className?: string;
}

export const RestartButton = ({
    onClick,
    className = ""
}: RestartButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200
                bg-[#5d8a66] border-2 border-[#4a6b57] hover:bg-[#4a6b57]
                shadow-md hover:shadow-lg cursor-pointer
                text-[#f0d9b5] hover:text-white
                ${isActive ? 'transform scale-95 bg-[#3a5543]' : ''}
                ${className}
            `}
            aria-label="Restart board"
        >
            <RotateCcw 
                size={18} 
                className={`transition-transform duration-300 ${isHovered ? 'rotate-[360deg]' : ''}`}
                strokeWidth={2.5}
            />
            <span className="font-medium text-sm tracking-wide">Restart</span>
        </button>
    );
};