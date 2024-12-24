"use client"
import BottomNavigation from '../global/bottomNavigation'
import { ManageCard } from './manageCard'
import { Pencil, Plus } from 'lucide-react'
import Pista from '@/assets/pista.jpg';

const products = [
  {
    id: "1",
    name: "Apple",
    image: Pista,
    price: 1299.26,
    originalPrice: 1299.26,
    moq: "200 xyz",

  },
  {
    id: "2",
    name: "Almonds",
    image: Pista,
    price: 1299.26,
    originalPrice: 1299.26,
    moq: "200 xyz",

  },
  {
    id: "3",
    name: "Pistachios",
    image: Pista,
    price: 1299.26,
    originalPrice: 1299.26,
    moq: "200 xyz",

  },
  {
    id: "4",
    name: "Cashew",
    image: Pista,
    price: 1299.26,
    originalPrice: 1299.26,
    moq: "200 xyz",

  },
]

export default function ManageMainPage() {
  return (
    <div className=" bg-gray-50">
      <div className="flex h-16 items-center overflow-y-hidden justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">Manage Products</h1>
        <button>
          <Pencil className="h-4 w-4 text-black" />
        </button>
      </div>      
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-2  gap-2">
          {products.map((product) => (
            <ManageCard
              key={product.id}
              product={product}
              onEdit={(product) => {
                console.log("Edit product:", product)
              }}
            />
          ))}
        </div>
        <button

          className="fixed bottom-4 right-4 rounded-full shadow-lg"
        >
          <Plus className="h-4 w-4" />
        </button>
      </main>
      <div className='mt-20'>
        <BottomNavigation />

      </div>
    </div>
  )
}