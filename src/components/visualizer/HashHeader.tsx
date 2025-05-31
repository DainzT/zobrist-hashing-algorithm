'use client'

interface HashTableHeaderProps {
    columns: string[];
}

export const HashTableHeader = ({ columns }: HashTableHeaderProps) => {
    return (
        <thead className="bg-gray-50">
            <tr>
                {columns.map((column, index) => (
                    <th
                        key={index}
                        className="
                            px-4 py-3 text-left text-xs 
                            font-medium text-gray-500 uppercase tracking-wider
                        "
                    >
                        {column}
                    </th>
                ))}
            </tr>
        </thead>
    );
};