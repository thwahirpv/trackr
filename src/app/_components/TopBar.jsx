"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { useDebounce } from 'use-debounce'; // You might need to install this or implement custom debounce. I'll implement custom for simplicity.

const TopBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // 500ms debounce

    const pathname = usePathname();

    // Effect to update URL when debounced term changes
    useEffect(() => {
        // Did the user search?
        if (debouncedSearchTerm) {
             const params = new URLSearchParams(searchParams);
             params.set('query', debouncedSearchTerm);
             router.replace(`/?${params.toString()}`);
        } else if (pathname === '/' && searchTerm !== (searchParams.get('query') || '')) {
             // Only clear query if we are on home page and "clearing" a search
             const params = new URLSearchParams(searchParams);
             params.delete('query');
             router.replace(`/?${params.toString()}`);
        }
    }, [debouncedSearchTerm, router, searchParams, pathname]);

    const handleLogout = async () => {
        document.cookie = 'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; 
        router.refresh();
        router.push('/login');
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <FaSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search company or position..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex h-9 w-full sm:w-[300px] md:w-[400px] rounded-md border border-input bg-background pl-8 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>
                
                <div className="relative">
                    <button 
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-2 rounded-full bg-muted/50 p-1 pr-3 hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                    >
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                           <FaUserCircle className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium hidden sm:block">My Profile</span>
                    </button>

                    {showProfileMenu && (
                        <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-border bg-popover p-1 shadow-md animate-in fade-in zoom-in-95 duration-200">
                             <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-sm transition-colors text-left"
                            >
                                <FaUserCircle className="h-4 w-4" /> Log out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopBar;
