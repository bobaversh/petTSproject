import { useParams, useNavigate } from "react-router";
import { useGetWorkoutQuery } from "../api/workoutApi";
import WorkoutProcess from "../Components/workoutProcess/WorkoutProcess";
import LoadingItem from "../Components/LoadingItem/LoadingItem";
import Layout from "../Components/Layout/Layout";
import ErrorItem from "../Components/ErrorItemApi/ErrorItemApi";

const TrainingProcess = () => {
  const params = useParams();
  const navigate = useNavigate();

  if (!params.path) {
    return (
      <div className="p-4 text-center text-white">
        <h2>Такой тренировки не существует</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Назад
        </button>
      </div>
    );
  }

  const {
    data: workoutData,
    error: workoutError,
    isLoading: workoutLoading,
  } = useGetWorkoutQuery(params.path, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      <Layout>
        <>
          {workoutLoading && <LoadingItem />}
          {workoutError && <ErrorItem apiError={workoutError} />}
          {workoutData && <WorkoutProcess data={workoutData} />}
        </>
      </Layout>
    </>
  );
};

export default TrainingProcess;
