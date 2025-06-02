'use client'
import { ChevronDown, ChevronUp } from "lucide-react";

interface TogglePanelButtonProps {
    isOpen: boolean;
    onClick: () => void;
    label: string;
    className?: string;
}

export const TogglePanelButton = ({
    isOpen,
    onClick,
    label,
    className = "",
}: TogglePanelButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center justify-between px-4 py-2.5
                bg-[#f0d9b5] hover:bg-[#e5cfa5] 
                border-2 border-[#5d8a66]
                rounded-lg shadow-sm hover:shadow-md
                transition-all duration-200
                cursor-pointer
                ${className}
            `}
        >
            <span className="text-[#5d8a66] font-medium tracking-wide">
                {label}
            </span>
            {isOpen ? (
                <ChevronUp 
                    size={20} 
                    className="text-[#5d8a66]"
                    strokeWidth={2.3}
                />
            ) : (
                <ChevronDown 
                    size={20} 
                    className="text-[#5d8a66]"
                    strokeWidth={2.3}
                />
            )}
        </button>
    );
};