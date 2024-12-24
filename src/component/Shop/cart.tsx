"use client"
import Image from "next/image";
import { ArrowLeft, Plus, Minus, NotebookPen } from 'lucide-react';
import Link from "next/link";
import { useState } from "react";
import Pista from '@/assets/pista.jpg';
import { AlertTriangle, ShoppingCart, MessageSquare } from 'lucide-react'
import SendEnquiryModal from "../global/sendEnquiryPopup";
import SuccessMessage from "../global/successEnquiry";

const products = [
    {
        id: 1,
        name: "Almonds",
        image: Pista,
        moq: "100 meters",
        quantity: 1,
    },
    {
        id: 2,
        name: "Red Apples",
        image: Pista,
        moq: "100 meters",
        quantity: 1,
    },
    {
        id: 3,
        name: "Pistachios",
        image: Pista,
        moq: "100 meters",
        quantity: 1,
    },
    {
        id: 4,
        name: "White Stones",
        image: Pista,
        moq: "100 meters",
        quantity: 1,
    },
];

const orderDetails = {
    id: 1,
    orderId: "475121",
    status: "Pending",
    date: "06-07-2024",
    time: "10:15 am",
    totalItems: 33,
    totalQuantity: 108,
    subtotal: 0,
    shipping: 0,
    others: 0,
    discount: 0,
    products: [
        {
            name: "Almonds",
            image: Pista,
            moq: "50 Kg",
            mrp: 1000,
            quantity: "50 Kg",
            totalQty: "50 x 1000 = 50000",
            totalAmount: 49999.5,
            id: 1
        },
        {
            name: "Apple",
            image: Pista,
            moq: "50 Kg",
            mrp: 1000,
            quantity: "50 Kg",
            totalQty: "50 x 1000 = 50000",
            totalAmount: 49999.5,
            id: 2
        },
        {
            name: "Cashew",
            image: Pista,
            moq: "50 Kg",
            mrp: 750,
            quantity: "50 Kg",
            totalQty: "50 x 750 = 37500",
            totalAmount: 37499.5,
            id: 3
        }
    ]
}

export default function CartPage() {
    const [activeTab, setActiveTab] = useState<"cart" | "bill">("cart");
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false);

    const handleConfirm = () => {
        // Handle the confirmation logic here
        console.log('Enquiry sent!')
        setIsModalOpen(false)
        setShowSuccess(true);

        // Hide the success message after 3 seconds
        //   setTimeout(() => setShowSuccess(false), 3000);
    }

    const [isOpen, setIsOpen] = useState(false)
    const [description, setDescription] = useState("")

    const handleReset = () => {
        setDescription("")
    }

    const handleSave = () => {
        // Handle save logic here
        console.log("Saving description:", description)
        setIsOpen(false)
    }

    return (
        <div className="bg-white">
            <header className="sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
                        </Link>
                        <div>
                            <h1 className="text-lg font-semibold">Your cart</h1>
                            <p className="text-sm text-gray-500">6 Item / 144 Quantity</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-600" onClick={() => setIsOpen(true)}>
                        <NotebookPen className="h-5 w-5" />
                        <span>Note</span>
                    </button>

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
                        className={`px-6 w-1/2 py-2 ${activeTab === "cart" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
                        onClick={() => setActiveTab("cart")}
                    >
                        Cart
                    </button>
                    <button
                        className={`px-6 w-1/2 py-2 ${activeTab === "bill" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
                        onClick={() => setActiveTab("bill")}
                    >
                        Bill
                    </button>
                </div>
            </header>

            <main className="p-4">
                {activeTab === "cart" ? (
                    <div className="grid grid-cols-2 gap-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="overflow-hidden rounded-xl bg-white shadow-sm p-2 border"
                            >
                                <div className="relative aspect-square">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover rounded-xl"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-black/50 px-2 py-1">
                                        <p className="text-xs text-white">MOQ: {product.moq}</p>
                                    </div>
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
                        <div className="min-h-screen bg-gray-50">
                            <div className=" rounded-lg bg-white shadow-sm">
                                <div className="">
                                    <div className="bg-white shadow-lg rounded-lg p-4 border">
                                        {/* Header */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-500">Status</span>
                                                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                                                    {orderDetails.status}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                ORDER ID : {orderDetails.orderId}
                                            </div>
                                        </div>

                                        {/* Date and Time */}
                                        <div className="mt-4 flex justify-between text-sm text-gray-500">
                                            <div>Date : {orderDetails.date}</div>
                                            <div>Time : {orderDetails.time}</div>
                                        </div>

                                        {/* Order Summary */}
                                        <div className="mt-4 space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>TOTAL ITEM :</span>
                                                <span>{orderDetails.totalItems}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>TOTAL QUANTITY :</span>
                                                <span>{orderDetails.totalQuantity}</span>
                                            </div>
                                            <div className="mt-4 space-y-2 border-t pt-2">
                                                <div className="flex justify-between">
                                                    <span>SUBTOTAL :</span>
                                                    <span>₹{orderDetails.subtotal.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>SHIPPING :</span>
                                                    <span>₹{orderDetails.shipping.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>OTHERS :</span>
                                                    <span>₹{orderDetails.others.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>DISCOUNT :</span>
                                                    <span>₹{orderDetails.discount.toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between border-t pt-2 font-medium">
                                                <span>Total Amount :</span>
                                                <span>₹{orderDetails.subtotal.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        {/* Warning Message */}
                                        <div className="mt-4 flex justify-center items-center gap-2 text-sm text-red-500">
                                            <AlertTriangle className="h-4 w-4" />
                                            <span>Bill not generated by the seller</span>
                                        </div>

                                    </div>
                                    {/* Action Buttons */}
                                    <div className="mt-6 flex gap-4">
                                        <button onClick={() => setIsModalOpen(true)} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700">
                                            <MessageSquare className="h-4 w-4" />
                                            Send Enquiry
                                        </button>
                                        <button className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 py-2 text-gray-700 hover:bg-gray-50">
                                            <ShoppingCart className="h-4 w-4" />
                                            Add Item
                                        </button>
                                    </div>

                                    <SendEnquiryModal
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        onConfirm={handleConfirm}
                                        title="Accept Order ?"

                                    />

                                    {showSuccess && (
                                        <>
                                            <SuccessMessage />
                                        </>
                                    )}


                                    {/* Product List */}
                                    <div className="mt-6 space-y-4">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
