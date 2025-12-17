import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const selectDateState = (state: RootState) => state.date;
const selectFoodDateState = (state: RootState) => state.foodDate;

export const makeSelectIsDateActive = (dateString: string) => 
  createSelector(
    [selectDateState],
    (dateState) => dateState.date === dateString
  );

export const selectIsDateActive = (state: RootState, dateString: string) => 
  state.date.date === dateString;

export const selectCurrentDate = createSelector(
    [selectDateState],
    (dateState) => dateState.date
  );

export const selectCurrentFoodDate = createSelector(
    [selectFoodDateState],
    (foodDateState) => foodDateState.foodDate
  );

export const makeSelectIsFoodDateActive = (dateString: string) => 
  createSelector(
    [selectFoodDateState],
    (foodDateState) => foodDateState.foodDate === dateString
  );