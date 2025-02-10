

'use client'

import BottomNavigation from '../global/bottomNavigation'
import { ManageCard } from './manageCard'
import { ArrowLeft, Pencil, Plus } from 'lucide-react'
import Pista from '@/assets/pista.jpg';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function ManageMainPage() {
  const router = useRouter()
  
  const [products, setProducts] = useState<any>([]);
  const [customId, setCustomId] = useState<string | null>(null);  // We'll store customId in state

  // Safe access to localStorage, ensuring this runs client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserDetails = localStorage.getItem('userDetails');
      if (storedUserDetails) {
        try {
          const userDetails = JSON.parse(storedUserDetails);
          setCustomId(userDetails?.data?.customId || null);
        } catch (error) {
          console.error("Error parsing user details:", error);
          // Optionally display a toast or alert for invalid data
        }
      } else {
        console.error("No user details found in localStorage.");
        // Optionally show a toast or redirect user to login page
      }
    }
  }, []);

 

  // Fetch product list once customId is available
  useEffect(() => {
    if (customId) {
      const fetchProductList = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get-product-list?sellerId=${customId}`);
  
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
  
          const data = await response.json();
          setProducts(data);
        } catch (err: any) {
          console.error("Error fetching product list:", err.message);
        }
      };
  
      fetchProductList();
    }
  }, [customId]);  // Re-run if customId changes

  const handleAdd = () => {
    router.push('/add-product')
  }

  console.log("products", products);
  return (
    <>
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
        <button
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium">Product Manage Details</h1>

        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>
          <span className="sr-only">Notifications</span>
        </div>
      </header>

      <div className=" bg-[#FFEFD3]">
        <div className="flex h-16 items-center overflow-y-hidden justify-between p-4 border-b border-[#6D2323]">
          <h1 className="text-xl font-semibold text-black">Manage Products</h1>
          <button>
            <Pencil className="h-4 w-4 text-black" onClick={handleAdd} />
          </button>
        </div>
        <main className="container mx-auto p-4">
          {products?.data?.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {products?.data?.map((product: any) => (
                <ManageCard
                  key={product.id}
                  product={product}
                  onEdit={(product) => {
                    console.log("Edit product:", product)
                  }}
                />
              ))}
            </div>
          )}
          <button className="fixed bottom-4 right-4 rounded-full shadow-lg">
            <Plus className="h-4 w-4" />
          </button>
        </main>
        <div className='mt-20'>
          <BottomNavigation />
        </div>
      </div>
    </>
  )
}
