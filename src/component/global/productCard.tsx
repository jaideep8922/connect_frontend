"use client";
import { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

// Define the ProductCardProps interface
interface ProductCardProps {
  product: {
    productName: string;
    productId: string;
    productImage: string;
    moq: string;
    averagePrice: string;
    goodPrice: string;
    highPrice: string;
    tax: '', // Add a default tax value or calculate it as nee
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [cart, setCart] = useState<any[]>([]);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.cart.cart);

  // Handle price change
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPrice(event.target.value);
  };

  // Handle adding item to the cart
  const handleAddToCart = () => {
    if (selectedPrice) {
      const price = product[selectedPrice as keyof typeof product];

      // Create the cart item
      const cartItem = {
        productId: product.productId,
        name: product.productName,
        image: product.productImage,
        price: price,
        selectedPrice: selectedPrice,
        quantity: quantity,
        tax:product.tax
      };

      setCart([cartItem])
      toast.success("added successfull")
      setIsAddedToCart(true);
      dispatch(addToCart(cartItem));


    } else {
      toast.error("Please select a price option.");
    }
  };

  // Increment quantity
  const handleIncrement = () => {
    const cartItem = {
      productId: product.productId,
      name: product.productName,
      image: product.productImage,
      price: product[selectedPrice as keyof typeof product],
      selectedPrice: selectedPrice,
      quantity: quantity,
      tax:product.tax

    };


    setQuantity(quantity + 1);
    dispatch(addToCart(cartItem));

  };

  // Decrement quantity
  const handleDecrement = () => {
    if (quantity > 1) {
      const cartItem = {
        productId: product.productId,
        name: product.productName,
        image: product.productImage,
        price: product[selectedPrice as keyof typeof product],
        selectedPrice: selectedPrice,
        quantity: quantity,
      };

      setQuantity(quantity - 1);
      console.log("Quantity decremented:", quantity - 1);
      dispatch(removeFromCart(cartItem));


    } else {
      // If quantity reaches 0, revert to "Add to Cart"
      setIsAddedToCart(false);
      console.log("Product removed from cart");
    }
  };

  const navigateToCart = () => {
    router.push('/cart')
  }

  // Current date formatting
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear().toString().slice(2)}`;

  console.log("carts", carts)
  return (
    <div className="border bg-[#FEF9E1] rounded-lg shadow-md p-2">
      <Toaster />
      <Link href={`/single-view?id=${product.productId}`}>
        <div className="relative">
          {/* Date in the top-right corner */}
          <span className="absolute top-2 right-2 text-[10px] bg-[#6D2323] text-white px-2 rounded-full">
            Updated On: {formattedDate}
          </span>

          {/* Product Image */}
          <img
            src={product?.productImage}
            alt={product?.productImage}
            width={200}
            height={150}
            className="w-full h-32 object-cover rounded-lg"
          />

          {/* MOQ in the bottom-left corner */}
          {product?.moq?.length > 0 && (
            <span className="absolute w-full bottom-0 left-0 text-white text-xs px-2 py-1 rounded bg-gradient-to-r from-black to-transparent">
            MOQ: {product.moq}
          </span>
          )}
          
        </div>
      </Link>

      <h3 className="font-semibold mt-2 text-black">{product.productName}</h3>

      {/* Price Radio Buttons */}
      {product?.averagePrice && (
        <div className="mt-2">
          <label className="flex items-center text-xs text-black">
            <input
              type="radio"
              name={`price-${product.productId}`}
              value="averagePrice"
              checked={selectedPrice === "averagePrice"}
              onChange={handlePriceChange}
              className="mr-2"
            />
            Average: <span className="px-1 font-semibold text-black">{product?.averagePrice}</span>
          </label>
        </div>
      )}

      {product?.goodPrice && (
        <div className="mt-2">
          <label className="flex items-center text-xs text-black">
            <input
              type="radio"
              name={`price-${product.productId}`}
              value="goodPrice"
              checked={selectedPrice === "goodPrice"}
              onChange={handlePriceChange}
              className="mr-2"
            />
            Good: <span className="px-1 font-semibold text-black">{product?.goodPrice}</span>
          </label>
        </div>
      )}

      {product?.highPrice && (
        <div className="mt-2">
          <label className="flex items-center text-xs text-black">
            <input
              type="radio"
              name={`price-${product.productId}`}
              value="highPrice"
              checked={selectedPrice === "highPrice"}
              onChange={handlePriceChange}
              className="mr-2"
            />
            High: <span className="px-1 font-semibold text-black">{product?.highPrice}</span>
          </label>
        </div>
      )}

      <div className="relative">
        {isAddedToCart && (
          <div
            className="absolute top-[-3rem] right-[0.1rem] bg-[#6D2323] text-white p-2 rounded-full cursor-pointer flex items-center"
            onClick={navigateToCart}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
          </div>
        )}

        {/* Quantity Adjustments */}
        {isAddedToCart ? (
          <div className="flex justify-between items-center bg-[#6D2323] w-full p-[6px] px-3 text-white rounded-xl mt-4">
            <button
              onClick={handleDecrement}
              className="rounded-md"
            >
              -
            </button>
            <span className="text-sm">{quantity}</span>
            <button
              onClick={handleIncrement}
              className=" rounded-md"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="bg-[#6D2323] w-full items-center p-[6px] text-white rounded-xl mt-4"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;