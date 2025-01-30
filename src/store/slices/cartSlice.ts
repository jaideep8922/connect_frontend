"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  productId: string;
  name: string;
  image: string;
  price: string;
  selectedPrice: string;
  quantity: number;
};

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  // Initialize the cart from localStorage only on the client-side
  cart: typeof window !== "undefined" ? JSON.parse(localStorage.getItem('cart') || '[]') : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find(
        (item) => item.productId === action.payload.productId && item.selectedPrice === action.payload.selectedPrice
      );

      if (existingItem) {
        // If the item exists, update the quantity and price
        existingItem.quantity = action.payload.quantity;
        existingItem.price = action.payload.price; // Ensure price is updated if quantity changes
      } else {
        // Add new item to the cart
        state.cart.push(action.payload);
      }

      // Save the updated cart to localStorage (only on the client-side)
      if (typeof window !== "undefined") {
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string; selectedPrice: string }>) => {
      state.cart = state.cart.filter(
        (item) =>
          item.productId !== action.payload.productId || item.selectedPrice !== action.payload.selectedPrice
      );

      // Save the updated cart to localStorage (only on the client-side)
      if (typeof window !== "undefined") {
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    clearCart: (state) => {
      state.cart = [];

      // Clear the cart from localStorage (only on the client-side)
      if (typeof window !== "undefined") {
        localStorage.removeItem('cart');
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
