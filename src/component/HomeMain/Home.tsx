"use client"
import { Bell, ChevronRight, Package, History, Star,Images,UsersRound, HelpCircle, ShoppingCart, ClipboardList, Truck, FileText } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import Logo from '@/assets/company_logo.png'
import BottomNavigation from '../global/bottomNavigation';
import { useEffect, useState } from 'react';

const retailerMenuItem = [
  {
    id: 1,
    title: 'Order Tracking',
    subtitle: 'Track your order status',
    icon: Package,
    href: '/order-track',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-500'
  },
  {
    id: 2,
    title: 'Order History',
    subtitle: 'Monitor your Order History',
    icon: History,
    href: '/order-history',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500'
  },
  {
    id: 3,
    title: 'Reviews / Ratings',
    subtitle: 'Manage product details',
    icon: Star,
    href: '/review',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-500'
  },
  {
    id: 4,
    title: 'FAQ',
    subtitle: 'Visit Your Website',
    icon: HelpCircle,
    href: '/faq',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-500'
  }
]


const supplierMenuItems = [
  // {
  //   id: 1,
  //   icon: ShoppingCart,
  //   title: 'Start Ordering',
  //   subtitle: 'Place your order',
  //   bgColor: 'bg-yellow-50',
  //   iconColor: 'text-yellow-500',
  //   href: '/start-order',

  // },
  {
    id: 2,
    icon: ClipboardList,
    title: 'Requested Order',
    subtitle: 'Track your order status',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500',
    href: '/request-order',

  },
  // {
  //   id: 3,
  //   icon: Truck,
  //   title: 'Order Tracking',
  //   subtitle: 'Track your order status',
  //   bgColor: 'bg-pink-50',
  //   iconColor: 'text-pink-500',
  //   href: '/order-track',

  // },
  {
    id: 4,
    icon: FileText,
    title: 'Order History',
    subtitle: 'Monitor your Order History',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    href: '/order-history',

  },
  {
    id: 5,
    icon: Star,
    title: 'Reviews / Ratings',
    subtitle: 'Manage product details',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-500',
    href: '/review',

  },
  {
    id: 6,
    icon: UsersRound,
    title: 'Connection',
    subtitle: 'Track your connection list',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500',
    href: '/connection',

  },
  {
    id: 7,
    icon: Images,
    title: 'Add Banner Images',
    subtitle: 'Add upto 5 banner images',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-500',
    href: '/banner-image',

  },
  {
    id: 8,
    icon: HelpCircle,
    title: 'FAQ',
    subtitle: 'Visit Your Website',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-500',
    href: '/order-track',
  }
]

export default function MainHome() {
  // const userType:any = "Retailer"
  const userType = localStorage.getItem("userType");
  
  const router = useRouter();

  // const menuItems = userType === "Supplier" ? supplierMenuItems : retailerMenuItem;

  const isAdmin = false; 


  const menuItems = (userType === "Supplier" ? supplierMenuItems : retailerMenuItem)
  .filter((item) => !(item.href === '/start-order' && !isAdmin));

// Conditionally add "Start Order" for Retailer if isAdmin is true
if (userType === "Retailer" && isAdmin) {
  menuItems.unshift({
    id: 0, // Ensure unique ID
    icon: ShoppingCart,
    title: 'Start Ordering',
    subtitle: 'Place your order',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-500',
    href: '/start-order',
  });
}

    const [sellerData, setSellerData] = useState<any>([]);
    const [error, setError] = useState<string | null>(null);

    const localData: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const customId = localData?.data?.customId;


    useEffect(() => {
        const fetchSellerDetails = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getUserById`,
                    {
                        method: 'POST', // Changed to POST for sending a body
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            customId: customId,
                            userType: "Retailer",
                        }),
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Failed to fetch seller details');
                }

                setSellerData(result?.data);
                setError(null);
            } catch (error: any) {
                console.error('Error fetching seller details:', error.message);
                setError(error.message);
            }
        };

        if (customId) {
            fetchSellerDetails();
        }
    }, [customId]);


    console.log("sellerData", sellerData)
 

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between bg-white p-4 shadow-sm mb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-[2rem] w-[2rem] items-center justify-center rounded text-white">
            <span className="">
              <Image src={sellerData?.filePath} alt="logo" width={30} height={30}/>
            </span>
          </div>
          <div>
            <h1 className="font-semibold">{sellerData?.businessName}</h1>
            <p className="text-sm text-gray-500">{sellerData?.businessOwner}</p>
          </div>
        </div>
        {/* <button className="rounded-full p-2 hover:bg-gray-100"> */}
          <Link href='/notification'>
          <Bell className="h-6 w-6 text-gray-600" />
          </Link>
        {/* </button> */}
      </header>

      {/* Menu Items */}
      <div className="p-1">
        <div className="space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center border justify-between rounded-xl bg-white p-3 shadow-sm transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-xl ${item.bgColor} p-3`}>
                  <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                </div>
                <div>
                  <h2 className="font-medium">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          ))}
        </div>
      </div>

      <div className='mt-20'>
        <BottomNavigation />

      </div>
    </div>
  )
}