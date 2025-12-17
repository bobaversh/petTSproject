import Calendar from "../Components/Calendar/Calendar.tsx";
import WorkoutInDate from "../Components/workoutInDate/workoutInDate.tsx";
import Template from "../Components/Template/Template.tsx";
import CreateTemplate from "../Components/CreateTemplate/CreateTemplate.tsx";
import WorkoutProcess from "../Components/workoutProcess/WorkoutProcess.tsx";
import {
  useGetWorkoutInDateQuery,
  useGetWorkoutQuery,
} from ".././api/workoutApi.ts";
import {
  useGetTemplateQuery,
  usePostTemplateMutation,
} from ".././api/templateApi.ts";
import { useAppSelector } from "../store/hooks/reduxHook.ts";
import { selectCurrentDate } from "../store/selectors/selectorDate.ts";

export default function Training() {

  const selectDate = useAppSelector(selectCurrentDate);
  const showPage = useAppSelector((state) => state.page.page);
  const workoutId = useAppSelector((state) => state.workoutId)

  const [postTemplate, { isLoading: isPostingTemplate }] =
    usePostTemplateMutation();

  const {
    data: workoutDataInDate,
    error: workoutErrorInDate,
    isLoading: workoutLoadingInDate,
  } = useGetWorkoutInDateQuery(selectDate, {
    refetchOnMountOrArgChange: true,
    skip: !selectDate,
  });

  const {
    data: templateData,
    error: templateError,
    isLoading: templateLoading,
  } = useGetTemplateQuery();

  const {
    data: workoutData,
    error: workoutError,
    isLoading: workoutLoading,
  } = useGetWorkoutQuery(workoutId.workoutId, {
    skip: !workoutId
  });

  return (
    <div className="p-1 h-screen">
      <Calendar />

      {showPage == "workoutInDate" && 
        <WorkoutInDate
          date={selectDate}
          data={workoutDataInDate}
          error={workoutErrorInDate}
          isLoading={workoutLoadingInDate}
        />
      }
      {showPage == "template" && 
        <Template
          date={selectDate}
          data={templateData}
          error={templateError}
          isLoading={templateLoading}
        />
      }
      {showPage == "createTemplate" &&
        <CreateTemplate
          postTemplate={postTemplate}
          isPosting={isPostingTemplate}
        />
      }
      {showPage == "workoutProcess" && <WorkoutProcess 
        data={workoutData}
        error={workoutError}
        isLoading={workoutLoading}
      />}
    </div>
  );
}
