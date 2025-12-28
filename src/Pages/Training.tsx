import WorkoutInDate from "../Components/workoutInDate/workoutInDate.tsx";
import Template from "../Components/Template/Template.tsx";
import CreateTemplate from "../Components/CreateTemplate/CreateTemplate.tsx";
import { useGetWorkoutInDateQuery } from ".././api/workoutApi.ts";
import {
  useGetTemplateQuery,
  usePostTemplateMutation,
} from ".././api/templateApi.ts";
import { useAppSelector } from "../store/hooks/reduxHook.ts";
import { selectCurrentDate } from "../store/selectors/selectorDate.ts";
import Layout from "../Components/Layout/Layout.tsx";

export default function Training() {
  const selectDate = useAppSelector(selectCurrentDate);
  const showPage = useAppSelector((state) => state.page.page);

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
  } = useGetTemplateQuery(undefined, {
    skip: showPage !== "template",
  });

  return (
      <Layout>
        <>
        {showPage == "workoutInDate" && (
        <WorkoutInDate
          date={selectDate}
          data={workoutDataInDate}
          error={workoutErrorInDate}
          isLoading={workoutLoadingInDate}
        />
      )}
      {showPage == "template" && (
        <Template
          date={selectDate}
          data={templateData}
          error={templateError}
          isLoading={templateLoading}
        />
      )}
      {showPage == "createTemplate" && (
        <CreateTemplate
          postTemplate={postTemplate}
          isPosting={isPostingTemplate}
        />
      )}
        </>
      </Layout>
  );
}
