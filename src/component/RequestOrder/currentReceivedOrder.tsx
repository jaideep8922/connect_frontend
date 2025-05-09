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

export default function CurrentReceivedOrderMain() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [customId, setCustomId] = useState<string | null>(null); // State to store customId

  // Ensure we are working with the client-side by checking if window is defined
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData: any = JSON.parse(localStorage.getItem("userDetails") || "{}");

      // Check if localStorage has valid data
      if (localData?.data?.customId) {
        setCustomId(localData.data.customId);
      } else {
        console.error("User details not found in localStorage.");
      }
    }
  }, []); // Runs only once on mount

  // Fetch orders once customId is available
  useEffect(() => {
    if (customId) {
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/get-order-history-by-supplier-id`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ customId }),
            }
          );

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
  }, [customId]); // Only fetch orders when customId is available

  const statusMap: Record<number, { label: string; bgColor: string }> = {
    1: { label: "Pending", bgColor: "bg-yellow-100 text-yellow-700" },
    2: { label: "Accepted", bgColor: "bg-blue-100 text-blue-700" },
    3: { label: "Completed", bgColor: "bg-green-100 text-green-700" },
    4: { label: "Cancelled", bgColor: "bg-red-100 text-red-700" },
  };

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between h-20 px-4 bg-white border-b">
        <button
          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-black cursor-pointer" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium text-black">Request Order</h1>

        <div className="relative flex items-center justify-center w-8 h-8 text-white rounded-full bg-emerald-500">
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

      <div className="max-w-md p-4 mx-auto space-y-4">
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
            {orders.filter((order) => order.statusId === 1).length}
            </p>
          </div>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="space-y-3">
            {orders.
             filter((order) => order.statusId === 1).
            map((order, index) => (
              // <Link href="/request-cart" key={index}>

              <Link href={`/request-cart?orderId=${order.orderId}`} key={index}>
                <div className="p-4 m-1 text-black bg-white border rounded-lg shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-50">
                      <Package className="h-5 w-5 text-[#3A6B34]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-blue-700">Order Id: {order.orderId}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
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
                        <p className="mt-4 text-muted-foreground">Created At: {new Date(order.createdAt).toLocaleString()}</p>
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
