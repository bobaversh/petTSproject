import CalendarItem from "../CalendarItem/CalendarItem.tsx";
import {
  createArrayWeek,
  renderWeekMonthRange,
  goToNextWeek,
  goToPrevWeek,
} from "../../Utils/calendarUtils.js";
import { useState, memo, useMemo, useCallback } from "react";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

const Calendar = memo(function Calendar() {
  const [weekStart, setWeekStart] = useState<Date>(new Date());

  const weekDays = useMemo(() => createArrayWeek(weekStart), [weekStart]);

  const weekTitle = useMemo(() => renderWeekMonthRange(weekDays), [weekDays]);

  const handlePrevWeek = useCallback(() => {
    goToPrevWeek(weekStart, setWeekStart);
  }, [weekStart]);

  const handleNextWeek = useCallback(() => {
    goToNextWeek(weekStart, setWeekStart);
  }, [weekStart]);

  return (
    <>
      <div className="flex justify-center gap-4 items-center m-5">
        <MdArrowBackIosNew
          onClick={handlePrevWeek}
          className="active:animate-ping text-white w-1/4 cursor-pointer"
        />
        <h2 className="text-[16px] font-bold md:text-[23px] lg:text-[30px] text-center w-1/2 text-white">
          {weekTitle}
        </h2>
        <MdArrowForwardIos
          onClick={handleNextWeek}
          className="active:animate-ping text-white w-1/4 cursor-pointer"
        />
      </div>
      <div className="grid grid-cols-7 gap-1 grid-rows-1 m-1">
        {weekDays.map((day) => (
          <CalendarItem key={day.index} day={day} />
        ))}
      </div>
    </>
  );
});

export default Calendar;
