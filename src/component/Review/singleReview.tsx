"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Package, CheckCircle2, Truck, Home, ThumbsUp, ArrowLeft } from 'lucide-react'
import { Star, Pencil } from 'lucide-react';


interface OrderStatus {
    id: number
    title: string
    timestamp: string
    icon: React.ReactNode
    status: "completed" | "current" | "pending"
}

const orderStatuses: OrderStatus[] = [
    {
        id: 1,
        title: "Order #90987",
        timestamp: "October 21, 2021",
        icon: <Package className="h-5 w-5" />,
        status: "completed",
    },
    {
        id: 2,
        title: "Order Confirmed",
        timestamp: "October 21, 2021",
        icon: <CheckCircle2 className="h-5 w-5" />,
        status: "completed",
    },
    {
        id: 3,
        title: "Order Shipped",
        timestamp: "October 22, 2021",
        icon: <Package className="h-5 w-5" />,
        status: "completed",
    },
    {
        id: 4,
        title: "Out for Delivery",
        timestamp: "Pending",
        icon: <Truck className="h-5 w-5" />,
        status: "current",
    },
    {
        id: 5,
        title: "Order Delivered",
        timestamp: "Pending",
        icon: <Home className="h-5 w-5" />,
        status: "pending",
    },
]

export default function SingleReviewDetails() {
    const router = useRouter();
    //   const { id } = router.query
    const id = "#90897"
    const [order, setOrder] = useState<any>(null);
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState<number>(0)
    const [hover, setHover] = useState<number>(0)
    const [feedback, setFeedback] = useState('')

    const handleOpen = () => {
        setOpen(true)
    }

    // Simulate fetching order data
    useEffect(() => {
        if (id) {
            const fetchedOrder = orders.find((order) => order.orderId === id); // You would typically fetch this from an API
            setOrder(fetchedOrder);
        }
    }, [id]);

    if (!order) return <div>Loading...</div>;


    return (
        <>
            <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
                <button
                    className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
                    aria-label="Go back"
                >
                    <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
                </button>

                <h1 className="text-lg font-medium">Reviews</h1>

                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold">
                        2
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>

                    <span className="sr-only">Notifications</span>
                </div>
            </header>
            <div className="mx-auto max-w-md p-6">
                <div className="mb-8">
                    <div className="text-sm text-muted-foreground">Order ID: #90987</div>
                    <div className="text-sm text-muted-foreground">Items: $15.00</div>
                </div>

                <div className="relative">
                    {orderStatuses.map((status, index) => (
                        <div key={status.id} className="relative pb-12 last:pb-0">
                            {index !== orderStatuses.length - 1 && (
                                <div
                                    className={`absolute left-6 top-8 -ml-px h-full w-0.5 ${status.status === "completed" ? "bg-blue-600" : "bg-gray-200"
                                        }`}
                                    aria-hidden="true"
                                />
                            )}
                            <div className="relative flex items-start space-x-3">
                                <div
                                    className={`relative flex h-12 w-12 items-center justify-center rounded-full ${status.status === "completed"
                                        ? "bg-blue-600 text-white"
                                        : status.status === "current"
                                            ? "bg-blue-100 text-blue-600"
                                            : "bg-gray-100 text-gray-400"
                                        }`}
                                >
                                    {status.icon}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium text-gray-900">{status.title}</div>
                                    <div className="text-sm text-gray-500">{status.timestamp}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="flex items-center text-white justify-center p-4 mt-8 w-full bg-blue-600 hover:bg-blue-700" onClick={handleOpen}>
                    <ThumbsUp className="mr-2 h-4 w-4 text-white" />
                    Give Review
                </button>
                {/* <p className="mt-2 text-center text-sm text-muted-foreground">
      Give your valuable feedback.
    </p> */}

                {open && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="p-6 space-y-4  bg-white rounded-lg shadow-lg m-2">
                            <div className="text-center space-y-2">
                                <h2 className="text-xl font-semibold text-gray-900">What do you think?</h2>
                                <p className="text-sm text-gray-500">
                                    Please give your rating by clicking on the stars below
                                </p>
                            </div>

                            <div className="flex justify-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${(hover || rating) >= star
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                                } transition-colors duration-200`}
                                        />
                                    </button>
                                ))}
                            </div>

                            <div className="relative">
                                <Pencil className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Tell us about your experience"
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                                />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}

const orders = [
    {
        orderId: "#90897",
        placedDate: "October 19 2021",
        items: 10,
        totalPrice: "16.90",
        deliveryDate: "Aug 29 2021",
    },
    {
        orderId: "#90898",
        placedDate: "October 20 2021",
        items: 5,
        totalPrice: "8.50",
        deliveryDate: "Aug 30 2021",
    },
    // Add other orders here
];
