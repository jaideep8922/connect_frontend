// "use client"
// import { ArrowLeft, Package } from 'lucide-react'
// import Link from 'next/link'

// interface Order {
//   id: any
//   items: number
//   price: number
//   status: string
//   date: string
// }

// export default function CurrentCompletedOrderMain() {
//   const orders: Order[] = [
//     {
//       id: 1,
//       items: 18,
//       price: 16.90,
//       status: "Completed",
//       date: "Aug 29 2021"
//     },
//     {
//       id: 2,
//       items: 18,
//       price: 16.90,
//       status: "Completed",
//       date: "Aug 29 2021"
//     },
//     {
//       id: 3,
//       items: 118,
//       price: 16.90,
//       status: "Completed",
//       date: "Aug 29 2021"
//     }
//   ]

//   return (
//     <>
//       <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
//         <button
//           className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
//           aria-label="Go back"
//         >
//           <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
//         </button>

//         <h1 className="text-lg font-medium">Completed Order</h1>

//         <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
         
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>          <span className="sr-only">Notifications</span>
//         </div>
//       </header>
//       <div className="max-w-md mx-auto p-4 space-y-4">
//         {/* Header Section */}
//         <div className="max-w-sm mx-auto rounded-lg border bg-white p-4 shadow-sm">
//             <div className="flex items-start justify-between">
//                 <h3 className="text-lg font-medium text-gray-800">Recent Order</h3>
//                 <div className="text-sm text-gray-500 text-right">
//                     <p>Date - 06-07-2024</p>
//                     <p>Time - 10:15 a.m</p>
//                 </div>
//             </div>
//             <hr className="my-4 border-dashed" />
//             <div className="flex items-center justify-between">
//                 <p className="text-lg font-medium text-gray-600">Total Received Order</p>
//                 <p className="text-3xl font-bold text-gray-800">1326</p>
//             </div>
//         </div>        

//         {/* Orders List */}
//         <div className="space-y-3">
//         <Link href='/single-process'>

//           {orders.map((order, index) => (
//             <div key={index} className="p-4 border shadow-sm rounded-lg m-1">
//               <div className="flex items-start gap-3">
//                 <div className="p-2 bg-blue-50 rounded-lg">
//                   <Package className="h-5 w-5 text-[#6D2323]" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-medium">Order #{order.id}</h3>
//                       <p className="text-sm text-muted-foreground">
//                         Items: {order.items} · Items: ${order.price.toFixed(2)}
//                       </p>
//                     </div>
//                     <button className="text-white bg-[#6D2323] rounded-full text-xs px-4 py-1">
//                       <span className="sr-only">View order details</span>
//                       {order.status}
//                     </button>
//                   </div>
//                   <div className="flex  gap-2 mt-2 text-sm">
//                     <p className="text-muted-foreground">Placed On :</p>
//                     <p className="text-muted-foreground">{order.date}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Link>

//         </div>
//       </div>
//     </>
//   )
// }

"use client"

import { useEffect, useState } from "react";
import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";

interface Order {
  id: number;
  orderId: string;
  sellerId: string;
  retailerId: string;
  statusId: number;
  totalItem: number;
  totalQuantity: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  isCart: boolean;
}

export default function CurrentCompleteddOrderMain() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only run on the client side (when window is available)
    if (typeof window !== "undefined") {
      const localData: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
      const customId = localData?.data?.customId;

      const fetchOrders = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/get-order-history-by-supplier-id`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customId }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setOrders(data.data);
            } else {
              console.error("Failed to fetch orders: ", data.message);
            }
          } else {
            console.error("Failed to fetch orders: HTTP error", response.status);
          }
        } catch (error) {
          console.error("Error fetching orders: ", error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, []);

  const statusMap: Record<number, { label: string; bgColor: string }> = {
    3: { label: "Pending", bgColor: "bg-yellow-100 text-yellow-700" },
    2: { label: "Accepted", bgColor: "bg-blue-100 text-blue-700" },
    4: { label: "Completed", bgColor: "bg-green-100 text-green-700" },
    5: { label: "Cancelled", bgColor: "bg-red-100 text-red-700" },
  };

  return (
    <>
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
        <button
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium">Completed Order</h1>

        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-cart"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          <span className="sr-only">Notifications</span>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="max-w-sm mx-auto rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-medium text-gray-800">Recent Order</h3>
            <div className="text-sm text-gray-500 text-right">
              <p>Date - {new Date().toLocaleDateString()}</p>
              <p>Time - {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
          <hr className="my-4 border-dashed" />
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-gray-600">Total Completed Order</p>
            <p className="text-3xl font-bold text-gray-800">
            {orders.filter((order) => order.statusId === 4).length}
            </p>
          </div>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="space-y-3">
            {orders.
             filter((order) => order.statusId === 4).
            map((order, index) => (
              // <Link href="/request-cart" key={index}>

              <Link href={`/request-cart?orderId=${order.orderId}`} key={index}>
                <div className="p-4 border bg-white shadow-sm rounded-lg m-1">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Package className="h-5 w-5 text-[#6D2323]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-blue-700">Order Id: {order.orderId}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Items: {order.totalItem} · Quantity: {order.totalQuantity}
                          </p>
                        </div>

                        <p
                          className={`text-sm inline-block font-medium px-3 py-1 rounded-full ${statusMap[order.statusId]?.bgColor || "bg-gray-100 text-gray-700"}`}
                        >
                          {statusMap[order.statusId]?.label || "Unknown"}
                        </p>
                      </div>
                      <div className="mt-2 text-sm">
                        <p className="text-muted-foreground mt-4">Created At: {new Date(order.createdAt).toLocaleString()}</p>
                        <br></br>
                        <p className="text-muted-foreground"><span className="text-blue-600">Notes :</span> {order.notes}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
