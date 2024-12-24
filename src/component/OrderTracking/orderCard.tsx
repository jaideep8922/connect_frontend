"use client";
import { Package } from "lucide-react";

interface OrderStatus {
  status: string;
  date: string;
  isCompleted: boolean;
  isPending?: boolean;
}

interface OrderCardProps {
  orderNumber: string;
  amount: string;
  items: number;
  statuses: OrderStatus[];
  isExpanded?: boolean;
}

export default function OrderCard({
  orderNumber,
  amount,
  items,
  statuses,
  isExpanded = false,
}: any) {
  return (
    <div className="w-full max-w-md rounded-lg border bg-white p-4 shadow-sm my-2">
      {/* Order Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
          <Package className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h3 className="text-sm font-medium">Order {orderNumber}</h3>
          <p className="text-xs text-gray-500">
            Items: {items} · Items: ${amount}
          </p>
        </div>
      </div>

      {/* Order Status Timeline */}
      {isExpanded && (
        <div className="mt-4">
          {statuses.map((status:any, index:any) => (
            <div key={index} className="relative flex gap-3">
              {/* Vertical line */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`h-2 w-2 rounded-full z-10 ${
                    status.isCompleted
                      ? "bg-blue-500"
                      : status.isPending
                      ? "bg-gray-300"
                      : "bg-gray-200"
                  }`}
                ></div>
                {index < statuses.length - 1 && (
                  <div
                    className={`absolute top-2 bottom-0 w-[2px] ${
                      status.isCompleted ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>

              {/* Status Details */}
              <div>
                <p
                  className={`text-sm ${
                    status.isCompleted
                      ? "text-gray-900 font-medium mt-[-5px]"
                      : status.isPending
                      ? "text-gray-600"
                      : "text-gray-400"
                  }`}
                >
                  {status.status}
                </p>
                <p className="text-xs text-gray-500 py-1 mb-2">{status.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
