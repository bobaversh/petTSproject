import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectedRoutes } from "./ProtectedRoutes";
import LoadingItem from "../Components/LoadingItem/LoadingItem";

const Food = lazy(() => import("../Pages/Food"));
const Page404 = lazy(() => import("../Pages/Page404"));
const Home = lazy(() => import("../Pages/Home"));
const Login = lazy(() => import("../Pages/Login"));
const Register = lazy(() => import("../Pages/Register"));
const Training = lazy(() => import("../Pages/Training"));
const TrainingProcess = lazy(() => import("../Pages/TrainingProcess"));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-(--bg-color-main)">
            <LoadingItem />
          </div>
        }
      >
        <Routes>
        <Route
            path="/training/:path"
            element={
              <ProtectedRoutes>
                <TrainingProcess />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/training"
            element={
              <ProtectedRoutes>
                <Training />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/food"
            element={
              <ProtectedRoutes>
                <Food />
              </ProtectedRoutes>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
