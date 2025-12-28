import { useAppDispatch } from "../../store/hooks/reduxHook";
import { setPage } from "../../store/slice/showPage";
import SwipeToDelete from "../SwipeToDelete/SwipeToDelete";
import type { workoutProps } from "../../Types/workout.types";
import LoadingItem from "../LoadingItem/LoadingItem";
import { useDeleteWorkoutMutation } from "../../api/workoutApi";
import { setWorkoutId } from "../../store/slice/workoutIdSlice";
import { useNavigate } from "react-router";

export default function WorkoutInDate({
  date,
  data,
  error,
  isLoading,
}: workoutProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const [deleteWorkout] = useDeleteWorkoutMutation();

  const handleClick = (id: string) => {
    navigate(`/training/${id}`);
    dispatch(setWorkoutId(id));
  };

  return (
    <>
      {date ? (
        <div className="m-1 mt-[58px] p-5 rounded-xl">
          <h3 className="text-center text-2xl font-bold text-white">
            Тренировки в этот день
          </h3>

          {isLoading && <LoadingItem />}
          {error && (
            <>
              <p className="text-red-500 mt-5 text-center">{`Ошибка: ${error}`}</p>
            </>
          )}
          {data && (
            <div className="mt-10 grid grid-cols-1">
              {data.map((element) => {
                return (
                  <SwipeToDelete
                    key={element.id}
                    onDelete={() => deleteWorkout(element.id)}
                  >
                    <div
                      onClick={() => handleClick(element.id)}
                      className="p-3 shadow-xl w-full rounded-xl bg-(--bg-color-second)"
                    >
                      <h4 className="text-center text-white">{element.name}</h4>
                    </div>
                  </SwipeToDelete>
                );
              })}
              <button
                className="text-white mt-10 p-3 mx-auto rounded-2xl w-3/5 bg-(--color-main-theme) duration-200 active:bg-violet-800"
                onClick={() => dispatch(setPage("template"))}
              >
                Добавить тренировку
              </button>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
