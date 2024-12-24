"use client"
import { Plus, Search } from 'lucide-react'
import { BookReviewCard } from './notes-card'
import BottomNavigation from '../global/bottomNavigation'
import { useRouter } from 'next/navigation';

const reviews = [
    {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        timestamp: "01 Jan 2024, 10:05 A.M",
        colorClass: "bg-pink-200",
        id:1,
    },
    {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        timestamp: "01 Jan 2024, 10:05 A.M",
        colorClass: "bg-red-200",
        id:2,
    },
    {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        timestamp: "01 Jan 2024, 10:05 A.M",
        colorClass: "bg-green-200",
        id:3,
    },
    {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        timestamp: "01 Jan 2024, 10:05 A.M",
        colorClass: "bg-yellow-200",
        id:4
    },
]

export default function BookReviewsPage() {
    const router = useRouter()
    return (
        <>
            <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4">
                <h1 className="text-lg font-medium text-gray-900">Note</h1>
                <button
                    className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
                    aria-label="Search notes"
                >
                    <Search className="h-5 w-5 text-gray-600" />
                </button>
            </header>
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="mx-auto max-w-md space-y-4">
                    {reviews.map((review, i) => (
                        <BookReviewCard key={i} {...review} />
                    ))}
                </div>

                <button onClick={()=> router.push('/add-note')}
                    className="fixed bottom-40 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                    aria-label="Add new review"
                >
                    <Plus className="h-6 w-6" />
                </button>

            </div>
            <div className='mt-20 '>
                <BottomNavigation />
            </div>
        </>
    )
}