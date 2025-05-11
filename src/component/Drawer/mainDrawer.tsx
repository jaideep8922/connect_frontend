import { X, LogOut } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Profile from "@/assets/profile_user.jpg";


export default function MainDrawer({ isOpen, toggleDrawer }: { isOpen: boolean, toggleDrawer: () => void }) {

    const [userDetails, setUserDetails] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedDetails = localStorage.getItem("userDetails");

            if (storedDetails) {
                const parsedDetails = JSON.parse(storedDetails);
                setUserDetails(parsedDetails.data);
            }
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    return (
        <div className={` z-50 fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex flex-col items-center justify-between h-full gap-2">
                <div className="flex flex-row items-center justify-end w-full p-2 ">
                    <button onClick={toggleDrawer} className="text-gray-600" >
                        <X />
                    </button>
                </div>
                <div className="flex flex-col items-center w-full h-full border-b-2">
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-[#FF9A2D]">
                        <Image
                            src={userDetails?.filePath || Profile}
                            alt="Profile"
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <h1 className="mt-4 text-lg font-semibold text-black">{userDetails?.businessOwner || userDetails?.customId}</h1>
                    <p className="text-sm text-gray-600">{userDetails?.businessName || userDetails?.phone}</p>
                </div>
                <div className="flex flex-row items-center justify-between w-full p-4 mb-8">
                    <div className="flex flex-row items-center justify-start gap-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#FF9A2D]">
                            <Image
                                src={userDetails?.filePath || Profile}
                                alt="Profile"
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <h1 className="font-medium text-black text-md">{userDetails?.businessOwner || userDetails?.customId}</h1>
                            <p className="text-sm text-red-600">Log-Out</p>
                        </div>
                    </div>
                    {/* <LogOut className="text-gray-600" /> */}
                    <button onClick={logout} className="flex items-center p-2 space-x-2 rounded-full ">
                        <LogOut className="text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
}
