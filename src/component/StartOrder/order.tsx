'use client'

import { ArrowLeft, Search, ShoppingCart, Clock } from 'lucide-react'
import { useState } from 'react';
import Qr from '@/assets/qr.svg'
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function StartOrderMain() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  return (
    <div className="min-h-screen bg-[#FFEFD3]">
      {/* Header */}
      <header className="fixed top-0 left-0 h-16 right-0 bg-white border-b px-4 py-3 flex items-center justify-between z-10">
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
      <main className="pt-16 px-4" onClick={() => router.push('/supplier-product-list')}>
        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search in here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#6D2323]"
          />
        </div>

        {/* QR Scanner Area */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Scan the QR Code to process your payment
          </p>
          <div className="relative mx-auto w-full max-w-xs aspect-square bg-white rounded-lg shadow-lg p-4">
            {/* QR Code Placeholder */}
            <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
              <Image
                src={Qr}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
              {/* Scanning Animation Line */}
              <div className="absolute left-0 right-0 h-0.5 bg-[#6D2323] animate-[scan_2s_linear_infinite]"></div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="flex justify-around py-2">
            <button className="flex flex-col items-center p-2 text-[#6D2323]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>              <span className="text-xs mt-1">Library</span>
            </button>
            <button className="flex flex-col items-center p-2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>              <span className="text-xs mt-1">Scan History</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}