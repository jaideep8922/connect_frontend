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
  const searchParams = useSearchParams();
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
    file: null,
  });

  const [step, setStep] = useState<number>(1);
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();
  const [userType, setUserType] = useState<any>(null)

  // Get the URL parameter 'id'
  // const urlParams = new URLSearchParams(window.location.search);
  // const ids = urlParams.get('id');

  // console.log("urlParams",Array.from(urlParams.entries()).length)

  // useEffect(()=>{
  //   if (typeof window !== "undefined") {
  //     sessionStorage.setItem("length", Array.from(urlParams.entries()).length)
  //   }
  // },[])
  
  // const[length, setLength]= useState<number>(0)

  // useEffect(()=>{
  //   if (typeof window !== "undefined") {
  //     const data =sessionStorage.getItem("length")
  //     setLength(data)
  //   }
  // },[])

  // console.log("lengthlength", length)

  const urlParams = new URLSearchParams(window.location.search);
const ids = urlParams.get("id");

console.log("urlParams", Array.from(urlParams.entries()).length);

useEffect(() => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("length", String(Array.from(urlParams.entries()).length));
  }
}, []);

const [length, setLength] = useState<number>(0);

useEffect(() => {
  if (typeof window !== "undefined") {
    const data = sessionStorage.getItem("length");
    setLength(data ? parseInt(data, 10) : 0); // Convert string to number
  }
}, []);

