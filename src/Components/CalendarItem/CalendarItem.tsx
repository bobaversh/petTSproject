import { weeksArray } from "../../Utils/calendarUtils";
import { setDate, clearDate } from "../../store/slice/dateSlice";
import { clearPage, setPage } from "../../store/slice/showPage";
import { setFoodDate, clearFoodDate } from "../../store/slice/foodDataSlice";
import { useDispatch, useSelector } from "react-redux";
import type { CalendarItemProps } from "../../Types/calendar.types";
import { memo, useCallback, useMemo } from "react";
import { makeSelectIsDateActive, makeSelectIsFoodDateActive } from "../../store/selectors/selectorDate";
import { useLocation } from "react-router";

const CalendarItem = memo(function CalendarItem({ day }: CalendarItemProps) {
  const location = useLocation();
  const dispatch = useDispatch();

  const dateString = useMemo(
    () => `${day.year}-${day.month}-${day.date}`,
    [day]
  );

  const selectIsActive = useMemo(
    () => location.pathname === "/food" 
      ? makeSelectIsFoodDateActive(dateString)
      : makeSelectIsDateActive(dateString),
    [dateString, location.pathname]
  );
  const isActive = useSelector(selectIsActive);

  const handleSetDate = useCallback(() => {
    if (location.pathname == "/food") {
      if (isActive) {
        dispatch(clearFoodDate());
      } else {
        dispatch(setFoodDate(dateString));
      }
    } else {
      if (isActive) {
        dispatch(clearDate());
        dispatch(clearPage());
      } else {
        dispatch(setDate(dateString));
        dispatch(setPage("workoutInDate"));
      }
    }
  }, [dateString, isActive, location.pathname]);

  return (
    <div
      onClick={handleSetDate}
      className={`p-3 shadow-md duration-300 rounded-xl cursor-pointer ${
        isActive ? "bg-purple-500" : "bg-neutral-700"
      }  active:scale-95 transition-all`}
    >
      <h4 className="text-[15px] text-white text-center">{day.date}</h4>
      <p className="text-[12px] text-white font-extralight text-center">
        {weeksArray[day.index]}
      </p>
    </div>
  );
});

export default CalendarItem;
