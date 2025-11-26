import Calendar from "../Components/Calendar/Calendar.tsx"
import { useState } from "react"
import WorkoutInDate from "../Components/workoutInDate/workoutInDate.tsx"
import { useNavigate } from 'react-router';
import { isUnauthorizedError } from '.././Utils/401errorUtils';
import { useEffect } from 'react';
import { useGetWorkoutInDateQuery } from '.././api/workoutApi.ts';


export default function Training () {

    const [selectDate, setSelectDate] = useState<string>('')
    const [showPage, setShowPage] = useState<string>('workoutInDate')
    const navigate = useNavigate()

    const { data, error, isLoading } = useGetWorkoutInDateQuery(selectDate, {
     refetchOnMountOrArgChange: true,
     skip: !selectDate,
    })
   
    useEffect(() => {
       if (isUnauthorizedError(error)) {
         navigate('/login');
       }
     }, [error]);

    return (
        <div className="p-1 bg-amber-300">
            <Calendar setSelectDate={setSelectDate}/>
            {showPage == 'workoutInDate' && <WorkoutInDate date={selectDate} data={data} error={error} isLoading={isLoading} setShowPage={setShowPage}/>}
        </div>
    )
}