"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Logo from '../../assets/company_logo.png'
import Image from 'next/image';
const Home: React.FC = () => {
  const router = useRouter()
  const handleNavigate = () => {
    router.push('/onboard')
  }

  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
    {isClient && (
      <div className='block lg:hidden'>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-[#383698] text-white">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 rounded-full flex items-center justify-center">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              fill="currentColor"
              className="w-16 h-16 text-blue-600"
            >
              <path d="M50 10L90 90H10Z" />
            </svg> */}
            <Image src={Logo} alt="logo" width={100} height={100} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">Demand Connect</h1>

        {/* Subtitle */}
        <p className="text-center text-sm mb-8 px-4">
          Streamline your business with seamless ordering, real-time communication, and effortless transitions.
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          <button onClick={handleNavigate} className="px-6 w-80 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition duration-200">
            Let’s Get Started!
          </button>
          <br></br>
          {/* <button className="px-6 w-80 py-3 bg-white text-blue-600 rounded-full hover:bg-gray-200 transition duration-200">
            Create an account
          </button> */}
        </div>

      </div>
    </div>
    )}
    </>
  );
};

export default Home;
