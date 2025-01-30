// "use client"
// import Image from 'next/image'
// import { AlertTriangle, ArrowLeft } from 'lucide-react';
// import Pista from '../../assets/pista.jpg'

// interface Product {
//     name: string
//     image: any
//     mrp: number
//     weight: number
//     finalAmount: number
//     expiryDate: string
// }

// export default function OrderDetailsSingle() {
//     const products: Product[] = [
//         {
//             name: "Almonds",
//             image: Pista,
//             mrp: 99.0,
//             weight: 250,
//             finalAmount: 499.5,
//             expiryDate: "31/12/2025"
//         },
//         {
//             name: "Apple",
//             image: Pista,
//             mrp: 55.0,
//             weight: 500,
//             finalAmount: 249.5,
//             expiryDate: "31/12/2025"
//         },
//         {
//             name: "Cashew",
//             image: Pista,
//             mrp: 85.0,
//             weight: 250,
//             finalAmount: 449.5,
//             expiryDate: "31/12/2025"
//         },
//         {
//             name: "Wali-Nut",
//             image: Pista,
//             mrp: 120.0,
//             weight: 250,
//             finalAmount: 449.5,
//             expiryDate: "31/12/2025"
//         },
//         {
//             name: "Pistachios",
//             image: Pista,
//             mrp: 95.0,
//             weight: 250,
//             finalAmount: 449.5,
//             expiryDate: "31/12/2025"
//         }
//     ]

//     return (
//         <>
//             <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
//                 <button
//                     className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
//                     aria-label="Go back"
//                 >
//                     <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
//                 </button>

//                 <h1 className="text-lg font-medium">Order History</h1>

//                 <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
//                     <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold">
//                         2
//                     </span>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>
//                     <span className="sr-only">Notifications</span>
//                 </div>
//             </header>

//             <div className="max-w-md mx-auto bg-white p-4">

//                 {/* Header */}
//                 <div className='shadow-lg p-3 rounded-lg border mb-5'>
//                 <div className="flex justify-between items-center mb-2">
//                     <div className="flex items-center gap-2">
//                         <span className="text-sm font-medium">Status:</span>
//                         <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending</span>
//                     </div>
//                     <div className="text-sm">
//                         <span className="text-gray-500">ORDER ID: </span>
//                         <span className="font-medium">#12730</span>
//                     </div>
//                 </div>

//                 {/* Date and Time */}
//                 <div className="grid grid-cols-2 text-sm mb-4">
//                     <div>
//                         <span className="text-gray-500">Date: </span>
//                         <span>06/07/2024</span>
//                     </div>
//                     <div>
//                         <span className="text-gray-500">Time: </span>
//                         <span>11:15 am</span>
//                     </div>
//                 </div>

//                 {/* Order Summary */}
//                 <div className="text-sm mb-4">
//                     <div className="flex justify-between mb-1">
//                         <span className="text-gray-500">TOTAL ITEMS</span>
//                         <span>33</span>
//                     </div>
//                     <div className="flex justify-between mb-4">
//                         <span className="text-gray-500">TOTAL QUANTITY</span>
//                         <span>15</span>
//                     </div>

//                     <div className="space-y-2">
//                         <div className="flex justify-between">
//                             <span className="text-gray-500">SUBTOTAL</span>
//                             <span>₹100.0</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="text-gray-500">SHIPPING</span>
//                             <span>₹00.0</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="text-gray-500">DISCOUNT</span>
//                             <span>₹40.0</span>
//                         </div>
//                         <div className="flex justify-between font-medium pt-2 border-t">
//                             <span>Total Amount</span>
//                             <span>₹60.00</span>
//                         </div>
//                     </div>
//                 </div>
//                  {/* Bill Notice */}
//                  <div className="flex justify-center items-center gap-2 text-red-500 text-sm ">
//                     <AlertTriangle className="w-4 h-4" />
//                     <span>Bill not generated by the seller</span>
//                 </div>
//                 </div>

               

//                 {/* Product List */}
//                 <div className="space-y-4">
//                     {products.map((product) => (
//                         <div key={product.name} className="flex gap-4 p-3 border rounded-lg">
//                             <Image
//                                 src={product.image}
//                                 alt={product.name}
//                                 width={80}
//                                 height={80}
//                                 className="rounded-lg object-cover"
//                             />
//                             <div className="flex-1">
//                                 <h3 className="font-medium mb-1">{product.name}</h3>
//                                 <div className="text-sm text-gray-500 space-y-1">
//                                     <div className="flex justify-between">
//                                         <span>MRP ₹{product.mrp}</span>
//                                         <span>Net Qty: {product.weight}g</span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span>Total Amount: <p className='text-black font-semibold'>₹{product.finalAmount}</p></span>
//                                         {/* <span>Exp: {product.expiryDate}</span> */}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     )
// }

