import { useParams } from "react-router-dom";
import ProfileComponent from "../components/Home/ProfileComponent";
import { useGetUserInfoMutation } from "../features/profile/profileapi";
import { useEffect } from "react";
import { useCallback } from "react";
import Loader from "../components/Loader/Loader";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../features/profile/profileSlice";

const Profile = () => {
  const params = useParams();
  console.log("params", params.id);
  const [getUserInfo, { data, isLoading, isSuccess }] =
    useGetUserInfoMutation();

  const dispatch = useDispatch();

  const getUserDetails = useCallback(async () => {
    try {
      const res = await getUserInfo(params.id).unwrap();
      console.log(res);
      dispatch(setUserInfo({ ...res.user }));
    } catch (error) {
      console.log(error);
    }
  }, [getUserInfo, params.id, dispatch]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && <ProfileComponent user={data.user} />}
    </>
  );
};

export default Profile;
