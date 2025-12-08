"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const Badge = ({ children, variant }) => {
    const variants = {
        Done: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20",
        Yes: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20",
        "Not Started": "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
        Not: "bg-red-500/15 text-red-500 border-red-500/20",
        Pending: "bg-amber-500/15 text-amber-500 border-amber-500/20",
        Rejected: "bg-red-500/15 text-red-500 border-red-500/20",
        High: "bg-red-500/15 text-red-500 border-red-500/20",
        Medium: "bg-amber-500/15 text-amber-500 border-amber-500/20",
        Low: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20",
        Interview: "bg-purple-500/15 text-purple-500 border-purple-500/20",
        Offer: "bg-blue-500/15 text-blue-500 border-blue-500/20"
    };

    const style = variants[children] || "bg-zinc-500/15 text-zinc-400 border-zinc-500/20";

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${style.replace('text-', 'bg-').replace('/15', '')}`}></span>
            {children}
        </span>
    );
};

const JobTable = ({ jobs }) => {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-3 font-medium text-muted-foreground">Company Name</th>
                        <th className="px-4 py-3 font-medium text-muted-foreground">Position</th>
                        <th className="px-4 py-3 font-medium text-muted-foreground">Applied Date</th>
                        <th className="px-4 py-3 font-medium text-muted-foreground">Is Applied</th>
                        <th className="px-4 py-3 font-medium text-muted-foreground">Is Called</th>
                        <th className="px-4 py-3 font-medium text-muted-foreground">Is Mailed</th>
                        <th className="px-4 py-3 font-medium text-muted-foreground">Response</th>
                        <th className="px-4 py-3 font-medium text-muted-foreground">Priority</th>
                        <th className="px-4 py-3 font-medium text-muted-foreground">Link</th>
                        <th className="px-4 py-3 font-medium text-muted-foreground"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {jobs.map((job) => (
                        <tr key={job._id} className="hover:bg-muted/50 transition-colors group">
                            <td className="px-4 py-3 font-semibold text-foreground">{job.company}</td>
                            <td className="px-4 py-3 text-foreground">{job.position}</td>
                            <td className="px-4 py-3 text-muted-foreground">
                                {new Date(job.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3"><Badge>{job.isApplied || 'Not Started'}</Badge></td>
                            <td className="px-4 py-3"><Badge>{job.isCalled || 'Not'}</Badge></td>
                            <td className="px-4 py-3"><Badge>{job.isMailed || 'Not'}</Badge></td>
                            <td className="px-4 py-3"><Badge>{job.response || 'Pending'}</Badge></td>
                            <td className="px-4 py-3"><Badge>{job.priority || 'Medium'}</Badge></td>
                            <td className="px-4 py-3">
                                {job.appliedLink && (
                                    <a href={job.appliedLink} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors truncate block max-w-[150px]">
                                        {job.appliedLink.replace(/^https?:\/\/(www\.)?/, '').substring(0, 20)}...
                                    </a>
                                )}
                            </td>
                            <td className="px-4 py-3 text-right">
                                <Link href={`/edit/${job._id}`} className="invisible group-hover:visible text-primary hover:text-primary/80 text-xs font-semibold">
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobTable;
