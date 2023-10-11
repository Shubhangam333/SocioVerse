import { Outlet, useNavigate } from "react-router-dom";
import { useAccessTokenQuery } from "../features/auth/authapi";
import Loader from "../components/Loader/Loader";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

const PrivateRoute = () => {
  const { data, isLoading, isError, isSuccess } = useAccessTokenQuery();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials({ ...data }));
    }
    if (isError) {
      navigate("/");
    }
  }, [isSuccess, dispatch, isError, data, navigate]);
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && <Outlet />}
    </>
  );
};

export default PrivateRoute;
