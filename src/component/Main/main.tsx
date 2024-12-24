"use client"

import React from "react";
import Order from '@/assets/checkout 1.svg'
import Request from '@/assets/checkout 2.svg'
import Tracking from '@/assets/checkout 3.svg'
import History from '@/assets/checkout 4.svg'
import Image from "next/image";
import BottomNavigation from "../global/bottomNavigation";


export default function Dashboard() {

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="flex justify-between items-center px-4 py-3 bg-white shadow-md">
                <div className="flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        className="w-7 h-7 text-blue-600"
                    >
                        <path d="M50 10L90 90H10Z" />
                    </svg>
                    {/* <img src="/logo.png" alt="Logo" className="h-6" /> */}
                    <span className="text-lg font-semibold">DemoConnect</span>
                </div>
                <button className="relative">
                    <span className="absolute w-3 h-3 bg-red-500 rounded-full top-0 right-0"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                </button>
            </header>

            {/* Main Section */}
            <main className="flex flex-col items-center px-4 mt-6">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                    {/* Card 1 */}
                    <div className="flex flex-col items-center p-4 bg-white  rounded-lg shadow">
                        <Image src={Order} alt="order" className="mb-2" />

                        <span className="flex items-center space-x-2 text-center font-medium text-sm text-blue-600 bg-gradient-to-r from-blue-200 to-bg-blue-100 rounded-3xl px-3 py-1 border border-blue-100">
                            <p className="text-[10px]">Start Ordering</p>
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white border border-blue-600 ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="stroke-blue-600"
                                >
                                    <path d="M13 5H19V11" />
                                    <path d="M19 5L5 19" />
                                </svg>
                            </span>
                        </span>

                    </div>

                    {/* Card 2 */}
                    <div className="flex flex-col items-center p-4 bg-white  rounded-lg shadow">
                        <Image src={Request} alt="order" className="mb-2" />

                        <span className="flex items-center space-x-2 text-center font-medium text-sm text-blue-600 bg-gradient-to-r from-blue-200 to-bg-blue-100 rounded-3xl px-3 py-1 border border-blue-100">
                            <p className="text-[10px]">Order Request</p>
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white border border-blue-600 ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="stroke-blue-600"
                                >
                                    <path d="M13 5H19V11" />
                                    <path d="M19 5L5 19" />
                                </svg>
                            </span>
                        </span>

                    </div>

                    {/* Card 3 */}
                    <div className="flex flex-col items-center p-4 bg-white  rounded-lg shadow">
                        <Image src={Tracking} alt="order" className="mb-2" />

                        <span className="flex items-center space-x-2 text-center font-medium text-sm text-blue-600 bg-gradient-to-r from-blue-200 to-bg-blue-100 rounded-3xl px-3 py-1 border border-blue-100">
                            <p className="text-[10px]">Order Tracking</p>
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white border border-blue-600 ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="stroke-blue-600"
                                >
                                    <path d="M13 5H19V11" />
                                    <path d="M19 5L5 19" />
                                </svg>
                            </span>
                        </span>

                    </div>

                    {/* Card 4 */}
                    <div className="flex flex-col items-center p-4 bg-white  rounded-lg shadow">
                        <Image src={History} alt="order" className="mb-2" />

                        <span className="flex items-center space-x-2 text-center font-medium text-sm text-blue-600 bg-gradient-to-r from-blue-200 to-bg-blue-100 rounded-3xl px-3 py-1 border border-blue-100">
                            <p className="text-[10px]">Order History</p>
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white border border-blue-600 ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="stroke-blue-600"
                                >
                                    <path d="M13 5H19V11" />
                                    <path d="M19 5L5 19" />
                                </svg>
                            </span>
                        </span>

                    </div>
                </div>
            </main>
            <BottomNavigation />
        </div>
    );
}
