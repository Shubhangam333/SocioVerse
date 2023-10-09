import { Link } from "react-router-dom";
import Hero from "../../assets/network-illustration.svg";
import InputField from "./Forms/InputField";
import { useState } from "react";
import RadioButtonField from "./Forms/RadioButtonField";
import DatePickerComponent from "./Forms/DatePickerComponent";

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [disabled, setDisabled] = useState(true);

  return (
    <>
      <section className="text-gray-600 body-font ">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
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
            <form className="sm:flex sm:flex-col">
              <InputField
                type="text"
                name="name"
                id="name"
                label="Name"
                placeholder="Enter your Name"
              />
              <InputField
                type="email"
                name="email"
                id="email"
                label="Email Address"
                placeholder="Enter your Email Address"
              />
              <InputField
                type="password"
                name="password"
                id="password"
                label="Password"
                placeholder="Enter your Password"
              />
              <InputField
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                label="Confirm Password"
                placeholder="Comfirm your Password"
              />
              <div className="flex justify-between">
                <RadioButtonField
                  id="male"
                  name="gender"
                  value="male"
                  label="Male"
                />
                <RadioButtonField
                  id="female"
                  name="gender"
                  value="female"
                  label="Female"
                />
                <RadioButtonField
                  id="other"
                  name="gender"
                  value="other"
                  label="Other"
                />
              </div>
              <DatePickerComponent />
              <button
                type="submit"
                disabled={disabled}
                className="rounded-md py-2 px-4 bg-slate-700 text-white cursor-pointer disabled:opacity-70"
              >
                Submit
              </button>
              <div className="flex justify-between mt-2">
                <span>Already have an account? </span>
                <Link to="/" className="text-red-400 ">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterComponent;
