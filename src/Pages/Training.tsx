import Calendar from "../Components/Calendar/Calendar.tsx"
import { useState } from "react"
import WorkoutInDate from "../Components/workoutInDate/workoutInDate.tsx"


export default function Training () {

    const [selectDate, setSelectDate] = useState<string>('')
    const [showPage, setShowPage] = useState<string>('workoutInDate')

    return (
        <div className="p-1 bg-amber-300">
            <Calendar setSelectDate={setSelectDate}/>
            {showPage == 'workoutInDate' && <WorkoutInDate date={selectDate} setShowPage={setShowPage}/>}
        </div>
    )
}