import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL: string = 'https://backend-tsy9.onrender.com';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({
  }),
})