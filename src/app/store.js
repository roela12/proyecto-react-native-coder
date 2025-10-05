import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice";
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";
import { shopApi } from "../services/shopApi";
import { authApi } from "../services/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const azamonStore = configureStore({
  reducer: {
    shopReducer,
    cartReducer,
    userReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(shopApi.middleware)
      .concat(authApi.middleware);
  },
});

setupListeners(azamonStore.dispatch);

export default azamonStore;
