import type { requestWorkout, WorkoutResponse, workoutUpdateRequest } from "../Types/workout.types";
import { apiSlice } from "./apiSlice";


export const workoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkoutInDate: builder.query<WorkoutResponse[], string>({
      query: (date) => `/workouts?date=${date}`,
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: 'Workout' as const, id })),
            { type: 'Workout' as const, id: 'LIST' },
          ];
        }
        return [{ type: 'Workout' as const, id: 'LIST' }];
      },
    }),
    
    getWorkout: builder.query<WorkoutResponse, string>({
      query: (workoutId) => `/workouts/${workoutId}`,
      providesTags: (result, _, id) => 
        result ? [{ type: 'Workout' as const, id }] : [],
    }),
    
    updateWorkout: builder.mutation<null, workoutUpdateRequest>({
      query: ({workout, workout_id}) => ({
        url: `/workouts/${workout_id}`,
        method: "PUT",
        body: workout,
      }),

      invalidatesTags: (_, __, arg) => [
        { type: 'Workout', id: arg.workout_id }
      ],
    }),
    
    createWorkout: builder.mutation<WorkoutResponse, requestWorkout>({
      query: ({ date, templateId, name }) => ({
        url: '/workouts',
        method: "POST",
        body: { date: date, template_id: templateId, name: name },
      }),
      invalidatesTags: [{ type: 'Workout', id: 'LIST' }],
    }),
    
    deleteWorkout: builder.mutation<null, string>({
      query: (workoutId) => ({
        url: `/workouts/${workoutId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, workoutId) => [
        { type: 'Workout', id: workoutId },
        { type: 'Workout', id: 'LIST' }
      ],
    }),
  }),
});

export const {
  useGetWorkoutQuery,
  useGetWorkoutInDateQuery,
  useCreateWorkoutMutation,
  useDeleteWorkoutMutation,
  useUpdateWorkoutMutation
} = workoutApi;