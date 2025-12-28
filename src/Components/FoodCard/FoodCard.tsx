import { useState } from "react";
import type { foodDayRequestProps } from "../../Types/food.types";
import { getProductsText, correctValue } from "../../Utils/foodUtils";
import CardItem from "./CardItem";

export default function FoodCard({ data }: foodDayRequestProps) {
  const [isClicked, setIsCliced] = useState<string>();

  const handleClick = (name: string) => {
    if (name == isClicked) {
      setIsCliced("");
    } else {
      setIsCliced(name);
    }
  };

  if (data !== undefined) {
    return (
      <section className="mt-10">
        {data.totals && (
          <div className="bg-(--bg-color-second) mb-5 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">
              Итоги за день
            </h2>
            <div className="grid grid-cols-1 mb-7 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <CardItem
                text={correctValue(data.totals.kkal)}
                field={"Ккал"}
                flag={"head"}
              />
              <CardItem
                text={correctValue(data.totals.protein)}
                field={"Белки"}
                flag={"head"}
              />
              <CardItem
                text={correctValue(data.totals.fat)}
                field={"Жиры"}
                flag={"head"}
              />
              <CardItem
                text={correctValue(data.totals.carbs)}
                field={"Углеводы"}
                flag={"head"}
              />
              <CardItem
                text={correctValue(data.totals.fiber)}
                field={"Клетчатка"}
                flag={"head"}
              />
            </div>
  
            <div className="space-y-4">
              {data.meals.map((meal) => (
                <div
                  key={meal.name}
                  className="bg-(--bg-color-main) rounded-2xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => {
                      handleClick(meal.name);
                    }}
                    className="w-full p-4 flex justify-between items-center  transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {meal.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-white">
                        {getProductsText(meal.items.length)}
                      </span>
                      <svg
                        className={`w-5 h-5 text-white transform transition-transform duration-300 ${
                          meal.name == isClicked ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>
  
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      meal.name == isClicked
                        ? "max-h-[5000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-4">
                      {meal.items.length > 0 ? (
                        <div className="space-y-3">
                          {meal.items.map((item, index) => (
                            <div
                              key={`${meal.name}-${index}`}
                              className="flex items-center gap-4 justify-between p-3 bg-(--bg-color-second) rounded-lg"
                            >
                              <div className="flex-1 min-w-0">
                                <h4 className="font-sm text-sm text-white wrap">
                                  {item.name}
                                </h4>
                              </div>
                              <div className="flex space-x-2 text-sm">
                                <CardItem
                                  text={correctValue(item.kkal)}
                                  field={"Ккал"}
                                  flag={"body"}
                                />
                                <CardItem
                                  text={correctValue(item.protein)}
                                  field={"Белки"}
                                  flag={"body"}
                                />
                                <CardItem
                                  text={correctValue(item.fat)}
                                  field={"Жиры"}
                                  flag={"body"}
                                />
                                <CardItem
                                  text={correctValue(item.carbs)}
                                  field={"Углеводы"}
                                  flag={"body"}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-[#fff8] py-4">
                          Нет продуктов в этом приеме пищи
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }

  if (data == undefined) {
    return (<h3>Отчет в этот день не найден</h3>)
  }
}
