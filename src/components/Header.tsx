'use client'

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
    return (
        <header className={`bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 shadow-lg ${className}`}>
            <div className="max-w-7xl mx-auto flex flex-col gap-1">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {title}
                </h1>
                {body && (
                    <p className="text-gray-300 text-sm md:text-base max-w-3xl leading-snug">
                        {body}
                    </p>
                )}
            </div>
        </header>
    );
};

export default Header;