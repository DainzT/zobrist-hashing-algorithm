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
                    flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer
                    hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200 ${className}
            `}
        >
            <span className="text-gray-700 font-medium">{label}</span>
            {isOpen ? (
                <ChevronUp size={20} className="text-gray-500" />
            ) : (
                <ChevronDown size={20} className="text-gray-500" />
            )}
        </button>
    );
};