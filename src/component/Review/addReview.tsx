"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, ChevronDown, ChevronUp, Package, Star } from 'lucide-react'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';


export default function AddReviewPage() {
    const router = useRouter();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [customId, setCustomId] = useState<string | null>(null);

    // Fetch orders only after component is mounted (client-side)
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Access localStorage only on the client-side
            const localData: any = JSON.parse(localStorage.getItem("userDetails") || "{}");
            const customIdFromStorage = localData?.data?.customId;

            if (customIdFromStorage) {
                setCustomId(customIdFromStorage);
            }
        }
    }, []);

    const fetchOrders = async () => {
        if (!customId) return; // Ensure customId is available before making the request

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/get-order-history-by-retailer-id`,
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
        if (customId) {
            fetchOrders();
        }
    }, [customId]);

    return (
        <>
            <header className="sticky top-0 z-10 flex items-center justify-between h-20 px-4 bg-white border-b">
                <button
                    className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-5 h-5 text-black cursor-pointer" onClick={() => window.history.back()} />
                </button>

                <h1 className="text-lg font-medium text-black">Review</h1>

                <div className="relative flex items-center justify-center w-8 h-8 text-white rounded-full bg-emerald-500">
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold">
                        2
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>

                    <span className="sr-only">Notifications</span>
                </div>
            </header>
            <div className="min-h-screen bg-[#F7F8FC] p-4">

                <div className="max-w-2xl mx-auto space-y-3"
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
//         <div className="p-4 bg-white shadow-sm rounded-xl">
//             <div className="flex items-start justify-between">
//                 <div className="flex gap-3">
//                     <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
//                         <Package className="h-6 w-6 text-[#6D2323]" />
//                     </div>
//                     <div>
//                         <h3 className="font-semibold">
//                             Order <span className="text-[#6D2323]">{order.orderId}</span>
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
//                     className="rounded-full p-2 hover:bg-[#FFEFD3]"
//                 >
//                     {isOpen ? (
//                         <ChevronUp className="w-5 h-5 text-gray-400" />
//                     ) : (
//                         <ChevronDown className="w-5 h-5 text-gray-400" />
//                     )}
//                 </button>
//             </div>
//             {isOpen && (
//                 <div className="pt-4 mt-4 border-t">
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
//                         <div className="flex items-center gap-2 mt-4 cursor-pointer" onClick={() => setIsReviewOpen(true)}>
//                             <Star className="w-5 h-5 text-yellow-400" />
//                             <span className="text-sm text-gray-500">Leave a Review</span>
//                         </div>
//                     )}
//                 </div>
//             )}

//             {/* Review Modal */}
//             {isReviewOpen && (
//                 <div className="fixed inset-0 bg-[#FFEFD3]0 bg-opacity-50 flex justify-center items-center z-50 p-3">
//                     <div className="p-6 bg-white rounded-lg w-96">
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
//                                 className="w-full p-2 mt-2 border border-gray-300 rounded"
//                             />
//                         </div>
//                         <div className="flex justify-end gap-2 mt-4">
//                             <button
//                                 onClick={() => setIsReviewOpen(false)}
//                                 className="px-4 py-2 text-gray-700 bg-gray-300 rounded"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleReviewSubmit}
//                                 className="px-4 py-2 bg-[#6D2323] text-white rounded"
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

    const statusText: { [key: number]: string } = {
        1: "Pending",
        2: "Accepted",
        3: "Processing",
        4: "Completed",
        5: "Cancelled",
    };

    // const statusText: Record<number, string> = {
    //     1: "Pending",
    //     2: "Accepted",
    //     3: "Processing",
    //     4: "Cancelled",
    //     5: "Completed",
    // };

    // Handle Review Submission
    const handleReviewSubmit = async () => {
        if (!reviewText || rating === 0) {
            toast.error("Please provide a review and rating.");
            return;
        }

        const reviewData = {
            orderId: order.orderId,
            review: reviewText,
            ratingStars: rating
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/review/add-review`, {
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
        <div className="p-4 bg-white shadow-sm rounded-xl">
            <Toaster />

            <div className="flex items-start justify-between">
                <div className="flex gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F0FFF3]">
                        <Package className="h-6 w-6 text-[#3A6B34]" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-black">
                            Order #<span>{order.orderId}</span>
                        </h3>
                        <p className="text-sm text-gray-500">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-full p-2 hover:bg-[#FFEFD3]"
                >
                    {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                </button>
            </div>
            {isOpen && (
                <div className="pt-4 mt-4 border-t">
                    <p className="text-sm text-gray-500">{order.notes}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <div
                            className={`h-2 w-2 rounded-full ${order.statusId === 5
                                ? "bg-red-500"
                                : order.statusId === 4
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                                }`}
                        />
                        <span className="text-sm text-gray-500">
                            {statusText[order.statusId] || "Unknown Status"}
                        </span>
                    </div>
                    {/* Review Icon */}
                    {order.statusId === 4 && (
                        <div className="flex items-center gap-2 mt-4 cursor-pointer" onClick={() => setIsReviewOpen(true)}>
                            <Star className="w-5 h-5 text-yellow-400" />
                            <span className="text-sm text-gray-500">Leave a Review</span>
                        </div>
                    )}
                </div>
            )}

            {/* Review Modal */}
            {isReviewOpen && (
                <div className="fixed inset-0 bg-[#FFFFFF]0 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="p-6 bg-white rounded-lg w-96">
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
                                        className={`w-8 h-8 ${(hover || rating) >= star
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
                                className="w-full p-2 mt-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setIsReviewOpen(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReviewSubmit}
                                className="px-4 py-2 bg-[#3A6B34] text-white rounded"
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
