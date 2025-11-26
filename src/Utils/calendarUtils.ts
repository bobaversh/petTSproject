import type { dayItem, useStateFn } from "../Types/calendar.types";

export const weeksArray = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export function monthActual(month: number): string {
    return `${month + 1}`
}

export function getMonthName(date: Date): string {
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    const monthIndex = date.getMonth();
    return months[monthIndex];
}

export const renderWeekMonthRange = (days: dayItem[]): string | null => {
    if (days.length < 7) return null;
    
    const firstDay = days[0];
    const lastDay = days[6];
    
    const firstDate = new Date(parseInt(firstDay.year), parseInt(firstDay.month) - 1, parseInt(firstDay.date));
    const lastDate = new Date(parseInt(lastDay.year), parseInt(lastDay.month) - 1, parseInt(lastDay.date));
    
    const firstMonthName = getMonthName(firstDate);
    const lastMonthName = getMonthName(lastDate);
    
    if (firstDay.month === lastDay.month) {
        return firstMonthName;
    }
  
    return `${firstMonthName} - ${lastMonthName.toLowerCase()}`;
}

export function createArrayWeek(date: Date): dayItem[] {
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - startDate.getDay() + (startDate.getDay() === 0 ? -6 : 1));
    
    const arr: dayItem[] = [];

    for(let i = 0; i < 7; i++) {
        const newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + i);
        
        const month = String(newDate.getMonth() + 1).padStart(2, '0');

        arr.push({
            date: String(newDate.getDate()).padStart(2, '0'), 
            month: month, 
            year: String(newDate.getFullYear()), 
            index: i
        });
    }

    return arr;
}

export function createArrayMonth(date: Date): dayItem[] {
    const startDate = new Date(date);
    startDate.setDate(1); 

    const month: dayItem[] = [];
    const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();

    for(let i = 0; i < daysInMonth; i++) {
        const newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + i);
        
        const monthStr = String(newDate.getMonth() + 1).padStart(2, '0');

        month.push({
            date: String(newDate.getDate()).padStart(2, '0'),
            month: monthStr,
            year: String(newDate.getFullYear()),
            index: i
        });
    }

    return month;
}

export function goToNextWeek(date: Date, fn: useStateFn<Date>): void {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 7);
    fn(newDate);
}

export function goToPrevWeek(date: Date, fn: useStateFn<Date>): void {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 7);
    fn(newDate);
}