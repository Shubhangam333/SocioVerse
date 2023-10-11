import { useNavigate, useParams } from "react-router-dom";
import success from "../../assets/success-green-check-mark-icon.svg";

import { useEmailVerificationQuery } from "../../features/auth/authapi";
import Loader from "../Loader/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";

const EmailVerfication = () => {
  const params = useParams();
  const { token } = params;

  const { isLoading, isSuccess, error } = useEmailVerificationQuery(token);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      toast.success(
        "Email verification successful, Redirecting you to login page"
      );
      navigate("/");
    }
  });

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <>
          <div className="min-h-screen flex flex-col justify-center items-center">
            <p className="text-3xl">Registration Succesful</p>
            <img src={success} alt="" className="w-24" />
            <p>You are been redirected to login page</p>
          </div>
        </>
      )}
      {error && (
        <div className="min-h-screen flex flex-col justify-center items-center">
          {error.data.message}
        </div>
      )}
    </>
  );
};

export default EmailVerfication;
