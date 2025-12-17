import type { templatePost, WorkoutResponse } from "../Types/workout.types";
import { apiSlice } from "./apiSlice";

const url = "/templates";

export const TemplateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTemplate: builder.query<WorkoutResponse[], void>({
      query: () => ({
        url: url,
        method: "GET",
      }),
      providesTags: ['Template'], 
    }),
    
    deleteTemplate: builder.mutation<null, string>({ 
      query: (templateId) => ({ 
        url: `${url}/${templateId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Template'],
    }),
    
    postTemplate: builder.mutation<WorkoutResponse, templatePost>({
      query: (credentials) => ({
        url: url,
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