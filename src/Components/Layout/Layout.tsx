import { type FC, type ReactNode } from "react";
import Header from "../Header/Header";
import BottomBar from "../BottomBar/BottomBar";
import Calendar from "../Calendar/Calendar";

interface LayoutProps {
    children: ReactNode;
  }

const Layout : FC<LayoutProps> = ({ children }) => {
return (
    <div className="p-1 mb-30">
    <Header />
    <Calendar />
    {children}
    <BottomBar />
    </div>
)
}

export default Layout