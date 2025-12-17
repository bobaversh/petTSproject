import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { WorkoutId } from "../../Types/workout.types";

const initialState: WorkoutId = {
    workoutId: "",
};

export const workoutIdSlice = createSlice({
  name: "workoutId",
  initialState,
  reducers: {
    setWorkoutId: (state, action: PayloadAction<string>) => {
      state.workoutId = action.payload;
    },
    clearWorkoutId: (state) => {
      state.workoutId = "";
    },
  },
  selectors: {
    dateSelector: (state) => {
      return state.workoutId;
    },
  },
});

export const { setWorkoutId, clearWorkoutId } = workoutIdSlice.actions;
export const { dateSelector } = workoutIdSlice.selectors;
export default workoutIdSlice.reducer;
