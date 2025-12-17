import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DateState } from "../../Types/calendar.types";

const initialState: DateState = {
  date: "",
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    clearDate: (state) => {
      state.date = "";
    },
  },
  selectors: {
    dateSelector: (state) => {
      return state.date;
    },
  },
});

export const { setDate, clearDate } = dateSlice.actions;
export const { dateSelector } = dateSlice.selectors;
export default dateSlice.reducer;
