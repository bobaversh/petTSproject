import type { templatePost, WorkoutResponse } from "../Types/workout.types";
import { apiSlice } from "./apiSlice";


export const TemplateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTemplate: builder.query<WorkoutResponse[], void>({
      query: () => ({
        url: "/templates",
        method: "GET",
      }),
      providesTags: ['Template'], 
    }),
    
    deleteTemplate: builder.mutation<null, string>({ 
      query: (templateId) => ({ 
        url: `/templates/${templateId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Template'],
    }),
    
    postTemplate: builder.mutation<WorkoutResponse, templatePost>({
      query: (credentials) => ({
        url: "/templates",
        method: "POST",
        body: credentials
      }),
      invalidatesTags: ['Template'], 
    }),
  }),
});

export const { 
  useGetTemplateQuery, 
  useDeleteTemplateMutation, 
  usePostTemplateMutation 
} = TemplateApi;