'use client'

import { ArrowLeft, ShoppingCart, Search } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Pista from '@/assets/pista.jpg';
import { useRouter } from 'next/navigation';


interface Product {
  id: number
  name: string
  image: any
  price: number
  quantity: number,
  moq:string
}

export default function ProductListing() {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Apple', price: 1299.26, quantity: 1, image: Pista, moq:"30 xyz" },
    { id: 2, name: 'Almonds', price: 1599.26, quantity: 1, image: Pista,  moq:"30 xyz" },
    { id: 3, name: 'Hazelnuts', price: 1399.26, quantity: 1, image: Pista,  moq:"30 xyz" },
    { id: 4, name: 'Fox Nuts', price: 1489.26, quantity: 1, image: Pista,  moq:"30 xyz" },
    { id: 5, name: 'Fox Nuts', price: 1629.26, quantity: 1, image: Pista,  moq:"30 xyz" },
  ])

  const router = useRouter()

  const updateQuantity = (id: number, increment: boolean) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          quantity: increment ? product.quantity + 1 : Math.max(1, product.quantity - 1)
        }
      }
      return product
    }))
  }

  const [selectedPrice, setSelectedPrice] = useState<string>("");

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPrice(event.target.value);
  };


  return (
    <div className="min-h-screen bg-[#FFEFD3]">
      {/* Header */}
      <header className="fixed h-16 top-0 left-0 right-0 bg-white border-b px-3 py-1 flex items-center justify-between z-10">
        <div className="flex items-center gap-4 flex-1">
          <button className="p-1">
          <ArrowLeft className="w-5 h-5" onClick={() => window.history.back()} />
          </button>
          <h1 className="text-lg font-medium">Start Order</h1>
        </div>
        <button className="p-1">
          <ShoppingCart className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-2 mt-0 mb-5">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 " />
          <input
            type="text"
            placeholder="Almonds"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none "
          />
        </div>

        {/* Products Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden border">
              <div className="relative aspect-square" onClick={()=> router.push('/single-view')}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                  <div className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-black/50 px-2 py-1">
                                        <p className="text-xs text-white">MOQ: {product.moq}</p>
                </div>
              </div>
              
              <div className="p-3">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                {/* <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-md text-gray-500">₹</span>
                  <span className="font-medium">{product.price.toFixed(2)}</span>
                </div> */}
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

                <button className="mt-3 w-full py-1.5 bg-[#6D2323] text-white text-sm rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Order
                </button>

              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}