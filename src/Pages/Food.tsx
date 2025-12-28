import { useState, type ChangeEventHandler } from "react";
import { useGetFoodQuery, usePostFoodMutation } from "../api/foodApi";
import LoadingItem from "../Components/LoadingItem/LoadingItem";
import FoodCard from "../Components/FoodCard/FoodCard";
import { useAppSelector } from "../store/hooks/reduxHook";
import { selectCurrentFoodDate } from "../store/selectors/selectorDate.ts";
import { isValidUrl } from "../Utils/foodUtils.ts";
import Layout from "../Components/Layout/Layout.tsx";

const Food = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const selectedFoodDate = useAppSelector(selectCurrentFoodDate);

  const {
    currentData: foodData,
    isFetching,
    isLoading,
    isError,
    refetch,
  } = useGetFoodQuery(selectedFoodDate, {
    refetchOnMountOrArgChange: true,
    skip: !selectedFoodDate,
  });

  const [postFood, { isLoading: isPosting }] = usePostFoodMutation();

  const handleSearch = () => {
    if (isValidUrl(inputValue) && selectedFoodDate) {
      postFood({
        date: selectedFoodDate,
        csv_url: inputValue,
      }).unwrap();
      setInputValue("");
      refetch()
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };

  const isLoadingState = isLoading || isFetching || isPosting;

  return (
    <Layout>
      <>
        {selectedFoodDate && (
          <div className="flex mt-10 gap-2">
            <input
              onChange={handleInputChange}
              value={inputValue}
              className="p-4 bg-(--bg-color-second) border-transparent border-2 rounded-3xl text-white focus:shadow-(--color-main-theme) focus:border-(--color-main-theme) outline-none grow"
              placeholder="Введите URL "
              disabled={isPosting}
            />
            <button
              onClick={handleSearch}
              className="p-4 bg-(--color-main-theme) rounded-2xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isPosting || !inputValue.trim()}
            >
              Найти
            </button>
          </div>
        )}

        {isLoadingState && <LoadingItem />}

        {!isLoadingState && foodData && !isError && (
          <FoodCard data={foodData} />
        )}

        {!isLoadingState && isError && selectedFoodDate && (
          <div className="text-center text-gray-500 mt-10">
            Нет данных за выбранную дату
          </div>
        )}
      </>
    </Layout>
  );
};

export default Food;
