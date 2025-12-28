import type { foodDayRequest, foodRequest } from "../Types/food.types";
import { apiSlice } from "./apiSlice";


export const FoodApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFood: builder.query<foodDayRequest, string>({
      query: (date) => `/food?date=${date}`,
      providesTags: ["Food"],
    }),
    postFood: builder.mutation<null, foodRequest>({
      query: ({ date, csv_url }) => ({
        url: `/food?date=${date}&csv_url=${encodeURIComponent(csv_url)}`,
        method: "POST",
      }),
      invalidatesTags: ["Food"],
    }),
  }),
});

export const { useGetFoodQuery, usePostFoodMutation } = FoodApi