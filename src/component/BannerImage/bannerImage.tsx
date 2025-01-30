'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { X, Upload, Check, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function BannerImageUpload() {
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 5 - images.length);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newFiles]);
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const newFiles = Array.from(files)
        .filter((file) => file.type.startsWith('image/'))
        .slice(0, 5 - images.length);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newFiles]);
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };

  const [sellerId, setSellerId] = useState<string | null>(null);

  // Fetch the sellerId only on the client-side (inside useEffect)
  useEffect(() => {
    const localData: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const customId = localData?.data?.customId;
    setSellerId(customId);
  }, []);

  const handleSubmit = async () => {
    if (images.length === 0) {
      toast.error('Please upload at least one image.');
      return;
    }

    if (!sellerId) {
      toast.error('Seller ID is not available.');
      return;
    }

    const formData = new FormData();
    const inputElement = fileInputRef.current;

    if (inputElement && inputElement.files) {
      Array.from(inputElement.files).forEach((file) => {
        formData.append('images', file);
      });
    }
    formData.append('sellerId', sellerId); // Attach sellerId

    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload-banner`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Images uploaded successfully!');
        setImages([]); // Clear the images after upload
      } else {
        toast.error(result.error || 'Failed to upload images.');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('An error occurred while uploading images.');
    } finally {
      setLoading(false);
    }
  };
  

  // const handleSubmit = async () => {
  //   if (images.length === 0) {
  //     toast.error('Please upload at least one image.');
  //     return;
  //   }
  
  //   const formData = new FormData();
  //   const inputElement = fileInputRef.current;
    
    
  //   const localData:any = JSON.parse(localStorage.getItem('userDetails') || '{}'); 
  //   const sellerId = localData?.data?.customId; 

  //   console.log("sellerId", sellerId)
  
  
  //   if (inputElement && inputElement.files) {
  //     Array.from(inputElement.files).forEach((file) => {
  //       formData.append('images', file);
  //     });
  //   }
  //   formData.append('sellerId', sellerId); // Replace with dynamic sellerId if required
  
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload-banner`, {
  //       method: 'POST',
  //       body: formData,
  //     });
  
  //     const result = await response.json();
  //     if (response.ok) {
  //       toast.success('Images uploaded successfully!');
  //       setImages([]);
  //     } else {
  //       alert(result.error || 'Failed to upload images.');
  //     }
  //   } catch (error) {
  //     console.error('Error uploading images:', error);
  //     toast.error('An error occurred while uploading images.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

  return (
    <>
    <Toaster/>
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
        <button
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
        </button>
        <h1 className="text-lg font-medium">Banner List</h1>
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Upload />
        </div>
      </header>

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto bg-[#FFEFD3] rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-gray-800">Upload Banner Images</h2>
            </div>

            <div className="space-x-3 mb-3">
              <button
                className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ${loading ? 'opacity-50' : ''}`}
                onClick={handleSubmit}
                disabled={loading}
              >
                <Check className="w-5 h-5 inline-block mr-1" />
                {loading ? 'Uploading...' : 'Submit'}
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                onClick={() => {
                  setImages([]);
                  setPreviewImages([]);
                }}
              >
                <X className="w-5 h-5 inline-block mr-1" />
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={`aspect-video bg-gray-200 rounded-lg overflow-hidden relative ${previewImages[index] ? 'border-2 border-blue-500' : 'border-2 border-dashed border-gray-400'
                    }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {previewImages[index] ? (
                    <>
                      <Image
                        src={previewImages[index]}
                        alt={`Banner ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                      />
                      <button
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center h-full cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Click or drag to upload</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </div>
    </>
  );
}
