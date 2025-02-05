"use client"
import { Search, Menu } from 'lucide-react'
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


export default function ShopMain() {
    const [productData, setProductData] = useState<any>([]);
    const [sellerData, setSellerData] = useState<any>([]);
    const [error, setError] = useState<string | null>(null);
    const [imageSlider, setImageSlider] = useState<any>([]);
    const router = useRouter();

    const carts = useSelector((state: RootState) => state.cart.cart);


    const [sellerId, setSellerId] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const localData = localStorage.getItem('userDetails');
            if (localData) {
                const parsedData = JSON.parse(localData);
                const sellerIdFromLocalStorage = parsedData?.data?.sellerId;
                if (sellerIdFromLocalStorage) {
                    setSellerId(sellerIdFromLocalStorage);
                    setPhoneNumber(parsedData?.data?.phone || null);
                }
            }
        }
    }, []);

    useEffect(() => {
        if (sellerId) {
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

    useEffect(() => {
        // Fetch banner images if sellerId is available
        if (sellerId) {
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
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/search-product?productName=${search}`,
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
                setSearchResults(result);
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


    console.log("searchResults", searchResults)

    return (
        <div className="bg-[#FFEFD3] m-2 overflow-hidden">


            {/* Search Header */}
            <div className="flex items-center gap-3 mt-2 bg-transparent m-2">
                <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#6D2323]">
                    <Search className="w-4 h-4 text-[#6D2323]" />
                    <input
                        type="text"
                        placeholder="Search keywords..."
                        className="w-full bg-transparent outline-none text-sm text-[#6D2323]"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="relative inline-block" onClick={() => router.push('/cart')
                }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6D2323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-basket"><path d="m15 11-1 9" /><path d="m19 11-4-7" /><path d="M2 11h20" /><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" /><path d="M4.5 15.5h15" /><path d="m5 11 4-7" /><path d="m9 11 1 9" /></svg>
                    <p className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {carts?.length}
                    </p>
                </div>

                {/* <button className="p-2">
                    <Menu className="w-5 h-5 text-gray-600" />
                </button> */}
            </div>

            {searchResults?.data?.length > 0 && (
                <div className="absolute top-20 left-0 w-80 mx-4 bg-white shadow-lg rounded-lg p-2 z-50 border border-gray-200">
                    {searchResults.data.map((item: any) => (
                        <Link href={`/single-view?id=${item.productId}`}>

                            <div
                                key={item.id}
                                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                            >
                                {/* Product Image */}
                                <img
                                    src={item.productImage || "/placeholder-image.jpg"} // Fallback image
                                    alt={item.productName || "Product"}
                                    className="w-12 h-12 object-cover rounded-md border"
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
            <div className="flex flex-col items-center gap-2 p-4">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                    <Image

                        src={sellerData?.data?.filePath || Profile}
                        alt="Profile"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover border-2 border-gray-200 rounded-full"
                    />
                </div>
                <h2 className="font-semibold text-xl text-black">{sellerData?.data?.businessName}</h2>
                <p className="text-md text-gray-700">{sellerData?.data?.businessOwner}</p>
            </div>

            {/* Promo Banner */}
            <div className="">
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
                                    alt={slide?.imageLink}
                                    width={400}
                                    height={120}
                                    className="object-cover rounded-lg"
                                />
                                {/* <div className="absolute bottom-8 left-4 bg-black bg-opacity-50 text-white p-2 text-sm rounded">
                                    {slide.sellerId}
                                </div> */}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="px-1">
                <h2 className="text-2xl font-semibold my-5 text-black ">Featured Products</h2>
                <div className="grid grid-cols-2 gap-2">
                    {productData?.data?.map((product: any) => (
                        // <Link href='/single-view'>
                        <ProductCard key={product.id} product={product} />
                        // </Link>
                    ))}

                </div>
            </div>
            <div className='mt-20'>
                <BottomNavigation />
            </div>
        </div>
    )
}