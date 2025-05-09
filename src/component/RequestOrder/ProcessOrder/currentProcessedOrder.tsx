"use client"
import { formatDate } from '@/component/global/productCard'
import { ArrowLeft, Package } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Order {
  id: any
  items: number
  price: number
  status: string
  date: string
}

export default function CurrentProcessedOrderMain() {
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Ensure `localStorage` access happens only on the client side
    if (typeof window !== "undefined") {
      try {
        const localData: any = JSON.parse(localStorage.getItem("userDetails") || "{}");
        const customId = localData?.data?.customId;

        if (customId) {
          fetchOrders(customId);
        } else {
          console.error("Custom ID is missing from user details.");
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  const fetchOrders = async (customId: string) => {
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

  const statusMap: Record<number, { label: string; bgColor: string }> = {
    1: { label: "Pending", bgColor: "bg-yellow-100 text-yellow-700" },
    2: { label: "Accepted", bgColor: "bg-blue-100 text-blue-700" },
    3: { label: "Completed", bgColor: "bg-green-100 text-green-700" },
    4: { label: "Cancelled", bgColor: "bg-red-100 text-red-700" },
  };

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between h-20 px-4 text-black bg-white border-b">
        <button
          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium">Process Order</h1>

        <div className="relative flex items-center justify-center w-8 h-8 text-white rounded-full bg-emerald-500">

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>          <span className="sr-only">Notifications</span>
        </div>
      </header>
      <div className="max-w-md p-4 mx-auto space-y-4">
        {/* Header Section */}
        <div className="max-w-sm p-4 mx-auto bg-white border rounded-lg shadow-sm">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-medium text-gray-800">Recent Order</h3>
            <div className="text-sm text-right text-gray-500">
              <p>Date - {new Date().toLocaleDateString()}</p>
              <p>Time - {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
          <hr className="my-4 border-dashed" />
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-gray-600">Total Received Order</p>
            <p className="text-3xl font-bold text-gray-800">
              {orders.filter((order: any) => order.statusId === 2).length}

            </p>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-3">

          {orders.filter((order: any) => order.statusId === 2)
            .map((order: any, index: any) => (
              <Link href={`/request-cart?orderId=${order.orderId}`} key={index}>

                <div key={index} className="p-4 m-1 text-black bg-white border rounded-lg shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-50">
                      <Package className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-green-700">Order Id: {order.orderId}</h3>
                          <p className="text-sm text-muted-foreground">
                            Items: {order.totalItem} · Quantity: {order.totalQuantity}
                          </p>
                        </div>
                        <button className="px-4 py-1 text-xs text-white bg-green-400 rounded-full">
                          <span className="sr-only">View order details</span>
                          {statusMap[order.statusId]?.label || "Unknown"}
                        </button>
                      </div>
                      <div className="flex gap-2 mt-2 text-sm">
                        <p className="text-muted-foreground">Placed On :</p>
                        <p className="text-muted-foreground ">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}


        </div>
      </div>
    </>
  )
}