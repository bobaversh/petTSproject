import { memo, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { LuBicepsFlexed, LuApple } from "react-icons/lu";
import { LiaTapeSolid } from "react-icons/lia";


const BottomBar = memo(() => {
  const [activeTab, setActiveTab] = useState("");
  const navItems = useMemo(()=>[
    { path: "/training", icon: <LuBicepsFlexed />, label: "Тренировки" },
    { path: "/food", icon: <LuApple />, label: "Питание" },
    { path: "/measurements", icon: <LiaTapeSolid />, label: "Замеры" },
  ], [])

  const handleTabClick = (path: string) => {
    setActiveTab(path);
  };

  return (
    <div className="fixed bottom-5 z-20 left-1/2 transform -translate-x-1/2 rounded-4xl flex justify-around w-11/12 bg-(--bg-color-second)">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={() => handleTabClick(item.path)}
          className={({ isActive }) =>
            `m-5 text-4xl transition-colors duration-200 ${
              isActive || activeTab === item.path
                ? "text-white scale-110"
                : "text-[#fff8]"
            }`
          }
        >
          {item.icon}
        </NavLink>
      ))}
    </div>
  );
})

export default BottomBar