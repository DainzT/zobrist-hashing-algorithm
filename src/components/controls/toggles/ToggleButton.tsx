'use client'
import { Dispatch, SetStateAction } from 'react';

interface ToggleButtonProps {
    action: boolean;
    setAction: Dispatch<SetStateAction<boolean>>;
    toggleOffPrompt: string;
    toggleOnPrompt: string;
    className?: string;
}

export const ToggleButton = ({
    action,
    setAction,
    toggleOffPrompt,
    toggleOnPrompt,
    className = ""
}: ToggleButtonProps) => {
    return (
        <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
            <input
                type="checkbox"
                className="sr-only peer"
                checked={action}
                onChange={() => setAction(!action)}
            />
            <div className="
                w-11 h-6 bg-[#b58863] 
                peer-focus:outline-none 
                rounded-full peer 
                peer-checked:after:translate-x-full 
                peer-checked:after:border-[#f0d9b5] 
                after:content-[''] 
                after:absolute 
                after:top-[2px] 
                after:left-[2px] 
                after:bg-[#f0d9b5] 
                after:border-[#b58863] 
                after:border 
                after:rounded-full 
                after:h-5 
                after:w-5 
                after:transition-all 
                peer-checked:bg-[#5d8a66]
                peer-checked:border-[#5d8a66]
                border border-[#b58863]
            "></div>
            <span className="ml-3 text-sm font-medium text-[#5d8a66]">
                {action ? toggleOnPrompt : toggleOffPrompt}
            </span>
        </label>
    );
};