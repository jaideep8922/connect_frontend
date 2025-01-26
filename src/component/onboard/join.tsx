"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Camera from '@/assets/camera-plus.svg';
import Logo from '@/assets/logo.png';
import toast, { Toaster } from 'react-hot-toast';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

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
  otp: string;
  fingerprintId: string;
  file: File | null;
}

const JoinPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [otpVisible, setOtpVisible] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  const [retailerId, setRetailerId] = useState('')
  const [status, setStatus] = useState<'idle' | 'capturing' | 'success' | 'error'>('idle')

  const [fingerprintId, setFingerprintId] = useState<string | null>(null);

  const generateMobileFingerprint = async () => {
    setStatus("capturing");
    try {
      const fp = await FingerprintJS.load();
      const result = await fp.get();

      // Get fingerprint unique ID
      setFingerprintId(result.visitorId);
      console.log("Generated Fingerprint ID:", result.visitorId);

      setStatus("success");
    } catch (error) {
      console.error("Error generating fingerprint:", error);
      setStatus("error");
    }
  };

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
  const handleNext = async () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      
      const payload: any = {
        userType: formData.userType,
        businessName: formData.businessName,
        businessOwner: formData.businessOwner,
        phone: formData.phone,
        gstNumber: formData.gstNumber,
        shopMarka: formData.shopMarka,
        transport: formData.transport,
        pincode: formData.pincode,
        city: formData.city,
        state: formData.state,
        // qrCode: "95160", 
        // fingerprint: formData.fingerprintId,
      };
    
      if (formData.userType === "Retailer") {
        payload.sellerId = 'SU-3347';
      } else if (formData.userType === "Supplier") {
        payload.sellerId = 'SU-3347';
      }
        
      try {
        const response =  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
    
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.success) {
            toast.success("onboarded successfully")
            // localStorage.setItem("token", responseData.token); 
            // localStorage.setItem("userType", formData.userType);
            // localStorage.setItem("useDetails", responseData.success)

            localStorage.setItem("userDetails", JSON.stringify(responseData.data.user)); 
            localStorage.setItem("token", responseData.token); 
            localStorage.setItem("userType", formData.userType);

            setTimeout(() => {
              if (formData.userType === "Retailer") {
                const userData = responseData.data.user;
                router.push(`/initial-profile?userData=${encodeURIComponent(JSON.stringify(userData))}`);
                // router.push("/initial-profile");
                // setTimeout(() => {
                //   router.push("/");
                // }, 5000);
              } else if (formData.userType === "Supplier") {
                router.push("/manage");
              }
            }, 5000);

            
            // alert(responseData.message); 
            //   if (formData.userType === "Retailer") {
            //   router.push("/initial-profile");
            // } else if (formData.userType === "Supplier") {
            //   router.push("/manage");
            // }
          } else {
            toast.error("onboarding error.")
          }
        } else {
          const errorData = await response.json(); 
          console.error("Error Response:", errorData);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      }}};

  // Handle Previous Step
  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };


  const handlePhoneSubmit = () => {
    const phonePattern = /^[0-9]{10}$/;
    if (phonePattern.test(formData.phone)) {
      setOtpVisible(true);
    } else {
      toast.error('Please enter a valid 10-digit phone number.');
    }
  };

  const handleOtpSubmit = () => {
    if (formData.otp === "1234") {
      setOtpVisible(false);
      toast.success('OTP Verified');
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  // const handleFinalSubmit = async () => {
  //   if (!formData.fingerprintId) {
  //     alert("Fingerprint not captured. Please try again.");
  //     return;
  //   }

  //   console.log("Submitting Final Form Data:", formData);
  //   // Make API call to save data
  //   try {
  //     const response = await fetch("/api/onboard", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       alert("Onboarding successful!");
  //       router.push("/dashboard");
  //     } else {
  //       alert("Failed to onboard. Try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   }
  // };

  

  return (
    <div className=" h-screen flex flex-col items-center justify-between bg-white">
      <Toaster />
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
            <h1 className="text-2xl flex font-bold justify-center items-center mb-10">Complete profile !</h1>
            <div>
              <h1 className="text-md font-bold py-2">Business Owner</h1>
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

              <h1 className="text-md font-bold py-2">Business Name</h1>
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
              <h1 className="text-md font-bold py-2">GST NO.</h1>
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
            <h1 className="text-2xl flex font-bold justify-center items-center mb-10">Complete profile !</h1>
            <div>
              <h1 className="text-md font-bold py-2">Type your phone number</h1>
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
                  className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
              <h1 className="text-md font-bold py-2">Shop Marka</h1>
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
              <h1 className="text-md font-bold py-2">Preferred Transport</h1>
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
              <h1 className="text-md font-bold py-2">Pin Code</h1>
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
              <h1 className="text-md font-bold py-2">City / State</h1>
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
              <h1 className="text-md font-bold py-2">State</h1>
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

            {/* <QRScanner /> */}


            {/* <div className="flex flex-col items-center justify-center space-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="blue" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-fingerprint"><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" /><path d="M14 13.12c0 2.38 0 6.38-1 8.88" /><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" /><path d="M2 12a10 10 0 0 1 18-6" /><path d="M2 16h.01" /><path d="M21.8 16c.2-2 .131-5.354 0-6" /><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" /><path d="M8.65 22c.21-.66.45-1.32.57-2" /><path d="M9 6.8a6 6 0 0 1 9 5.2v2" /></svg>
              <button
                onClick={generateMobileFingerprint}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg"
              >
                {status === "capturing" ? "Capturing..." : "Generate Fingerprint"}
              </button>
              {status === "success" && <p>Fingerprint ID: {fingerprintId}</p>}
            </div> */}

            <div className="flex justify-center items-center flex-col space-y-2">
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

              <p className="mt-2 text-xs text-gray-500 ">
                Please upload your profile photo to stay visible
              </p>
            </div>

          </div>
        )}

      </main>

      {/* Footer with Navigation */}
      <footer className="flex flex-col items-center space-y-6 mb-10 w-full px-4 mt-5">
        <div className="flex flex-col w-full max-w-md space-y-4">

          {/* Next/Submit Button */}
          <button
            onClick={handleNext}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200"
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