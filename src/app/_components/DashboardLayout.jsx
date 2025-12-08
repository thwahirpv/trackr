"use client";
import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                <TopBar /> 
                
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
