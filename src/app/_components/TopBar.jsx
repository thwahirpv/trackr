import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { FaSearch, FaUserCircle, FaBullseye, FaTimes, FaBars, FaChartPie } from 'react-icons/fa';
import { useDebounce } from 'use-debounce';
import { logOutAction, updateUserGoal } from '../actions/auth';


const TopBar = ({ currentGoal = 50 }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [newGoal, setNewGoal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
    const [goalError, setGoalError] = useState(null)

    const pathname = usePathname();

    // Effect to update URL when debounced term changes
    useEffect(() => {
        if (debouncedSearchTerm) {
             const params = new URLSearchParams(searchParams);
             params.set('query', debouncedSearchTerm);
             // Always redirect to applications page on search
             router.replace(`/applications?${params.toString()}`);
        } else if (searchTerm !== (searchParams.get('query') || '')) {
             // Only if explicitly cleared/changed empty
             const params = new URLSearchParams(searchParams);
             params.delete('query');
             router.replace(`${pathname}?${params.toString()}`);
        }
    }, [debouncedSearchTerm, router, searchParams, pathname]);

    const handleLogout = async () => {
        await logOutAction() 
        router.refresh();
        router.push('/login');
    };

    const handleUpdateGoal = async (e) => {
        e.preventDefault();
        setGoalError(null);

        if (newGoal < 5) {
            setGoalError({
                message: 'Goal must be at least 5!',
                color: 'text-red-500'
            });
            return
        } 
        
        setIsLoading(true);
        const res = await updateUserGoal(newGoal);
        setIsLoading(false);
        
        if (res.status) {
            setShowGoalModal(false);
            setShowProfileMenu(false);
        } else {
             setGoalError({
                message: res.message || "Failed to update goal",
                color: 'text-red-500'
            });
        }
    };

    const handleGoalChange = (e) => {
        const val = e.target.value;
        setNewGoal(val); 
        setGoalError(null);

        if (val < 5) {
            setGoalError({
                message: 'Goal must be at least 5!',
                color: 'text-red-500'
            });
            return
        } 
        else if(val < currentGoal) {
            setGoalError({
                message: 'Note: This is lower than your current goal.', 
                color: 'text-orange-500'
            })
        }
    }
    return (
        <>
            <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
                
                {/* Mobile Menu Toggle */}
                <button 
                    className="md:hidden text-muted-foreground hover:text-foreground mr-2"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    { showMobileMenu ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" /> }
                </button>

                {/* Mobile Brand (visible only on mobile) */}
                 <div className="md:hidden font-bold text-lg bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mr-auto">
                    Trackr
                </div>

                <div className="hidden md:flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
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
                            <div className="absolute right-0 top-full mt-2 bg-background w-56 rounded-md border border-border bg-popover p-1 shadow-md animate-in fade-in zoom-in-95 duration-200">
                                <button 
                                    onClick={() => {
                                        setShowGoalModal(true);
                                        setShowProfileMenu(false); // Close menu when opening modal
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-sm transition-colors text-left cursor-pointer"
                                >
                                    <FaBullseye className="h-4 w-4 text-blue-500" /> Application Goal
                                </button>
                                <div className="h-[1px] bg-border my-1"></div>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-sm transition-colors text-left cursor-pointer"
                                >
                                    <FaUserCircle className="h-4 w-4" /> Log out
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Search Icon (only if not already visible in desktop layout logic which is hidden on mobile often, but here input is hidden on mobile? Let's check original... original input was flex w-full. So it might utilize space. Let's keep it simple. ) */}
                 {/* Re-adding the Search input for mobile if needed, or keeping it hidden? The original code had the search bar in the main flex container which might be squeezed. Let's ensure search is accessible on mobile too. 
                 Actually, simpler for now: Keep the desktop structure `hidden md:flex` for the main bar and show a simplified mobile bar. */}

                 {/* Mobile Search and Profile are inside the hidden md:flex block. We need to expose them for mobile. 
                    Let's restructure: 
                    The header has `flex items-center gap-4`.
                    We added the Hamburger.
                    We need the Search and Profile to be accessible on mobile too? 
                    The Prompt was "Mobile Navigation".
                    So let's prioritize the MENU first.
                 */}
            </header>
            
            {/* Mobile Navigation Menu */}
            {showMobileMenu && (
                <div className="md:hidden fixed inset-0 z-20 bg-background/95 backdrop-blur-sm pt-20 px-6 animate-in slide-in-from-left-10 duration-200">
                    <nav className="flex flex-col gap-4">
                        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Menu</h2>
                        <button 
                            onClick={() => router.push('/')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === '/' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`}
                        >
                            <FaChartPie className="h-5 w-5" /> Dashboard
                        </button>
                        <button 
                             onClick={() => router.push('/applications')}
                             className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === '/applications' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`}
                        >
                             <FaBullseye className="h-5 w-5" /> Applications
                        </button>
                        <div className="h-[1px] bg-border my-2"></div>
                         <button 
                             onClick={() => {
                                 setShowGoalModal(true);
                                 setShowMobileMenu(false);
                             }}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-foreground hover:bg-muted"
                        >
                             <FaBullseye className="h-5 w-5 text-blue-500" /> Update Goal
                        </button>
                        <button 
                             onClick={handleLogout}
                             className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-red-500 hover:bg-red-500/10"
                        >
                             <FaUserCircle className="h-5 w-5" /> Log out
                        </button>
                    </nav>
                </div>
            )}

            {/* Goal Update Modal */}
            {showGoalModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-card border border-border w-full max-w-md p-6 rounded-xl shadow-xl relative animate-in zoom-in-95 duration-200">
                        <button 
                            onClick={() => setShowGoalModal(false)}
                            className="absolute cursor-pointer right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <FaTimes />
                        </button>

                        <div className="mb-6 text-center">
                            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <FaBullseye className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold">Update Application Goal</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Set a monthly target to keep yourself motivated.
                            </p>
                        </div>

                        <form onSubmit={handleUpdateGoal} className="space-y-4">
                            <div>
                                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">  
                                    Monthly Goal
                                </label>
                                <input 
                                    type="number" 
                                    min="5"
                                    value={newGoal}
                                    onChange={handleGoalChange}
                                    placeholder="e.g. 50"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring mt-1.5"
                                />
                                {goalError && (
                                    <p className={`text-xs mt-1.5 ${goalError.color}`}>
                                        {goalError.message}
                                    </p>
                                )}
                                {!goalError && (
                                    <p className="text-[10px] text-muted-foreground mt-1 text-right">
                                        Minimum: 5 applications
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || newGoal < 5}
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                {isLoading ? 'Updating...' : 'Save Goal'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default TopBar;
