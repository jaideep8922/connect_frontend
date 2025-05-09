"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import vegetablesImage from "@/assets/veg.svg";
import fruitsImage from "@/assets/fruits.svg";
import beveragesImage from "@/assets/beverage.svg";
import groceryImage from "@/assets/grocery.svg";
import edibleOilImage from "@/assets/edibleoil.svg";
import householdImage from "@/assets/household.svg";
import babyCareImage from "@/assets/babycare.svg";

export default function CategoriesPage() {

  const categories = [
    {
      id: 1,
      name: "Vegetables",
      image: vegetablesImage,
      bgColor: "#E6F2EA",
      alt: "Vegetables",
    },
    {
      id: 2,
      name: "Fruits",
      image: fruitsImage,
      bgColor: "#FFE9E5",
      alt: "Fruits",
    },
    {
      id: 3,
      name: "Beverages",
      image: beveragesImage,
      bgColor: "#FFF6E3",
      alt: "Beverages",
    },
    {
      id: 4,
      name: "Grocery",
      image: groceryImage,
      bgColor: "#F3EFFA",
      alt: "Grocery",
    },
    {
      id: 5,
      name: "Edible oil",
      image: edibleOilImage,
      bgColor: "#DCF4F5",
      alt: "Edible oil",
    },
    {
      id: 6,
      name: "Household",
      image: householdImage,
      bgColor: "#FFE8F2",
      alt: "Household",
    },
    {
      id: 7,
      name: "Babycare",
      image: babyCareImage,
      bgColor: "#D2EFFF",
      alt: "Babycare",
    }
  ]

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center h-16 px-4 bg-white border-b">
        <button
          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-black cursor-pointer" onClick={() => window.history.back()} />
        </button>
        <h1 className="text-lg font-medium text-gray-900">Categories</h1>
      </header>

      <div className="min-h-screen bg-[#F7F8FC] p-4">


        <div className="flex flex-wrap items-center w-full gap-2 px-2 justify-evenly">
          {categories.slice(0, 6).map((category) => (
            <div key={category?.id} className="flex items-center justify-center w-[30%] bg-white rounded-md aspect-square">
              <div className="flex flex-col items-center justify-between gap-2">
                <button style={{ backgroundColor: category?.bgColor ? category?.bgColor : '#DCF4F5' }} className={`rounded-full p-2 flex items-center space-x-2 aspect-square w-12 justify-center cursor-auto`}>
                  <Image
                    src={category?.image}
                    alt={category?.alt}
                    width={20}
                    height={20}
                  />
                </button>
                <p className='text-xs text-center text-black font-extralight'>
                  {category?.name}
                </p>
              </div>
            </div>
          ))}
        </div>


      </div>
    </>
  );
}
