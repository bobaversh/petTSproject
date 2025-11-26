import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../Pages/Home"));
const Login = lazy(() => import("../Pages/Login"));
const Register = lazy(() => import("../Pages/Register"));
const Training = lazy(()=> import("../Pages/Training"))

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path='/training' element={<Training />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;