import Image from "next/image"
import { Pencil, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { formatDate } from "../global/productCard";
import Link from "next/link";

interface ProductCardProps {
    product: any
    onEdit: (product: any) => void
}

export function ManageCard({ product, onEdit }: ProductCardProps) {

    // console.log("product", product)
    // const router = useRouter()

    const [selectedPrice, setSelectedPrice] = useState<string>("");
    const [custId, setCustId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const localData = localStorage.getItem('userDetails');

            if (localData) {
                const parsedData = JSON.parse(localData);
                const custIdFromLocalStorage = parsedData?.data?.customId;
                if (custIdFromLocalStorage) {
                    setCustId(custIdFromLocalStorage);
                }
            }
        }
    }, []);

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPrice(event.target.value);
    };

    return (
        <div className="border bg-[#FFFFFF] rounded-lg shadow-md p-2">
            <Link href={`/single-view?id=${product.productId}&sellerId=${custId}`} >
                <div className="relative">
                    <Image
                        width={200}
                        height={150}
                        src={product?.productImage}
                        alt={product.name || "Product Image"}
                        className="object-cover w-full h-32 rounded-t-lg"
                    />
                    {product?.moq?.length > 0 && (
                        <span className="absolute bottom-0 left-0 flex items-center justify-between w-full px-2 py-1 text-[0.5rem] text-white rounded bg-gradient-to-r from-black to-transparent">
                            MOQ: {product.moq}
                            <p>{formatDate(product?.updatedAt)}</p>
                        </span>
                    )}
                </div>
            </Link>

            {/* <div className="p-2"> */}

            <h3 className="font-medium text-black">{product.productName}</h3>
            <div className="mt-2">
                <label className="flex items-center text-xs text-black">
                    {/* <input
                            type="radio"
                            name="price"
                            value="average"
                            checked={selectedPrice === "average"}
                            onChange={handlePriceChange}
                            className="mr-2"
                        /> */}
                    Average: <span className="px-1 font-semibold text-black">{product?.averagePrice}</span>
                </label>
            </div>
            <div className="mt-2">
                <label className="flex items-center text-xs text-black">
                    {/* <input
                            type="radio"
                            name="price"
                            value="good"
                            checked={selectedPrice === "good"}
                            onChange={handlePriceChange}
                            className="mr-2"
                        /> */}
                    Good: <span className="px-1 font-semibold text-black">{product?.goodPrice}</span>
                </label>
            </div>
            <div className="mt-2">
                <label className="flex items-center text-xs text-black">
                    {/* <input
                            type="radio"
                            name="price"
                            value="high"
                            checked={selectedPrice === "high"}
                            onChange={handlePriceChange}
                            className="mr-2"
                        /> */}
                    High: <span className="px-1 font-semibold text-black">{product?.highPrice}</span>
                </label>
            </div>
            {/* <div className="mt-1 text-sm">
                    <span className="text-muted-foreground">₹ </span>
                    <span>{product.originalPrice}</span>
                </div> */}
            {/* <div className="mt-1 text-sm">
                    <span className="text-muted-foreground">₹ </span>
                    <span className="font-medium">{product.price}</span>
                </div> */}
            <button
                className="w-full text-[#3A6B34] flex justify-center items-center gap-1 border-2 border-[#3A6B34] p-1 rounded-lg gap-2 mt-4"
                onClick={(e) => { e.stopPropagation(); onEdit(product) }}
            >
                Edit Product
                <Pencil className="w-4 h-3 text-[#3A6B34]" />
            </button>
            {/* </div> */}
        </div>
    )
}