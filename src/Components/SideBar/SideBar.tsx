import { Link, useNavigate } from "react-router";
import { useLogoutMutation } from "../../api/authApi";
import type { SideBarProps } from "../../Types/other.types";
import { useEffect, useState } from "react";

const SideBar = ({ isOpen, setIsOpen }: SideBarProps) => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout(null).unwrap();
      localStorage.removeItem("token");
      setIsOpen(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      localStorage.removeItem("token");
      setIsOpen(false);
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-500 ${
          isOpen ? "opacity-60" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-(--bg-color-main) shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold text-white">Меню</h2>
          <button
            className="text-2xl text-[#fff8] transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="p-4 grid grid-cols-1 gap-3 text-white">
          {isAuthenticated ? (
            <>
              <Link
                to="/training"
                className="p-3 rounded-lg text-left transition-all duration-200 active:translate-x-1 hover:translate-x-1"
                onClick={() => setIsOpen(false)}
              >
                Тренировки
              </Link>
              <Link
                to="/food"
                className="p-3 rounded-lg text-left transition-all duration-200 active:translate-x-1 hover:translate-x-1"
                onClick={() => setIsOpen(false)}
              >
                Отчеты еды
              </Link>
              <button
                onClick={handleLogout}
                className="p-3 rounded-lg text-left transition-all duration-200 active:translate-x-1 hover:translate-x-1"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="p-3 rounded-lg text-left transition-all duration-200 active:translate-x-1 hover:translate-x-1"
                onClick={() => setIsOpen(false)}
              >
                Войти в аккаунт
              </Link>
              <Link
                to="/register"
                className="p-3 rounded-lg text-left transition-all duration-200 active:translate-x-1 hover:translate-x-1"
                onClick={() => setIsOpen(false)}
              >
                Регистрация
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default SideBar;
