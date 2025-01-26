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
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),  // Load cart data from localStorage on app start
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
        // If the item exists, update the quantity
        existingItem.quantity = action.payload.quantity;
      } else {
        // Add new item to the cart
        state.cart.push(action.payload);
      }

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string; selectedPrice: string }>) => {
      state.cart = state.cart.filter(
        (item) =>
          item.productId !== action.payload.productId || item.selectedPrice !== action.payload.selectedPrice
      );

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      
      // Clear cart from localStorage
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
