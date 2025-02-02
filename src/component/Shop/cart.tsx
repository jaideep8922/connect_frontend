"use client"
import Image from "next/image";
import { ArrowLeft, Plus, Minus, NotebookPen } from 'lucide-react';
import Link from "next/link";
import { useEffect, useState } from "react";
import Pista from '@/assets/pista.jpg';
import { AlertTriangle, ShoppingCart, MessageSquare } from 'lucide-react'
import SendEnquiryModal from "../global/sendEnquiryPopup";
import SuccessMessage from "../global/successEnquiry";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addToCart, clearCart, removeFromCart } from "@/store/slices/cartSlice";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";



export default function CartPage() {
    const [activeTab, setActiveTab] = useState<"cart" | "bill">("cart");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [userDetails, setUserDetails] = useState<any>(null);
    const [description, setDescription] = useState("");
    const [isOpen, setIsOpen] = useState(false)


    const dispatch = useDispatch();
    const router = useRouter();
    const carts = useSelector((state: RootState) => state.cart.cart);

    useEffect(() => {
        // Ensure code runs only in the browser (client side)
        if (typeof window !== "undefined") {
            const localData = localStorage.getItem("userDetails");
            if (localData) {
                setUserDetails(JSON.parse(localData));
            }
        }
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
        const sellerId = userDetails?.data?.sellerId;

        // If no userDetails or missing customId/sellerId
        if (!customId || !sellerId) {
            alert("User details are missing or invalid.");
            return;
        }

        // If the cart is empty, return early
        if (carts.length === 0) {
            alert("Your cart is empty.");
            return;
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

    return (
        <div className="bg-white">
            <Toaster />
            <header className="sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
                        </Link>
                        <div>
                            <h1 className="text-lg font-semibold">Your cart</h1>
                            <p className="text-sm text-gray-500">{carts?.length} Item / {carts?.reduce((acc, item) => acc + item.quantity, 0)} Quantity</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-[#6D2323]" onClick={() => setIsOpen(true)}>
                        <NotebookPen className="h-5 w-5" />
                        <span>Note</span>
                    </button>

                    {isOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
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
                                    className="mb-4 min-h-[200px] w-full resize-none rounded border border-gray-300 p-2 focus:outline-none"
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
                                        className="rounded-full bg-[#6D2323] px-6 py-2 text-white hover:bg-[#6D2323]"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-3 flex border-b  border-t border-t-[#6D2323]">
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

            <main className="p-4 bg-[#FFEFD3]">
                {activeTab === "cart" ? (
                    <div className="grid grid-cols-2 gap-4">
                        {carts.map((product: any) => (
                            <div
                                key={product.productId}
                                className="overflow-hidden rounded-xl bg-[#FEF9E1] shadow-sm p-2 border border-[#FEF9E1]"
                            >
                                <div className="relative aspect-square">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover rounded-xl"
                                    />
                                </div>
                                <div className="flex items-center justify-between border-t p-3">
                                    <button
                                        className="rounded-full bg-gray-100 p-2"
                                        onClick={() => handleDecrement(product)}
                                    >
                                        <Minus className="h-5 w-5 text-gray-600" />
                                    </button>
                                    <span className="text-lg font-medium">{product.quantity}</span>
                                    <button
                                        className="rounded-full bg-gray-100 p-2"
                                        onClick={() => handleIncrement(product)}
                                    >
                                        <Plus className="h-5 w-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-700">
                        <div className="min-h-screen bg-[#FFEFD3]">
                            <div className=" rounded-lg bg-transparent shadow-sm">
                                <div className="">
                                    <div className="bg-white shadow-lg rounded-lg p-4 border">


                                        {/* Date and Time */}
                                        <div className="mt-4 flex justify-between text-sm text-gray-500">
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
                                            <div className="mt-4 space-y-2 border-t pt-2">
                                                {/* <div className="flex justify-between">
                                                    <span>SUBTOTAL :</span>
                                                    <span>₹{subtotal?.toFixed(2)}</span>
                                                </div> */}

                                                {/* <div className="flex justify-between">
                                                    <span>TAX :</span>
                                                    <span>₹{carts?.others}</span>
                                                </div> */}
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
                                                <span>₹{carts?.reduce((acc, item:any) => acc + (item.price * item.quantity), 0)}</span>
                                            </div>
                                        </div>

                                        {/* Warning Message */}
                                        {/* <div className="mt-4 flex justify-center items-center gap-2 text-sm text-red-500">
                                            <AlertTriangle className="h-4 w-4" />
                                            <span>Bill not generated by the seller</span>
                                        </div> */}

                                    </div>
                                    {/* Action Buttons */}
                                    <div className="mt-6 flex gap-4">
                                        <button onClick={() => setIsModalOpen(true)} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#6D2323] py-2 text-white hover:bg-[#6D2323]">
                                            <MessageSquare className="h-4 w-4" />
                                            Send Enquiry
                                        </button>

                                    </div>

                                    <SendEnquiryModal
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        onConfirm={handleConfirm}
                                        title="Send Enquiry ?"
                                        message="Are you sure want to send Enquiry ?"

                                    />

                                    {/* {showSuccess && (
                                        <>
                                            <SuccessMessage />
                                        </>
                                    )} */}


                                    {/* Product List */}
                                    {/* <div className="mt-6 space-y-4">
                                        {cart?.map((product:any, index:any) => (
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
                )}
            </main>
        </div>
    );
}



// "use client"
// import Image from "next/image";
// import { ArrowLeft, Plus, Minus, NotebookPen } from 'lucide-react';
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import Pista from '@/assets/pista.jpg';
// import { AlertTriangle, ShoppingCart, MessageSquare } from 'lucide-react'
// import SendEnquiryModal from "../global/sendEnquiryPopup";
// import SuccessMessage from "../global/successEnquiry";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import { addToCart, removeFromCart } from "@/store/slices/cartSlice";
// import toast, { Toaster } from 'react-hot-toast';
// import { useRouter } from "next/navigation";



// export default function CartPage() {
//     const [activeTab, setActiveTab] = useState<"cart" | "bill">("cart");
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     // const [showSuccess, setShowSuccess] = useState(false);
//     const [userDetails, setUserDetails] = useState<any>(null);
//     const [description, setDescription] = useState("");
//     const [isOpen, setIsOpen] = useState(false)


//     const dispatch = useDispatch();
//     const router = useRouter();
//     const carts = useSelector((state: RootState) => state.cart.cart);

//     useEffect(() => {
//         // Ensure code runs only in the browser (client side)
//         if (typeof window !== "undefined") {
//             const localData = localStorage.getItem("userDetails");
//             if (localData) {
//                 setUserDetails(JSON.parse(localData));
//             }
//         }
//     }, []);

//     useEffect(() => {
//         // Sync cart data with localStorage when it changes
//         if (carts.length > 0) {
//             localStorage.setItem("cart", JSON.stringify(carts));
//         }
//     }, [carts]);

//     const handleIncrement = (item: any) => {
//         const updatedItem = {
//             ...item,
//             quantity: item.quantity + 1,
//         };
//         dispatch(addToCart(updatedItem));
//     };

//     const handleDecrement = (item: any) => {
//         if (item.quantity > 1) {
//             const updatedItem = {
//                 ...item,
//                 quantity: item.quantity - 1,
//             };
//             dispatch(addToCart(updatedItem));
//         } else {
//             dispatch(removeFromCart({ productId: item.productId, selectedPrice: item.selectedPrice }));
//         }
//     };

//     const sendCartData = async () => {
//         const customId = userDetails?.data?.customId;
//         const sellerId = userDetails?.data?.sellerId;

//         // If no userDetails or missing customId/sellerId
//         if (!customId || !sellerId) {
//             alert("User details are missing or invalid.");
//             return;
//         }

//         // If the cart is empty, return early
//         if (carts.length === 0) {
//             alert("Your cart is empty.");
//             return;
//         }

//         const payload = {
//             retailerId: customId,
//             statusId: 1,
//             totalItem: carts.length,
//             totalQuantity: carts.reduce((acc: any, item: any) => acc + item.quantity, 0),
//             notes: description || '',
//             sellerId: sellerId,
//             orderProductDetails: carts.map((item: any) => ({
//                 productId: item.productId,
//                 quantity: item.quantity,
//                 price: parseFloat(item.price),
//             })),
//         };

//         try {
//             const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/create-order`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(payload),
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 toast.success("Enquiry sent successfully!");
//                 localStorage.removeItem("cart");
//                 router.push("/shop");
//             } else {
//                 toast.error(result.message || "Failed to send enquiry. Please try again.");
//             }
//         } catch (error) {
//             toast.error("An error occurred. Please try again.");
//         }
//     };

//     const handleReset = () => {
//         setDescription("");
//     };

//     const handleSave = () => {
//         setIsModalOpen(false);
//     };

    
//     const handleConfirm = () => {
//         sendCartData();
//         setIsModalOpen(false)
//         // setShowSuccess(true);
//     }

//     return (
//         <div className="bg-white">
//             <Toaster />
//             <header className="sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <Link href="/" className="text-gray-600 hover:text-gray-900">
//                             <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
//                         </Link>
//                         <div>
//                             <h1 className="text-lg font-semibold">Your cart</h1>
//                             <p className="text-sm text-gray-500">{carts?.length} Item / {carts?.reduce((acc, item) => acc + item.quantity, 0)} Quantity</p>
//                         </div>
//                     </div>
//                     <button className="flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-[#6D2323]" onClick={() => setIsOpen(true)}>
//                         <NotebookPen className="h-5 w-5" />
//                         <span>Note</span>
//                     </button>

//                     {isOpen && (
//                         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//                             <div className="w-full max-w-[500px] rounded-lg bg-white p-6 m-2">
//                                 <div className="mb-4 flex items-center justify-between">
//                                     <h2 className="text-lg font-semibold">Add Description</h2>
//                                     <button
//                                         onClick={() => setIsOpen(false)}
//                                         className="rounded-full p-1 hover:bg-gray-100"
//                                     >
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
//                                         {/* <X className="h-4 w-4" /> */}
//                                     </button>
//                                 </div>

//                                 <textarea
//                                     value={description}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                     placeholder="Type here..."
//                                     className="mb-4 min-h-[200px] w-full resize-none rounded border border-gray-300 p-2 focus:outline-none"
//                                 />

//                                 <div className="flex justify-end gap-2">
//                                     <button
//                                         onClick={handleReset}
//                                         className="rounded-full border border-gray-300 px-6 py-2 hover:bg-gray-100"
//                                     >
//                                         Reset
//                                     </button>
//                                     <button
//                                         onClick={handleSave}
//                                         className="rounded-full bg-[#6D2323] px-6 py-2 text-white hover:bg-[#6D2323]"
//                                     >
//                                         Save
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 <div className="mt-3 flex border-b  border-t border-t-[#6D2323]">
//                     <button
//                         className={`px-6 w-1/2 py-2 ${activeTab === "cart" ? "border-b-2 border-[#6D2323] text-[#6D2323]" : "text-gray-500"}`}
//                         onClick={() => setActiveTab("cart")}
//                     >
//                         Cart
//                     </button>
//                     <button
//                         className={`px-6 w-1/2 py-2 ${activeTab === "bill" ? "border-b-2 border-[#6D2323] text-[#6D2323]" : "text-gray-500"}`}
//                         onClick={() => setActiveTab("bill")}
//                     >
//                         Bill
//                     </button>
//                 </div>
//             </header>

//             <main className="p-4 bg-[#FFEFD3]">
//                 {activeTab === "cart" ? (
//                     <div className="grid grid-cols-2 gap-4">
//                         {carts.map((product: any) => (
//                             <div
//                                 key={product.productId}
//                                 className="overflow-hidden rounded-xl bg-[#FEF9E1] shadow-sm p-2 border border-[#FEF9E1]"
//                             >
//                                 <div className="relative aspect-square">
//                                     <Image
//                                         src={product.image}
//                                         alt={product.name}
//                                         fill
//                                         className="object-cover rounded-xl"
//                                     />
//                                 </div>
//                                 <div className="flex items-center justify-between border-t p-3">
//                                     <button
//                                         className="rounded-full bg-gray-100 p-2"
//                                         onClick={() => handleDecrement(product)}
//                                     >
//                                         <Minus className="h-5 w-5 text-gray-600" />
//                                     </button>
//                                     <span className="text-lg font-medium">{product.quantity}</span>
//                                     <button
//                                         className="rounded-full bg-gray-100 p-2"
//                                         onClick={() => handleIncrement(product)}
//                                     >
//                                         <Plus className="h-5 w-5 text-gray-600" />
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center text-gray-700">
//                         <div className="min-h-screen bg-[#FFEFD3]">
//                             <div className=" rounded-lg bg-transparent shadow-sm">
//                                 <div className="">
//                                     <div className="bg-white shadow-lg rounded-lg p-4 border">


//                                         {/* Date and Time */}
//                                         <div className="mt-4 flex justify-between text-sm text-gray-500">
//                                         <div>Date : {new Date().toLocaleDateString()}</div>
//                                         <div>Time : {new Date().toLocaleTimeString()}</div>
//                                         </div>

//                                         {/* Order Summary */}
//                                         <div className="mt-4 space-y-2 text-sm">
//                                             <div className="flex justify-between">
//                                                 <span>TOTAL ITEM :</span>
//                                                 <span>{carts?.length}</span>
//                                             </div>
//                                             <div className="flex justify-between">
//                                                 <span>TOTAL QUANTITY :</span>
//                                                 <span>{carts?.reduce((acc, item) => acc + item.quantity, 0)}</span>
//                                             </div>
//                                             <div className="mt-4 space-y-2 border-t pt-2">
//                                                 {/* <div className="flex justify-between">
//                                                     <span>SUBTOTAL :</span>
//                                                     <span>₹{subtotal?.toFixed(2)}</span>
//                                                 </div> */}

//                                                 {/* <div className="flex justify-between">
//                                                     <span>TAX :</span>
//                                                     <span>₹{carts?.others}</span>
//                                                 </div> */}
//                                                 {/* <div className="flex justify-between">
//                                                     <span>SHIPPING :</span>
//                                                     <span>₹{carts.shipping.toFixed(2)}</span>
//                                                 </div>
                                                
//                                                 <div className="flex justify-between">
//                                                     <span>DISCOUNT :</span>
//                                                     <span>₹{carts.discount.toFixed(2)}</span>
//                                                 </div> */}
//                                             </div>
//                                             <div className="flex justify-between font-medium">
//                                                 <span>Total Amount :</span>
//                                                 <span>₹{carts?.reduce((acc, item:any) => acc + (item.price * item.quantity), 0)}</span>
//                                             </div>
//                                         </div>

//                                         {/* Warning Message */}
//                                         {/* <div className="mt-4 flex justify-center items-center gap-2 text-sm text-red-500">
//                                             <AlertTriangle className="h-4 w-4" />
//                                             <span>Bill not generated by the seller</span>
//                                         </div> */}

//                                     </div>
//                                     {/* Action Buttons */}
//                                     <div className="mt-6 flex gap-4">
//                                         <button onClick={() => setIsModalOpen(true)} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#6D2323] py-2 text-white hover:bg-[#6D2323]">
//                                             <MessageSquare className="h-4 w-4" />
//                                             Send Enquiry
//                                         </button>

//                                     </div>

//                                     <SendEnquiryModal
//                                         isOpen={isModalOpen}
//                                         onClose={() => setIsModalOpen(false)}
//                                         onConfirm={handleConfirm}
//                                         title="Send Enquiry ?"
//                                         message="Are you sure want to send Enquiry ?"

//                                     />

//                                     {/* {showSuccess && (
//                                         <>
//                                             <SuccessMessage />
//                                         </>
//                                     )} */}


//                                     {/* Product List */}
//                                     {/* <div className="mt-6 space-y-4">
//                                         {cart?.map((product:any, index:any) => (
//                                             <div
//                                                 key={index}
//                                                 className="flex gap-4 rounded-lg border bg-white p-4"
//                                             >
//                                                 <div className="relative h-20 w-20 overflow-hidden rounded-lg">
//                                                     <Image
//                                                         src={product.image}
//                                                         alt={product.name}
//                                                         fill
//                                                         className="object-cover"
//                                                     />
//                                                 </div>
//                                                 <div className="flex-1">
//                                                     <h3 className="flex justify-start font-semibold">{product.name}</h3>
//                                                     <div className="mt-1 space-y-1 text-xs text-gray-500">
//                                                         <div className="flex justify-between">
//                                                             <span>MOQ: {product.moq || 1}</span>
//                                                             <span>Total Qty: {product.quantity}</span>
//                                                         </div>
//                                                         <div className="flex justify-between">
//                                                             <span>MRP: ₹{product.price}</span>
//                                                             <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
//                                                             </div>
//                                                         <div className="flex justify-between font-semibold text-gray-900">
//                                                             <span>Total Amount:</span>
//                                                             <span>₹{totalAmount.toFixed(2)}</span>
//                                                             </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div> */}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// }