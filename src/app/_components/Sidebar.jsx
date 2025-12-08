"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaRocket, FaChartPie, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/', icon: <FaRocket /> },
        { name: 'Applications', href: '/applications', icon: <FaChartPie /> }, // Future
        // { name: 'Settings', href: '/settings', icon: <FaCog /> }, // Future
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card hidden md:flex flex-col">
            <div className="flex flex-col justify-center h-16 px-6 border-b border-border">
                <span className="font-bold text-2xl tracking-tighter bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Trackr
                </span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest -mt-1">
                    Your journey to hired
                </span>
            </div>

            <div className="flex-1 py-6 px-4 space-y-2">
                {navItems.map((item) => (
                    <Link 
                        key={item.name} 
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            pathname === item.href 
                                ? 'bg-primary/10 text-primary' 
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                        {item.icon}
                        {item.name}
                    </Link>
                ))}
                
            </div>

            <div className="p-4 border-t border-border">
               <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 p-4 rounded-xl border border-primary/20">
                    <h4 className="text-sm font-semibold text-primary mb-1">Pro Tip 💡</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Update your status daily to keep momentum high!
                    </p>
               </div>
            </div>
        </aside>
    );
};

export default Sidebar;
