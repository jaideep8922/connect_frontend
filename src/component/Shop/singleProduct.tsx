"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowLeft, ShoppingCart, CheckCircle } from "lucide-react"
import Pista from '@/assets/pista.jpg';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/store/slices/cartSlice";

export default function SingleProductCard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const navigateToCart = () => {
    router.push('/cart')
  }

  const [productData, setProductData] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  const localData: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
  const sellerId = localData?.data?.sellerId;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/get-product-list?sellerId=${sellerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

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

    fetchNotes();
  }, []);

  const [quantity, setQuantity] = useState<number>(1);  // Initialize with a default quantity of 1
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  

  const product = productData?.data?.filter((data: any) => data?.productId === id)
  const dispatch = useDispatch();

  console.log("product", product)

  const [cart, setCart] = useState<any[]>([]); // Cart state
  const [isAddedToCart, setIsAddedToCart] = useState(false); // Tracks if the product is in the cart

  // Handle price change
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPrice(event.target.value);
  };

  console.log("seeeee", selectedPrice)

  // Handle adding item to the cart
const handleAddToCart = () => {
  if (selectedPrice) {
    const selectedProduct = product; 

    // const price = selectedPrice[selectedPrice as keyof typeof selectedProduct];
    // const price = selectedProduct?.[0]?.[selectedPrice]; 

    const price = selectedProduct?.[0]?.[selectedPrice + 'Price'];  // Dynamically construct the key, e.g. "averagePrice"

    console.log("price", price); 

    console.log("price",price)

    // Create the cart item
    const cartItem = {
      productId: selectedProduct?.[0].productId,
      name: selectedProduct?.[0].productName,
      image: selectedProduct?.[0]?.productImage, 
      price: price,
      selectedPrice: selectedPrice,
      quantity: quantity,
    };

    // Update cart state
    setCart([cartItem]);

    // Dispatch to Redux
    dispatch(addToCart(cartItem));

    // Set flag to indicate the product is added
    setIsAddedToCart(true);
    toast.success("Added successfully!");
  } else {
    toast.error("Please select a price option.");
  }
};

// Increment quantity
const handleIncrement = () => {
  const selectedProduct = product;
  // const price = selectedProduct[selectedPrice as keyof typeof selectedProduct];
  const price = selectedProduct?.[0]?.[selectedPrice + 'Price'];
  const cartItem = {
    productId: selectedProduct?.[0].productId,
    name: selectedProduct?.[0].productName,
    image: selectedProduct?.[0].productImage,
    price: price,
    selectedPrice: selectedPrice,
    quantity: quantity + 1,
  };

  setQuantity(quantity + 1);
  dispatch(addToCart(cartItem));
};

// Decrement quantity
const handleDecrement = () => {
  if (quantity > 1) {
    const selectedProduct = product;
    const price = selectedProduct?.[0]?.[selectedPrice + 'Price'];
    const cartItem = {
      productId: selectedProduct?.[0].productId,
      name: selectedProduct?.[0].productName,
      image: selectedProduct?.[0].productImage,
      price: price,
      selectedPrice: selectedPrice,
      quantity: quantity - 1,
    };

    setQuantity(quantity - 1);
    dispatch(removeFromCart(cartItem));
  } else {
    setIsAddedToCart(false);
  }
};


  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear().toString().slice(2)}`;

  // const handleAddToCart = async () => {
  //   const selectedProduct = singleProduct[0];
  //   const price = selectedPrice === "average" ? selectedProduct?.averagePrice : selectedPrice === "good" ? selectedProduct?.goodPrice : selectedProduct?.highPrice;

  //   if (price) {
  //     try {
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add-to-cart`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           orderId: "RAJ9414", 
  //           productId: selectedProduct?.productId,
  //           quantity: quantity,
  //           price: parseInt(price),
  //         }),
  //       });

  //       const result = await response.json();
  //       if (response.ok) {
  //         console.log("Product added to cart:", result);
  //         handleNavigate();
  //       } else {
  //         throw new Error(result.message || 'Failed to add to cart');
  //       }
  //     } catch (error: any) {
  //       console.error('Error adding product to cart:', error.message);
  //     }
  //   } else {
  //     alert("Please select a price option");
  //   }
  // };

  return (
    <>
      <Toaster />
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-[#FFEFD3] px-4">
        <button
          className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => window.history.back()} />
        </button>

        <h1 className="text-lg font-medium">Product Details</h1>

        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>
          <span className="sr-only">Notifications</span>
        </div>
      </header>

      <div className="flex flex-wrap gap-4">
        {product?.map((product: any, index: any) => (
          <div key={index} className="w-full bg-[#FFEFD3] overflow-hidden shadow-lg">
            <div className="relative">
              <span className="absolute top-2 right-2 text-[10px] bg-[#6D2323] text-white px-4 py-1 rounded animate-pulse">
                Updated On: {formattedDate}
              </span>
              <Image
                src={product.productImage}
                alt={product.productImage}
                width={320}
                height={350}
                className="w-full h-[350px] object-cover"
              />
            </div>

            <div className="p-4 space-y-3 mt-2">
              <h3 className="text-xl font-bold">{product.name}</h3>

              <div className="space-y-2">
                {product?.averagePrice > 0 && (
                  <div className="mt-2">
                    <label className="flex items-center text-sm ">
                      <input
                        type="radio"
                        name="price"
                        value="average"
                        checked={selectedPrice === "average"}
                        onChange={handlePriceChange}
                        className="mr-2"
                      />
                      Average: <span className="px-1 font-semibold">{product?.averagePrice}</span>
                    </label>
                  </div>
                )}
                {product?.goodPrice > 0 && (
                  <div className="mt-2">
                    <label className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="price"
                        value="good"
                        checked={selectedPrice === "good"}
                        onChange={handlePriceChange}
                        className="mr-2"
                      />
                      Good: <span className="px-1 font-semibold">{product?.goodPrice}</span>
                    </label>
                  </div>
                )}
                {product?.highPrice > 0 && (
                  <div className="mt-2">
                    <label className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="price"
                        value="high"
                        checked={selectedPrice === "high"}
                        onChange={handlePriceChange}
                        className="mr-2"
                      />
                      High: <span className="px-1 font-semibold">{product?.highPrice}</span>
                    </label>
                  </div>
                )}
              </div>

              <p className="text-sm font-semibold">
                Description: <span className="font-normal">{product?.description}</span>
              </p>

              <div className="relative">
                {/* Cart Icon - Visible when item is added to cart */}
                {isAddedToCart && (
                  <div
                    className="absolute top-2 right-2 bg-[#6D2323] text-white p-2 rounded-full cursor-pointer flex items-center"
                    onClick={navigateToCart}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                    <span className="ml-1 text-sm">Cart</span>
                  </div>
                )}

                {/* Product Info */}
                <h2 className="text-lg font-semibold">Product Name</h2>
                <p className="text-sm text-gray-500">Product description here.</p>

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
        ))}
      </div>
    </>
  );
}
