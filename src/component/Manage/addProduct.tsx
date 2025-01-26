// 'use client'

// import { ArrowLeft, Edit2, ImagePlus } from 'lucide-react'
// import { useState, useRef } from "react"
// import Image from "next/image"
// import { useFormik } from "formik"


// export default function AddProduct() {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   // Formik setup
//   const formik = useFormik({
//     initialValues: {
//       productName: "",
//       description: "",
//       mrp: "",
//       salePrice: "",
//       priceType: "mrp",
//     },

//     onSubmit: (values: any) => {
//       console.log("Form Submitted:", values)
//       alert("Product saved successfully!")
//     },
//   })

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const imageUrl = URL.createObjectURL(file)
//       setSelectedImage(imageUrl)
//     }
//   }

//   const handleCancel = () => {
//     formik.resetForm()
//     setSelectedImage(null)
//   }

//   return (
//     <div className="mb-4 bg-gray-50">
//       {/* Header */}
//       <div className="fixed top-0 left-0 h-16 right-0 bg-white border-b px-4 py-3 flex items-center gap-4 z-10">
//         <button className="p-1">
//           <ArrowLeft className="w-5 h-5" onClick={() => window.history.back()} />
//         </button>
//         <h1 className="text-lg font-medium flex-1">Add new Product</h1>
//         <button className="p-1">
//           <Edit2 className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Form */}
//       <div className="pt-16 px-4">
//         <form onSubmit={formik.handleSubmit} className="space-y-6">
//           {/* Image Upload */}
//           <div className="bg-white rounded-lg border p-4 mt-4">
//             <div
//               className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer"
//               onClick={() => fileInputRef.current?.click()}
//             >
//               {selectedImage ? (
//                 <div className="relative h-48 w-full">
//                   <Image
//                     src={selectedImage}
//                     alt="Selected product"
//                     fill
//                     className="object-contain"
//                   />
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center gap-2 text-gray-500">
//                   <ImagePlus className="w-8 h-8" />
//                   <p>Upload photos (1MB) × Video Links</p>
//                 </div>
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 ref={fileInputRef}
//                 onChange={handleImageUpload}
//               />
//             </div>
//           </div>

//           {/* Price Type Selection */}
//           <div className="flex items-center justify-between gap-6">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="priceType"
//                 value="mrp"
//                 checked={formik.values.priceType === 'mrp'}
//                 onChange={formik.handleChange}
//                 className="w-4 h-4 text-blue-600"
//               />
//               <span>MRP</span>
//             </label>
           
//             <select className='border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'>
//               <option>tax</option>
//               <option>5%</option>
//               <option>12%</option>
//               <option>18%</option>
//             </select>
//           </div>


//           {/* Price Inputs */}
//           <div className="space-y-4">

//             <input
//               type="number"
//               placeholder="Average Quality Price"
//               name="mrp"
//               value={formik.values.mrp}
//               onChange={formik.handleChange}
//               className={`w-full border rounded-lg px-4 py-2 ${formik.errors.mrp && formik.touched.mrp ? "border-red-500" : ""
//                 }`}
//             />


//             <div>
//               <input
//                 type="number"
//                 placeholder="Good Quality Price"
//                 name="salePrice"
//                 value={formik.values.salePrice}
//                 onChange={formik.handleChange}
//                 className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <input
//                 type="number"
//                 placeholder="High Quality Price"
//                 name="salePrice"
//                 value={formik.values.salePrice}
//                 onChange={formik.handleChange}
//                 className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Product Details */}
//           <div className="space-y-4">
//             <div>
//               <input
//                 type="text"
//                 placeholder="Product Name"
//                 name="productName"
//                 value={formik.values.productName}
//                 onChange={formik.handleChange}
//                 className="w-full mt-[-2rem] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />

//             </div>
//             <div>
//               <textarea
//                 placeholder="Description"
//                 rows={4}
//                 name="description"
//                 value={formik.values.description}
//                 onChange={formik.handleChange}
//                 className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="w-full flex items-center gap-4">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="flex-1 bg-gray-100 border text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 text-center"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
//             >
//               Save
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   )
// }


'use client'

import { ArrowLeft, Edit2, ImagePlus } from 'lucide-react'
import { useState, useRef } from "react"
import Image from "next/image"
import { useFormik } from "formik"
import axios from "axios" 
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'


export default function AddProduct() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter();

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

    onSubmit: async (values: any) => {
      const localData: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
const customId = localData?.data?.customId;

if (!customId || !customId.startsWith("SU")) {
  console.error("SellerId is invalid or missing.");
  toast.error("Please provide valid seller details.");
  return;
}

const requestBody: any = {
  sellerId: customId, 
};

      try {
        const payload = {
          productName: values.productName,
          description: values.description,
          highPrice: values.highPrice,
          averagePrice: values.averagePrice || null,
          goodPrice: values.goodPrice || null,
          sellerId: customId, 
          tax: values.tax,
          productImage: selectedImage || "https://res.cloudinary.com/dogsc8bt0/image/upload/v1737400324/banner_images/banner_1737400321065.jpg",
        }
        const response = await axios.post("http://localhost:4000/product/add-product", payload)
        toast.success("Product added successfully!")
        setTimeout(() => {
          router.push('/manage');
        }, 3000);
        console.log("Response:", response.data)
      } catch (error) {
        console.error("Error adding product:", error)
        toast.error("Failed to add product. Please try again.")
      }
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
    <div className="mb-4 bg-gray-50">
      <Toaster />
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

          {/* Tax Selection */}
          <div className="flex items-center justify-between gap-6">
            <select
              name="tax"
              value={formik.values.tax}
              onChange={formik.handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Average Quality Price"
              name="averagePrice"
              value={formik.values.averagePrice}
              onChange={formik.handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Good Quality Price"
              name="goodPrice"
              value={formik.values.goodPrice}
              onChange={formik.handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Description"
              rows={4}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
