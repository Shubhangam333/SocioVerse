import { Navigate, Outlet } from "react-router-dom";
import { useProfileQuery } from "../features/profile/profileapi";
import Loader from "../components/Loader/Loader";
import { useEffect } from "react";
import Header from "../components/Home/Header/Header";

const PrivateRoute = () => {
  const { data, isLoading, error } = useProfileQuery();

  useEffect(() => {
    if (error) {
      Navigate("/");
    }
  }, [error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data ? (
        <>
          <Header />
          <Outlet />
        </>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};

export default PrivateRoute;
