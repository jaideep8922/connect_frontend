'use client'

import { ArrowLeft, Edit2, ImagePlus } from 'lucide-react'
import { useState, useRef } from "react"
import Image from "next/image"
import { useFormik } from "formik"


export default function AddProduct() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Formik setup
  const formik = useFormik({
    initialValues: {
      productName: "",
      description: "",
      mrp: "",
      salePrice: "",
      priceType: "mrp",
    },

    onSubmit: (values:any) => {
      console.log("Form Submitted:", values)
      alert("Product saved successfully!")
    },
  })

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 h-16 right-0 bg-white border-b px-4 py-3 flex items-center gap-4 z-10">
        <button className="p-1">
          <ArrowLeft className="w-5 h-5" onClick={() => window.history.back()} />
        </button>
        <h1 className="text-lg font-medium flex-1">Add new Product</h1>
        <button className="p-1">
          <Edit2 className="w-5 h-5" />
        </button>
      </div>

      {/* Form */}
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

          {/* Price Type Selection */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="priceType"
                value="mrp"
                checked={formik.values.priceType === 'mrp'}
                onChange={formik.handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span>MRP</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="priceType"
                value="productPrice"
                checked={formik.values.priceType === 'productPrice'}
                onChange={formik.handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span>Product Price</span>
            </label>
          </div>

          {/* Price Inputs */}
          <div className="space-y-4">
            <div>
              <input
                type="number"
                placeholder="MRP"
                name="mrp"
                value={formik.values.mrp}
                onChange={formik.handleChange}
                className={`w-full border rounded-lg px-4 py-2 ${
                  formik.errors.mrp && formik.touched.mrp ? "border-red-500" : ""
                }`}
              />

            </div>
            <div>
              <input
                type="number"
                placeholder="Sale Price"
                name="salePrice"
                value={formik.values.salePrice}
                onChange={formik.handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Product Name"
                name="productName"
                value={formik.values.productName}
                onChange={formik.handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
             
            </div>
            <div>
              <textarea
                placeholder="Description"
                rows={4}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
  >
    Save
  </button>
</div>

        </form>
      </div>
    </div>
  )
}
