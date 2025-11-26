import type { workoutInDateProps } from '../../Types/workout.types';
import LoadingItem from '../LoadingItem/LoadingItem'

export default function WorkoutInDate({ date, data, error, isLoading, setShowPage }:workoutInDateProps) {

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
