interface OrderCardProps {
  orderId: string;
  date?: string;
  time?: string;
  totalItem: number;
  totalQuantity: number;
  totalAmount: number;
  statusId: number; // Change to number to match API response
  notes: string;
  createdAt: string;
}

export function OrderHistoryCard({
  order
}: any) {
  const statusMapping: { [key: number]: string } = {
    1: "Pending",
    2: "Accepted",
    3: "Processing",
    4: "Completed",
    5: "Cancelled",
  };

  const statusColors: { [key: string]: string } = {
    Pending: "bg-yellow-100 text-yellow-800",
    Accepted: "bg-pink-100 text-pink-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
    Processing: "bg-blue-100 text-blue-800",
  };

  // Map statusId to string status
  const status = statusMapping[order.statusId];

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = new Date(order.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  console.log("order", order)

  return (
    <div className="p-4 m-1 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Order Id: {order.orderId}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Date: {formattedDate}</span>
            <span>Time: {formattedTime}</span>
          </div>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${statusColors[status]
            }`}
        >
          {status}
        </span>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">TOTAL ITEM</span>
          <span className="font-medium text-gray-600">{order.totalItem}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">TOTAL QUANTITY</span>
          <span className="font-medium text-gray-600">{order.totalQuantity}</span>
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-gray-600">Total Amount:</span>
          <span className="text-lg font-semibold text-gray-600">
            ₹{order?.OrderProductDetails?.reduce((acc: number, item: any) => acc + item.price, 0)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-400">Note: {order.notes}</span>
        </div>
        {order.filePath?.length > 0 && (
          <div>
            <span className="font-medium">Transport Receipt: </span>
            <img src={order.filePath} alt="img" className="mt-3" />
          </div>
        )}


      </div>
    </div>
  );
}
