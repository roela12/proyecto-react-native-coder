import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rtdbBaseUrl = process.env.EXPO_PUBLIC_BASE_URL_RTDB;

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: rtdbBaseUrl }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "categories.json",
    }),
    getProducts: builder.query({
      query: () => "products.json",
    }),
    getProduct: builder.query({
      query: (id) => `products.json?orderBy="id"&equalTo=${id}`,
      transformResponse: (response) => {
        return Object.values(response)[0];
      },
    }),
    getProductsByCategory: builder.query({
      query: (category) =>
        `products.json?orderBy="category"&equalTo="${category}"`,
      transformResponse: (response) => {
        return Object.values(response);
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductsByCategoryQuery,
} = shopApi;
