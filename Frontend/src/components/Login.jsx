import React from "react";
import { Link } from "react-router-dom";

const LoginComp = () => {
  return (
    <>
      <div className="mb-10">
        <div className="flex justify-center">
          <img
            alt=""
            className="h-14 w-14"
            src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account yet{" "}
          <Link
            to={"/signup"}
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            SignUp
          </Link>
        </p>
      </div>
      <form className="mt-8 space-y-6">
        <div className="-space-y-px">
          <div className="my-5">
            <label htmlFor={"email  "} className="sr-only">
              Email
            </label>
            <input
              name="email"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              placeholder={"Email"}
            ></input>
          </div>
          <div className="my-5">
            <label htmlFor={"email  "} className="sr-only">
              Password
            </label>
            <input
              name="email"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              placeholder={"Password"}
            ></input>
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginComp;
