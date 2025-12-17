import LoadingItem from "../LoadingItem/LoadingItem";
import type { workoutProps } from "../../Types/workout.types";
import BackButton from "../BackButton/BackButton";
import { useAppDispatch } from "../../store/hooks/reduxHook";
import { setPage } from "../../store/slice/showPage";
import SwipeToDelete from "../SwipeToDelete/SwipeToDelete";
import { useDeleteTemplateMutation } from "../../api/templateApi";
import { useCreateWorkoutMutation } from "../../api/workoutApi";

const Template = ({ date, data, error, isLoading }: workoutProps) => {
  const dispatch = useAppDispatch();

  const [deleteTemplate, { isLoading: isDeleting, isError }] =
    useDeleteTemplateMutation();

  const [createWorkout] = useCreateWorkoutMutation();

  const handleClick = (templateId: string, date: string, name:string) => {
    createWorkout({ date, templateId, name });
    dispatch(setPage('workoutProcess'))
  };

  return (
    <>
      <BackButton page={"workoutInDate"} />
      {date ? (
        <div className="m-1 p-5 rounded-xl">
          <h3 className="text-center text-2xl font-bold text-white">
            Ваши шаблоны тренировок
          </h3>

          {isLoading && <LoadingItem />}
          {error && (
            <>
              <p className="text-red-500 mt-5 text-center">{`Ошибка: ${error}`}</p>
            </>
          )}
          {data && (
            <div className={`mt-10 grid grid-cols-1`}>
              {isError && (
                <p className="text-red-500 text-center">{`Ошибка: ${isError}`}</p>
              )}

              {isDeleting && <LoadingItem />}
              {data.map((element) => {
                return (
                  <SwipeToDelete
                    key={element.id}
                    onDelete={() => deleteTemplate(element.id).unwrap()}
                  >
                    <div
                      onClick={() => handleClick(element.id, date, element.name)}
                      className="p-3 shadow-xl w-full rounded-xl bg-neutral-700"
                    >
                      <h4 className="text-center text-white">{element.name}</h4>
                    </div>
                  </SwipeToDelete>
                );
              })}
              <button
                className="text-white mt-10 mx-auto p-3 w-3/5 rounded-2xl bg-purple-500 duration-200 active:bg-amber-700"
                onClick={() => dispatch(setPage("createTemplate"))}
              >
                Добавить шаблон
              </button>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Template;
