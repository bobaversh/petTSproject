import { Link } from "react-router";
import { FaRegUser } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="flex justify-between items-center m-5 mb-10">
      <Link to="/" className="">
        <div className="text-3xl font-[SairaBold] text-white">
          BVFss
        </div>
      </Link>
      <div className="header_cabinet">
        <FaRegUser className="text-3xl text-(--color-main-theme) cursor-pointer" />
      </div>
    </header>
  );
}
