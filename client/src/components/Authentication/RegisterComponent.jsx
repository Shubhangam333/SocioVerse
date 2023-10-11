import { Link, useNavigate } from "react-router-dom";
import Hero from "../../assets/network-illustration.svg";
import InputField from "./Forms/InputField";
import RadioButtonField from "./Forms/RadioButtonField";
import DatePickerComponent from "./Forms/DatePickerComponent";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useRegisterMutation } from "../../features/auth/authapi";

const RegisterComponent = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("gender", values.gender);
    formData.append("dob", values.dob);
    formData.append("avatar", values.avatar);

    try {
      const res = await register(formData).unwrap();
      toast.success(res.message);
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      dob: new Date(),
      gender: "",
      avatar: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      dob: Yup.date().required("DOB is required"),
      gender: Yup.string().required("Gender is required"),
      avatar: Yup.mixed()
        .required("File is required")
        .test("fileSize", "File size is too large", (value) => {
          if (!value) return true;
          const maxSize = 1024 * 1024;
          return value.size <= maxSize;
        })
        .test("fileType", "Invalid file type", (value) => {
          if (!value) return true;
          const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
          return allowedTypes.includes(value.type);
        }),
    }),
    onSubmit: (values) => {
      submitHandler(values);
    },
  });
  return (
    <>
      <section className="text-gray-600 body-font ">
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
              Register
            </h1>
            <form
              className="sm:flex sm:flex-col"
              onSubmit={formik.handleSubmit}
              encType="multipart/form-data"
            >
              <InputField
                type="text"
                name="name"
                id="name"
                label="Name"
                placeholder="Enter your Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorObj={
                  formik.touched.name && formik.errors.name ? true : false
                }
              />

              {formik.touched.name && formik.errors.name ? (
                <div className="error text-red-500">!{formik.errors.name}</div>
              ) : null}

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
              <InputField
                type="file"
                id="file"
                name="avatar"
                label="Profile picture"
                onChange={(event) => {
                  formik.setFieldValue("avatar", event.currentTarget.files[0]);
                }}
                errorObj={
                  formik.touched.avatar && formik.errors.avatar ? true : false
                }
                placeholder="Enter your Picture"
              />
              {formik.touched.avatar && formik.errors.avatar ? (
                <div className="error text-red-500">{formik.errors.avatar}</div>
              ) : null}

              <div className="flex justify-between">
                <RadioButtonField
                  id="male"
                  name="gender"
                  value="male"
                  label="Male"
                  checked={formik.values.gender === "male"}
                  onChange={formik.handleChange}
                />
                <RadioButtonField
                  id="female"
                  name="gender"
                  value="female"
                  label="Female"
                  checked={formik.values.gender === "female"}
                  onChange={formik.handleChange}
                />
                <RadioButtonField
                  id="other"
                  name="gender"
                  value="other"
                  label="Other"
                  checked={formik.values.gender === "other"}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.gender && formik.errors.gender ? (
                <div className="error text-red-500">{formik.errors.gender}</div>
              ) : null}
              <DatePickerComponent dob={formik.values.dob} />
              <button
                type="submit"
                className="rounded-md py-2 px-4 bg-slate-700 text-white cursor-pointer disabled:opacity-70 hover:scale-95"
              >
                Submit
              </button>
              {isLoading && <Loader />}
            </form>
            <div className="flex justify-between mt-2 gap-24">
              <span>Already have an account? </span>
              <Link to="/" className="text-red-400 ">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterComponent;
