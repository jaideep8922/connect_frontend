"use client"
import { ArrowLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface OrderStatus {
    title: string
    subtitle: string
    color: string
    link: string // Added link property
}

const orderStatuses: OrderStatus[] = [
    {
        title: "Current Received Order",
        subtitle: "Received Customer order",
        color: "text-[#6D2323]",
        link: '/current-received', 
    },
    {
        title: "Processed Order",
        subtitle: "Customer order Processed by me",
        color: "text-amber-500",
        link: '/process-order'
    },
    {
        title: "Pending Order",
        subtitle: "Enquiry pending by me",
        color: "text-red-500",
        link: '/pending-order'
    },
    {
        title: "Order Completed",
        subtitle: "Customer order completed by me",
        color: "text-green-500",
        link: '/completed-order'
    },
    {
        title: "Order Cancelled",
        subtitle: "Customer / Seller cancelled the enquiry",
        color: "text-pink-500",
        link: '/cancel-order'
    },
    
]

export default function RequestOrderStatusList() {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
                <button
                    className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
                    aria-label="Go back"
                >
                    <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
                </button>

                <h1 className="text-lg font-medium">Request Order</h1>

                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>          <span className="sr-only">Notifications</span>
                <span className="sr-only">Notifications</span>
                </div>
            </header>

            <div className="flex flex-col gap-3 p-4 bg-[#FFEFD3] min-h-screen">
                {orderStatuses.map((status, index) => (
                    <Link href={status.link} key={index}>
                        <div
                            className="flex items-center bg-white justify-between p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-[#FFEFD3] transition-colors"
                        >
                            <div className="space-y-1">
                                <h3 className="font-medium text-black">{status.title}</h3>
                                <p className="text-sm text-muted-foreground text-black">{status.subtitle}</p>
                            </div>
                            <div
                                className={`h-8 w-8 flex items-center justify-center rounded-full border ${status.color}`}
                            >
                                <ChevronRight className={`h-5 w-5 ${status.color}`} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}
