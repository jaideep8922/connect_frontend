// "use client"
// import React, { useEffect, useState } from "react";
// import Profile from '@/assets/profile_user.jpg'
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import BottomNavigation from "../global/bottomNavigation";

// const UserProfile: React.FC = () => {
//   const router = useRouter();

//   const handleClick = () => {
//     router.push('/shop')
//   }


//   const [userDetails, setUserDetails] = useState(null);

//   useEffect(() => {
//     // Retrieve the userDetails from localStorage
//     const storedDetails = localStorage.getItem('userDetails');

//     // Check if the data exists and parse it
//     if (storedDetails) {
//       try {
//         const parsedUserDetails = JSON.parse(storedDetails);
//         setUserDetails(parsedUserDetails);  // Save the data in state
//       } catch (e) {
//         console.error("Error parsing userDetails", e);
//       }
//     }
//   }, []);

//   if (!userDetails) {
//     return <div>Loading...</div>;
//   }

//   const { message, data }: any = userDetails;
//   const {
//     businessName,
//     businessOwner,
//     city,
//     gstNumber,
//     phone,
//     pincode,
//     qrCode,
//     customId,
//     filePath
//   } = data;

//   const phoneNo = localStorage.getItem('sellerPhone');

//   return (
//     <div className=" flex flex-col items-center justify-between bg-[#FFEFD3] p-2">

//       {/* Profile Section */}
//       <div className="flex flex-col items-center mt-8" onClick={handleClick}>
//         <div className="w-20 h-20 rounded-full overflow-hidden border border-[#6D2323]">
//           {/* Profile Picture */}
//           <Image src={Profile} alt="img" />
//         </div>
//         <h1 className="mt-4 text-lg font-semibold">{businessOwner}</h1>
//         <p className="text-sm text-gray-500">{businessName}</p>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex absolute right-4 space-x-4 mt-2 justify-self-end">
//         <a
//           href={`tel:${phoneNo}`}
//           className="w-12 h-12 flex items-center justify-center bg-[#FFEFD3] text-[#6D2323] rounded-full border border-[#6D2323]"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-phone"
//           >
//             <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
//           </svg>
//         </a>
//       </div>


//       <span className="text-[10px] bg-[#6D2323] text-white px-2 py-1 m-2 rounded-full ">
//         {customId.startsWith('RE') ? <>retailer</> : <>supplier</>}
//       </span>
//       {/* 
// {qrCode && (
//       <img src={qrCode} alt="QR Code" className="w-full h-full" />

// )} */}

//       {qrCode && (
//         <div className="mt-4">
//           <img src={qrCode} alt="QR Code" className="w-60 h-60" />
//           {/* <p className="text-sm text-gray-500 mt-2">
//       Scan this QR code to access your onboarding page.
//     </p> */}
//         </div>
//       )}


//       {/* QR Code Section */}
//       <div className="mt-5 mb-2">
//         <a
//           href="#"
//           className="text-sm text-gray-500 hover:underline flex items-center"
//         >
//           Need Help/Support
//           <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-arrow-out-up-right ml-2"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" /><path d="m21 3-9 9" /><path d="M15 3h6v6" /></svg>
//         </a>
//       </div>

//       <div className='mt-20'>
//         <BottomNavigation />

//       </div>
//     </div>
//   );
// };

// export default UserProfile;


"use client"
import React, { useEffect, useState } from "react";
import Profile from '@/assets/profile_user.jpg';
import Image from "next/image";
import { useRouter } from "next/navigation";
import BottomNavigation from "../global/bottomNavigation";

