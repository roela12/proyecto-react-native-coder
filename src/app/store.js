import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice";
import cartReducer from "../features/cart/cartSlice";

export const azamonStore = configureStore({
  reducer: {
    shopReducer,
    cartReducer,
  },
});
