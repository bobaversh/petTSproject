import { apiSlice } from "./apiSlice.ts";
import type { RegisterResponse, FormattedRegisterRequest } from '../Types/register.types.ts'
import type { LoginResponse, LoginRequest } from '../Types/login.types.ts'


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      register: builder.mutation<RegisterResponse, FormattedRegisterRequest>({
        query: (credentials) => ({
          url: '/auth/register',
          method: 'POST',
          body: credentials,
        }),
      }),

      
      login: builder.mutation<LoginResponse, LoginRequest>({
        query: (credentials) => ({
          url: '/auth/login', 
          method: 'POST',
          body: credentials,
        }),
      }),

      logout: builder.mutation<null, null>({
        query: ()=>({
          url:  '/auth/logout',
          method: 'POST'
        })
      })
    }),
  });
  

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi;