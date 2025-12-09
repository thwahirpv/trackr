"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaPhoneAlt, FaEnvelope, FaExternalLinkAlt, FaCheckCircle, FaRegCircle, FaCalendarAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const StatusBadge = ({ status }) => {
    const styles = {
        Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        Rejected: "bg-red-500/10 text-red-500 border-red-500/20",
        Interview: "bg-purple-500/10 text-purple-500 border-purple-500/20",
        Offer: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    };
    return (
        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${styles[status] || styles.Pending}`}>
            {status}
        </span>
    );
}

const JobCard = ({ job }) => {
    const router = useRouter();
    // Local state for optimistic UI updates on toggles
    const [isCalled, setIsCalled] = useState(job.isCalled === 'Yes');
    const [isMailed, setIsMailed] = useState(job.isMailed === 'Done');

    const toggleStatus = async (field, currentVal, setLocalState, positiveVal, negativeVal) => {
        const newVal = currentVal ? negativeVal : positiveVal;
        setLocalState(!currentVal); // Optimistic update

        try {
            await fetch(`/api/jobs/${job._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [field]: newVal })
            });
            router.refresh(); // Sync data
        } catch (e) {
            console.error("Failed to update status");
            setLocalState(currentVal); // Revert
        }
    };

    return (
        <div className="group relative rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/50 flex flex-col justify-between h-full">
            <div>
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="font-bold text-lg text-foreground truncate max-w-[180px]" title={job.company}>{job.company}</h3>
                        <p className="text-sm text-primary font-medium truncate max-w-[180px]" title={job.position}>{job.position}</p>
                    </div>
                    <StatusBadge status={job.response} />
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                     <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                        {job.applicationMethod || "Easy Apply"}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${job.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-muted text-muted-foreground'}`}>
                        {job.priority} Priority
                    </span>
                </div>

                <div className="space-y-2 mb-4">
                     {job.email && (
                        <div className="flex items-center text-xs text-muted-foreground">
                             <FaEnvelope className="mr-2 h-3 w-3" />
                             <span className="truncate">{job.email}</span>
                        </div>
                     )}
                     {job.phone && (
                        <div className="flex items-center text-xs text-muted-foreground">
                             <FaPhoneAlt className="mr-2 h-3 w-3" />
                             <span className="truncate">{job.phone}</span>
                        </div>
                     )}
                     {job.applicationDate && (
                        <div className="flex items-center text-xs text-muted-foreground">
                             <FaCalendarAlt className="mr-2 h-3 w-3" />
                             <span className="truncate">Applied: {new Date(job.applicationDate).toLocaleDateString('en-GB')}</span>
                        </div>
                     )}
                </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="flex gap-3">
                    <button 
                         onClick={() => toggleStatus('isCalled', isCalled, setIsCalled, 'Yes', 'Not')}
                         className={`flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${isCalled ? 'text-emerald-500' : 'text-muted-foreground hover:text-foreground'}`}
                         title="Toggle Called Status"
                    >
                        {isCalled ? <FaCheckCircle /> : <FaRegCircle />} Called
                    </button>
                    <button 
                         onClick={() => toggleStatus('isMailed', isMailed, setIsMailed, 'Done', 'Not')}
                         className={`flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${isMailed ? 'text-emerald-500' : 'text-muted-foreground hover:text-foreground'}`}
                         title="Toggle Mailed Status"
                    >
                        {isMailed ? <FaCheckCircle /> : <FaRegCircle />} Mailed
                    </button>
                </div>
                
                <div className="flex gap-2">
                     {job.appliedLink && (
                        <a href={job.appliedLink} target="_blank" rel="noreferrer" className="p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                            <FaExternalLinkAlt className="h-3 w-3" />
                        </a>
                    )}
                    <Link href={`/edit/${job._id}`} className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors">
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
