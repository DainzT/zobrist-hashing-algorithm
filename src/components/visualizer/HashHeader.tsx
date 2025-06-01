'use client'

interface HashTableHeaderProps {
    columns: string[];
    sortable?: boolean;
    currentSort?: { column: string; direction: 'asc' | 'desc' };
    onSort?: (column: string) => void;
}

export const HashTableHeader = ({ 
    columns, 
    sortable = false, 
    currentSort, 
    onSort 
}: HashTableHeaderProps) => {
    const handleClick = (column: string) => {
        if (sortable && onSort) {
            onSort(column);
        }
    };

    return (
        <thead className="sticky top-0 z-10">
            <tr className="bg-[#f0d9b5] border-b-2 border-[#b58863]">
                {columns.map((column, index) => (
                    <th
                        key={index}
                        onClick={() => handleClick(column)}
                        className={`
                            px-4 py-3 text-left text-xs 
                            font-semibold text-[#5d8a66] uppercase tracking-wider
                            transition-colors duration-200
                            ${sortable ? 'cursor-pointer hover:bg-[#e5cfa5]' : ''}
                            ${currentSort?.column === column ? 'bg-[#e5cfa5]' : ''}
                        `}
                    >
                        <div className="flex items-center">
                            {column}
                            {sortable && currentSort?.column === column && (
                                <span className="ml-1">
                                    {currentSort.direction === 'asc' ? '↑' : '↓'}
                                </span>
                            )}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
};