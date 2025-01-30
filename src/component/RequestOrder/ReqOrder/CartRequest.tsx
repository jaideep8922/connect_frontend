"use client"
import Image from "next/image";
import { ArrowLeft, Plus, Minus, NotebookPen } from 'lucide-react';
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import Pista from '@/assets/pista.jpg';
import { AlertTriangle, ShoppingCart, MessageSquare } from 'lucide-react'
import SendEnquiryModal from "@/component/global/sendEnquiryPopup";
import SuccessMessage from "@/component/global/successEnquiry";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';


const CartRequestPage: React.FC = () => {

    const [activeTab, setActiveTab] = useState<"cart" | "bill">("cart");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpens, setIsModalOpens] = useState(false);
    const [isModalClose, setIsModalClose] = useState(false);
    const [isModalCloses, setIsModalCloses] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    console.log("orderId", orderId);

    const [orders, setOrders] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Try to safely retrieve data from localStorage
            const localData = localStorage.getItem('userDetails');
            if (localData) {
                try {
                    const parsedData = JSON.parse(localData);
                    const customId = parsedData?.data?.customId;

                    if (customId) {
                        fetchOrders(customId); // Fetch orders only if customId is valid
                    } else {
                        console.error("No customId found in localStorage.");
                    }
                } catch (error) {
                    console.error("Error parsing localStorage data:", error);
                }
            } else {
                console.error("No userDetails found in localStorage.");
            }
        }
    }, []);

    const fetchOrders = async (customId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/get-order-history-by-supplier-id`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ customId }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setOrders(data.data);
                } else {
                    console.error("Failed to fetch orders: ", data.message);
                }
            } else {
                console.error("Failed to fetch orders: HTTP error", response.status);
            }
        } catch (error) {
            console.error("Error fetching orders: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (orderId && orders.length > 0) {
            const order = orders.find((order: any) => order.orderId === orderId);
            setOrderDetails(order);
        }
    }, [orderId, orders]);

    const [orderDetails, setOrderDetails] = useState<any>(null);

    const handleConfirm = async () => {
        setIsModalOpen(false);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/update-order-status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        orderId,
                        statusId: 2, // Send statusId as 2
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    toast.success("Order status updated successfully");
                    setTimeout(() => {
                        router.push("/request-order");
                    }, 3000);
                } else {
                    console.error("Failed to update order status:", data.message);
                }
            } else {
                console.error("Failed to update order status: HTTP error", response.status);
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const handleConfirmReject = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/update-order-status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        orderId,
                        statusId: 5, // Reject statusId
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    toast.success("Order status updated successfully");
                    setTimeout(() => {
                        router.push("/request-order");
                    }, 3000);
                } else {
                    console.error("Failed to update order status:", data.message);
                }
            } else {
                console.error("Failed to update order status: HTTP error", response.status);
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
        setIsModalClose(false);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
    const [description, setDescription] = useState("");

    const handleReset = () => {
        setDescription("");
    };

    const handleSave = () => {
        console.log("Saving description:", description);
        setIsOpen(false);
    };

    const handleClose = () => {
        setIsModalOpens(false)
    }

    const handleConfirms = async () => {
        if (!selectedStatus) return; // Ensure status is selected

        setIsModalOpens(false);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/update-order-status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        orderId, 
                        statusId: selectedStatus,
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    toast.success("Order status updated successfully");
                    setTimeout(() => {
                        router.push("/request-order");
                    }, 3000);
                } else {
                    console.error("Failed to update order status: ", data.message);
                }
            } else {
                console.error("Failed to update order status: HTTP error", response.status);
            }
        } catch (error) {
            console.error("Error updating order status: ", error);
        }
    };

    const totalAmount = orderDetails?.OrderProductDetails?.reduce(
        (sum: any, item: any) => sum + item.price * item.quantity,
        0
    );


    return (
        <div className="bg-[#FFEFD3]">
            <Toaster />
            <header className="sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
                        </Link>
                        <div>
                            <h1 className="text-lg font-semibold">Your cart</h1>
                            <p className="text-sm text-gray-500">{orderDetails?.totalItem} Item / {orderDetails?.totalQuantity} Quantity</p>
                        </div>
                    </div>


                    {isOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="w-full max-w-[500px] rounded-lg bg-white p-6 m-2">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Add Description</h2>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="rounded-full p-1 hover:bg-gray-100"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                                        {/* <X className="h-4 w-4" /> */}
                                    </button>
                                </div>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Type here..."
                                    className="mb-4 min-h-[200px] w-full resize-none rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                                />

                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={handleReset}
                                        className="rounded-full border border-gray-300 px-6 py-2 hover:bg-gray-100"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="rounded-full bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-3 flex border-b ">
                    <button
                        className={`px-6 w-1/2 py-2 ${activeTab === "cart" ? "border-b-2 border-[#6D2323] text-[#6D2323]" : "text-gray-500"}`}
                        onClick={() => setActiveTab("cart")}
                    >
                        Cart
                    </button>
                    <button
                        className={`px-6 w-1/2 py-2 ${activeTab === "bill" ? "border-b-2 border-[#6D2323] text-[#6D2323]" : "text-gray-500"}`}
                        onClick={() => setActiveTab("bill")}
                    >
                        Bill
                    </button>
                </div>
            </header>

            <main className="p-4">
                {activeTab === "cart" ? (
                    <div className="grid grid-cols-2 gap-4">
                        {orderDetails?.OrderProductDetails.map((product: any) => (
                            <div
                                key={product.id}
                                className="overflow-hidden rounded-xl bg-[#FFEFD3] shadow-sm p-2 border"
                            >
                                <div className="relative aspect-square">
                                    <Image
                                        src={product.product.productImage}
                                        alt={product.product.productImage}
                                        fill
                                        className="object-cover rounded-xl"
                                    />

                                    {/* <div className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-black/50 px-2 py-1">
                                        <p className="text-xs text-white">MOQ: {product.moq}</p>
                                    </div> */}
                                </div>
                                <div className="flex items-center justify-between border-t p-3">
                                    <button className="rounded-full bg-gray-100 p-2">
                                        <Minus className="h-5 w-5 text-gray-600" />
                                    </button>
                                    <span className="text-lg font-medium">{product.quantity}</span>
                                    <button className="rounded-full bg-gray-100 p-2">
                                        <Plus className="h-5 w-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        ))}


                    </div>
                ) : (
                    <div className="text-center text-gray-700">
                        <div className="min-h-screen bg-[#FFEFD3]">
                            <div className=" rounded-lg bg-[#FFEFD3] shadow-sm">
                                <div className="">
                                    <div className="bg-white shadow-lg rounded-lg p-4 border">
                                        {/* Header */}
                                        <div className="flex items-center justify-between">
                                            {/* <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-500">Status</span>
                                                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                                                    {orderDetails.status}
                                                </span>
                                            </div> */}
                                            <div className="text-sm text-gray-500">
                                                ORDER ID : {orderDetails.orderId}
                                            </div>
                                        </div>

                                        {/* Date and Time */}
                                        <div className="mt-4 flex justify-between text-sm text-gray-500">
                                            <div>Date :  {new Date(orderDetails.createdAt).toLocaleString()}</div>
                                            {/* <div>Time : {orderDetails.time}</div> */}
                                        </div>

                                        {/* Order Summary */}
                                        <div className="mt-4 space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>TOTAL ITEM :</span>
                                                <span>{orderDetails.totalItem}</span>
                                                {/* <span>{orderDetails.totalItems}</span> */}
                                            </div>
                                            <div className="flex justify-between">
                                                <span>TOTAL QUANTITY :</span>
                                                <span>{orderDetails.totalQuantity}</span>
                                            </div>
                                            {/* <div className="mt-4 space-y-2 border-t pt-2">
                                                <div className="flex justify-between">
                                                    <span>SUBTOTAL :</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>SHIPPING :</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>OTHERS :</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>DISCOUNT :</span>
                                                </div>
                                            </div> */}
                                            <div className="flex justify-between border-t pt-2 font-medium">
                                                <span>Total Amount :</span>
                                                <span>{totalAmount}</span>
                                            </div>
                                        </div>

                                        {/* Warning Message */}
                                        <div className="mt-4 flex justify-center items-center gap-2 text-sm text-red-500">
                                            <AlertTriangle className="h-4 w-4" />
                                            <span>Bill not generated by the seller</span>
                                        </div>

                                    </div>
                                    {/* Action Buttons */}
                                    {orderDetails?.statusId === 1 ? (
                                        <div className="mt-6 flex gap-4">
                                            <button onClick={() => setIsModalClose(true)} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-red-600 py-3 text-white">
                                                Reject
                                            </button>
                                            <button onClick={() => setIsModalOpen(true)} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-green-500 py-3 text-white">
                                                Accept
                                            </button>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    {(orderDetails?.statusId === 2 || orderDetails?.statusId === 3 || orderDetails?.statusId === 4) && (


                                        <div className="mt-6 flex gap-4">
                                            <button onClick={() => setIsModalClose(true)} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-red-600 py-3 text-white">
                                                Cancel
                                            </button>
                                            <button onClick={() => setIsModalOpens(true)} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-500 py-3 text-white">
                                                Confirm
                                            </button>
                                        </div>
                                    )}

                                    {isModalOpens && (
                                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                                                <h1 className="text-2xl font-bold mb-6">Change Status!</h1>

                                                {/* Status Options */}
                                                <div className="space-y-3 mb-8">
                                                    {[
                                                        { id: "reject", label: "Reject", statusId: 5 },
                                                        { id: "accept", label: "Accept", statusId: 2 },
                                                        { id: "pending", label: "Mark Pending", statusId: 3 },
                                                        { id: "complete", label: "Mark Complete", statusId: 4 },
                                                    ].map((option) => (
                                                        <label
                                                            key={option.id}
                                                            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 bg-white shadow-sm cursor-pointer hover:bg-[#FFEFD3]"
                                                        >
                                                            <span className="text-gray-600">{option.label}</span>
                                                            <input
                                                                type="radio"
                                                                name="status"
                                                                value={option.statusId} // Store actual numeric statusId
                                                                checked={selectedStatus === option.statusId}
                                                                onChange={(e) => setSelectedStatus(Number(e.target.value))} // Ensure it's a number
                                                                className="h-5 w-5 rounded-full border-2 border-gray-300 text-blue-600 focus:ring-blue-500"
                                                            />
                                                        </label>
                                                    ))}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-4">
                                                    <button
                                                        className="flex-1 px-6 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-[#FFEFD3]"
                                                        onClick={handleClose}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="flex-1 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                                                        onClick={handleConfirms} // Call function to send selected status
                                                        disabled={!selectedStatus} // Disable if no selection
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}


                                    {/* {isModalOpens && (
                                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                                                <h1 className="text-2xl font-bold mb-6">Change Status!</h1>

                                                <div className="space-y-3 mb-8">
                                                    {[
                                                        { id: 'reject', label: 'Reject' },
                                                        { id: 'accept', label: 'Accept' },
                                                        { id: 'pending', label: 'Mark Pending' },
                                                        { id: 'complete', label: 'Mark Complete' },
                                                    ].map((option) => (
                                                        <label
                                                            key={option.id}
                                                            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 bg-white shadow-sm cursor-pointer hover:bg-[#FFEFD3]"
                                                        >
                                                            <span className="text-gray-600">{option.label}</span>
                                                            <input
                                                                type="radio"
                                                                name="status"
                                                                value={option.id}
                                                                checked={selectedStatus === option.id}
                                                                onChange={(e) => {
                                                                    setSelectedStatus(e.target.value as any);
                                                                    if (e.target.value === 'complete') setIsModalOpens(true);
                                                                }}
                                                                className="h-5 w-5 rounded-full border-2 border-gray-300 text-blue-600 focus:ring-blue-500"
                                                            />
                                                        </label>
                                                    ))}
                                                </div>

                                                <div className="flex gap-4">
                                                    <button
                                                        className="flex-1 px-6 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-[#FFEFD3]"
                                                        onClick={() => setSelectedStatus(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="flex-1 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                                                        onClick={() => {
                                                            if (selectedStatus) {
                                                                setIsModalOpens(false);
                                                            }
                                                        }}
                                                        disabled={!selectedStatus}
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        </div>


                                    )} */}


                                    <SendEnquiryModal
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        onConfirm={handleConfirm}
                                        title="Accept Order?"
                                        message="Are you sure you want to accept this order?" // ✅ Custom message
                                    />

                                    <SendEnquiryModal
                                        isOpen={isModalClose}
                                        onClose={() => setIsModalClose(false)}
                                        onConfirm={handleConfirmReject}
                                        title="Reject Order?"
                                        message="Are you sure you want to reject this order?" // ✅ Different message for rejection
                                    />


                                    {/* {showSuccess && (
                                        <>
                                            <SuccessMessage />
                                        </>
                                    )} */}


                                    {/* Product List */}
                                    {/* <div className="mt-6 space-y-4">
                                        {orderDetails.products.map((product, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-4 rounded-lg border bg-white p-4"
                                            >
                                                <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="flex justify-start font-semibold">{product.name}</h3>
                                                    <div className="mt-1 space-y-1 text-xs text-gray-500">
                                                        <div className="flex justify-between">
                                                            <span>MOQ: {product.moq}</span>
                                                            <span>Total Qty: {product.quantity}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>MRP: ₹{product.mrp}</span>
                                                            <span>{product.totalQty}</span>
                                                        </div>
                                                        <div className="flex justify-between font-semibold text-gray-900">
                                                            <span>Total Amount:</span>
                                                            <span>₹{product.totalAmount}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}


const CartRequestPageWrapper: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CartRequestPage />
  </Suspense>
);

export default CartRequestPageWrapper;