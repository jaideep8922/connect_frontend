import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

const BottomNavigation = () => {
    const router = useRouter();

    // const currentPath = router.pathname; 
    const pathname = usePathname()

    // Dynamically set userType
    // const userType:any = "Retailer"; 

    const userType:any = "Supplier";

    const isActive = (path: string) => pathname === path;

    console.log("isActive", isActive)

    return (
        <div>
            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-50 border-t w-full px-3">
                <div className="flex justify-between items-center">
                    {/* <button
                        className="flex flex-col items-center space-y-1"
                        onClick={() => router.push('/profile')}
                    > */}
                      <button
                        className={`flex flex-col items-center space-y-1 ${
                            isActive('/profile') ? 'bg-blue-200 p-3 ' : 'p-3'
                        }`}
                        onClick={() => router.push('/profile')}
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span className="text-xs font-medium">Profile</span>
                    </button>

                    {/* <button
                        className="flex flex-col items-center space-y-1"
                        onClick={() => router.push('/home')}
                    > */}
                    <button
                        className={`flex flex-col items-center space-y-1 ${
                            isActive('/home') ? 'bg-blue-200 p-3' : 'p-3'
                        }`}
                        onClick={() => router.push('/home')}
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                        <span className="text-xs font-medium">Home</span>
                    </button>

                    {/* Conditional Menu Item for "Retailer" */}
                    {userType === "Retailer" && (
                        // <button
                        //     className="flex flex-col items-center space-y-1"
                        //     onClick={() => router.push('/shop')}
                        // >
                        <button
                        className={`flex flex-col items-center space-y-1 ${
                            isActive('/shop') ? 'bg-blue-200 p-3' : 'p-3'
                        }`}
                        onClick={() => router.push('/shop')}
                    >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                            <span className="text-xs font-medium">Shop</span>
                        </button>
                    )}

                    {/* Conditional Menu Item for "Supplier" */}
                    {userType === "Supplier" && (
                        <>
                            <button className="w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full shadow-lg text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scan-search"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><circle cx="12" cy="12" r="3" /><path d="m16 16-1.9-1.9" /></svg>
                            </button>

                            {/* <button
                                className="flex flex-col items-center space-y-1"
                                onClick={() => router.push('/manage')}
                            > */}
                            <button
                        className={`flex flex-col items-center space-y-1 ${
                            isActive('/manage') ? 'bg-blue-200 p-3' : 'p-3'
                        }`}
                        onClick={() => router.push('/manage')}
                    >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-chart-gantt"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 8h7"/><path d="M8 12h6"/><path d="M11 16h5"/></svg>
                                <span className="text-xs font-medium">Manage</span>
                            </button>
                        </>
                    )}

                    {/* <button
                        className="flex flex-col items-center space-y-1"
                        onClick={() => router.push('/notes')}
                    > */}
                    <button
                        className={`flex flex-col items-center space-y-1 ${
                            isActive('/notes') ? 'bg-blue-200 p-3' : 'p-3'
                        }`}
                        onClick={() => router.push('/notes')}
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notebook-pen"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/></svg>
                        <span className="text-xs font-medium">Notes</span>
                    </button>

                    {userType === "Retailer" && (

                        // <button className="flex flex-col items-center space-y-1">
                        <button
                        className={`flex flex-col items-center space-y-1 ${
                            isActive('/') ? 'bg-blue-200 p-3' : 'p-3'
                        }`}
                        onClick={() => router.push('/note')}
                    >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headset"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/></svg>
                            <span className="text-xs font-medium">Support</span>
                        </button>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default BottomNavigation;