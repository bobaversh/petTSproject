import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { dateSlice } from "./slice/dateSlice";
import { pageSlice } from "./slice/showPage.ts";
import { workoutIdSlice } from "./slice/workoutIdSlice";
import { foodDateSlice } from "./slice/foodDateSlice.ts";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    date: dateSlice.reducer,
    page: pageSlice.reducer,
    workoutId: workoutIdSlice.reducer,
    foodDate: foodDateSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
