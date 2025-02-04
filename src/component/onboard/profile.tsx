"use client";
import React, { useEffect, useState } from "react";
import Profile from "@/assets/profile_user.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BottomNavigation from "../global/bottomNavigation";

const UserProfile: React.FC = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  // Fetch user ID from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDetails = localStorage.getItem("userDetails");

      if (storedDetails) {
        const parsedDetails = JSON.parse(storedDetails);
        const customId = parsedDetails.data?.customId;

        if (customId) {
          console.log("customId:", customId);
          setId(customId);

          // Determine userType based on customId prefix
          if (customId.startsWith("SU")) {
            setUserType("Supplier");
          } else if (customId.startsWith("RE")) {
            setUserType("Retailer");
          } else {
            setUserType(null); 
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!id || !userType) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getUserById`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customId: id, userType }),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch user data");

        const result = await response.json();
        if (result.success) {
          setUserDetails(result.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, userType]);

  if (loading) return <div>Loading...</div>;
  if (!userDetails) return <div>Error loading user details</div>;

  const { businessName, businessOwner, filePath, qrCode } = userDetails;

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

<span className="bg-[#fadfb0] text-sm rounded-full px-3 py-1 text-black my-3">{userType}
</span>
      
      {/* QR Code */}
      {qrCode && (
        <div className="mt-4">
          <img src={qrCode} alt="QR Code" className="w-60 h-60" />
        </div>
      )}

      {/* Help Section */}
      <div className="mt-5 mb-2">
        <a href="#" className="text-sm text-gray-500 hover:underline flex items-center">
          Need Help/Support
        </a>
      </div>

      <div className="mt-20">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default UserProfile;
