"use client"
import { ArrowLeft, Package } from 'lucide-react'
import Link from 'next/link'

interface Order {
  id: any
  items: number
  price: number
  status: string
  date: string
}

export default function CurrentRejectedOrderMain() {
  const orders: Order[] = [
    {
      id: 1,
      items: 18,
      price: 16.90,
      status: "Rejected",
      date: "Aug 29 2021"
    },
    {
      id: 2,
      items: 18,
      price: 16.90,
      status: "Rejected",
      date: "Aug 29 2021"
    },
    {
      id: 3,
      items: 118,
      price: 16.90,
      status: "Rejected",
      date: "Aug 29 2021"
    }
  ]

  return (
    <>
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
        <button
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium">Rejected Order</h1>

        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
         
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>          <span className="sr-only">Notifications</span>
        </div>
      </header>
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Header Section */}
        <div className="max-w-sm mx-auto rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
                <h3 className="text-lg font-medium text-gray-800">Recent Order</h3>
                <div className="text-sm text-gray-500 text-right">
                    <p>Date - 06-07-2024</p>
                    <p>Time - 10:15 a.m</p>
                </div>
            </div>
            <hr className="my-4 border-dashed" />
            <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-gray-600">Total Received Order</p>
                <p className="text-3xl font-bold text-gray-800">1326</p>
            </div>
        </div>        

        {/* Orders List */}
        <div className="space-y-3">
        <Link href='/single-process'>

          {orders.map((order, index) => (
            <div key={index} className="p-4 border shadow-sm rounded-lg m-1">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Package className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Order #{order.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        Items: {order.items} · Items: ${order.price.toFixed(2)}
                      </p>
                    </div>
                    <button className="text-white bg-red-500 rounded-full text-xs px-4 py-1">
                      <span className="sr-only">View order details</span>
                      {order.status}
                    </button>
                  </div>
                  <div className="flex  gap-2 mt-2 text-sm">
                    <p className="text-muted-foreground">Placed On :</p>
                    <p className="text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Link>

        </div>
      </div>
    </>
  )
}