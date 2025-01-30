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
    const localData: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const customId = localData?.data?.customId;

    // Fetch product list on component mount
    useEffect(() => {
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
    // const handleSave = async () => {
    //     setEditMode(false);
    //     console.log("Saving products:", products);

    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/update-product`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 sellerId: customId,
    //                 products: products.map(({ id, averagePrice, goodPrice, highPrice }) => ({
    //                     id,
    //                     averagePrice,
    //                     goodPrice,
    //                     highPrice,
    //                 })),
    //             }),
    //         });

    //         if (!response.ok) {
    //             throw new Error(`Error: ${response.status} ${response.statusText}`);
    //         }

    //         const result = await response.json();
    //         console.log("Update successful:", result);
    //         alert("Products updated successfully!");
    //     } catch (error: any) {
    //         console.error("Error updating products:", error.message);
    //     }
    // };

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

            <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
                <button
                    className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
                    aria-label="Go back"
                >
                    <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
                </button>
                <h1 className="text-lg font-medium">Product Details</h1>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <span className="sr-only">Notifications</span>
                </div>
            </header>

            <div className="container mx-auto py-10 px-4">
                <h1 className="text-xl font-bold">Product Management</h1>
                <div className="flex justify-end items-end mb-6 mt-3">
                    <div className="space-x-2">
                        <button
                            className="px-2 py-2 bg-[#6D2323] text-white text-xs rounded-md hover:bg-gray-800"
                            onClick={() => setEditMode(!editMode)}
                        >
                            {editMode ? "Cancel" : "Edit Products"}
                        </button>
                        {editMode && (
                            <button
                                className="px-2 py-2 bg-[#6D2323] text-xs text-white rounded-md hover:bg-[#6D2323]"
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>
                        )}
                    </div>
                </div>

                <div className="border rounded-lg overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-200 px-4 py-5 text-left text-xs">Image</th>
                                <th className="border border-gray-200 px-4 py-5 text-left text-xs">Product</th>
                                <th className="border border-gray-200 px-4 py-5 text-left text-xs">Average(₹)</th>
                                <th className="border border-gray-200 px-4 py-5 text-left text-xs">Good(₹)</th>
                                <th className="border border-gray-200 px-4 py-5 text-left text-xs">High(₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product: any) => (
                                <tr key={product.id} className="hover:bg-[#FFEFD3] cursor-pointer">
                                    <td className="border border-gray-200 px-4 py-5">
                                        <img
                                            src={product.productImage}
                                            alt={product.productName}
                                            width={50}
                                            height={20}
                                            className="rounded-lg object-cover"
                                        />
                                    </td>
                                    <td className="border border-gray-200 px-4 py-5 text-xs">{product.productName}</td>
                                    <td className="border border-gray-200 px-2 py-5 text-xs">
                                        {editMode ? (
                                            <input
                                                type="number"
                                                value={product.averagePrice || ""}
                                                onChange={(e) =>
                                                    handlePriceChange(product.id, "averagePrice", e.target.value)
                                                }
                                                className="w-full border rounded p-1 text-xs"
                                            />
                                        ) : (
                                            `₹${product.averagePrice || "N/A"}`
                                        )}
                                    </td>
                                    <td className="border border-gray-200 px-2 py-2 text-xs">
                                        {editMode ? (
                                            <input
                                                type="number"
                                                value={product.goodPrice || ""}
                                                onChange={(e) =>
                                                    handlePriceChange(product.id, "goodPrice", e.target.value)
                                                }
                                                className="w-full border rounded p-1 text-xs"
                                            />
                                        ) : (
                                            `₹${product.goodPrice || "N/A"}`
                                        )}
                                    </td>
                                    <td className="border border-gray-200 px-2 py-2 text-xs">
                                        {editMode ? (
                                            <input
                                                type="number"
                                                value={product.highPrice || ""}
                                                onChange={(e) =>
                                                    handlePriceChange(product.id, "highPrice", e.target.value)
                                                }
                                                className="w-full border rounded p-1 text-xs"
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