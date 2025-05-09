'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function EditProductTable() {
    const [editMode, setEditMode] = useState(false);
    const router = useRouter();

    const [products, setProducts] = useState<any>([]);
    const [customId, setCustomId] = useState<string | null>(null);

    // Safe access to localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserDetails = localStorage.getItem('userDetails');
            if (storedUserDetails) {
                try {
                    const userDetails = JSON.parse(storedUserDetails);
                    setCustomId(userDetails?.data?.customId || null);
                } catch (error) {
                    console.error("Error parsing user details:", error);
                    toast.error("Failed to retrieve user details.");
                }
            } else {
                toast.error("No user details found, please log in.");
            }
        }
    }, []);

    // Fetch product list on component mount
    useEffect(() => {
        if (customId) {
            const fetchProductList = async () => {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get-product-list?sellerId=${customId}`
                    );

                    if (!response.ok) {
                        throw new Error(`Error: ${response.status} ${response.statusText}`);
                    }

                    const data = await response.json();
                    setProducts(data?.data);
                } catch (err: any) {
                    console.error("Error fetching product list:", err.message);
                }
            };

            fetchProductList();
        }
    }, [customId]);

    // Handle price changes in the table
    const handlePriceChange = (productId: number, priceKey: string, value: string) => {
        setProducts(
            products.map((product: any) => {
                if (product.id === productId) {
                    return {
                        ...product,
                        [priceKey]: value,
                    };
                }
                return product;
            })
        );
    };

    // Save changes to the backend
    const handleSave = async () => {
        setEditMode(false);
        console.log("Saving products:", products);

        try {
            // Prepare the data in the required format
            const transformedProducts = products.map((product: any) => ({
                productId: product.productId,
                productName: product.productName,
                averagePrice: product.averagePrice,
                goodPrice: product.goodPrice,
                highPrice: product.highPrice,
                description: product.description || "Product Description",
                sellerId: customId,
            }));

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/update-product`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transformedProducts),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Update successful:", result);
            toast.success("Products updated successfully!");
        } catch (error: any) {
            console.error("Error updating products:", error.message);
        }
    };

    return (
        <>
            <Toaster />

            <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-[#FF9A2D] px-4">
                <button
                    className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => window.history.back()} />
                </button>
                <h1 className="text-lg font-medium">Product Details</h1>
                <div className="relative flex items-center justify-center w-8 h-8 text-white rounded-full bg-emerald-500">
                    <span className="sr-only">Notifications</span>
                </div>
            </header>

            <div className="container px-4 py-10 mx-auto">
                <h1 className="text-xl font-bold text-black">Product Management</h1>
                <div className="flex items-end justify-end mt-3 mb-6">
                    <div className="space-x-2">
                        <button
                            className="px-2 py-2 bg-[#3A6B34] text-white text-xs rounded-md hover:bg-gray-800"
                            onClick={() => setEditMode(!editMode)}
                        >
                            {editMode ? "Cancel" : "Edit Products"}
                        </button>
                        {editMode && (
                            <button
                                className="px-2 py-2 bg-[#3A6B34] text-xs text-white rounded-md hover:bg-[#3A6B34]"
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto text-black border rounded-lg">
                    <table className="min-w-full border border-collapse border-gray-200">
                        <thead className="bg-[#FF9A2D]">
                            <tr className="text-white">
                                <th className="px-4 py-5 text-xs text-left border border-gray-200">Image</th>
                                <th className="px-4 py-5 text-xs text-left border border-gray-200">Name</th>
                                <th className="px-4 py-5 text-xs text-left border border-gray-200">Average(₹)</th>
                                <th className="px-4 py-5 text-xs text-left border border-gray-200">Good(₹)</th>
                                <th className="px-4 py-5 text-xs text-left border border-gray-200">High(₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product: any) => (
                                <tr key={product.id} className="hover:bg-[#FFEFD3] cursor-pointer">
                                    <td className="px-4 py-5 border border-gray-200">
                                        <img
                                            src={product.productImage}
                                            alt={product.productName}
                                            width={50}
                                            height={20}
                                            className="object-cover rounded-lg"
                                        />
                                    </td>
                                    <td className="px-4 py-5 text-xs border border-gray-200">{product.productName}</td>
                                    <td className="px-2 py-5 text-xs border border-gray-200">
                                        {editMode ? (
                                            <input
                                                type="number"
                                                value={product.averagePrice || ""}
                                                onChange={(e) =>
                                                    handlePriceChange(product.id, "averagePrice", e.target.value)
                                                }
                                                className="w-full p-1 text-xs bg-white border rounded"
                                            />
                                        ) : (
                                            `₹${product.averagePrice || "N/A"}`
                                        )}
                                    </td>
                                    <td className="px-2 py-2 text-xs border border-gray-200">
                                        {editMode ? (
                                            <input
                                                type="number"
                                                value={product.goodPrice || ""}
                                                onChange={(e) =>
                                                    handlePriceChange(product.id, "goodPrice", e.target.value)
                                                }
                                                className="w-full p-1 text-xs bg-white border rounded"
                                            />
                                        ) : (
                                            `₹${product.goodPrice || "N/A"}`
                                        )}
                                    </td>
                                    <td className="px-2 py-2 text-xs border border-gray-200">
                                        {editMode ? (
                                            <input
                                                type="number"
                                                value={product.highPrice || ""}
                                                onChange={(e) =>
                                                    handlePriceChange(product.id, "highPrice", e.target.value)
                                                }
                                                className="w-full p-1 text-xs bg-white border rounded"
                                            />
                                        ) : (
                                            `₹${product.highPrice || "N/A"}`
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}