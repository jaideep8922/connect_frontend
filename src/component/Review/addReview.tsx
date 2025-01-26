"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, ChevronDown, ChevronUp, Package, Star } from 'lucide-react'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';


export default function AddReviewPage() {
    const router = useRouter()

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const localData: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const customId = localData?.data?.customId;

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:4000/order/get-order-history-by-retailer-id",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ customId }),
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch orders: ${response.statusText}`);
            }

            const data = await response.json();
            setOrders(data.data || []);
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders()
    }, [])

    console.log("orders", orders)

    return (
        <>
            <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
                <button
                    className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
                    aria-label="Go back"
                >
                    <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
                </button>

                <h1 className="text-lg font-medium">Review</h1>

                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold">
                        2
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>

                    <span className="sr-only">Notifications</span>
                </div>
            </header>
            <div className="min-h-screen bg-gray-50 p-4">

                <div className="mx-auto max-w-2xl space-y-3" 
                // onClick={() => router.push('/single-review')}
                >
                    {orders.map((order: any, index) => (
                        <OrderCard key={order.id} order={order} />

                    ))}
                </div>
            </div>
        </>
    )
}

// function OrderCard({ order }: any) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isReviewOpen, setIsReviewOpen] = useState(false);
//     const [reviewText, setReviewText] = useState("");
//     const [rating, setRating] = useState(0);
//     const [hover, setHover] = useState<number>(0)

//     // Map statusId to corresponding status text
//     const statusText: Record<number, string> = {
//         1: "Pending",
//         2: "Accepted",
//         3: "Processing",
//         4: "Cancelled",
//         5: "Completed",
//     };

//     const handleReviewSubmit = () => {
//         console.log("Review Submitted:", reviewText);
//         console.log("Rating:", rating);
//         setIsReviewOpen(false); // Close the popup after submitting
//     };

//     return (
//         <div className="rounded-xl bg-white p-4 shadow-sm">
//             <div className="flex items-start justify-between">
//                 <div className="flex gap-3">
//                     <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
//                         <Package className="h-6 w-6 text-blue-500" />
//                     </div>
//                     <div>
//                         <h3 className="font-semibold">
//                             Order <span className="text-blue-500">{order.orderId}</span>
//                         </h3>
//                         <p className="text-sm text-gray-500">
//                             Placed on {new Date(order.createdAt).toLocaleDateString()}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                             Items: {order.totalItem} | Total Quantity: {order.totalQuantity}
//                         </p>
//                     </div>
//                 </div>
//                 <button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="rounded-full p-2 hover:bg-gray-50"
//                 >
//                     {isOpen ? (
//                         <ChevronUp className="h-5 w-5 text-gray-400" />
//                     ) : (
//                         <ChevronDown className="h-5 w-5 text-gray-400" />
//                     )}
//                 </button>
//             </div>
//             {isOpen && (
//                 <div className="mt-4 border-t pt-4">
//                     <p className="text-sm text-gray-500">{order.notes}</p>
//                     <div className="flex items-center gap-2 mt-2">
//                         <div
//                             className={`h-2 w-2 rounded-full ${
//                                 order.statusId === 4
//                                     ? "bg-red-500"
//                                     : order.statusId === 5
//                                     ? "bg-green-500"
//                                     : "bg-yellow-500"
//                             }`}
//                         />
//                         <span className="text-sm text-gray-500">
//                             {statusText[order.statusId] || "Unknown Status"}
//                         </span>
//                     </div>
//                     {/* Review Icon */}
//                     {order.statusId === 3 && (
//                         <div className="mt-4 flex items-center gap-2 cursor-pointer" onClick={() => setIsReviewOpen(true)}>
//                             <Star className="h-5 w-5 text-yellow-400" />
//                             <span className="text-sm text-gray-500">Leave a Review</span>
//                         </div>
//                     )}
//                 </div>
//             )}

//             {/* Review Modal */}
//             {isReviewOpen && (
//                 <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 p-3">
//                     <div className="bg-white p-6 rounded-lg w-96">
//                         <h3 className="text-lg font-semibold">Leave a Review</h3>
//                         <div className="flex justify-center space-x-1">
//                                 {[1, 2, 3, 4, 5].map((star) => (
//                                     <button
//                                         key={star}
//                                         onClick={() => setRating(star)}
//                                         onMouseEnter={() => setHover(star)}
//                                         onMouseLeave={() => setHover(0)}
//                                         className="focus:outline-none"
//                                     >
//                                         <Star
//                                             className={`w-8 h-8 ${(hover || rating) >= star
//                                                 ? 'fill-yellow-400 text-yellow-400'
//                                                 : 'text-gray-300'
//                                                 } transition-colors duration-200`}
//                                         />
//                                     </button>
//                                 ))}
//                             </div>
//                         <div className="mt-4">
//                             <label htmlFor="review" className="block text-sm text-gray-500">
//                                 Your Review
//                             </label>
//                             <textarea
//                                 id="review"
//                                 rows={4}
//                                 value={reviewText}
//                                 onChange={(e) => setReviewText(e.target.value)}
//                                 className="w-full mt-2 p-2 border border-gray-300 rounded"
//                             />
//                         </div>
//                         <div className="mt-4 flex justify-end gap-2">
//                             <button
//                                 onClick={() => setIsReviewOpen(false)}
//                                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleReviewSubmit}
//                                 className="px-4 py-2 bg-blue-500 text-white rounded"
//                             >
//                                 Submit Review
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


function OrderCard({ order }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

        const statusText: Record<number, string> = {
        1: "Pending",
        2: "Accepted",
        3: "Processing",
        4: "Cancelled",
        5: "Completed",
    };

    // Handle Review Submission
    const handleReviewSubmit = async () => {
        if (!reviewText || rating === 0) {
            toast.error("Please provide a review and rating.");
            return;
        }

        const reviewData = {
            orderId: order.orderId,  // Assuming order has orderId
            review: reviewText,
            ratingStars: rating
        };

        try {
            const response = await fetch("http://localhost:4000/review/add-review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reviewData)
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Review submitted successfully!");
                setIsReviewOpen(false); // Close modal on success
            } else {
                alert(`Error: ${data.message || "Something went wrong."}`);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review. Please try again later.");
        }
    };

    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">
                    <Toaster />

            <div className="flex items-start justify-between">
                <div className="flex gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                        <Package className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold">
                            Order <span className="text-blue-500">{order.orderId}</span>
                        </h3>
                        <p className="text-sm text-gray-500">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-full p-2 hover:bg-gray-50"
                >
                    {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                </button>
            </div>
            {isOpen && (
                <div className="mt-4 border-t pt-4">
                    <p className="text-sm text-gray-500">{order.notes}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <div
                            className={`h-2 w-2 rounded-full ${
                                order.statusId === 4
                                    ? "bg-red-500"
                                    : order.statusId === 5
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                            }`}
                        />
                        <span className="text-sm text-gray-500">
                            {statusText[order.statusId] || "Unknown Status"}
                        </span>
                    </div>
                    {/* Review Icon */}
                    {order.statusId === 5 && (
                        <div className="mt-4 flex items-center gap-2 cursor-pointer" onClick={() => setIsReviewOpen(true)}>
                            <Star className="h-5 w-5 text-yellow-400" />
                            <span className="text-sm text-gray-500">Leave a Review</span>
                        </div>
                    )}
                </div>
            )}

            {/* Review Modal */}
            {isReviewOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-lg font-semibold">Leave a Review</h3>
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
                                        className={`w-8 h-8 ${
                                            (hover || rating) >= star
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                        } transition-colors duration-200`}
                                    />
                                </button>
                            ))}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="review" className="block text-sm text-gray-500">
                                Your Review
                            </label>
                            <textarea
                                id="review"
                                rows={4}
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                className="w-full mt-2 p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => setIsReviewOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReviewSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
