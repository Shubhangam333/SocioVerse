import { useParams } from "react-router-dom";
import ProfileComponent from "../components/Home/ProfileComponent";
import { useGetUserInfoQuery } from "../features/profile/profileapi";
import { useEffect } from "react";
import { useCallback } from "react";
import Loader from "../components/Loader/Loader";
import { useDispatch } from "react-redux";
// import { setUserInfo } from "../features/profile/profileSlice";

const Profile = () => {
  const params = useParams();

  const { data, isLoading, isSuccess } = useGetUserInfoQuery(params.id);

  const dispatch = useDispatch();

  // const getUserDetails = useCallback(async () => {
  //   if (data) {
  //     dispatch(setUserInfo({ ...data.user }));
  //   }
  // }, [data, dispatch]);

  // useEffect(() => {
  //   getUserDetails();
  // }, [getUserDetails]);
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && <ProfileComponent user={data.user} />}
    </>
  );
};

export default Profile;
