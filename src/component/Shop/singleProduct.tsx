"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowLeft, ShoppingCart, CheckCircle } from "lucide-react"
import Pista from '@/assets/pista.jpg';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";

export default function SingleProductCard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.cart.cart);

  // Using useState hooks
  const [productData, setProductData] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  // Fetch local storage safely (only client-side)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem('userDetails');
      if (localData) {
        const parsedData = JSON.parse(localData);
        const sellerIdFromLocalStorage = parsedData?.data?.sellerId;
        if (sellerIdFromLocalStorage) {
          setSellerId(sellerIdFromLocalStorage);
        }
      }

      // Safely get the search parameter from the URL
      const searchParams = new URLSearchParams(window.location.search);
      const productId = searchParams.get('id');
      setId(productId); 
    }
  }, []); 

  // Fetch product list based on sellerId
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
          console.error('Error fetching product details:', error.message);
          setError(error.message);
        }
      };
      fetchProductList();
    }
  }, [sellerId]);

  // Find the specific product based on the ID
  const product = productData?.data?.find((data: any) => data?.productId === id);

  // Handle price change
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPrice(event.target.value);
  };

  // Handle adding item to the cart
  const handleAddToCart = () => {
    if (selectedPrice && product) {
      const selectedProduct = product;
      const price = selectedProduct?.[selectedPrice + 'Price']; // Dynamically select price

      if (price) {
        const cartItem = {
          productId: selectedProduct?.productId,
          name: selectedProduct?.productName,
          image: selectedProduct?.productImage,
          price: price,
          selectedPrice: selectedPrice,
          quantity: quantity,
          tax:selectedProduct?.tax
        };

        // Update cart state
        setCart([cartItem]);
        // Dispatch to Redux
        dispatch(addToCart(cartItem));
        // Set flag to indicate the product is added
        setIsAddedToCart(true);
        toast.success('Added to cart successfully!');
      } else {
        toast.error('Please select a price option.');
      }
    }
  };

  // Handle increment and decrement for quantity
  const handleIncrement = () => {
    const selectedProduct = product;
    const price = selectedProduct?.[selectedPrice + 'Price'];
    const cartItem = {
      productId: selectedProduct?.productId,
      name: selectedProduct?.productName,
      image: selectedProduct?.productImage,
      price: price,
      selectedPrice: selectedPrice,
      quantity: quantity + 1,
      tax:selectedProduct?.tax

    };

    setQuantity(quantity + 1);
    dispatch(addToCart(cartItem));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const selectedProduct = product;
      const price = selectedProduct?.[selectedPrice + 'Price'];
      const cartItem = {
        productId: selectedProduct?.productId,
        name: selectedProduct?.productName,
        image: selectedProduct?.productImage,
        price: price,
        selectedPrice: selectedPrice,
        quantity: quantity - 1,
        tax:selectedProduct?.tax

      };

      setQuantity(quantity - 1);
      dispatch(removeFromCart(cartItem));
    } else {
      setIsAddedToCart(false);
    }
  };

  // Handle navigate to cart
  const navigateToCart = () => {
    router.push('/cart');
  };


  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear().toString().slice(2)}`;

  console.log("product", product);

  const products = Array.isArray(product) ? product : [product];


  return (
    <>
      <Toaster />
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4">
        <button
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 cursor-pointer text-black" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium text-black">Product Details</h1>

        {/* <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>
          <span className="sr-only">Notifications</span>
        </div> */}

        <div className="relative inline-block" onClick={() => router.push('/cart')
        }>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6D2323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-basket"><path d="m15 11-1 9" /><path d="m19 11-4-7" /><path d="M2 11h20" /><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" /><path d="M4.5 15.5h15" /><path d="m5 11 4-7" /><path d="m9 11 1 9" /></svg>
          <p className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {carts?.length}
          </p>
        </div>
      </header>

      <div className="flex flex-wrap gap-4">
        {/* Only display one product since it's a single object */}

        <div key={product?.productId} className="w-full bg-[#FFEFD3] overflow-hidden shadow-lg">
          <div className="relative m-2">
            <span className="absolute top-2 right-2 text-[10px] bg-[#6D2323] text-white px-4 py-1 rounded animate-pulse">
              Updated On: {formattedDate}
            </span>
            <Image
              src={product?.productImage}
              alt={product?.productName}
              width={320}
              height={350}
              className="w-full h-[350px] object-cover"
            />
            {product?.moq?.length > 0 && (
              <span className="absolute w-full bottom-0 left-0 text-white text-xs px-2 py-1 rounded bg-gradient-to-r from-black to-transparent">
                MOQ: {product.moq}
              </span>
            )}
          </div>

          <div className="p-4 space-y-3 mt-2">
            <h3 className="text-xl font-bold text-black">{product?.productName}</h3>

            <div className="space-y-2">
              {product?.averagePrice && (
                <div className="mt-2">
                  <label className="flex items-center text-sm text-black">
                    <input
                      type="radio"
                      name="price"
                      value="average"
                      checked={selectedPrice === "average"}
                      onChange={handlePriceChange}
                      className="mr-2"
                    />
                    Average: <span className="px-1 font-semibold text-black">{product?.averagePrice}</span> + Tax- {product?.tax}
                  </label>
                </div>
              )}
              {product?.goodPrice && (
                <div className="mt-2">
                  <label className="flex items-center text-sm text-black">
                    <input
                      type="radio"
                      name="price"
                      value="good"
                      checked={selectedPrice === "good"}
                      onChange={handlePriceChange}
                      className="mr-2"
                    />
                    Good: <span className="px-1 font-semibold text-black">{product?.goodPrice}</span> + Tax- {product?.tax}
                  </label>
                </div>
              )}
              {product?.highPrice && (
                <div className="mt-2">
                  <label className="flex items-center text-sm text-black">
                    <input
                      type="radio"
                      name="price"
                      value="high"
                      checked={selectedPrice === "high"}
                      onChange={handlePriceChange}
                      className="mr-2"
                    />
                    High: <span className="px-1 font-semibold text-black">{product?.highPrice} </span> + Tax- {product?.tax}
                  </label>
                </div>
              )}
            </div>

            <p className="text-sm font-semibold text-black">
              Description: <span className="font-normal text-black">{product?.description}</span>
            </p>

            <div className="relative">
              {/* Cart Icon - Visible when item is added to cart */}
              {isAddedToCart && (
                <div
                  className="absolute top-2 mt-[-3rem] right-2 bg-[#6D2323] text-white p-2 rounded-full cursor-pointer flex items-center"
                  onClick={navigateToCart}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                  <span className="ml-1 text-[10px]">Cart</span>
                </div>
              )}

              {/* Quantity Controls or Add to Cart Button */}
              {isAddedToCart ? (
                <div className="flex justify-between items-center bg-[#6D2323] w-full p-[6px] px-3 text-white rounded-full mt-4">
                  <button onClick={handleDecrement} className="rounded-md text-xl">
                    -
                  </button>
                  <span className="text-sm">{quantity}</span>
                  <button onClick={handleIncrement} className="rounded-md text-xl">
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="bg-[#6D2323] w-full items-center p-[6px] text-white rounded-full mt-4"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
