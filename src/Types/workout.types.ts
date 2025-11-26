import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { useStateFn } from "./calendar.types";
import type { SerializedError } from "@reduxjs/toolkit";

interface Exercise {
    id: string;
    name: string;
    number: string;
    sets: any[]; 
  }
  
export  interface WorkoutResponse {
    id: string;
    user_id: string;
    template_id: string;
    date: string;
    exercises: Exercise[];
    created_at: string;
  }

export interface workoutInDateProps {
    date: string
    setShowPage: useStateFn<string>
    data: WorkoutResponse[] | undefined
    isLoading: boolean
    error: FetchBaseQueryError | SerializedError | undefined;
    
  }