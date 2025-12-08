"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const FilterSidebar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== 'All') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/applications?${params.toString()}`);
    };

    const getValue = (key) => searchParams.get(key) || 'All';

    return (
        <div className="w-full bg-card p-4 rounded-xl border border-border shadow-sm">
             <div className="flex flex-col xl:flex-row gap-4 justify-between items-center">
                
                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                    
                    {/* Header/Clear */}
                    <div className="flex items-center gap-2 mr-2 min-w-fit">
                         <span className="font-semibold text-sm text-foreground/80">Filters</span>
                         <div className="h-4 w-[1px] bg-border mx-1"></div>
                        {(searchParams.toString().length > 0) && (
                            <button 
                                onClick={() => router.push('/applications')}
                                className="text-xs text-red-500 hover:text-red-400 font-medium transition-colors cursor-pointer"
                            >
                                Reset
                            </button>
                        )}
                    </div>

                    {/* Response Status */}
                    <div className="relative">
                        <select 
                            value={getValue('response')}
                            onChange={(e) => updateFilter('response', e.target.value)}
                            className="h-9 w-36 rounded-md border border-input bg-background/50 px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-shadow hover:bg-accent/50 cursor-pointer"
                        >
                            <option value="All">Status: All</option>
                            <option value="Pending">Pending</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    {/* Priority */}
                     <div className="relative">
                        <select 
                            value={getValue('priority')}
                            onChange={(e) => updateFilter('priority', e.target.value)}
                            className="h-9 w-32 rounded-md border border-input bg-background/50 px-3 pr-8 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-shadow hover:bg-accent/50 cursor-pointer"
                        >
                            <option value="All">Priority: All</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                     {/* Application Method */}
                     <div className="relative">
                        <select 
                            value={getValue('applicationMethod')}
                            onChange={(e) => updateFilter('applicationMethod', e.target.value)}
                            className="h-9 w-40 rounded-md border border-input bg-background/50 px-3 pr-8 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-shadow hover:bg-accent/50 cursor-pointer"
                        >
                            <option value="All">Method: All</option>
                            <option value="Easy Apply">Easy Apply</option>
                            <option value="Website">Website</option>
                            <option value="Email">Email</option>
                            <option value="Recruiter">Recruiter</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Referral">Referral</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                 {/* Tracking Toggles (Horizontal Pills) */}
                 <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto mt-4 xl:mt-0 xl:justify-end">
                    {[
                        { key: 'isApplied', label: 'Applied', val: 'Done' },
                        { key: 'isCalled', label: 'Called', val: 'Yes' },
                        { key: 'isMailed', label: 'Mailed', val: 'Done' },
                    ].map((toggle) => (
                        <button
                            key={toggle.key}
                            onClick={() => updateFilter(toggle.key, getValue(toggle.key) === toggle.val ? 'All' : toggle.val)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all shadow-sm cursor-pointer ${
                                getValue(toggle.key) === toggle.val
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-background border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            }`}
                        >
                            {toggle.label}
                        </button>
                    ))}
                 </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
