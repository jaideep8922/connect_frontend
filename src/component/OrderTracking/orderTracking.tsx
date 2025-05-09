"use client"
import { ArrowLeft } from "lucide-react";
import OrderCard from "./orderCard";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const OrderTracker = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customId, setCustomId] = useState<string | null>(null); // State to store customId

  // Fetch customId safely inside useEffect to ensure it runs client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
      setCustomId(localData?.data?.customId || null); // Set customId from localStorage
    }
  }, []);

  // Fetch orders only when customId is available
  useEffect(() => {
    const fetchOrders = async () => {
      if (!customId) return; // Don't fetch if customId is not available

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/get-order-history-by-retailer-id`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customId }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data.data || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customId]); // Only fetch orders when customId is updated

  console.log("orders", orders);

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between h-20 px-4 bg-white border-b">
        <button
          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-black cursor-pointer" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium text-black">Order Tracking</h1>

        <div className="relative flex items-center justify-center w-8 h-8 text-white rounded-full bg-emerald-500">
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold">
            {orders.length}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>
          <span className="sr-only">Notifications</span>
        </div>
      </header>
      <div className="flex min-h-screen flex-col items-center gap-4 bg-[#FFFFFF] p-4">
        {/* <Link href='/order-track-single' className="w-full">

        {orders.map((order:any, index) => (
          <OrderCard key={index} {...order} />
        ))}
            </Link> */}

        {orders.length > 0 ? (
          orders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))
        ) : (
          <p className="text-black">No orders available.</p>
        )}

      </div>
    </>
  );
};

export default OrderTracker;