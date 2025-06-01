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
        <header className={`bg-gradient-to-br from-[#5d8a66] to-[#3a5d4a] text-white p-6 shadow-md ${className}`}>
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
        </header>
    );
};

export default Header;