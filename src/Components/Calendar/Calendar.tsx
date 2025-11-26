import CalendarItem from "../CalendarItem/CalendarItem.tsx";
import { createArrayWeek, renderWeekMonthRange, goToNextWeek, goToPrevWeek } from "../../Utils/calendarUtils.js";
import { useState, useEffect } from 'react';
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import type { CalendarProps } from "../../Types/calendar.types";

export default function Calendar({ setSelectDate }: CalendarProps) {
    const [weekStart, setWeekStart] = useState<Date>(new Date());
    const [activeDay, setActiveDay] = useState<string>('');

    useEffect(() => {
        if (activeDay) {
            setSelectDate(activeDay);
        }
    }, [activeDay, setSelectDate]);

    return (
        <>   
            <div className="flex justify-center gap-4 items-center m-5">
                <MdArrowBackIosNew 
                    onClick={() => { goToPrevWeek(weekStart, setWeekStart) }} 
                    className="active:animate-ping text-white w-1/4 cursor-pointer" 
                />
                <h2 className="text-[16px] font-bold md:text-[23px] lg:text-[30px] text-center w-1/2 text-white">
                    {renderWeekMonthRange(createArrayWeek(weekStart))}
                </h2>
                <MdArrowForwardIos 
                    onClick={() => { goToNextWeek(weekStart, setWeekStart) }} 
                    className="active:animate-ping text-white w-1/4 cursor-pointer"
                />
            </div>
            <div className="grid grid-cols-7 gap-1 grid-rows-1 m-1">
                {createArrayWeek(weekStart).map((day) => (
                    <div key={day.index}>
                        <CalendarItem 
                            day={day} 
                            setActiveDay={setActiveDay} 
                            activeDay={activeDay}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}