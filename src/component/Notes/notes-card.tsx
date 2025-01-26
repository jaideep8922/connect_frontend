// interface BookReviewProps {
//     text: string
//     timestamp: string
//     colorClass: string
//   }
  
//   export function BookReviewCard({ text, timestamp, colorClass }: BookReviewProps) {
//     return (
//       <div className={`${colorClass} rounded-lg p-4 shadow-sm`}>
//         <div className="space-y-2">
//           <h2 className="font-medium text-gray-900">Book Review :</h2>
//           <p className="text-sm text-gray-700">{text}</p>
//           <time className="block text-xs text-gray-600">{timestamp}</time>
//         </div>
//       </div>
//     )
//   }
  
  

import { Trash2 } from 'lucide-react'

interface BookReviewProps {
  text: string
  timestamp: string
  colorClass: string
}

export function BookReviewCard({ text, timestamp, colorClass }: BookReviewProps) {
  return (
    <div className={`relative group ${colorClass} rounded-lg p-4 shadow-sm overflow-hidden`}>
      <div className="space-y-2 relative z-10">
        <h2 className="font-medium text-gray-900">Notes :</h2>
        <p className="text-sm text-gray-700">{text}</p>
        <time className="block text-xs text-gray-600">{timestamp}</time>
      </div>

      {/* White Overlay and Delete Icon */}
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <button
          className="flex items-center justify-center rounded-full bg-red-500 p-3 text-white hover:bg-red-600 transition"
          aria-label="Delete review"
        >
          <Trash2 className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
