// import Image from "next/image";

// interface ProductCardProps {
//   product: {
//     name: string;
//     image: any;
//     moq: string;
//     prices: {
//       average: string;
//       good: string;
//       high: string;
//     };
//   };
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   return (
//     <div className="border rounded-lg shadow-md p-2">
//       <div className="relative">
//         <Image
//           src={product.image}
//           alt={product.name}
//           width={200}
//           height={150}
//           className="w-full h-32 object-cover rounded-lg"
//         />
//         <span className="absolute w-full bottom-0 left-0 text-white text-xs px-2 py-1 rounded bg-gradient-to-r from-black to-transparent">
//           MOQ: {product.moq}
//         </span>
//       </div>

//       <h3 className="font-semibold mt-2">{product.name}</h3>

//       <p className="text-gray-600 text-sm ">
//         Average: {product.prices.average}
//       </p>
//       <p className="text-gray-600 text-sm">
//         Good: {product.prices.good}
//       </p>
//       <p className="text-gray-600 text-sm">
//         High: {product.prices.high}
//       </p>

//       {/* Quantity Adjustment */}
//       <button className="bg-blue-500 w-full items-center p-[6px] text-white rounded-xl mt-4">
//         Add to Cart
//       </button>
//     </div>
//   );
// };

// export default ProductCard;


import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: {
    name: string;
    image: any;
    moq: string;
    prices: {
      average: string;
      good: string;
      high: string;
    };
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedPrice, setSelectedPrice] = useState<string>("");

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPrice(event.target.value);
  };

  return (
    <div className="border rounded-lg shadow-md p-2">
      <Link href='/single-view'>

        <div className="relative">

          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={150}
            className="w-full h-32 object-cover rounded-lg"
          />
          <span className="absolute w-full bottom-0 left-0 text-white text-xs px-2 py-1 rounded bg-gradient-to-r from-black to-transparent">
            MOQ: {product.moq}
          </span>
        </div>
      </Link>
      <h3 className="font-semibold mt-2">{product.name}</h3>

      {/* Price Radio Buttons */}
      <div className="mt-2">
        <label className="flex items-center text-xs ">
          <input
            type="radio"
            name="price"
            value="average"
            checked={selectedPrice === "average"}
            onChange={handlePriceChange}
            className="mr-2"
          />
          Average: <span className="px-1 font-semibold">{product.prices.average}</span>
        </label>
      </div>
      <div className="mt-2">
        <label className="flex items-center text-xs">
          <input
            type="radio"
            name="price"
            value="good"
            checked={selectedPrice === "good"}
            onChange={handlePriceChange}
            className="mr-2"
          />
          Good: <span className="px-1 font-semibold">{product.prices.good}</span>
        </label>
      </div>
      <div className="mt-2">
        <label className="flex items-center text-xs">
          <input
            type="radio"
            name="price"
            value="high"
            checked={selectedPrice === "high"}
            onChange={handlePriceChange}
            className="mr-2"
          />
          High: <span className="px-1 font-semibold">{product.prices.high}</span>
        </label>
      </div>

      {/* Quantity Adjustment */}

      <button className="bg-blue-500 w-full items-center p-[6px] text-white rounded-xl mt-4">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
