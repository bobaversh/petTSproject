import { useState, type ChangeEventHandler } from "react";
import { useGetFoodQuery } from "../api/foodApi";
import LoadingItem from "../Components/LoadingItem/LoadingItem";
import FoodCard from "../Components/FoodCard/FoodCard";
import Calendar from "../Components/Calendar/Calendar";
import { useAppSelector } from "../store/hooks/reduxHook";
import { selectCurrentFoodDate } from "../store/selectors/selectorDate.ts";

const Food = () => {
  const [value, setValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const selectFoodDate = useAppSelector(selectCurrentFoodDate);
  
  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSearch = () => {
    if (isValidUrl(value)) {
      setSearchTerm(value);
    };
  };

  const { data: foodData, isLoading, error } = useGetFoodQuery(searchTerm, {
    skip: !searchTerm, 
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };


  return (
    <div className="p-2">
      <Calendar />
      <h2>{selectFoodDate}</h2>
      <div className="flex mt-10 gap-2">
        <input
          onChange={handleChange}
          value={value}
          className="p-4 bg-(--bg-color-second) border-transparent border-2 rounded-3xl text-white focus:shadow-(--color-main-theme) focus:border-(--color-main-theme) outline-none grow"
          placeholder="Введите URL "
        />
        <button
          onClick={handleSearch}
          className="p-4 bg-(--color-main-theme) rounded-2xl  text-white"
        >
          Найти
        </button>
      </div>
      
      {isLoading && <LoadingItem />}

      {foodData && <FoodCard isLoading={isLoading} error={error} data={foodData}/>}
    
    </div>
  );
};

export default Food;