"use client";
import React from 'react';

const StatCard = ({ title, value, subtext, percentage, color }) => (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
            {subtext}
        </p>
        <div className={`h-1 w-full mt-4 rounded-full bg-muted overflow-hidden`}>
            <div className={`h-full ${color}`} style={{ width: percentage }}></div> 
            {/* Width hardcoded for demo, normally calculated */}
        </div>
    </div>
);

const StatsOverview = ({ jobs, goal = 50 }) => {
    // Count jobs where isApplied is 'Done'
    const totalApplied = jobs.filter(j => j.isApplied === 'Done').length;
    const interviewCount = jobs.filter(j => j.response === 'Interview').length;
    const offerCount = jobs.filter(j => j.response === 'Offer').length;
    
    // Calculate Rates
    const interviewRate = totalApplied > 0 ? Math.round((interviewCount / totalApplied) * 100) : 0;
    const offerRate = totalApplied > 0 ? Math.round((offerCount / totalApplied) * 100) : 0;
    const goalPercentage = Math.min(Math.round((totalApplied / goal) * 100), 100);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard 
                title="Total Applied" 
                value={totalApplied} 
                subtext={`Goal: ${goal} applications`}
                percentage={`${goalPercentage}%`}
                color="bg-primary"
            />
            <StatCard 
                title="Interview Rate" 
                value={`${interviewRate}%`} 
                subtext={`${interviewCount} interviews secured`}
                percentage={`${interviewRate}%`}
                color="bg-purple-500"
            />
            <StatCard 
                title="Offers" 
                value={offerCount} 
                subtext="Jobs landed!"
                percentage={`${offerRate}%`}
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
