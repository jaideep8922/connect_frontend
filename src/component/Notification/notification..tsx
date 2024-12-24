import React from "react";

const notifications = [
  {
    id: 1,
    title: "Order Shipped",
    description: "Your order #1234 has been shipped.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "New Message",
    description: "You have received a new message from John.",
    time: "5 hours ago",
    read: true,
  },
  {
    id: 3,
    title: "Payment Successful",
    description: "Your payment for order #5678 was successful.",
    time: "1 day ago",
    read: true,
  },
];

const Notification = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <header className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-800">Notifications</h1>
        </header>
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 flex items-start space-x-4 ${
                notification.read ? "bg-gray-50" : "bg-blue-50"
              } border-b border-gray-200 last:border-b-0`}
            >
              <div className="flex-1">
                <h2 className="text-sm font-medium text-gray-900">
                  {notification.title}
                </h2>
                <p className="text-sm text-gray-600">{notification.description}</p>
                <span className="text-xs text-gray-400">{notification.time}</span>
              </div>
              {!notification.read && (
                <span className="inline-block w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notification;