console.log("lengthlength", length);

  

  const[supplierRelogin, setSupplierRelogin]= useState<any>()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = sessionStorage.getItem("id");
      console.log("storedId", storedId)
      const userTyp = sessionStorage.getItem("type");
      console.log("userTyp", userTyp)
      const idParam = searchParams.get("id");
      setUserType(userType)

      const userTypes= searchParams.get("type")
      setSupplierRelogin(userTypes)
      
      const idToUse = idParam || storedId;
      setId(idToUse);
      if (idParam) {
        sessionStorage.setItem("id", idParam);
      }
    }
  }, [searchParams]);

  console.log("supplierRelogin",supplierRelogin)


  const userId = id?.startsWith("RE") || (supplierRelogin === 'supplier' || sessionStorage.getItem("id")?.includes("SU") && id?.startsWith("SU"))

  const [mobile, setMobile] = useState(localStorage.getItem("phone"));

  console.log("userId",userId)

  const fetchUserDetails = async () => {
    if (!id) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getUserById`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customId: id,
          // userType:"Retailer"
          userType: supplierRelogin === "supplier" || (sessionStorage.getItem("id")?.includes("SU") && id?.startsWith("SU")) ? "Supplier" : "Retailer",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data?.data?.phone) {
        setMobile(data.data.phone);
        localStorage.setItem("phone", data.data.phone)
      } else {
        console.error("Phone number not found in the response");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      console.log("Running fetchUserDetails...");
      fetchUserDetails();
    }
  }, [id, userType]);

  
  

  console.log("mobile", mobile)

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

  const [loading, setLoading] = useState<boolean>(false);

  // Function for next step
  const handleNext = async () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      setLoading(true);

      // if (!isOtpVerified) {
      //   toast.error("Please verify OTP before submitting the form.");
      //   return;
      // }

      const formDataToSend: any = new FormData();

      // Append all form data to FormData
      Object.keys(formData).forEach(key => {
        const value = formData[key as keyof FormData];
        if (key === 'file' && value instanceof File) {
          formDataToSend.append('file', value);
        } else if (value !== null && value !== undefined) {
          formDataToSend.append(key, value.toString());
        }
      });

      if (formData.userType === "Retailer" && id) {
        formDataToSend.append('sellerId', id);
      }

      console.log("formDataToSend", formDataToSend)
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
            }, 2000);
          } else {
            toast.error("Onboarding error.");
          }
        } else {
          const errorData = await response.json();
          console.log("errorData", errorData)
          toast.error(`Error ${errorData.statusCode}: ${errorData.message}`);
          // toast.error("Error Response:", errorData);
        }
      } catch (error: any) {
        console.log("error", error)
        toast.error(`Unexpected Error: ${error.message}`);
        // toast.error("Error submitting data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Function for previous step
  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  // Function for sending OTP
  const handleOtpSubmitGuest = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      const otpResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify-otp`, {
        phone: `+91${formData.phone}`,
        otp: formData.otp,
      });

      console.log("OTP Verification Response:", otpResponse.data);
      setOtpMessage(otpResponse.data.message);

      if (otpResponse.data.message === "OTP verified successfully") {
        toast.success("OTP Verified Successfully!");
        setIsOtpVerified(true);
      } else {
        toast.error(otpResponse.data.message || "Invalid OTP. Please try again.");
        setIsSubmitting(false);
        return; 
      }

      // Step 2: Create Guest User (Only if OTP is verified)
      const guestResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/guests/create`, {
        phone: `${formData?.phone}`,
        sellerId: id,
      });

      console.log("guestResponse", guestResponse?.data)
      if (typeof window !== "undefined") {
        localStorage.setItem("userDetails", JSON.stringify(guestResponse.data));
        localStorage.setItem("token", guestResponse.data.token);
        localStorage.setItem("userType", formData.userType);

      }

      if (guestResponse.status === 201) {
        router.push(`/shop`);
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error);
      setError(error.response?.data?.message || "Failed to process request. Please try again.");
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  // Function for handling phone submission
  const handlePhoneSubmit = async () => {
    const phonePattern = /^[0-9]{10}$/;
    if (phonePattern.test(formData.phone)) {
      const phoneWithCountryCode = `+91${formData.phone}`;

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/send-otp`, {
          phone: phoneWithCountryCode,
        });

        if (response.data.message === "OTP sent successfully") {
          toast.success("OTP sent successfully!");
          setOtpVisible(true);
        } else {
          toast.error("Failed to send OTP. Try again.");
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        toast.error("Error sending OTP. Please try again.");
      }
    } else {
      toast.error("Please enter a valid 10-digit phone number.");
    }
  };

  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpMessage, setOtpMessage] = useState<string | null>(null);

  const handleOtpSubmit = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify-otp`, {
        phone: `+91${formData.phone}`,
        otp: formData.otp,
      });

      console.log("OTP Verification Response:", response.data);
      setOtpMessage(response.data.message);
      if (response.data.message === "OTP verified successfully") {
        toast.success("OTP Verified Successfully!");
        setIsOtpVerified(true);
      } else {
        toast.error(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error: any) {
      console.error("Error verifying OTP:", error.response?.data || error);
      toast.error("OTP verification failed. Please try again.");
    }
  };

  const [isOtpSent, setIsOtpSent] = useState(false);

  const sendOtp = async () => {
    if (!mobile) {
      alert("Please enter a valid phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/send-otp`, {
        phone: `+91${mobile}`,
      });

      toast.success("OTP sent successfully!");
      setIsOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // **Step 2: Verify OTP**
  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify-otp-relogin-retailer`,
        {
          phone: `+91${mobile}`,
          otp,
        }
      );

      toast.success("OTP verified successfully!");


      // Log the response to the console
      console.log("OTP verified successfully:", response);

      // Store token in localStorage
      // const token = response.data.token;
      // localStorage.setItem("authToken", token); 
      // localStorage.setItem("userDetails", JSON.stringify(response.data)); 

      if (typeof window !== "undefined") {
        localStorage.setItem("userDetails", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);

        localStorage.setItem("userType", "Retailer");
      }

      toast.success("OTP verified successfully!");
      router.push("/shop");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };






  const sendOtps = async () => {
    if (!mobile) {
      alert("Please enter a valid phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/send-otp`, {
        phone: `+91${mobile}`,
      });

      toast.success("OTP sent successfully!");
      setIsOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // **Step 2: Verify OTP**
  const verifyOtps = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/verify-otp-relogin-supplier`,
        {
          phone: `+91${mobile}`,
          otp,
        }
      );

      // Log the response to the console
      console.log("OTP verified successfully:", response);
      toast.success("OTP verified successfully!");

      if (typeof window !== "undefined") {
        localStorage.setItem("userDetails", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", "Supplier");
      }

      // Store token in localStorage
      // const token = response.data.token; // Assuming token is in response.data.token
      // localStorage.setItem("authToken", token); // Store the token

      // // Optionally, store additional user info if needed

      // localStorage.setItem("userDetails", JSON.stringify(response.data.user)); // You can adjust based on your response structure

      toast.success("OTP verified successfully!");
      router.push("/manage");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };



console.log("================================================", length)

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
        {length !== 3 ? (
          <>
            {step === 1 && (
              <div className="bg-[#FFEFD3]">
                <h1 className="text-lg text-[#6D2323] font-bold mb-6 border-b border-[#6D2323] w-20 border-b-black">Join as-
                  {/* {id ? <p>ID: {id}</p> : <p>Loading...</p>} */}
                </h1>
                <div className="flex mb-10 space-x-5  w-30">
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
                  {/* 
              <button onClick={() => setSupplierId(searchParams.get("id") || null)}>
                Retry Fetching Supplier ID
              </button> */}

                </div>
              </div>
            )}
          </>
        ) : supplierRelogin === 'supplier' || sessionStorage.getItem("id")?.includes("SU") || length === 3  ? (
          <div>
            <label className="block mb-1 text-sm items-center text-[#6D2323] font-medium">
              Phone Number:
            </label>

            <input
              type="text"
              value={mobile || ""}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full p-2 border rounded"
              required
              disabled={isOtpSent}
            />

            {/* Send OTP Button */}
            {!isOtpSent && (
              <button
                onClick={sendOtps}
                className={`w-full bg-[#6D2323] text-white py-2 rounded mt-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#6D2323]"
                  }`}
                disabled={isSubmitting}
              >
                Send OTP
              </button>
            )}

            {/* OTP Input & Verify Button */}
            {isOtpSent && (
              <>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full p-2 mt-2 border rounded"
                  required
                />

                <button
                  onClick={verifyOtps}
                  className={`w-full bg-green-600 text-white py-2 rounded mt-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                    }`}
                  disabled={isSubmitting}
                >
                  Verify OTP & Continue
                </button>
              </>
            )}
          </div>

        ) : (
          <>
            <div>
              <label className="block mb-1 text-sm items-center text-[#6D2323] font-medium">
                Phone Number:
              </label>

              <input
                type="text"
                value={mobile || ""}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full p-2 border rounded"
                required
                disabled={isOtpSent}
              />

              {/* Send OTP Button */}
              {!isOtpSent && (
                <button
                  onClick={sendOtp}
                  className={`w-full bg-[#6D2323] text-white py-2 rounded mt-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#6D2323]"
                    }`}
                  disabled={isSubmitting}
                >
                  Send OTP
                </button>
              )}

              {/* OTP Input & Verify Button */}
              {isOtpSent && (
                <>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full p-2 mt-2 border rounded"
                    required
                  />

                  <button
                    onClick={verifyOtp}
                    className={`w-full bg-green-600 text-white py-2 rounded mt-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                      }`}
                    disabled={isSubmitting}
                  >
                    Verify OTP & Continue
                  </button>
                </>
              )}
            </div>
          </>
        )}


        {formData.userType === "Guest" && (
          <div className="mt-10 mb-16 ">
            {/* Phone Input */}
            {!showOtpBox && (
              <div>
                <h1 className="text-md font-bold py-2 text-sm items-center text-[#6D2323]">
                  Type your phone number
                </h1>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg border-slate-400"
                />

                {!otpVisible && (
                  <button
                    onClick={handlePhoneSubmit}
                    // onClick={handleOtpSubmitGuest}
                    className="mt-3 w-full py-2 bg-[#6D2323] text-white rounded-lg hover:bg-[#6D2323] transition"
                  >
                    Verify Phone
                  </button>
                )}
              </div>
            )}

            {/* OTP Input */}
            {otpVisible && (
              <div className="mt-4">
                <h1 className="py-2 font-bold text-md">Enter OTP</h1>
                <input
                  type="text"
                  name="otp"
                  placeholder="OTP"
                  value={formData.otp}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg border-slate-400"
                />
                <button
                  onClick={handleOtpSubmitGuest}
                  className="w-full py-2 mt-3 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
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
                className="w-full px-1 py-3 border rounded-lg border-slate-400"

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
                className="w-full px-1 py-3 border rounded-lg border-slate-400"

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
                className="w-full p-2 border rounded-lg border-slate-400"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-md space-y-4">
            <h1 className="text-2xl flex font-bold justify-center items-center mb-5 mt-5 text-[#6D2323]">Complete profile !</h1>
            <div>
              <h1 className="text-md font-bold py-2 text-sm items-center text-[#6D2323]">
                Type your phone number
              </h1>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg border-slate-400"
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
                <h1 className="py-2 font-bold text-md">Enter OTP</h1>
                <input
                  type="text"
                  name="otp"
                  placeholder="OTP"
                  value={formData.otp}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg border-slate-400"
                />
                <button
                  onClick={handleOtpSubmit}
                  className="w-full py-2 mt-3 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
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
                className="w-full p-2 border rounded-lg border-slate-400"
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
                className="w-full p-2 border rounded-lg border-slate-400"
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
                className="w-full p-2 border rounded-lg border-slate-400"
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
                className="w-full p-2 border rounded-lg border-slate-400"
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
                className="w-full p-2 border rounded-lg border-slate-400"
              />

            </div>

          </div>
        )}

        {step === 5 && (
          <div className="w-full max-w-md space-y-4">

            <div className="flex flex-col items-center justify-center space-y-2">
              <label
                htmlFor="profile-upload"
                className="relative cursor-pointer group"
              >
                <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[#6D2323] transition-colors group-hover:bg-[#6D2323]">
                  {selectedImage ? (
                    <div className="relative w-full h-full overflow-hidden rounded-full">
                      <Image
                        src={selectedImage}
                        alt="Profile photo"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/40 group-hover:opacity-100">
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
        <footer className="flex flex-col items-center w-full px-4 mt-5 mb-10 space-y-6">
          <div className="flex flex-col w-full max-w-md space-y-4">

            {/* Next/Submit Button */}
            {/* <button
              onClick={handleNext}
              className="w-full py-3 bg-[#6D2323] text-white rounded-xl hover:bg-[#6D2323] transition duration-200"
            >
              {step < 5 ? "Next" : "Submit"}
            </button> */}

            {length !== 3 && (
              <button
                onClick={handleNext}
                disabled={loading}
                className={`w-full  py-3 text-white rounded-xl transition duration-200 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#6D2323] hover:bg-[#6D2323]"
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 text-white animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  step < 5 ? "Next" : "Submit"
                )}
              </button>

            )}


            {/* Back Button */}
            {step > 1 && (
              <button
                onClick={handlePrevious}
                className="w-full py-3 text-black transition duration-200 bg-gray-300 rounded-xl hover:bg-gray-400"
              >
                Back
              </button>
            )}

          </div>

          {/* Pagination Dots */}
          {length !== 3 && (
            <div className="flex space-x-2 ">
              {[1, 2, 3, 4].map((page) => (
                <span
                  key={page}
                  className={`w-3 h-3 rounded-full ${step === page ? "bg-[#6D2323]" : "bg-gray-300"
                    }`}
                ></span>
              ))}
            </div>
          )}

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