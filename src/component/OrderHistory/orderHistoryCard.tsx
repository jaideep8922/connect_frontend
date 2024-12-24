interface OrderCardProps {
    orderId: string
    date: string
    time: string
    totalItems: number
    totalQuantity: number
    totalAmount: number
    status: 'Pending' | 'Accepted' | 'Completed' | 'Cancelled'
  }
  
  export function OrderHistoryCard({
    orderId,
    date,
    time,
    totalItems,
    totalQuantity,
    totalAmount,
    status,
  }: OrderCardProps) {
    const statusColors = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Accepted: 'bg-pink-100 text-pink-800',
      Completed: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
    }
  
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm m-1">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Order #{orderId}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Date: {date}</span>
              <span>Time: {time}</span>
            </div>
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              statusColors[status]
            }`}
          >
            {status}
          </span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">TOTAL ITEM</span>
            <span className="font-medium">{totalItems}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">TOTAL QUANTITY</span>
            <span className="font-medium">{totalQuantity}</span>
          </div>
          <div className="mt-4 flex justify-between">
            <span className="text-gray-600">Total Amount:</span>
            <span className="text-lg font-semibold">₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    )
  }
  
  