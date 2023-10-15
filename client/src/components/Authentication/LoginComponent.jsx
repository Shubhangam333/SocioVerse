import { Link, useNavigate } from "react-router-dom";
import Hero from "../../assets/network-illustration.svg";
import InputField from "./Forms/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../../features/auth/authapi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import Loader from "../Loader/Loader";

const LoginComponent = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (values) => {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login Successful");
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      submitHandler(values);
    },
  });
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-6 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 ">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={Hero}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-center md:text-left items-center text-center ">
            <h1 className=" sm:text-4xl text-3xl mb-4 font-medium text-gray-900 ">
              Login
            </h1>
            <form
              className="sm:flex sm:flex-col"
              onSubmit={formik.handleSubmit}
            >
              <InputField
                type="email"
                name="email"
                id="email"
                label="Email Address"
                placeholder="Enter your Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorObj={formik.touched.email && formik.errors.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error text-red-500">!{formik.errors.email}</div>
              ) : null}
              <InputField
                type="password"
                name="password"
                id="password"
                label="Password"
                placeholder="Enter your Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorObj={formik.touched.password && formik.errors.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error text-red-500">
                  !{formik.errors.password}
                </div>
              ) : null}
              <button
                type="submit"
                className="rounded-md py-2 px-4 bg-slate-700 text-white cursor-pointer disabled:opacity-70"
              >
                Submit
              </button>
              <div className="flex justify-between mt-2">
                <span>Dont have an account? </span>
                <Link to="/register" className="text-red-400 ">
                  Register
                </Link>
              </div>
              {isLoading && <Loader />}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginComponent;
