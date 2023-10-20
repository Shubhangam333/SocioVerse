import { Navigate, Outlet } from "react-router-dom";
import { useProfileQuery } from "../features/profile/profileapi";
import Loader from "../components/Loader/Loader";
import { useEffect } from "react";
import Header from "../components/Home/Header/Header";

const PrivateRoute = () => {
  const { data, isLoading, isSuccess, error } = useProfileQuery();

  return (
    <>
      {isLoading && <Loader />}{" "}
      {isSuccess && (
        <>
          <Header />
          <Outlet />
        </>
      )}
      {error && <Navigate to="/" replace />}
    </>
  );
};

export default PrivateRoute;
