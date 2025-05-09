

'use client'

import BottomNavigation from '../global/bottomNavigation'
import { ManageCard } from './manageCard'
import { ArrowLeft, Menu, Pencil, Plus, Search } from 'lucide-react'
import Pista from '@/assets/pista.jpg';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MainDrawer from '../Drawer/mainDrawer';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

import vegetablesImage from "@/assets/veg.svg";
import fruitsImage from "@/assets/fruits.svg";
import beveragesImage from "@/assets/beverage.svg";
import groceryImage from "@/assets/grocery.svg";
import edibleOilImage from "@/assets/edibleoil.svg";
import householdImage from "@/assets/household.svg";
import babyCareImage from "@/assets/babycare.svg";


export default function ManageMainPage() {
  const router = useRouter()

  const [products, setProducts] = useState<any>([]);
  const [customId, setCustomId] = useState<string | null>(null);
  const [adminId, setAdminId] = useState(null)  // We'll store customId in state
  const [sellerData, setSellerData] = useState<any>([]);

  const [isSearchToggled, setIsSearchToggled] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [imageSlider, setImageSlider] = useState<any>([]);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  // Safe access to localStorage, ensuring this runs client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserDetails = localStorage.getItem('userDetails');
      if (storedUserDetails) {
        try {
          const userDetails = JSON.parse(storedUserDetails);
          setCustomId(userDetails?.data?.customId || null);
        } catch (error) {
          console.error("Error parsing user details:", error);
          // Optionally display a toast or alert for invalid data
        }
      } else {
        console.error("No user details found in localStorage.");
        // Optionally show a toast or redirect user to login page
      }
    }
  }, []);



  // Fetch product list once customId is available
  useEffect(() => {
    if (customId) {
      const fetchProductList = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get-product-list?sellerId=${customId}`);

          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          setProducts(data);
        } catch (err: any) {
          console.error("Error fetching product list:", err.message);
        }
      };

      fetchProductList();
    }
  }, [customId]);  // Re-run if customId changes

  const handleAdd = () => {
    router.push('/add-product')
  }

  console.log("products", products);



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

  useEffect(() => {
    if (customId) {
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
                customId: customId,
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
        } catch (error: any) {
          console.error('Error fetching seller details:', error.message);
        }
      };

      fetchSellerDetails();
    }
  }, [customId]);


  useEffect(() => {
    // Fetch banner images if sellerId is available
    if (customId) {
      const fetchBannerImages = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-banner-image?sellerId=${customId}`,
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
        } catch (error: any) {
          console.error('Error fetching banner images:', error.message);
        }
      };

      fetchBannerImages();
    }
  }, [customId]);


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


  const handleClick = () => {
    router.push('/manage-edit')
  }


  return (
    <>
      {/* <header className="sticky top-0 z-10 flex items-center justify-between h-20 px-4 bg-[#FF9A2D] border-b">
        <button
          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium">Product Manage Details</h1>

        <div className="relative flex items-center justify-center w-8 h-8 text-white rounded-full bg-emerald-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>
          <span className="sr-only">Notifications</span>
        </div>
      </header> */}

      <MainDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      {isDrawerOpen && (<div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />)}
      <div className='bg-[#FF9A2D]  py-4 flex flex-col justify-end'>
        <div className='z-10 flex flex-row items-center justify-between w-full px-2 '>
          <button onClick={toggleDrawer} className="p-2 " type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example">
            <Menu className="w-6 h-6" />
          </button>
          <div className='flex flex-col items-start justify-center flex-grow px-2'>
            <p className="m-0 text-base leading-none">{sellerData?.data?.businessOwner}</p>
            <p className="m-0 text-xs leading-none">{sellerData?.data?.businessName}</p>
          </div>
          <button className="p-2">
            <Search onClick={() => setIsSearchToggled((prev) => !prev)} className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className=" bg-[#FFFFFF] min-h-screen p-2">

        {isSearchToggled && (<div className="flex items-center gap-3 mx-2 mt-2 bg-transparent">
          <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#6D2323]">
            <Search className="w-4 h-4 text-[#6D2323]" />
            <input
              type="text"
              placeholder="Search keywords..."
              className="w-full bg-transparent outline-none text-sm text-[#6D2323]"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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
        <div className="flex flex-col items-center justify-between gap-4 px-2 my-8">
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
        </div>


        <div className="flex items-center h-16 p-4 overflow-y-hidden border-t-2 border-b-2 border-gray-200 justify-evenly">
          <button onClick={handleClick} className='flex flex-row items-center justify-center gap-2 text-white bg-[#3A6B34] rounded-lg px-4 py-2 w-2/5 min-w-40'>
            Bulk Edit
            <Pencil className="w-4 h-4 text-white" />
          </button>
          <button onClick={handleAdd} className='flex flex-row items-center justify-center gap-2 text-white bg-[#FF9A2D] rounded-lg px-4 py-2 w-2/5 min-w-40'>
            Add Product
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* <main className="container p-4 mx-auto">
          {products?.data?.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {products?.data?.map((product: any) => (
                <ManageCard
                  key={product.id}
                  product={product}
                  onEdit={(product) => {
                    console.log("Edit product:", product)
                  }}
                />
              ))}
            </div>
          )}
          <button className="fixed rounded-full shadow-lg bottom-4 right-4">
            <Plus className="w-4 h-4" />
          </button>
        </main> */}

        <div className="px-1">
          <div className="grid grid-cols-2 gap-2 pb-5 my-5">
            {products?.data?.map((product: any) => (
              <ManageCard
                key={product.id}
                product={product}
                onEdit={(product) => {
                  router.push(`/add-product?id=${product?.productId}&sellerId=${customId}`)
                }}
              />
            ))}

          </div>
        </div>

        <div className='mt-20'>
          <BottomNavigation />
        </div>
      </div>
    </>
  )
}
