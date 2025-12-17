import type { Dispatch, SetStateAction } from 'react';

export interface dayItem {
    date: string
    month: string
    year: string
    index: number
}

export type useStateFn<T> = Dispatch<SetStateAction<T>>

export interface CalendarDay {
  index: number;
  date: Date;
}

export interface CalendarItemProps {
    day: dayItem;
}

export interface CalendarProps {
    setSelectDate: useStateFn<string>;
    setShowPage: useStateFn<string>
}

export interface DateState {
    date: string;
}
export interface FoodDateState {
    foodDate: string;
}