const UserProfile: React.FC = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDetails = localStorage.getItem("userDetails");

      if (storedDetails) {
        const parsedDetails = JSON.parse(storedDetails);
        console.log("customId:", parsedDetails.data?.customId);
        setId(parsedDetails.data?.customId); // Set ID
      }
    }
  }, []);

  useEffect(() => {
    if (!id) return; // Prevent API call if id is null

    const fetchUserData = async () => {
        
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getUserById`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customId: id,
            userType: "Supplier",
          }),
        });
        
        const result = await response.json();
        if (result.success) {
          setUserDetails(result.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    
    };
    
    fetchUserData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return <div>Error loading user details</div>;
  }

  const { businessName, businessOwner, customId, filePath, qrCode } = userDetails;  

  console.log("qr ", qrCode)

  return (
    <div className="flex flex-col items-center justify-between bg-[#FFEFD3] p-2">
      {/* Profile Section */}
      <div className="flex flex-col items-center mt-8">
        <div className="w-20 h-20 rounded-full overflow-hidden border border-[#6D2323]">
          <Image
            src={filePath || Profile}
            alt="Profile"
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="mt-4 text-lg font-semibold text-black">{businessOwner}</h1>
        <p className="text-sm text-gray-600">{businessName}</p>
      </div>

      {/* QR Code */}
      {qrCode && (
        <div className="mt-4">
          <img src={qrCode} alt="QR Code" className="w-60 h-60" />
        </div>
      )}

      {/* Help Section */}
      <div className="mt-5 mb-2">
        <a href="#" className="text-sm text-gray-500 hover:underline flex items-center">
          Need Help/Supportdsf
        </a>
      </div>

      <div className='mt-20'>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default UserProfile;


// "use client"
// import React, { useEffect, useState } from "react";
// import Profile from '@/assets/profile_user.jpg'
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import BottomNavigation from "../global/bottomNavigation";

// const UserProfile: React.FC = () => {
//   const router = useRouter();
//   const [userDetails, setUserDetails] = useState<any>(null);
//   const [phoneNo, setPhoneNo] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     // Check for `localStorage` on the client side
//     if (typeof window !== "undefined") {
//       const storedDetails = localStorage.getItem('userDetails');
//       const sellerPhone = localStorage.getItem('sellerPhone');

//       if (storedDetails) {
//         try {
//           const parsedDetails = JSON.parse(storedDetails);
//           setUserDetails(parsedDetails); // Set the user details in state
//         } catch (e) {
//           console.error("Error parsing userDetails", e); // Handle parsing errors
//         }
//       }

//       setPhoneNo(sellerPhone); // Set the phone number
//       setLoading(false); // Set loading to false once the data is ready
//     }
//   }, []);

//   // Show a loading message or spinner while data is being fetched
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // If userDetails or phoneNo is not available, show loading state
//   if (!userDetails || !phoneNo) {
//     return <div>Loading...</div>;
//   }

//   const { data } = userDetails;
//   const { businessName, businessOwner, customId, filePath, qrCode } = data;

//   const handleClick = () => {
//     router.push('/shop');
//   };
//   return (
//     <div className="flex flex-col items-center justify-between bg-[#FFEFD3] p-2">
//       {/* Profile Section */}
//       <div className="flex flex-col items-center mt-8">
//         <div className="w-20 h-20 rounded-full overflow-hidden border border-[#6D2323]">
//           <Image
//             src={filePath || Profile}
//             alt="Profile"
//             width={80}
//             height={80}
//             className="w-full h-full object-cover"
//             />
//         </div>
//         <h1 className="mt-4 text-lg font-semibold text-black">{businessOwner}</h1>
//         <p className="text-sm text-gray-600">{businessName}</p>
//       </div>

//       {/* Action Buttons */}
//       {customId?.startsWith('RE') ? 

//       <div className="flex absolute right-4 space-x-4 mt-2 justify-self-end">
//         <a
//           href={`tel:${phoneNo}`}
//           className="w-12 h-12 flex items-center justify-center bg-[#FFEFD3] text-[#6D2323] rounded-full border border-[#6D2323]"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-phone"
//           >
//             <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
//           </svg>
//         </a>
//       </div>

      
//       :<></> }

//       <span className="text-[10px] bg-[#6D2323] text-white px-2 py-1 m-2 rounded-full">
//         {customId?.startsWith('RE') ? 'retailer' : 'supplier'}
//       </span>

//       {qrCode && (
//         <div className="mt-4">
//           <img src={qrCode} alt="QR Code" className="w-60 h-60" />
//         </div>
//       )}

//       {/* Help Section */}
//       <div className="mt-5 mb-2">
//         <a href="#" className="text-sm text-gray-500 hover:underline flex items-center">
//           Need Help/Support
//           {/* Arrow icon */}
//         </a>
//       </div>

//       <div className='mt-20'>
//         <BottomNavigation />
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

