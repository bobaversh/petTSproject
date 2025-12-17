import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { showPage } from "../../Types/workout.types";

const initialState: showPage = {
    page: ''
};

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<string>) => {
            state.page = action.payload; 
        },
        clearPage: (state) => {
            state.page = '';
        }
    }
});

export const { setPage, clearPage } = pageSlice.actions;
export default pageSlice.reducer;