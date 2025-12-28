import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks/reduxHook";
import type {
  workoutProcessProps,
  WorkoutResponse,
} from "../../Types/workout.types";
import SwipeToDelete from "../SwipeToDelete/SwipeToDelete";
import { useUpdateWorkoutMutation } from "../../api/workoutApi";
import type { updatedWorkout } from "../../Types/workout.types";
import { useNavigate } from "react-router";
import useDebounce from "../../hooks/useDebounce";

const generateId = () => Math.random().toString(36).substr(2, 9);

const prepareWorkoutForUpdate = (workout: WorkoutResponse): updatedWorkout => {
  return {
    exercises: workout.exercises.map((exercise) => ({
      ...exercise,
      sets: exercise.sets.map((set) => ({
        ...set,
        weight: String(set.weight),
        reps: String(set.reps),
      })),
    })),
    date: workout.date,
    name: workout.name,
  };
};

const WorkoutProcess = ({ data }: workoutProcessProps) => {
  const navigate = useNavigate();
  const workoutId = useAppSelector((state) => state.workoutId.workoutId);
  const [workout, setWorkout] = useState<WorkoutResponse>();

  const [updateWorkout] = useUpdateWorkoutMutation();

    const debouncedWorkout = useDebounce(workout, 4000);

    useEffect(() => {
      if (debouncedWorkout && workoutId) {
        updateWorkout({
          workout_id: workoutId,
          workout: prepareWorkoutForUpdate(debouncedWorkout),
        });
      }
    }, [debouncedWorkout, workoutId]);
  

  const addEmptySet = useCallback(
    (exerciseId: string) => {
      if (!workout) return;

      const updatedWorkout: WorkoutResponse = {
        ...workout,
        exercises: workout.exercises?.map((exercise) => {
          if (exercise?.id === exerciseId) {
            const newSet = {
              id: generateId(),
              weight: 0,
              reps: 0,
            };

            return {
              ...exercise,
              sets: [...exercise.sets, newSet],
            };
          }
          return exercise;
        }),
      };
      setWorkout(updatedWorkout);
    },
    [workout]
  );

  const handleDelete = useCallback(
    (setId: string, exerciseId: string) => {
      if (!workout) return;

      const updatedWorkout: WorkoutResponse = {
        ...workout,
        exercises: workout.exercises.map((exercise) => {
          if (exerciseId === exercise.id) {
            return {
              ...exercise,
              sets: exercise.sets.filter((set) => set.id !== setId),
            };
          }
          return exercise;
        }),
      };

      setWorkout(updatedWorkout);
    },
    [workout]
  );

  const handleChange = useCallback(
    (
      exerciseId: string,
      setId: string,
      value: string,
      field: "weight" | "reps"
    ) => {
      if (!workout) return;

      const updatedWorkout: WorkoutResponse = {
        ...workout,
        exercises: workout.exercises.map((exercise) => {
          if (exerciseId === exercise.id) {
            return {
              ...exercise,
              sets: exercise.sets.map((set) => {
                if (set.id === setId) {
                  return {
                    ...set,
                    [field]: value.replace(/[^\d.,]/g, "").replace(",", "."),
                  };
                }
                return set;
              }),
            };
          }
          return exercise;
        }),
      };
      setWorkout(updatedWorkout);
    },
    [workout]
  );

  useEffect(() => {
    setWorkout(data)
    const delay = setTimeout(()=>{}, 20000)

    return () => {clearInterval(delay)}
  }, [data]);

  return (
    <>
      {workout && (
        <>
          <button
            className="mt-5 ml-5 text-#fff hover:scale-110 duration-200"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="grid grid-cols-1 mb-30">
            <h2 className="text-center text-white text-2xl bg-(--bg-color-second) rounded-2xl m-1 my-5 p-2 mt-10">
              {workout.name}
            </h2>
            {workout.exercises.map((el) => (
              <div
                key={el.id}
                className="grid rounded-2xl my-1 bg-(--bg-color-second)"
              >
                <div className="flex my-1">
                  <span className="w-1/6 h-12 text-center text-[#fff9] bg-[#1A1A1A] rounded-4xl p-2 m-1">
                    {el.number}
                  </span>
                  <span className="w-full h-12 text-center text-white font-bold bg-[#1A1A1A] rounded-4xl p-2 m-1 mr-1">
                    {el.name}
                  </span>
                </div>
                <div className="space-y-3">
                  {el.sets.map((sets, index) => (
                    <SwipeToDelete
                      key={index}
                      onDelete={() => handleDelete(sets.id, el.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-1 relative mt-3 p-1">
                          <label
                            htmlFor={`weight-${el.id}-${sets.id}`}
                            className="absolute -top-1 rounded-full left-8 z-10 px-2 text-xs font-medium text-[#fff9] bg-(--bg-color-main)"
                          >
                            Вес
                          </label>
                          <input
                            type="number"
                            inputMode="decimal"
                            id={`weight-${el.id}-${sets.id}`}
                            name={`weight-${el.id}-${sets.id}`}
                            aria-label={`Вес для подхода ${index + 1} упражнения ${el.name}`}
                            placeholder="0"
                            onChange={(e) =>
                              handleChange(
                                el.id,
                                sets.id,
                                e.target.value,
                                "weight"
                              )
                            }
                            value={sets.weight === 0 ? "" : sets.weight}
                            className="w-full text-center p-3 outline-none shadow-lg rounded-full border-2 border-(--color-main-theme) bg-(--bg-color-main) text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>

                        <div className="flex-1 relative mt-3 p-1">
                          <label
                            htmlFor={`reps-${el.id}-${sets.id}`}
                            className="absolute -top-1 left-8 z-10 px-2 text-xs rounded-full font-medium text-[#fff9] bg-(--bg-color-main)"
                          >
                            Повторения
                          </label>
                          <input
                            type="number"
                            inputMode="numeric"
                            id={`reps-${el.id}-${sets.id}`}
                            name={`reps-${el.id}-${sets.id}`}
                            aria-label={`Повторения для подхода ${index + 1} упражнения ${el.name}`}
                            placeholder="0"
                            onChange={(e) =>
                              handleChange(
                                el.id,
                                sets.id,
                                e.target.value,
                                "reps"
                              )
                            }
                            value={sets.reps === 0 ? "" : sets.reps}
                            className="w-full p-3 text-center outline-none shadow-lg rounded-full border-2 border-(--color-main-theme) bg-(--bg-color-main) text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </div>
                      </div>
                    </SwipeToDelete>
                  ))}
                </div>

                <button
                  onClick={() => addEmptySet(el.id)}
                  className="m-2 mt-7 w-1/2 mx-auto text-xl font-bold p-3 text-white bg-(--color-main-theme) rounded-4xl"
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default WorkoutProcess;
