"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Camera from '@/assets/camera-plus.svg';
import Logo from '@/assets/logo.png';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface FormData {
  userType: "Retailer" | "Supplier" | "Guest";
  businessOwner: string;
  businessName: string;
  phone: string;
  gstNumber: string;
  shopMarka: string;
  transport: string;
  pincode: string;
  city: string;
  state: string;
  otp: string;
  fingerprintId: string;
  file: File | null;
}


const JoinPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [otpVisible, setOtpVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    userType: "Retailer",
    businessOwner: "",
    businessName: "",
    phone: "",
    otp: "",
    gstNumber: "",
    shopMarka: "",
    transport: "",
    pincode: "",
    city: "",
    state: "",
    fingerprintId: "",
    file: null
  });
  
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [supplierId, setSupplierId] = useState<string | null>(null);

  // Ensure localStorage is only accessed client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const supplierIdParam = searchParams.get("id");
      if (supplierIdParam) {
        setSupplierId(supplierIdParam);
      }
    }
  }, [searchParams]);

  // Function to handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        file: file
      }));
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function for next step
  const handleNext = async () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      const formDataToSend:any = new FormData();
    
      // Append all form data to FormData
      Object.keys(formData).forEach(key => {
        const value = formData[key as keyof FormData];
        if (key === 'file' && value instanceof File) {
          formDataToSend.append('file', value);
        } else if (value !== null && value !== undefined) {
          formDataToSend.append(key, value.toString());
        }
      });
      // Object.keys(formData).forEach(key => {
      //   if (key === 'file' && formData.file) {
      //     formDataToSend.append('file', formData.file);
      //   } else {
      //     formDataToSend.append(key, formData[key as keyof FormData].toString());
      //   }
      // });

      if (formData.userType === "Retailer") {
        formDataToSend.append('sellerId', supplierId || '');
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/create`, {
          method: "POST",
          body: formDataToSend,
        });

        if (response.ok) {
          const responseData = await response.json();
          if (responseData.success) {
            toast.success("Onboarded successfully!");
            console.log("responseData", responseData)
            // Store the user details in localStorage only on the client-side
            if (typeof window !== "undefined") {
              localStorage.setItem("userDetails", JSON.stringify(responseData.data.user));
              localStorage.setItem("token", responseData.data.token);
              localStorage.setItem("userType", formData.userType);
            }
            setTimeout(() => {
              if (formData.userType === "Retailer") {
                router.push('/shop');
              } else if (formData.userType === "Supplier") {
                router.push("/manage");
              }
            }, 5000);
          } else {
            toast.error("Onboarding error.");
          }
        } else {
          const errorData = await response.json();
          toast.error("Error Response:", errorData);
        }
      } catch (error: any) {
        toast.error("Error submitting data:", error);
      }
    }
  };

  // Function for previous step
  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  // Function for sending OTP
  const handleSendOtp = async () => {
    setError(""); // Reset error state
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/guests/create`, { phone, sellerId: supplierId });
      if (response.status === 201) {
        router.push(`/shop`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function for handling phone submission
  const handlePhoneSubmit = () => {
    const phonePattern = /^[0-9]{10}$/;
    if (phonePattern.test(formData.phone)) {
      setOtpVisible(true);
    } else {
      toast.error('Please enter a valid 10-digit phone number.');
    }
  };

  // Function for handling OTP submission
  const handleOtpSubmit = () => {
    if (formData.otp === "1234") {
      setOtpVisible(false);
      toast.success('OTP Verified');
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className=" h-screen flex flex-col items-center justify-between bg-[#FFEFD3]">
      <Toaster />
      {/* Header */}
      <header className={`mt-14 transition-all duration-300 ${step === 1 ? 'w-[100%] ' : 'w-[100%]'}`}>
        <div className={`w-full h-full bg-[#FFEFD3] rounded-full flex items-center justify-center`}>
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
          <div className="bg-[#FFEFD3]">
            <h1 className="text-lg text-[#6D2323] font-bold mb-6 border-b border-[#6D2323] w-20 border-b-black">Join as</h1>
            <div className=" flex space-x-5 mb-10 w-30">
              <label className="flex text-sm text-[#6D2323] items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="Retailer"
                  checked={formData.userType === "Retailer"}
                  onChange={() => setFormData({ ...formData, userType: "Retailer" })}
                  className="form-radio text-[#6D2323]"
                />
                <span className="text-MD">Retailer</span>
              </label>

              <label className="flex text-sm items-center text-[#6D2323] space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="Supplier"
                  checked={formData.userType === "Supplier"}
                  onChange={() => setFormData({ ...formData, userType: "Supplier" })}
                  className="form-radio text-[#6D2323]"
                />
                <span className="text-md">Supplier</span>
              </label>

              <label className="flex text-sm items-center text-[#6D2323] space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="Supplier"
                  checked={formData.userType === "Guest"}
                  onChange={() => setFormData({ ...formData, userType: "Guest" })}
                  className="form-radio text-[#6D2323]"
                />
                <span className="text-md">Guest User</span>
              </label>
            </div>
          </div>
        )}

        {formData.userType === "Guest" && (
          <div className=" mt-10 mb-16">

            {/* Phone Input */}
            {!showOtpBox && (
              <div>
                <label className="block mb-1 text-sm items-center text-[#6D2323] font-medium">Phone Number:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full p-2 border rounded"
                  required
                />
                <button
                  onClick={handleSendOtp}
                  className={`w-full bg-[#6D2323] text-white py-2 rounded mt-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#6D2323]"
                    }`}
                >
                  Submit
                </button>
              </div>
            )}

            {/* OTP Input */}
            {showOtpBox && (
              <div className="mt-4">
                <label className="block mb-1 font-medium">Enter OTP:</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full p-2 border rounded"
                  required
                />
                <button
                  onClick={handleSendOtp}
                  disabled={!otp}
                  className="w-full bg-green-500 text-white py-2 rounded mt-2 hover:bg-green-600"
                >
                  Submit OTP
                </button>
              </div>
            )}
          </div>

        )}

        {step === 2 && (
          <div className="w-full max-w-md space-y-4">
            <h1 className="text-2xl flex font-bold justify-center items-center mb-5 text-[#6D2323]">Complete profile !</h1>
            <div>
              <h1 className="text-md font-bold py-2 text-sm items-center text-[#6D2323]">Business Owner</h1>
              <input
                type="text"
                name="businessOwner"
                placeholder="Business Owner"
                value={formData.businessOwner}
                onChange={handleInputChange}
                className="w-full py-3 px-1 border border-slate-400 rounded-lg"

              />
            </div>
            <div>

              <h1 className="text-md font-bold py-2 text-sm items-center text-[#6D2323]">Business Name</h1>
              <input
                type="text"
                name="businessName"
                placeholder="Business Owner"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full py-3 px-1 border border-slate-400 rounded-lg"

              />
            </div>
            {/* <p className="mt-2 text-xs text-gray-500">
              Update your profile name to reflect your identity. This will be displayed on your account and visible to others.
            </p> */}

            <div>
              <h1 className="text-md font-bold py-2 text-sm items-center text-[#6D2323]">GST NO.</h1>
              <input
                type="gst"
                name="gstNumber"
                placeholder="GST NO."
                value={formData.gstNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-400 rounded-lg"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-md space-y-4">
            <h1 className="text-2xl flex font-bold justify-center items-center mb-5 mt-5 text-[#6D2323]">Complete profile !</h1>
            <div>
              <h1 className="text-md font-bold py-2 text-sm items-center text-[#6D2323]">Type your phone number</h1>
              <input
                type="phone"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-400 rounded-lg"
              />
              {!otpVisible && (
                <button
                  onClick={handlePhoneSubmit}
                  className="mt-3 w-full py-2 bg-[#6D2323] text-white rounded-lg hover:bg-[#6D2323] transition"
                >
                  Verify Phone
                </button>
              )}

            </div>

            {otpVisible && (
              <div className="mt-4">
                <h1 className="text-md font-bold py-2">Enter OTP</h1>
                <input
                  type="text"
                  name="otp"
                  placeholder="OTP"
                  value={formData.otp}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-slate-400 rounded-lg"
                />
                <button
                  onClick={handleOtpSubmit}
                  className="mt-3 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Submit OTP
                </button>
              </div>
            )}

            <div>
              <h1 className="text-md font-bold py-2 text-sm items-center text-[#6D2323]">Shop Marka</h1>
              <input
                type="shopMarka"
                name="shopMarka"
                placeholder="Shop Marka"
                value={formData.shopMarka}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-400 rounded-lg"
              />
            </div>

            <div>
              <h1 className="text-md font-bold py-2 text-sm items-center text-[#6D2323]">Preferred Transport</h1>
              <input
                type="transport"
                name="transport"
                placeholder="Preferred Transport"
                value={formData.transport}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-400 rounded-lg"
              />
            </div>

          </div>
        )}

        {step === 4 && (
          <div className="w-full max-w-md space-y-4">


            <div>
              <h1 className="text-md font-bold py-2 text-sm items-center text-[#6D2323]">Pin Code</h1>
              <input
                type="pincode"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-400 rounded-lg"
              />

            </div>

            <div>
              <h1 className="text-md font-bold py-2 text-sm items-center text-[#6D2323]">City / State</h1>
              <input
                type="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-400 rounded-lg"
              />

            </div>

            <div>
              <h1 className="text-md font-bold py-2 text-sm items-center text-[#6D2323]">State</h1>
              <input
                type="state"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-2 border border-slate-400 rounded-lg"
              />

            </div>

          </div>
        )}

        {step === 5 && (
          <div className="w-full max-w-md space-y-4">

            <div className="flex justify-center items-center flex-col space-y-2">
              <label
                htmlFor="profile-upload"
                className="group relative cursor-pointer"
              >
                <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[#6D2323] transition-colors group-hover:bg-[#6D2323]">
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
              <span className="text-sm font-semibold mt-2 text-[#6D2323]">Upload Profile photo</span>

              <p className="mt-2 text-xs text-[#6D2323]">
                Please upload your profile photo to stay visible
              </p>
            </div>

          </div>
        )}

      </main>

      {/* Footer with Navigation */}

      {formData.userType === "Guest" ? (
        <></>
      ) : (
        <footer className="flex flex-col items-center space-y-6 mb-10 w-full px-4 mt-5">
          <div className="flex flex-col w-full max-w-md space-y-4">

            {/* Next/Submit Button */}
            <button
              onClick={handleNext}
              className="w-full py-3 bg-[#6D2323] text-white rounded-xl hover:bg-[#6D2323] transition duration-200"
            >
              {step < 5 ? "Next" : "Submit"}
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
            {[1, 2, 3, 4].map((page) => (
              <span
                key={page}
                className={`w-3 h-3 rounded-full ${step === page ? "bg-[#6D2323]" : "bg-gray-300"
                  }`}
              ></span>
            ))}
          </div>
        </footer>
      )}
    </div>
  );
};

const JoinPageWrapper: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <JoinPage />
  </Suspense>
);

export default JoinPageWrapper;