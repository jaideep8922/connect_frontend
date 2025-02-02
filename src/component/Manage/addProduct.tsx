'use client'

import { ArrowLeft, Edit2, ImagePlus } from 'lucide-react'
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useFormik } from "formik"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'


export default function AddProduct() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [userDetails, setUserDetails] = useState<any>(null) // To store user details
  const fileInputRef: any = useRef<HTMLInputElement>(null)
  const router = useRouter();
  const videoInputRef: any = useRef<HTMLInputElement>(null);

  // Get user details from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserDetails = localStorage.getItem('userDetails');
      if (storedUserDetails) {
        setUserDetails(JSON.parse(storedUserDetails));
      } else {
        toast.error("No user details found, please login.");
      }
    }
  }, []);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      productName: "",
      description: "",
      highPrice: "",
      averagePrice: "",
      goodPrice: "",
      tax: "",
    },

    onSubmit: async (values) => {
      if (typeof window !== "undefined") {
        // Make sure user details are available
        if (!userDetails?.data?.customId || !userDetails.data.customId.startsWith("SU")) {
          toast.error("Please provide valid seller details.");
          return;
        }

        const customId = userDetails?.data?.customId;
        const formData = new FormData();
        formData.append('sellerId', customId);
        formData.append('productName', values.productName);
        formData.append('description', values.description);
        formData.append('highPrice', values.highPrice);
        formData.append('averagePrice', values.averagePrice);
        formData.append('goodPrice', values.goodPrice);
        if (fileInputRef.current?.files?.[0]) {
          formData.append('productImage', fileInputRef.current.files[0]);
        }
        if (videoInputRef.current?.files?.[0]) {
          formData.append('productVideo', videoInputRef.current.files[0]);
        }

        // sadasd
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/add-product`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          toast.success(response.data.message || "Product added successfully!");
          setTimeout(() => router.push('/manage'), 3000);
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || "An unexpected error occurred";
          console.error("Error adding product:", errorMessage);
          toast.error(errorMessage);
        }
      }
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  const handleCancel = () => {
    formik.resetForm()
    setSelectedImage(null)
  }

  return (
    <div className="mb-4 bg-[#FFEFD3]">
      <Toaster />
      {/* Header */}
      <div className="fixed top-0 left-0 h-16 right-0 bg-white border-b px-4 py-3 flex items-center gap-4 z-10">
        <button className="p-1">
          <ArrowLeft className="w-5 h-5" onClick={() => window.history.back()} />
        </button>
        <h1 className="text-lg font-medium flex-1">Add new Product</h1>
        <button className="p-1">
          <Edit2 className="w-5 h-5" />
          <input
            type="file"
            accept="video/*"
            className="hidden"
            ref={videoInputRef}
          />
        </button>
      </div>
      

      <div className="pt-16 px-4">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="bg-white rounded-lg border p-4 mt-4">
            <div
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedImage ? (
                <div className="relative h-48 w-full">
                  <Image
                    src={selectedImage}
                    alt="Selected product"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-500">
                  <ImagePlus className="w-8 h-8" />
                  <p>Upload photos (1MB) × Video Links</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Tax Selection */}
          <div className="flex items-center justify-between gap-6">
            <select
              name="tax"
              value={formik.values.tax}
              onChange={formik.handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D2323]"
            >
              <option value="">Select Tax</option>
              <option value="5%">5%</option>
              <option value="12%">12%</option>
              <option value="18%">18%</option>
            </select>
          </div>

          {/* Price Inputs */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="High Quality Price"
              name="highPrice"
              value={formik.values.highPrice}
              onChange={formik.handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D2323]"
            />

            <input
              type="text"
              placeholder="Average Quality Price"
              name="averagePrice"
              value={formik.values.averagePrice}
              onChange={formik.handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D2323]"
            />

            <input
              type="text"
              placeholder="Good Quality Price"
              name="goodPrice"
              value={formik.values.goodPrice}
              onChange={formik.handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D2323]"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Product Name"
              name="productName"
              value={formik.values.productName}
              onChange={formik.handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D2323]"
            />

            <textarea
              placeholder="Description"
              rows={4}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D2323]"
            />
          </div>

          {/* Actions */}
          <div className="w-full flex items-center gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-100 border text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#6D2323] text-white px-4 py-2 rounded-lg hover:bg-[#6D2323] text-center"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    
    </div>
  )
}
