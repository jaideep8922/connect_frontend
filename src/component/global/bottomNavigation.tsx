"use client"
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type UserType = "Supplier" | "Retailer" | "Distributor";

const BottomNavigation = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [userType, setUserType] = useState<UserType | null>(null);
    const [phoneNo, setPhoneNo] = useState<string | null>(null);

    useEffect(() => {
        try {
            const storedUserType = localStorage.getItem("userType");
            const storedPhoneNo = localStorage.getItem('sellerPhone');
            if (storedUserType) {
                setUserType(storedUserType as UserType);
            }
            if (storedPhoneNo) {
                setPhoneNo(storedPhoneNo);
            }
        } catch (error) {
            console.error("Error accessing localStorage:", error);
        }
    }, []);

    const isActive = (path: string) => pathname === path;

    return (
        <div>
            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-[#FFEFD3] shadow-2xl z-50 border-t w-full px-3">
                <div className="flex justify-between items-center">

                    <button
                        className={`flex flex-col items-center space-y-1 ${isActive('/profile') ? 'bg-orange-200 p-3 m-2 rounded-md' : 'p-3'}`}
                        onClick={() => router.push('/profile')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6D2323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        <span className="text-xs font-medium text-black">Profile</span>
                    </button>

                    <button
                        className={`flex flex-col items-center space-y-1 ${isActive('/home') ? 'bg-orange-200 p-3 m-2 rounded-md' : 'p-3'}`}
                        onClick={() => router.push('/home')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6D2323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                        <span className="text-xs font-medium text-black">Home</span>
                    </button>

                    {/* Conditional Menu Item for "Retailer" */}
                    {userType === "Retailer" && (
                        <button
                            className={`flex flex-col items-center space-y-1 ${isActive('/shop') ? 'bg-orange-200 p-3 m-2 rounded-md' : 'p-3'}`}
                            onClick={() => router.push('/shop')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6D2323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                            <span className="text-xs font-medium text-black">Shop</span>
                        </button>
                    )}

                    {/* Conditional Menu Item for "Supplier" */}
                    {userType === "Supplier" && (
                        <button
                            className={`flex flex-col items-center space-y-1 ${isActive('/manage') ? 'bg-orange-200 p-3 m-1 rounded-md' : 'p-3'}`}
                            onClick={() => router.push('/manage')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6D2323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-chart-gantt"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 8h7" /><path d="M8 12h6" /><path d="M11 16h5" /></svg>
                            <span className="text-xs font-medium text-black">Manage</span>
                        </button>
                    )}

                    <button
                        className={`flex flex-col items-center space-y-1 ${isActive('/notes') ? 'bg-orange-200 p-3 m-2 rounded-md' : 'p-3'}`}
                        onClick={() => router.push('/notes')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6D2323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notebook-pen"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" /><path d="M2 6h4" /><path d="M2 10h4" /><path d="M2 14h4" /><path d="M2 18h4" /><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /></svg>
                        <span className="text-xs font-medium text-black">Notes</span>
                    </button>

                    {userType === "Retailer" && (
                        <a href={`tel:${phoneNo}`}
                            className={`flex flex-col items-center space-y-1 ${isActive('/') ? 'bg-orange-200 p-3 m-2 rounded-md' : 'p-3'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6D2323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headset"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" /><path d="M21 16v2a4 4 0 0 1-4 4h-5" /></svg>
                            <span className="text-xs font-medium text-black">Support</span>
                        </a>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default BottomNavigation;