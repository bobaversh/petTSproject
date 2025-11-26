import { useEffect } from 'react';
import { useGetWorkoutInDateQuery } from '../../api/workoutApi';
import type { workoutInDateProps } from '../../Types/workout.types';
import LoadingItem from '../LoadingItem/LoadingItem'
import { useNavigate } from 'react-router';
import { isUnauthorizedError } from '../../Utils/401errorUtils';

export default function WorkoutInDate({ date, setShowPage }:workoutInDateProps) {

    const navigate = useNavigate()

 const { data, error, isLoading } = useGetWorkoutInDateQuery(date, {
  refetchOnMountOrArgChange: true,
  skip: !date,
 })

 useEffect(() => {
    if (isUnauthorizedError(error)) {
      navigate('/login');
    }
  }, [error]);

  return (
    <>
      {date ? (
        <div className="m-1 mt-5 p-5 rounded-xl bg-amber-300">
          <h3 className="text-center text-2xl font-bold text-white">
            Тренировки в этот день
          </h3>

          {isLoading && (
            <LoadingItem />
          )}
          {error && (<>
          <p className="text-red-500 mt-5 text-center">{`Ошибка: ${error}`}</p>
            <button onClick={()=>{console.log(error)}} >Click</button>
          </>
            
          )}
          {data && (
            <div className="flex justify-center">
              <button className="text-white mt-10 p-3 rounded-2xl bg-amber-500 duration-200 active:bg-amber-700" onClick={()=>{setShowPage('template')}}>Добавить тренировку</button>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
