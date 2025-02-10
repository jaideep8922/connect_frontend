

"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const statusMapping: { [key: number]: string } = {
  1: "Pending",
  2: "Accepted",
  3: "Processing",
  4: "Completed",
  5: "Cancelled",
};

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("userDetails");
      const userTypeData = localStorage.getItem("userType");

      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          const sellerIdFromLocalStorage = parsedData?.data?.customId || null;
          setSellerId(sellerIdFromLocalStorage);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }

      if (userTypeData) {
        setUserType(userTypeData);
      }
    }
  }, []);

  console.log("sellerId:", sellerId);
  console.log("userType:", userType);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!sellerId || !userType) return; // ✅ Ensure sellerId and userType exist before making API call

      try {
        const apiUrl =
          userType === "Retailer"
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/get-order-history-by-retailer-id`
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/get-order-history-by-supplier-id`;

        const response = await axios.post(apiUrl, {
          customId: sellerId,
        });

        if (response.data.success) {
          const orders = response.data.data;
          console.log("ordersorders", orders);
          const formattedNotifications = orders.map((order: any) => {
            const formattedTime = new Date(order?.updatedAt).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
          
            return {
              id: order.id,
              title: `Order Status Updated`,
              description: `Your order ${order.orderId} status changed.`,
              time: formattedTime, // ✅ Properly formatted time
              read: false,
              orderStatus: statusMapping[order.statusId] || "Unknown Status", // ✅ Map statusId to text
            };
          });
          
          // const formattedNotifications = orders.map((order: any) => ({
          //   id: order.id,
          //   title: `Order Status Updated`,
          //   description: `Your order ${order.orderId} status changed.`,
          //   time: `${order?.updatedAt}`,
          //   read: false,
          //   orderStatus: statusMapping[order.statusId] || "Unknown Status", // ✅ Map statusId to text
          // }));

          setNotifications(formattedNotifications);
        }
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, [sellerId, userType]);

  console.log("notifications", notifications);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <header className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-800">Notifications</h1>
        </header>
        <ul>
          {notifications.map((notification: any) => (
            <li
              key={notification.id}
              className={`p-4 flex items-start space-x-4 ${
                notification.read ? "bg-[#FFEFD3]" : "bg-blue-50"
              } border-b border-gray-200 last:border-b-0`}
            >
              <div className="flex-1">
                <h2 className="text-sm font-medium text-gray-900">
                  {notification.title}
                </h2>
                <p className="text-sm text-gray-600">{notification.description}</p>
                <p className="text-sm text-gray-600">
                  <strong className="text-[#6D2323]">Status:</strong> {notification.orderStatus}
                </p>
                <span className="text-xs text-gray-400">{notification.time}</span>
              </div>
              {!notification.read && (
                <span className="inline-block w-2.5 h-2.5 bg-[#6D2323] rounded-full"></span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notification;