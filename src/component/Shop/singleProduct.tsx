"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, ShoppingCart, CheckCircle } from "lucide-react"
import Pista from '@/assets/pista.jpg';
import { useRouter } from 'next/navigation';


const products = [
  {
    id: 1,
    name: "Premium Coffee Beans",
    image: Pista,
    prices: {
      average: { qty: "250g", price: "₹250" },
      good: { qty: "500g", price: "₹450" },
      high: { qty: "1kg", price: "₹850" },
    },
    description: "Freshly roasted premium coffee beans sourced from Colombia. Freshly roasted premium coffee beans sourced from Colombia.Freshly roasted premium coffee beans sourced from Colombia.",
  },
]

export default function SingleProductCard() {

  const router = useRouter()
  const handleNavigate = () => {
    router.push('/cart')
  }

  const [selectedPrice, setSelectedPrice] = useState<string>("");

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPrice(event.target.value);
  };


  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product, index) => (
        <div key={index} className="w-full bg-white overflow-hidden shadow-lg">
          <div className="relative">
            <button className="absolute left-2 top-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
              <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
            </button>
            <Image
              src={product.image}
              alt={product.name}
              width={320}
              height={350}
              className="w-full h-[350px] object-cover"
            />
            {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-6 h-2 rounded-full bg-blue-500" />
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <div className="w-2 h-2 rounded-full bg-gray-300" />
            </div> */}
          </div>

          <div className="p-4 space-y-3 mt-2">
            <h3 className="text-xl font-bold">{product.name}</h3>

            <div className="space-y-2">
              {/* <p className="text-sm font-semibold">
                Average Qty: <span className="font-medium">{product.prices.average.qty}</span>
              </p>
              <p className="text-sm font-semibold">
                Good Qty: <span className="font-medium">{product.prices.good.qty}</span>
              </p>
              <p className="text-sm font-semibold">
                High Qty: <span className="font-medium">{product.prices.high.qty}</span>
              </p> */}

              <div className="mt-2">
                <label className="flex items-center text-sm ">
                  <input
                    type="radio"
                    name="price"
                    value="average"
                    checked={selectedPrice === "average"}
                    onChange={handlePriceChange}
                    className="mr-2"
                  />
                  Average: <span className="px-1 font-semibold">{'500'}</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="price"
                    value="good"
                    checked={selectedPrice === "good"}
                    onChange={handlePriceChange}
                    className="mr-2"
                  />
                  Good: <span className="px-1 font-semibold">{'1500'}</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="price"
                    value="high"
                    checked={selectedPrice === "high"}
                    onChange={handlePriceChange}
                    className="mr-2"
                  />
                  High: <span className="px-1 font-semibold">{'2000'}</span>
                </label>
              </div>

            </div>
            <p className="text-sm font-semibold">
              Description: <span className="font-normal">{product.description}</span>
            </p>


            <button
              className="w-full bg-blue-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
              onClick={handleNavigate}
            >
              Add to cart
              <ShoppingCart className="w-5 h-5" />
            </button>

          </div>
        </div>
      ))}
    </div>
  )
}
