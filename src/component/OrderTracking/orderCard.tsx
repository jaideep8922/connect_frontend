"use client";
import { Package } from "lucide-react";

interface OrderStatus {
  id: number;
  label: string;
  date?: string;
  isCompleted: boolean;
}

interface OrderCardProps {
  id: number;
  orderId: string;
  totalItem: number;
  totalQuantity: number;
  statusId: number;
  notes?: string;
}

export default function OrderCard({ order }: { order: OrderCardProps }) {
  // Define statuses based on statusId
  const statuses: OrderStatus[] = [
    { id: 1, label: "Order Placed", isCompleted: order.statusId >= 1 },
    { id: 2, label: "Order Confirmed", isCompleted: order.statusId >= 2 },
    { id: 3, label: "Dispatched", isCompleted: order.statusId >= 3 },
    { id: 4, label: "Out for Delivery", isCompleted: order.statusId >= 4 },
    { id: 5, label: "Delivered", isCompleted: order.statusId === 5 },
  ];

  return (
    <div className="w-full max-w-md rounded-lg border bg-white p-4 shadow-sm my-2">
      {/* Order Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
          <Package className="h-5 w-5 text-blue-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium">Order Id: {order.orderId}</h3>
          <p className="text-xs text-gray-500">
            Items: {order.totalItem} · Quantity: {order.totalQuantity}
          </p>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="mt-4">
        {statuses.map((status, index) => (
          <div key={index} className="relative flex items-start gap-3 mb-4">
            {/* Status Dot */}
            <div className="relative flex flex-col items-center">
              <div className="relative flex items-center">
                {/* Circle with blinking border animation */}
                <div
                  className={`h-4 w-4 rounded-full z-10 mt-[3px] border-2 ${status.isCompleted
                    ? "animate-border-blink border-sky-400"
                    : "bg-gray-300"
                    }`}
                ></div>

                {/* Vertical line with blinking border */}
                {index < statuses.length - 1 && (
                  <div
                    className={`absolute top-4 bottom-0 w-[2px] ${statuses[index + 1].isCompleted
                      ? "animate-border-blink border-sky-400"
                      : "bg-gray-300"
                      }`}
                  ></div>
                )}
              </div>
            </div>

            {/* Status Label */}
            <div>
              <p
                className={`text-sm ${status.isCompleted
                  ? "text-gray-900 font-medium"
                  : "text-gray-400"
                  }`}
              >
                {status.label}
              </p>
              <p className="text-xs text-blue-600">
                {status.isCompleted ? "Completed" : "Pending"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Notes */}
      {order.notes && (
        <div className="mt-2 p-2 bg-gray-100 rounded-md text-sm text-gray-600">
          Notes: {order.notes}
        </div>
      )}
    </div>
  );
}
