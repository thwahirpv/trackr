"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const JobForm = ({ initialData, isEdit = false }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    
    const defaultValues = {
        company: "",
        position: "",
        isApplied: "Not Started",
        isCalled: "Not",
        isMailed: "Not",
        response: "Pending",
        priority: "Medium",
        applicationMethod: "Easy Apply",
        phone: "",
        email: "",
        appliedLink: "",
        applicationDate: new Date().toISOString().split('T')[0]
    };

    const [formData, setFormData] = useState({ ...defaultValues, ...initialData });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const url = isEdit ? `/api/jobs/${initialData._id}` : '/api/jobs';
            const method = isEdit ? 'PUT' : 'POST';

            const { _id, userId, createdAt, updatedAt, __v, ...cleanData } = formData;

            // Handle empty date string to prevent cast errors
            if (cleanData.applicationDate === "") {
                cleanData.applicationDate = null;
            }

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanData)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || data.data || "Something went wrong");
            }

            router.push('/');
            router.refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const checkDelete = () => {
        setShowDeleteModal(true);
    }

    const confirmDelete = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/jobs/${initialData._id}`, { method: 'DELETE' });
            if (res.ok) {
                router.push('/');
                router.refresh();
            } else {
                throw new Error("Failed to delete");
            }
        } catch(err) {
            setError(err.message);
            setLoading(false);
            setShowDeleteModal(false);
        }
    }

    return (
        <>
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-card border border-border text-card-foreground rounded-lg shadow-lg max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-200">
                        <div className="space-y-2">
                             <h3 className="text-lg font-bold text-red-500">Delete Application</h3>
                             <p className="text-sm text-muted-foreground">
                                Are you sure you want to delete this application? This action cannot be undone.
                             </p>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button 
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-muted hover:text-accent-foreground transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button 
                                type="button"
                                onClick={confirmDelete}
                                className="px-4 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
                            >
                                {loading ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto bg-card p-8 rounded-2xl border border-border shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2 text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        {isEdit ? 'Update Application' : 'Track New Application'}
                    </h2>
                    <p className="text-muted-foreground">Keep your applications organized with detailed status tracking.</p>
                </div>

                {error && (
                    <div className="p-4 rounded-lg bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300 text-sm font-medium animate-pulse">
                        {error}
                    </div>
                )}

                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-border pb-2">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Company Name</label>
                            <input 
                                type="text" name="company" value={formData.company} onChange={handleChange} required 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="e.g. Google"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Position</label>
                            <input 
                                type="text" name="position" value={formData.position} onChange={handleChange} required 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="e.g. Software Engineer"
                            />
                        </div>
                    </div>
                </div>

                {/* Status Tracking */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-border pb-2">Tracking Status</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Is Applied</label>
                            <select name="isApplied" value={formData.isApplied} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer">
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Is Called</label>
                            <select name="isCalled" value={formData.isCalled} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer">
                                <option value="Not">Not</option>
                                <option value="Yes">Yes</option>
                                <option value="Missed">Missed</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Is Mailed</label>
                            <select name="isMailed" value={formData.isMailed} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer">
                                <option value="Not">Not</option>
                                <option value="Pending">Pending</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium">Response</label>
                            <select name="response" value={formData.response} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer">
                                <option value="Pending">Pending</option>
                                <option value="Interview">Interview</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium">Priority</label>
                            <select name="priority" value={formData.priority} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer">
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                     <div className="mt-4">
                        <label className="text-sm font-medium">Application Method</label>
                        <select name="applicationMethod" value={formData.applicationMethod || "Easy Apply"} onChange={handleChange} className="flex h-10 w-full mt-2 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer max-w-md">
                            <option value="Easy Apply">Easy Apply</option>
                            <option value="Website">Company Website</option>
                            <option value="Email">Email</option>
                            <option value="Referral">Referral</option>
                            <option value="Recruiter">Recruiter</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                     <div className="mt-4">
                        <label className="text-sm font-medium">Application Date</label>
                        <input 
                            type="date" name="applicationDate" value={formData.applicationDate ? new Date(formData.applicationDate).toISOString().split('T')[0] : ''} onChange={handleChange} 
                            className="flex h-10 w-full mt-2 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer max-w-md"
                        />
                    </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-border pb-2">Contact Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-sm font-medium">Phone</label>
                            <input 
                                type="tel" name="phone" value={formData.phone} onChange={handleChange} 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="+1 234 567 890"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <input 
                                type="email" name="email" value={formData.email} onChange={handleChange} 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="recruiter@company.com"
                            />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Application Link</label>
                        <input 
                            type="url" name="appliedLink" value={formData.appliedLink} onChange={handleChange} 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="https://linkedin.com/jobs/..."
                        />
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-lg shadow-primary/25 cursor-pointer"
                    >
                        {loading ? 'Saving...' : (isEdit ? 'Update Application' : 'Add to Tracker')}
                    </button>
                     {isEdit && (
                        <button 
                            type="button" 
                            onClick={checkDelete}
                            disabled={loading}
                            className="bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/40 h-10 py-2 px-4 rounded-md font-medium transition-colors cursor-pointer"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </>
    );
};

export default JobForm;
