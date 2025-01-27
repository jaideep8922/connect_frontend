"use client";
import { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";

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
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedPrice, setSelectedPrice] = useState<string>(""); 
  const [quantity, setQuantity] = useState<number>(1); 
  const [cart, setCart] = useState<any[]>([]); 
  const [isAddedToCart, setIsAddedToCart] = useState(false); 

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


  // Current date formatting
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear().toString().slice(2)}`;

  console.log("carts", carts)
  return (
    <div className="border rounded-lg shadow-md p-2">
      <Toaster />
      <Link href={`/single-view?id=${product.productId}`}>
        <div className="relative">
          {/* Date in the top-right corner */}
          <span className="absolute top-2 right-2 text-[10px] bg-blue-600 text-white px-2 rounded-full">
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
          {/* <span className="absolute w-full bottom-0 left-0 text-white text-xs px-2 py-1 rounded bg-gradient-to-r from-black to-transparent">
            MOQ: {product.moq}
          </span> */}
        </div>
      </Link>

      <h3 className="font-semibold mt-2">{product.productName}</h3>

      {/* Price Radio Buttons */}
      {product?.averagePrice && (
        <div className="mt-2">
          <label className="flex items-center text-xs">
            <input
              type="radio"
              name={`price-${product.productId}`} 
              value="averagePrice"
              checked={selectedPrice === "averagePrice"}
              onChange={handlePriceChange}
              className="mr-2"
            />
            Average: <span className="px-1 font-semibold">{product?.averagePrice}</span>
          </label>
        </div>
      )}

      {product?.goodPrice && (
        <div className="mt-2">
          <label className="flex items-center text-xs">
            <input
              type="radio"
              name={`price-${product.productId}`} 
              value="goodPrice"
              checked={selectedPrice === "goodPrice"}
              onChange={handlePriceChange}
              className="mr-2"
            />
            Good: <span className="px-1 font-semibold">{product?.goodPrice}</span>
          </label>
        </div>
      )}

      {product?.highPrice && (
        <div className="mt-2">
          <label className="flex items-center text-xs">
            <input
              type="radio"
              name={`price-${product.productId}`} 
              value="highPrice"
              checked={selectedPrice === "highPrice"}
              onChange={handlePriceChange}
              className="mr-2"
            />
            High: <span className="px-1 font-semibold">{product?.highPrice}</span>
          </label>
        </div>
      )}

      {/* Quantity Adjustments */}
      {isAddedToCart ? (
        <div className="flex justify-between items-center bg-blue-500 w-full p-[6px] px-3 text-white rounded-xl mt-4">
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
          className="bg-blue-500 w-full items-center p-[6px] text-white rounded-xl mt-4"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;