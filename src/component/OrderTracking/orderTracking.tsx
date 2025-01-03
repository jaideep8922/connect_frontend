"use client"
import { ArrowLeft } from "lucide-react";
import OrderCard from "./orderCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

const OrderTracker = () => {
  const orders = [
    {
      id:1,
      orderNumber: "#90897",
      amount: "15.90",
      items: 10,
      isExpanded: true,
      statuses: [
        {
          status: "Order placed",
          date: "Oct 19 2021",
          isCompleted: true,
        },
        {
          status: "Order confirmed",
          date: "Oct 20 2021",
          isCompleted: true,
        },
        {
          status: "Order shipped",
          date: "Oct 20 2021",
          isCompleted: true,
        },
        {
          status: "Out for delivery",
          date: "pending",
          isPending: true,
        },
        {
          status: "Order delivered",
          date: "pending",
          isCompleted: false,
        },
      ],
    },
    {
      id:2,
      orderNumber: "#90897",
      amount: "15.90",
      items: 10,
      statuses: [
        {
          status: "Order Delivered",
          date: "Aug 29 2021",
          isCompleted: true,
        },
      ],
    },
    {
      id:3,
      orderNumber: "#90897",
      amount: "15.90",
      items: 10,
      statuses: [
        {
          status: "Order Delivered",
          date: "Aug 29 2021",
          isCompleted: true,
        },
      ],
    },
  ]

  const router = useRouter()

  return (
    <>
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
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
      <div className="flex min-h-screen flex-col items-center gap-4 bg-gray-50 p-4">
      <Link href='/order-track-single' className="w-full">

        {orders.map((order, index) => (
          <OrderCard key={index} {...order} />
        ))}
            </Link>
      </div>
    </>
  );
};

export default OrderTracker;