"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Pista from "@/assets/pista.jpg";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Premium Coffee Beans",
    image: Pista,
    prices: {
      average: {
        qty: "250g",
        price: "₹250",
        trends: ["₹240", "₹245", "₹250", "₹255", "₹250", "₹260", "₹250", "₹245", "₹255", "₹250"],
      },
      good: {
        qty: "500g",
        price: "₹450",
        trends: ["₹430", "₹440", "₹450", "₹460", "₹450", "₹470", "₹450", "₹440", "₹460", "₹450"],
      },
      high: {
        qty: "1kg",
        price: "₹850",
        trends: ["₹820", "₹830", "₹850", "₹860", "₹850", "₹870", "₹850", "₹840", "₹860", "₹850"],
      },
    },
    description: "Freshly roasted premium coffee beans sourced from Colombia.",
  },
];

export default function SingleDetailsCard() {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/cart");
  };

  const [selectedPrice, setSelectedPrice] = useState<string>("");

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPrice(event.target.value);
  };

  const [showTrends, setShowTrends] = useState<string | null>(null);

  return (
    <>
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
        <button
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium">Product Details</h1>

        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
          
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
          <span className="sr-only">Notifications</span>
        </div>
      </header>

    <div className="flex flex-wrap justify-center gap-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="w-full max-w-lg bg-white overflow-hidden shadow-lg rounded-lg"
        >
          <div className="relative">
            <button
              className="absolute left-2 top-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5 cursor-pointer" />
            </button>
            <span className="absolute top-2 right-2 text-[10px] bg-black text-white px-4 py-1 rounded">
              Last Updated: 28-12-24
            </span>
            <Image
              src={product.image}
              alt={product.name}
              width={320}
              height={350}
              className="w-full h-[350px] object-cover rounded-t-lg"
            />
          </div>

          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <div className="space-y-3">
              {Object.entries(product.prices).map(([key, value]) => (
                <div key={key}>
                  <label className="flex items-center text-sm">
                    <input
                      type="radio"
                      name="price"
                      value={key}
                      checked={selectedPrice === key}
                      onChange={handlePriceChange}
                      className="mr-2"
                    />
                    {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                    <span className="px-1 font-semibold">{value.price}</span>
                  </label>
                  <button
                    className="text-[#6D2323] text-xs underline ml-6"
                    onClick={() =>
                      setShowTrends(showTrends === key ? null : key)
                    }
                  >
                    {showTrends === key ? "Hide Old Price" : "View Old Price"}
                  </button>
                  {showTrends === key && (
                    <div className="text-xs text-gray-600 mt-2">
                      <p className="font-medium">Price Trends (Last 10 Days):</p>
                      <ul className="list-disc pl-5">
                        {value.trends.map((price, idx) => (
                          <li key={idx}>{price}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold">
              Description:{" "}
              <span className="font-normal">{product.description}</span>
            </p>
            
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
