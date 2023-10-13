import { useSelector } from "react-redux";

const ImageHeader = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <div className=" bg-[url('https://images.pexels.com/photos/707915/pexels-photo-707915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-center h-52"></div>
      <img
        src={userInfo.avatar.url}
        alt="avatar"
        className="w-44 -mt-24 m-auto rounded-full"
      />
    </div>
  );
};

export default ImageHeader;
