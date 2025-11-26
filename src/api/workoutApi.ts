import type { WorkoutResponse } from '../Types/workout.types';
import { apiSlice } from './apiSlice';

export const workoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkoutInDate: builder.query<WorkoutResponse[], string>({
      query: (date) => `/workouts?date=${date}`
    })
  }),
})

export const { useGetWorkoutInDateQuery } = workoutApi;