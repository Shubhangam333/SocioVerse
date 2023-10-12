import { AiOutlineBell, AiOutlineHome, AiOutlineUser } from "react-icons/ai";

import { BiMessageAltDetail } from "react-icons/bi";

const Header = () => {
  return (
    <header className="flex min-w-full justify-between py-4 px-24 items-center shadow-2xl fixed left-0 right-0 top-0">
      <div>
        <h1 className="text-4xl">SocioVerse</h1>
      </div>
      <div className="flex gap-8">
        <button className="text-2xl">
          <AiOutlineHome />
        </button>
        <button className="text-2xl">
          <AiOutlineUser />
        </button>
        <button className="text-2xl">
          <AiOutlineBell />
        </button>
        <button className="text-2xl">
          <BiMessageAltDetail />
        </button>
        <img
          src="https://res.cloudinary.com/walli/image/upload/v1697022251/socioverse_avatar/di0lhuoh6oobwrgtinkn.jpg"
          alt="avatar"
          className="w-12"
        />
      </div>
    </header>
  );
};

export default Header;
