import { Link } from "react-router";
import { FaRegUser } from "react-icons/fa6";
import SideBar from "../SideBar/SideBar";
import { memo, useState } from "react";

const Header = memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <header className="flex justify-between items-center m-4 mb-10">
      <Link to="/" className="">
        <div className="text-3xl font-[SairaBold] text-white">
          BVFss
        </div>
      </Link>
      <div className="header_cabinet">
        <FaRegUser onClick={()=>setIsOpen(!isOpen)} className="text-3xl text-(--color-main-theme) cursor-pointer"/>
        <SideBar setIsOpen={setIsOpen} isOpen = {isOpen}/>
      </div>
    </header>
  );
})

export default Header

