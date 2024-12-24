"use client"
import { Box, CheckCircle2, MapPin, Truck, Package, ArrowLeft } from 'lucide-react'

interface OrderStep {
  title: string
  description: string
  icon: JSX.Element
  isCompleted: boolean
  isPending: boolean
}

export default function OrderTrackingSingle() {
  const steps: OrderStep[] = [
    {
      title: "Order #90897",
      description: "Items: 10 · Items: $16.90",
      icon: <Box className="w-5 h-5" />,
      isCompleted: true,
      isPending: false,
    },
    {
      title: "Order Placed",
      description: "October 31 2021",
      icon: <Box className="w-5 h-5" />,
      isCompleted: true,
      isPending: false,
    },
    {
      title: "Order Confirmed",
      description: "October 31 2021",
      icon: <CheckCircle2 className="w-5 h-5" />,
      isCompleted: true,
      isPending: false,
    },
    {
      title: "Order Shipped",
      description: "October 31 2021",
      icon: <MapPin className="w-5 h-5" />,
      isCompleted: true,
      isPending: false,
    },
    {
      title: "Out for Delivery",
      description: "Pending",
      icon: <Truck className="w-5 h-5" />,
      isCompleted: false,
      isPending: true,
    },
    {
      title: "Order Delivered",
      description: "Pending",
      icon: <Package className="w-5 h-5" />,
      isCompleted: false,
      isPending: true,
    },
  ]

  return (
    <div>
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-2">
        <button
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium">Order Tracking</h1>

        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold">
            2
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
          <span className="sr-only">Notifications</span>
        </div>
      </header>
      <div className="space-y-4 max-w-md mx-auto p-3">
        {steps.map((step, index) => (
          <div key={step.title} className="relative">
            
            <div className="flex items-start space-x-2 bg-white p-4 shadow-md border rounded-lg">
              <div
                className={`rounded-full p-1 
                  ${
                    step.isCompleted
                      ? "bg-blue-500 text-white"
                      : step.isPending
                      ? "bg-gray-100 text-gray-400"
                      : "bg-gray-200 text-gray-500"
                  }`}
              >
                {step.icon}
              </div>
              <div>
                <h3
                  className={`font-medium ${
                    step.isPending ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm ${
                    step.isPending ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}