// "use client"
// import React, { useEffect, useState } from "react";
// import Profile from '@/assets/profile_user.jpg'
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import BottomNavigation from "../global/bottomNavigation";

// const InitialProfile: React.FC = () => {
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
//     customId
//   } = data;


//   return (
//     <div className=" flex flex-col items-center justify-between bg-[#FFEFD3] p-2">

//       {/* Profile Section */}
//       <div className="flex flex-col items-center mt-8" onClick={handleClick}>
//         <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500">
//           {/* Profile Picture */}
//           <Image src={Profile} alt="img" />
//         </div>
//         <h1 className="mt-4 text-lg font-semibold">{businessOwner}</h1>
//         <p className="text-sm text-gray-500">{businessName}</p>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex absolute  right-4 space-x-4 mt-2  justify-self-end">

//         <button className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full border">
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
//         </button>
//       </div>

//       <span className="text-sm bg-blue-100 text-blue-500 px-2 py-2 m-2 rounded-full ">
//         {customId.startsWith('RE') ? <>retailer</> : <>supplier</>}
//       </span>

//       {/* <img src={qrCode} alt="QR Code" className="w-full h-full" /> */}
//       {qrCode && (
//   <div className="mt-4">
//     <img src={qrCode} alt="QR Code" className="w-60 h-60" />
//     {/* <p className="text-sm text-gray-500 mt-2">
//       Scan this QR code to access your onboarding page.
//     </p> */}
//   </div>
// )}


//       {/* QR Code Section */}
//       <div className="mt-1 mb-2">
//         <a
//           href="#"
//           className="text-sm text-gray-500 hover:underline flex items-center"
//         >
//           Need Help/Support
//           <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-arrow-out-up-right ml-2"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" /><path d="m21 3-9 9" /><path d="M15 3h6v6" /></svg>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default InitialProfile;


