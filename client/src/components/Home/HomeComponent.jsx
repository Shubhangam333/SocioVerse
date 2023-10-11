import { toast } from "react-toastify";
import { useLogoutMutation } from "../../features/auth/authapi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const HomeComponent = () => {
  const [logoutuser, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logoutuser().unwrap();
      dispatch(logout());
      toast.success(res.message);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default HomeComponent;
