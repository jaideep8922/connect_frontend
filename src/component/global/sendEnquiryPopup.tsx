// 'use client'

// import { useState } from 'react'

// interface SendEnquiryModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onConfirm: () => void
//   title:string
// }

// export default function SendEnquiryModal({
//   isOpen,
//   onClose,
//   onConfirm,
//   title
// }: SendEnquiryModalProps) {
//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="w-full max-w-sm p-6 mx-8 bg-white rounded-lg">
//         <div className="p-4 ">
//           <h2 className="text-xl font-semibold text-left">{title}</h2>
//           <p className="mt-2 text-left text-gray-600">
//             Are you sure, You want to Send Enquiry!
//           </p>
//           <div className="flex justify-center gap-4 mt-6">
//             <button
//               onClick={onClose}
//               className="px-6 py-2 text-gray-600 border rounded-md hover:bg-gray-100"
//             >
//               No
//             </button>
//             <button
//               onClick={onConfirm}
//               className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
//             >
//               Yes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



'use client'

import { useState } from 'react'

interface SendEnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string  // ✅ Added message prop
}

export default function SendEnquiryModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message // ✅ Use this message prop
}: SendEnquiryModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm p-6 mx-8 bg-white rounded-lg">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-left text-black">{title}</h2>
          <p className="mt-2 text-left text-gray-600">
            {message} {/* ✅ Dynamically set message */}
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 border rounded-md hover:bg-gray-100"
            >
              No
            </button>
            <button
              onClick={onConfirm}
              className="rounded-md bg-[#3A6B34] px-6 py-2 text-white hover:bg-[#3A6B34]"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
