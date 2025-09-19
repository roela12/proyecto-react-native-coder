import { createSlice } from "@reduxjs/toolkit";
import categories from "../../data/categories.json";
import products from "../../data/products.json";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    categories,
    products,
    selectedCategory: "",
    filteredProductsByCategory: [],
    selectedProduct: {},
  },
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    filterProductsByCategory: (state) => {
      state.filteredProductsByCategory = state.products.filter(
        (product) =>
          product.category.toLowerCase() ===
          state.selectedCategory.toLowerCase()
      );
    },
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { selectCategory, filterProductsByCategory, selectProduct } =
  shopSlice.actions;
export default shopSlice.reducer;
