// "use client"
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";

// export default function SingleOrderRequestMain() {
//     return (
//         <>
//             <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
//                 <button
//                     className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
//                     aria-label="Go back"
//                 >
//                     <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
//                 </button>

//                 <h1 className="text-lg font-medium">Request Order</h1>

//                 <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">

//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>          <span className="sr-only">Notifications</span>
//                 </div>
//             </header>
//             <div className="max-w-md mx-auto p-4 bg-white">
//                 {/* Header */}
//                 <div className="flex justify-between text-sm text-gray-500 mb-4">
//                     <h2 className="font-medium text-black text-lg">Recent Order</h2>
//                     <div className="text-right">
//                         <p>Date: 05-07-2024</p>
//                         <p>Time: 10:15 p.m</p>
//                     </div>
//                 </div>

//                 {/* Order Info Card */}
//                 <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
//                     <div className="flex justify-between items-start mb-4">
//                         <div>
//                             <h3 className="font-medium mb-1">Buyer Name</h3>
//                             <p className="text-sm text-gray-500">Order ID - A124312365894</p>
//                         </div>
//                         <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
//                             Pending
//                         </span>
//                     </div>

//                     {/* Stats */}
//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                         <div>
//                             <p className="text-2xl font-bold">1326</p>
//                             <p className="text-sm text-gray-500">Total Items</p>
//                         </div>
//                         <div>
//                             <p className="text-2xl font-bold">1326</p>
//                             <p className="text-sm text-gray-500">Total Quantity</p>
//                         </div>
//                     </div>

//                     {/* Open Order Button */}
//                     <Link href='/request-cart'>
//                     <button className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2" >
//                         Open Order
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                         </svg>
//                     </button>
//                     </Link>
//                 </div>

//                 {/* Message Note */}
//                 <div className="bg-white rounded-xl shadow-sm border p-4 relative">
//                     <div className="flex justify-between items-center mb-4">
//                         <h3 className="font-medium flex items-center gap-2">
//                             Message Note
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                             </svg>
//                         </h3>
//                         <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
//                             Pending
//                         </span>
//                     </div>

//                     <div className="space-y-3">
//                         <div>
//                             <p className="text-gray-600 mb-1">
//                                 Lorem Ipsum is simply dummy text of the printing and typesetting industry.standard
//                                 dummy text ever since the 1500s,
//                             </p>
//                             <p className="text-sm text-gray-400">12:01 PM</p>
//                         </div>
//                         <div>
//                             <p className="text-gray-600 mb-1">
//                                 standard dummy text ever since the 1500s,
//                             </p>
//                             <p className="text-sm text-gray-400">10:51 AM</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

