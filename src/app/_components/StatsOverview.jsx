"use client";
import React from 'react';

const StatCard = ({ title, value, subtext, color }) => (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
            {subtext}
        </p>
        <div className={`h-1 w-full mt-4 rounded-full bg-muted overflow-hidden`}>
            <div className={`h-full ${color}`} style={{ width: '70%' }}></div> 
            {/* Width hardcoded for demo, normally calculated */}
        </div>
    </div>
);

const StatsOverview = ({ jobs }) => {
    // Count jobs where isApplied is 'Done' (or maybe 'Done' and 'In Progress'? User said "Total Applied", usually means finished applications)
    // Let's stick to 'Done' to be precise, or maybe user considers 'In Progress' as "working on it". 
    // "Total Applied" strongly implies sent.
    const totalApplied = jobs.filter(j => j.isApplied === 'Done').length;
    const interviewCount = jobs.filter(j => j.response === 'Interview').length;
    const offerCount = jobs.filter(j => j.response === 'Offer').length;
    
    const interviewRate = totalApplied > 0 ? Math.round((interviewCount / totalApplied) * 100) : 0;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard 
                title="Total Applied" 
                value={totalApplied} 
                subtext="Applications sent"
                color="bg-blue-500"
            />
            <StatCard 
                title="Interview Rate" 
                value={`${interviewRate}%`} 
                subtext={`${interviewCount} interviews secured`}
                color="bg-purple-500"
            />
            <StatCard 
                title="Offers" 
                value={offerCount} 
                subtext="Jobs landed!"
                color="bg-emerald-500"
            />
             {/* Placeholder for future stat */}
             <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-purple-600/5 p-6 shadow-sm flex items-center justify-center border-dashed">
                <p className="text-sm text-muted-foreground">More insights coming soon...</p>
            </div>
        </div>
    );
};

export default StatsOverview;
