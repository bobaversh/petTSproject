import { useDispatch } from "react-redux";
import type { backButtonProps } from "../../Types/workout.types";
import { setPage } from "../../store/slice/showPage";

const BackButton = ({ page }: backButtonProps) => {
  const dispatch = useDispatch();

  return (
    <button
      className="mt-5 ml-5 text-#fff hover:scale-105 duration-200"
      onClick={() => dispatch(setPage(page))}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
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
  );
};

export default BackButton;
