"use client"
import { Search, Menu, ShoppingCart, Store } from 'lucide-react'
import Image from 'next/image'
import ProductCard from '../global/productCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link'
import BottomNavigation from '../global/bottomNavigation'
import { useEffect, useState } from 'react'
import Profile from "@/assets/profile_user.jpg";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import Banner from '../../assets/com_logo.jpeg'
import MainDrawer from '../Drawer/mainDrawer';


import vegetablesImage from "@/assets/veg.svg";
import fruitsImage from "@/assets/fruits.svg";
import beveragesImage from "@/assets/beverage.svg";
import groceryImage from "@/assets/grocery.svg";
import edibleOilImage from "@/assets/edibleoil.svg";
import householdImage from "@/assets/household.svg";
import babyCareImage from "@/assets/babycare.svg";

type UserType = "Supplier" | "Retailer" | "Distributor" | "Guest";

export default function ShopMain() {
    const [productData, setProductData] = useState<any>([]);
    const [sellerData, setSellerData] = useState<any>([]);
    const [error, setError] = useState<string | null>(null);
    const [imageSlider, setImageSlider] = useState<any>([]);
    const [userType, setUserType] = useState<UserType | null>(null);
    const [customId, setCustomId] = useState<string | null>(null);

    const router = useRouter();

    const carts = useSelector((state: RootState) => state.cart.cart);


    const [sellerId, setSellerId] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const [adminId, setAdminId] = useState(null)

    const [isSearchToggled, setIsSearchToggled] = useState<boolean>(false);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen((prev) => !prev);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const localData = localStorage.getItem('userDetails');
            setUserType(localStorage.getItem('userType') as UserType)
            if (localStorage.getItem('userType') === 'Guest') {
                setIsSearchToggled(true)
            }
            if (localData) {
                const parsedData = JSON.parse(localData);
                const sellerIdFromLocalStorage = parsedData?.data?.sellerId;
                const adminId = parsedData?.data?.adminId
                setCustomId(parsedData?.data?.customId);

                if (sellerIdFromLocalStorage) {
                    setSellerId(sellerIdFromLocalStorage);
                    setPhoneNumber(parsedData?.data?.phone || null);
                }
                setAdminId(adminId)

            }
        }
    }, []);

    useEffect(() => {
        if (sellerId && userType !== 'Guest') {
            const fetchProductList = async () => {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get-product-list?sellerId=${sellerId}`,
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

                    setProductData(result);
                    setError(null);
                } catch (error: any) {
                    console.error('Error fetching product list:', error.message);
                    setError(error.message);
                }
            };

            fetchProductList();
        }
    }, [sellerId]);


    useEffect(() => {
        if (sellerId) {
            const fetchSellerDetails = async () => {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getUserById`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                customId: sellerId,
                                userType: "Supplier",
                            }),
                        }
                    );

                    const result = await response.json();
                    console.log("result", result)

                    if (!response.ok) {
                        throw new Error(result.message || 'Failed to fetch seller details');
                    }

                    setSellerData(result);
                    setError(null);
                } catch (error: any) {
                    console.error('Error fetching seller details:', error.message);
                    setError(error.message);
                }
            };

            fetchSellerDetails();
        }
    }, [sellerId]);

    console.log("sellerData", sellerData)


    useEffect(() => {
        // Fetch banner images if sellerId is available
        if (sellerId && userType !== 'Guest') {
            const fetchBannerImages = async () => {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-banner-image?sellerId=${sellerId}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    const result = await response.json();

                    if (!response.ok) {
                        throw new Error(result.message || 'Failed to fetch banner images');
                    }

                    setImageSlider(result);
                    setError(null);
                } catch (error: any) {
                    console.error('Error fetching banner images:', error.message);
                    setError(error.message);
                }
            };

            fetchBannerImages();
        }
    }, [sellerId]);

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<any>([]);

    useEffect(() => {
        if (!search) {
            setSearchResults([]);
            return;
        }

        const searchData = async () => {
            try {
                const url =
                    adminId
                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/search-product-by-admin?productName=${search}`
                        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/search-product?productName=${search}`;

                const response = await fetch(url,
                    // `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/search-product?productName=${search}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const result = await response.json();
                if (userType !== 'Guest') {
                    setSearchResults(result);
                } else {
                    setProductData(result);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        // Add delay for debounce functionality
        const delaySearch = setTimeout(() => {
            searchData();
        }, 500);

        return () => clearTimeout(delaySearch);

    }, [search]);


    // console.log("adminId", adminId)
    // console.log("searchResults", searchResults)

    const categories = [
        {
            id: 1,
            name: "Vegetables",
            image: vegetablesImage,
            bgColor: "#E6F2EA",
            alt: "Vegetables",
        },
        {
            id: 2,
            name: "Fruits",
            image: fruitsImage,
            bgColor: "#FFE9E5",
            alt: "Fruits",
        },
        {
            id: 3,
            name: "Beverages",
            image: beveragesImage,
            bgColor: "#FFF6E3",
            alt: "Beverages",
        },
        {
            id: 4,
            name: "Grocery",
            image: groceryImage,
            bgColor: "#F3EFFA",
            alt: "Grocery",
        },
        {
            id: 5,
            name: "Edible oil",
            image: edibleOilImage,
            bgColor: "#DCF4F5",
            alt: "Edible oil",
        },
        {
            id: 6,
            name: "Household",
            image: householdImage,
            bgColor: "#FFE8F2",
            alt: "Household",
        },
        {
            id: 7,
            name: "Babycare",
            image: babyCareImage,
            bgColor: "#D2EFFF",
            alt: "Babycare",
        }
    ]


    return (
        <>
            <MainDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
            {isDrawerOpen && (<div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />)}
            <div className='bg-[#FF9A2D]  py-4 flex flex-col justify-end'>
                <div className='z-10 flex flex-row items-center justify-between w-full px-2 '>
                    <button onClick={toggleDrawer} className="p-2 " type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example">
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className='flex flex-col items-start justify-center flex-grow px-2'>
                        {userType !== 'Guest' && (<p className="m-0 text-base leading-none">{sellerData?.data?.businessName}</p>)}
                        {userType !== 'Guest' && (<p className="m-0 text-xs leading-none">{sellerData?.data?.businessOwner}</p>)}

                        {userType === 'Guest' && (<p className="m-0 text-base leading-none">{customId}</p>)}
                    </div>
                    <button className="p-2">
                        <Search onClick={() => setIsSearchToggled((prev) => !prev)} className="w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="bg-[#F7F8FC] min-h-screen p-2">

                {/* Search Header */}
                {isSearchToggled && (<div className="flex items-center gap-3 mx-2 mt-2 bg-transparent">
                    <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#3A6B34]">
                        <Search className="w-4 h-4 text-[#3A6B34]" />
                        <input
                            type="text"
                            placeholder="Search keywords..."
                            className="w-full bg-transparent outline-none text-sm text-[#3A6B34]"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {/* <div className="relative inline-block" onClick={() => router.push('/cart')
                }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6D2323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-basket"><path d="m15 11-1 9" /><path d="m19 11-4-7" /><path d="M2 11h20" /><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" /><path d="M4.5 15.5h15" /><path d="m5 11 4-7" /><path d="m9 11 1 9" /></svg>
                    <p className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-600 rounded-full -top-2 -right-2">
                        {carts?.length}
                    </p>
                </div> */}

                    {/* <button className="p-2">
                    <Menu className="w-5 h-5 text-gray-600" />
                </button> */}
                </div>)}

                {searchResults?.data?.length > 0 && (
                    <div className="absolute left-0 z-50 p-2 mx-4 bg-white border border-gray-200 rounded-lg shadow-lg top-20 w-80">
                        {searchResults.data.map((item: any, index: number) => (
                            <Link key={index} href={`/single-view?id=${item.productId}&sellerId=${item.sellerId}`}>

                                <div
                                    key={item.id}
                                    className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-100"
                                >
                                    {/* Product Image */}
                                    <Image
                                        width={10}
                                        height={10}
                                        src={item.productImage || "/placeholder-image.jpg"}
                                        alt={item.productName || "Product"}
                                        className="object-cover w-12 h-12 border rounded-md"
                                    />
                                    {/* Product Details */}
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">
                                            {item.productName || "Unnamed Product"}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Price: ₹{item.averagePrice || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>
                )}


                {/* Profile Section */}
                {/* <div className="flex flex-col items-center gap-2 p-4">
                <div className="w-20 h-20 overflow-hidden rounded-full">
                    <Image

                        src={sellerData?.data?.filePath || Profile}
                        alt="Profile"
                        width={80}
                        height={80}
                        className="object-cover w-full h-full border-2 border-gray-200 rounded-full"
                    />
                </div>
                <h2 className="text-xl font-semibold text-black">{sellerData?.data?.businessName}</h2>
                <p className="text-gray-700 text-md">{sellerData?.data?.businessOwner}</p>
                </div> */}

                {/* Promo Banner */}
                {imageSlider?.data?.length > 0 && (<div className="mt-4">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        loop={true}
                        className="w-full h-64"
                    >
                        {imageSlider?.data?.map((slide: any) => (
                            <SwiperSlide key={slide?.id}>
                                <div className="relative w-full h-full">
                                    <Image
                                        src={slide?.imageLink}
                                        alt={slide?.imageLink || "Promo Banner"}
                                        width={400}
                                        height={120}
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>)}

                {/* Categories */}
                {userType !== 'Guest' && (<div className="flex flex-col items-center justify-between gap-4 px-2 my-8">
                    <Link href={'/categories'} className='w-full'>
                        <div className="flex flex-row items-center justify-between w-full px-2 cursor-pointer">
                            <p className='font-bold text-[#0D8B28]'>Categories</p>
                            <p className='font-extralight text-3xl text-[#0D8B28]'>{'>'}</p>
                        </div>
                    </Link>
                    <div className="flex items-center justify-between w-full px-2">
                        {categories.slice(0, 6).map((category) => (
                            <div key={category?.id} className="flex flex-col items-center justify-between">
                                <button style={{ backgroundColor: category?.bgColor ? category?.bgColor : '#DCF4F5' }} className={`rounded-full p-2 flex items-center space-x-2 aspect-square w-12 justify-center`}>
                                    <Image
                                        src={category?.image}
                                        alt={category?.alt}
                                        width={20}
                                        height={20}
                                    />
                                </button>
                                <p className='text-xs text-center text-black font-extralight'>
                                    {category?.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>)}

                <div className="px-1">
                    <div className="grid grid-cols-2 gap-2 pb-5 my-5">
                        {productData?.data?.map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))}

                    </div>
                </div>
                {carts.length > 0 && (<div className="fixed bottom-0 left-0 right-0 z-10 flex items-center p-4 text-xs bg-white border-t shadow-sm justify-evenly">
                    <div>
                        <p className='text-[#3A6B34] font-semibold text-base'>{carts?.length} Item | ₹{carts?.reduce((acc, item: any) => acc + (item.price * item.quantity), 0)}</p>
                        <p className='text-black font-extralight'>Tap to continue with your Enquiry</p>
                    </div>
                    <button onClick={() => router.push('/cart')} className="flex justify-center items-center gap-2 px-4 py-2 rounded-md border-2 bg-[#3A6B34] text-white w-2/5 h-14">
                        <ShoppingCart className="w-4 h-4" /> Go to Cart
                    </button>
                </div>)}
                {carts.length < 1 && (<div className='mt-20'>
                    <BottomNavigation />
                </div>)}
            </div>
        </>
    )
}