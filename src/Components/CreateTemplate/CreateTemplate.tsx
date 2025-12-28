import { useCallback, useState } from "react";

import type { ChangeEvent } from "react";
import type { templatePostProps } from "../../Types/workout.types";

import BackButton from "../BackButton/BackButton";
import SwipeToDelete from "../SwipeToDelete/SwipeToDelete";

import { useAppDispatch } from "../../store/hooks/reduxHook";
import { setPage } from "../../store/slice/showPage";

const generateId = (): string => Math.random().toString(36).substr(2, 9);

const CreateTemplate = ({ postTemplate, isPosting }: templatePostProps) => {
  const dispatch = useAppDispatch();

  const [template, setTemplate] = useState({
    name: "",
    exercises: [
      {
        name: "",
        number: "",
        id: generateId(),
        sets: [],
      },
    ],
  });

  const addExercise = useCallback((): void => {
    setTemplate((prev) => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        {
          name: "",
          number: "",
          id: generateId(),
          sets: [],
        },
      ],
    }));
  }, []);

  const removeExercise = useCallback((exerciseId: string): void => {
    setTemplate((prev) => {
      if (prev.exercises.length <= 1) {
        return prev;
      }

      return {
        ...prev,
        exercises: prev.exercises.filter((ex) => ex.id !== exerciseId),
      };
    });
  }, []);

  const handleChangeNameOfTheTemplate = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setTemplate((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };

  const handleExerciseNumberChange = (
    exerciseId: string,
    value: string
  ): void => {
    setTemplate((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, number: value } : ex
      ),
    }));
  };

  const handleExerciseNameChange = (
    exerciseId: string,
    value: string
  ): void => {
    setTemplate((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, name: value } : ex
      ),
    }));
  };

  const handlePostTemplate = async (): Promise<void> => {
    postTemplate(template);
    dispatch(setPage("workoutInDate"));
  };

  return (
    <div>
      <BackButton page={"template"} />

      <div className="flex justify-center mt-5 p-2">
        <div className="w-full">
          <input
            id={"nameOfTraining"}
            className="w-full p-4 mb-7 text-lg rounded-xl bg-transparent font-bold text-white placeholder-#fff8 border-2 border-white focus:outline-none duration-500  focus:shadow-md focus:border-(--color-main-theme)"
            onChange={handleChangeNameOfTheTemplate}
            value={template.name}
            placeholder="Введите название тренировки"
          />

          {template.exercises.map((exercise, index) => (
            <SwipeToDelete
              onDelete={() => removeExercise(exercise.id)}
              key={exercise.id}
            >
              <div className="flex justify-start items-start rounded-xl bg-transparent">
                <input
                  id={index + "f"}
                  className="w-12 h-12 mr-3 text-center rounded-lg bg-transparent focus:border-(--color-main-theme) text-white placeholder-#fff8 border focus:outline-none duration-500"
                  placeholder="№"
                  value={exercise.number}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleExerciseNumberChange(exercise.id, e.target.value)
                  }
                />
                <input
                  id={index + "s"}
                  className="w-full p-3 text-md rounded-3xl bg-transparent text-white placeholder-#fff8 border focus:border-(--color-main-theme) border-white focus:outline-none duration-500"
                  placeholder="Введите название упражнения"
                  value={exercise.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleExerciseNameChange(exercise.id, e.target.value)
                  }
                />
              </div>
            </SwipeToDelete>
          ))}

          <button
            className="w-full border-2 mt-5 border-dashed p-2 rounded-xl text-center text-white duration-100 active:scale-95"
            onClick={addExercise}
          >
            Добавить упражнение
          </button>

          <div className="flex justify-center mt-12">
            <button
              className="px-8 py-3 rounded-2xl duration-300 text-white bg-(--color-main-theme) disabled:bg-gray-400 disabled:opacity-50"
              disabled={template.name.length === 0 && isPosting}
              onClick={handlePostTemplate}
            >
              Сохранить тренировку
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplate;
