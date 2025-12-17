Коротко расскажу, что здесь должно быть и будет. Я делаю приложение, которое призвано облегчить ведение клиентов фитнес-тренерам.
Планируется разделение по ролям тренер-клиент, личные кабинеты с прогрессом, записью онлайн и подпиской за пользование.
Хотелось сделать в формате mini-app, но как пойдет.

На данный момент почти закончил страницы с тренировками и едой. Остались замеры, всевозможные графики, оптимизации, сайдбар, нормальный хэдер с навигацией и тд. Времени делать особо нет, но я стараюсь. Не успел мемоизировать компоненты, не писал тесты. То, что вы увидите - это только направление мысли, а не ее полная или хотя бы мвп реализация. Работы еще очень и очень много

Технологии:

Компонентный подход - разделение на переиспользуемые компоненты

Управление состоянием -  Redux Toolkit

Строгая типизация - TypeScript

Маршрутизация - через React Router

Cтили - Tailwind CSS

Структура файлов:

```
├── public/                 # Статические файлы
├── src/
│   ├── api/               # API-запросы и взаимодействие с бэкендом
│   │   ├── apiSlice.ts
│   │   ├── authApi.ts
│   │   ├── foodApi.ts
│   │   ├── templateApi.ts
│   │   └── workoutApi.ts
│   ├── Components/        # Переиспользуемые React-компоненты
│   │   ├── BackButton/
│   │   ├── Calendar/
│   │   ├── CalendarItem/
│   │   ├── CreateTemplate/
│   │   ├── ErrorItem/
│   │   ├── FoodCard/
│   │   ├── Header/
│   │   ├── HomePage/
│   │   ├── InputLogin/
│   │   ├── InputRegister/
│   │   ├── LoadingItem/
│   │   ├── SideBar/
│   │   ├── SwipeToDelete/
│   │   ├── Template/
│   │   ├── workoutInDate/
│   │   └── workoutProcess/
│   ├── Fonts/             # Шрифты проекта
│   ├── Pages/             # Компоненты страниц приложения
│   │   ├── Food.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Training.tsx
│   ├── Routes/            # Конфигурация маршрутизации
│   │   ├── ProtectedRoutes.tsx
│   │   └── route.tsx
│   ├── store/             # Redux store, слайсы и конфигурация
│   │   ├── hooks/
│   │   │   └── reduxHook.ts
│   │   ├── selectors/
│   │   │   └── selectorDate.ts
│   │   ├── slice/
│   │   │   ├── dateSlice.ts
│   │   │   ├── foodDataSlice.ts
│   │   │   ├── showPage.ts
│   │   │   └── workoutIdSlice.ts
│   │   └── store.ts
│   ├── Types/             # TypeScript-типы и интерфейсы
│   │   ├── calendar.types.ts
│   │   ├── error.types.ts
│   │   ├── food.types.ts
│   │   ├── login.types.ts
│   │   ├── register.types.ts
│   │   └── workout.types.ts
│   ├── Utils/             # Вспомогательные функции и утилиты
│   │   ├── 401errorUtils.ts
│   │   ├── calendarUtils.ts
│   │   ├── fingerprint.ts
│   │   ├── foodUtils.ts
│   │   ├── formRegister.ts
│   │   └── validationRules.ts
│   ├── App.tsx            # Корневой компонент приложения
│   ├── index.css          # Глобальные стили
│   ├── main.tsx           # Точка входа приложения
│   └── vite-env.d.ts      # TypeScript определения для Vite
```

