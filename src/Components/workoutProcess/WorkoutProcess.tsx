import { useEffect, useState } from "react";
// import { useAppSelector } from "../../store/hooks/reduxHook";
import type { workoutProcessProps, WorkoutResponse } from "../../Types/workout.types";
import ErrorItem from "../ErrorItem/ErrorItem";
import LoadingItem from "../LoadingItem/LoadingItem";

const WorkoutProcess = ({ data, error, isLoading }: workoutProcessProps) => {

  const [workout, setWorkout] = useState<WorkoutResponse>();

//   const workoutId = useAppSelector((state) => state.workoutId);
// const handleAddSet = () => {

// }

  useEffect(()=>{
    setWorkout(data)
  },[data])

  return (
    <>
      {isLoading && <LoadingItem />}
      {error && <ErrorItem apiError={error} />}
      {workout && (
        <div className="grid grid-cols-1">
          <h2 className="text-center text-white text-2xl bg-neutral-700 rounded-2xl m-1 my-5 p-2 mt-10">
            {workout.name}
          </h2>
          {workout.exercises.map((el) => (
            <div key={el.id} className="grid rounded-2xl my-1 bg-neutral-700 grid-cols-1 grid-rows-2">
              <div className="flex my-1">
                <span className="w-1/6 text-center text-white bg-[#1A1A1A] rounded-4xl p-2 m-1">
                  {el.number}
                </span>
                <span className="w-full text-center text-[#fff9] bg-[#1A1A1A] rounded-4xl p-2 m-1 mr-1">
                  {el.name}
                </span>
              </div>
              <div className="flex">
                {el.sets.map((sets, index) => (
                  <div key={index} className="grid grid-cols-1 grid-rows-2">
                    <input value={sets.weight} className="" placeholder="Вес"/>
                    <input value={sets.reps} className="" placeholder="Повторения"/>
                  </div>
                ))}
                <button className="m-2 ml-auto p-3 text-white bg-[#1A1A1A] rounded-4xl">+</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default WorkoutProcess;
