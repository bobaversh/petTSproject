import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

interface Exercise {
    id: string;
    name: string;
    number: string;
    sets: Sets[]; 
  }

interface Sets {
  weight: number | string
  reps: number | string
  id: string
}
  
export  interface WorkoutResponse {
    id: string;
    name: string
    user_id: string;
    template_id: string;
    date: string;
    exercises: Exercise[];
    created_at: string;
  }

export interface workoutProps {
    date: string
    data: WorkoutResponse[] | undefined
    isLoading: boolean
    error: FetchBaseQueryError | SerializedError | undefined;
  }

  export interface backButtonProps {
    page: string
  }

  export interface templatePostProps {
    isPosting: boolean
    postTemplate: (value:templatePost) => void
  }

  export interface templatePost {
    name: string
    exercises: Exercise[]
  }

  export interface showPage {
    page: string
  }

  export interface requestWorkout {
    templateId: string
    date: string
    name: string
  }
  export interface WorkoutId {
    workoutId: string
}

export interface workoutProcessProps {
  data: WorkoutResponse | undefined
}

export interface workoutUpdateRequest {
  workout_id:string,
  workout: updatedWorkout
}

export interface updatedWorkout {
  exercises: Exercise[]
  name: string
  date: string
}