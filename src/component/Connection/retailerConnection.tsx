'use client'

import { useState, useEffect } from 'react'
import { MoreHorizontal, Ban, Pause, ArrowLeft } from 'lucide-react'

// Replace with your API endpoint
// const localData: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
const getLocalData = () => {
  try {
    const data = localStorage.getItem('userDetails')
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error reading from localStorage:", error)
    return null
  }
}

const localData = getLocalData()

const customId = localData?.data?.customId; 

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/retailer-list?sellerId=${customId}`

export default function RetailerConnectionTable() {
  const [retailers, setRetailers] = useState<any[]>([])
  const [retailerStatus, setRetailerStatus] = useState<{ [key: number]: string }>({})
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

  // Fetch retailer list from API
  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`)
        }
        const data = await response.json()
        if (data.success) {
          // Map API response data to match the table requirements
          const formattedData = data.data.map((retailer: any) => ({
            id: retailer.id,
            name: retailer.businessOwner,
            onboardedOn: new Date(retailer.createdAt).toLocaleDateString(),
            city: retailer.city,
          }))
          setRetailers(formattedData)
        }
      } catch (error) {
        console.error("Error fetching retailer data:", error)
      }
    }
    fetchRetailers()
  }, [])

  const handleAction = (id: number, action: 'block' | 'suspend') => {
    setRetailerStatus(prev => ({ ...prev, [id]: action }))
    setOpenDropdown(null)
  }

  return (
    <>
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
        <button
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 cursor-pointer text-black" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium text-black">My Connection</h1>

        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          <span className="sr-only">Notifications</span>
        </div>
      </header>
      <div className="container mx-auto py-4 px-4">
        <h2 className="text-2xl font-bold mb-4 text-black">Retailer List</h2>
        <div className="">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-normal text-black">Name</th>
                <th className="py-3 px-4 text-left text-xs font-normal text-black">Onboarded</th>
                <th className="py-3 px-4 text-left text-xs font-normal text-black">City</th>
                <th className="py-3 px-4 text-right text-xs font-normal text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {retailers.map((retailer) => (
                <tr
                  key={retailer.id}
                  className={`border-b ${retailerStatus[retailer.id] === 'block'
                    ? 'bg-red-100'
                    : retailerStatus[retailer.id] === 'suspend'
                      ? 'bg-yellow-100'
                      : ''
                    }`}
                >
                  <td className="py-2 px-4 text-xs font-normal text-black">{retailer.name}</td>
                  <td className="py-2 px-4 text-[10px] font-normal text-black">{retailer.onboardedOn}</td>
                  <td className="py-2 px-4 text-[10px] font-normal text-black">{retailer.city}</td>
                  <td className="py-2 px-4 text-right text-[10px] font-normal text-black">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === retailer.id ? null : retailer.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                      {openDropdown === retailer.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                          <button
                            onClick={() => handleAction(retailer.id, 'block')}
                            className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
                          >
                            <Ban className="inline-block mr-2 h-4 w-4" />
                            Block
                          </button>
                          <button
                            onClick={() => handleAction(retailer.id, 'suspend')}
                            className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
                          >
                            <Pause className="inline-block mr-2 h-4 w-4" />
                            Suspend
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}