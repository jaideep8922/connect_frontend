"use client"
import { ArrowLeft } from "lucide-react"
import { ReviewCard } from "./review-card"
import Pista from '@/assets/pista.jpg';
import { useRouter } from 'next/navigation';

const reviews = [
  {
    name: "Haylie Aminoff",
    timeAgo: "25 minutes ago",
    rating: 4.5,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatarUrl: Pista,
  },
  {
    name: "Carla Septimus",
    timeAgo: "45 minutes ago",
    rating: 4.5,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatarUrl: Pista,
  },
  {
    name: "Carla George",
    timeAgo: "25 minutes ago",
    rating: 4.5,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatarUrl: Pista,
  },
  {
    name: "Maren Kenter",
    timeAgo: "45 minutes ago",
    rating: 4.5,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatarUrl: Pista,
  },
  {
    name: "Maren Kenter",
    timeAgo: "45 minutes ago",
    rating: 4.5,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatarUrl: Pista,
  },
]

export default function ReviewsPage() {
  const router = useRouter()
  return (
    <>
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
        <button
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium">Review</h1>

        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold">
            2
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
          <span className="sr-only">Notifications</span>
        </div>
      </header>

      <div className="mx-auto bg-white pb-20">
        <div className="divide-y divide-gray-100">
          {reviews.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
          <button
            className="w-full flex items-center justify-center gap-x-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
            onClick={() => router.push('/add-review')}
          >
            Add Review
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          </button>
        </div>

      </div>
    </>
  )
}