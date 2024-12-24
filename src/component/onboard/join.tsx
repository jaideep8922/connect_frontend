"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Camera from '@/assets/camera-plus.svg';
import Logo from '@/assets/logo.png'
interface FormData {
  userType: "Retailer" | "Supplier";
  businessOwner: string;
  businessName: string;
  phone: string;
  gstNumber: string;
  shopMarka: string;
  transport: string;
  pincode: string;
  city: string;
  state: string;
  file: File | null;
}

const JoinPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  const [formData, setFormData] = useState<FormData>({
    userType: "Retailer",
    businessOwner: "",
    businessName: "",
    phone: "",
    gstNumber: "",
    shopMarka: "",
    transport: "",
    pincode: "",
    city: "",
    state: "",
    file: selectedImage
  });

  const [step, setStep] = useState<number>(1);
  const router = useRouter();

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Next Step
  const handleNext = () => {
    if (step < 9) {
      setStep(step + 1);
    } else {
      // API Call Here
      console.log("Submitting Form Data:", formData);
      // router.push('/initial-profile')
      if (formData.userType === "Retailer") {
        router.push("/initial-profile");
      } else {
        router.push("/manage");
      }

      // Example API Call
      // fetch("/api/save-data", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log("Response:", data);
      //     router.push("/onboard/business");
      //   })
      //   .catch((err) => console.error("Error:", err));
    }
  };

  // Handle Previous Step
  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className=" h-screen flex flex-col items-center justify-between bg-white">
      {/* Header */}
      <header className={`mt-14 transition-all duration-300 ${step === 1 ? 'w-[100%] ' : 'w-[100%]'}`}>
        <div className={`w-full h-full bg-white rounded-full flex items-center justify-center`}>
          <Image
            src={Logo}
            alt="Logo"
            className={`transition-all duration-300 ${step === 1 ? 'w-full h-full' : 'w-24 h-18'}`}
          />
        </div>
      </header>


      {/* Main Content */}
      <main className="flex flex-col w-full px-6">
        {step === 1 && (
          <div className="">
            <h1 className="text-lg font-bold mb-6 border-b w-20 border-b-black">Join as</h1>
            <div className=" flex space-x-20 mb-10">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="Retailer"
                  checked={formData.userType === "Retailer"}
                  onChange={() => setFormData({ ...formData, userType: "Retailer" })}
                  className="form-radio text-blue-600"
                />
                <span className="text-lg">Retailer</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="Supplier"
                  checked={formData.userType === "Supplier"}
                  onChange={() => setFormData({ ...formData, userType: "Supplier" })}
                  className="form-radio text-blue-600"
                />
                <span className="text-lg">Supplier</span>
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-md space-y-4">
            <h1 className="text-2xl flex font-bold justify-center items-center mb-20">Complete profile !</h1>
            <h1 className="text-md font-bold">Business Owner</h1>
            <input
              type="text"
              name="businessOwner"
              placeholder="Business Owner"
              value={formData.businessOwner}
              onChange={handleInputChange}
              className="w-full py-3 px-1 border border-slate-400 rounded-lg"

            />
            <p className="mt-2 text-xs text-gray-500">
              Update your profile name to reflect your identity. This will be displayed on your account and visible to others.
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-md space-y-4">
            <h1 className="text-2xl flex font-bold justify-center items-center mb-20">Complete profile !</h1>
            <h1 className="text-md font-bold">Business Name</h1>
            <input
              type="text"
              name="businessName"
              placeholder="Business Owner"
              value={formData.businessName}
              onChange={handleInputChange}
              className="w-full py-3 px-1 border border-slate-400 rounded-lg"

            />
            <p className="mt-2 text-xs text-gray-500">
              Update your profile name to reflect your identity. This will be displayed on your account and visible to others.
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="w-full max-w-md space-y-4">
            <h1 className="text-2xl flex font-bold justify-center items-center mb-20">Enter Phone Number !</h1>
            <h1 className="text-md font-bold">Type your phone number</h1>
            <input
              type="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-slate-400 rounded-lg"
            />

          </div>
        )}

        {step === 5 && (
          <div className="w-full max-w-md space-y-4">
            <h1 className="text-2xl flex font-bold justify-center items-center mb-20">Complete Profile !</h1>
            <h1 className="text-md font-bold">GST NO.</h1>
            <input
              type="gst"
              name="gst"
              placeholder="GST NO."
              value={formData.gstNumber}
              onChange={handleInputChange}
              className="w-full p-2 border border-slate-400 rounded-lg"
            />

          </div>
        )}

        {step === 6 && (


          <div className="w-full max-w-md space-y-4">
            <h1 className="text-2xl flex font-bold justify-center items-center mb-20">Complete Profile !</h1>
            <h1 className="text-md font-bold">Shop Marka</h1>
            <input
              type="shopMarka"
              name="shopMarka"
              placeholder="Shop Marka"
              value={formData.shopMarka}
              onChange={handleInputChange}
              className="w-full p-2 border border-slate-400 rounded-lg"
            />

          </div>
        )}

        {step === 7 && (


          <div className="w-full max-w-md space-y-4">
            <h1 className="text-2xl flex font-bold justify-center items-center mb-20">Complete Profile !</h1>
            <h1 className="text-md font-bold">Preferred Transport</h1>
            <input
              type="transport"
              name="transport"
              placeholder="Preferred Transport"
              value={formData.transport}
              onChange={handleInputChange}
              className="w-full p-2 border border-slate-400 rounded-lg"
            />

          </div>
        )}

        {step === 8 && (


          <div className="w-full max-w-md space-y-4">
            <h1 className="text-2xl flex font-bold justify-center items-center mb-8">Business Address</h1>
            <h1 className="text-md font-bold">Pin Code</h1>
            <input
              type="pincode"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="w-full p-2 border border-slate-400 rounded-lg"
            />

            <h1 className="text-md font-bold">City</h1>
            <input
              type="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-2 border border-slate-400 rounded-lg"
            />

            <h1 className="text-md font-bold ">State</h1>
            <input
              type="state"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full p-2 border border-slate-400 rounded-lg"
            />

          </div>
        )}

        {step === 9 && (
          <div className="flex flex-col items-center justify-center p-6">
            <label
              htmlFor="profile-upload"
              className="group relative cursor-pointer"
            >
              <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-blue-200">
                {selectedImage ? (
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src={selectedImage}
                      alt="Profile photo"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <Image src={Camera} alt="cam" />
                    </div>
                  </div>
                ) : (
                  <>
                    <Image src={Camera} alt="cam" />
                  </>
                )}
              </div>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="sr-only"
              />
            </label>
            <span className="text-sm font-semibold mt-2 text-black">Upload Profile photo</span>

            <p className="mt-2 text-xs text-gray-500">
              Please upload your profile photo to stay visible
            </p>
          </div>

        )}

        {/* {step === 9 && (
          <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="relative flex items-center justify-center">
              {/* Outer rings 
              <div className="absolute h-24 w-24 animate-ping rounded-full bg-blue-100 opacity-75" />
              <div className="absolute h-20 w-20 rounded-full bg-blue-200" />

              {/* Icon container 
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
                <Check className="h-8 w-8 text-white" strokeWidth={3} />
              </div>
            </div>

            <h1 className="mt-8 text-xl font-semibold text-gray-900">
              Successfully
            </h1>

            <p className="mt-2 text-center text-sm text-gray-600">
              Your mobile number is successfully verified.
            </p>
          </div>
        )} */}
      </main>

      {/* Footer with Navigation */}
      <footer className="flex flex-col items-center space-y-6 mb-10 w-full px-4">
        <div className="flex flex-col w-full max-w-md space-y-4">

          {/* Next/Submit Button */}
          <button
            onClick={handleNext}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200"
          >
            {step < 9 ? "Next" : "Submit"}
          </button>

          {/* Back Button */}
          {step > 1 && (
            <button
              onClick={handlePrevious}
              className="w-full py-3 bg-gray-300 text-black rounded-xl hover:bg-gray-400 transition duration-200"
            >
              Back
            </button>
          )}

        </div>

        {/* Pagination Dots */}
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].slice(0,5).map((page) => (
            <span
              key={page}
              className={`w-3 h-3 rounded-full ${step === page ? "bg-blue-600" : "bg-gray-300"
                }`}
            ></span>
          ))}
        </div>
      </footer>

    </div>
  );
};

export default JoinPage;