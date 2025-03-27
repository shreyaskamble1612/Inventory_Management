import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const LoginComp = () => {
  const nevigate = useNavigate();

  // initializing credentials
  const [cred, setCred] = useState({ email: "", password: "" });

  //to set credentials on change of input
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    let alert = document.getElementById("alert");
    try {
      e.preventDefault();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cred),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("inventoryToken", json.authtoken);
        nevigate("/");
      } else {
        alert.innerHTML = json.errors;
      }
    } catch (error) {
      console.log(error);
      alert.innerHTML = "Internal server error.";
    }
  };
  return (
    <>
      <div className="mb-10">
        <div className="flex justify-center">
          <img alt="" className="h-24 w-24" src={Logo} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account yet{" "}
          <Link
            to={"/signup"}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            SignUp
          </Link>
        </p>
      </div>
      <form onSubmit={login} className="mt-8 space-y-6">
        <div className="-space-y-px">
          <div className="my-5">
            <label htmlFor={"email  "} className="sr-only">
              Email
            </label>
            <input
              name="email"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder={"Email"}
              onChange={onChange}
              required={true}
              type={"email"}
            ></input>
          </div>
          <div className="my-5">
            <label htmlFor={"email  "} className="sr-only">
              Password
            </label>
            <input
              name="password"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder={"Password"}
              minLength={8}
              onChange={onChange}
              required={"true"}
              type={"password"}
            ></input>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-right w-full">
            <Link
              to={"/forgotpassword"}
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500 w-full"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        <p
          id="alert"
          className="h-5 text-sm text-red-600 text-center -mt-6"
        ></p>
        <input
          type={"submit"}
          value={"Login"}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        ></input>
      </form>
    </>
  );
};

export default LoginComp;
