import type { foodDayRequest } from "../Types/food.types";
import { apiSlice } from "./apiSlice";

const url = "https://backend-tsy9.onrender.com/parse_food_csv";

export const FoodApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFood: builder.query<foodDayRequest, string>({
      query: (urlFood) => `${url}?url=${urlFood}`,
      providesTags: ["Food"],
    }),
  }),
});

export const { useGetFoodQuery } = FoodApi