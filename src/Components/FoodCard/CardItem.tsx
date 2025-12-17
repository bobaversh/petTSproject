import type { cardItemProps } from "../../Types/food.types";

const CardItem = ({ text, field, flag }: cardItemProps) => {
  return (
    <>
      {flag == "head" && (
        <div className="text-center p-3 bg-(--bg-color-main) rounded-lg shadow">
          <h3 className="text-lg font-bold text-white">{text}</h3>
          <div className="text-[#fff8]">{field}</div>
        </div>
      )}

      {flag == "body" && (
        <div className="text-center">
          <div className="font-semibold text-white">{text}</div>
          <div className="text-[#fff8] text-xs">{field}</div>
        </div>
      )}
    </>
  );
};

export default CardItem;
