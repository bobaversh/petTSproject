import { apiSlice } from "./apiSlice.ts";
import type { RegisterResponse, FormattedRegisterRequest } from '../Types/register.types.ts'
import type { LoginResponse, LoginRequest } from '../Types/login.types.ts'

const AUTH_BASE_URL: string = 'https://backend-tsy9.onrender.com';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      register: builder.mutation<RegisterResponse, FormattedRegisterRequest>({
        query: (credentials) => ({
          url: `${AUTH_BASE_URL}/auth/register`,
          method: 'POST',
          body: credentials,
        }),
      }),

      
      login: builder.mutation<LoginResponse, LoginRequest>({
        query: (credentials) => ({
          url: `${AUTH_BASE_URL}/auth/login`, 
          method: 'POST',
          body: credentials,
        }),
      }),
    }),
  });
  

export const { useRegisterMutation, useLoginMutation } = authApi;