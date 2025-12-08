"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const FilterBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentStatus = searchParams.get('status') || 'All';

    const statuses = ['All', 'Applied', 'Called', 'Email', 'Phone', 'Interview', 'Offer', 'Rejected'];

    const handleFilter = (status) => {
        const params = new URLSearchParams(searchParams);
        if (status === 'All') {
            params.delete('status');
        } else {
            params.set('status', status);
        }
        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
             {statuses.map(status => (
                <button
                    key={status}
                    onClick={() => handleFilter(status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                        ${currentStatus === status 
                            ? 'bg-primary text-primary-foreground shadow-md scale-105' 
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105'
                        }`}
                >
                    {status}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
