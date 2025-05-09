"use client"
import Image from "next/image";
import { ArrowLeft, Plus, Minus, NotebookPen } from 'lucide-react';
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import Pista from '@/assets/pista.jpg';
import { AlertTriangle, ShoppingCart, Store, MessageSquare, Trash } from 'lucide-react'
import SendEnquiryModal from "../global/sendEnquiryPopup";
import SuccessMessage from "../global/successEnquiry";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addToCart, clearCart, removeFromCart } from "@/store/slices/cartSlice";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter, useSearchParams } from "next/navigation";
import { useLongPress } from "@/hooks/useLongPress";

type touchAndHoldDataType = {
    id: string;
    selectedPrice: string;
}

const emptyState: touchAndHoldDataType = { id: '', selectedPrice: '' }

function CartPage() {
    const [activeTab, setActiveTab] = useState<"cart" | "bill">("cart");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [userDetails, setUserDetails] = useState<any>(null);
    const [description, setDescription] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    const dropped = useSelector((state: RootState) => state.cart.dropped);
    const dispatch = useDispatch();
    const router = useRouter();
    const carts = useSelector((state: RootState) => state.cart.cart);
    const searchParams = useSearchParams();
    const [sellerIdss, setSellerIdss] = useState<any>('')
    const [touchAndHoldData, setTouchAndHoldData] = useState<touchAndHoldDataType>(emptyState);

    useEffect(() => {
        // Ensure code runs only in the browser (client side)
        if (typeof window !== "undefined") {
            const localData = localStorage.getItem("userDetails");
            if (localData) {
                setUserDetails(JSON.parse(localData));
            }

            const idParam = searchParams.get("sellerId");
            setSellerIdss(idParam)

        }
        // const idParam = searchParams.get("sellerId");
        // setSellerIdss(idParam)

    }, []);

    useEffect(() => {
        // Sync cart data with localStorage when it changes
        if (carts.length > 0) {
            localStorage.setItem("cart", JSON.stringify(carts));
        }
    }, [carts]);

    const handleIncrement = (item: any) => {
        const updatedItem = {
            ...item,
            quantity: item.quantity + 1,
        };
        dispatch(addToCart(updatedItem));
    };

    const handleDecrement = (item: any) => {
        if (item.quantity > 1) {
            const updatedItem = {
                ...item,
                quantity: item.quantity - 1,
            };
            dispatch(addToCart(updatedItem));
        } else {
            dispatch(removeFromCart({ productId: item.productId, selectedPrice: item.selectedPrice }));
        }
    };

    const sendCartData = async () => {
        const customId = userDetails?.data?.customId;
        const sellerId = userDetails?.data?.sellerId || sellerIdss;

        // If no userDetails or missing customId/sellerId
        if (!customId || !sellerId) {
            toast.error("User details are missing or invalid.");
            return;
        }

        // If the cart is empty, return early
        if (carts.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        if (dropped === true) {
            toast.error("Used Suspended")
            return
        }

        const payload = {
            retailerId: customId,
            statusId: 1,
            totalItem: carts.length,
            totalQuantity: carts.reduce((acc: any, item: any) => acc + item.quantity, 0),
            notes: description || '',
            sellerId: sellerId,
            orderProductDetails: carts.map((item: any) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: parseFloat(item.price),
            })),
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/create-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Enquiry sent successfully!");
                localStorage.removeItem("cart");
                dispatch(clearCart())
                router.push("/shop");
            } else {
                toast.error(result.message || "Failed to send enquiry. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleReset = () => {
        setDescription("");
        setIsModalOpen(false);

    };

    const handleSave = () => {
        setIsOpen(false);
    };


    const handleConfirm = () => {
        sendCartData();
        setIsModalOpen(false)
        // setShowSuccess(true);
    }

    const longPressHandlers = useLongPress((id: string, selectedPrice: string) => {
        // alert(`Long press detected! ${id} - ${selectedPrice}`);
        // dispatch(removeFromCart({ productId: id, selectedPrice: selectedPrice }));
        setTouchAndHoldData({ id, selectedPrice });
    }, 800);

    const handleRemoveProduct = () => {
        dispatch(removeFromCart({ productId: touchAndHoldData?.id, selectedPrice: touchAndHoldData?.selectedPrice }));
        setTouchAndHoldData(emptyState);
    }

    const touchAndHoldAnimation = (id: string, selectedPrice: string): string => {
        if (id === touchAndHoldData.id && selectedPrice === touchAndHoldData.selectedPrice) {
            return "transform scale-105 transition-transform duration-300 ease-in-out";
        }
        return ''
    }

    return (
        <div className="bg-white">
            <Toaster />
            <header className="sticky top-0 z-10 px-4 py-3 bg-white shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => window.history.back()} />
                        </Link>
                        <div>
                            <h1 className="text-lg font-semibold text-black">Your cart</h1>
                            <p className="text-sm text-gray-500">{carts?.length} Item / {carts?.reduce((acc, item) => acc + item.quantity, 0)} Quantity</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-[#3A6B34]" onClick={() => setIsOpen(true)}>
                        <NotebookPen className="w-5 h-5" />
                        <span>Note</span>
                    </button>

                    {isOpen && (<div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />)}
                    {isOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50">
                            <div className="w-full max-w-[500px] rounded-lg bg-white p-6 m-2">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-black">Add Description</h2>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-1 rounded-full hover:bg-gray-100"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                                        {/* <X className="w-4 h-4" /> */}
                                    </button>
                                </div>

                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Type here..."
                                    className="mb-4 min-h-[200px] w-full resize-none rounded border border-gray-300 p-2 focus:outline-none bg-white text-black"
                                />

                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={handleReset}
                                        className="px-6 py-2 text-gray-500 border border-gray-300 rounded-full hover:bg-gray-100"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="rounded-full bg-[#3A6B34] px-6 py-2 text-white"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-3 flex border-b  border-t border-t-[#3A6B34]">
                    <button
                        className={`px-6 w-1/2 py-2 ${activeTab === "cart" ? "border-b-2 border-[#3A6B34] text-[#3A6B34]" : "text-gray-500"}`}
                        onClick={() => setActiveTab("cart")}
                    >
                        Cart
                    </button>
                    <button
                        className={`px-6 w-1/2 py-2 ${activeTab === "bill" ? "border-b-2 border-[#3A6B34] text-[#3A6B34]" : "text-gray-500"}`}
                        onClick={() => setActiveTab("bill")}
                    >
                        Bill
                    </button>
                </div>
            </header>

            <main className="p-4 bg-[#F7F8FC] h-screen">
                {activeTab === "cart" ? (
                    <div className="grid grid-cols-2 gap-4">
                        {carts.map((product: any) => (
                            <div
                                {...longPressHandlers(product.productId, product.selectedPrice)}
                                key={product.productId}
                                className={` relative overflow-hidden rounded-xl bg-[#FFFFFF] shadow-sm p-2 border border-gray-300 ${touchAndHoldAnimation(product.productId, product.selectedPrice)} `}
                            >
                                <div className="relative aspect-square">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover rounded-xl"
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 text-2xl border-t">
                                    <button
                                        className="p-2 rounded-full"
                                        onClick={() => handleDecrement(product)}
                                    >
                                        <Minus className="w-5 h-5 text-[#3A6B34]" />
                                    </button>
                                    <span className=" text-[#3A6B34] font-medium">{product.quantity}</span>
                                    <button
                                        className="p-2 rounded-full"
                                        onClick={() => handleIncrement(product)}
                                    >
                                        <Plus className="w-5 h-5 text-[#3A6B34]" />
                                    </button>
                                </div>
                                {(product.productId === touchAndHoldData.id && product.selectedPrice === touchAndHoldData.selectedPrice) &&
                                    (<div onClick={() => { setTouchAndHoldData(emptyState) }} className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white bg-gray-200 bg-opacity-50">
                                        <div onClick={(e) => { e.stopPropagation(); handleRemoveProduct() }} className="flex items-center p-4 space-x-2 bg-white rounded-full cursor-pointer">
                                            <button
                                                className="bg-[#FEE4E2] rounded-full p-2 flex items-center space-x-2"
                                            >
                                                <Trash className="w-5 h-5 text-red-500" />
                                            </button>
                                        </div>
                                    </div>)
                                }
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-700">
                        <div className="min-h-screen">
                            <div className="bg-transparent rounded-lg shadow-sm ">
                                <div className="">
                                    <div className="p-4 bg-white border rounded-lg shadow-lg">


                                        {/* Date and Time */}
                                        <div className="flex justify-between mt-4 text-sm text-gray-500">
                                            <div>Date : {new Date().toLocaleDateString()}</div>
                                            <div>Time : {new Date().toLocaleTimeString()}</div>
                                        </div>

                                        {/* Order Summary */}
                                        <div className="mt-4 space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>TOTAL ITEM :</span>
                                                <span>{carts?.length}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>TOTAL QUANTITY :</span>
                                                <span>{carts?.reduce((acc, item) => acc + item.quantity, 0)}</span>
                                            </div>
                                            <div className="pt-2 mt-4 space-y-2 border-t">
                                                {/* <div className="flex justify-between">
                                                    <span>SUBTOTAL :</span>
                                                    <span>₹{subtotal?.toFixed(2)}</span>
                                                </div> */}

                                                <div className="flex justify-between">
                                                    <span>TAX :</span>
                                                    <span>{carts[0]?.tax}</span>
                                                </div>
                                                {/* <div className="flex justify-between">
                                                    <span>SHIPPING :</span>
                                                    <span>₹{carts.shipping.toFixed(2)}</span>
                                                </div>
                                                
                                                <div className="flex justify-between">
                                                    <span>DISCOUNT :</span>
                                                    <span>₹{carts.discount.toFixed(2)}</span>
                                                </div> */}
                                            </div>
                                            <div className="flex justify-between font-medium">
                                                <span>Total Amount :</span>
                                                <span>₹{carts?.reduce((acc, item: any) => acc + (item.price * item.quantity), 0)}</span>
                                            </div>
                                        </div>

                                        {/* Warning Message */}
                                        {/* <div className="flex items-center justify-center gap-2 mt-4 text-sm text-red-500">
                                            <AlertTriangle className="w-4 h-4" />
                                            <span>Bill not generated by the seller</span>
                                        </div> */}

                                    </div>
                                    {/* Action Buttons */}
                                    {/* <div className="flex gap-4 mt-6">
                                        <button onClick={() => setIsModalOpen(true)} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#6D2323] py-2 text-white hover:bg-[#6D2323]">
                                            <MessageSquare className="w-4 h-4" />
                                            Send Enquiry
                                        </button>

                                    </div> */}

                                    {/* <SendEnquiryModal
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        onConfirm={handleConfirm}
                                        title="Send Enquiry ?"
                                        message="Are you sure want to send Enquiry ?"

                                    /> */}

                                    {/* Product List */}
                                    {/* <div className="mt-6 space-y-4">
                                        {cart?.map((product:any, index:any) => (
                                            <div
                                                key={index}
                                                className="flex gap-4 p-4 bg-white border rounded-lg"
                                            >
                                                <div className="relative w-20 h-20 overflow-hidden rounded-lg">
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
                                                            <span>MOQ: {product.moq || 1}</span>
                                                            <span>Total Qty: {product.quantity}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>MRP: ₹{product.price}</span>
                                                            <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                                                            </div>
                                                        <div className="flex justify-between font-semibold text-gray-900">
                                                            <span>Total Amount:</span>
                                                            <span>₹{totalAmount.toFixed(2)}</span>
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
                )
                }
                <SendEnquiryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirm}
                    title="Send Enquiry ?"
                    message="Are you sure want to send Enquiry ?"

                />
                {carts.length > 0 && (<div className="fixed bottom-0 left-0 right-0 z-10 flex items-center p-4 text-xs bg-white border-t shadow-sm justify-evenly">
                    <button onClick={() => setIsModalOpen(true)} className="flex justify-center items-center gap-2 px-4 py-2 rounded-md border-2 bg-[#3A6B34] text-white w-2/5 ">
                        <ShoppingCart className="w-4 h-4" /> Send Enquiry
                    </button>
                    <button onClick={() => router.push("/shop")} className="flex justify-center items-center gap-2 px-4 py-2 rounded-md border-2 border-[#3A6B34] text-[#3A6B34] w-2/5">
                        <Store className="w-4 h-4" /> Add Item
                    </button>
                </div>)}
            </main >
        </div >
    );
}



function CartPageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CartPage />
        </Suspense>
    )
}

export default CartPageWrapper
