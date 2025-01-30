"use client"
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customId, setCustomId] = useState<string | null>(null);

  useEffect(() => {
    // This effect runs only on the client side after the component mounts
    const localData: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const userCustomId = localData?.data?.customId;
    if (userCustomId) {
      setCustomId(userCustomId);
    }
  }, []);

  const handleSave = () => {
    setShowPopup(true);
  };

  const handleConfirm = async () => {
    setShowPopup(false);
    setIsSubmitting(true);

    // const localData: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
    // const customId = localData?.data?.customId;
    const notesText = text; 

    if (!customId) {
      console.error("Neither sellerId nor retailerId is available.");
      toast.error("Please provide valid seller or retailer details.");
      return;
    }

    const requestBody: any = { notes: notesText }; 
    if (customId.startsWith("SU")) {
      requestBody.sellerId = customId;
    } else if (customId.startsWith("RE")) {
      requestBody.retailerId = customId;
    } else {
      console.error("Invalid customId prefix.");
      toast.error("Invalid customId format. Please check your details.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/save-notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        toast.success("Data saved successfully!");
        setTitle("");
        setText("");
      } else {
        toast.error("Failed to save data.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Toaster />
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
        <button
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium">Note</h1>

        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold">
            2
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notepad-text"><path d="M8 2v4" /><path d="M12 2v4" /><path d="M16 2v4" /><rect width="16" height="18" x="4" y="4" rx="2" /><path d="M8 10h6" /><path d="M8 14h8" /><path d="M8 18h5" /></svg>
          <span className="sr-only">Notifications</span>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 bg-[#FFEFD3] rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">Enter Details</h1>
        {/* <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> */}
        <textarea
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 mb-4 h-60 border rounded focus:outline-none"
        />
        <button
          onClick={handleSave}
          className="w-full bg-[#6D2323] text-white py-2 rounded hover:bg-[#6D2323] disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4">Are you sure you want to save?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-[#6D2323] text-white rounded hover:bg-[#6D2323]"
                >
                  Yes, Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddNote