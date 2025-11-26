import { weeksArray } from "../../Utils/calendarUtils";
import type { CalendarItemProps } from "../../Types/calendar.types";

export default function CalendarItem({ day, setActiveDay, activeDay }: CalendarItemProps) {
    const dateString = `${day.year}-${day.month}-${day.date}`;
    
    return (
        <div 
            onClick={() => { setActiveDay(dateString) }} 
            className={`p-3 shadow-md duration-700 rounded-xl ${
                dateString === activeDay ? 'bg-fuchsia-600' : 'bg-gray-600'
            }`}
        >
            <h4 className="text-[15px] text-white text-center">{day.date}</h4>
            <p className="text-[12px] text-white font-extralight text-center">
                {weeksArray[day.index]}
            </p>
        </div>
    );
}