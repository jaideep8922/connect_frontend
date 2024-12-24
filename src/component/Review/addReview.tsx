// "use client";

// import { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// export default function AddReviewPage() {
//   const orders = [
//     {
//       orderId: "#90897",
//       placedDate: "October 19, 2021",
//       items: 10,
//       totalPrice: "16.90",
//       deliveryDate: "August 29, 2021",
//     },
//     {
//       orderId: "#90898",
//       placedDate: "October 20, 2021",
//       items: 12,
//       totalPrice: "20.50",
//       deliveryDate: "August 30, 2021",
//     },
//     {
//       orderId: "#90899",
//       placedDate: "October 21, 2021",
//       items: 8,
//       totalPrice: "12.30",
//       deliveryDate: "August 31, 2021",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-6">Orders</h1>
//       <div className="space-y-4">
//         {orders.map((order) => (
//           <div key={order.orderId} className="bg-white p-4 rounded-lg shadow-md mb-4">
//             <div className="flex justify-between items-center mb-4">
//               <div className="flex items-center">
//                 <div className="bg-blue-500 text-white p-2 rounded-full mr-4">
//                   <span className="text-xl font-bold">{order.orderId}</span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold">Placed on {order.placedDate}</p>
//                   <p className="text-sm">Items: {order.items} | Total: ${order.totalPrice}</p>
//                 </div>
//               </div>
//               <OrderDetailsToggle deliveryDate={order.deliveryDate} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// interface OrderDetailsToggleProps {
//   deliveryDate: string;
// }

// function OrderDetailsToggle({ deliveryDate }: OrderDetailsToggleProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDetails = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       <button
//         onClick={toggleDetails}
//         className="text-blue-500 focus:outline-none"
//       >
//         {isOpen ? (
//           <ChevronUp className="h-6 w-6" />
//         ) : (
//           <ChevronDown className="h-6 w-6" />
//         )}
//       </button>
//       {isOpen && (
//         <p className="text-sm font-semibold mt-2">Order Delivered: {deliveryDate}</p>
//       )}
//     </div>
//   );
// }


"use client"

import { useState } from "react"
import { ArrowLeft, ChevronDown, ChevronUp, Package } from 'lucide-react'
import { useRouter } from 'next/navigation';

export default function AddReviewPage() {
    const router = useRouter()
    const orders = [
        {
            orderId: "#90897",
            placedDate: "October 19 2021",
            items: 10,
            totalPrice: "16.90",
            deliveryDate: "Aug 29 2021",
            id:1
        },
        {
            orderId: "#90897",
            placedDate: "October 19 2021",
            items: 10,
            totalPrice: "16.90",
            deliveryDate: "Aug 29 2021",
            id:2
        },
        {
            orderId: "#90897",
            placedDate: "October 19 2021",
            items: 10,
            totalPrice: "16.90",
            deliveryDate: "Aug 29 2021",
            id:3
        },
        {
            orderId: "#90897",
            placedDate: "October 19 2021",
            items: 10,
            totalPrice: "16.90",
            deliveryDate: "Aug 29 2021",
            id:4
        },
    ]

    return (
        <>
            <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
                <button
                    className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
                    aria-label="Go back"
                >
                    <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
                </button>

                <h1 className="text-lg font-medium">Reviews</h1>

                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold">
                        2
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>

                    <span className="sr-only">Notifications</span>
                </div>
            </header>
            <div className="min-h-screen bg-gray-50 p-4">

                <div className="mx-auto max-w-2xl space-y-3" onClick={()=> router.push('/single-review')}>
                    {orders.map((order, index) => (
                        <OrderCard key={index} {...order} />
                    ))}
                </div>
            </div>
        </>
    )
}

interface OrderCardProps {
    orderId: string
    placedDate: string
    items: number
    totalPrice: string
    deliveryDate: string
}

function OrderCard({ orderId, placedDate, items, totalPrice, deliveryDate }: OrderCardProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
                <div className="flex gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                        <Package className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Order {orderId}</h3>
                        <p className="text-sm text-gray-500">Placed on {placedDate}</p>
                        <p className="text-sm text-gray-500">
                            Items: {items} | Items: ${totalPrice}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-full p-2 hover:bg-gray-50"
                >
                    {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                </button>
            </div>
            {isOpen && (
                <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm text-gray-500">Order Delivered</span>
                    </div>
                    <span className="text-sm text-gray-500">{deliveryDate}</span>
                </div>
            )}
        </div>
    )
}

