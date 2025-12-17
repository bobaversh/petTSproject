import type { requestWorkout, WorkoutResponse } from "../Types/workout.types";
import { apiSlice } from "./apiSlice";

const url = "https://backend-tsy9.onrender.com/workouts";

export const workoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkoutInDate: builder.query<WorkoutResponse[], string>({
      query: (date) => `${url}?date=${date}`,
      providesTags: ["Workout"],
    }),
    createWorkout: builder.mutation<WorkoutResponse, requestWorkout>({
      query: ({ date, templateId, name }) => ({
        url: `${url}`,
        method: "POST",
        body: { date: date, template_id: templateId, name: name },
      }),
      invalidatesTags: ["Workout"],
    }),
    deleteWorkout: builder.mutation<null, string>({
      query: (workoutId) => ({
        url: `${url}/${workoutId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Workout"],
    }),
    getWorkout: builder.query<WorkoutResponse, string>({
      query: (workoutId) => ({
        url: `${url+'/'+workoutId}`,
        method: 'GET',
        providesTags: ["Workout"],
      })
    })
  }),
});

export const {
  useGetWorkoutQuery,
  useGetWorkoutInDateQuery,
  useCreateWorkoutMutation,
  useDeleteWorkoutMutation,
} = workoutApi;
