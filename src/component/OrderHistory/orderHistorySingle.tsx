"use client"
import Image from 'next/image'
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation"


interface OrderProduct {
    id: number;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    product: {
        id: number;
        productName: string;
        productImage: string;
        description: string;
    };
}

interface OrderDetails {
    id: number;
    orderId: string;
    statusId: number;
    totalItem: number;
    totalQuantity: number;
    notes: string;
    OrderProductDetails: OrderProduct[];
}


export default function OrderDetailsSingle() {

    const pathname = usePathname();
    const orderId = pathname.split("/").pop();
    const [order, setOrder] = useState<any>(null);
    const [customId, setCustomId] = useState<string | null>(null);
    const [userData, setUserData] = useState<string | null>(null);

    // Fetch localStorage data only on the client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            const localData: any = JSON.parse(localStorage.getItem("userDetails") || "{}");
            const storedCustomId = localData?.data?.customId || null;
            setCustomId(storedCustomId);

            const userType = localStorage.getItem("userType");
            setUserData(userType);
        }
    }, []);

    console.log("customId", customId);

    useEffect(() => {
        if (!customId || !userData) return;

        const fetchOrderDetails = async () => {
            try {
                let response;
                let apiEndpoint = "";

                if (userData === "Retailer") {
                    apiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/get-order-history-by-retailer-id`;
                } else if (userData === "Supplier") {
                    apiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/get-order-history-by-supplier-id`;
                } else {
                    console.error("Invalid userType:", userData);
                    return; // Exit function if userType is unknown
                }

                response = await fetch(apiEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ customId }),
                });

                const data = await response.json();
                console.log("Order Data:", data);

                if (data.success) {
                    const matchingOrder = data.data.find((order: OrderDetails) => order.orderId === orderId);
                    setOrder(matchingOrder);
                }
            } catch (error) {
                console.error("Failed to fetch order details:", error);
            }
        };

        fetchOrderDetails();
    }, [customId, userData]);

    const statusMapping: { [key: number]: string } = {
        1: "Pending",
        2: "Accepted",
        3: "Processing",
        4: "Completed",
        5: "Cancelled",
    };
    const statusColors: { [key: string]: string } = {
        Pending: "bg-yellow-100 text-yellow-800",
        Accepted: "bg-pink-100 text-pink-800",
        Completed: "bg-green-100 text-green-800",
        Cancelled: "bg-red-100 text-red-800",
        Processing: "bg-blue-100 text-blue-800",
    };

    const status = statusMapping[order?.statusId];

    const formattedDate = new Date(order?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const formattedTime = new Date(order?.createdAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    console.log("order", order)


    return (
        <>
            <header className="sticky top-0 z-10 flex items-center justify-between h-20 px-4 bg-white border-b">
                <button
                    className="flex items-center justify-center p-2 text-black rounded-full hover:bg-gray-100"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => window.history.back()} />
                </button>

                <h1 className="text-lg font-medium text-black">Order History</h1>

                <div className="relative flex items-center justify-center w-8 h-8 text-white rounded-full bg-emerald-500">
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold">
                        2
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>
                    <span className="sr-only">Notifications</span>
                </div>
            </header>

            <div className="max-w-md p-4 mx-auto bg-white">

                {/* Header */}
                <div className='p-3 mb-5 border rounded-lg shadow-lg'>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-black">Status:</span>
                            <span
                                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[status]
                                    }`}
                            >
                                {status}
                            </span>
                            {/* <span className="px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded-full">{order?.statusId}</span> */}
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">ORDER ID: </span>
                            <span className="font-medium text-black">{order?.orderId}</span>
                        </div>
                    </div>

                    {/* Date and Time */}
                    <div className="flex justify-between mb-4 text-sm">
                        <div>
                            <span className="text-gray-500">Date: </span>
                            <span className='text-black'>{formattedDate}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Time: </span>
                            <span className='text-black'>{formattedTime}</span>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="mb-4 text-sm">
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-500">TOTAL ITEMS :</span>
                            <span className='text-black'>{order?.totalItem}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-500">TOTAL QUANTITY :</span>
                            <span className='text-black'>{order?.totalQuantity}</span>
                        </div>

                        <div className="space-y-2">

                            {/* Uncomment this if shipping and discount are included */}

                            <div className="flex justify-between">
                                <span className="text-gray-500">TAX :</span>
                                <span className='text-black'>  {order?.OrderProductDetails[0]?.product?.tax}
                                </span>
                            </div>
                            {/* <div className="flex justify-between">
    <span className="text-gray-500">DISCOUNT</span>
    <span>₹40.0</span>
  </div>
  */}
                            <div className="flex justify-between pt-2 font-medium border-t">
                                <span className='text-black'>Total Amount :</span>
                                <span className='text-black'>
                                    ₹
                                    {order?.OrderProductDetails?.reduce(
                                        (acc: number, item: any) => acc + item.quantity * item.price,
                                        0
                                    )}
                                </span>
                            </div>
                            <div className="flex pt-2 font-medium border-t">
                                <span className='text-black'>Notes : </span>
                                <span className='text-black'>
                                    {order?.notes}
                                </span>
                            </div>
                        </div>

                    </div>
                    {/* Bill Notice */}
                    {/* <div className="flex items-center justify-center gap-2 text-sm text-red-500 ">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Bill not generated by the seller</span>
                </div> */}
                </div>


                {/* Product List */}
                <div className="space-y-4">
                    {order?.OrderProductDetails?.map((item: any, index: number) => (
                        <div key={index} className="flex gap-4 p-3 text-black border rounded-lg">
                            <Image
                                src={item?.product?.productImage}
                                alt={item.name || "Product Image"}
                                width={80}
                                height={80}
                                className="object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <h3 className="mb-1 font-medium">{item?.product?.productName}</h3>
                                <div className="space-y-1 text-sm text-gray-500">
                                    <div className="flex justify-between">
                                        <span>MRP : ₹{item?.price}</span>
                                        <span>Net Qty : {item?.quantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>MOQ :<b className='font-medium text-black'> {item?.product?.moq}</b></span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total Amount: <p className='font-semibold text-black'>₹{item?.price * item.quantity}</p></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}