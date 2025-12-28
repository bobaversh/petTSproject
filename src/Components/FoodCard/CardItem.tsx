import type { cardItemProps } from "../../Types/food.types";

const CardItem = ({ text, field, flag }: cardItemProps) => {
  return (
    <>
      {flag == "head" && (
        <div className="text-center p-3 bg-(--bg-color-main) rounded-lg shadow">
          <h3 className="text-lg font-bold text-white">{text}</h3>
          <h3 className="text-[#fff8]">{field}</h3>
        </div>
      )}

      {flag == "body" && (
        <div className="text-center">
          <h3 className="font-semibold text-white">{text}</h3>
          <h3 className="text-[#fff8] text-xs">{field}</h3>
        </div>
      )}
    </>
  );
};

export default CardItem;
