"use client"
import { Plus, Search } from 'lucide-react'
import { BookReviewCard } from './notes-card'
import BottomNavigation from '../global/bottomNavigation'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function BookReviewsPage() {
    const router = useRouter()

    const [notesData, setNotesData] = useState([]);
    const [error, setError] = useState<string | null>(null);

    // Fetch notes data on page load using useEffect
    useEffect(() => {
        const fetchNotes = async () => {
            const localData: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
            const customId = localData?.data?.customId; 
            if (!customId) {
                console.error("Neither sellerId nor retailerId is available.");
                toast.error("Please provide valid seller or retailer details.");
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/get-notes-list`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        customId
                    }),
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Failed to fetch notes details');
                }

                setNotesData(result.data);
                setError(null);
            } catch (error: any) {
                console.error('Error fetching notes:', error.message);
                setError(error.message);
            }
        };

        fetchNotes();
    }, []);

    return (
        <>
        <Toaster/>
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
                    {notesData?.map((review: any, i) => (
                        <BookReviewCard
                            key={i}
                            text={review.notes}
                            timestamp={new Date(review.createdAt).toLocaleString()}
                            colorClass="bg-gray-100"
                        />
                    ))}
                </div>

                <button onClick={() => router.push('/add-note')}
                    className="fixed bottom-40 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                    aria-label="Add new review"
                >
                    <Plus className="h-6 w-6" />
                </button>
            </div>

            <div className="mt-20">
                <BottomNavigation />
            </div>
        </>
    );
}
