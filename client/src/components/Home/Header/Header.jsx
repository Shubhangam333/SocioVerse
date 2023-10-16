import { AiOutlineBell, AiOutlineHome, AiOutlineUser } from "react-icons/ai";

import { BiMessageAltDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <header className="flex min-w-full bg-white justify-between py-4 px-24 items-center shadow-2xl fixed left-0 right-0 top-0 z-20">
      <div>
        <Link to="/home" className="cursor-pointer">
          <h1 className="text-4xl">SocioVerse</h1>
        </Link>
      </div>
      <div className="flex gap-8">
        <button className="text-2xl">
          <AiOutlineHome />
        </button>
        <button className="text-2xl">
          <AiOutlineUser />
        </button>
        <button className="text-2xl relative">
          <AiOutlineBell />
          <span className="absolute block bottom-4 left-6 text-red-400">1</span>
        </button>
        <button className="text-2xl">
          <BiMessageAltDetail />
        </button>
        <Link to="/profile" className="cursor-pointer">
          <img
            src={userInfo.avatar.url}
            alt="avatar"
            className="w-12 rounded-full"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
