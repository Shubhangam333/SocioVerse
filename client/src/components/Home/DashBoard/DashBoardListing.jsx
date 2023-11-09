import { useSelector } from "react-redux";

const DashBoardListing = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="col-span-2 box-shadow ">
      <div className="user-info flex flex-col items-center">
        <img src={userInfo.avatar.url} alt="avatar" className="w-44" />
        <h2>{userInfo.name}</h2>
      </div>
    </div>
  );
};

export default DashBoardListing;
