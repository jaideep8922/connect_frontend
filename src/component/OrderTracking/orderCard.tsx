"use client";
import { Package } from "lucide-react";
import { formatDate } from "../global/productCard";
import { useState } from "react";

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
  createdAt: string;
}

export default function OrderCard({ order }: { order: OrderCardProps }) {
  // Define statuses based on statusId
  const statuses: OrderStatus[] = [
    { id: 1, label: "Order Placed", isCompleted: order.statusId >= 1 },
    { id: 2, label: "Order Confirmed", isCompleted: order.statusId >= 2 },
    { id: 3, label: "Processing", isCompleted: order.statusId >= 3 },
    { id: 4, label: "Delivered", isCompleted: order.statusId >= 4 },
    { id: 5, label: "Cancelled", isCompleted: order.statusId === 5 },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-sm">
      {/* Order Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F1FFF3]">
          <Package className="h-5 w-5 text-[#3A6B34]" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-black">Order Id #{order.orderId}</h3>
          <p className="text-xs text-gray-500">Placed on {formatDate(order?.createdAt)}</p>
          <p className="text-xs text-gray-600">
            Items: {order.totalItem} · Quantity: {order.totalQuantity}
          </p>
        </div>
        <button
          className="text-lg aspect-square w-10 font-semibold text-[#3A6B34] bg-[#F1FFF3] px-2 py-1 rounded-full hover:bg-[#E0F0D9]"
          onClick={toggleIsOpen}
        >
          {isOpen ? "<" : ">"}
        </button>
      </div>

      {/* Status Timeline */}
      <div className={`${isOpen ? "block" : "hidden"}`}>
        <div className="mt-4">
          {statuses.map((status, index) => (
            <div key={index} className="relative flex items-start gap-3 mb-4">
              {/* Status Dot */}
              <div className="relative flex flex-col items-center">
                <div className="relative flex items-center">
                  {/* Circle with blinking border animation */}
                  <div
                    className={`h-4 w-4 rounded-full text-[#3A6B34] z-10 mt-[3px] border-2 ${status.isCompleted
                      ? "animate-border-blink  border-sky-400"
                      : "bg-gray-300"
                      }`}
                  ></div>

                  {/* Vertical line with blinking border */}
                  {index < statuses.length - 1 && (
                    <div
                      className={`absolute top-4 bottom-0  text-[#3A6B34] w-[2px] ${statuses[index + 1].isCompleted
                        ? "animate-border-blink text-[#3A6B34] border-sky-400"
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
                <p className="text-xs text-[#3A6B34]">
                  {status.isCompleted ? "Completed" : "Pending"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Notes */}
        {order.notes && (
          <div className="p-2 mt-2 text-sm text-gray-600 bg-gray-100 rounded-md">
            Notes: {order.notes}
          </div>
        )}
      </div>
    </div>
  );
}
