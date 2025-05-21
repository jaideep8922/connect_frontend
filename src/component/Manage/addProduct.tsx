'use client'

import { ArrowLeft, Edit2, ImagePlus } from 'lucide-react'
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useFormik } from "formik"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

type AnyObject = Record<string, any>;

function getChangedFields(A: AnyObject, B: AnyObject) {
  const result: AnyObject = {};
  for (const key in A) {
    if (A[key] !== B[key]) {
      result[key] = A[key];
    }
  }
  return result;
}


export default function AddProduct() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [userDetails, setUserDetails] = useState<any>(null) // To store user details
  const fileInputRef: any = useRef<HTMLInputElement>(null)
  const router = useRouter();
  const videoInputRef: any = useRef<HTMLInputElement>(null);
  const [id, setId] = useState<string>('');
  const [sellerIdss, setSellerIdss] = useState<any>('')
  const [product, setProduct] = useState<any>(null);

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

  const formikInitialValues = {
    productName: "",
    description: "",
    highPrice: "",
    averagePrice: "",
    goodPrice: "",
    tax: "",
    moq: ""
  }

  // Formik setup
  const formik = useFormik({
    initialValues: formikInitialValues,

    onSubmit: async (values) => {
      if (typeof window !== "undefined") {
        // Make sure user details are available
        if (!userDetails?.data?.customId || !userDetails.data.customId.startsWith("SU")) {
          toast.error("Please provide valid seller details.");
          return;
        }

        if (sellerIdss && id) {
          handleUpdate(values)
          return
        }

        console.log('adddddd')

        const customId = userDetails?.data?.customId;
        const formData = new FormData();
        formData.append('sellerId', customId);
        formData.append('productName', values.productName);
        formData.append('description', values.description);
        formData.append('highPrice', values.highPrice);
        formData.append('tax', values.tax);
        formData.append('moq', values.moq);
        formData.append('averagePrice', values.averagePrice);
        formData.append('goodPrice', values.goodPrice);
        if (fileInputRef.current?.files?.[0]) {
          formData.append('productImage', fileInputRef.current.files[0]);
        }
        if (videoInputRef.current?.files?.[0]) {
          formData.append('productVideo', videoInputRef.current.files[0]);
        }

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

  type FormValues = typeof formik.values;

  const handleUpdate = async (values: FormValues) => {

    const editInitialData = {
      productName: product?.productName,
      description: product?.description,
      highPrice: product?.highPrice,
      averagePrice: product?.averagePrice,
      goodPrice: product?.goodPrice,
      tax: product?.tax,
      moq: product?.moq
    }

    const dataToUpdate = getChangedFields(values, editInitialData);

    if (Object.keys(dataToUpdate).length !== 0 || fileInputRef.current?.files?.[0] || videoInputRef.current?.files?.[0]) {
      const formData = new FormData();
      formData.append('productId', id);
      if (dataToUpdate?.productName !== undefined) formData.append('productName', dataToUpdate?.productName);
      if (dataToUpdate?.description !== undefined) formData.append('description', dataToUpdate?.description);
      if (dataToUpdate?.highPrice !== undefined) formData.append('highPrice', dataToUpdate?.highPrice);
      if (dataToUpdate?.tax !== undefined) formData.append('tax', dataToUpdate?.tax);
      if (dataToUpdate?.moq !== undefined) formData.append('moq', dataToUpdate?.moq);
      if (dataToUpdate?.averagePrice !== undefined) formData.append('averagePrice', dataToUpdate.averagePrice);
      if (dataToUpdate?.goodPrice !== undefined) formData.append('goodPrice', dataToUpdate?.goodPrice);

      if (fileInputRef.current?.files?.[0]) {
        formData.append('productImage', fileInputRef.current.files[0]);
      }
      if (videoInputRef.current?.files?.[0]) {
        formData.append('productVideo', videoInputRef.current.files[0]);
      }

      try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/update-single`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success(response.data.message || "Product updated successfully!");
        setTimeout(() => router.push('/manage'), 1000);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        console.error("Error updating product:", errorMessage);
        toast.error(errorMessage);
      }

    }

  }

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

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const productId = searchParams.get('id');
    const idParam = searchParams.get("sellerId");
    setSellerIdss(idParam)
    setId(productId);
  }, [])


  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get-product-list?sellerId=${sellerIdss}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch product details');
        }
        setProduct(result?.data?.find((data: any) => data?.productId === id));
      } catch (error: any) {
        console.error('Error fetching product details:', error.message);
      }
    };

    if (sellerIdss) {
      fetchProductList();
    }

  }, [sellerIdss]);


  useEffect(() => {
    const updateForm = async () => {
      if (product && id) {
        formik.setFieldValue('productName', product?.productName || '');
        formik.setFieldValue('description', product?.description || '');
        formik.setFieldValue('highPrice', product?.highPrice || '');
        formik.setFieldValue('averagePrice', product?.averagePrice || '');
        formik.setFieldValue('goodPrice', product?.goodPrice || '');
        formik.setFieldValue('tax', product?.tax || '');
        formik.setFieldValue('moq', product?.moq || '');
      }
      if (product?.productImage) {
        setSelectedImage(product?.productImage);
      }
      if (product?.productVideo) {
        videoInputRef.current.value = product?.productVideo;
      }
    };

    if (product) {
      updateForm();
    }

  }, [product]);


  return (
    <div className="mb-4 bg-[#FFFFFF]">
      <Toaster />
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center h-16 gap-4 px-4 py-3 bg-[#FF9A2D] border-b">
        <button className="p-1">
          <ArrowLeft className="w-5 h-5" onClick={() => window.history.back()} />
        </button>
        <h1 className="flex-1 text-lg font-medium">{sellerIdss ? 'Edit Product' : 'Add Product'}</h1>
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


      <div className="px-4 pt-16">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="p-4 mt-4 bg-white border rounded-lg">
            <div
              className="p-4 text-center border-2 border-dashed rounded-lg cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedImage ? (
                <div className="relative w-full h-48">
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
          <div className="flex items-center justify-between gap-2">
            <select
              name="tax"
              value={formik.values.tax}
              onChange={formik.handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3A6B34] bg-white text-black"
            >
              <option value="">Select Tax</option>
              <option value="5%">5%</option>
              <option value="12%">12%</option>
              <option value="18%">18%</option>
            </select>

            <input
              type="text"
              placeholder="Enter MOQ Details"
              name="moq"
              value={formik.values.moq}
              onChange={formik.handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3A6B34] bg-white text-black"
            />

          </div>

          {/* Price Inputs */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="High Quality Price"
              name="highPrice"
              value={formik.values.highPrice}
              onChange={formik.handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3A6B34] bg-white text-black"
            />

            <input
              type="text"
              placeholder="Average Quality Price"
              name="averagePrice"
              value={formik.values.averagePrice}
              onChange={formik.handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3A6B34] bg-white text-black"
            />

            <input
              type="text"
              placeholder="Good Quality Price"
              name="goodPrice"
              value={formik.values.goodPrice}
              onChange={formik.handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3A6B34] bg-white text-black"
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
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3A6B34] bg-white text-black"
            />

            <textarea
              placeholder="Description"
              rows={4}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3A6B34] bg-white text-black"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center w-full gap-4">
            {!sellerIdss && (<button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-2 text-center text-gray-800 bg-gray-100 border rounded-lg hover:bg-gray-200"
            >
              Reset
            </button>)}
            <button
              type="submit"
              className="flex-1 bg-[#3A6B34] text-white px-4 py-2 rounded-lg hover:bg-[#3A6B34] text-center"
            >
              {sellerIdss ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}


