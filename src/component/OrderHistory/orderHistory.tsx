"use client"
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { OrderHistoryCard } from "./orderHistoryCard";
import Link from "next/link";

const orders = [
  {
    id: 1,
    orderId: "4124353994",
    date: "05/21/2024",
    time: "14:35 p.m",
    totalItems: 33,
    totalQuantity: 158,
    totalAmount: 0.0,
    status: "Pending" as const,
  },
  {
    id: 2,
    orderId: "4124353993",
    date: "05/21/2024",
    time: "14:35 p.m",
    totalItems: 33,
    totalQuantity: 158,
    totalAmount: 0.0,
    status: "Accepted" as const,
  },
  {
    id: 3,
    orderId: "4124353992",
    date: "05/21/2024",
    time: "14:35 p.m",
    totalItems: 33,
    totalQuantity: 158,
    totalAmount: 0.0,
    status: "Completed" as const,
  },
  {
    id: 4,
    orderId: "4124353991",
    date: "05/21/2024",
    time: "14:35 p.m",
    totalItems: 33,
    totalQuantity: 158,
    totalAmount: 0.0,
    status: "Cancelled" as const,
  },
];

export default function OrdersHistoryPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // Filter orders based on the selected status
  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
        <button
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium">Order History</h1>

        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold">
            2
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>
          <span className="sr-only">Notifications</span>
        </div>
      </header>

      <div className="min-h-screen bg-gray-50 p-2">
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 pt-2 border-b mb-4">
            {["All", "Pending", "Accepted", "Completed", "Cancelled"].map(
              (status: any) => (
                <button
                  key={status}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${selectedStatus === status
                    ? "bg-blue-600 text-white "
                    : "bg-white text-gray-600 hover:bg-gray-100 border"
                    }`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </button>
              )
            )}
          </div>

          {/* Display filtered orders */}
          {/* {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Link href="/order-history-single">
              <OrderHistoryCard key={order.orderId} {...order} />
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No orders found.</p>
          )} */}

          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Link href="/order-history-single" key={order.orderId}>
                <OrderHistoryCard {...order} />
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No orders found.</p>
          )}

        </div>
      </div>
    </>
  );
}