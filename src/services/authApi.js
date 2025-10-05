import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authBaseUrl = process.env.EXPO_PUBLIC_BASE_URL_AUTH;
const authKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: authBaseUrl }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (auth) => ({
        url: `accounts:signUp?key=${authKey}`,
        method: "POST",
        body: auth,
      }),
    }),
    login: builder.mutation({
      query: (auth) => ({
        url: `accounts:signInWithPassword?key=${authKey}`,
        method: "POST",
        body: auth,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
