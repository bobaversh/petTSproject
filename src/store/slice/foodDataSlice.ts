import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FoodDateState } from "../../Types/calendar.types";

const initialState: FoodDateState = {
  foodDate: "",
};

export const foodDateSlice = createSlice({
  name: "foodDate",
  initialState,
  reducers: {
    setFoodDate: (state, action: PayloadAction<string>) => {
      state.foodDate = action.payload;
    },
    clearFoodDate: (state) => {
      state.foodDate = "";
    },
  },
  selectors: {
    dateSelector: (state) => {
      return state.foodDate;
    },
  },
});

export const { setFoodDate, clearFoodDate } = foodDateSlice.actions;
export const { dateSelector } = foodDateSlice.selectors;
export default foodDateSlice.reducer;