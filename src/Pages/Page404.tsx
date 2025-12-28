import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/");
    }
  }, [count, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Декоративные элементы */}
      <div className="absolute top-10 left-10 w-24 h-24 border-2 border-purple-500/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-blue-500/10 rounded-full animate-pulse delay-1000"></div>
      
      {/* Анимированная гантель */}
      <div className={`mb-8 transform transition-transform duration-300 ${bounce ? 'scale-110' : 'scale-100'}`}>
        <div className="relative">
          <div className="w-48 h-8 bg-linear-to-rrom-purple-600 to-blue-600 rounded-full"></div>
          <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-linear-to-r from-purple-700 to-purple-800 rounded-full border-4 border-gray-800"></div>
          <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-linear-to-r from-blue-700 to-blue-800 rounded-full border-4 border-gray-800"></div>
        </div>
      </div>

      {/* Контент */}
      <div className="text-center max-w-2xl z-10">
        <h1 className="text-8xl font-bold mb-4 bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-3xl font-bold mb-4">Упс! Тренировка не найдена</h2>
        
        <p className="text-xl text-gray-300 mb-8">
          Кажется, вы пытались поднять слишком большой вес. 
          Эта страница скрылась от нас, как последнее повторение на пресс.
        </p>

        <div className="mb-10">
          <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto mb-2 overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-purple-500 to-blue-500 transition-all duration-1000"
              style={{ width: `${(10 - count) * 10}%` }}
            ></div>
          </div>
          <p className="text-gray-400">
            Автоматический возврат через {count} секунд
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            to="/"
            className="px-8 py-3 bg-linear-to-r from-purple-600 to-purple-700 rounded-full font-bold hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 shadow-lg"
          >
            На главную
          </Link>
          
          <Link
            to="/workouts"
            className="px-8 py-3 bg-linear-to-r from-blue-600 to-blue-700 rounded-full font-bold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg"
          >
             К тренировкам
          </Link>
          
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-linear-to-r from-gray-700 to-gray-800 rounded-full font-bold hover:from-gray-800 hover:to-gray-900 transition-all transform hover:scale-105 shadow-lg"
          >
            ↩️ Назад
          </button>
        </div>

        {/* Случайные советы по тренировкам */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-bold mb-3 flex items-center justify-center gap-2">
            <span className="text-yellow-400">💡</span> Пока ждете — полезный совет:
          </h3>
          <p className="text-gray-300 italic">
            "Лучше сделать 10 качественных повторений, чем 20 небрежных. 
            Контроль над движением важнее веса!"
          </p>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;