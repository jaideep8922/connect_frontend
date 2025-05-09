"use client";

import { ArrowLeft, Plus, Search } from "lucide-react";
import { BookReviewCard } from "./notes-card";
import BottomNavigation from "../global/bottomNavigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function BookReviewsPage() {
  const router = useRouter();

  const [notesData, setNotesData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [customId, setCustomId] = useState<string | null>(null);

  // Fetch customId from localStorage only on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const localData: any = JSON.parse(localStorage.getItem("userDetails") || "{}");
        const userCustomId = localData?.data?.customId;

        if (userCustomId) {
          setCustomId(userCustomId);
        } else {
          throw new Error("User details not found in localStorage.");
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        setError("Unable to load user data.");
      }
    }
  }, []);

  // Fetch notes data on page load using useEffect
  useEffect(() => {
    if (!customId) return;

    const fetchNotes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/get-notes-list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customId }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch notes details");
        }

        setNotesData(result.data);
        setError(null);
      } catch (error: any) {
        console.error("Error fetching notes:", error.message);
        setError(error.message);
        toast.error("Failed to load notes");
      }
    };

    fetchNotes();
  }, [customId]);

  // Function to handle note deletion
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/delete-notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete note");
      }

      toast.success("Note deleted successfully");
      setNotesData((prevNotes: any) => prevNotes.filter((note: any) => note.id !== id));
    } catch (error: any) {
      console.error("Error deleting note:", error.message);
      toast.error("Failed to delete note");
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FFFFFF]">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }
  return (
    <>
      <Toaster />
      <header className="sticky top-0 z-10 flex items-center h-16 px-4 bg-white border-b">
        <button
          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-black cursor-pointer" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium text-gray-900">Note</h1>
        {/* <button
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100"
          aria-label="Search notes"
        >
          <Search className="w-5 h-5 text-gray-600" />
        </button> */}
      </header>

      <div className="min-h-screen bg-[#FFFFFF] p-4">
        <div className="max-w-md mx-auto space-y-4">
          {notesData?.map((review: any, i) => (
            <BookReviewCard
              key={i}
              id={review.id}
              text={review.notes}
              timestamp={new Date(review.createdAt).toLocaleString()}
              colorClass="bg-gray-100"
              onDelete={handleDelete}
            />
          ))}
        </div>

        <button
          onClick={() => router.push("/add-note")}
          className="fixed bottom-32 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF9A2D] text-white shadow-xl hover:bg-[#FF9A2DCC]"
          aria-label="Add new review"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-20">
        <BottomNavigation />
      </div>
    </>
  );
}
