"use client";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { OrderHistoryCard } from "./orderHistoryCard";

export default function OrdersHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Map numeric statusId to status labels
  const statusMapping: { [key: number]: string } = {
    1: "Pending",
    2: "Accepted",
    3: "Processing",
    5: "Completed",
    4: "Cancelled",
  };

  const [customId, setCustomId] = useState<string | null>(null);
  const [userData, setUserData] = useState<string | null>(null);

  // Fetch localStorage data only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
      const customId = localData?.data?.customId || null;
      setCustomId(customId);
      
      const userType = localStorage.getItem("userType");
      setUserData(userType);
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!customId || !userData) {
        return;
      }

      try {
        setLoading(true);
        let response;

        // Fetch orders based on user type
        if (userData === "Retailer") {
          response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/get-order-history-by-retailer-id`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ customId }),
            }
          );
        } else if (userData === "Supplier") {
          response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/get-order-history-by-supplier-id`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ customId }),
            }
          );
        }

        if (!response?.ok) {
          throw new Error(`Failed to fetch: ${response?.statusText}`);
        }

        const data = await response.json();

        // Map statusId to status labels in fetched orders
        const mappedOrders = data.data.map((order: { statusId: number }) => ({
          ...order,
          status: statusMapping[order.statusId],
        }));

        setOrders(mappedOrders || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch orders if user type and customId are available
    if (userData && customId) {
      fetchOrders();
    }
  }, [userData, customId]);

  // Filter orders based on the selected status
  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order: any) => order.status === selectedStatus);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
        <button
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft
            className="h-5 w-5 cursor-pointer"
            onClick={() => window.history.back()}
          />
        </button>

        <h1 className="text-lg font-medium">Order History</h1>

        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold">
            {orders.length}
          </span>
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
            className="lucide lucide-clipboard-list"
          >
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M12 11h4" />
            <path d="M12 16h4" />
            <path d="M8 11h.01" />
            <path d="M8 16h.01" />
          </svg>
          <span className="sr-only">Notifications</span>
        </div>
      </header>

      <div className="min-h-screen bg-[#FFEFD3] p-2">
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 pt-2 border-b mb-4">
            {["All", "Pending", "Accepted", "Completed", "Cancelled"].map(
              (status) => (
                <button
                  key={status}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    selectedStatus === status
                      ? "bg-[#6D2323] text-white "
                      : "bg-white text-gray-600 hover:bg-gray-100 border"
                  }`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </button>
              )
            )}
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order:any) => (
              // <Link href="/order-history-single"
                <OrderHistoryCard order={order} />
              // </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </>
  );
}
