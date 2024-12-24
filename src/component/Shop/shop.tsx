"use client"
import { Search, Menu } from 'lucide-react'
import { Leaf, Apple, Coffee, ShoppingBag, Droplet, SprayCanIcon as Spray } from 'lucide-react'
import Logo from '@/assets/logo.png'
import Image from 'next/image'
import ProductCard from '../global/productCard';
import Pista from '@/assets/pista.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link'
import BottomNavigation from '../global/bottomNavigation'

export default function ShopMain() {
    const categories = [
        { id: 1, Icon: Leaf, bgColor: 'bg-green-100', textColor: 'text-green-600' },
        { id: 2, Icon: Apple, bgColor: 'bg-red-100', textColor: 'text-red-600' },
        { id: 3, Icon: Coffee, bgColor: 'bg-yellow-100', textColor: 'text-yellow-600' },
        { id: 4, Icon: ShoppingBag, bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
        { id: 5, Icon: Droplet, bgColor: 'bg-purple-100', textColor: 'text-purple-600' },
        { id: 6, Icon: Spray, bgColor: 'bg-pink-100', textColor: 'text-pink-600' },
        { id: 7, Icon: Droplet, bgColor: 'bg-purple-100', textColor: 'text-purple-600' },
        { id: 8, Icon: Spray, bgColor: 'bg-pink-100', textColor: 'text-pink-600' },
        { id: 9, Icon: ShoppingBag, bgColor: 'bg-blue-100', textColor: 'text-blue-600' },

    ];

    const products = [
        {
            id: 1,
            name: "Pistachios",
            image: Pista,
            moq: "100 xyz",
            prices: {
                average: "₹1009.26",
                good: "₹1299.26",
                high: "₹1599.26",
            },
        },
        {
            id: 2,
            name: "Almonds",
            image: Pista,
            moq: "200 xyz",
            prices: {
                average: "₹899.50",
                good: "₹1099.00",
                high: "₹1399.75",
            },
        },
        {
            id: 3,
            name: "Almonds",
            image: Pista,
            moq: "200 xyz",
            prices: {
                average: "₹899.50",
                good: "₹1099.00",
                high: "₹1399.75",
            },
        },
        {
            id: 4,
            name: "Almonds",
            image: Pista,
            moq: "200 xyz",
            prices: {
                average: "₹899.50",
                good: "₹1099.00",
                high: "₹1399.75",
            },
        },
        {
            id: 5,
            name: "Almonds",
            image: Pista,
            moq: "200 xyz",
            prices: {
                average: "₹899.50",
                good: "₹1099.00",
                high: "₹1399.75",
            },
        },
        {
            id: 6,
            name: "Almonds",
            image: Pista,
            moq: "200 xyz",
            prices: {
                average: "₹899.50",
                good: "₹1099.00",
                high: "₹1399.75",
            },
        },
    ];

    const sliderData = [
        { id: 1, imageUrl: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80', title: 'Slide 1' },
        { id: 2, imageUrl: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80', title: 'Slide 2' },
        { id: 3, imageUrl: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80', title: 'Slide 3' },
    ];


    return (
        <div className="bg-white m-2 overflow-hidden">
            {/* Search Header */}
            <div className="flex items-center gap-3 mt-2 bg-white">
                <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search keywords.."
                        className="w-full bg-transparent outline-none text-sm"
                    />
                </div>
                {/* <button className="p-2">
                    <Menu className="w-5 h-5 text-gray-600" />
                </button> */}
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center gap-2 p-4">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                    <Image
                        src={Logo}
                        alt="Profile"
                        className="w-full h-full object-cover border-2 border-gray-200 rounded-full"
                    />
                </div>
                <h2 className="font-semibold text-xl">Gaurav Singh</h2>
                <p className="text-md text-gray-500">Gaurav Enterprises Pvt. Ltd</p>
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
                    {sliderData.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative w-full h-full">
                                <img
                                    src={slide.imageUrl}
                                    alt={slide.title}

                                    className="object-cover rounded-lg"
                                />
                                <div className="absolute bottom-8 left-4 bg-black bg-opacity-50 text-white p-2 text-sm rounded">
                                    {slide.title}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="px-1">
                <h2 className="text-2xl font-semibold mb-4 mt-2 ">Featured Products</h2>
                <div className="grid grid-cols-2 gap-2">
                    {products.map((product) => (
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

