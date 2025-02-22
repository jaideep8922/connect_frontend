import Image from "next/image"
import { Pencil, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useState } from "react";

interface ProductCardProps {
    product: any
    onEdit: (product: any) => void
}

export function ManageCard({ product, onEdit }: ProductCardProps) {

    console.log("product", product)
    const router = useRouter()

    const handleClick = () => {
        router.push('/manage-edit')
    }

    const [selectedPrice, setSelectedPrice] = useState<string>("");

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPrice(event.target.value);
    };

    return (
        <div className="rounded-lg border border-[#6d232353] bg-card text-card-foreground shadow-xl" onClick={handleClick}>
            <div className="relative">
                <img
                    src={product?.productImage}
                    alt={product.name}
                    className="object-cover rounded-t-lg h-32 w-full"
                />
               {product?.moq?.length > 0 && (
            <span className="absolute w-full bottom-0 left-0 text-white text-xs px-2 py-1 rounded bg-gradient-to-r from-black to-transparent">
            MOQ: {product.moq}
          </span>
          )}
            </div>
            <div className="p-2">
                <h3 className="font-medium">{product.productName}</h3>
                <div className="mt-2">
                    <label className="flex items-center text-xs ">
                        <input
                            type="radio"
                            name="price"
                            value="average"
                            checked={selectedPrice === "average"}
                            onChange={handlePriceChange}
                            className="mr-2"
                        />
                        Average: <span className="px-1 font-semibold">{product?.averagePrice}</span>
                    </label>
                </div>
                <div className="mt-2">
                    <label className="flex items-center text-xs">
                        <input
                            type="radio"
                            name="price"
                            value="good"
                            checked={selectedPrice === "good"}
                            onChange={handlePriceChange}
                            className="mr-2"
                        />
                        Good: <span className="px-1 font-semibold">{product?.goodPrice}</span>
                    </label>
                </div>
                <div className="mt-2">
                    <label className="flex items-center text-xs">
                        <input
                            type="radio"
                            name="price"
                            value="high"
                            checked={selectedPrice === "high"}
                            onChange={handlePriceChange}
                            className="mr-2"
                        />
                        High: <span className="px-1 font-semibold">{product?.highPrice}</span>
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
                    className="w-full text-white flex justify-center gap-1 bg-[#6D2323] p-1 rounded-lg items-center mt-4"
                    onClick={() => onEdit(product)}
                >
                    <Pencil className="h-3 w-4 text-white" />
                    Edit Product
                </button>
            </div>
        </div>
    )
}