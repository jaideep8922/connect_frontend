import { Star } from 'lucide-react'
import Image from 'next/image'

interface ReviewCardProps {
  name: string
  timeAgo: string
  rating: number
  comment: string
  avatarUrl: any
}

export function ReviewCard({ name, timeAgo, rating, comment, avatarUrl }: ReviewCardProps) {
  return (
    <div className="flex gap-3 border border-gray-100 p-4 shadow-md rounded-md m-2">
      <Image
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className="h-10 w-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">{name}</h3>
          <span className="text-sm text-gray-500">{timeAgo}</span>
        </div>
        <div className="mt-1 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-medium text-gray-700">{rating}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{comment}</p>
      </div>
    </div>
  )
}