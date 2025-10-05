import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
  },
  reducers: {
    addItems: (state, action) => {
      const { product, quantity } = action.payload;
      const productInCart = state.cartItems.find(
        (item) => item.id === product.id
      );
      if (!productInCart) {
        state.cartItems.push({ ...product, quantity });
      } else {
        productInCart.quantity += quantity;
      }
      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    removeItems: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
  },
});

export const { addItems, removeItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
